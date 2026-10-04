import Hero from '../sections/Hero.jsx'
import Intro from '../sections/Intro.jsx'
import Portfolio from '../sections/Portfolio.jsx'
import Artists from '../sections/Artists.jsx'
import Studio from '../sections/Studio.jsx'
import Process from '../sections/Process.jsx'
import BookingCTA from '../sections/BookingCTA.jsx'
import Reviews from '../sections/Reviews.jsx'
import FAQ from '../sections/FAQ.jsx'
import Location from '../sections/Location.jsx'

/* Orden de la home = recorrido del visitante:
   impacto → trabajos → artistas → estudio → proceso → cita → confianza → dudas → contacto */
export default function Home() {
  return (
    <>
      <Hero />
      <Intro />
      <Portfolio />
      <Artists />
      <Studio />
      <Process />
      <BookingCTA />
      <Reviews />
      <FAQ />
      <Location />
    </>
  )
}
