import { useMemo, useState } from 'react'
import { content } from '../data/content.js'
import { site } from '../data/site.js'
import { portfolio, styles } from '../data/portfolio.js'
import { artists } from '../data/artists.js'
import { useUI } from '../context/UIContext.jsx'
import { instagramUrl } from '../utils/links.js'
import Photo from '../components/Photo.jsx'
import Reveal from '../components/Reveal.jsx'
import SectionLabel from '../components/SectionLabel.jsx'
import BookingButton from '../components/BookingButton.jsx'
import Lightbox from '../components/Lightbox.jsx'
import Carousel from '../components/Carousel.jsx'
import Ornament from '../components/ornaments/Ornament.jsx'
import { CloseIcon, InstagramIcon, PlusIcon } from '../components/icons/Icons.jsx'
import './Portfolio.css'

const ALL = 'todos'
// Solo fotos que encajan en formato 4:5 (las verticales tipo historia se deformarían)
const gallery = portfolio.filter((p) => !p.story)
const styleLabel = (id) => styles.find((s) => s.id === id)?.label ?? id

export default function Portfolio() {
  const c = content.portfolio
  const { artistFilter, setArtistFilter } = useUI()
  const [filter, setFilter] = useState(ALL)
  const [lightboxIndex, setLightboxIndex] = useState(-1)

  const filters = useMemo(
    () => [
      { id: ALL, label: 'Todos', count: gallery.length },
      ...styles.map((s) => ({ ...s, count: gallery.filter((p) => p.style === s.id).length })),
    ],
    [],
  )

  const items = useMemo(
    () =>
      gallery.filter(
        (p) => (filter === ALL || p.style === filter) && (!artistFilter || p.artist === artistFilter),
      ),
    [filter, artistFilter],
  )

  return (
    <section id="tatuajes" className="portfolio section" aria-labelledby="portfolio-title">
      <div className="container">
        <header className="portfolio__head">
          <div>
            <SectionLabel number="02">{c.label}</SectionLabel>
            <h2 id="portfolio-title" className="display h2 portfolio__title">
              <Reveal as="span">{c.title}</Reveal>
            </h2>
          </div>
          <Reveal className="portfolio__intro" delay={0.1}>
            <p className="muted">{c.text}</p>
            <a className="link-line portfolio__ig" href={instagramUrl()} target="_blank" rel="noopener noreferrer">
              <InstagramIcon size={16} /> {site.social.instagram.handle}
            </a>
          </Reveal>
        </header>

        <div className="portfolio__filters" role="toolbar" aria-label="Filtrar por estilo">
          {filters.map((f) => (
            <button
              key={f.id}
              type="button"
              className={`pf-filter ${filter === f.id ? 'is-active' : ''}`}
              aria-pressed={filter === f.id}
              onClick={() => setFilter(f.id)}
            >
              {f.label}
              <sup>{String(f.count).padStart(2, '0')}</sup>
            </button>
          ))}
        </div>

        <div className="portfolio__artists" role="toolbar" aria-label="Filtrar por artista">
          {artists.map((a) => {
            const active = artistFilter === a.id
            return (
              <button
                key={a.id}
                type="button"
                className={`pf-artist ${active ? 'is-active' : ''}`}
                aria-pressed={active}
                onClick={() => setArtistFilter(active ? null : a.id)}
              >
                {a.name}
                {active && (
                  <>
                    <CloseIcon size={14} />
                    <span className="visually-hidden">(quitar filtro)</span>
                  </>
                )}
              </button>
            )
          })}
        </div>

        <p className="visually-hidden" aria-live="polite">
          {items.length} tatuajes mostrados
        </p>

        {items.length > 0 && (
          <Carousel
            key={`${filter}-${artistFilter}`}
            className="pf-carousel"
            items={items}
            label="Tatuajes"
            perView={{ desktop: 4, tablet: 3, mobile: 2 }}
            step="page"
            indicator="progress"
            renderItem={(item, i) => (
              <button
                type="button"
                className="pf-item__btn"
                data-cursor="view"
                onClick={() => setLightboxIndex(i)}
                aria-label={`Ver en grande: ${item.title} — ${styleLabel(item.style)}`}
              >
                <Photo
                  image={item}
                  sizes="(max-width: 639px) 50vw, (max-width: 1023px) 33vw, 25vw"
                  widths={[360, 540, 800, 1080]}
                  fallbackWidth={800}
                />
                <span className="pf-item__meta" aria-hidden="true">
                  <span>
                    <span className="pf-item__title">{item.title}</span>
                    <span className="pf-item__style">{styleLabel(item.style)}</span>
                  </span>
                  <span className="pf-item__plus">
                    <PlusIcon size={16} />
                  </span>
                </span>
              </button>
            )}
          />
        )}

        {items.length === 0 && (
          <p className="pf-empty muted">
            Todavía no hay piezas en esta categoría.{' '}
            <button type="button" className="link-line" onClick={() => { setFilter(ALL); setArtistFilter(null) }}>
              Ver todos
            </button>
          </p>
        )}

        <Reveal className="portfolio__cta">
          <Ornament name="dagger" size={44} className="portfolio__cta-o" draw strokeWidth={1.3} />
          <div>
            <p className="portfolio__cta-title display">{c.ctaTitle}</p>
            <p className="muted">{c.ctaText}</p>
          </div>
          <div className="portfolio__cta-actions">
            <BookingButton />
            <a className="btn" href={instagramUrl()} target="_blank" rel="noopener noreferrer">
              <InstagramIcon size={18} />
              <span>Más en Instagram</span>
            </a>
          </div>
        </Reveal>
      </div>

      <Lightbox
        items={items}
        index={lightboxIndex}
        onIndex={setLightboxIndex}
        onClose={() => setLightboxIndex(-1)}
        styleLabel={styleLabel}
      />
    </section>
  )
}
