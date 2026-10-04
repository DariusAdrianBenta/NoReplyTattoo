import { useEffect } from 'react'
import { site } from '../data/site.js'
import { sectionHref, instagramUrl, whatsappUrl, addressLine } from '../utils/links.js'
import { useLockBody } from '../hooks/useLockBody.js'
import { InstagramIcon, StarMark, WhatsAppIcon } from './icons/Icons.jsx'
import BookingButton from './BookingButton.jsx'
import Ornament from './ornaments/Ornament.jsx'
import './MobileMenu.css'

export default function MobileMenu({ open, onClose }) {
  useLockBody(open)

  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  return (
    <div id="mobile-menu" className={`mmenu ${open ? 'is-open' : ''}`} aria-hidden={!open} inert={!open}>
      <Ornament name="snake" size={120} className="mmenu__snake" strokeWidth={1.1} />
      <nav className="mmenu__nav" aria-label="Menú móvil">
        <ol>
          {site.nav.map((item, i) => (
            <li key={item.id} style={{ '--i': i }}>
              <a href={sectionHref(item.id)} onClick={onClose}>
                <span className="mmenu__num">0{i + 1}</span>
                <span className="mmenu__label">{item.label}</span>
                {item.highlight && <StarMark size={18} className="mmenu__star" />}
              </a>
            </li>
          ))}
        </ol>
      </nav>

      <div className="mmenu__footer">
        <BookingButton block size="lg" onClick={onClose} />
        <div className="mmenu__social">
          <a href={instagramUrl()} target="_blank" rel="noopener noreferrer">
            <InstagramIcon size={18} /> {site.social.instagram.handle}
          </a>
          <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer">
            <WhatsAppIcon size={18} /> WhatsApp
          </a>
        </div>
        <p className="mmenu__address">{addressLine()}</p>
      </div>
    </div>
  )
}
