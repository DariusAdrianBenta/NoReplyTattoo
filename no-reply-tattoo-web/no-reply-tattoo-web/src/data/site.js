/* ==========================================================================
   DATOS GENERALES DEL ESTUDIO
   --------------------------------------------------------------------------
   Este es el archivo principal para editar: contacto, dirección, horario,
   redes sociales, SEO y opciones de la web.

   ⚠️  CONVENCIÓN DE PLACEHOLDERS
   Todo texto escrito entre [CORCHETES] es un dato PENDIENTE DE CONFIRMAR.
   - Se muestra en la web tal cual (para que se vea que falta).
   - Se OMITE automáticamente del SEO / Schema.org para no publicar datos falsos.
   Cuando tengas el dato real, quita los corchetes.
   ========================================================================== */

export const site = {
  name: 'No Reply Tattoo',
  brand: 'NO REPLY',
  brandSuffix: 'Tattoo Studio',
  claim: 'Arte que llevas contigo.',

  // Dominio definitivo de la web (sin barra final). Se usa para SEO, sitemap y Open Graph.
  url: 'https://www.noreplytattoo.com', // ⚠️ CONFIRMAR dominio real

  lang: 'es',
  locale: 'es_ES',

  /* ---------------------------------------------------------------- SEO */
  seo: {
    title: 'No Reply Tattoo — Estudio de tatuajes',
    description:
      'NO REPLY Tattoo Studio en Arganda del Rey (Madrid): más de 12 años tatuando. Realismo black & grey, microrrealismo, mascotas, fine line y color. Pide cita y cuéntanos tu idea.',
    keywords: [
      'No Reply Tattoo',
      'estudio de tatuajes',
      'tatuajes',
      'tatuador',
      'tatuajes Arganda del Rey',
      'Arganda del Rey',
      'Villarejo de Salvanés',
      'realismo',
      'microrrealismo',
      'fine line',
      'Madrid',
    ],
    ogImage: '/og-image.jpg',
  },

  /* ------------------------------------------------------------ CONTACTO */
  contact: {
    // Teléfono tal y como se muestra. Los dígitos se usan para el enlace tel:
    phone: '+34 638 895 178',
    // Número de WhatsApp en formato internacional SIN + ni espacios (ej: 34612345678)
    // Aquí llegan las solicitudes del formulario de cita y los botones de WhatsApp de la web.
    whatsapp: '34642358509',
    whatsappMessage: 'Hola NO REPLY, quería información para hacerme un tatuaje.',
    email: 'noreplytattoo@gmail.com',
  },

  /* ----------------------------------------------------------- DIRECCIÓN
     IMPORTANTE: no indicar otra localidad que no sea la real del estudio. */
  address: {
    street: 'Paseo de la Estación, 23',
    postalCode: '28500',
    locality: 'Arganda del Rey',
    region: 'Madrid',
    country: 'ES',
  },
  // Coordenadas para Schema.org (opcional). Ej: { lat: 40.17, lng: -3.27 }
  geo: null,
  // Texto que se busca en Google Maps (para el mapa y el botón "Cómo llegar").
  mapsQuery: 'No Reply Tattoo, Paseo de la Estación 23, 28500 Arganda del Rey, Madrid',
  // Zonas para SEO local (área de influencia, NO es la dirección del estudio).
  areaServed: ['Arganda del Rey', 'Villarejo de Salvanés', 'Comunidad de Madrid'],

  /* ------------------------------------------------------------- HORARIO
     `slots` = tramos del día en formato 24h: [['10:30', '14:30'], ['15:30', '19:30']].
     Usa `closed: true` para días cerrados. */
  hours: [
    { label: 'Lunes', day: 'Monday', closed: true },
    { label: 'Martes', day: 'Tuesday', slots: [['10:30', '14:30'], ['15:30', '19:30']] },
    { label: 'Miércoles', day: 'Wednesday', slots: [['10:30', '14:30'], ['15:30', '19:30']] },
    { label: 'Jueves', day: 'Thursday', slots: [['10:30', '14:30'], ['15:30', '19:30']] },
    { label: 'Viernes', day: 'Friday', slots: [['10:30', '14:30'], ['15:30', '19:30']] },
    { label: 'Sábado', day: 'Saturday', slots: [['10:30', '14:30']] },
    { label: 'Domingo', day: 'Sunday', closed: true },
  ],
  hoursNote: 'Reservas por WhatsApp, teléfono o mensaje directo en Instagram.',

  /* ------------------------------------------------------- REDES SOCIALES */
  social: {
    instagram: {
      handle: '@NOREPLYTATTOO',
      url: 'https://www.instagram.com/noreplytattoo/',
    },
    // Enlace a la ficha de Google (reseñas). Déjalo entre corchetes hasta tenerlo.
    googleBusiness: 'https://share.google/XiSOZDqv5250qTRQz',
  },

  /* ---------------------------------------------------------- NAVEGACIÓN */
  nav: [
    { id: 'inicio', label: 'Inicio' },
    { id: 'tatuajes', label: 'Tatuajes' },
    { id: 'artistas', label: 'Artistas' },
    { id: 'estudio', label: 'Estudio' },
    // highlight: se muestra con una estrella y la nota para diferenciarlo del resto.
    { id: 'opiniones', label: 'Reseñas', highlight: true },
    { id: 'faq', label: 'FAQ' },
    { id: 'contacto', label: 'Contacto' },
  ],
  footerNav: [
    { id: 'tatuajes', label: 'Tattoos' },
    { id: 'artistas', label: 'Artists' },
    { id: 'estudio', label: 'Studio' },
    { id: 'contacto', label: 'Contact' },
  ],

  /* --------------------------------------------------------------- LEGAL */
  legal: {
    owner: '[Nombre del titular o razón social]', // ⚠️ PLACEHOLDER
    taxId: '[NIF / CIF]', // ⚠️ PLACEHOLDER
  },

  /* ---------------------------------------------------- OPCIONES DE LA WEB */
  features: {
    // Cursor personalizado en escritorio ("VER" sobre las fotos). false = desactivado.
    customCursor: true,
    // Barra fija inferior en móvil con "Solicitar cita" + WhatsApp + Instagram.
    mobileStickyCta: true,
    // Muestra las etiquetas "Perfil de ejemplo" / "Reseña de ejemplo".
    // Ponlo en false cuando hayas sustituido artistas y reseñas por los reales.
    showPlaceholderBadges: true,
  },
}
