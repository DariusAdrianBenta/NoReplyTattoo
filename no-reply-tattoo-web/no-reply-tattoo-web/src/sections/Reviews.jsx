import { reviews, reviewsSummary as summary } from '../data/reviews.js'
import { content } from '../data/content.js'
import { site } from '../data/site.js'
import { confirmed } from '../utils/placeholder.js'
import Reveal from '../components/Reveal.jsx'
import Carousel from '../components/Carousel.jsx'
import SectionLabel from '../components/SectionLabel.jsx'
import { ArrowUpRight } from '../components/icons/Icons.jsx'
import './Reviews.css'

/* Reseñas copiadas de Google tal cual (src/data/reviews.js).
   "Más" y los botones llevan a la ficha de Google para leerlas completas. */

const fmtRating = (n) => n.toLocaleString('es-ES', { minimumFractionDigits: 1, maximumFractionDigits: 1 })

function GoogleG({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden="true" focusable="false">
      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
      <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
    </svg>
  )
}

function Stars({ rating, size = 16 }) {
  return (
    <span className="g-stars" role="img" aria-label={`${rating} de 5 estrellas`}>
      {Array.from({ length: 5 }, (_, i) => {
        const fill = Math.max(0, Math.min(1, rating - i))
        return (
          <svg key={i} width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
            <path className="g-stars__bg" d="M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.3l-5.9 3.3 1.3-6.6-4.9-4.6 6.6-.8z" />
            <path
              className="g-stars__fg"
              style={{ clipPath: `inset(0 ${100 - fill * 100}% 0 0)` }}
              d="M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.3l-5.9 3.3 1.3-6.6-4.9-4.6 6.6-.8z"
            />
          </svg>
        )
      })}
    </span>
  )
}

function Avatar({ name }) {
  return (
    <span className="g-review__avatar g-review__avatar--initial" aria-hidden="true">
      {(name.replace(/[^\p{L}\p{N}]/gu, '').charAt(0) || '?').toUpperCase()}
    </span>
  )
}

function ReviewCard({ review, delay, googleUrl }) {
  return (
    <Reveal as="article" variant="fade" className="g-review" delay={delay}>
      <header className="g-review__head">
        <Avatar name={review.name} />
        <div className="g-review__who">
          <span className="g-review__name">{review.name}</span>
          {review.meta && <span className="g-review__meta">{review.meta}</span>}
        </div>
        <span className="g-review__source" title="Reseña de Google">
          <GoogleG size={18} />
        </span>
      </header>

      <div className="g-review__rating">
        <Stars rating={review.rating} />
        {review.time && <span className="g-review__time">{review.time}</span>}
      </div>

      <p className="g-review__text">
        {review.text}
        {review.truncated && (
          <>
            {' … '}
            {googleUrl ? (
              <a
                className="g-review__more"
                href={googleUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Leer la reseña completa de ${review.name} en Google`}
              >
                Más
              </a>
            ) : (
              'Más'
            )}
          </>
        )}
      </p>
    </Reveal>
  )
}

export default function Reviews() {
  const c = content.reviews
  const googleUrl = confirmed(site.social.googleBusiness)

  return (
    <section id="opiniones" className="reviews section" aria-labelledby="reviews-title">
      <div className="container">
        <header className="reviews__head">
          <SectionLabel number="06">{c.label}</SectionLabel>
          <h2 id="reviews-title" className="display reviews__title">
            <Reveal as="span">{c.title}</Reveal>
          </h2>
        </header>

        <Reveal className="g-summary">
          <div className="g-summary__brand">
            <GoogleG size={34} />
            <span className="g-summary__label">Resumen de reseñas de Google</span>
          </div>

          <div className="g-summary__body">
            <ul className="g-bars" aria-label="Reparto de valoraciones">
              {[5, 4, 3, 2, 1].map((n) => {
                const count = summary.bars[n] ?? 0
                return (
                  <li key={n} className="g-bars__row">
                    <span className="g-bars__n">{n}</span>
                    <span className="g-bars__track">
                      <span className="g-bars__fill" style={{ width: `${(count / summary.total) * 100}%` }} />
                    </span>
                    <span className="visually-hidden">
                      {count} {count === 1 ? 'reseña' : 'reseñas'} de {n} estrellas
                    </span>
                  </li>
                )
              })}
            </ul>

            <div className="g-summary__score">
              <strong>{fmtRating(summary.rating)}</strong>
              <Stars rating={summary.rating} size={20} />
              <span className="g-summary__count">({summary.total} reseñas)</span>
            </div>
          </div>

          {googleUrl && (
            <a className="g-pill g-pill--solid g-summary__cta" href={googleUrl} target="_blank" rel="noopener noreferrer">
              Ver todas las reseñas <ArrowUpRight size={15} />
            </a>
          )}
        </Reveal>

        <Carousel
          className="reviews__carousel"
          items={reviews}
          label="Reseñas de clientes"
          renderItem={(r, i) => <ReviewCard review={r} googleUrl={googleUrl} delay={0.06 * Math.min(i, 3)} />}
        />
      </div>
    </section>
  )
}
