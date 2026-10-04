import { useEffect, useRef, useState } from 'react'
import { useMediaQuery } from '../hooks/useMediaQuery.js'
import { ChevronLeft, ChevronRight } from './icons/Icons.jsx'
import './Carousel.css'

/**
 * Carrusel por posición (no por scroll): siempre muestra elementos completos y
 * no se sale de los extremos aunque se pulse muchas veces seguidas.
 *
 * perView    → elementos visibles { desktop, tablet, mobile }
 * step       → cuántos avanza cada flecha / gesto ('page' = una pantalla entera)
 * indicator  → 'dots' (pocos elementos) | 'progress' (muchos: barra + contador)
 */
export default function Carousel({
  items,
  renderItem,
  getKey = (item) => item.id,
  perView = { desktop: 3, tablet: 2, mobile: 1 },
  step = 1,
  indicator = 'dots',
  label,
  className = '',
}) {
  const isTablet = useMediaQuery('(max-width: 1023px)')
  const isMobile = useMediaQuery('(max-width: 639px)')
  const per = isMobile ? perView.mobile : isTablet ? perView.tablet : perView.desktop
  const jump = step === 'page' ? per : step
  const maxIndex = Math.max(0, items.length - per)
  const [index, setIndex] = useState(0)
  const touch = useRef(null)

  // Si cambian los elementos visibles (girar el móvil, filtrar), no salirse del final.
  useEffect(() => {
    setIndex((i) => Math.min(i, maxIndex))
  }, [maxIndex])

  // Funcional para que varios clics rápidos seguidos sumen bien y nunca pasen del límite.
  const move = (delta) => setIndex((i) => Math.max(0, Math.min(maxIndex, i + delta)))
  const go = (i) => setIndex(Math.max(0, Math.min(maxIndex, i)))

  const onTouchStart = (e) => {
    const t = e.touches[0]
    touch.current = { x: t.clientX, y: t.clientY }
  }
  const onTouchEnd = (e) => {
    if (!touch.current) return
    const t = e.changedTouches[0]
    const dx = t.clientX - touch.current.x
    const dy = t.clientY - touch.current.y
    touch.current = null
    // Solo cuenta como deslizar si el gesto es claramente horizontal.
    if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy) * 1.5) move(dx < 0 ? jump : -jump)
  }
  const onKeyDown = (e) => {
    if (e.key === 'ArrowRight') move(jump)
    if (e.key === 'ArrowLeft') move(-jump)
  }

  const pages = maxIndex + 1
  const shownTo = Math.min(items.length, index + per)

  return (
    <div className={`carousel ${className}`} style={{ '--per': per, '--i': index }}>
      <div
        className="carousel__viewport"
        tabIndex={0}
        role="region"
        aria-roledescription="carrusel"
        aria-label={label}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        onKeyDown={onKeyDown}
      >
        <ul className="carousel__track">
          {items.map((item, i) => {
            const hidden = i < index || i >= index + per
            return (
              <li key={getKey(item)} className="carousel__slide" aria-hidden={hidden} inert={hidden ? true : undefined}>
                {renderItem(item, i)}
              </li>
            )
          })}
        </ul>
      </div>

      {maxIndex > 0 && (
        <div className="carousel__nav">
          {indicator === 'dots' ? (
            <div className="carousel__dots">
              {Array.from({ length: pages }, (_, i) => (
                <button
                  key={i}
                  type="button"
                  className={`carousel__dot ${i === index ? 'is-active' : ''}`}
                  aria-current={i === index ? 'true' : undefined}
                  aria-label={`Ir al elemento ${i + 1}`}
                  onClick={() => go(i)}
                />
              ))}
            </div>
          ) : (
            <div className="carousel__progress">
              <span className="carousel__count" aria-live="polite">
                {String(shownTo).padStart(2, '0')} <span>/ {String(items.length).padStart(2, '0')}</span>
              </span>
              <span className="carousel__bar" aria-hidden="true">
                <span style={{ width: `${(shownTo / items.length) * 100}%` }} />
              </span>
            </div>
          )}

          <div className="carousel__arrows">
            <button type="button" className="carousel__btn" onClick={() => move(-jump)} disabled={index === 0} aria-label="Anterior">
              <ChevronLeft size={20} />
            </button>
            <button
              type="button"
              className="carousel__btn"
              onClick={() => move(jump)}
              disabled={index === maxIndex}
              aria-label="Siguiente"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
