import { useRef } from 'react'
import { useInView } from '../hooks/useInView.js'

/**
 * Aparición suave al hacer scroll.
 * variant: 'up' (por defecto) | 'fade' | 'scale' | 'clip'
 */
export default function Reveal({ as: Tag = 'div', variant = 'up', delay = 0, className = '', style, children, ...rest }) {
  const ref = useRef(null)
  const inView = useInView(ref)
  const cls = ['reveal', variant !== 'up' && `reveal--${variant}`, inView && 'is-in', className].filter(Boolean).join(' ')

  return (
    <Tag ref={ref} className={cls} style={{ ...style, '--delay': `${delay}s` }} {...rest}>
      {children}
    </Tag>
  )
}
