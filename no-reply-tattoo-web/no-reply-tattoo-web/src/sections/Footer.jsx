import { site } from '../data/site.js'
import { content } from '../data/content.js'
import { addressLine, instagramUrl, mapsUrl, sectionHref, whatsappUrl } from '../utils/links.js'
import Logo from '../components/Logo.jsx'
import BookingButton from '../components/BookingButton.jsx'
import Ornament from '../components/ornaments/Ornament.jsx'
import { InstagramIcon, MapPinIcon, WhatsAppIcon } from '../components/icons/Icons.jsx'
import './Footer.css'

function Marquee({ items }) {
  const row = (hidden) => (
    <div className="marquee__row" aria-hidden={hidden || undefined}>
      {items.map((t, i) => (
        <span key={i} className="marquee__item">
          {t}
          <Ornament name={i % 2 ? 'cross' : 'sparkle'} size={22} strokeWidth={1.6} />
        </span>
      ))}
    </div>
  )
  return (
    <div className="marquee" role="presentation">
      {row(false)}
      {row(true)}
    </div>
  )
}

export default function Footer() {
  const c = content.footer
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <Marquee items={c.marquee} />

      <div className="container">
        <div className="footer__cta">
          <p className="footer__cta-title display">
            {c.cta}
            <Ornament name="arrow" size={70} className="footer__arrow" strokeWidth={1.4} />
          </p>
          <BookingButton size="lg" />
        </div>

        <div className="footer__grid">
          <div className="footer__brand">
            <Logo />
            <p className="muted">{site.claim}</p>
            <p className="footer__address">{addressLine()}</p>
          </div>

          <nav aria-label="Pie de página">
            <h2 className="footer__h">Menu</h2>
            <ul className="footer__nav">
              {site.footerNav.map((item) => (
                <li key={item.id}>
                  <a href={sectionHref(item.id)}>{item.label}</a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="footer__h">Social</h2>
            <ul className="footer__links">
              <li>
                <a href={instagramUrl()} target="_blank" rel="noopener noreferrer">
                  <InstagramIcon size={16} /> Instagram
                </a>
              </li>
              <li>
                <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer">
                  <WhatsAppIcon size={16} /> WhatsApp
                </a>
              </li>
              <li>
                <a href={mapsUrl()} target="_blank" rel="noopener noreferrer">
                  <MapPinIcon size={16} /> Google Maps
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="footer__h">Legal</h2>
            <ul className="footer__links">
              <li>
                <a href="/politica-privacidad">Política de privacidad</a>
              </li>
              <li>
                <a href="/aviso-legal">Aviso legal</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="footer__giant" aria-hidden="true">
        <span className="display">{site.brand}</span>
      </div>

      <div className="container footer__bottom">
        <p>
          © {year} {site.name}. Todos los derechos reservados.
        </p>
        <a href={instagramUrl()} target="_blank" rel="noopener noreferrer" className="link-line">
          {site.social.instagram.handle}
        </a>
      </div>
    </footer>
  )
}
