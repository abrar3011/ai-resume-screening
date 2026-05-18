from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.conf import settings
import os

from .models import Job, Candidate
from .serializers import JobSerializer, CandidateSerializer
from .ai_engine import extract_text_from_pdf, extract_email_from_text, score_resume


class JobListCreate(APIView):
    def get(self, request):
        seen = set()
        unique_jobs = []
        for job in Job.objects.all().order_by('title'):
            if job.title not in seen:
                seen.add(job.title)
                unique_jobs.append(job)
        serializer = JobSerializer(unique_jobs, many=True)
        return Response(serializer.data)

    def post(self, request):
        title = request.data.get('title')
        description = request.data.get('description', '')
        required_skills = request.data.get('required_skills', '')

        if not title:
            return Response({'error': 'Title is required'}, status=400)

        existing_job = Job.objects.filter(title=title).first()
        if existing_job:
            serializer = JobSerializer(existing_job)
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        job = Job.objects.create(
            title=title,
            description=description,
            required_skills=required_skills,
        )
        serializer = JobSerializer(job)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class JobDetail(APIView):
    def get(self, request, pk):
        try:
            job = Job.objects.get(pk=pk)
        except Job.DoesNotExist:
            return Response({'error': 'Job not found'}, status=404)
        serializer = JobSerializer(job)
        return Response(serializer.data)


class UploadResume(APIView):
    def post(self, request):
        name = request.data.get('name')
        job_id = request.data.get('job_id')
        resume_file = request.FILES.get('resume')

        if not name:
            return Response({'error': 'Name is required'}, status=400)
        if not job_id:
            return Response({'error': 'Job ID is required'}, status=400)
        if not resume_file:
            return Response({'error': 'Resume file is required'}, status=400)

        try:
            job = Job.objects.get(pk=job_id)
        except Job.DoesNotExist:
            return Response({'error': 'Job not found'}, status=404)

        candidate = Candidate.objects.create(
            name=name,
            email='noemail@resume.com',
            job=job,
            resume_file=resume_file
        )

        file_path = os.path.join(settings.MEDIA_ROOT, candidate.resume_file.name)
        resume_text = extract_text_from_pdf(file_path)
        candidate.resume_text = resume_text

        extracted_email = extract_email_from_text(resume_text)
        candidate.email = extracted_email

        score, matched = score_resume(resume_text, job.required_skills, job.description)
        candidate.score = score
        candidate.matched_skills = ', '.join(matched)
        candidate.save()

        return Response({
            'message': 'Resume uploaded and scored successfully!',
            'candidate': CandidateSerializer(candidate).data
        }, status=201)


class RankedCandidates(APIView):
    def get(self, request, job_id):
        candidates = Candidate.objects.filter(job_id=job_id).order_by('-score')
        serializer = CandidateSerializer(candidates, many=True)
        return Response(serializer.data)


class DeleteCandidate(APIView):
    def delete(self, request, candidate_id):
        try:
            candidate = Candidate.objects.get(pk=candidate_id)

            # Delete the PDF file from disk too
            if candidate.resume_file:
                file_path = os.path.join(settings.MEDIA_ROOT, candidate.resume_file.name)
                if os.path.exists(file_path):
                    os.remove(file_path)
                    print(f"[Delete] Removed file: {file_path}")

            candidate.delete()
            return Response({'message': 'Candidate deleted successfully!'}, status=200)

        except Candidate.DoesNotExist:
            return Response({'error': 'Candidate not found'}, status=404)
