import { useState } from 'react'
import LoginPage from './components/LoginPage'
import UploadTab from './components/UploadTab'
import RankingsTab from './components/RankingsTab'
import './App.css'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [activeTab, setActiveTab] = useState('upload')

  // Show login page first
  if (!isLoggedIn) {
    return <LoginPage onLogin={() => setIsLoggedIn(true)} />
  }

  // Show main app after login
  return (
    <div className="app">
      <header className="header">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1>AI Resume Screener</h1>
            <p>Smart candidate ranking for IT roles</p>
          </div>
          {/* Logout button */}
          <button
            onClick={() => setIsLoggedIn(false)}
            style={{
              background: 'rgba(255,255,255,0.2)',
              border: '1px solid rgba(255,255,255,0.4)',
              color: 'white',
              padding: '8px 16px',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '0.9rem',
              fontWeight: '500'
            }}
          >
             Logout
          </button>
        </div>
      </header>

      <nav className="tabs">
        <button
          className={activeTab === 'upload' ? 'tab active' : 'tab'}
          onClick={() => setActiveTab('upload')}
        >
          Upload Resume
        </button>
        <button
          className={activeTab === 'rankings' ? 'tab active' : 'tab'}
          onClick={() => setActiveTab('rankings')}
        >
           View Rankings
        </button>
      </nav>

      <main className="content">
        {activeTab === 'upload' && <UploadTab />}
        {activeTab === 'rankings' && <RankingsTab />}
      </main>
    </div>
  )
}

export default App
