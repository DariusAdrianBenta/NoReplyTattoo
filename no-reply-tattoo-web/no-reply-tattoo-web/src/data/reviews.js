/* ==========================================================================
   RESEÑAS (copiadas de la ficha de Google del estudio, tal cual)
   --------------------------------------------------------------------------
   - text:      el texto exacto que aparece en Google.
   - truncated: true si en Google el texto acaba en "… Más". La web muestra
                "… Más" con un enlace a la ficha de Google para leerla entera.
   - time:      fecha relativa tal y como la muestra Google.
   - meta:      datos del perfil del cliente (opcional).
   Para añadir una reseña nueva, copia un bloque y pégalo arriba del todo.
   ========================================================================== */

/* Resumen de la ficha de Google ("Resumen de reseñas"). Actualízalo a mano.
   bars = número de reseñas de 5, 4, 3, 2 y 1 estrellas. */
export const reviewsSummary = {
  rating: 5.0,
  total: 26,
  bars: { 5: 26, 4: 0, 3: 0, 2: 0, 1: 0 },
}

export const reviews = [
  {
    id: 'pilar-rodelgo',
    name: 'Pilar Rodelgo',
    meta: '7 reseñas · 3 fotos',
    time: 'Hace un mes',
    rating: 5,
    text: 'Una experiencia de 10 desde el primer momento. El estudio es estupendo y Carlos es un auténtico profesional. Me ayudó muchísimo con el diseño y tuvo mucha paciencia hasta conseguir exactamente el resultado que quería. El tatuaje ha quedado',
    truncated: true,
  },
  {
    id: 'javier-riera-garcia',
    name: 'Javier Riera García',
    meta: '5 reseñas',
    time: 'Hace 3 meses',
    rating: 5,
    text: 'Me tatuó Carlos, una persona increíble súper atenta, muy profesional, y con un arte increíble y un trato muy cercano. El estudio súper limpio, moderno y un ambiente muy bueno. Precios muy razonables. Lo recomiendo a todo el mundo que',
    truncated: true,
  },
  {
    id: 'javi-b',
    name: 'Javi B',
    meta: 'Local Guide · 157 reseñas · 196 fotos',
    time: 'Hace 5 meses',
    rating: 5,
    text: 'Una experiencia estupenda. Tanto Diego como Cris, personas encantadoras. Lo mejor, que no me ha dolido nada, evidentemente notas algo pero ha sido indoloro prácticamente y super rápido. La verdad que es para volver y volveré a tatuarme aquí',
    truncated: true,
  },
  {
    id: 'miguel-munoz-munoz',
    name: 'Miguel Muñoz muñoz',
    meta: '4 reseñas · 1 foto',
    time: 'Hace un mes',
    rating: 5,
    text: 'Donde mejor te puedas tatuar buenos dibijos buenisimos proyectos y magificos trabajos que realizan os lo recomiendo son geniales en todos los aspectos son magnificos, 👏👏👏👏👏 ir a, no reply tatto arganda del rey no os vais a desfraudar adelante!!!🫶🫶👏👏👏👏, todavia me queda proyecto por delante animaros 💪💪💪👏👏',
  },
  {
    id: 'nacho-dlrn',
    name: 'Nacho DLRN',
    meta: '5 reseñas · 4 fotos',
    time: 'Hace un mes',
    rating: 5,
    text: 'Una experiencia increíble, me tatuó Carlos que es un profesional increíble que se nota que le gusta su trabajo y sabe lo que hace además de ser super atento y cercano, además el estudio está súper limpio y el trato es increíble',
  },
  {
    id: 'jesus-reguera',
    name: 'Jesus Reguera (MesuS)',
    meta: '6 reseñas',
    time: 'Hace 4 meses',
    rating: 5,
    text: 'Mi primer tatuaje, fui con mi pareja porque ella ya se habia tatuado con Elena otras veces, un acierto 100%, gran profesional, atenta y simpática, y el tatuaje a quedado espectacular, no sera el ultimo',
    truncated: true,
  },
]
