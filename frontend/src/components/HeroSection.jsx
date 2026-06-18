import { useState } from 'react'

const trendingTags = ['Paracetamol', 'Ibuprofen', 'Metformin']

export default function HeroSection() {
  const [query, setQuery] = useState('')

  return (
    <section className="bg-white border-b border-slate-200 pt-16 pb-14 px-8 text-center">

      {/* Heading */}
      <h1 className="text-[38px] font-bold text-slate-900 leading-tight tracking-tight mb-4">
        Find Accurate Medicine Information
      </h1>

      {/* Subheading */}
      <p className="text-[15px] text-slate-500 leading-relaxed mb-8">
        Access verified clinical data, contraindications, and therapeutic uses for
        <br />thousands of medications.
      </p>

      {/* Search Box */}
      <div className="flex justify-center mb-4">
        <div className="flex w-full max-w-[580px] bg-white border-[1.5px] border-slate-200 rounded-[10px] overflow-hidden shadow-sm focus-within:border-blue-300 focus-within:shadow-[0_2px_16px_rgba(37,99,235,0.12)] transition-all">
          {/* Search Icon */}
          <div className="flex items-center pl-4">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
          </div>

          {/* Input */}
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search by brand name or active ingredient..."
            className="flex-1 px-3 py-[14px] text-[14px] text-slate-700 placeholder-slate-400 outline-none bg-transparent"
          />

          {/* Search Button */}
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-7 text-[14px] font-medium transition-colors shrink-0">
            Search
          </button>
        </div>
      </div>

      {/* Trending */}
      <div className="flex items-center justify-center gap-2 flex-wrap">
        <span className="text-[13px] text-slate-400">Trending:</span>
        {trendingTags.map(tag => (
          <a
            key={tag}
            href={`/medicine/${tag.toLowerCase()}`}
            className="inline-block bg-white border border-slate-200 rounded-full px-3.5 py-1 text-[13px] text-slate-600 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-600 transition-colors"
          >
            {tag}
          </a>
        ))}
      </div>
    </section>
  )
}
