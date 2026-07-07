import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { SiteSettingsProvider } from './context/SiteSettingsContext.jsx'
import { AdSettingsProvider } from './context/AdSettingsContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SiteSettingsProvider>
      <AdSettingsProvider>
        <App />
      </AdSettingsProvider>
    </SiteSettingsProvider>
  </StrictMode>,
)
