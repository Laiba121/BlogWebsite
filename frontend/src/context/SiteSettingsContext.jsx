import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import axios from 'axios'

const SiteSettingsContext = createContext(null)

export function SiteSettingsProvider({ children }) {
  const [settings, setSettings] = useState({
    siteName: 'PharmaContext Medical Information',
    tagline: 'Authoritative Pharmaceutical Database for Professionals',
    supportEmail: 'support@pharmacontext.com',
    supportPhone: '+1 (555) 019-2400',
    facebook: 'https://facebook.com/pharmacontext',
    linkedin: 'https://linkedin.com/company/pharmacontext',
    metaTitle: 'PharmaContext Medical Information',
    metaDescription: 'Trusted pharmaceutical information for professionals.',
    smtpHost: 'smtp.pharmacontext.com',
    smtpEmail: 'notifications@pharmacontext.com',
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/settings')
        if (response.data?.settings) {
          setSettings(response.data.settings)
        }
      } catch (error) {
        console.error('Unable to load site settings', error)
      } finally {
        setLoading(false)
      }
    }

    fetchSettings()
  }, [])

  const value = useMemo(() => ({ settings, setSettings, loading }), [settings, loading])

  return <SiteSettingsContext.Provider value={value}>{children}</SiteSettingsContext.Provider>
}

export function useSiteSettings() {
  const context = useContext(SiteSettingsContext)
  if (!context) {
    throw new Error('useSiteSettings must be used within a SiteSettingsProvider')
  }
  return context
}
