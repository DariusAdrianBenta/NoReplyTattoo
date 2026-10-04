# NO REPLY Tattoo Studio — Web oficial

Web del estudio de tatuajes **NO REPLY** hecha con **React + Vite**. Sin librerías
de UI, sin frameworks de CSS ni dependencias innecesarias: carga rápido y es fácil
de modificar.

---

## 1. Instalación y uso

Necesitas **Node.js 20.19 o superior** (recomendado Node 22 LTS): https://nodejs.org

```bash
# 1. Descomprime el .zip y abre la carpeta en Visual Studio Code
# 2. En la terminal (Ver → Terminal):
npm install        # instala dependencias (solo la primera vez)
npm run dev        # arranca la web en http://localhost:5173
```

Para generar la versión de producción:

```bash
npm run build      # crea la carpeta /dist lista para subir al hosting
npm run preview    # (opcional) previsualiza /dist en local
```

La carpeta `dist/` se puede subir a Netlify, Vercel, Cloudflare Pages, un hosting
con cPanel, etc. Ya incluye `_redirects` (Netlify/Cloudflare) y `vercel.json` para
que las URLs limpias (`/aviso-legal`, `/politica-privacidad`) funcionen.
Para hosting Apache (cPanel) se incluye `.htaccess`.

---

## 2. Estructura del proyecto

```
no-reply-tattoo-web/
├── index.html                 ← plantilla HTML (el SEO se inyecta solo)
├── vite.config.js             ← config + plugin SEO (metas, Schema.org, sitemap, robots)
├── public/                    ← archivos que se publican tal cual
│   ├── images/                ← ⭐ AQUÍ VAN LAS FOTOS REALES (ver images/README.md)
│   ├── favicon.svg · apple-touch-icon.png · og-image.jpg
│   └── site.webmanifest · _redirects
├── scripts/download-placeholders.mjs
└── src/
    ├── data/                  ← ⭐ TODO EL CONTENIDO EDITABLE
    │   ├── site.js            ← contacto, dirección, horario, redes, SEO, opciones
    │   ├── content.js         ← textos de todas las secciones
    │   ├── images.js          ← fotos del hero, intro, estudio y cita
    │   ├── portfolio.js       ← tatuajes de la galería + filtros (estilos)
    │   ├── artists.js         ← artistas
    │   ├── reviews.js         ← reseñas
    │   ├── faq.js             ← preguntas frecuentes
    │   ├── booking.js         ← opciones del formulario de cita
    │   └── legal.js           ← aviso legal y privacidad (plantillas)
    ├── sections/              ← secciones de la home (Hero, Intro, Portfolio, Artists,
    │                            Studio, Process, BookingCTA, Reviews, FAQ, Location, Footer)
    ├── components/            ← piezas reutilizables (Header, menú móvil, Modal, Lightbox,
    │   ├── booking/             Photo, Reveal, cursor, formulario de cita…)
    │   ├── icons/             ← iconos SVG propios
    │   └── ornaments/         ← ilustraciones tattoo flash (estrella, rosa, daga, serpiente…)
    ├── pages/                 ← Home, páginas legales, 404
    ├── hooks/ · context/ · utils/
    ├── services/bookingService.js  ← envío del formulario (conectar backend aquí)
    ├── seo/buildHead.js       ← genera metas + Schema.org desde site.js
    └── styles/
        ├── tokens.css         ← ⭐ COLORES, FUENTES Y MEDIDAS
        └── base.css           ← estilos base, botones y animaciones
```

> **Regla de oro:** para cambiar contenido casi nunca tendrás que tocar los
> componentes. Todo está en `src/data/`.

---

## 3. Placeholders (datos pendientes)

Todo lo que aparece **entre [corchetes]** es un dato **pendiente de confirmar**
(dirección, teléfono, WhatsApp, email, horario, textos legales, artistas, reseñas…).

- En la web se ve tal cual, para que no se olvide.
- En el SEO / Schema.org se **omite automáticamente** (no se publican datos falsos).
- Cuando tengas el dato real, quita los corchetes.

Busca `[` o `⚠️` en `src/data/` para encontrarlos todos.

**Artistas y reseñas son de ejemplo.** Mientras tengan `placeholder: true` muestran
la etiqueta "Perfil de ejemplo" / "Reseña de ejemplo". Cuando estén los reales,
pon `placeholder: false` (o `features.showPlaceholderBadges: false` en `site.js`).

---

## 4. Cómo cambiar…

### Imágenes
1. Copia la foto en `public/images/<carpeta>/` (ej. `public/images/portfolio/rosa-01.webp`).
2. En el archivo de datos correspondiente cambia `src` por `'/images/portfolio/rosa-01.webp'`
   y actualiza `alt` (describe la foto: ayuda al SEO).
3. Opcional: `focal: '50% 30%'` para elegir qué parte de la foto se ve al recortar.

| Qué                          | Archivo                         |
|------------------------------|---------------------------------|
| Portada (hero), intro, estudio, banda de cita | `src/data/images.js` |
| Recorrido del estudio (carrusel) | `src/data/content.js` → `studio.tour` |
| Galería / portfolio          | `src/data/portfolio.js`         |
| Fotos de artistas            | `src/data/artists.js`           |
| Imagen al compartir (redes)  | `public/og-image.jpg` (1200×630)|
| Favicon                      | `public/favicon.svg` y `apple-touch-icon.png` |

Recomendado: WebP, 1400–2000 px de lado largo, < 400 KB. Más detalles en
`public/images/README.md`.

Las fotos actuales son placeholders de **Unsplash** (licencia libre, sin marcas de
agua) servidas desde su CDN y optimizadas automáticamente. Si quieres tenerlas en
local: `npm run images:download`.

### Portfolio (añadir / quitar tatuajes)
`src/data/portfolio.js` → añade un objeto al array `portfolio`. `size` controla la
forma en la cuadrícula: `'sm'`, `'tall'`, `'wide'` o `'lg'`. Alterna tamaños para que
la galería tenga ritmo. Los filtros salen de `styles` (puedes añadir estilos nuevos).

### Artistas
`src/data/artists.js`: nombre, especialidades, bio, Instagram, foto y `layout`
(`'left'`, `'right'` o `'banner'` — alterna para mantener la composición editorial).
El `id` del artista se usa en los tatuajes (`artist: 'artista-1'`) para el filtro
"Ver portfolio" y en el desplegable del formulario.

### Información del estudio (teléfono, dirección, horario, email)
`src/data/site.js` → `contact`, `address`, `hours`, `mapsQuery`, `geo`, `url`.

### Enlaces sociales
`src/data/site.js` → `social.instagram` (`@NOREPLYTATTOO`,
`https://www.instagram.com/noreplytattoo/`), `contact.whatsapp` (número internacional
sin `+`, ej. `34612345678`) y `contact.whatsappMessage` (mensaje predefinido).

### Textos
`src/data/content.js` (todas las secciones), `src/data/faq.js`, `src/data/reviews.js`,
`src/data/legal.js`. Los títulos grandes con varias líneas usan arrays.

### Colores y tipografías
`src/styles/tokens.css`:
- `--c-ink`, `--c-carbon`, `--c-coal` → fondos negro/carbón
- `--c-bone`, `--c-ash`, `--c-smoke` → textos
- `--c-paper` → fondo "papel" de la sección *Cómo funciona*
- `--c-accent` → rojo flash tattoo (se usa muy poco)
- `--f-display` (Anton), `--f-body` (Archivo), `--f-letter` (Pirata One)

Las fuentes están **autoalojadas** con Fontsource (sin Google Fonts: más rápido y
sin problemas de RGPD). Para cambiarlas: `npm install @fontsource/<fuente>`, cambia
el `import` en `src/main.jsx` y la variable en `tokens.css`.

### SEO
`src/data/site.js` → `seo` (title, description, keywords, ogImage) y `url` (dominio
definitivo). Al hacer `npm run build` se generan automáticamente: metas, Open Graph,
Twitter Card, Schema.org `TattooParlor`, `robots.txt` y `sitemap.xml`.
⚠️ No indiques otra localidad que no sea la real del estudio: `areaServed` es el área
de influencia, la dirección va en `address`.

### Opciones
`src/data/site.js` → `features`:
- `customCursor: false` desactiva el cursor personalizado (nunca aparece en móvil ni
  con "reducir movimiento").
- `mobileStickyCta` barra fija "Solicitar cita" en móvil.
- `showPlaceholderBadges` etiquetas de contenido de ejemplo.

---

## 5. Formulario de cita (WhatsApp)

El formulario valida todo en el navegador y, al enviar, abre WhatsApp con un chat
al número de reservas y un mensaje con todos los datos ya escrito. No necesita
servidor ni servicios externos: el cliente solo pulsa "enviar" en WhatsApp.

- El número está en `src/data/site.js` → `contact.whatsapp` (formato `34XXXXXXXXX`).
- El texto del mensaje se arma en `src/services/bookingService.js` → `bookingMessage()`.
- Los enlaces de WhatsApp solo admiten texto, así que no hay subida de imágenes:
  el mensaje invita a mandar las fotos de referencia en el mismo chat.

Enlace directo al formulario (ideal para la bio de Instagram): **`tudominio.com/#cita`**

---

## 6. Rendimiento y accesibilidad

- Imágenes con `loading="lazy"`, `srcset` responsive y formato moderno (WebP/AVIF).
- Mapa de Google cargado solo cuando el usuario lo pide.
- Sin librerías de animación: IntersectionObserver + CSS.
- En móvil la galería muestra 8 fotos y un botón "Ver más".
- Respeta `prefers-reduced-motion`, navegación por teclado, foco visible,
  modales accesibles (Esc, foco atrapado) y textos alternativos.

---

## 7. Antes de publicar (checklist)

- [ ] Sustituir fotos por trabajos y espacios reales del estudio
- [ ] Datos reales de artistas (y `placeholder: false`)
- [ ] Reseñas reales (y `placeholder: false`)
- [ ] Dirección, teléfono, WhatsApp, email y horario sin corchetes
- [ ] Respuestas de la FAQ con la política real del estudio
- [ ] Textos legales revisados
- [ ] Dominio definitivo en `site.url`
