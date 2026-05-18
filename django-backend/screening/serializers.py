from rest_framework import serializers
from .models import Job, Candidate


class JobSerializer(serializers.ModelSerializer):
    class Meta:
        model = Job
        fields = '__all__'


class CandidateSerializer(serializers.ModelSerializer):
    job_title = serializers.CharField(source='job.title', read_only=True)
    resume_url = serializers.SerializerMethodField()
    resume_filename = serializers.SerializerMethodField()

    class Meta:
        model = Candidate
        fields = ['id', 'name', 'email', 'score', 'matched_skills',
                  'job', 'job_title', 'uploaded_at', 'resume_url', 'resume_filename']

    def get_resume_url(self, obj):
        # Returns full URL to the PDF file
        if obj.resume_file:
            return f"http://localhost:8000/media/{obj.resume_file.name}"
        return None

    def get_resume_filename(self, obj):
        # Returns just the filename
        if obj.resume_file:
            return obj.resume_file.name.split('/')[-1]
        return None
