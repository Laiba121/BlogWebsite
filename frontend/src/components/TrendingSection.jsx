const trendingItems = [
  {
    id: 1,
    name: 'Metformin HCL',
    sub: 'Rising search volume',
    badge: '+12% this week',
    badgeClass: 'text-green-600',
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
        <rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
      </svg>
    ),
  },
  {
    id: 2,
    name: 'Influenza 2024',
    sub: 'Safety guidelines',
    badge: 'Updated today',
    badgeClass: 'text-blue-600',
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
  },
  {
    id: 3,
    name: 'Ozempic',
    sub: 'Dosage guidance',
    badge: 'Most viewed',
    badgeClass: 'text-purple-600',
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
      </svg>
    ),
  },
  {
    id: 4,
    name: 'Naproxen',
    sub: 'Drug interaction alert',
    badge: 'High priority',
    badgeClass: 'text-red-600',
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
        <line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
      </svg>
    ),
  },
]

export default function TrendingSection() {
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
        {trendingItems.map(item => (
          <div
            key={item.id}
            className="bg-white border border-slate-200 rounded-xl px-4 py-3.5 flex items-start gap-3 hover:border-blue-300 transition-colors cursor-pointer"
          >
            {/* Icon Box */}
            <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
              {item.icon}
            </div>

            {/* Info */}
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
