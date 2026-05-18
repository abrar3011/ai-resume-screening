from django.db import models

class Job(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    required_skills = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title


class Candidate(models.Model):
    name = models.CharField(max_length=200)
    email = models.EmailField(default='noemail@resume.com')
    resume_file = models.FileField(upload_to='resumes/')
    resume_text = models.TextField(blank=True)
    job = models.ForeignKey(Job, on_delete=models.CASCADE, related_name='candidates')
    score = models.FloatField(default=0.0)
    matched_skills = models.TextField(blank=True)
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} - {self.job.title}"
