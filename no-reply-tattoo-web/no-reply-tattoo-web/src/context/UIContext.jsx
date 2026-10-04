import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'

/* Estado global de interfaz:
   - Modal de "Solicitar cita" (se abre desde cualquier botón o con /#cita)
   - Filtro de portfolio por artista (desde "Ver portfolio" en Artistas) */

const UIContext = createContext(null)

export const BOOKING_HASH = '#cita'

export function UIProvider({ children }) {
  const [booking, setBooking] = useState({ open: false, preset: {} })
  const [artistFilter, setArtistFilter] = useState(null)

  const openBooking = useCallback((preset = {}) => {
    setBooking({ open: true, preset })
  }, [])

  const closeBooking = useCallback(() => {
    setBooking((b) => ({ ...b, open: false }))
    if (window.location.hash === BOOKING_HASH) {
      history.replaceState(null, '', window.location.pathname + window.location.search)
    }
  }, [])

  // Enlace directo (p. ej. desde la bio de Instagram): tuweb.com/#cita
  useEffect(() => {
    const check = () => {
      if (window.location.hash === BOOKING_HASH) setBooking({ open: true, preset: {} })
    }
    check()
    window.addEventListener('hashchange', check)
    return () => window.removeEventListener('hashchange', check)
  }, [])

  const value = useMemo(
    () => ({ booking, openBooking, closeBooking, artistFilter, setArtistFilter }),
    [booking, openBooking, closeBooking, artistFilter],
  )

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>
}

export function useUI() {
  const ctx = useContext(UIContext)
  if (!ctx) throw new Error('useUI debe usarse dentro de <UIProvider>')
  return ctx
}
