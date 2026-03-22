import { useState, useEffect } from 'react'
import { useApp } from '../context/AppContext'
import CityView from './CityView'
import TaskPanel from './TaskPanel'
import { getTodayPST, getMsUntilMidnightPST } from '../utils/pstDate'
import './Dashboard.css'

const THEMES = [
  { id: 'morning', emoji: '☀️', label: 'Morning' },
  { id: 'sunset',  emoji: '🌅', label: 'Sunset'  },
  { id: 'night',   emoji: '🌙', label: 'Night'   },
]

export default function Dashboard() {
  const { loading } = useApp()

  const [todayPST,     setTodayPST]     = useState(getTodayPST)
  const [selectedDate, setSelectedDate] = useState(getTodayPST)
  const [theme,        setTheme]        = useState(() => localStorage.getItem('tc_theme') || 'night')
  const [activeUser,   setActiveUser]   = useState(0)

  useEffect(() => {
    let timeoutId
    const scheduleUpdate = () => {
      const ms = getMsUntilMidnightPST()
      timeoutId = setTimeout(() => {
        const newToday = getTodayPST()
        setTodayPST(newToday)
        setSelectedDate(newToday)
        scheduleUpdate()
      }, ms)
    }
    scheduleUpdate()
    return () => clearTimeout(timeoutId)
  }, [])

  const changeTheme = (t) => {
    setTheme(t)
    localStorage.setItem('tc_theme', t)
  }

  return (
    <div className="dash">
      <header className="dash__header">
        <div className="dash__logo">
          <span className="dash__logo-icon">🏙️</span>
          <span className="dash__logo-text">Task City</span>
        </div>

        <div className="dash__players">
          <span className="nt-name nt--self">Jun</span>
          <span className="dash__vs">vs</span>
          <span className="nt-name nt--partner">Eujin</span>
        </div>

        <div className="theme-switcher" role="group" aria-label="Sky theme">
          {THEMES.map(({ id, emoji, label }) => (
            <button
              key={id}
              className={`ts-btn ${theme === id ? `ts-btn--active ts-btn--${id}` : ''}`}
              onClick={() => changeTheme(id)}
              title={label}
              aria-pressed={theme === id}
            >
              <span className="ts-emoji">{emoji}</span>
              <span className="ts-label">{label}</span>
            </button>
          ))}
        </div>
      </header>

      <main className="dash__main">
        {loading && <div className="dash__loading">Loading city…</div>}
        <CityView
          todayPST={todayPST}
          selectedDate={selectedDate}
          onSelectDate={setSelectedDate}
          theme={theme}
        />
        <TaskPanel
          selectedDate={selectedDate}
          todayPST={todayPST}
          activeUser={activeUser}
          onSwitchUser={setActiveUser}
        />
      </main>
    </div>
  )
}
