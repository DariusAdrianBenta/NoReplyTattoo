import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// Tipografías autoalojadas (sin peticiones a Google Fonts: más rápido y compatible con RGPD)
// (cada fuente usa unicode-range: el navegador solo descarga los subconjuntos que necesita)
import '@fontsource/anton'
import '@fontsource/pirata-one'
import '@fontsource-variable/archivo'

import './styles/tokens.css'
import './styles/base.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
