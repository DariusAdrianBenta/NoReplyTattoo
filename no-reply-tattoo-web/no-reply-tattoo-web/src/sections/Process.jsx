import { useRef } from 'react'
import { content } from '../data/content.js'
import { images } from '../data/images.js'
import { useInView } from '../hooks/useInView.js'
import Photo from '../components/Photo.jsx'
import Reveal from '../components/Reveal.jsx'
import SectionLabel from '../components/SectionLabel.jsx'
import BookingButton from '../components/BookingButton.jsx'
import Ornament from '../components/ornaments/Ornament.jsx'
import './Process.css'

function Step({ step, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { threshold: 0.3 })

  return (
    <li ref={ref} className={`step ${inView ? 'is-in' : ''}`} style={{ '--d': `${index * 0.12}s` }}>
      <div className="step__top">
        <span className="step__num display" aria-hidden="true">
          {step.number}
        </span>
        <Ornament name={step.ornament} size={54} className="step__orn" draw strokeWidth={1.3} delay={0.3 + index * 0.12} />
      </div>
      <h3 className="step__title display">
        <span className="visually-hidden">Paso {step.number}: </span>
        {step.title}
      </h3>
      <p className="step__text">{step.text}</p>
    </li>
  )
}

export default function Process() {
  const c = content.process

  return (
    <section id="proceso" className="process section" aria-labelledby="process-title">
      <div className="container">
        <header className="process__head">
          <SectionLabel number="05">{c.label}</SectionLabel>
          <h2 id="process-title" className="display h2 process__title">
            <Reveal as="span">{c.title}</Reveal>
            <span className="process__lettering lettering" aria-hidden="true">
              {c.lettering}
            </span>
          </h2>
          <Reveal variant="scale" className="process__sketch" delay={0.15}>
            <Photo image={images.sketch} sizes="(max-width: 767px) 50vw, 22vw" widths={[360, 540, 720]} fallbackWidth={600} />
          </Reveal>
        </header>

        <svg className="process__path" viewBox="0 0 1200 40" preserveAspectRatio="none" aria-hidden="true">
          <path d="M2 22C120 8 220 34 330 20S560 6 660 22 900 36 1010 18 1150 12 1198 20" />
        </svg>

        <ol className="process__steps">
          {c.steps.map((s, i) => (
            <Step key={s.number} step={s} index={i} />
          ))}
        </ol>

        <div className="process__cta">
          <BookingButton variant="ink">{c.cta}</BookingButton>
        </div>
      </div>
    </section>
  )
}
