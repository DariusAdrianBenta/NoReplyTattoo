/* ==========================================================================
   TEXTOS DE LA WEB
   Todos los textos de las secciones están aquí. Edita sin miedo: el diseño
   se adapta. Los saltos de línea de los títulos grandes se controlan con
   arrays (cada elemento = una línea).
   ========================================================================== */

const unsplash = (id) => `https://images.unsplash.com/${id}`

export const content = {
  hero: {
    kicker: 'Estudio de tatuajes',
    claim: 'Arte que llevas contigo.',
    ctaPrimary: 'Solicitar cita',
    ctaSecondary: 'Ver tatuajes',
    styles: ['Realismo', 'Black & grey', 'Microrrealismo', 'Fine line', 'Color'],
  },

  intro: {
    label: 'Manifiesto',
    titleLines: ['Tu idea.', 'Nuestra', 'tinta.'],
    lettering: 'hecho a mano',
    caption: 'fig. 01 — en sesión',
    paragraphs: [
      'Nadie entra aquí a por un tatuaje cualquiera. Llegas con un nombre, una fecha, una imagen que llevas años dándole vueltas. Nuestro trabajo empieza escuchándola.',
      'Después la dibujamos para tu cuerpo, no para un papel: cómo se mueve tu piel, cómo respira la línea, cómo se verá dentro de veinte años. Y la tatuamos con la calma que merece algo que va a quedarse contigo.',
    ],
    signature: 'No Reply',
  },

  portfolio: {
    label: 'Portfolio',
    title: 'Nuestros tatuajes',
    text: 'Trabajos recientes del equipo. Filtra por estilo o por artista y pulsa cualquier foto para verla en grande. El resto del archivo, en Instagram.',
    ctaTitle: '¿Te ves con una de estas?',
    ctaText: 'Cada pieza es única, pero podemos crear la tuya.',
  },

  artists: {
    label: 'El equipo',
    title: 'Los artistas',
    lettering: 'las manos detrás',
    text: 'Seis artistas, seis maneras de entender la tinta. Elige al que mejor encaje con tu idea o deja que te recomendemos.',
  },

  studio: {
    label: 'El espacio',
    title: 'El estudio',
    lettering: 'pasa, estás en casa',
    /* Recorrido con la máquina 3D: cada capítulo aparece al hacer scroll y la
       cámara enfoca una parte de la máquina (encuadres en src/three/tattooMachine.js).
       image: foto opcional · tag: etiqueta sobre la máquina si no hay foto. */
    chapters: [
      {
        title: '12 años de oficio',
        text: 'Nacimos en Villarejo de Salvanés. Hoy nuestra casa está en Arganda del Rey.',
        image: { src: '/images/studio/recepcion-recorte.webp', alt: 'Recepción del estudio No Reply Tattoo con el logo en la pared' },
      },
      {
        title: 'Tu puesto, listo',
        text: 'Camilla, luz y material preparados antes de que llegues.',
        image: { src: '/images/studio/puesto.webp', alt: 'Puesto de tatuaje del estudio No Reply en Arganda del Rey' },
      },
      {
        title: 'Todo de un solo uso',
        text: 'Agujas y cartuchos nuevos en cada sesión. Puesto desinfectado y protegido.',
        tag: 'Cartucho nuevo · cada sesión',
      },
      {
        title: 'Sin prisas',
        text: 'Revisamos el diseño contigo y no empezamos hasta que estés seguro. Puedes parar cuando quieras.',
        image: { src: '/images/studio/elena-tatuando.webp', alt: 'Elena Calderón tatuando durante una sesión en No Reply' },
      },
    ],
    // Cifras rápidas (la nota de Google y el nº de artistas se calculan solos).
    stats: [
      { value: '12+', label: 'años tatuando' },
      { value: '{artists}', label: 'artistas' },
      { value: '{rating}', label: 'en Google' },
      { value: '100%', label: 'material de un solo uso' },
    ],
  },


  process: {
    label: 'Proceso',
    title: 'Cómo funciona',
    lettering: 'paso a paso',
    steps: [
      {
        number: '01',
        title: 'Cuéntanos tu idea',
        text: 'Rellena la solicitud o escríbenos por Instagram. Qué quieres, en qué zona y de qué tamaño. Si tienes referencias, súbelas.',
        ornament: 'eye',
      },
      {
        number: '02',
        title: 'Hablamos contigo',
        text: 'Te contestamos para afinar la idea, resolver dudas y orientarte sobre tamaño, zona y presupuesto.',
        ornament: 'heart',
      },
      {
        number: '03',
        title: 'Diseñamos',
        text: 'Tu artista dibuja una pieza pensada para ti y para esa parte de tu cuerpo. Un diseño propio, no una copia.',
        ornament: 'rose',
      },
      {
        number: '04',
        title: 'Tatuamos',
        text: 'El día de la sesión todo está preparado. Trabajamos con calma y al terminar te explicamos los cuidados.',
        ornament: 'dagger',
      },
    ],
    cta: 'Empezar por el paso 01',
  },

  booking: {
    titleTop: '¿Tienes una idea?',
    titleBottom: 'Cuéntanosla.',
    text: 'Te lleva dos minutos. Cuanto más nos cuentes, mejor podremos orientarte.',
    cta: 'Solicitar cita',
    altContact: 'o escríbenos directamente',
  },

  reviews: {
    label: 'Opiniones',
    title: 'Lo que dicen nuestros clientes',
  },

  faq: {
    label: 'Dudas',
    title: 'Preguntas frecuentes',
    lettering: '¿dudas?',
    aside: '¿No encuentras tu respuesta? Escríbenos y te contestamos.',
  },

  location: {
    label: 'Contacto',
    title: 'Encuéntranos',
    text: 'Te esperamos en el estudio. Para tatuarte, mejor escríbenos antes y lo organizamos.',
  },

  footer: {
    cta: '¿Hablamos?',
    marquee: ['No Reply Tattoo', 'Realismo', 'Black & grey', 'Microrrealismo', 'Fine line', 'Color', 'Arganda del Rey'],
  },
}
