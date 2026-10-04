import { content } from '../data/content.js'
import { images } from '../data/images.js'
import Photo from '../components/Photo.jsx'
import Reveal from '../components/Reveal.jsx'
import SectionLabel from '../components/SectionLabel.jsx'
import Ornament from '../components/ornaments/Ornament.jsx'
import './Intro.css'

export default function Intro() {
  const c = content.intro
  const [l1, l2, l3] = c.titleLines

  return (
    <section id="intro" className="intro section" aria-labelledby="intro-title">
      <div className="container intro__grid">
        <SectionLabel number="01" className="intro__label">
          {c.label}
        </SectionLabel>

        <h2 id="intro-title" className="intro__title display">
          <Reveal as="span" className="intro__l intro__l--1">
            {l1}
          </Reveal>
          <Reveal as="span" className="intro__l intro__l--2" delay={0.1}>
            {l2}
            <span className="intro__lettering lettering" aria-hidden="true">
              {c.lettering}
            </span>
          </Reveal>
          <Reveal as="span" className="intro__l intro__l--3 outline" delay={0.2}>
            {l3}
          </Reveal>
        </h2>

        <Reveal as="figure" variant="clip" className="intro__figure" delay={0.15}>
          <Photo image={images.intro} sizes="(max-width: 767px) 100vw, 34vw" widths={[480, 720, 960, 1280]} />
          <figcaption>{c.caption}</figcaption>
        </Reveal>

        <Ornament name="arrow" size={110} className="intro__arrow" draw strokeWidth={1.3} />
        <Ornament name="eye" size={70} className="intro__eye" draw strokeWidth={1.2} delay={0.5} />
        <Ornament name="sparkle" size={18} className="intro__spark" />

        <div className="intro__text">
          {c.paragraphs.map((p, i) => (
            <Reveal as="p" key={i} delay={0.1 * i} className={i === 0 ? 'lead' : 'muted'}>
              {p}
            </Reveal>
          ))}
          <Reveal as="p" className="intro__signature lettering" delay={0.25}>
            — {c.signature}
          </Reveal>
        </div>
      </div>
    </section>
  )
}
