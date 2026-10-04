import { useRef } from 'react'
import Modal from './Modal.jsx'
import Photo from './Photo.jsx'
import BookingButton from './BookingButton.jsx'
import { getArtist } from '../data/artists.js'
import { ChevronLeft, ChevronRight, CloseIcon } from './icons/Icons.jsx'
import './Lightbox.css'

/** Visor de la galería: imagen grande, estilo, artista, navegación con flechas, teclado y swipe. */
export default function Lightbox({ items, index, onIndex, onClose, styleLabel }) {
  const touch = useRef(null)
  const open = index >= 0 && index < items.length
  const item = open ? items[index] : null
  const artist = item ? getArtist(item.artist) : null
  const total = items.length

  const go = (dir) => onIndex((index + dir + total) % total)

  const onKeyDown = (e) => {
    if (e.key === 'ArrowRight') go(1)
    if (e.key === 'ArrowLeft') go(-1)
  }

  const onTouchStart = (e) => {
    touch.current = e.touches[0].clientX
  }
  const onTouchEnd = (e) => {
    if (touch.current == null) return
    const dx = e.changedTouches[0].clientX - touch.current
    if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1)
    touch.current = null
  }

  return (
    <Modal open={open} onClose={onClose} variant="lightbox" label="Visor de tatuajes" onKeyDown={onKeyDown}>
      {item && (
        <div className="lb">
          <div className="lb__top">
            <span className="lb__count">
              {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
            </span>
            <button type="button" className="lb__close" onClick={onClose} data-autofocus aria-label="Cerrar">
              <span>Cerrar</span>
              <CloseIcon size={20} />
            </button>
          </div>

          <div className="lb__stage" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
            <Photo
              key={item.id}
              image={item}
              className="lb__photo"
              sizes="(max-width: 767px) 100vw, 70vw"
              widths={[640, 960, 1400, 1920]}
              fallbackWidth={1400}
              priority
            />
            {total > 1 && (
              <>
                <button type="button" className="lb__nav lb__nav--prev" onClick={() => go(-1)} aria-label="Anterior">
                  <ChevronLeft size={26} />
                </button>
                <button type="button" className="lb__nav lb__nav--next" onClick={() => go(1)} aria-label="Siguiente">
                  <ChevronRight size={26} />
                </button>
              </>
            )}
          </div>

          <div className="lb__info">
            <div className="lb__meta">
              <h3 className="lb__title display">{item.title}</h3>
              <dl>
                <div>
                  <dt>Estilo</dt>
                  <dd>{styleLabel(item.style)}</dd>
                </div>
                {artist && (
                  <div>
                    <dt>Artista</dt>
                    <dd>{artist.name}</dd>
                  </div>
                )}
              </dl>
            </div>
            <BookingButton
              preset={{ style: styleLabel(item.style), artist: artist?.id }}
              onClick={onClose}
              className="lb__cta"
            >
              Quiero algo así
            </BookingButton>
          </div>
        </div>
      )}
    </Modal>
  )
}
