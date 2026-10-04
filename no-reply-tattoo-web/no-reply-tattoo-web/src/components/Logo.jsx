import Ornament from './ornaments/Ornament.jsx'
import { site } from '../data/site.js'
import './Logo.css'

/** Logotipo tipográfico. Para usar un logo en imagen, sustituye el contenido por <img src="/images/misc/logo.svg" … />. */
export default function Logo({ className = '', href = '/#inicio', onClick }) {
  return (
    <a href={href} className={`logo ${className}`} aria-label={`${site.name} — inicio`} onClick={onClick}>
      <span className="logo__word">{site.brand}</span>
      <Ornament name="sparkle" size={11} className="logo__star" strokeWidth={2} />
      <span className="logo__suffix">tattoo</span>
    </a>
  )
}
