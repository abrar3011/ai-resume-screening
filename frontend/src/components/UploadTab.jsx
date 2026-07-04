import { useState } from 'react'
import axios from 'axios'
import IT_ROLES from '../roles'

function UploadTab() {
  const [name, setName] = useState('')
  const [role, setRole] = useState('')
  const [file, setFile] = useState(null)
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const handleUpload = async () => {
    if (!name || !role || !file) {
      setMessage('❌ Please fill all fields and select a PDF file.')
      return
    }

    setLoading(true)
    setMessage('')

    // First create the job/role if it doesn't exist, then upload resume
    try {
      // Step 1: Create or get the role as a job
      const jobRes = await axios.post('http://localhost:8000/api/jobs/', {
        title: role,
        description: `Hiring for ${role} position`,
        required_skills: getRoleSkills(role),
      })

      const jobId = jobRes.data.id

      // Step 2: Upload resume
      const formData = new FormData()
      formData.append('name', name)
      formData.append('email', 'noemail@resume.com')
      formData.append('job_id', jobId)
      formData.append('resume', file)

      const uploadRes = await axios.post('http://localhost:8000/api/upload/', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })

      const score = uploadRes.data.candidate.score
      setMessage(`✅ Resume uploaded! AI Score: ${score}/100`)

      // Reset form
      setName('')
      setRole('')
      setFile(null)
      document.getElementById('fileInput').value = ''

    } catch (error) {
      setMessage('❌ Upload failed. Make sure Django is running.')
    }

    setLoading(false)
  }

  // Default skills for each role category
  const getRoleSkills = (role) => {
    const skillMap = {
      'Frontend Developer': 'HTML, CSS, JavaScript, React, Git',
      'React Developer': 'React, JavaScript, HTML, CSS, Redux, Git',
      'Angular Developer': 'Angular, TypeScript, JavaScript, HTML, CSS',
      'Vue.js Developer': 'Vue.js, JavaScript, HTML, CSS, Vuex',
      'UI/UX Designer': 'Figma, Adobe XD, Wireframing, Prototyping, CSS',
      'Backend Developer': 'Python, Node.js, REST API, SQL, Git',
      'Python Developer': 'Python, Django, REST API, MySQL, Git',
      'Django Developer': 'Python, Django, REST API, MySQL, PostgreSQL',
      'Node.js Developer': 'Node.js, Express, JavaScript, MongoDB, REST API',
      'Java Developer': 'Java, Spring Boot, MySQL, REST API, Maven',
      'Spring Boot Developer': 'Java, Spring Boot, Hibernate, MySQL, REST API',
      'PHP Developer': 'PHP, Laravel, MySQL, HTML, CSS',
      'Full Stack Developer': 'React, Node.js, MySQL, REST API, Git',
      'MERN Stack Developer': 'MongoDB, Express, React, Node.js, JavaScript',
      'MEAN Stack Developer': 'MongoDB, Express, Angular, Node.js, TypeScript',
      'Android Developer': 'Java, Kotlin, Android SDK, REST API, Git',
      'iOS Developer': 'Swift, Objective-C, Xcode, REST API, Git',
      'React Native Developer': 'React Native, JavaScript, iOS, Android, REST API',
      'Flutter Developer': 'Flutter, Dart, iOS, Android, REST API',
      'Data Scientist': 'Python, Machine Learning, Pandas, NumPy, SQL',
      'Data Analyst': 'Python, SQL, Excel, Power BI, Tableau',
      'Machine Learning Engineer': 'Python, TensorFlow, Scikit-learn, Deep Learning, SQL',
      'AI Engineer': 'Python, Deep Learning, NLP, TensorFlow, PyTorch',
      'Business Intelligence Analyst': 'SQL, Power BI, Tableau, Excel, Python',
      'DevOps Engineer': 'Docker, Kubernetes, CI/CD, Linux, AWS',
      'AWS Cloud Engineer': 'AWS, EC2, S3, Lambda, Terraform',
      'Azure Cloud Engineer': 'Azure, DevOps, Docker, Kubernetes, Terraform',
      'Docker & Kubernetes Engineer': 'Docker, Kubernetes, Linux, CI/CD, Helm',
      'Database Administrator': 'MySQL, PostgreSQL, Oracle, SQL Server, Backup',
      'MySQL Developer': 'MySQL, SQL, Database Design, Stored Procedures, Indexing',
      'MongoDB Developer': 'MongoDB, NoSQL, JavaScript, Node.js, Aggregation',
      'QA Engineer': 'Manual Testing, Selenium, Test Cases, Bug Reporting, JIRA',
      'Manual Tester': 'Manual Testing, Test Cases, Bug Reporting, JIRA, Agile',
      'Automation Tester': 'Selenium, Python, Java, TestNG, JIRA',
      'Cybersecurity Analyst': 'Network Security, Ethical Hacking, Firewalls, SIEM, Linux',
      'Ethical Hacker': 'Penetration Testing, Kali Linux, Metasploit, Network Security',
      'Network Security Engineer': 'Cisco, Firewall, VPN, Network Protocols, Linux',
      'Software Engineer': 'Python, Java, JavaScript, Data Structures, Algorithms',
      'Systems Analyst': 'System Design, SQL, UML, Business Analysis, Documentation',
      'IT Support Engineer': 'Windows, Linux, Networking, Hardware, Troubleshooting',
      'Scrum Master': 'Agile, Scrum, JIRA, Sprint Planning, Stakeholder Management',
      'Project Manager': 'Project Planning, Risk Management, Agile, JIRA, Communication',
      'Technical Lead': 'System Design, Code Review, Mentoring, Agile, Architecture',
    }
    return skillMap[role] || 'Communication, Problem Solving, Teamwork'
  }

  return (
    <div className="card">
      <h2>Upload Candidate Resume</h2>

      <div className="form-group">
        <label>Candidate Name</label>
        <input
          type="text"
          placeholder="Enter full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>Select Role</label>
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="">-- Select IT Role --</option>

          <optgroup label="Frontend">
            <option>Frontend Developer</option>
            <option>React Developer</option>
            <option>Angular Developer</option>
            <option>Vue.js Developer</option>
            <option>UI/UX Designer</option>
          </optgroup>

          <optgroup label="Backend">
            <option>Backend Developer</option>
            <option>Python Developer</option>
            <option>Django Developer</option>
            <option>Node.js Developer</option>
            <option>Java Developer</option>
            <option>Spring Boot Developer</option>
            <option>PHP Developer</option>
          </optgroup>

          <optgroup label="Full Stack">
            <option>Full Stack Developer</option>
            <option>MERN Stack Developer</option>
            <option>MEAN Stack Developer</option>
          </optgroup>

          <optgroup label="Mobile">
            <option>Android Developer</option>
            <option>iOS Developer</option>
            <option>React Native Developer</option>
            <option>Flutter Developer</option>
          </optgroup>

          <optgroup label="Data & AI">
            <option>Data Scientist</option>
            <option>Data Analyst</option>
            <option>Machine Learning Engineer</option>
            <option>AI Engineer</option>
            <option>Business Intelligence Analyst</option>
          </optgroup>

          <optgroup label="DevOps & Cloud">
            <option>DevOps Engineer</option>
            <option>AWS Cloud Engineer</option>
            <option>Azure Cloud Engineer</option>
            <option>Docker & Kubernetes Engineer</option>
          </optgroup>

          <optgroup label="Database">
            <option>Database Administrator</option>
            <option>MySQL Developer</option>
            <option>MongoDB Developer</option>
          </optgroup>

          <optgroup label="Testing">
            <option>QA Engineer</option>
            <option>Manual Tester</option>
            <option>Automation Tester</option>
          </optgroup>

          <optgroup label="Security">
            <option>Cybersecurity Analyst</option>
            <option>Ethical Hacker</option>
            <option>Network Security Engineer</option>
          </optgroup>

          <optgroup label="Other IT">
            <option>Software Engineer</option>
            <option>Systems Analyst</option>
            <option>IT Support Engineer</option>
            <option>Scrum Master</option>
            <option>Project Manager</option>
            <option>Technical Lead</option>
          </optgroup>

        </select>
      </div>

      <div className="form-group">
        <label>Upload Resume (PDF only)</label>
        <input
          id="fileInput"
          type="file"
          accept=".pdf"
          onChange={(e) => setFile(e.target.files[0])}
        />
      </div>

      <button
        className="btn-primary"
        onClick={handleUpload}
        disabled={loading}
      >
        {loading ? 'Analyzing Resume with AI...' : ' Upload & Score Resume'}
      </button>

      {message && (
        <div className={message.includes('✅') ? 'success-msg' : 'error-msg'}>
          {message}
        </div>
      )}
    </div>
  )
}

export default UploadTab
