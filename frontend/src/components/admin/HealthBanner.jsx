import { AlertCircle } from 'lucide-react'

export default function HealthBanner({ network = {}, loading, condensed }) {
  if (loading) {
    return (
      <div className="bg-linear-to-r from-primary-600 to-primary-800 rounded-lg p-6 text-white animate-pulse">
        <div className="h-4 w-32 mb-3 rounded bg-white/30" />
        <div className="h-3 w-24 rounded bg-white/30" />
      </div>
    )
  }

  return (
    <div className={`bg-linear-to-r from-primary-600 to-primary-800 rounded-lg p-6 text-white ${condensed ? 'h-full' : ''}`}>
      <div className="flex items-start gap-4">
        <div className="bg-primary-700 p-2 rounded-lg">
          <AlertCircle size={24} />
        </div>
        <div>
          <h3 className="text-xl font-bold mb-2">Network {network.status || 'Healthy'}</h3>
          <p className="text-primary-100 text-sm">
            {network.regions ? `All pharmacological databases are synced across ${network.regions} regional servers.` : 'All systems are operating normally.'}
          </p>
          <p className="text-primary-100/80 text-xs mt-2">Last checked {network.lastChecked || 'a few moments ago'}</p>
        </div>
      </div>
    </div>
  )
}
