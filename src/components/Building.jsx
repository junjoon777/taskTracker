import { SELF_TOWERS, PARTNER_TOWERS, TOWER_VIEWBOX } from './TowerPixels'
import './Building.css'

// 8 hours = full tower visible. fraction = hours/8 controls how much of the
// tower (from spire downward) is shown. Less hours = only the cap peeking up.
const MAX_TOWER_H = 520 // px — full tower height at 8 hrs

export default function Building({ tasks, isToday, isSelected, onClick, colIdx = 3, variant = 'self' }) {
  const totalHours = tasks.reduce((s, t) => s + t.hours, 0)
  const fraction   = Math.min(totalHours / 8, 1)
  const clipH      = Math.round(fraction * MAX_TOWER_H)
  const isEmpty    = totalHours === 0

  const TowerComponent = variant === 'partner'
    ? PARTNER_TOWERS[colIdx % 7]
    : SELF_TOWERS[colIdx % 7]

  return (
    <div
      className={[
        'building',
        isToday    ? 'building--today'    : '',
        isSelected ? 'building--selected' : '',
        variant === 'partner' ? 'building--partner' : '',
      ].filter(Boolean).join(' ')}
      onClick={onClick}
    >
      {!isEmpty && (
        <div className={`building__badge ${variant === 'partner' ? 'building__badge--partner' : ''}`}>
          {totalHours % 1 === 0 ? totalHours : totalHours.toFixed(1)}h
        </div>
      )}

      {isEmpty ? (
        <div className="building__empty">
          <span className="building__empty-plus">+</span>
        </div>
      ) : (
        <div className="building__tower-clip" style={{ height: `${clipH}px` }}>
          <svg
            viewBox={TOWER_VIEWBOX}
            className={`building__tower-svg ${isToday ? 'building__tower-svg--today' : ''}`}
            style={{ height: `${MAX_TOWER_H}px` }}
            preserveAspectRatio="none"
          >
            <TowerComponent />
          </svg>
        </div>
      )}
    </div>
  )
}
