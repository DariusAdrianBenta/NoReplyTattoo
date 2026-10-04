/* ==========================================================================
   TEXTOS LEGALES — PLANTILLAS
   ⚠️ Son plantillas orientativas con huecos [entre corchetes]. Deben ser
   revisadas y completadas por el titular (idealmente con asesoramiento legal)
   antes de publicar la web.
   ========================================================================== */

import { site } from './site.js'

const owner = site.legal.owner
const taxId = site.legal.taxId
const email = site.contact.email

export const legalPages = {
  '/aviso-legal': {
    title: 'Aviso legal',
    updated: '[fecha de última actualización]',
    sections: [
      {
        h: 'Datos identificativos',
        p: [
          `Titular: ${owner}. NIF/CIF: ${taxId}.`,
          `Domicilio: ${site.address.street}, ${site.address.postalCode} ${site.address.locality} (${site.address.region}).`,
          `Contacto: ${email} · ${site.contact.phone}.`,
        ],
      },
      {
        h: 'Objeto',
        p: [
          `Esta web informa sobre los servicios de ${site.name} y permite enviar solicitudes de cita. El acceso implica la aceptación de este aviso legal.`,
        ],
      },
      {
        h: 'Propiedad intelectual',
        p: [
          'Los diseños, fotografías y textos de esta web pertenecen a sus autores. No se permite su reproducción sin autorización. [Revisar y completar.]',
        ],
      },
      {
        h: 'Responsabilidad',
        p: ['[Completar con las condiciones de responsabilidad y enlaces externos.]'],
      },
    ],
  },
  '/politica-privacidad': {
    title: 'Política de privacidad',
    updated: '[fecha de última actualización]',
    sections: [
      {
        h: 'Responsable del tratamiento',
        p: [`${owner} (${taxId}). Contacto: ${email}.`],
      },
      {
        h: 'Qué datos recogemos',
        p: [
          'A través del formulario de cita: nombre, teléfono, email, la descripción de tu idea, y tu disponibilidad. El formulario no envía nada a ningún servidor: al pulsar «Enviar» se abre WhatsApp con tu solicitud ya escrita y eres tú quien decide enviarla.',
        ],
      },
      {
        h: 'Para qué los usamos',
        p: ['Únicamente para responder a tu solicitud y gestionar tu cita. [Completar base legal y plazos de conservación.]'],
      },
      {
        h: 'Tus derechos',
        p: [
          `Puedes ejercer tus derechos de acceso, rectificación, supresión, oposición, limitación y portabilidad escribiendo a ${email}. [Completar con la información completa exigida por el RGPD y la LOPDGDD.]`,
        ],
      },
      {
        h: 'Servicios de terceros',
        p: [
          'Esta web carga fotografías desde un CDN externo y, solo si lo pulsas, un mapa de Google Maps. [Completar con los proveedores reales: hosting, servicio de formularios, etc.]',
        ],
      },
    ],
  },
}
