import { useEffect } from 'react'

export default function AdSlot({ slot, format = 'auto', className = '' }) {

  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({})
    } catch (e) {
      console.log('AdSense error:', e)
    }
  }, [])

  return (
    <div className={`my-6 ${className}`}>
      <p className="text-center text-xs text-gray-400 mb-1">
        Advertisement
      </p>

      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  )
}