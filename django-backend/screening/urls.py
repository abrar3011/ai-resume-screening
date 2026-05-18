from django.urls import path
from . import views

urlpatterns = [
    path('jobs/', views.JobListCreate.as_view(), name='job-list'),
    path('jobs/<int:pk>/', views.JobDetail.as_view(), name='job-detail'),
    path('upload/', views.UploadResume.as_view(), name='upload-resume'),
    path('candidates/<int:job_id>/', views.RankedCandidates.as_view(), name='ranked-candidates'),
    path('candidates/delete/<int:candidate_id>/', views.DeleteCandidate.as_view(), name='delete-candidate'),
]
