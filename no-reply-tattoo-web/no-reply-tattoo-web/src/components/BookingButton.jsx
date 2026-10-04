import { useUI, BOOKING_HASH } from '../context/UIContext.jsx'
import { ArrowUpRight } from './icons/Icons.jsx'

/**
 * Botón "Solicitar cita". Es un enlace real a /#cita (funciona sin JS y se
 * puede compartir), pero abre el modal directamente.
 */
export default function BookingButton({
  children = 'Solicitar cita',
  variant = 'primary',
  size,
  block = false,
  preset,
  className = '',
  icon = true,
  onClick,
}) {
  const { openBooking } = useUI()
  const cls = ['btn', variant && `btn--${variant}`, size && `btn--${size}`, block && 'btn--block', className]
    .filter(Boolean)
    .join(' ')

  return (
    <a
      href={`/${BOOKING_HASH}`}
      className={cls}
      data-cursor="button"
      onClick={(e) => {
        e.preventDefault()
        onClick?.(e)
        openBooking(preset)
      }}
    >
      <span>{children}</span>
      {icon && <ArrowUpRight size={18} />}
    </a>
  )
}
