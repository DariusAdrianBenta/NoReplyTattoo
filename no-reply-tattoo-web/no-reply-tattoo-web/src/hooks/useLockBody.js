import { useEffect } from 'react'

let locks = 0

/** Bloquea el scroll del body mientras `active` sea true (menús y modales). */
export function useLockBody(active) {
  useEffect(() => {
    if (!active) return
    locks += 1
    const scrollbar = window.innerWidth - document.documentElement.clientWidth
    document.documentElement.style.setProperty('--scrollbar', `${scrollbar}px`)
    document.body.classList.add('is-locked')
    return () => {
      locks -= 1
      if (locks === 0) document.body.classList.remove('is-locked')
    }
  }, [active])
}
