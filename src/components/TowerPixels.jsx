// ─── 14 Pixel-art iconic towers ───────────────────────────────────────────────
// viewBox "0 0 40 200" — y=0 = spire tip, y=200 = ground level
// Player 1 (Jun): towers 0-6 | Player 2 (Eujin): towers 7-13

// ── Jun: Empire State ─────────────────────────────────────────────────────────
function EmpireState() {
  const s = '#c8b98a', w = '#7ec8e8', sh = '#a09070'
  const wr = [62,70,78,86,94,102,110,118,126,134,142,150,158,166,174,182,190]
  return (
    <g>
      <rect x="19" y="0"  width="2"  height="12" fill="#b0a898"/>
      <rect x="18" y="12" width="4"  height="6"  fill={s}/>
      <rect x="15" y="18" width="10" height="6"  fill={s}/>
      <rect x="12" y="24" width="16" height="8"  fill={s}/>
      <rect x="9"  y="32" width="22" height="10" fill={s}/>
      <rect x="7"  y="42" width="26" height="16" fill={s}/>
      <rect x="5"  y="58" width="30" height="142" fill={s}/>
      <rect x="31" y="58" width="4"  height="142" fill={sh} opacity="0.35"/>
      {wr.flatMap(y => [7,12,17,22,27].map(x =>
        <rect key={`${x}${y}`} x={x} y={y} width="3" height="4" fill={w} opacity="0.65"/>
      ))}
    </g>
  )
}

// ── Jun: Chrysler ─────────────────────────────────────────────────────────────
function Chrysler() {
  const s = '#8ba0b0', g = '#d4bc40', w = '#aac8e8'
  const wr = [56,64,72,80,88,96,104,112,120,128,136,144,152,160,168,176,184,192]
  return (
    <g>
      <rect x="19" y="0" width="2" height="8" fill="#9ab0b8"/>
      {/* Art deco fan crown – three stacked triangular tiers */}
      <polygon points="20,8 18,18 22,18"          fill={g}/>
      <polygon points="20,10 15,25 25,25"         fill={g}/>
      <polygon points="20,12 11,36 29,36"         fill={g}/>
      <rect x="14" y="28" width="12" height="8"  fill={s}/>
      <rect x="11" y="36" width="18" height="8"  fill={s}/>
      <rect x="9"  y="44" width="22" height="10" fill={s}/>
      <rect x="7"  y="54" width="26" height="146" fill={s}/>
      {[62,84,106,128,150,172,194].map(y =>
        <rect key={y} x="7" y={y} width="26" height="2" fill={g} opacity="0.45"/>
      )}
      {wr.flatMap(y => [9,14,20,26,30].map(x =>
        x + 3 <= 33 ? <rect key={`${x}${y}`} x={x} y={y} width="3" height="4" fill={w} opacity="0.5"/> : null
      ))}
    </g>
  )
}

// ── Jun: One World Trade Center ───────────────────────────────────────────────
function OneWTC() {
  const b = '#5b9bd5', bd = '#3a78b0', br = '#c0ddf8'
  const wr = [54,62,70,78,86,94,102,110,118,126,134,142,150,158,166,174,182,190,198]
  return (
    <g>
      <rect x="19" y="0" width="2" height="18" fill="#8ab8d8"/>
      {/* Tapered glass square */}
      <polygon points="20,18 16,30 24,30" fill={b}/>
      <rect x="13" y="30" width="14" height="8"  fill={b}/>
      <rect x="11" y="38" width="18" height="12" fill={b}/>
      <rect x="10" y="50" width="20" height="150" fill={b}/>
      {/* Glass highlight strip */}
      {wr.map(y => <rect key={y} x="11" y={y} width="4" height="4" fill={br} opacity="0.45"/>)}
      {/* Shadow side */}
      <rect x="26" y="50" width="4" height="150" fill={bd} opacity="0.45"/>
    </g>
  )
}

// ── Jun: Transamerica Pyramid ─────────────────────────────────────────────────
function Transamerica() {
  const c = '#e0dcd4', sh = '#c0bcb4', w = '#7ec8e8'
  return (
    <g>
      <rect x="19" y="0" width="2" height="22" fill="#c0bdb5"/>
      <polygon points="20,20 5,200 35,200" fill={c}/>
      <polygon points="20,20 20,200 35,200" fill={sh} opacity="0.55"/>
      {[50,60,70,80,90,100,110,120,130,140,150,160,170,180,190].map((y, i) => {
        const pct = (y - 20) / 180
        const hw = 15 * pct
        return <rect key={y} x={20 - hw} y={y} width={hw * 2} height="3" fill={w} opacity="0.35"/>
      })}
    </g>
  )
}

// ── Jun: Space Needle ─────────────────────────────────────────────────────────
function SpaceNeedle() {
  const gr = '#687890', lg = '#8090a8', pl = '#b0bcc8'
  return (
    <g>
      {/* Antenna */}
      <rect x="19" y="0" width="2" height="30" fill="#788090"/>
      {/* Narrow shaft to disk */}
      <rect x="18" y="30" width="4" height="28" fill={gr}/>
      {/* Flying saucer disk */}
      <rect x="5"  y="56" width="30" height="4"  fill={pl}/>
      <rect x="7"  y="60" width="26" height="8"  fill={lg}/>
      <rect x="9"  y="68" width="22" height="5"  fill={gr}/>
      {/* Shaft below disk */}
      <rect x="18" y="73" width="4" height="45"  fill={gr}/>
      {/* Tripod legs */}
      <polygon points="18,118 8,200 14,200 20,118"   fill={gr}/>
      <polygon points="22,118 32,200 26,200 20,118"  fill={gr}/>
      {/* Base platform */}
      <rect x="4" y="190" width="32" height="10" fill={gr}/>
      {/* Disk windows */}
      {[7,13,19,25,31].map(x =>
        <rect key={x} x={x} y="62" width="4" height="4" fill={pl} opacity="0.7"/>
      )}
    </g>
  )
}

// ── Jun: Burj Khalifa ─────────────────────────────────────────────────────────
function BurjKhalifa() {
  const b = '#6a9db8', bd = '#4a7d98', w = '#aac8d8'
  return (
    <g>
      {/* Antenna */}
      <rect x="19" y="0" width="2" height="22" fill="#8ab0c0"/>
      {/* Core shaft */}
      <rect x="17" y="22" width="6" height="178" fill={b}/>
      {/* Y-shaped wing setbacks — widening in steps down the tower */}
      <rect x="14" y="22" width="12" height="25" fill={b}/>
      <rect x="12" y="47" width="16" height="20" fill={b}/>
      <rect x="10" y="67" width="20" height="20" fill={b}/>
      <rect x="9"  y="87" width="22" height="20" fill={b}/>
      <rect x="8"  y="107" width="24" height="20" fill={b}/>
      <rect x="7"  y="127" width="26" height="73" fill={b}/>
      {/* Shadow */}
      <rect x="22" y="22" width="3" height="178" fill={bd} opacity="0.45"/>
      {/* Window stripes */}
      {[26,32,38,44,50,56,62,68,74,80,86,92,98,104,110,116,122,128,134,140,146,152,158,164,170,176,182,188,194].map(y =>
        <rect key={y} x="18" y={y} width="4" height="2" fill={w} opacity="0.5"/>
      )}
    </g>
  )
}

// ── Jun: Taipei 101 ───────────────────────────────────────────────────────────
function Taipei101() {
  const g = '#3a9b6e', gl = '#4abc88', gd = '#2a7a52', w = '#7ee8b8'
  // 8 pagoda-style segments
  const segs = [
    [16,20,8,14], [14,34,12,14], [12,48,16,14],
    [10,62,20,14], [8,76,24,14],  [6,90,28,15],
    [4,105,32,16], [3,121,34,79],
  ]
  return (
    <g>
      {/* Antenna */}
      <rect x="19" y="0" width="2" height="22" fill="#78b898"/>
      {segs.map(([x, y, w2, h], i) => (
        <g key={i}>
          <rect x={x} y={y} width={w2} height={h} fill={g}/>
          {/* Overhang cap on each segment */}
          <rect x={x - 1} y={y} width={w2 + 2} height="3" fill={gd} opacity="0.55"/>
          {/* Windows */}
          {[y + 5, y + 9].filter(wy => wy < y + h - 2).flatMap(wy =>
            [x + 2, x + w2 - 5].map(wx =>
              <rect key={`${wx}${wy}`} x={wx} y={wy} width="3" height="3" fill={w} opacity="0.65"/>
            )
          )}
        </g>
      ))}
      {/* Shadow */}
      <rect x="32" y="20" width="3" height="180" fill={gd} opacity="0.35"/>
    </g>
  )
}

// ── Eujin: Eiffel Tower ───────────────────────────────────────────────────────
function EiffelTower() {
  const r = '#c87820', rl = '#d89030', rd = '#a86010'
  return (
    <g>
      {/* Antenna */}
      <rect x="19" y="0" width="2" height="18" fill="#b87018"/>
      {/* Upper shaft */}
      <rect x="18" y="18" width="4" height="28" fill={r}/>
      {/* First platform */}
      <rect x="13" y="46" width="14" height="5" fill={rl}/>
      {/* Diagonal legs upper section (narrow) */}
      <polygon points="13,51 6,100 12,100 19,51"   fill={r}/>
      <polygon points="27,51 34,100 28,100 21,51"  fill={r}/>
      {/* Second platform */}
      <rect x="6" y="100" width="28" height="5" fill={rl}/>
      {/* Cross brace */}
      <rect x="6" y="118" width="28" height="3" fill={rd} opacity="0.7"/>
      {/* Diagonal legs lower section (wide) */}
      <polygon points="6,105 2,200 8,200 12,105"   fill={r}/>
      <polygon points="34,105 38,200 32,200 28,105" fill={r}/>
      {/* Base platform */}
      <rect x="2" y="192" width="36" height="8" fill={r}/>
      {/* Arch openings */}
      <rect x="8"  y="154" width="8"  height="30" fill="#0a0a15" opacity="0.5"/>
      <rect x="24" y="154" width="8"  height="30" fill="#0a0a15" opacity="0.5"/>
    </g>
  )
}

// ── Eujin: Shanghai Tower ─────────────────────────────────────────────────────
function ShanghaiTower() {
  const b = '#8cc8e8', bd = '#5a9cc0', bl = '#c0e4f4'
  return (
    <g>
      {/* Antenna */}
      <rect x="19" y="0" width="2" height="18" fill="#9ad0e8"/>
      {/* Twisted glass body — alternating offsets to simulate twist */}
      {[
        [16,18,8,14], [15,32,10,12], [16,44,8,12],
        [14,56,12,12], [15,68,10,12], [16,80,8,12],
        [13,92,14,12], [15,104,10,12], [14,116,12,12],
        [12,128,16,72],
      ].map(([x, y, w2, h], i) => (
        <rect key={i} x={x} y={y} width={w2} height={h} fill={b}/>
      ))}
      {/* Glass highlight */}
      {[22,34,46,58,70,82,94,106,118,130,142,154,166,178,190].map(y =>
        <rect key={y} x="15" y={y} width="3" height="5" fill={bl} opacity="0.55"/>
      )}
      {/* Shadow */}
      <rect x="24" y="18" width="2" height="182" fill={bd} opacity="0.5"/>
    </g>
  )
}

// ── Eujin: Petronas-style stepped tower ───────────────────────────────────────
function PetronasStyle() {
  const b = '#5a88b0', bl = '#7aaed0', w = '#a8c8e0'
  const steps = [
    [16,14,8,16], [14,30,12,15], [12,45,16,15],
    [10,60,20,15], [8,75,24,15],  [6,90,28,15],
    [4,105,32,95],
  ]
  return (
    <g>
      {/* Spire */}
      <rect x="19" y="0" width="2" height="16" fill="#7aaed0"/>
      {steps.map(([x, y, w2, h], i) => (
        <g key={i}>
          <rect x={x} y={y} width={w2} height={h} fill={b}/>
          {/* Horizontal band */}
          <rect x={x} y={y} width={w2} height="3" fill={bl}/>
          {/* Windows */}
          {[y + 5, y + 10].filter(wy => wy < y + h - 2).flatMap(wy =>
            Array.from({length: Math.floor(w2/6)}, (_, j) =>
              <rect key={`${j}${wy}`} x={x + 2 + j * 6} y={wy} width="3" height="4" fill={w} opacity="0.6"/>
            )
          )}
        </g>
      ))}
      <rect x="28" y="105" width="4" height="95" fill={bl} opacity="0.4"/>
    </g>
  )
}

// ── Eujin: Big Ben ────────────────────────────────────────────────────────────
function BigBen() {
  const go = '#c8a832', gd = '#a88820', gr = '#4a6830', w = '#e8d060'
  return (
    <g>
      {/* Gothic spire */}
      <polygon points="20,0 17,20 23,20" fill={gr}/>
      <rect x="16" y="18" width="8" height="6" fill={gr}/>
      {/* Belfry */}
      <rect x="13" y="24" width="14" height="12" fill={go}/>
      <rect x="13" y="24" width="14" height="3"  fill={gd}/>
      {/* Clock faces (four sides, show 2 here) */}
      <rect x="14" y="28" width="12" height="10" fill={go}/>
      {/* Clock circle */}
      <rect x="16" y="29" width="8" height="8" fill={w} rx="4" ry="4"/>
      {/* Step down to main tower */}
      <rect x="11" y="36" width="18" height="6"  fill={gd}/>
      <rect x="9"  y="42" width="22" height="4"  fill={go}/>
      {/* Main tower body */}
      <rect x="10" y="46" width="20" height="154" fill={go}/>
      {/* Decorative horizontal bands */}
      {[56,76,96,116,136,156,176,196].map(y =>
        <rect key={y} x="10" y={y} width="20" height="2" fill={gd} opacity="0.6"/>
      )}
      {/* Windows */}
      {[50,60,70,80,90,100,110,120,130,140,150,160,170,180,190].flatMap(y =>
        [12,18,24].map(x =>
          <rect key={`${x}${y}`} x={x} y={y} width="4" height="5" fill="#7ec8e8" opacity="0.55"/>
        )
      )}
      {/* Shadow */}
      <rect x="26" y="46" width="4" height="154" fill={gd} opacity="0.35"/>
    </g>
  )
}

// ── Eujin: CN Tower ───────────────────────────────────────────────────────────
function CNTower() {
  const gr = '#506070', gl = '#687888', pl = '#90a0b0'
  return (
    <g>
      {/* Antenna */}
      <rect x="19" y="0" width="2" height="34" fill="#6a8090"/>
      {/* Narrow shaft */}
      <rect x="18" y="34" width="4" height="44" fill={gr}/>
      {/* Restaurant/observation pod */}
      <rect x="10" y="76" width="20" height="6"  fill={pl}/>
      <rect x="12" y="82" width="16" height="12" fill={gl}/>
      <rect x="10" y="94" width="20" height="5"  fill={pl}/>
      {/* Lower shaft */}
      <rect x="18" y="99" width="4" height="21" fill={gr}/>
      {/* Observation deck (lower) */}
      <rect x="9"  y="120" width="22" height="4" fill={pl}/>
      <rect x="11" y="124" width="18" height="8" fill={gl}/>
      <rect x="9"  y="132" width="22" height="3" fill={pl}/>
      {/* Tapering base */}
      <polygon points="20,135 14,200 26,200" fill={gr}/>
      {/* Pod windows */}
      {[11,16,21,26].map(x =>
        <rect key={x} x={x} y="84" width="3" height="8" fill={pl} opacity="0.65"/>
      )}
    </g>
  )
}

// ── Eujin: Shanghai World Financial Center ────────────────────────────────────
function ShanghaiWFC() {
  const b = '#5888b0', bd = '#3a6890', w = '#90b8d8'
  return (
    <g>
      {/* Spire */}
      <rect x="19" y="0" width="2" height="12" fill="#7aaad0"/>
      {/* Tapered body */}
      <polygon points="20,12 16,40 24,40" fill={b}/>
      <rect x="13" y="40" width="14" height="20" fill={b}/>
      {/* Trapezoid opening near top */}
      <polygon points="13,60 27,60 25,84 15,84" fill="#0a0a15" opacity="0.75"/>
      {/* Sides of the trapezoid */}
      <rect x="11" y="60" width="4" height="24" fill={b}/>
      <rect x="25" y="60" width="4" height="24" fill={b}/>
      {/* Below opening */}
      <rect x="11" y="84" width="18" height="116" fill={b}/>
      {/* Window stripes */}
      {[44,52,90,98,106,114,122,130,138,146,154,162,170,178,186,194].map(y =>
        <rect key={y} x="13" y={y} width="4" height="4" fill={w} opacity="0.5"/>
      )}
      {/* Shadow */}
      <rect x="25" y="12" width="4" height="188" fill={bd} opacity="0.4"/>
    </g>
  )
}

// ── Eujin: Modern glass tower ─────────────────────────────────────────────────
function ModernGlass() {
  const b = '#7ab8d8', bd = '#5090b8', bl = '#c0e0f0'
  return (
    <g>
      {/* Spire */}
      <rect x="19" y="0" width="2" height="14" fill="#90c8e0"/>
      {/* Slightly tapered body */}
      <rect x="16" y="14" width="8"  height="10" fill={b}/>
      <rect x="14" y="24" width="12" height="10" fill={b}/>
      <rect x="12" y="34" width="16" height="166" fill={b}/>
      {/* Glass panel reflection */}
      {[18,28,38,48,58,68,78,88,98,108,118,128,138,148,158,168,178,188,198].map(y => (
        <g key={y}>
          <rect x="13" y={y} width="5" height="6" fill={bl} opacity="0.5"/>
          <rect x="22" y={y} width="5" height="6" fill={bl} opacity="0.35"/>
        </g>
      ))}
      {/* Shadow */}
      <rect x="24" y="14" width="4" height="186" fill={bd} opacity="0.4"/>
      {/* Horizontal dividers */}
      {[50,100,150].map(y =>
        <rect key={y} x="12" y={y} width="16" height="2" fill={bd} opacity="0.5"/>
      )}
    </g>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
export const SELF_TOWERS    = [EmpireState, Chrysler, OneWTC, Transamerica, SpaceNeedle, BurjKhalifa, Taipei101]
export const PARTNER_TOWERS = [EiffelTower, ShanghaiTower, PetronasStyle, BigBen, CNTower, ShanghaiWFC, ModernGlass]
export const TOWER_VIEWBOX  = '0 0 40 200'
