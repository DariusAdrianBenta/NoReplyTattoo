import { useUI } from '../../context/UIContext.jsx'
import { site } from '../../data/site.js'
import Modal from '../Modal.jsx'
import BookingForm from './BookingForm.jsx'
import Ornament from '../ornaments/Ornament.jsx'
import { CloseIcon } from '../icons/Icons.jsx'
import './BookingModal.css'

export default function BookingModal() {
  const { booking, closeBooking } = useUI()

  return (
    <Modal open={booking.open} onClose={closeBooking} variant="drawer" label="Solicitar cita">
      <div className="bmodal">
        <header className="bmodal__head">
          <p className="bmodal__brand">
            {site.brand} <span className="lettering">tattoo</span>
          </p>
          <button type="button" className="bmodal__close" onClick={closeBooking} aria-label="Cerrar formulario">
            <span>Cerrar</span>
            <CloseIcon size={20} />
          </button>
        </header>

        <div className="bmodal__intro">
          <Ornament name="dagger" size={40} className="bmodal__orn" />
          <h2 className="display">Solicitar cita</h2>
          <p className="muted">
            Cuéntanos tu idea con el mayor detalle posible. Revisamos cada solicitud a mano y te contestamos para
            hablarlo contigo.
          </p>
        </div>

        <BookingForm preset={booking.preset} onDone={closeBooking} />
      </div>
    </Modal>
  )
}
