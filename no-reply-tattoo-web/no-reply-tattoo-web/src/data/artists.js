/* ==========================================================================
   ARTISTAS
   --------------------------------------------------------------------------
   Equipo real de No Reply Tattoo, sacado de las historias destacadas y del
   post de presentación del equipo en Instagram (@noreplytattoo, sept. 2026).

   Campos:
     id          → identificador (lo usan los tatuajes de portfolio.js en `artist`
                   y es también el ancla de su ficha: /#diego-sacristan)
     name        → nombre artístico
     role        → línea corta bajo el nombre
     specialties → lista de estilos
     bio         → texto breve
     highlights  → datos destacados (premios, convenciones…) — opcional
     instagram   → { handle, url }
     image       → { src, alt, focal } (retrato)
     works       → trabajos de su historia destacada (fotos en /public/images/artists/<id>/)
     layout      → composición editorial: 'left' | 'right'
   ========================================================================== */

const ig = (user) => ({ handle: `@${user}`, url: `https://www.instagram.com/${user}/` })

/** Genera la lista de trabajos de la historia destacada de un artista. */
const works = (id, list) =>
  list.map(([file, title, style], i) => ({
    id: `${id}-hl-${i + 1}`,
    src: `/images/artists/${id}/${file}.webp`,
    alt: `${title} — tatuaje de ${artistNames[id]} en No Reply Tattoo`,
    title,
    style,
    artist: id,
  }))

const artistNames = {
  'diego-sacristan': 'Diego Sacristán',
  'carla-limon': 'Carla Limón',
  'carlos-algobia': 'Carlos Algobia',
  'belen-perez': 'Belén Pérez',
  'elena-calderon': 'Elena Calderón',
  'carlos-gon': 'Carlos Gon',
}

export const artists = [
  {
    id: 'diego-sacristan',
    name: artistNames['diego-sacristan'],
    role: 'Realismo black & grey',
    specialties: ['Realismo', 'Black & grey', 'Gran formato'],
    bio: 'Realismo en blanco y negro con mucho contraste y profundidad: retratos, imaginería religiosa, mitología y piezas oscuras de terror. Trabaja sobre todo antebrazos, mangas y espaldas completas.',
    highlights: ['1.er premio de realismo · Madriz Tattoo Convention'],
    instagram: ig('diegosacristantattoo'),
    image: {
      src: '/images/artists/diego-sacristan.webp',
      alt: 'Retrato de Diego Sacristán, tatuador de realismo en No Reply Tattoo',
      focal: '62% 45%',
    },
    works: works('diego-sacristan', [
      ['01', 'Calavera y carroza', 'realismo'],
      ['02', 'Mirada', 'realismo'],
      ['03', 'Aviador', 'realismo'],
      ['04', 'Cristo', 'realismo'],
      ['05', 'Rostro agrietado', 'realismo'],
      ['06', 'Conejo esqueleto', 'realismo'],
    ]),
    layout: 'left',
  },
  {
    id: 'carla-limon',
    name: artistNames['carla-limon'],
    role: 'Microrrealismo en negro',
    specialties: ['Microrrealismo', 'Animales', 'Fine line'],
    bio: 'Trabajo fino y muy detallado en negro: animales, figuras mitológicas y composiciones ilustrativas con sombreados suaves. Pasa por el estudio en fechas concretas, así que pregúntanos por su próxima agenda.',
    instagram: ig('carlalimonn'),
    image: {
      src: '/images/artists/carla-limon.webp',
      alt: 'Retrato de Carla Limón, tatuadora de microrrealismo en No Reply Tattoo',
      focal: '45% 40%',
    },
    works: works('carla-limon', [
      ['01', 'Sirena', 'microrrealismo'],
      ['02', 'Caballero y ciervo', 'microrrealismo'],
      ['03', 'Minotauro', 'microrrealismo'],
      ['04', 'Águila', 'microrrealismo'],
      ['05', 'Gato', 'microrrealismo'],
    ]),
    layout: 'right',
  },
  {
    id: 'carlos-algobia',
    name: artistNames['carlos-algobia'],
    role: 'Realismo & composición',
    specialties: ['Realismo', 'Black & grey', 'Composición'],
    bio: 'Realismo en blanco y negro con composiciones muy pensadas: retratos, mitología, cine y cómic combinados con geometría y detalles finos. También hace piezas florales de mayor tamaño.',
    instagram: ig('carlosalgobia.tattoo'),
    image: {
      src: '/images/artists/carlos-algobia.webp',
      alt: 'Retrato de Carlos Algobia, tatuador de realismo en No Reply Tattoo',
      focal: '50% 55%',
    },
    works: works('carlos-algobia', [
      ['01', 'Dos caras', 'realismo'],
      ['02', 'Guerrera tigre', 'realismo'],
      ['03', 'Dios griego', 'realismo'],
      ['04', 'Joker · Daily Planet', 'realismo'],
      ['05', 'Lobo y león', 'microrrealismo'],
      ['06', 'Composición clásica', 'microrrealismo'],
      ['07', 'Carpe diem', 'microrrealismo'],
      ['08', 'Astronauta', 'microrrealismo'],
      ['09', 'Manga floral', 'fine-line'],
    ]),
    layout: 'left',
  },
  {
    id: 'belen-perez',
    name: artistNames['belen-perez'],
    role: 'Microrrealismo & mascotas',
    specialties: ['Microrrealismo', 'Mascotas', 'Animales'],
    bio: 'Especialista en microrrealismo y en retratos de mascotas: perros, gatos y animales con un nivel de detalle enorme en muy poco espacio. Si quieres llevar a tu mascota contigo, es tu artista.',
    highlights: ['Stand de No Reply · Madriz Tattoo Convention 2025'],
    instagram: ig('belen_tattoo'),
    image: {
      src: '/images/artists/belen-perez.webp',
      alt: 'Retrato de Belén Pérez, tatuadora de microrrealismo en No Reply Tattoo',
      focal: '55% 40%',
    },
    works: works('belen-perez', [
      ['01', 'Retrato de perro', 'microrrealismo'],
      ['02', 'Gato lector', 'microrrealismo'],
      ['03', 'Leona y cachorros', 'microrrealismo'],
      ['04', 'Mi estrella', 'microrrealismo'],
      ['05', 'Horus', 'microrrealismo'],
      ['06', 'Tigre', 'microrrealismo'],
    ]),
    layout: 'right',
  },
  {
    id: 'elena-calderon',
    name: artistNames['elena-calderon'],
    role: 'Fine line & color',
    specialties: ['Fine line', 'Floral', 'Ornamental', 'Color'],
    bio: 'Línea fina, delicada y limpia: flores, ornamentales, lettering y piezas pequeñas con mucho detalle, y también trabajos a color. De vuelta en el equipo de No Reply desde 2026.',
    instagram: ig('elenacalderontattoo'),
    image: {
      src: '/images/artists/elena-calderon.webp',
      alt: 'Retrato de Elena Calderón, tatuadora de línea fina en No Reply Tattoo',
      focal: '55% 45%',
    },
    works: works('elena-calderon', [
      ['01', 'Pulpo', 'fine-line'],
      ['02', 'Peonía', 'color'],
      ['03', 'Ornamental', 'fine-line'],
      ['04', 'Casete', 'color'],
      ['05', 'Partitura', 'fine-line'],
      ['06', 'Ramo', 'fine-line'],
      ['07', 'Mariposa floral', 'fine-line'],
    ]),
    layout: 'left',
  },
  {
    id: 'carlos-gon',
    name: artistNames['carlos-gon'],
    role: 'Realismo de gran formato',
    specialties: ['Realismo', 'Black & grey', 'Mangas'],
    bio: 'Realismo en blanco y negro a gran escala: mangas y brazos completos, cine, vikingos, fauna y rosas. Proyectos largos por sesiones, pensados de principio a fin.',
    instagram: ig('carlosgontattoo'),
    image: {
      src: '/images/artists/carlos-gon.webp',
      alt: 'Retrato de Carlos Gon, tatuador de realismo en No Reply Tattoo',
      focal: '40% 45%',
    },
    works: works('carlos-gon', [
      ['01', 'Stormtrooper', 'realismo'],
      ['02', 'Cuervo', 'realismo'],
      ['03', 'Tridente', 'realismo'],
      ['04', 'Vikingo', 'realismo'],
      ['05', 'Rosa en la mano', 'realismo'],
    ]),
    layout: 'right',
  },
]

export const getArtist = (id) => artists.find((a) => a.id === id)
