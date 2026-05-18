# AI-Powered Resume Screening & Candidate Ranking System

## Project Overview
An intelligent web application that helps HR managers automatically screen and rank candidates by analyzing their resumes using AI scoring.

---

## Technologies Used

| Layer      | Technology          | Purpose                        |
|------------|---------------------|--------------------------------|
| Frontend   | React.js (Vite)     | User Interface                 |
| Backend    | Python + Django     | REST API & Business Logic      |
| Database   | MySQL               | Store jobs, candidates, scores |
| AI Engine  | Python (PyPDF2)     | PDF reading & skill matching   |
| HTTP Client| Axios               | API calls from React           |

---

## Features

- ✅ HR uploads candidate resume (PDF)
- ✅ Select IT role from 45+ predefined roles
- ✅ AI automatically extracts text from PDF
- ✅ AI automatically extracts email from resume
- ✅ AI scores candidate 0–100 based on skill match
- ✅ Candidates ranked highest to lowest score
- ✅ Stats dashboard (Total, Average, Top Score, Qualified)
- ✅ Click candidate card to view full resume PDF
- ✅ Data stored in MySQL database

---

## Project Structure

```
resume-screener/
├── backend/
│   ├── manage.py
│   ├── requirements.txt
│   ├── backend/
│   │   ├── settings.py      → Django configuration
│   │   └── urls.py          → Main URL routing
│   └── screening/
│       ├── models.py        → Database models (Job, Candidate)
│       ├── views.py         → API endpoint logic
│       ├── serializers.py   → JSON conversion
│       ├── urls.py          → API routes
│       ├── ai_engine.py     → AI scoring logic
│       └── admin.py         → Django admin panel
└── frontend/
    └── src/
        ├── App.jsx          → Main app with 2 tabs
        ├── App.css          → Styling
        └── components/
            ├── UploadTab.jsx    → Upload resume form
            └── RankingsTab.jsx  → Candidate rankings
```

---

## API Endpoints

| Method | Endpoint                    | Description                     |
|--------|-----------------------------|---------------------------------|
| GET    | /api/jobs/                  | Get all roles                   |
| POST   | /api/jobs/                  | Create a new role               |
| POST   | /api/upload/                | Upload & score a resume         |
| GET    | /api/candidates/{job_id}/   | Get ranked candidates for role  |

---

## AI Scoring Algorithm

The AI engine scores each resume out of 100 using 4 factors:

| Factor              | Weight | Method                                      |
|---------------------|--------|---------------------------------------------|
| Skill Matching      | 60%    | Count matching skills from job requirements |
| Experience Keywords | 20%    | Words like "developed", "led", "built"      |
| Education Keywords  | 10%    | Words like "degree", "university", "B.Tech" |
| Resume Detail       | 10%    | Word count / length of resume               |

**Score Labels:**
- 80–100 → Excellent ✅
- 60–79  → Good ✅
- 35–59  → Average ⚠️
- 0–34   → Low ❌

---

## How to Run the Project

### Prerequisites
- Python 3.10+
- Node.js 18+
- MySQL 8.0

### Backend Setup
```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

### Access the App
- React App    → http://localhost:5173
- Django API   → http://localhost:8000/api/
- Admin Panel  → http://localhost:8000/admin/

---

## Database Schema

### Job Table (screening_job)
| Column          | Type         | Description          |
|-----------------|--------------|----------------------|
| id              | INT          | Primary key          |
| title           | VARCHAR(200) | Role name            |
| description     | TEXT         | Job description      |
| required_skills | TEXT         | Comma-separated      |
| created_at      | DATETIME     | Creation timestamp   |

### Candidate Table (screening_candidate)
| Column          | Type         | Description          |
|-----------------|--------------|----------------------|
| id              | INT          | Primary key          |
| name            | VARCHAR(200) | Candidate name       |
| email           | VARCHAR      | Auto-extracted email |
| resume_file     | FILE         | Uploaded PDF path    |
| resume_text     | TEXT         | Extracted text       |
| score           | FLOAT        | AI score (0-100)     |
| matched_skills  | TEXT         | Skills found         |
| job_id          | FK → Job     | Applied role         |
| uploaded_at     | DATETIME     | Upload timestamp     |

---

## Screenshots

1. Upload Tab — HR uploads candidate resume
2. Rankings Tab — AI ranked candidates with scores
3. Stats Dashboard — Total, Average, Top Score, Qualified count
4. Resume View — Click candidate to open PDF

---

## Developer

- **Name:** Abdul J.Abrar
- **Course:** Full Stack Develoepr
- **GitHub:** https://github.com/abrar3011/ai-resume-screening

---

*Built with React + Django + MySQL + Python AI Scoring Engine*
