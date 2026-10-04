import { useEffect, useRef, useState } from 'react'
import { artists } from '../data/artists.js'
import { styles } from '../data/portfolio.js'
import { content } from '../data/content.js'
import { site } from '../data/site.js'
import { useUI } from '../context/UIContext.jsx'
import Photo from '../components/Photo.jsx'
import Reveal from '../components/Reveal.jsx'
import SectionLabel from '../components/SectionLabel.jsx'
import Lightbox from '../components/Lightbox.jsx'
import Carousel from '../components/Carousel.jsx'
import Ornament from '../components/ornaments/Ornament.jsx'
import { ArrowRight, CloseIcon, InstagramIcon, PlusIcon } from '../components/icons/Icons.jsx'
import './Artists.css'

/* Sección de artistas: selector circular con la foto de cada uno y un único
   desplegable con su ficha. Al elegir otro artista se cierra el anterior. */

const styleLabel = (id) => styles.find((s) => s.id === id)?.label ?? id
const num = (i) => String(i + 1).padStart(2, '0')

function ArtistPanel({ artist, onClose, onOpenWork }) {
  const { setArtistFilter, openBooking } = useUI()
  const firstName = artist.name.split(' ')[0]

  const showPortfolio = (e) => {
    e.preventDefault()
    setArtistFilter(artist.id)
    document.getElementById('tatuajes')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <article className="crew-card" aria-labelledby={`artist-${artist.id}`}>
      <button type="button" className="crew-card__close" onClick={onClose} aria-label={`Cerrar la ficha de ${artist.name}`}>
        <CloseIcon size={18} />
      </button>

      <div className="crew-card__media">
        <Photo image={artist.image} sizes="(max-width: 767px) 100vw, 420px" widths={[480, 768, 1080]} />
      </div>

      <div className="crew-card__body">
        <h3 id={`artist-${artist.id}`} className="crew-card__name display">
          {artist.name.split(' ').map((w, i) => (
            <span key={i} className={i % 2 ? 'outline' : ''}>
              {w}
            </span>
          ))}
        </h3>
        <p className="crew-card__role lettering">{artist.role}</p>
        {site.features.showPlaceholderBadges && artist.placeholder && (
          <span className="placeholder-badge">Perfil de ejemplo</span>
        )}

        <ul className="crew-card__tags" aria-label="Especialidades">
          {artist.specialties.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>

        <p className="crew-card__bio muted">{artist.bio}</p>

        {artist.highlights?.length > 0 && (
          <ul className="crew-card__highlights">
            {artist.highlights.map((h) => (
              <li key={h}>
                <Ornament name="sparkle" size={14} />
                {h}
              </li>
            ))}
          </ul>
        )}

        <div className="crew-card__actions">
          <a href="/#tatuajes" className="btn btn--primary" onClick={showPortfolio} data-cursor="button">
            <span>Ver portfolio</span>
            <ArrowRight size={18} />
          </a>
          <button type="button" className="link-line crew-card__link" onClick={() => openBooking({ artist: artist.id })}>
            Cita con {firstName}
          </button>
          <a className="link-line crew-card__link" href={artist.instagram.url} target="_blank" rel="noopener noreferrer">
            <InstagramIcon size={16} />
            {artist.instagram.handle}
          </a>
        </div>
      </div>

      {artist.works?.length > 0 && (
        <div className="crew-card__works">
          <p className="crew-card__works-label">Trabajos de {firstName}</p>
          <Carousel
            className="crew-works"
            items={artist.works}
            label={`Trabajos de ${artist.name}`}
            perView={{ desktop: 6, tablet: 4, mobile: 3 }}
            step="page"
            indicator="progress"
            renderItem={(w, i) => (
              <button
                type="button"
                className="crew-work"
                data-cursor="view"
                onClick={() => onOpenWork(artist.works, i)}
                aria-label={`Ver en grande: ${w.title}`}
              >
                <Photo image={w} sizes="(max-width: 639px) 33vw, (max-width: 1023px) 25vw, 200px" />
                <span className="crew-work__plus" aria-hidden="true">
                  <PlusIcon size={14} />
                </span>
              </button>
            )}
          />
        </div>
      )}
    </article>
  )
}

export default function Artists() {
  const c = content.artists
  const [selected, setSelected] = useState(null)
  // Último artista abierto: se mantiene pintado mientras el panel se cierra.
  const [shown, setShown] = useState(null)
  const [gallery, setGallery] = useState({ items: [], index: -1 })
  const panelRef = useRef(null)

  const select = (id, { scroll = true } = {}) => {
    setSelected((cur) => (cur === id ? null : id))
    if (id) setShown(id)
    if (!scroll) return
    // Si el desplegable queda muy abajo (móvil), lo acercamos a la vista.
    requestAnimationFrame(() => {
      const el = panelRef.current
      if (!el) return
      const top = el.getBoundingClientRect().top
      if (top > window.innerHeight * 0.65) {
        window.scrollBy({ top: top - window.innerHeight * 0.3, behavior: 'smooth' })
      }
    })
  }

  // Enlaces directos tipo /#diego-sacristan abren la ficha de ese artista.
  useEffect(() => {
    const openFromHash = () => {
      const id = decodeURIComponent(window.location.hash.slice(1))
      if (!artists.some((a) => a.id === id)) return
      setSelected(id)
      setShown(id)
      requestAnimationFrame(() => document.getElementById('artistas')?.scrollIntoView({ behavior: 'smooth' }))
    }
    openFromHash()
    window.addEventListener('hashchange', openFromHash)
    return () => window.removeEventListener('hashchange', openFromHash)
  }, [])

  const shownArtist = artists.find((a) => a.id === shown)

  return (
    <section id="artistas" className="artists section" aria-labelledby="artists-title">
      <div className="container">
        <header className="artists__head">
          <SectionLabel number="03">{c.label}</SectionLabel>
          <h2 id="artists-title" className="display h2 artists__title">
            <Reveal as="span">{c.title}</Reveal>
            <span className="artists__lettering lettering" aria-hidden="true">
              {c.lettering}
            </span>
          </h2>
          <Reveal as="p" className="lead artists__text" delay={0.1}>
            {c.text}
          </Reveal>
        </header>

        <Reveal className="crew" delay={0.1}>
          <ul className={`crew__list ${selected ? 'has-selection' : ''}`}>
            {artists.map((a, i) => {
              const active = selected === a.id
              return (
                <li key={a.id} id={a.id} className="crew__item">
                  <button
                    type="button"
                    className={`crew__pick ${active ? 'is-active' : ''}`}
                    aria-expanded={active}
                    aria-controls="crew-panel"
                    onClick={() => select(a.id)}
                  >
                    <span className="crew__ring">
                      <Photo image={a.image} sizes="120px" widths={[160, 240, 320]} className="crew__photo" />
                      <span className="crew__num" aria-hidden="true">
                        {num(i)}
                      </span>
                    </span>
                    <span className="crew__name">{a.name}</span>
                    <span className="crew__role">{a.role}</span>
                  </button>
                </li>
              )
            })}
          </ul>
          <p className={`crew__hint ${selected ? 'is-hidden' : ''}`} aria-hidden={!!selected}>
            Toca un artista para ver su ficha
          </p>
        </Reveal>

        <div
          id="crew-panel"
          ref={panelRef}
          className={`crew__panel ${selected ? 'is-open' : ''}`}
          role="region"
          aria-label={shownArtist ? `Ficha de ${shownArtist.name}` : 'Ficha del artista'}
          inert={selected ? undefined : true}
          onTransitionEnd={(e) => {
            if (e.target === e.currentTarget && !selected) setShown(null)
          }}
        >
          <div className="crew__panel-inner">
            {shownArtist && (
              <div key={shownArtist.id} className="crew__panel-content">
                <ArtistPanel
                  artist={shownArtist}
                  onClose={() => setSelected(null)}
                  onOpenWork={(items, index) => setGallery({ items, index })}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      <Lightbox
        items={gallery.items}
        index={gallery.index}
        onIndex={(index) => setGallery((g) => ({ ...g, index }))}
        onClose={() => setGallery((g) => ({ ...g, index: -1 }))}
        styleLabel={styleLabel}
      />
    </section>
  )
}
