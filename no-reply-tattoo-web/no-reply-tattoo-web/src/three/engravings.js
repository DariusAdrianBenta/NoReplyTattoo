/* ==========================================================================
   GRABADOS DE LA MÁQUINA (texturas dibujadas con canvas)
   --------------------------------------------------------------------------
   Cada pieza cilíndrica recibe dos lienzos:
     color → metal negro + grabados en bronce/crema
     bump  → relieve (ranuras hundidas, grabados ligeramente rehundidos)
   En el lienzo, el ancho es el contorno del cilindro y el alto su longitud
   (arriba = parte trasera de la máquina, abajo = la punta).
   ========================================================================== */

export const COLORS = {
  body: '#141312',
  bodyLight: '#22201e',
  bronze: '#c39a6b',
  bronzeDark: '#7d5d3c',
  cream: '#e9dcc6',
  slot: '#050505',
}

function canvas(w, h) {
  const c = document.createElement('canvas')
  c.width = w
  c.height = h
  return [c, c.getContext('2d')]
}

/** Base de metal negro con un poco de grano/desgaste */
function metalBase(ctx, w, h, seed = 1) {
  ctx.fillStyle = COLORS.body
  ctx.fillRect(0, 0, w, h)
  let s = seed * 9301
  const rnd = () => ((s = (s * 9301 + 49297) % 233280) / 233280)
  ctx.globalAlpha = 0.06
  for (let i = 0; i < 900; i++) {
    ctx.fillStyle = rnd() > 0.5 ? '#3a3734' : '#000'
    ctx.fillRect(rnd() * w, rnd() * h, 1 + rnd() * 3, 1 + rnd() * 18)
  }
  ctx.globalAlpha = 1
  return rnd
}

function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath()
  ctx.roundRect(x, y, w, h, r)
}

/** Ranura alargada (a lo largo del eje) en color y en relieve */
function slot(ctx, bump, x, y, w, h, { glow = false } = {}) {
  const g = ctx.createLinearGradient(x, 0, x + w, 0)
  g.addColorStop(0, '#000')
  g.addColorStop(0.5, glow ? '#3b2a17' : '#0b0b0b')
  g.addColorStop(1, '#000')
  roundRect(ctx, x, y, w, h, w / 2)
  ctx.fillStyle = g
  ctx.fill()
  // Brillo de bronce en el borde
  ctx.lineWidth = 3
  ctx.strokeStyle = glow ? 'rgba(195,154,107,0.55)' : 'rgba(80,72,64,0.6)'
  ctx.stroke()
  roundRect(bump, x, y, w, h, w / 2)
  bump.fillStyle = '#000'
  bump.fill()
}

/** Ojo grabado con pestañas y rayos. angle: 0 = eje largo horizontal en el lienzo */
function eye(ctx, cx, cy, size, angle = 0, rays = true) {
  ctx.save()
  ctx.translate(cx, cy)
  ctx.rotate(angle)
  ctx.strokeStyle = COLORS.bronze
  ctx.fillStyle = COLORS.bronze
  ctx.lineCap = 'round'
  const w = size
  const h = size * 0.42

  if (rays) {
    ctx.lineWidth = Math.max(1.5, size * 0.012)
    for (let i = 0; i < 34; i++) {
      const a = (i / 34) * Math.PI * 2
      const r0 = w * 0.62
      const r1 = w * (0.78 + (i % 3) * 0.1)
      ctx.beginPath()
      ctx.moveTo(Math.cos(a) * r0, Math.sin(a) * r0 * 0.85)
      ctx.lineTo(Math.cos(a) * r1, Math.sin(a) * r1 * 0.85)
      ctx.stroke()
    }
  }

  // Párpados
  ctx.lineWidth = Math.max(2, size * 0.035)
  ctx.beginPath()
  ctx.moveTo(-w / 2, 0)
  ctx.quadraticCurveTo(0, -h * 1.25, w / 2, 0)
  ctx.quadraticCurveTo(0, h * 1.25, -w / 2, 0)
  ctx.stroke()
  // Pliegue superior
  ctx.lineWidth = Math.max(1.5, size * 0.02)
  ctx.beginPath()
  ctx.moveTo(-w * 0.42, -h * 0.35)
  ctx.quadraticCurveTo(0, -h * 1.55, w * 0.42, -h * 0.35)
  ctx.stroke()
  // Iris
  ctx.save()
  ctx.beginPath()
  ctx.moveTo(-w / 2, 0)
  ctx.quadraticCurveTo(0, -h * 1.25, w / 2, 0)
  ctx.quadraticCurveTo(0, h * 1.25, -w / 2, 0)
  ctx.clip()
  const ir = h * 0.62
  const grad = ctx.createRadialGradient(0, 0, ir * 0.2, 0, 0, ir)
  grad.addColorStop(0, COLORS.cream)
  grad.addColorStop(1, COLORS.bronzeDark)
  ctx.fillStyle = grad
  ctx.beginPath()
  ctx.arc(0, 0, ir, 0, Math.PI * 2)
  ctx.fill()
  ctx.strokeStyle = COLORS.body
  ctx.lineWidth = 1.2
  for (let i = 0; i < 24; i++) {
    const a = (i / 24) * Math.PI * 2
    ctx.beginPath()
    ctx.moveTo(Math.cos(a) * ir * 0.38, Math.sin(a) * ir * 0.38)
    ctx.lineTo(Math.cos(a) * ir * 0.95, Math.sin(a) * ir * 0.95)
    ctx.stroke()
  }
  ctx.fillStyle = '#0a0a0a'
  ctx.beginPath()
  ctx.arc(0, 0, ir * 0.36, 0, Math.PI * 2)
  ctx.fill()
  ctx.fillStyle = COLORS.cream
  ctx.beginPath()
  ctx.arc(ir * 0.18, -ir * 0.2, ir * 0.1, 0, Math.PI * 2)
  ctx.fill()
  ctx.restore()
  // Pestañas
  ctx.strokeStyle = COLORS.bronze
  ctx.lineWidth = Math.max(1.5, size * 0.015)
  for (let i = 1; i < 9; i++) {
    const t = i / 9
    const x = -w / 2 + w * t
    const y = -h * 1.25 * 2 * t * (1 - t) * 0.98
    ctx.beginPath()
    ctx.moveTo(x, y)
    ctx.lineTo(x + (t - 0.5) * size * 0.12, y - size * 0.1)
    ctx.stroke()
  }
  ctx.restore()
}

/** Estrella de 4 u 8 puntas */
function star(ctx, cx, cy, r, points = 4, fill = COLORS.bronze) {
  ctx.save()
  ctx.translate(cx, cy)
  ctx.fillStyle = fill
  ctx.beginPath()
  for (let i = 0; i < points * 2; i++) {
    const a = (i / (points * 2)) * Math.PI * 2 - Math.PI / 2
    const rr = i % 2 ? r * 0.18 : r * (i % 4 === 0 || points === 4 ? 1 : 0.6)
    ctx.lineTo(Math.cos(a) * rr, Math.sin(a) * rr)
  }
  ctx.closePath()
  ctx.fill()
  ctx.restore()
}

/** Ornamento tribal / llama entre ranuras */
function flame(ctx, x, y, w, h) {
  ctx.save()
  ctx.translate(x, y)
  ctx.strokeStyle = COLORS.bronze
  ctx.fillStyle = COLORS.bronze
  ctx.lineCap = 'round'
  ctx.lineWidth = w * 0.09
  // Trazo principal en S, de la punta (abajo) hacia atrás (arriba)
  ctx.beginPath()
  ctx.moveTo(0, h)
  ctx.bezierCurveTo(w * 0.6, h * 0.7, -w * 0.5, h * 0.45, w * 0.15, h * 0.15)
  ctx.lineTo(w * 0.05, 0)
  ctx.stroke()
  ctx.lineWidth = w * 0.05
  ctx.beginPath()
  ctx.moveTo(-w * 0.2, h * 0.85)
  ctx.bezierCurveTo(-w * 0.45, h * 0.6, w * 0.3, h * 0.5, -w * 0.25, h * 0.25)
  ctx.stroke()
  // Púas
  for (const [px, py, dx, dy] of [
    [w * 0.2, h * 0.62, w * 0.35, -h * 0.06],
    [-w * 0.15, h * 0.42, -w * 0.32, -h * 0.05],
    [w * 0.1, h * 0.3, w * 0.3, -h * 0.08],
  ]) {
    ctx.beginPath()
    ctx.moveTo(px, py - h * 0.03)
    ctx.lineTo(px + dx, py + dy)
    ctx.lineTo(px, py + h * 0.03)
    ctx.closePath()
    ctx.fill()
  }
  ctx.restore()
}

/** Logo "NO REPLY / TATTOO" con púas, escrito a lo largo del eje */
function logo(ctx, cx, cy, length) {
  ctx.save()
  ctx.translate(cx, cy)
  ctx.rotate(-Math.PI / 2) // se lee de la punta hacia la parte trasera
  const size = length * 0.24
  ctx.font = `400 ${size}px Anton, Impact, sans-serif`
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  // Sombra de grabado
  ctx.fillStyle = 'rgba(0,0,0,0.6)'
  ctx.fillText('NO REPLY', 4, -size * 0.18 + 4)
  ctx.fillStyle = COLORS.cream
  ctx.fillText('NO REPLY', 0, -size * 0.18)
  const tw = ctx.measureText('NO REPLY').width

  // Púas y goteos que salen de las letras
  let s = 7
  const rnd = () => ((s = (s * 9301 + 49297) % 233280) / 233280)
  ctx.fillStyle = COLORS.cream
  // Púas largas hacia arriba y algún goteo corto hacia abajo (estilo metal)
  for (let i = 0; i < 34; i++) {
    const up = i < 24
    const x = -tw / 2 + rnd() * tw
    const y0 = -size * 0.18 + (up ? -size * 0.4 : size * 0.38)
    const len = size * (up ? 0.1 + rnd() * 0.32 : 0.06 + rnd() * 0.14)
    const wdt = size * (0.012 + rnd() * 0.022)
    ctx.beginPath()
    ctx.moveTo(x - wdt, y0)
    ctx.lineTo(x + (rnd() - 0.5) * wdt * 3, y0 + (up ? -len : len))
    ctx.lineTo(x + wdt, y0)
    ctx.closePath()
    ctx.fill()
  }
  // Arañazos para darle textura "metal"
  ctx.strokeStyle = 'rgba(20,19,18,0.55)'
  ctx.lineWidth = 2
  for (let i = 0; i < 26; i++) {
    const x = -tw / 2 + rnd() * tw
    const y = -size * 0.6 + rnd() * size * 0.8
    ctx.beginPath()
    ctx.moveTo(x, y)
    ctx.lineTo(x + (rnd() - 0.5) * size * 0.3, y + size * 0.12)
    ctx.stroke()
  }

  ctx.font = `600 ${size * 0.2}px Georgia, 'Times New Roman', serif`
  ctx.fillStyle = COLORS.bronze
  ctx.fillText('T A T T O O', tw * 0.2, size * 0.5)
  ctx.restore()
}

/* ----------------------------------------------------------------- PIEZAS */

/** Cuerpo principal: logo, ojo con rayos, estrellas y ranuras de ventilación */
export function drawMainBody(w = 2048, h = 1200) {
  const [c, ctx] = canvas(w, h)
  const [b, bump] = canvas(w, h)
  bump.fillStyle = '#fff'
  bump.fillRect(0, 0, w, h)
  metalBase(ctx, w, h, 3)

  // Logo centrado en u ≈ 0.68 (cara visible al llegar al capítulo del cuerpo)
  const lx = w * 0.68
  logo(ctx, lx, h * 0.5, h * 0.95)
  // Ojo con rayos junto al logo, hacia la parte trasera
  eye(ctx, lx + w * 0.13, h * 0.2, h * 0.24, -Math.PI / 2)
  star(ctx, lx - w * 0.07, h * 0.32, h * 0.045)
  star(ctx, lx + w * 0.09, h * 0.62, h * 0.03)

  // Ranuras de ventilación repartidas por el resto del contorno
  for (const u of [0.08, 0.24, 0.4, 0.92]) {
    slot(ctx, bump, w * u, h * 0.12, w * 0.045, h * 0.36, { glow: true })
    slot(ctx, bump, w * u, h * 0.56, w * 0.045, h * 0.3, { glow: true })
  }
  slot(ctx, bump, w * 0.86, h * 0.7, w * 0.04, h * 0.2, { glow: true })
  // Segundo ojo pequeño en la otra cara
  eye(ctx, w * 0.32, h * 0.5, h * 0.16, -Math.PI / 2, false)

  return { color: c, bump: b }
}

/** Grip delantero: ranuras alargadas con ornamentos tribales entre ellas */
export function drawGrip(w = 2048, h = 1200) {
  const [c, ctx] = canvas(w, h)
  const [b, bump] = canvas(w, h)
  bump.fillStyle = '#fff'
  bump.fillRect(0, 0, w, h)
  metalBase(ctx, w, h, 5)
  const n = 6
  for (let i = 0; i < n; i++) {
    const x = (i / n) * w
    slot(ctx, bump, x + w * 0.015, h * 0.12, w * 0.06, h * 0.72)
    flame(ctx, x + w * 0.125, h * 0.12, w * 0.07, h * 0.72)
  }
  return { color: c, bump: b }
}

/** Anillo con ojo grabado y pequeños adornos */
export function drawEyeRing(w = 2048, h = 300) {
  const [c, ctx] = canvas(w, h)
  const [b, bump] = canvas(w, h)
  bump.fillStyle = '#fff'
  bump.fillRect(0, 0, w, h)
  metalBase(ctx, w, h, 7)
  eye(ctx, w * 0.7, h * 0.5, h * 0.62, 0, false)
  eye(ctx, w * 0.2, h * 0.5, h * 0.62, 0, false)
  for (const u of [0.45, 0.95]) star(ctx, w * u, h * 0.5, h * 0.22, 4)
  // Pequeños orificios
  for (const u of [0.55, 0.57, 0.59]) {
    ctx.fillStyle = '#000'
    ctx.beginPath()
    ctx.arc(w * u, h * 0.3, h * 0.05, 0, Math.PI * 2)
    ctx.fill()
  }
  return { color: c, bump: b }
}

/** Moleteado en diamante (se repite alrededor) */
export function drawKnurl(w = 256, h = 256) {
  const [c, ctx] = canvas(w, h)
  const [b, bump] = canvas(w, h)
  for (const [g, light, dark] of [
    [ctx, '#2a2725', '#0c0b0a'],
    [bump, '#fff', '#222'],
  ]) {
    g.fillStyle = dark
    g.fillRect(0, 0, w, h)
    g.fillStyle = light
    const n = 8
    const s = w / n
    for (let y = 0; y <= n; y++) {
      for (let x = 0; x <= n; x++) {
        g.beginPath()
        g.moveTo(x * s, y * s - s * 0.42)
        g.lineTo(x * s + s * 0.42, y * s)
        g.lineTo(x * s, y * s + s * 0.42)
        g.lineTo(x * s - s * 0.42, y * s)
        g.closePath()
        g.fill()
      }
    }
  }
  return { color: c, bump: b }
}

/** Estrías verticales de la tapa trasera */
export function drawGrooves(w = 1024, h = 128, count = 36) {
  const [c, ctx] = canvas(w, h)
  const [b, bump] = canvas(w, h)
  ctx.fillStyle = COLORS.body
  ctx.fillRect(0, 0, w, h)
  bump.fillStyle = '#fff'
  bump.fillRect(0, 0, w, h)
  const s = w / count
  for (let i = 0; i < count; i++) {
    const g = ctx.createLinearGradient(i * s, 0, i * s + s, 0)
    g.addColorStop(0, '#050505')
    g.addColorStop(0.5, '#2c2a28')
    g.addColorStop(1, '#050505')
    ctx.fillStyle = g
    ctx.fillRect(i * s + s * 0.15, 0, s * 0.7, h)
    bump.fillStyle = '#000'
    bump.fillRect(i * s, 0, s * 0.18, h)
  }
  return { color: c, bump: b }
}

/** Medallón con estrella de 8 puntas */
export function drawMedallion(size = 256) {
  const [c, ctx] = canvas(size, size)
  const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2)
  g.addColorStop(0, '#1d1b19')
  g.addColorStop(1, '#0b0a09')
  ctx.fillStyle = g
  ctx.fillRect(0, 0, size, size)
  star(ctx, size / 2, size / 2, size * 0.42, 8)
  ctx.strokeStyle = COLORS.bronze
  ctx.lineWidth = size * 0.02
  ctx.beginPath()
  ctx.arc(size / 2, size / 2, size * 0.47, 0, Math.PI * 2)
  ctx.stroke()
  return { color: c }
}
