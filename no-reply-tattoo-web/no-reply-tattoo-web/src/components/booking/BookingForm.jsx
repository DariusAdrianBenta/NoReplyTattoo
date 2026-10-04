import { useEffect, useRef, useState } from 'react'
import { bookingOptions } from '../../data/booking.js'
import { site } from '../../data/site.js'
import { validateBooking } from '../../utils/validateBooking.js'
import { bookingWhatsappUrl, sendBookingToWhatsapp } from '../../services/bookingService.js'
import { instagramUrl, whatsappUrl } from '../../utils/links.js'
import { Field, a11y } from './Field.jsx'
import Ornament from '../ornaments/Ornament.jsx'
import { ArrowUpRight, CheckIcon, InstagramIcon, WhatsAppIcon } from '../icons/Icons.jsx'

const EMPTY = {
  name: '',
  phone: '',
  email: '',
  idea: '',
  style: '',
  zone: '',
  size: '',
  references: '',
  artist: '',
  availability: [],
  message: '',
  consent: false,
}

const ORDER = ['name', 'phone', 'email', 'idea', 'style', 'zone', 'size', 'consent']

export default function BookingForm({ preset, onDone }) {
  const [values, setValues] = useState(EMPTY)
  const [touched, setTouched] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [status, setStatus] = useState('idle') // idle | success
  const [blocked, setBlocked] = useState(false) // el navegador no dejó abrir WhatsApp
  const formRef = useRef(null)
  const successRef = useRef(null)

  useEffect(() => {
    if (status === 'success') successRef.current?.focus()
  }, [status])

  // Preselección desde "Cita con X" o "Quiero algo así"
  useEffect(() => {
    if (!preset) return
    setValues((v) => ({
      ...v,
      artist: preset.artist ?? v.artist,
      style: preset.style && bookingOptions.styles.includes(preset.style) ? preset.style : v.style,
    }))
  }, [preset])

  const errors = validateBooking(values)
  const show = (k) => (submitted || touched[k] ? errors[k] : undefined)

  const set = (k) => (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
    setValues((v) => ({ ...v, [k]: value }))
  }
  const blur = (k) => () => setTouched((t) => ({ ...t, [k]: true }))

  const toggleAvailability = (opt) =>
    setValues((v) => ({
      ...v,
      availability: v.availability.includes(opt) ? v.availability.filter((o) => o !== opt) : [...v.availability, opt],
    }))

  const artistName = bookingOptions.artists.find((a) => a.id === values.artist && a.id)?.name ?? ''

  const onSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    const firstError = ORDER.find((k) => errors[k])
    if (firstError) {
      const el = formRef.current?.querySelector(`[name="${firstError}"]`)
      el?.focus()
      el?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      return
    }
    // Se abre WhatsApp en el mismo clic (sin await) para que el navegador no lo bloquee
    setBlocked(!sendBookingToWhatsapp({ ...values, artistName }))
    setStatus('success')
  }

  const reset = () => {
    setValues(EMPTY)
    setTouched({})
    setSubmitted(false)
    setStatus('idle')
  }

  if (status === 'success') {
    return (
      <div className="bform__success" role="status" tabIndex={-1} ref={successRef}>
        <Ornament name="rose" size={84} draw strokeWidth={1.2} />
        <h3 className="display">Último paso</h3>
        <p className="lead">
          {blocked ? 'Pulsa el botón para abrir WhatsApp' : 'Te hemos abierto WhatsApp'} con tu solicitud ya escrita,{' '}
          {values.name.split(' ')[0]}. <strong>Solo tienes que enviar el mensaje</strong> y te contestaremos
          personalmente lo antes posible.
        </p>
        <p>Si tienes fotos de referencia, adjúntalas en ese mismo chat.</p>
        <div className="bform__success-actions">
          <a
            className="btn btn--primary"
            href={bookingWhatsappUrl({ ...values, artistName })}
            target="_blank"
            rel="noopener noreferrer"
          >
            <WhatsAppIcon size={18} />
            <span>{blocked ? 'Abrir WhatsApp' : 'Volver a abrir WhatsApp'}</span>
          </a>
          <a className="btn" href={instagramUrl()} target="_blank" rel="noopener noreferrer">
            <InstagramIcon size={18} />
            <span>Síguenos en Instagram</span>
          </a>
        </div>
        <button
          type="button"
          className="link-line bform__again"
          onClick={() => {
            reset()
            onDone?.()
          }}
        >
          Cerrar
        </button>
      </div>
    )
  }

  return (
    <form ref={formRef} className="bform" noValidate onSubmit={onSubmit}>
      {/* --- 01 Sobre ti --- */}
      <fieldset className="bform__group">
        <legend>
          <span>01</span> Sobre ti
        </legend>
        <Field id="name" label="Nombre" required error={show('name')}>
          <input
            {...a11y('name', show('name'))}
            type="text"
            autoComplete="name"
            value={values.name}
            onChange={set('name')}
            onBlur={blur('name')}
            data-autofocus
          />
        </Field>
        <div className="bform__row">
          <Field id="phone" label="Teléfono" required error={show('phone')}>
            <input
              {...a11y('phone', show('phone'))}
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              placeholder="+34 …"
              value={values.phone}
              onChange={set('phone')}
              onBlur={blur('phone')}
            />
          </Field>
          <Field id="email" label="Email" required error={show('email')}>
            <input
              {...a11y('email', show('email'))}
              type="email"
              inputMode="email"
              autoComplete="email"
              value={values.email}
              onChange={set('email')}
              onBlur={blur('email')}
            />
          </Field>
        </div>
      </fieldset>

      {/* --- 02 Tu tatuaje --- */}
      <fieldset className="bform__group">
        <legend>
          <span>02</span> Tu tatuaje
        </legend>
        <Field id="idea" label="¿Qué quieres tatuarte?" required error={show('idea')}>
          <textarea
            {...a11y('idea', show('idea'))}
            rows={4}
            placeholder="Describe tu idea: qué significa, qué elementos quieres, si tiene que ir con otro tatuaje…"
            value={values.idea}
            onChange={set('idea')}
            onBlur={blur('idea')}
          />
        </Field>
        <div className="bform__row bform__row--3">
          <Field id="style" label="Estilo" required error={show('style')}>
            <select {...a11y('style', show('style'))} value={values.style} onChange={set('style')} onBlur={blur('style')}>
              <option value="">Elige…</option>
              {bookingOptions.styles.map((o) => (
                <option key={o}>{o}</option>
              ))}
            </select>
          </Field>
          <Field id="zone" label="Zona del cuerpo" required error={show('zone')}>
            <select {...a11y('zone', show('zone'))} value={values.zone} onChange={set('zone')} onBlur={blur('zone')}>
              <option value="">Elige…</option>
              {bookingOptions.bodyZones.map((o) => (
                <option key={o}>{o}</option>
              ))}
            </select>
          </Field>
          <Field id="size" label="Tamaño aproximado" required error={show('size')}>
            <select {...a11y('size', show('size'))} value={values.size} onChange={set('size')} onBlur={blur('size')}>
              <option value="">Elige…</option>
              {bookingOptions.sizes.map((o) => (
                <option key={o}>{o}</option>
              ))}
            </select>
          </Field>
        </div>
        <Field
          id="references"
          label="¿Tienes alguna referencia?"
          hint="Enlaces, cuentas de Instagram, tatuajes que te gustan… Las fotos puedes mandarlas luego en el chat de WhatsApp."
        >
          <input
            {...a11y('references', null, true)}
            type="text"
            value={values.references}
            onChange={set('references')}
          />
        </Field>
      </fieldset>

      {/* --- 03 Detalles --- */}
      <fieldset className="bform__group">
        <legend>
          <span>03</span> Detalles
        </legend>
        <Field id="artist" label="Artista preferido">
          <select {...a11y('artist')} value={values.artist} onChange={set('artist')}>
            {bookingOptions.artists.map((a) => (
              <option key={a.id || 'none'} value={a.id}>
                {a.name}
              </option>
            ))}
          </select>
        </Field>

        <div className="field">
          <span className="field__label" id="availability-label">
            Disponibilidad aproximada <span className="field__opt">(opcional)</span>
          </span>
          <div className="chips" role="group" aria-labelledby="availability-label">
            {bookingOptions.availability.map((opt) => {
              const on = values.availability.includes(opt)
              return (
                <button
                  key={opt}
                  type="button"
                  className={`chip ${on ? 'is-on' : ''}`}
                  aria-pressed={on}
                  onClick={() => toggleAvailability(opt)}
                >
                  {on && <CheckIcon size={14} />}
                  {opt}
                </button>
              )
            })}
          </div>
        </div>

        <Field id="message" label="Mensaje adicional">
          <textarea {...a11y('message')} rows={3} value={values.message} onChange={set('message')} />
        </Field>

        <div className={`field field--check ${show('consent') ? 'has-error' : ''}`}>
          <label className="check">
            <input
              {...a11y('consent', show('consent'))}
              type="checkbox"
              checked={values.consent}
              onChange={set('consent')}
            />
            <span className="check__box" aria-hidden="true">
              <CheckIcon size={14} />
            </span>
            <span>
              He leído y acepto la{' '}
              <a href="/politica-privacidad" target="_blank" rel="noopener" className="link-line">
                política de privacidad
              </a>
              . *
            </span>
          </label>
          {show('consent') && (
            <p className="field__error" id="consent-error" role="alert">
              {errors.consent}
            </p>
          )}
        </div>
      </fieldset>

      <div className="bform__submit">
        {submitted && Object.keys(errors).length > 0 && (
          <p className="field__error" role="alert">
            Revisa los campos marcados.
          </p>
        )}
        <button type="submit" className="btn btn--primary btn--lg btn--block">
          <WhatsAppIcon size={18} />
          <span>Enviar por WhatsApp</span>
          <ArrowUpRight size={18} />
        </button>
        <p className="bform__note">
          ¿Prefieres hablar directamente? Escríbenos a{' '}
          <a href={instagramUrl()} target="_blank" rel="noopener noreferrer" className="link-line">
            <InstagramIcon size={14} /> {site.social.instagram.handle}
          </a>{' '}
          o por{' '}
          <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className="link-line">
            WhatsApp
          </a>
          .
        </p>
      </div>
    </form>
  )
}
