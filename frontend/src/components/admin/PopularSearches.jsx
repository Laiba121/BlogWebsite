import { ArrowRight } from 'lucide-react';

export default function PopularSearches() {
  const searches = [
    { rank: '1', term: 'Amoxicillin Monograph', change: '+42%', color: 'bg-primary-100 text-primary-700' },
    { rank: '2', term: 'Lisinopril / Life Events', change: '+18%', color: 'bg-green-100 text-green-700' },
    { rank: '3', term: 'Motrin ago + 2 Minutes ago 2', change: '+3%', color: 'bg-gray-100 text-gray-700' },
    { rank: '4', term: 'Vitamin B Interactions', change: '+11%', color: 'bg-purple-100 text-purple-700' },
  ];

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
        {searches.map((item) => (
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
  );
}
