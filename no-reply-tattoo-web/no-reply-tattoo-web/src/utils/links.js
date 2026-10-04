import { site } from '../data/site.js'
import { unbracket } from './placeholder.js'

const digits = (v) => unbracket(v).replace(/[^\d+]/g, '')

export const telUrl = () => `tel:${digits(site.contact.phone)}`

export const mailUrl = () => `mailto:${unbracket(site.contact.email)}`

export const whatsappUrl = (message = site.contact.whatsappMessage) =>
  `https://wa.me/${digits(site.contact.whatsapp).replace('+', '')}?text=${encodeURIComponent(message)}`

export const instagramUrl = () => site.social.instagram.url

export const mapsUrl = () =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.mapsQuery)}`

export const mapsEmbedUrl = () =>
  `https://www.google.com/maps?q=${encodeURIComponent(site.mapsQuery)}&output=embed`

/** Dirección en una línea, lista para mostrar. */
export const addressLine = () => {
  const a = site.address
  return [a.street, `${a.postalCode} ${a.locality}`, a.region].filter(Boolean).join(', ')
}

/** Ancla de sección. Funciona tanto en la home como en las páginas legales. */
export const sectionHref = (id) => `/#${id}`
