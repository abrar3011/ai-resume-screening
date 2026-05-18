import { useState, useEffect } from 'react'
import axios from 'axios'

function RankingsTab() {
  const [jobs, setJobs] = useState([])
  const [selectedJob, setSelectedJob] = useState(null)
  const [candidates, setCandidates] = useState([])
  const [loading, setLoading] = useState(false)
  const [deletingId, setDeletingId] = useState(null)

  useEffect(() => {
    axios.get('http://localhost:8000/api/jobs/')
      .then(res => setJobs(res.data))
      .catch(err => console.log(err))
  }, [])

  const handleRoleChange = async (jobId) => {
    const job = jobs.find(j => j.id === parseInt(jobId))
    setSelectedJob(job || null)
    setCandidates([])
    if (!jobId) return
    setLoading(true)
    try {
      const res = await axios.get(`http://localhost:8000/api/candidates/${jobId}/`)
      setCandidates(res.data)
    } catch (err) {
      console.log(err)
    }
    setLoading(false)
  }

  // Delete candidate
  const handleDelete = async (e, candidateId) => {
    e.stopPropagation() // Prevent opening resume when clicking delete

    const confirm = window.confirm('Are you sure you want to delete this candidate?')
    if (!confirm) return

    setDeletingId(candidateId)
    try {
      await axios.delete(`http://localhost:8000/api/candidates/delete/${candidateId}/`)
      // Remove from list instantly without reloading
      setCandidates(prev => prev.filter(c => c.id !== candidateId))
    } catch (err) {
      alert('❌ Failed to delete. Try again.')
    }
    setDeletingId(null)
  }

  // Open resume PDF
  const openResume = (candidate) => {
    if (candidate.resume_url) {
      window.open(candidate.resume_url, '_blank')
    }
  }

  const totalCandidates = candidates.length
  const avgScore = totalCandidates
    ? Math.round(candidates.reduce((sum, c) => sum + c.score, 0) / totalCandidates)
    : 0
  const topScore = totalCandidates ? Math.max(...candidates.map(c => c.score)) : 0
  const qualified = candidates.filter(c => c.score >= 60).length

  const getScoreClass = (score) => {
    if (score >= 60) return 'score-high'
    if (score >= 35) return 'score-mid'
    return 'score-low'
  }

  const getRankEmoji = (index) => {
    if (index === 0) return '🥇'
    if (index === 1) return '🥈'
    if (index === 2) return '🥉'
    return `#${index + 1}`
  }

  const getScoreLabel = (score) => {
    if (score >= 80) return 'Excellent'
    if (score >= 60) return 'Good'
    if (score >= 35) return 'Average'
    return 'Low'
  }

  return (
    <div>
      {/* Role Selector */}
      <div className="card">
        <h2>🏆 Candidate Rankings</h2>
        <div className="form-group" style={{ marginBottom: 0 }}>
          <label>Select Role to View Rankings</label>
          <select onChange={(e) => handleRoleChange(e.target.value)} defaultValue="">
            <option value="">-- Select IT Role --</option>
            {jobs.map(job => (
              <option key={job.id} value={job.id}>{job.title}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Stats */}
      {selectedJob && totalCandidates > 0 && (
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">👥</div>
            <div className="stat-number">{totalCandidates}</div>
            <div className="stat-label">Total Candidates</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">📊</div>
            <div className="stat-number">{avgScore}%</div>
            <div className="stat-label">Average Score</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">🏆</div>
            <div className="stat-number">{topScore}%</div>
            <div className="stat-label">Top Score</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">✅</div>
            <div className="stat-number">{qualified}</div>
            <div className="stat-label">Qualified (60%+)</div>
          </div>
        </div>
      )}

      {/* Candidates List */}
      <div className="card">
        {loading && (
          <p className="center-message">Loading candidates...</p>
        )}

        {!loading && !selectedJob && (
          <div className="center-message">
            <div className="empty-emoji">👆</div>
            <p>Select a role above to see candidate rankings</p>
          </div>
        )}

        {!loading && selectedJob && totalCandidates === 0 && (
          <div className="center-message">
            <div className="empty-emoji">📭</div>
            <p>No candidates found for <strong>{selectedJob.title}</strong>.</p>
            <p className="helper-text">Go to Upload tab to add candidates.</p>
          </div>
        )}

        {/* Click hint */}
        {totalCandidates > 0 && (
          <p className="click-hint">
            👆 Click candidate card to open resume &nbsp;|&nbsp; 🗑️ Click delete to remove
          </p>
        )}

        {candidates.map((candidate, index) => (
          <div
            className="candidate-card"
            key={candidate.id}
            onClick={() => openResume(candidate)}
            title="Click to open resume"
          >
            {/* Rank */}
            <div className="rank-badge">{getRankEmoji(index)}</div>

            {/* Info */}
            <div className="candidate-info">
              <h3>
                {candidate.name}
                <span className="resume-label">📄 View Resume</span>
              </h3>
              <p>{candidate.email}</p>
              <p className="skills-row">
                {candidate.matched_skills
                  ? candidate.matched_skills.split(',').map((skill, i) => (
                      <span key={i} className="skills-tag">{skill.trim()}</span>
                    ))
                  : <span className="no-skills">No skills matched</span>
                }
              </p>
            </div>

            {/* Score */}
            <div className="score-col">
              <div className={`score-circle ${getScoreClass(candidate.score)}`}>
                <span className="score-value">{candidate.score}</span>
                <span className="score-fraction">/ 100</span>
              </div>
              <p className="score-label">{getScoreLabel(candidate.score)}</p>
            </div>

            {/* Delete Button */}
            <button
              className="delete-btn"
              onClick={(e) => handleDelete(e, candidate.id)}
              disabled={deletingId === candidate.id}
              title="Delete candidate"
            >
              {deletingId === candidate.id ? '⏳' : '🗑️'}
            </button>

          </div>
        ))}
      </div>
    </div>
  )
}

export default RankingsTab
