import { useEffect, useState } from 'react'

import { getCategories } from '../api'

function DefaultCategoryIcon() {
  return (
    <svg
      width="26"
      height="26"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 19V5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v14" />
      <polyline points="16 3 16 21 8 21 8 3" />
    </svg>
  )
}

export default function CategoryGrid() {
  const [categories, setCategories] = useState([])

  useEffect(() => {
    getCategories()
      .then(setCategories)
      .catch(() => setCategories([]))
  }, [])

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
              <DefaultCategoryIcon />
            </span>
            <span className="text-[12px] font-medium text-slate-700 text-center">{cat.name}</span>
          </a>
        ))}
      </div>
    </section>
  )
}
