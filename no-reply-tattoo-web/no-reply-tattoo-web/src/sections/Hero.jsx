import { site } from '../data/site.js'
import { content } from '../data/content.js'
import { images } from '../data/images.js'
import { instagramUrl } from '../utils/links.js'
import Photo from '../components/Photo.jsx'
import BookingButton from '../components/BookingButton.jsx'
import Ornament from '../components/ornaments/Ornament.jsx'
import { ArrowRight, InstagramIcon } from '../components/icons/Icons.jsx'
import './Hero.css'

export default function Hero() {
  const c = content.hero

  return (
    <section id="inicio" className="hero" aria-labelledby="hero-title">
      <div className="hero__media">
        <Photo image={images.hero} priority sizes="100vw" widths={[640, 960, 1280, 1920, 2400]} fallbackWidth={1920} quality={68} />
        <div className="hero__shade" aria-hidden="true" />
      </div>

      {/* Ornamentos sutiles */}
      <div className="hero__ornaments" aria-hidden="true">
        <Ornament name="sparkle" size={26} className="hero__o hero__o--1" />
        <Ornament name="sparkle" size={14} className="hero__o hero__o--2" />
        <Ornament name="cross" size={30} className="hero__o hero__o--3" strokeWidth={1.2} />
        <Ornament name="star" size={18} className="hero__o hero__o--4" strokeWidth={1.2} />
      </div>

      <div className="hero__inner">
        <p className="hero__kicker">
          <Ornament name="sparkle" size={12} strokeWidth={2} />
          <span>
            {c.kicker} · {site.address.locality}, {site.address.region}
          </span>
        </p>

        <h1 id="hero-title" className="hero__title">
          <span className="hero__brand display">
            <span className="hero__line hero__line--1">NO</span>
            <span className="hero__line hero__line--2">REPLY</span>
          </span>
          <span className="hero__suffix lettering">
            {site.brandSuffix}
            <Ornament name="swash" size={230} className="hero__swash" draw strokeWidth={2.2} delay={1.1} />
          </span>
        </h1>

        <div className="hero__bottom">
          <p className="hero__claim">{c.claim}</p>
          <div className="hero__ctas">
            <BookingButton size="lg">{c.ctaPrimary}</BookingButton>
            <a href="/#tatuajes" className="btn btn--lg hero__secondary" data-cursor="button">
              <span>{c.ctaSecondary}</span>
              <ArrowRight size={18} />
            </a>
          </div>
        </div>
      </div>

      <div className="hero__meta">
        <a href="/#intro" className="hero__scroll" aria-label="Bajar al contenido">
          <span className="hero__scroll-line" aria-hidden="true" />
          <span>Scroll</span>
        </a>
        <ul className="hero__styles" aria-label="Estilos">
          {c.styles.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
        <a className="hero__ig" href={instagramUrl()} target="_blank" rel="noopener noreferrer">
          <InstagramIcon size={16} />
          {site.social.instagram.handle}
        </a>
      </div>
    </section>
  )
}
