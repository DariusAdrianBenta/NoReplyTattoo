import { useCallback, useEffect, useRef, useState } from 'react'

/**
 * Retiene la página en una sección y convierte cada gesto (rueda, deslizar,
 * teclado) en UN paso, con una duración fija por paso. Hasta que no se
 * recorren todos los pasos no se puede seguir bajando (ni subiendo).
 *
 * - Se activa al cruzar el borde superior de la sección. Un "imán" nativo
 *   (scroll-snap con scroll-snap-stop: always, ver Studio.css) obliga al
 *   navegador a detenerse justo ahí aunque se deslice muy rápido en el móvil.
 * - Los saltos desde enlaces del menú no se quedan atrapados.
 * - En táctil, mientras está retenida se bloquea el scroll del documento
 *   (corta la inercia del dedo).
 * - Al llegar al final, el siguiente gesto suelta la página y la lleva a la
 *   sección siguiente (o a la anterior si se sube desde el primer paso).
 *
 * Devuelve { step, locked, goTo }.
 */
export function useScrollStepper(ref, steps, { duration = 1100, enabled = true } = {}) {
  const [step, setStep] = useState(0)
  const [locked, setLocked] = useState(false)
  const s = useRef({ step: 0, locked: false, busyUntil: 0, lastInput: 0, prevTop: null, releasedAt: 0, navUntil: 0, wheel: 0, wheelAt: 0, touchY: null })

  const setStepBoth = useCallback((v) => {
    s.current.step = v
    setStep(v)
  }, [])

  const touch = typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches

  // Alinea la sección con el borde superior durante unos fotogramas
  // (iOS aplica tarde el scroll si aún había inercia).
  const align = useCallback(() => {
    const el = ref.current
    if (!el) return
    const until = performance.now() + 350
    const tick = () => {
      const top = el.getBoundingClientRect().top
      if (Math.abs(top) > 0.5) window.scrollTo({ top: top + window.scrollY, behavior: 'instant' })
      if (s.current.locked && performance.now() < until) requestAnimationFrame(tick)
    }
    tick()
  }, [ref])

  const lock = useCallback((atStep) => {
    if (!ref.current) return
    const st = s.current
    st.locked = true
    st.prevTop = 0
    st.busyUntil = performance.now() + 450 // pequeña pausa al entrar
    st.wheel = 0
    if (touch) document.documentElement.classList.add('is-scroll-locked')
    setLocked(true)
    setStepBoth(atStep)
    align()
  }, [ref, setStepBoth, align, touch])

  const release = useCallback((dir) => {
    const el = ref.current
    const st = s.current
    st.locked = false
    st.prevTop = 0
    st.releasedAt = performance.now() // evita re-engancharse mientras sale
    document.documentElement.classList.remove('is-scroll-locked')
    setLocked(false)
    if (!el) return
    const rect = el.getBoundingClientRect()
    const y = window.scrollY + (dir > 0 ? rect.bottom : rect.top - window.innerHeight * 0.85)
    window.scrollTo({ top: Math.max(0, y), behavior: 'smooth' })
  }, [ref])

  // Un paso por gesto, con duración fija
  const advance = useCallback((dir) => {
    const st = s.current
    const now = performance.now()
    if (now < st.busyUntil) return
    st.busyUntil = now + duration
    const next = st.step + dir
    if (next < 0 || next >= steps) release(dir)
    else setStepBoth(next)
  }, [duration, steps, release, setStepBoth])

  const goTo = useCallback((i) => {
    s.current.busyUntil = performance.now() + duration
    setStepBoth(Math.max(0, Math.min(steps - 1, i)))
  }, [duration, steps, setStepBoth])

  useEffect(() => {
    if (!enabled) return
    const st = s.current
    const el = () => ref.current

    const nearTop = () => {
      const r = el()?.getBoundingClientRect()
      return r && Math.abs(r.top) < 60
    }
    const blocked = () => {
      const now = performance.now()
      return now - st.releasedAt < 1200 || now < st.navUntil
    }
    // ¿Debe engancharse con un gesto en esta dirección?
    const tryEngage = (dir) => {
      if (st.locked || blocked() || !nearTop()) return false
      lock(dir > 0 ? 0 : steps - 1)
      return true
    }

    const onWheel = (e) => {
      st.lastInput = performance.now()
      const dir = Math.sign(e.deltaY)
      if (!dir) return
      if (!st.locked && !tryEngage(dir)) return
      e.preventDefault()
      // Agrupa los eventos de un mismo gesto (trackpads envían muchos)
      const now = performance.now()
      if (now - st.wheelAt > 250) st.wheel = 0
      st.wheelAt = now
      st.wheel += e.deltaY
      if (Math.abs(st.wheel) > 30) {
        st.wheel = 0
        advance(dir)
      }
    }

    const onTouchStart = (e) => {
      st.lastInput = performance.now()
      st.touchY = e.touches[0].clientY
    }
    const onTouchMove = (e) => {
      st.lastInput = performance.now()
      if (st.touchY == null) return
      const dy = st.touchY - e.touches[0].clientY
      if (!st.locked && Math.abs(dy) > 8) tryEngage(Math.sign(dy))
      if (st.locked) e.preventDefault()
    }
    const onTouchEnd = (e) => {
      st.lastInput = performance.now()
      if (st.touchY == null) return
      const dy = st.touchY - e.changedTouches[0].clientY
      st.touchY = null
      if (st.locked && Math.abs(dy) > 30) advance(Math.sign(dy))
    }

    const KEYS = { ArrowDown: 1, PageDown: 1, ' ': 1, ArrowUp: -1, PageUp: -1 }
    const onKey = (e) => {
      const dir = KEYS[e.key]
      if (!dir || e.target.closest?.('input, textarea, select, [contenteditable]')) return
      if (e.key === ' ' && e.target.closest?.('button, a')) return
      st.lastInput = performance.now()
      if (!st.locked && !tryEngage(dir)) return
      e.preventDefault()
      advance(dir)
    }

    // Cruce del borde superior durante un scroll del usuario (incluida la inercia)
    const onScroll = () => {
      const r = el()?.getBoundingClientRect()
      if (!r) return
      if (st.locked) {
        // Mantiene la página fija aunque llegue inercia del gesto anterior
        if (Math.abs(r.top) > 1) window.scrollTo({ top: r.top + window.scrollY, behavior: 'instant' })
        return
      }
      const prev = st.prevTop
      st.prevTop = r.top
      if (prev == null || blocked()) return
      if (prev > 0.5 && r.top <= 0.5) lock(0) // entrando desde arriba
      else if (prev < -0.5 && r.top >= -0.5) lock(steps - 1) // volviendo desde abajo
    }

    // Clic en enlaces del menú (#seccion): ese desplazamiento no se retiene
    const onClick = (e) => {
      if (e.target.closest?.('a[href*="#"]')) st.navUntil = performance.now() + 2000
    }

    document.documentElement.classList.add('has-scroll-stepper')

    window.addEventListener('wheel', onWheel, { passive: false })
    window.addEventListener('touchstart', onTouchStart, { passive: true })
    window.addEventListener('touchmove', onTouchMove, { passive: false })
    window.addEventListener('touchend', onTouchEnd, { passive: true })
    window.addEventListener('keydown', onKey)
    window.addEventListener('scroll', onScroll, { passive: true })
    document.addEventListener('click', onClick, true)
    return () => {
      document.removeEventListener('click', onClick, true)
      document.documentElement.classList.remove('has-scroll-stepper', 'is-scroll-locked')
      window.removeEventListener('wheel', onWheel)
      window.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchmove', onTouchMove)
      window.removeEventListener('touchend', onTouchEnd)
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('scroll', onScroll)
    }
  }, [enabled, ref, steps, lock, advance])

  return { step, locked, goTo }
}
