import { useState } from 'react'
import { imageUrl, imageSrcSet, DEFAULT_WIDTHS } from '../utils/image.js'
import Ornament from './ornaments/Ornament.jsx'
import './Photo.css'

/**
 * Imagen optimizada: lazy loading, srcset responsive, fade-in al cargar,
 * punto focal y un fondo de reserva con estilo si la foto no carga.
 *
 * image = { src, alt, focal?, focalMobile? }
 */
export default function Photo({
  image,
  sizes = '100vw',
  widths = DEFAULT_WIDTHS,
  priority = false,
  className = '',
  imgClassName = '',
  fallbackWidth = 1200,
  quality,
}) {
  const [status, setStatus] = useState('loading')
  if (!image?.src) return <span className={`photo photo--empty ${className}`} />

  const style = {
    '--focal': image.focal || '50% 50%',
    '--focal-m': image.focalMobile || image.focal || '50% 50%',
  }

  return (
    <span className={`photo is-${status} ${className}`} style={style}>
      <img
        className={`photo__img ${imgClassName}`}
        src={imageUrl(image.src, fallbackWidth, quality)}
        srcSet={imageSrcSet(image, widths, quality)}
        sizes={sizes}
        alt={image.alt || ''}
        loading={priority ? 'eager' : 'lazy'}
        decoding={priority ? 'sync' : 'async'}
        fetchPriority={priority ? 'high' : 'auto'}
        onLoad={() => setStatus('loaded')}
        onError={() => setStatus('error')}
      />
      {status === 'error' && (
        <span className="photo__fallback" aria-hidden="true">
          <Ornament name="sparkle" size={22} />
          <span>Foto</span>
        </span>
      )}
    </span>
  )
}
