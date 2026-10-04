import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { useLockBody } from '../hooks/useLockBody.js'
import './Modal.css'

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]):not([type="hidden"]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'

/**
 * Modal accesible: portal, foco atrapado, Esc para cerrar, bloqueo de scroll,
 * restaura el foco al cerrar y anima entrada/salida.
 * variant: 'drawer' (panel lateral) | 'lightbox' (pantalla completa)
 */
export default function Modal({ open, onClose, label, variant = 'drawer', className = '', onKeyDown, children }) {
  const [mounted, setMounted] = useState(open)
  const [shown, setShown] = useState(false)
  const panelRef = useRef(null)
  const lastFocus = useRef(null)

  useLockBody(open)

  useEffect(() => {
    if (open) {
      lastFocus.current = document.activeElement
      setMounted(true)
      const raf = requestAnimationFrame(() => requestAnimationFrame(() => setShown(true)))
      return () => cancelAnimationFrame(raf)
    }
    setShown(false)
    const t = setTimeout(() => setMounted(false), 500)
    if (lastFocus.current && typeof lastFocus.current.focus === 'function') {
      lastFocus.current.focus({ preventScroll: true })
    }
    return () => clearTimeout(t)
  }, [open])

  useEffect(() => {
    if (shown && panelRef.current) {
      // En táctil no enfocamos inputs (evita que salte el teclado al abrir)
      const finePointer = window.matchMedia('(pointer: fine)').matches
      const auto = panelRef.current.querySelector('[data-autofocus]')
      const first = (auto && (finePointer || auto.tagName === 'BUTTON') ? auto : null) || panelRef.current
      first.focus({ preventScroll: true })
    }
  }, [shown])

  // Teclado a nivel de documento: Esc funciona aunque el foco se haya perdido
  const keyRef = useRef(null)
  keyRef.current = (e) => {
    if (e.key === 'Escape') {
      e.stopPropagation()
      onClose()
      return
    }
    if (e.key === 'Tab' && panelRef.current) {
      const nodes = [...panelRef.current.querySelectorAll(FOCUSABLE)].filter((n) => n.offsetParent !== null)
      if (!nodes.length) return
      const first = nodes[0]
      const last = nodes[nodes.length - 1]
      const inside = panelRef.current.contains(document.activeElement)
      if (e.shiftKey && (document.activeElement === first || !inside)) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && (document.activeElement === last || !inside)) {
        e.preventDefault()
        first.focus()
      }
    }
    onKeyDown?.(e)
  }

  useEffect(() => {
    if (!open) return
    const handler = (e) => keyRef.current(e)
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [open])

  if (!mounted) return null

  return createPortal(
    <div className={`modal modal--${variant} ${shown ? 'is-open' : ''} ${className}`}>
      <div className="modal__backdrop" onClick={onClose} aria-hidden="true" />
      <div
        ref={panelRef}
        className="modal__panel"
        role="dialog"
        aria-modal="true"
        aria-label={label}
        tabIndex={-1}
      >
        {children}
      </div>
    </div>,
    document.body,
  )
}
