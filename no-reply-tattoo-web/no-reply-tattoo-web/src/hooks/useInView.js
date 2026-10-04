import { useEffect, useState } from 'react'

/**
 * Devuelve true cuando el elemento entra en pantalla.
 * once: deja de observar tras la primera aparición.
 */
export function useInView(ref, { once = true, threshold = 0.15, rootMargin = '0px 0px -8% 0px', disabled = false } = {}) {
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (disabled || !el) return
    if (typeof IntersectionObserver === 'undefined') {
      setInView(true)
      return
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          if (once) io.disconnect()
        } else if (!once) {
          setInView(false)
        }
      },
      { threshold, rootMargin },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [ref, once, threshold, rootMargin, disabled])

  return inView
}
