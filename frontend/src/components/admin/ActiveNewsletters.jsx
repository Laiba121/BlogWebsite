import { CheckCircle } from 'lucide-react'

export default function ActiveNewsletters({ newsletters = [], loading }) {
  const rows = loading
    ? Array.from({ length: 2 }).map((_, index) => ({
        id: `loading-${index}`,
        title: 'Loading...',
        count: '-- Sent',
      }))
    : newsletters

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-gray-900">Active Newsletters</h3>
        <span className="text-xs text-gray-600">Monthly medical reports</span>
      </div>

      <div className="space-y-3 mb-6">
        {rows.map((newsletter) => (
          <div key={newsletter.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-3">
              <CheckCircle size={20} className="text-green-600" />
              <span className="text-gray-700 font-medium">{newsletter.title}</span>
            </div>
            <span className="text-gray-600 text-sm">{newsletter.count}</span>
          </div>
        ))}
      </div>

      <button className="w-full bg-primary-500 text-white py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors">
        Create New Campaign
      </button>
    </div>
  )
}
