const categories = [
  {
    name: 'Pain Relief',
    slug: 'pain-relief',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/>
      </svg>
    ),
  },
  {
    name: 'Antibiotics',
    slug: 'antibiotics',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3"/>
        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
      </svg>
    ),
  },
  {
    name: 'Diabetes',
    slug: 'diabetes',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2z"/>
        <path d="M8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01"/>
      </svg>
    ),
  },
  {
    name: 'Heart',
    slug: 'heart',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
      </svg>
    ),
  },
  {
    name: 'Allergy',
    slug: 'allergy',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2z"/>
        <path d="M8.56 2.75c4.37 6.03 6.02 9.42 8.03 17.72m2.54-15.38c-3.72 4.35-8.94 5.66-16.88 5.85m19.5 1.9c-3.5-.93-6.63-.82-8.94 0-2.58.92-5.01 2.86-7.44 6.32"/>
      </svg>
    ),
  },
  {
    name: 'Vitamins',
    slug: 'vitamins',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10.5 20H4a2 2 0 0 1-2-2V5c0-1.1.9-2 2-2h3.93a2 2 0 0 1 1.66.9l.82 1.2a2 2 0 0 0 1.66.9H20a2 2 0 0 1 2 2v3"/>
        <circle cx="18" cy="18" r="3"/><path d="m22 22-1.5-1.5"/>
      </svg>
    ),
  },
]

export default function CategoryGrid() {
  return (
    <section className="bg-slate-50 px-8 py-12">

      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h2 className="text-[20px] font-semibold text-slate-900 mb-1">Browse by Category</h2>
          <p className="text-[13px] text-slate-500">Explore medicine databases organized by therapeutic use.</p>
        </div>
        <a href="/categories" className="flex items-center gap-1 text-[13px] text-blue-600 font-medium hover:gap-2 transition-all pt-0.5 shrink-0">
          View All
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </a>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-6 gap-3">
        {categories.map(cat => (
          <a
            key={cat.slug}
            href={`/category/${cat.slug}`}
            className="flex flex-col items-center justify-center gap-2.5 bg-white border border-slate-200 rounded-xl py-5 px-3 cursor-pointer hover:border-blue-300 hover:bg-blue-50 transition-all group"
          >
            <span className="text-blue-600 group-hover:scale-110 transition-transform">
              {cat.icon}
            </span>
            <span className="text-[12px] font-medium text-slate-700 text-center">{cat.name}</span>
          </a>
        ))}
      </div>
    </section>
  )
}
