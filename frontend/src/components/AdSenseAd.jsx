import { useEffect } from 'react'
import { useAdSettings } from '../context/AdSettingsContext'

export default function AdSenseAd({ className = '' }) {
  const { settings } = useAdSettings()

  useEffect(() => {
    if (!settings.enabled || !settings.publisherId || !settings.slotId) return

    try {
      if (window.adsbygoogle) {
        window.adsbygoogle.push({})
      }
    } catch (error) {
      console.error('AdSense render failed', error)
    }
  }, [settings.enabled, settings.publisherId, settings.slotId])

  if (!settings.enabled || !settings.publisherId || !settings.slotId) {
    return null
  }

  return (
    <div className={`my-6 overflow-hidden rounded-xl border border-gray-200 bg-white p-3 shadow-sm ${className}`}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={settings.publisherId}
        data-ad-slot={settings.slotId}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  )
}
