import { useState } from 'react'
import { useApp } from '../context/AppContext'
import './TaskPanel.css'

const CATEGORIES = {
  study:    { emoji: '📚', label: 'Study',        color: 'study' },
  workout:  { emoji: '💪', label: 'Workout',      color: 'workout' },
  personal: { emoji: '🌿', label: 'Personal Care', color: 'personal' },
}

const SUBJECTS = {
  study:    ['DSA', 'LLD', 'System Design', 'Mock Interview', 'School', 'Personal Project'],
  workout:  ['Weight Training', 'Running', 'Hiking', 'Sports'],
  personal: ['Bible', 'Book', 'Skincare'],
}

const HOUR_PRESETS = [0.5, 1, 1.5, 2, 3]

// todayPST is a YYYY-MM-DD string — diff is pure calendar arithmetic
function formatPanelDate(dateStr, todayPST) {
  const [ty, tm, td] = todayPST.split('-').map(Number)
  const [dy, dm, dd] = dateStr.split('-').map(Number)
  const todayMs  = new Date(ty, tm - 1, td).getTime()
  const targetMs = new Date(dy, dm - 1, dd).getTime()
  const diff = Math.round((targetMs - todayMs) / 86400000)

  const dt  = new Date(dy, dm - 1, dd)
  const DAY = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
  const MON = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
  const base = `${DAY[dt.getDay()]}, ${MON[dt.getMonth()]} ${dt.getDate()}`
  if (diff === 0)  return `Today — ${base}`
  if (diff === -1) return `Yesterday — ${base}`
  if (diff === 1)  return `Tomorrow — ${base}`
  return base
}

const NAMES = ['Jun', 'Eujin']

export default function TaskPanel({ selectedDate, todayPST, activeUser, onSwitchUser }) {
  const { getTasksForDate, addTask, deleteTask } = useApp()
  const tasks = getTasksForDate(activeUser, selectedDate)
  const totalHours = tasks.reduce((s, t) => s + t.hours, 0)

  const [category, setCategory] = useState('study')
  const [subject,  setSubject]  = useState('')
  const [hours,    setHours]    = useState('')
  const [burst,    setBurst]    = useState(false)

  const subjects = SUBJECTS[category]

  const handleCat = (cat) => {
    setCategory(cat)
    setSubject('')
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const finalHours = parseFloat(hours)
    if (!subject || !finalHours || finalHours <= 0) return

    addTask(activeUser, { date: selectedDate, category, subject, hours: finalHours })
    setSubject('')
    setHours('')

    setBurst(true)
    setTimeout(() => setBurst(false), 700)
  }

  const catColor = CATEGORIES[category].color

  return (
    <div className="tp">
      {/* User tabs */}
      <div className="tp__users">
        {NAMES.map((name, idx) => (
          <button
            key={idx}
            type="button"
            className={`tp__user-tab ${activeUser === idx ? (idx === 0 ? 'tp__user-tab--self' : 'tp__user-tab--partner') : ''}`}
            onClick={() => onSwitchUser(idx)}
          >
            {name}
          </button>
        ))}
      </div>

      {/* Header */}
      <div className="tp__header">
        <div>
          <h2 className="tp__date">{formatPanelDate(selectedDate, todayPST)}</h2>
          {totalHours > 0 && (
            <p className="tp__total">
              🏆 {totalHours % 1 === 0 ? totalHours : totalHours.toFixed(1)} hrs &middot; {tasks.length} task{tasks.length !== 1 ? 's' : ''}
            </p>
          )}
        </div>
        {totalHours > 0 && (
          <div className="tp__floors-badge">
            🏢 {Math.round(totalHours * 2)} floors
          </div>
        )}
      </div>

      {/* Add task form */}
      <form onSubmit={handleSubmit} className={`tp__form ${burst ? 'tp__form--burst' : ''}`}>
        {/* Category tabs */}
        <div className="tp__cats">
          {Object.entries(CATEGORIES).map(([key, { emoji, label, color }]) => (
            <button
              key={key}
              type="button"
              className={`tp__cat ${category === key ? `tp__cat--active tp__cat--${color}` : ''}`}
              onClick={() => handleCat(key)}
            >
              {emoji} {label}
            </button>
          ))}
        </div>

        {/* Activity */}
        <div className="tp__row">
          <select
            value={subject}
            onChange={e => setSubject(e.target.value)}
            className={`tp__select tp__select--${catColor}`}
            required
          >
            <option value="">Select activity…</option>
            {subjects.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>

        {/* Hour presets + custom */}
        <div className="tp__row tp__row--hours">
          <div className="tp__presets">
            {HOUR_PRESETS.map(h => (
              <button
                key={h}
                type="button"
                className={`tp__preset ${parseFloat(hours) === h ? `tp__preset--active tp__preset--${catColor}` : ''}`}
                onClick={() => setHours(String(h))}
              >
                {h}h
              </button>
            ))}
          </div>
          <input
            type="number"
            value={hours}
            onChange={e => setHours(e.target.value)}
            placeholder="hrs"
            min="0.25"
            max="24"
            step="0.25"
            className="tp__input tp__input--hours"
            required
          />
          <button type="submit" className={`tp__add tp__add--${catColor}`}>
            🏗️ Add
          </button>
        </div>
      </form>

      {/* Task list */}
      <div className="tp__list">
        {tasks.length === 0 ? (
          <div className="tp__empty">
            <span className="tp__empty-icon">🏗️</span>
            <p>No tasks yet — add one to start building!</p>
          </div>
        ) : (
          tasks.map(task => (
            <div key={task.id} className={`tp__task tp__task--${task.category}`}>
              <span className="tp__task-emoji">
                {CATEGORIES[task.category].emoji}
              </span>
              <div className="tp__task-info">
                <span className="tp__task-subject">{task.subject}</span>
                <span className="tp__task-cat">{CATEGORIES[task.category].label}</span>
              </div>
              <div className="tp__task-right">
                <span className="tp__task-hours">{task.hours}h</span>
                <span className="tp__task-floors">{Math.round(task.hours * 2)} floors</span>
              </div>
              <button
                className="tp__delete"
                onClick={() => deleteTask(activeUser, task.id)}
                title="Remove task"
              >
                ×
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
