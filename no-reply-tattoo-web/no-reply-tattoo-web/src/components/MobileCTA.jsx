import { useEffect, useState } from 'react'
import { site } from '../data/site.js'
import { useUI } from '../context/UIContext.jsx'
import { instagramUrl, whatsappUrl } from '../utils/links.js'
import { InstagramIcon, WhatsAppIcon } from './icons/Icons.jsx'
import BookingButton from './BookingButton.jsx'
import './MobileCTA.css'

/** Barra fija inferior en móvil: aparece tras el hero, se oculta al llegar al footer. */
export default function MobileCTA() {
  const { booking } = useUI()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const hero = document.getElementById('inicio')
    const footer = document.querySelector('.footer')
    if (!hero || typeof IntersectionObserver === 'undefined') return
    const state = { hero: true, footer: false }
    const update = () => setVisible(!state.hero && !state.footer)
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.target === hero) state.hero = e.isIntersecting
        if (e.target === footer) state.footer = e.isIntersecting
      })
      update()
    }, { threshold: 0.05 })
    io.observe(hero)
    if (footer) io.observe(footer)
    return () => io.disconnect()
  }, [])

  if (!site.features.mobileStickyCta) return null

  return (
    <div className={`mcta ${visible && !booking.open ? 'is-visible' : ''}`} inert={!visible || booking.open}>
      <BookingButton className="mcta__main" icon={false} />
      <a className="mcta__icon" href={whatsappUrl()} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
        <WhatsAppIcon size={20} />
      </a>
      <a
        className="mcta__icon"
        href={instagramUrl()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Instagram ${site.social.instagram.handle}`}
      >
        <InstagramIcon size={20} />
      </a>
    </div>
  )
}
