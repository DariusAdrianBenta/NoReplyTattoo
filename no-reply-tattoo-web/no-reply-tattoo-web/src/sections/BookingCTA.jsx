import { content } from '../data/content.js'
import { images } from '../data/images.js'
import { site } from '../data/site.js'
import { instagramUrl, whatsappUrl } from '../utils/links.js'
import Photo from '../components/Photo.jsx'
import Reveal from '../components/Reveal.jsx'
import BookingButton from '../components/BookingButton.jsx'
import Ornament from '../components/ornaments/Ornament.jsx'
import { InstagramIcon, WhatsAppIcon } from '../components/icons/Icons.jsx'
import './BookingCTA.css'

export default function BookingCTA() {
  const c = content.booking

  return (
    <section id="cita-cta" className="bcta" aria-labelledby="bcta-title">
      <div className="bcta__media" aria-hidden="true">
        <Photo image={images.booking} sizes="100vw" widths={[768, 1280, 1920]} fallbackWidth={1600} />
      </div>

      <div className="container bcta__inner">
        <Ornament name="heart" size={46} className="bcta__o bcta__o--heart" draw strokeWidth={1.3} />
        <Ornament name="sparkle" size={20} className="bcta__o bcta__o--spark" />

        <h2 id="bcta-title" className="bcta__title display">
          <Reveal as="span" className="bcta__top outline">
            {c.titleTop}
          </Reveal>
          <Reveal as="span" className="bcta__bottom" delay={0.12}>
            {c.titleBottom}
          </Reveal>
        </h2>

        <Reveal className="bcta__row" delay={0.2}>
          <p className="lead">{c.text}</p>
          <div className="bcta__actions">
            <BookingButton size="lg">{c.cta}</BookingButton>
            <div className="bcta__alt">
              <span>{c.altContact}</span>
              <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className="link-line">
                <WhatsAppIcon size={16} /> WhatsApp
              </a>
              <a href={instagramUrl()} target="_blank" rel="noopener noreferrer" className="link-line">
                <InstagramIcon size={16} /> {site.social.instagram.handle}
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
