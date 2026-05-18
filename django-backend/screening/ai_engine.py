import re


def extract_text_from_pdf(file_path):
    """Read text from a PDF resume file using file path"""
    try:
        import PyPDF2
        text = ""
        with open(file_path, 'rb') as pdf_file:
            reader = PyPDF2.PdfReader(pdf_file)
            for page in reader.pages:
                extracted = page.extract_text()
                if extracted:
                    text += extracted
        print(f"[AI Engine] PDF text extracted: {len(text)} characters")
        return text  # Return original text (not lowercased) so email is preserved
    except Exception as e:
        print(f"[AI Engine] PDF read error: {e}")
        return ""


def extract_email_from_text(text):
    """
    Automatically find email address from resume text.
    Uses regex pattern to match any email format.
    Example: john@gmail.com, john.doe@company.co.in
    """
    email_pattern = r'[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}'
    emails = re.findall(email_pattern, text)

    if emails:
        print(f"[AI Engine] Email found: {emails[0]}")
        return emails[0]  # Return the first email found in the resume

    print("[AI Engine] No email found in resume")
    return "noemail@resume.com"  # Default if no email found


def score_resume(resume_text, job_required_skills, job_description=""):
    """
    Score a resume against job requirements.
    Returns: score (0-100) and list of matched skills
    """
    resume_lower = resume_text.lower()

    # Parse skills from comma-separated string
    skills_list = [s.strip().lower() for s in job_required_skills.split(',') if s.strip()]

    # 1. Skill Matching (60% of score)
    matched = []
    for skill in skills_list:
        if skill in resume_lower:
            matched.append(skill)

    skill_score = 0
    if skills_list:
        skill_score = (len(matched) / len(skills_list)) * 60

    # 2. Experience Keywords (20% of score)
    experience_keywords = [
        'experience', 'worked', 'developed', 'built', 'managed',
        'led', 'created', 'designed', 'implemented', 'years'
    ]
    exp_count = sum(1 for kw in experience_keywords if kw in resume_lower)
    exp_score = min(exp_count * 2, 20)

    # 3. Education Keywords (10% of score)
    education_keywords = [
        'bachelor', 'master', 'phd', 'degree', 'university',
        'college', 'b.tech', 'b.sc', 'm.tech', 'mba', 'engineering'
    ]
    edu_count = sum(1 for kw in education_keywords if kw in resume_lower)
    edu_score = min(edu_count * 3, 10)

    # 4. Resume Length / Detail (10% of score)
    word_count = len(resume_lower.split())
    length_score = min(word_count / 50, 10)

    # Total score
    total_score = round(skill_score + exp_score + edu_score + length_score, 2)
    print(f"[AI Engine] Score: {total_score} | Matched skills: {matched}")

    return total_score, matched
