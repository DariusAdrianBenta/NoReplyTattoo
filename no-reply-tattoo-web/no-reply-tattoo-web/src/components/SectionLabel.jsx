/** Etiqueta editorial de sección:  (02) ——— PORTFOLIO */
export default function SectionLabel({ number, children, className = '' }) {
  return (
    <p className={`label ${className}`}>
      {number && <span className="label__num">({number})</span>}
      <span className="label__rule" aria-hidden="true" />
      <span>{children}</span>
    </p>
  )
}
