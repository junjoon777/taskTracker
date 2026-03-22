import { useState } from 'react'
import { useApp } from '../context/AppContext'
import './Login.css'

// Stable silhouette buildings for background
const BG_BUILDINGS = [
  { w: 28, h: 55 }, { w: 18, h: 72 }, { w: 35, h: 44 }, { w: 22, h: 88 },
  { w: 30, h: 60 }, { w: 16, h: 50 }, { w: 40, h: 76 }, { w: 24, h: 64 },
  { w: 20, h: 48 }, { w: 32, h: 90 }, { w: 18, h: 56 }, { w: 28, h: 68 },
]

const STARS = Array.from({ length: 50 }, (_, i) => ({
  id: i,
  x: (i * 137.5) % 100,
  y: (i * 97.3) % 70,
  size: (i % 3) + 1,
  delay: (i % 25) * 0.12,
}))

export default function Login() {
  const { login, register } = useApp()
  const [isSignUp, setIsSignUp] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      if (isSignUp) {
        if (password.length < 4) throw new Error('Password must be at least 4 characters')
        register(username.trim(), password)
      } else {
        login(username.trim(), password)
      }
    } catch (err) {
      setError(err.message)
    }
    setLoading(false)
  }

  return (
    <div className="login-page">
      {/* Animated sky */}
      <div className="login-sky">
        {STARS.map(s => (
          <div key={s.id} className="login-star" style={{
            left: `${s.x}%`, top: `${s.y}%`,
            width: `${s.size}px`, height: `${s.size}px`,
            animationDelay: `${s.delay}s`,
          }} />
        ))}
        <div className="login-moon" />
      </div>

      {/* Silhouette city */}
      <div className="login-skyline">
        {BG_BUILDINGS.map((b, i) => (
          <div key={i} className="login-silhouette" style={{ width: b.w, height: b.h }} />
        ))}
      </div>
      <div className="login-ground" />

      {/* Auth card */}
      <div className="login-card">
        <div className="login-icon">🏙️</div>
        <h1 className="login-title">Task City</h1>
        <p className="login-subtitle">Build your city, one task at a time</p>

        <form onSubmit={handleSubmit} className="login-form">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            className="login-input"
            autoComplete="username"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="login-input"
            autoComplete={isSignUp ? 'new-password' : 'current-password'}
            required
          />
          {error && <p className="login-error">{error}</p>}
          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? '...' : isSignUp ? '🏗️ Build My City' : '🌆 Enter City'}
          </button>
        </form>

        <p className="login-switch-text">
          {isSignUp ? 'Already have a city? ' : "Don't have a city? "}
          <button className="login-switch-btn" onClick={() => { setIsSignUp(!isSignUp); setError('') }}>
            {isSignUp ? 'Sign in' : 'Sign up free'}
          </button>
        </p>
      </div>
    </div>
  )
}
