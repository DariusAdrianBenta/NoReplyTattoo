import { bookingOptions } from '../data/booking.js'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const PHONE_RE = /^\+?[\d\s().-]{9,20}$/

/** Valida el formulario de cita. Devuelve { campo: 'mensaje de error' }. */
export function validateBooking(v) {
  const e = {}
  if (!v.name.trim() || v.name.trim().length < 2) e.name = 'Escribe tu nombre.'
  if (!v.phone.trim()) e.phone = 'Necesitamos un teléfono de contacto.'
  else if (!PHONE_RE.test(v.phone.trim()) || v.phone.replace(/\D/g, '').length < 9)
    e.phone = 'Revisa el teléfono (mínimo 9 dígitos).'
  if (!v.email.trim()) e.email = 'Escribe tu email.'
  else if (!EMAIL_RE.test(v.email.trim())) e.email = 'Ese email no parece válido.'
  if (v.idea.trim().length < 10) e.idea = 'Cuéntanos un poco más tu idea (mín. 10 caracteres).'
  if (!v.style) e.style = 'Elige un estilo (o "Otro / no lo sé").'
  if (!v.zone) e.zone = 'Elige la zona del cuerpo.'
  if (!v.size) e.size = 'Elige un tamaño aproximado.'
  if (!v.consent) e.consent = 'Debes aceptar la política de privacidad.'
  return e
}
