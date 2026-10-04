/* ==========================================================================
   ENVÍO DEL FORMULARIO DE CITA → WHATSAPP
   --------------------------------------------------------------------------
   Sin servidor ni servicios externos: al enviar, se abre WhatsApp con un
   chat al número de reservas (`site.contact.whatsapp`) y el mensaje con
   todos los datos ya escrito. El cliente solo tiene que pulsar "enviar".

   Los enlaces de WhatsApp solo admiten texto, por eso el formulario no
   sube imágenes: el mensaje invita a mandarlas en el mismo chat.
   ========================================================================== */

import { whatsappUrl } from '../utils/links.js'

/** Mensaje de WhatsApp con todos los datos de la solicitud (*texto* = negrita en WhatsApp). */
export function bookingMessage(values) {
  const line = (label, value) => (value ? `*${label}:* ${value}` : null)

  return [
    '*Nueva solicitud de cita — No Reply Tattoo*',
    '',
    line('Nombre', values.name.trim()),
    line('Teléfono', values.phone.trim()),
    line('Email', values.email.trim()),
    '',
    line('Idea', values.idea.trim()),
    line('Estilo', values.style),
    line('Zona', values.zone),
    line('Tamaño', values.size),
    line('Referencias', values.references.trim()),
    line('Artista', values.artistName || 'Sin preferencia'),
    line('Disponibilidad', values.availability.join(', ')),
    line('Mensaje', values.message.trim()),
    '',
    'Si tengo fotos de referencia, os las envío por aquí.',
  ]
    .filter((l) => l !== null)
    .join('\n')
}

/** Enlace de WhatsApp listo para abrir con la solicitud. */
export const bookingWhatsappUrl = (values) => whatsappUrl(bookingMessage(values))

/**
 * Abre WhatsApp con la solicitud. Debe llamarse directamente desde el
 * evento de envío (sin `await` antes) para que el navegador no lo bloquee.
 * Devuelve false si el navegador ha bloqueado la ventana.
 */
export function sendBookingToWhatsapp(values) {
  // Sin 'noopener' en las features: con él, window.open siempre devuelve null
  const win = window.open(bookingWhatsappUrl(values), '_blank')
  if (win) win.opener = null
  return win !== null
}
