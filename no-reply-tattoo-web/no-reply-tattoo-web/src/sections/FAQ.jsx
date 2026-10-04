import { useId, useState } from 'react'
import { faq } from '../data/faq.js'
import { content } from '../data/content.js'
import { site } from '../data/site.js'
import { instagramUrl, whatsappUrl } from '../utils/links.js'
import Reveal from '../components/Reveal.jsx'
import SectionLabel from '../components/SectionLabel.jsx'
import { InstagramIcon, PlusIcon, WhatsAppIcon } from '../components/icons/Icons.jsx'
import './FAQ.css'

function Item({ item, index, open, onToggle }) {
  const id = useId()
  return (
    <li className={`faq-item ${open ? 'is-open' : ''}`}>
      <h3>
        <button
          type="button"
          className="faq-item__q"
          aria-expanded={open}
          aria-controls={`${id}-a`}
          id={`${id}-q`}
          onClick={onToggle}
        >
          <span className="faq-item__num">{String(index + 1).padStart(2, '0')}</span>
          <span className="faq-item__label">{item.q}</span>
          <span className="faq-item__icon" aria-hidden="true">
            <PlusIcon size={18} />
          </span>
        </button>
      </h3>
      <div className="faq-item__a" id={`${id}-a`} role="region" aria-labelledby={`${id}-q`}>
        <div>
          <p>{item.a}</p>
        </div>
      </div>
    </li>
  )
}

export default function FAQ() {
  const c = content.faq
  const [open, setOpen] = useState(0)

  return (
    <section id="faq" className="faq section" aria-labelledby="faq-title">
      <div className="container faq__grid">
        <div className="faq__aside">
          <SectionLabel number="07">{c.label}</SectionLabel>
          <h2 id="faq-title" className="display faq__title">
            <Reveal as="span">{c.title}</Reveal>
          </h2>
          <p className="faq__lettering lettering" aria-hidden="true">
            {c.lettering}
          </p>
          <p className="muted faq__help">{c.aside}</p>
          <div className="faq__contact">
            <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className="link-line">
              <WhatsAppIcon size={16} /> WhatsApp
            </a>
            <a href={instagramUrl()} target="_blank" rel="noopener noreferrer" className="link-line">
              <InstagramIcon size={16} /> {site.social.instagram.handle}
            </a>
          </div>
        </div>

        <ul className="faq__list">
          {faq.map((item, i) => (
            <Item key={item.q} item={item} index={i} open={open === i} onToggle={() => setOpen(open === i ? -1 : i)} />
          ))}
        </ul>
      </div>
    </section>
  )
}
