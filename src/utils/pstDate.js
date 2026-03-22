const TZ = 'America/Los_Angeles'

/** YYYY-MM-DD string for today in PST/PDT */
export function getTodayPST() {
  return new Intl.DateTimeFormat('en-CA', { timeZone: TZ }).format(new Date())
}

/**
 * YYYY-MM-DD for (baseDate + offset days), where baseDate is a YYYY-MM-DD string.
 * Pure calendar arithmetic — no timezone concerns.
 */
export function shiftDate(baseDate, offset) {
  const [y, m, d] = baseDate.split('-').map(Number)
  const dt = new Date(y, m - 1, d + offset)
  return [
    dt.getFullYear(),
    String(dt.getMonth() + 1).padStart(2, '0'),
    String(dt.getDate()).padStart(2, '0'),
  ].join('-')
}

/** Milliseconds until the next midnight in PST/PDT */
export function getMsUntilMidnightPST() {
  const now = new Date()
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: TZ,
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: false,
  }).formatToParts(now)

  const h   = parseInt(parts.find(p => p.type === 'hour').value)
  const min = parseInt(parts.find(p => p.type === 'minute').value)
  const sec = parseInt(parts.find(p => p.type === 'second').value)

  // Seconds left until 24:00:00
  return ((24 - h) * 3600 - min * 60 - sec) * 1000
}

/** Day-of-week + date label for a given offset from baseDate */
export function getDayLabel(baseDate, offset) {
  const [y, m, d] = baseDate.split('-').map(Number)
  const dt = new Date(y, m - 1, d + offset)
  const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  const sub  = `${dt.getMonth() + 1}/${dt.getDate()}`
  if (offset === 0)  return { label: 'Today',     sub }
  if (offset === -1) return { label: 'Yesterday', sub }
  if (offset === 1)  return { label: 'Tomorrow',  sub }
  return { label: DAYS[dt.getDay()], sub }
}
