import { useState, useEffect, useRef } from 'react'
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

function NameTag({ name, onSave, colorClass }) {
  const [editing, setEditing] = useState(false)
  const [draft, setDraft]     = useState(name)
  const inputRef = useRef(null)

  useEffect(() => { if (editing) inputRef.current?.select() }, [editing])

  const commit = () => {
    const trimmed = draft.trim()
    if (trimmed) onSave(trimmed)
    else setDraft(name)
    setEditing(false)
  }

  if (editing) {
    return (
      <input
        ref={inputRef}
        className={`nt-input ${colorClass}`}
        value={draft}
        onChange={e => setDraft(e.target.value)}
        onBlur={commit}
        onKeyDown={e => { if (e.key === 'Enter') commit(); if (e.key === 'Escape') { setDraft(name); setEditing(false) } }}
        maxLength={20}
      />
    )
  }

  return (
    <span className={`nt-name ${colorClass}`} onClick={() => setEditing(true)} title="Click to rename">
      {name}
    </span>
  )
}

export default function Dashboard() {
  const { names, updateName, loading } = useApp()

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
          <NameTag name={names[0]} onSave={n => updateName(0, n)} colorClass="nt--self" />
          <span className="dash__vs">vs</span>
          <NameTag name={names[1]} onSave={n => updateName(1, n)} colorClass="nt--partner" />
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
          names={names}
        />
      </main>
    </div>
  )
}
