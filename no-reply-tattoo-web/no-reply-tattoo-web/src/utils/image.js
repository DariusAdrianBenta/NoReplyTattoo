/* Optimización de imágenes.
   - Fotos de Unsplash: se piden al CDN en el tamaño justo y en formato moderno
     (WebP/AVIF según navegador) con `auto=format`.
   - Fotos locales (/images/...): se usan tal cual. Recomendado exportarlas en
     WebP, ~2000px el lado largo máx. y < 400 KB. Puedes añadir `srcSet` propio
     en el objeto de la imagen si generas varios tamaños. */

const isUnsplash = (src) => /^https:\/\/images\.unsplash\.com\//.test(src)

export const DEFAULT_WIDTHS = [480, 768, 1080, 1440, 1920]

export function imageUrl(src, width = 1200, quality = 70) {
  if (!src || !isUnsplash(src)) return src
  const url = new URL(src)
  url.searchParams.set('auto', 'format')
  url.searchParams.set('fit', 'crop')
  url.searchParams.set('w', String(width))
  url.searchParams.set('q', String(quality))
  return url.toString()
}

export function imageSrcSet(image, widths = DEFAULT_WIDTHS, quality = 70) {
  if (image.srcSet) return image.srcSet
  if (!isUnsplash(image.src)) return undefined
  return widths.map((w) => `${imageUrl(image.src, w, quality)} ${w}w`).join(', ')
}
