import { useEffect, useRef, useState } from 'react'
import { site } from '../data/site.js'
import './CustomCursor.css'

/* Cursor personalizado (solo escritorio con ratón).
   - Un pequeño anillo sigue al puntero.
   - Sobre elementos con data-cursor="view" (fotos) se convierte en un disco "VER".
   - Sobre botones/enlaces crece ligeramente.
   Se desactiva en src/data/site.js → features.customCursor = false,
   y nunca se activa en táctil ni con "reducir movimiento". */

const canUse = () =>
  typeof window !== 'undefined' &&
  site.features.customCursor &&
  window.matchMedia('(hover: hover) and (pointer: fine)').matches &&
  !window.matchMedia('(prefers-reduced-motion: reduce)').matches

export default function CustomCursor() {
  const [enabled] = useState(canUse)
  const ref = useRef(null)
  const [mode, setMode] = useState('default')
  const [hidden, setHidden] = useState(true)

  useEffect(() => {
    if (!enabled) return
    const el = ref.current
    let x = -100
    let y = -100
    let cx = x
    let cy = y
    let raf

    const loop = () => {
      cx += (x - cx) * 0.22
      cy += (y - cy) * 0.22
      el.style.transform = `translate3d(${cx}px, ${cy}px, 0)`
      raf = requestAnimationFrame(loop)
    }

    const onMove = (e) => {
      x = e.clientX
      y = e.clientY
      setHidden(false)
      const target = e.target.closest?.('[data-cursor], a, button, [role="button"], input, select, textarea, label')
      if (!target) setMode('default')
      else if (target.dataset.cursor === 'view') setMode('view')
      else if (target.matches('input, select, textarea')) setMode('text')
      else setMode('link')
    }
    const onLeave = () => setHidden(true)
    // Tras un clic (p. ej. abrir el lightbox) volvemos al estado normal hasta el siguiente movimiento
    const onDown = () => setMode('default')

    document.documentElement.classList.add('has-cursor')
    window.addEventListener('pointermove', onMove, { passive: true })
    document.addEventListener('pointerleave', onLeave)
    window.addEventListener('pointerdown', onDown)
    raf = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(raf)
      document.documentElement.classList.remove('has-cursor')
      window.removeEventListener('pointermove', onMove)
      document.removeEventListener('pointerleave', onLeave)
      window.removeEventListener('pointerdown', onDown)
    }
  }, [enabled])

  if (!enabled) return null

  return (
    <div ref={ref} className={`cursor cursor--${mode} ${hidden ? 'is-hidden' : ''}`} aria-hidden="true">
      <span className="cursor__ring">
        <span className="cursor__label">Ver</span>
      </span>
    </div>
  )
}
