import { ArrowRight } from 'lucide-react'

export default function PopularSearches({ searches = [], loading }) {
  const placeholder = Array.from({ length: 4 }).map((_, idx) => ({ rank: String(idx + 1), term: 'Loading...', change: '--', color: 'bg-gray-100 text-gray-700' }))
  const items = loading ? placeholder : searches

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-gray-900">Popular Searches</h3>
        <button className="text-primary-500 text-sm font-medium hover:text-primary-700 flex items-center gap-1">
          View all Report
          <ArrowRight size={16} />
        </button>
      </div>

      <div className="space-y-3">
        {items.map((item) => (
          <div key={item.rank} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
            <div className="flex items-center gap-3">
              <span className={`w-8 h-8 flex items-center justify-center rounded font-bold text-sm ${item.color}`}>
                {item.rank}
              </span>
              <span className="text-gray-700 font-medium">{item.term}</span>
            </div>
            <span className="text-green-600 text-sm font-semibold">{item.change}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
