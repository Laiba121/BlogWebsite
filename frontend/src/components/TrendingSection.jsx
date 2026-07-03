import { useEffect, useMemo, useState } from 'react'

import { getDrugs } from '../api'

export default function TrendingSection() {
  const [drugs, setDrugs] = useState([])

  useEffect(() => {
    getDrugs({ page: 1, limit: 8 })
      .then((res) => setDrugs(res?.drugs || []))
      .catch(() => setDrugs([]))
  }, [])

  const trendingItems = useMemo(() => {
    // No explicit popularity data exists in backend; fallback based on newest
    return drugs.slice(0, 4).map((d, idx) => ({
      id: d._id || d.setId || idx,
      name: d.title,
      sub: d.category || 'Medicine',
      badge: d.hasFullDetails ? 'Verified profile' : 'Processing',
      badgeClass: d.hasFullDetails ? 'text-green-600' : 'text-blue-600',
    }))
  }, [drugs])

  return (
    <section className="bg-slate-50 border-t border-slate-200 px-8 py-12">


      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-[20px] font-semibold text-slate-900">Trending Information</h2>
        <div className="flex gap-1.5">
          <button className="w-8 h-8 flex items-center justify-center bg-white border border-slate-200 rounded-md text-slate-500 hover:bg-slate-100 hover:border-slate-300 transition-colors">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6"/>
            </svg>
          </button>
          <button className="w-8 h-8 flex items-center justify-center bg-white border border-slate-200 rounded-md text-slate-500 hover:bg-slate-100 hover:border-slate-300 transition-colors">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18l6-6-6-6"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-4 gap-3">
        {trendingItems.map((item) => (
          <div
            key={item.id}
            className="bg-white border border-slate-200 rounded-xl px-4 py-3.5 flex items-start gap-3 hover:border-blue-300 transition-colors cursor-pointer"
          >
            <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 6 9 17l-5-5" />
              </svg>
            </div>

            <div className="min-w-0">
              <p className="text-[13px] font-semibold text-slate-900">{item.name}</p>
              <p className="text-[11.5px] text-slate-400 mt-0.5">{item.sub}</p>
              <p className={`text-[11px] font-semibold mt-1 ${item.badgeClass}`}>{item.badge}</p>
            </div>
          </div>
        ))}
      </div>

    </section>
  )
}
