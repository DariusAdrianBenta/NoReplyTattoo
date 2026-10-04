import { useEffect, useRef, useState } from 'react'
import { content } from '../data/content.js'
import { artists } from '../data/artists.js'
import { reviewsSummary } from '../data/reviews.js'
import { useMediaQuery } from '../hooks/useMediaQuery.js'
import { useScrollStepper } from '../hooks/useScrollStepper.js'
import Photo from '../components/Photo.jsx'
import SectionLabel from '../components/SectionLabel.jsx'
import './Studio.css'

/* El estudio: una máquina de tatuar 3D que gira mientras pasan cuatro
   capítulos cortos. Al llegar, la página se retiene: cada gesto avanza un
   capítulo a velocidad fija y no se puede seguir hasta ver los cuatro
   (ver hooks/useScrollStepper.js). Ocupa una sola pantalla. */

const pad = (n) => String(n).padStart(2, '0')

const statValue = (v) =>
  v
    .replace('{artists}', String(artists.length))
    .replace('{rating}', reviewsSummary.rating.toLocaleString('es-ES', { minimumFractionDigits: 1 }))

/** Lienzo 3D: carga Three.js solo cuando la sección se acerca a la pantalla. */
function MachineCanvas({ progress, focus, staticMode }) {
  const canvasRef = useRef(null)
  const sceneRef = useRef(null)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    let cancelled = false
    let visibility

    const load = new IntersectionObserver(
      async ([entry]) => {
        if (!entry.isIntersecting) return
        load.disconnect()
        try {
          const { createTattooMachineScene } = await import('../three/tattooMachine.js')
          if (cancelled) return
          const scene = await createTattooMachineScene(canvas)
          if (cancelled) return scene.dispose()
          sceneRef.current = scene
          // Solo renderiza mientras se ve
          visibility = new IntersectionObserver(([e]) => sceneRef.current?.setVisible(e.isIntersecting))
          visibility.observe(canvas)
        } catch (err) {
          console.warn('[estudio 3D]', err)
          setFailed(true)
        }
      },
      { rootMargin: '600px 0px' },
    )
    load.observe(canvas)

    return () => {
      cancelled = true
      load.disconnect()
      visibility?.disconnect()
      sceneRef.current?.dispose()
      sceneRef.current = null
    }
  }, [])

  useEffect(() => {
    sceneRef.current?.setProgress(staticMode ? 0.18 : progress)
  })
  useEffect(() => {
    sceneRef.current?.setFocus(staticMode ? 0 : focus)
  })

  if (failed) return null
  return <canvas ref={canvasRef} className="studio__canvas" aria-hidden="true" />
}

export default function Studio() {
  const c = content.studio
  const steps = c.chapters.length
  const sectionRef = useRef(null)
  const reduced = useMediaQuery('(prefers-reduced-motion: reduce)')
  const { step, locked, goTo } = useScrollStepper(sectionRef, steps, { enabled: !reduced })

  const active = reduced ? 0 : step
  // Giro de la máquina: cada capítulo tiene su ángulo (la escena lo anima a velocidad fija)
  const progress = (active + 0.5) / steps

  return (
    <section
      ref={sectionRef}
      id="estudio"
      className={`studio ${reduced ? 'studio--static' : ''} ${locked ? 'is-locked' : ''}`}
      aria-labelledby="studio-title"
      style={{ '--steps': steps }}
    >
      <div className="studio__scroller">
        <div className="studio__sticky">
          <div className="container studio__grid">
            <div className="studio__copy">
              <SectionLabel number="04">{c.label}</SectionLabel>
              <h2 id="studio-title" className="display studio__title">
                {c.title}
                <span className="studio__lettering lettering" aria-hidden="true">
                  {c.lettering}
                </span>
              </h2>

              <ol className="studio__chapters">
                {c.chapters.map((ch, i) => (
                  <li key={ch.title} className={`studio__chapter ${i === active ? 'is-active' : ''}`} aria-current={i === active ? 'step' : undefined}>
                    <span className="studio__chapter-num">{pad(i + 1)}</span>
                    <h3 className="studio__chapter-title display">{ch.title}</h3>
                    <p className="studio__chapter-text">{ch.text}</p>
                  </li>
                ))}
              </ol>

              <div className="studio__progress">
                <div className="studio__steps" role="group" aria-label="Capítulos">
                  {c.chapters.map((ch, i) => (
                    <button
                      key={ch.title}
                      type="button"
                      className={`studio__step ${i === active ? 'is-active' : ''} ${i < active ? 'is-done' : ''}`}
                      onClick={() => goTo(i)}
                      aria-label={`${pad(i + 1)} · ${ch.title}`}
                    >
                      <span />
                    </button>
                  ))}
                </div>
                <p className="studio__hint" aria-hidden="true">
                  {active < steps - 1 ? 'Desliza' : 'Continuar'}
                  <span className="studio__hint-arrow" />
                </p>
              </div>
            </div>

            <div className="studio__stage">
              <span className="studio__glow" aria-hidden="true" />
              <MachineCanvas progress={progress} focus={active} staticMode={reduced} />

              {c.chapters.map((ch, i) =>
                ch.image ? (
                  <figure key={ch.title} className={`studio__photo ${i === active ? 'is-active' : ''}`} aria-hidden={i !== active}>
                    <Photo image={ch.image} sizes="(max-width: 767px) 120px, 240px" widths={[240, 360, 480]} fallbackWidth={360} />
                  </figure>
                ) : (
                  ch.tag && (
                    <span key={ch.title} className={`studio__tag ${i === active ? 'is-active' : ''}`} aria-hidden={i !== active}>
                      {ch.tag}
                    </span>
                  )
                ),
              )}
            </div>
          </div>

          <ul className="container studio__stats">
            {c.stats.map((s) => (
              <li key={s.label}>
                <strong className="display">{statValue(s.value)}</strong>
                <span>{s.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
