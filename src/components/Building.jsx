import './Building.css'

function isWindowLit(blockIdx, winIdx) {
  return Math.sin(blockIdx * 2.718 + winIdx * 1.414 + 0.5) > -0.1
}

// ─── 7 Iconic caps ────────────────────────────────────────────────────────────
const EmpireState = () => (
  <>
    <rect x="38" y="0"  width="4"  height="18" fill="currentColor" />
    <rect x="31" y="16" width="18" height="7"  fill="currentColor" />
    <rect x="22" y="21" width="36" height="7"  fill="currentColor" />
    <rect x="10" y="27" width="60" height="7"  fill="currentColor" />
    <rect x="0"  y="32" width="80" height="16" fill="currentColor" />
  </>
)
const Chrysler = () => (
  <>
    <rect x="38" y="0"  width="4"  height="14" fill="currentColor" />
    <path d="M0,34 L11,20 L21,29 L31,13 L40,24 L49,13 L59,29 L69,20 L80,34 Z" fill="currentColor" />
    <rect x="0"  y="34" width="80" height="14" fill="currentColor" />
  </>
)
const Transamerica = () => (
  <polygon points="40,0 78,48 2,48" fill="currentColor" />
)
const LotteTower = () => (
  <>
    <rect x="38" y="0"  width="4"  height="9"  fill="currentColor" />
    <path d="M38,7 C36,15 28,26 22,40 L58,40 C52,26 44,15 42,7 Z" fill="currentColor" />
    <rect x="0"  y="38" width="80" height="10" fill="currentColor" />
  </>
)
const USBankTower = () => (
  <>
    <rect x="38" y="0"  width="4"  height="17" fill="currentColor" />
    <path d="M0,36 L10,23 L20,31 L30,19 L40,28 L50,19 L60,31 L70,23 L80,36 Z" fill="currentColor" />
    <rect x="0"  y="36" width="80" height="12" fill="currentColor" />
  </>
)
const Taipei101 = () => (
  <>
    <rect x="38" y="0"  width="4"  height="9"  fill="currentColor" />
    <rect x="33" y="8"  width="14" height="7"  rx="1" fill="currentColor" />
    <rect x="27" y="14" width="26" height="7"  rx="1" fill="currentColor" />
    <rect x="19" y="20" width="42" height="7"  rx="1" fill="currentColor" />
    <rect x="0"  y="26" width="80" height="22" fill="currentColor" />
  </>
)
const BurjKhalifa = () => (
  <>
    <rect x="38" y="0"  width="4"  height="13" fill="currentColor" />
    <rect x="34" y="11" width="12" height="8"  fill="currentColor" />
    <rect x="28" y="17" width="24" height="8"  fill="currentColor" />
    <rect x="18" y="23" width="44" height="9"  fill="currentColor" />
    <rect x="0"  y="30" width="80" height="18" fill="currentColor" />
  </>
)

const CAP_COMPONENTS = [EmpireState, Chrysler, Transamerica, LotteTower, USBankTower, Taipei101, BurjKhalifa]
const CAP_NAMES      = ['Empire State','Chrysler','Transamerica','Lotte Tower','US Bank','Taipei 101','Burj Khalifa']

// ─── Cap ─────────────────────────────────────────────────────────────────────
function BuildingCap({ capType, topCategory, hasBlocks, isToday, variant }) {
  const prefix = variant === 'partner' ? 'building__cap--p-' : 'building__cap--'
  const colorClass = hasBlocks ? `${prefix}${topCategory}` : 'building__cap--empty'
  const todayClass = isToday && hasBlocks
    ? variant === 'partner' ? 'building__cap--p-today' : 'building__cap--today'
    : ''
  const CapShape = CAP_COMPONENTS[capType] ?? LotteTower

  return (
    <svg
      viewBox="0 0 80 48"
      className={['building__cap', colorClass, todayClass].filter(Boolean).join(' ')}
      xmlns="http://www.w3.org/2000/svg"
      aria-label={CAP_NAMES[capType]}
    >
      <CapShape />
    </svg>
  )
}

// ─── Floor block ──────────────────────────────────────────────────────────────
function BuildingBlock({ category, blockIdx, isGround, variant }) {
  const prefix = variant === 'partner' ? 'b-block--p-' : 'b-block--'
  return (
    <div
      className={['b-block', `${prefix}${category}`, isGround ? 'b-block--ground' : ''].filter(Boolean).join(' ')}
      style={{ '--idx': blockIdx }}
    >
      <div className="b-windows">
        <div className={`b-win ${isWindowLit(blockIdx, 0) ? 'b-win--lit' : 'b-win--dark'}`} />
        <div className={`b-win ${isWindowLit(blockIdx, 1) ? 'b-win--lit' : 'b-win--dark'}`} />
        <div className={`b-win ${isWindowLit(blockIdx, 2) ? 'b-win--lit' : 'b-win--dark'}`} />
      </div>
      {isGround && <div className="b-door" />}
    </div>
  )
}

// ─── Building ─────────────────────────────────────────────────────────────────
export default function Building({ tasks, isToday, isSelected, onClick, capType = 3, variant = 'self' }) {
  const blocks = []
  tasks.forEach(task => {
    const count = Math.max(1, Math.round(task.hours * 2))
    for (let i = 0; i < count; i++) blocks.push({ category: task.category, taskId: task.id, localIdx: i })
  })

  const displayBlocks = blocks.slice(0, 20)
  const overflow      = blocks.length - displayBlocks.length
  const totalHours    = tasks.reduce((s, t) => s + t.hours, 0)
  const hasBlocks     = displayBlocks.length > 0
  const topCategory   = hasBlocks ? displayBlocks[displayBlocks.length - 1].category : null

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
      {totalHours > 0 && (
        <div className={`building__badge ${variant === 'partner' ? 'building__badge--partner' : ''}`}>
          {totalHours % 1 === 0 ? totalHours : totalHours.toFixed(1)}h
        </div>
      )}

      <div className="building__body">
        {hasBlocks && (
          <BuildingCap capType={capType} topCategory={topCategory} hasBlocks={hasBlocks} isToday={isToday} variant={variant} />
        )}

        {hasBlocks ? (
          <>
            <div className="building__blocks">
              {displayBlocks.map((b, i) => (
                <BuildingBlock key={`${b.taskId}-${b.localIdx}`} category={b.category} blockIdx={i} isGround={i === 0} variant={variant} />
              ))}
            </div>
            {overflow > 0 && <div className="building__overflow">+{overflow}</div>}
          </>
        ) : (
          <div className="building__empty">
            <span className="building__empty-plus">+</span>
          </div>
        )}
      </div>
    </div>
  )
}
