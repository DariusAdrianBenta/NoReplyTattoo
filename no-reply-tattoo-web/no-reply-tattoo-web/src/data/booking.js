/* ==========================================================================
   FORMULARIO DE CITA — opciones de los desplegables y límites de archivos
   ========================================================================== */

import { styles } from './portfolio.js'
import { artists } from './artists.js'

export const bookingOptions = {
  styles: [...styles.map((s) => s.label), 'Otro / no lo sé'],

  bodyZones: [
    'Brazo',
    'Antebrazo',
    'Mano / dedos',
    'Hombro',
    'Pecho',
    'Espalda',
    'Costillas / costado',
    'Abdomen',
    'Pierna',
    'Gemelo',
    'Tobillo / pie',
    'Cuello / nuca',
    'Detrás de la oreja',
    'Otra zona',
  ],

  sizes: [
    'Mini (hasta 5 cm)',
    'Pequeño (5–10 cm)',
    'Mediano (10–20 cm)',
    'Grande (más de 20 cm)',
    'Proyecto grande (manga, espalda…)',
    'No lo sé, necesito consejo',
  ],

  availability: ['Mañanas', 'Tardes', 'Entre semana', 'Fines de semana', 'Flexible'],

  artists: [{ id: '', name: 'Sin preferencia' }, ...artists.map((a) => ({ id: a.id, name: a.name }))],
}
