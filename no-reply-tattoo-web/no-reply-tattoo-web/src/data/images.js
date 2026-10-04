/* ==========================================================================
   FOTOGRAFÍAS GENERALES (hero, intro, estudio, cita)
   --------------------------------------------------------------------------
   Las fotos del PORTFOLIO están en  src/data/portfolio.js
   Las fotos de los ARTISTAS están en src/data/artists.js

   CÓMO SUSTITUIR UNA FOTO POR UNA REAL DEL ESTUDIO
   1. Copia la foto a /public/images/<carpeta>/  (ej: public/images/hero/hero.webp)
   2. Cambia `src` por la ruta pública:  src: '/images/hero/hero.webp'
   3. Actualiza `alt` (describe la foto: ayuda al SEO y a la accesibilidad).
   4. `focal` (opcional) = punto que debe quedar siempre visible al recortar ("50% 30%").

   Las fotos de placeholder son de Unsplash (licencia libre, sin marcas de agua).
   Se sirven optimizadas (WebP/AVIF automático + tamaños responsive).
   ========================================================================== */

const unsplash = (id) => `https://images.unsplash.com/${id}`

export const images = {
  hero: {
    src: unsplash('photo-1552627019-947c3789ffb5'),
    alt: 'Tatuador trabajando en una pieza en blanco y negro dentro del estudio',
    focal: '50% 40%',
    focalMobile: '58% 50%',
  },
  intro: {
    src: unsplash('photo-1758404255679-9afd847ede1c'),
    alt: 'Detalle de una sesión de tatuaje: el artista aplica tinta sobre la pierna',
    focal: '50% 50%',
  },
  studioLead: {
    src: unsplash('photo-1482329033286-79a3d24413b4'),
    alt: 'Tatuador trabajando con guantes en el brazo de un cliente',
    focal: '50% 45%',
  },
  booking: {
    src: unsplash('photo-1565058379802-bbe93b2f703a'),
    alt: 'Primer plano de una máquina de tatuar trabajando sobre la piel',
    focal: '50% 50%',
  },
  sketch: {
    src: unsplash('photo-1607281503082-f01fedd97a5b'),
    alt: 'Boceto de tatuaje dibujado a mano sobre papel',
    focal: '50% 50%',
  },
}
