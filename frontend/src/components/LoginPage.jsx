import { useState } from 'react'
import './LoginPage.css'

// Fixed HR credentials
const HR_USERNAME = 'hr@company.com'
const HR_PASSWORD = 'Hr@1234'

function LoginPage({ onLogin }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = () => {
    if (!username || !password) {
      setError('❌ Please enter username and password.')
      return
    }

    setLoading(true)
    setError('')

    // Simulate loading for 1 second
    setTimeout(() => {
      if (username === HR_USERNAME && password === HR_PASSWORD) {
        onLogin() // Go to main app
      } else {
        setError('❌ Invalid username or password. Try again.')
        setLoading(false)
      }
    }, 1000)
  }

  // Allow pressing Enter key to login
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleLogin()
  }

  return (
    <div className="login-page">
      <div className="login-box">

        {/* Logo / Header */}
        <div className="login-header">
          <div className="login-icon">🤖</div>
          <h1>AI Resume Screener</h1>
          <p>HR Management Portal</p>
        </div>

        {/* Form */}
        <div className="login-form">
          <div className="login-group">
            <label>Username</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </div>

          <div className="login-group">
            <label>Password</label>
            <div className="password-wrapper">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <button
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
                type="button"
              >
                {showPassword ? '🙈' : '👁️'}
              </button>
            </div>
          </div>

          {error && <div className="login-error">{error}</div>}

          <button
            className="login-btn"
            onClick={handleLogin}
            disabled={loading}
          >
            {loading ? '⏳ Logging in...' : '🔐 Login'}
          </button>

          {/* Hint for assignment */}
          <div className="login-hint">
            <p>Demo Credentials:</p>
            <p>📧 hr@company.com</p>
            <p>🔑 Hr@1234</p>
          </div>
        </div>

      </div>
    </div>
  )
}

export default LoginPage
