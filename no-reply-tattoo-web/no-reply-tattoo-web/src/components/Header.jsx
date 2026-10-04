import { useState } from 'react'
import { site } from '../data/site.js'
import { reviewsSummary } from '../data/reviews.js'
import { useScrolled } from '../hooks/useScrolled.js'
import { useScrollSpy } from '../hooks/useScrollSpy.js'
import { sectionHref, instagramUrl } from '../utils/links.js'
import { InstagramIcon, StarMark } from './icons/Icons.jsx'
import Logo from './Logo.jsx'
import BookingButton from './BookingButton.jsx'
import MobileMenu from './MobileMenu.jsx'
import './Header.css'

export default function Header({ isHome = true }) {
  const scrolled = useScrolled(40)
  const [menuOpen, setMenuOpen] = useState(false)
  const active = useScrollSpy(isHome ? site.nav.map((n) => n.id) : [])

  return (
    <>
      <header className={`header ${scrolled || !isHome ? 'is-scrolled' : ''} ${menuOpen ? 'is-menu-open' : ''}`}>
        <div className="header__inner">
          <Logo className="header__logo" onClick={() => setMenuOpen(false)} />

          <nav className="header__nav" aria-label="Principal">
            <ul>
              {site.nav.map((item) => (
                <li key={item.id}>
                  <a
                    href={sectionHref(item.id)}
                    className={`header__link ${item.highlight ? 'header__link--highlight' : ''} ${isHome && active === item.id ? 'is-active' : ''}`}
                    aria-current={isHome && active === item.id ? 'true' : undefined}
                  >
                    {item.highlight && <StarMark />}
                    {item.label}
                    {item.highlight && (
                      <span className="header__rating">
                        {reviewsSummary.rating.toLocaleString('es-ES', { minimumFractionDigits: 1 })}
                      </span>
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="header__actions">
            <a
              className="header__ig"
              href={instagramUrl()}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Instagram ${site.social.instagram.handle}`}
            >
              <InstagramIcon size={18} />
              <span className="header__ig-handle">{site.social.instagram.handle}</span>
            </a>
            <BookingButton className="header__cta" icon={false} />
            <button
              type="button"
              className="header__burger"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
              onClick={() => setMenuOpen((v) => !v)}
            >
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  )
}
