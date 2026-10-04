import { useEffect } from 'react'
import { site } from '../data/site.js'
import Ornament from '../components/ornaments/Ornament.jsx'
import { ArrowRight } from '../components/icons/Icons.jsx'
import './Legal.css'

export default function Legal({ page }) {
  useEffect(() => {
    document.title = `${page.title} — ${site.name}`
    window.scrollTo(0, 0)
  }, [page])

  return (
    <article className="legal container">
      <a href="/" className="link-line legal__back">
        <ArrowRight size={16} style={{ transform: 'rotate(180deg)' }} /> Volver al inicio
      </a>
      <Ornament name="cross" size={40} className="legal__orn" />
      <h1 className="display legal__title">{page.title}</h1>
      <p className="legal__updated">Última actualización: {page.updated}</p>
      {page.sections.map((s) => (
        <section key={s.h} className="legal__section">
          <h2>{s.h}</h2>
          {s.p.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </section>
      ))}
    </article>
  )
}
