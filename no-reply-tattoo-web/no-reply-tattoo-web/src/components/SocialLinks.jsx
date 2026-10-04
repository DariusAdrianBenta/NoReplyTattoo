import { site } from '../data/site.js'
import { instagramUrl, whatsappUrl } from '../utils/links.js'
import { InstagramIcon, WhatsAppIcon } from './icons/Icons.jsx'

/** Iconos de Instagram + WhatsApp (botones redondos discretos). */
export default function SocialLinks({ className = '', size = 18 }) {
  return (
    <div className={`social-links ${className}`} style={{ display: 'flex', gap: 10 }}>
      <a
        className="icon-btn"
        href={instagramUrl()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Instagram ${site.social.instagram.handle}`}
      >
        <InstagramIcon size={size} />
      </a>
      <a className="icon-btn" href={whatsappUrl()} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
        <WhatsAppIcon size={size} />
      </a>
    </div>
  )
}
