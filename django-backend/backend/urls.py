"""
Main URL configuration for the project.
All API routes start with /api/
"""

from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),          # Django admin panel
    path('api/', include('screening.urls')),   # All our API routes
]

# Serve uploaded files (PDF resumes) during development
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
