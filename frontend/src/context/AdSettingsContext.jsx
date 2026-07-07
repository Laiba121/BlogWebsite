import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import axios from 'axios'

const AdSettingsContext = createContext(null)

export function AdSettingsProvider({ children }) {
  const [settings, setSettings] = useState({
    publisherId: '',
    slotId: '',
    enabled: false,
    placement: 'sidebar',
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/ads')
        if (response.data?.settings) {
          setSettings(response.data.settings)
        }
      } catch (error) {
        console.error('Unable to load ad settings', error)
      } finally {
        setLoading(false)
      }
    }

    fetchSettings()
  }, [])

  const value = useMemo(() => ({ settings, setSettings, loading }), [settings, loading])

  return <AdSettingsContext.Provider value={value}>{children}</AdSettingsContext.Provider>
}

export function useAdSettings() {
  const context = useContext(AdSettingsContext)
  if (!context) {
    throw new Error('useAdSettings must be used within an AdSettingsProvider')
  }
  return context
}
