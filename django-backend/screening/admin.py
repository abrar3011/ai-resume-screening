from django.contrib import admin
from .models import Job, Candidate

@admin.register(Job)
class JobAdmin(admin.ModelAdmin):
    list_display = ['id', 'title', 'required_skills', 'created_at']
    search_fields = ['title']

@admin.register(Candidate)
class CandidateAdmin(admin.ModelAdmin):
    list_display = ['id', 'name', 'email', 'job', 'score', 'matched_skills', 'uploaded_at']
    search_fields = ['name', 'email']
    list_filter = ['job']
