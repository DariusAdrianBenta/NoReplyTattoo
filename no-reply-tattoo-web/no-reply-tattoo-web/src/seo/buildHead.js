/* Genera las etiquetas <head> de SEO a partir de src/data/site.js.
   Se ejecuta en Node (vite.config.js) — no usar APIs del navegador aquí.
   Los valores entre [corchetes] (placeholders) se omiten automáticamente. */

import { confirmed } from '../utils/placeholder.js'

const esc = (s = '') =>
  String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

const digits = (v) => (v ? v.replace(/[^\d+]/g, '') : undefined)

export function buildSchema(site) {
  const a = site.address
  const address = {
    '@type': 'PostalAddress',
    streetAddress: confirmed(a.street),
    postalCode: confirmed(a.postalCode),
    addressLocality: confirmed(a.locality),
    addressRegion: confirmed(a.region),
    addressCountry: a.country,
  }

  const hours = site.hours
    .filter((h) => !h.closed)
    .flatMap((h) =>
      h.slots
        .filter(([opens, closes]) => confirmed(opens) && confirmed(closes))
        .map(([opens, closes]) => ({
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: `https://schema.org/${h.day}`,
          opens,
          closes,
        })),
    )

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'TattooParlor',
    '@id': `${site.url}/#estudio`,
    name: site.name,
    alternateName: `${site.brand} ${site.brandSuffix}`,
    description: site.seo.description,
    url: site.url,
    image: `${site.url}${site.seo.ogImage}`,
    logo: `${site.url}/favicon.svg`,
    telephone: digits(confirmed(site.contact.phone)),
    email: confirmed(site.contact.email),
    address,
    geo: site.geo ? { '@type': 'GeoCoordinates', latitude: site.geo.lat, longitude: site.geo.lng } : undefined,
    areaServed: site.areaServed.map((name) => ({ '@type': 'Place', name })),
    openingHoursSpecification: hours.length ? hours : undefined,
    sameAs: [site.social.instagram.url, confirmed(site.social.googleBusiness)].filter(Boolean),
  }
  return JSON.parse(JSON.stringify(schema)) // elimina claves undefined
}

export function buildHead(site) {
  const title = site.seo.title
  const desc = site.seo.description
  const ogImage = `${site.url}${site.seo.ogImage}`
  const tags = [
    `<title>${esc(title)}</title>`,
    `<meta name="description" content="${esc(desc)}" />`,
    `<meta name="keywords" content="${esc(site.seo.keywords.join(', '))}" />`,
    `<link rel="canonical" href="${esc(site.url)}/" />`,
    `<meta name="robots" content="index, follow, max-image-preview:large" />`,
    `<meta name="geo.region" content="ES-MD" />`,
    confirmed(site.address.locality) ? `<meta name="geo.placename" content="${esc(site.address.locality)}" />` : '',
    // Open Graph
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="${esc(site.name)}" />`,
    `<meta property="og:locale" content="${site.locale}" />`,
    `<meta property="og:title" content="${esc(title)}" />`,
    `<meta property="og:description" content="${esc(desc)}" />`,
    `<meta property="og:url" content="${esc(site.url)}/" />`,
    `<meta property="og:image" content="${esc(ogImage)}" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta property="og:image:alt" content="${esc(`${site.brand} ${site.brandSuffix}`)}" />`,
    // Twitter / X
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(title)}" />`,
    `<meta name="twitter:description" content="${esc(desc)}" />`,
    `<meta name="twitter:image" content="${esc(ogImage)}" />`,
    // Schema.org
    `<script type="application/ld+json">${JSON.stringify(buildSchema(site)).replace(/</g, '\\u003c')}</script>`,
  ]
  return tags.filter(Boolean).join('\n    ')
}

export function buildRobots(site) {
  return `User-agent: *\nAllow: /\n\nSitemap: ${site.url}/sitemap.xml\n`
}

export function buildSitemap(site) {
  const pages = ['/', '/aviso-legal', '/politica-privacidad']
  const urls = pages
    .map((p) => `  <url><loc>${site.url}${p}</loc><changefreq>${p === '/' ? 'weekly' : 'yearly'}</changefreq></url>`)
    .join('\n')
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`
}
