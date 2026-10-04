import { UIProvider } from './context/UIContext.jsx'
import { legalPages } from './data/legal.js'
import Header from './components/Header.jsx'
import Footer from './sections/Footer.jsx'
import BookingModal from './components/booking/BookingModal.jsx'
import MobileCTA from './components/MobileCTA.jsx'
import CustomCursor from './components/CustomCursor.jsx'
import Home from './pages/Home.jsx'
import Legal from './pages/Legal.jsx'
import NotFound from './pages/NotFound.jsx'

/* Enrutado mínimo sin dependencias: la home es una sola página con anclas
   (/#tatuajes, /#artistas…) y las páginas legales tienen URL propia. */
function resolvePage(pathname) {
  const path = pathname.replace(/\/+$/, '') || '/'
  if (path === '/' || path === '/index.html') return { type: 'home' }
  if (legalPages[path]) return { type: 'legal', page: legalPages[path] }
  return { type: '404' }
}

export default function App() {
  const route = resolvePage(window.location.pathname)
  const isHome = route.type === 'home'

  return (
    <UIProvider>
      <a href="#main" className="skip-link">
        Saltar al contenido
      </a>
      <Header isHome={isHome} />
      <main id="main">
        {route.type === 'home' && <Home />}
        {route.type === 'legal' && <Legal page={route.page} />}
        {route.type === '404' && <NotFound />}
      </main>
      <Footer />
      <BookingModal />
      {isHome && <MobileCTA />}
      <CustomCursor />
    </UIProvider>
  )
}
