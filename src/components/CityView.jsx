import { useMemo } from 'react'
import Building from './Building'
import { useApp } from '../context/AppContext'
import { shiftDate, getDayLabel } from '../utils/pstDate'
import './CityView.css'

// Stable stars
const STARS = Array.from({ length: 70 }, (_, i) => ({
  id: i,
  x: (i * 137.508) % 100,
  y: (i * 83.21) % 65,
  size: (i % 3) + 1,
  delay: (i % 30) * 0.1,
  duration: 2.5 + (i % 20) * 0.15,
}))

// Background depth silhouettes
const BG_SILHOUETTES = [
  { x: 2,  w: 22, h: 45 }, { x: 5,  w: 14, h: 62 }, { x: 9,  w: 30, h: 35 },
  { x: 14, w: 18, h: 55 }, { x: 19, w: 26, h: 70 }, { x: 24, w: 12, h: 40 },
  { x: 28, w: 20, h: 58 }, { x: 33, w: 32, h: 48 }, { x: 39, w: 16, h: 75 },
  { x: 44, w: 24, h: 42 }, { x: 49, w: 18, h: 60 }, { x: 54, w: 28, h: 50 },
  { x: 59, w: 14, h: 66 }, { x: 63, w: 22, h: 38 }, { x: 68, w: 20, h: 72 },
  { x: 73, w: 16, h: 44 }, { x: 77, w: 30, h: 55 }, { x: 83, w: 18, h: 65 },
  { x: 87, w: 24, h: 40 }, { x: 92, w: 14, h: 58 }, { x: 96, w: 20, h: 48 },
]

const DAY_OFFSETS = [-3, -2, -1, 0, 1, 2, 3]

export default function CityView({ todayPST, selectedDate, onSelectDate, theme = 'night' }) {
  const { getTasksForDate } = useApp()

  const days = useMemo(() =>
    DAY_OFFSETS.map((offset, index) => ({
      offset,
      index,
      dateStr: shiftDate(todayPST, offset),
      isToday: offset === 0,
      ...getDayLabel(todayPST, offset),
    })),
  [todayPST])

  return (
    <div className="city-view" data-theme={theme}>

      {/* Sky */}
      <div className="cv-sky">
        {STARS.map(s => (
          <div key={s.id} className="cv-star" style={{
            left: `${s.x}%`, top: `${s.y}%`,
            width: `${s.size}px`, height: `${s.size}px`,
            animationDelay: `${s.delay}s`,
            animationDuration: `${s.duration}s`,
          }} />
        ))}
        <div className="cv-moon"><div className="cv-moon-glow" /></div>
        <div className="cv-sun" />
        <div className="cv-shooting-star" />
        <div className="cv-horizon-glow" />

        {/* Morning clouds */}
        <div className="cv-clouds">
          <div className="cv-cloud cv-cloud--lg" style={{ left: '18%', top: '10%' }} />
          <div className="cv-cloud cv-cloud--md" style={{ left: '58%', top: '20%' }} />
          <div className="cv-cloud cv-cloud--sm" style={{ left: '6%',  top: '34%' }} />
          <div className="cv-cloud cv-cloud--md" style={{ left: '76%', top: '13%' }} />
          <div className="cv-cloud cv-cloud--sm" style={{ left: '40%', top: '8%'  }} />
        </div>
      </div>

      {/* Background depth silhouettes */}
      <div className="cv-bg-silhouettes">
        {BG_SILHOUETTES.map((s, i) => (
          <div key={i} className="cv-sil" style={{
            left: `${s.x}%`, width: `${s.w}px`, height: `${s.h}px`,
          }} />
        ))}
      </div>

      {/* Main buildings */}
      <div className="cv-buildings">
        {days.map(({ offset, index, dateStr, isToday }) => {
          const isSelected = dateStr === selectedDate
          return (
            <div key={offset} className="cv-col">
              <div className="cv-pair" onClick={() => onSelectDate(dateStr)}>
                <div className="cv-pair-side">
                  <Building
                    tasks={getTasksForDate(0, dateStr)}
                    isToday={isToday}
                    isSelected={isSelected}
                    colIdx={index}
                    variant="self"
                  />
                </div>
                <div className="cv-pair-side">
                  <Building
                    tasks={getTasksForDate(1, dateStr)}
                    isToday={isToday}
                    isSelected={isSelected}
                    colIdx={index}
                    variant="partner"
                  />
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Ground — date labels live here so buildings sit on the ground line */}
      <div className="cv-ground">
        <div className="cv-ground-line" />
        <div className="cv-labels">
          {days.map(({ offset, dateStr, label, sub, isToday }) => (
            <div
              key={offset}
              className={[
                'cv-label',
                isToday               ? 'cv-label--today'    : '',
                dateStr === selectedDate ? 'cv-label--selected' : '',
              ].filter(Boolean).join(' ')}
              onClick={() => onSelectDate(dateStr)}
            >
              <span className="cv-label-day">{label}</span>
              <span className="cv-label-date">{sub}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
