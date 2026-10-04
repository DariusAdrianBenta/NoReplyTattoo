import { useEffect } from 'react'
import { site } from '../data/site.js'
import Ornament from '../components/ornaments/Ornament.jsx'
import './Legal.css'

export default function NotFound() {
  useEffect(() => {
    document.title = `Página no encontrada — ${site.name}`
  }, [])

  return (
    <section className="legal legal--404 container">
      <Ornament name="snake" size={160} draw strokeWidth={1.2} className="legal__snake" />
      <h1 className="display legal__title">404</h1>
      <p className="lead">Esta página no existe… pero tu próximo tatuaje sí puede.</p>
      <a href="/" className="btn btn--primary">
        <span>Volver al inicio</span>
      </a>
    </section>
  )
}
