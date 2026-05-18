"""
Django settings for AI Resume Screener project.
"""

from pathlib import Path
import os

# Base directory of the project
BASE_DIR = Path(__file__).resolve().parent.parent

# Secret key - keep this secret in production!
SECRET_KEY = 'django-insecure-resume-screener-secret-key-2024'

# Debug mode - set to False in production
DEBUG = True

# Allow all hosts during development
ALLOWED_HOSTS = ['*']

# -------------------------------------------------------
# INSTALLED APPS - all the apps Django needs to run
# -------------------------------------------------------
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',       # Django REST Framework - for building APIs
    'corsheaders',          # CORS - allows React to talk to Django
    'screening',            # Our custom app
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'corsheaders.middleware.CorsMiddleware',   # CORS middleware - must be here
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'backend.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'backend.wsgi.application'

# -------------------------------------------------------
# DATABASE - MySQL connection settings
# -------------------------------------------------------
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',   # Use MySQL
        'NAME': 'resume_db',                     # Database name we created
        'USER': 'resume_user',                   # User we created
        'PASSWORD': 'password123',               # Password we set
        'HOST': 'localhost',
        'PORT': '3306',
    }
}

# -------------------------------------------------------
# CORS SETTINGS - Allow React (port 5173) to call Django
# -------------------------------------------------------
CORS_ALLOWED_ORIGINS = [
    "http://localhost:5173",   # Vite React default port
    "http://localhost:3000",   # Create React App port (just in case)
]

CORS_ALLOW_ALL_ORIGINS = True  # For development - allow all

# -------------------------------------------------------
# FILE UPLOAD SETTINGS - For PDF resume uploads
# -------------------------------------------------------
MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')

# Max upload size: 10 MB
DATA_UPLOAD_MAX_MEMORY_SIZE = 10485760

# -------------------------------------------------------
# STATIC FILES
# -------------------------------------------------------
STATIC_URL = '/static/'
STATICFILES_DIRS = []
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# Password validation
AUTH_PASSWORD_VALIDATORS = [
    {'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator'},
    {'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator'},
    {'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator'},
    {'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator'},
]

LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_TZ = True
