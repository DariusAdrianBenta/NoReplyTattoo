/** Un valor es placeholder si contiene texto entre [corchetes]. */
export const isPlaceholder = (value) => typeof value === 'string' && /\[[^\]]*\]/.test(value)

/** Quita los corchetes de un valor (para usarlo en enlaces mientras es placeholder). */
export const unbracket = (value = '') => String(value).replace(/[[\]]/g, '')

/** Devuelve el valor solo si es real (sin corchetes); si no, undefined. */
export const confirmed = (value) => (value && !isPlaceholder(value) ? value : undefined)
