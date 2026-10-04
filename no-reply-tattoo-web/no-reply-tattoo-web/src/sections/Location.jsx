import { useState } from 'react'
import { site } from '../data/site.js'
import { content } from '../data/content.js'
import { addressLine, instagramUrl, mapsEmbedUrl, mapsUrl, telUrl, whatsappUrl, mailUrl } from '../utils/links.js'
import { isPlaceholder, unbracket } from '../utils/placeholder.js'
import Reveal from '../components/Reveal.jsx'
import SectionLabel from '../components/SectionLabel.jsx'
import Ornament from '../components/ornaments/Ornament.jsx'
import {
  ArrowUpRight,
  ClockIcon,
  InstagramIcon,
  MailIcon,
  MapPinIcon,
  PhoneIcon,
  WhatsAppIcon,
} from '../components/icons/Icons.jsx'
import './Location.css'

const hoursText = (h) =>
  h.closed ? 'Cerrado' : h.slots.map(([o, c]) => `${unbracket(o)} – ${unbracket(c)}`).join(' · ')

/* Mapa de Google cargado bajo demanda (más rápido y sin cookies de terceros hasta que el usuario lo pide). */
function MapCard() {
  const [loaded, setLoaded] = useState(false)

  return (
    <div className="map">
      {loaded ? (
        <iframe
          className="map__iframe"
          title={`Mapa: ${site.name}`}
          src={mapsEmbedUrl()}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      ) : (
        <div className="map__facade">
          <svg className="map__lines" viewBox="0 0 600 450" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
            <path d="M-20 120C80 140 160 90 260 120S440 200 620 160" />
            <path d="M-20 300C120 280 200 330 320 300S500 240 620 270" />
            <path d="M180 -20C200 100 160 200 210 300S260 420 240 480" />
            <path d="M420 -20C400 90 460 180 430 280S380 400 410 480" />
            <path d="M-20 210H620" className="thin" />
            <path d="M320 -20V480" className="thin" />
            <path d="M60 -20 560 480" className="thin" />
          </svg>
          <div className="map__pin">
            <Ornament name="cross" size={34} strokeWidth={1.6} />
            <span className="map__pulse" />
          </div>
          <div className="map__label">
            <strong>{site.brand}</strong>
            <span>{site.address.locality}</span>
          </div>
          <button type="button" className="btn map__load" onClick={() => setLoaded(true)}>
            <MapPinIcon size={18} />
            <span>Ver mapa interactivo</span>
          </button>
        </div>
      )}
    </div>
  )
}

export default function Location() {
  const c = content.location

  return (
    <section id="contacto" className="location section" aria-labelledby="location-title">
      <div className="container">
        <header className="location__head">
          <SectionLabel number="08">{c.label}</SectionLabel>
          <h2 id="location-title" className="display h2">
            <Reveal as="span">{c.title}</Reveal>
          </h2>
          <Reveal as="p" className="lead muted" delay={0.1}>
            {c.text}
          </Reveal>
        </header>

        <div className="location__grid">
          <Reveal className="location__info">
            <address className="loc-block">
              <span className="loc-block__icon">
                <MapPinIcon />
              </span>
              <div>
                <h3 className="loc-block__label">Dirección</h3>
                <p className={isPlaceholder(site.address.street) ? 'is-placeholder' : ''}>{addressLine()}</p>
                <a className="link-line loc-block__link" href={mapsUrl()} target="_blank" rel="noopener noreferrer">
                  Cómo llegar <ArrowUpRight size={14} />
                </a>
              </div>
            </address>

            <div className="loc-block">
              <span className="loc-block__icon">
                <PhoneIcon />
              </span>
              <div>
                <h3 className="loc-block__label">Teléfono</h3>
                <p>
                  <a href={telUrl()}>{site.contact.phone}</a>
                </p>
                <p className="loc-block__sub">
                  <a href={mailUrl()} className="link-line">
                    <MailIcon size={14} /> {site.contact.email}
                  </a>
                </p>
              </div>
            </div>

            <div className="loc-block">
              <span className="loc-block__icon">
                <ClockIcon />
              </span>
              <div>
                <h3 className="loc-block__label">Horario</h3>
                <dl className="hours">
                  {site.hours.map((h) => (
                    <div key={h.day} className={h.closed ? 'is-closed' : ''}>
                      <dt>{h.label}</dt>
                      <dd>{hoursText(h)}</dd>
                    </div>
                  ))}
                </dl>
                {site.hoursNote && <p className="loc-block__sub">{site.hoursNote}</p>}
              </div>
            </div>

            <div className="location__social">
              <a className="btn" href={instagramUrl()} target="_blank" rel="noopener noreferrer">
                <InstagramIcon size={18} />
                <span>{site.social.instagram.handle}</span>
              </a>
              <a className="btn" href={whatsappUrl()} target="_blank" rel="noopener noreferrer">
                <WhatsAppIcon size={18} />
                <span>WhatsApp</span>
              </a>
            </div>
          </Reveal>

          <Reveal variant="fade" className="location__map" delay={0.1}>
            <MapCard />
          </Reveal>
        </div>
      </div>
    </section>
  )
}
