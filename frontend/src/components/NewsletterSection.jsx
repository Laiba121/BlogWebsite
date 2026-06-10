import { useState } from 'react'

const updates = [
  {
    date: 'MAY 24',
    text: 'Added FDA-approved interaction markers for 50+ cardiovascular medications.',
  },
  {
    date: 'MAY 20',
    text: 'New pediatric dosage calculator integration for primary care directory.',
  },
  {
    date: 'MAY 15',
    text: 'Enhanced search algorithms for more accurate cross-referencing of generic names.',
  },
]

export default function NewsletterSection() {
  const [email, setEmail] = useState('')

  const handleSubscribe = e => {
    e.preventDefault()
    if (email) {
      alert(`Subscribed: ${email}`)
      setEmail('')
    }
  }

  return (
    <section className="bg-[#1e3a8a]">
      <div className="grid grid-cols-2">

        {/* ── Left: Newsletter ── */}
        <div className="px-12 py-14">
          <h2 className="text-[26px] font-bold text-white leading-snug mb-3">
            Stay Informed on Medical<br />Breakthroughs
          </h2>
          <p className="text-[13.5px] text-blue-300 leading-relaxed mb-7">
            Get monthly digests of new drug approvals, safety warnings, and
            clinical guidelines delivered directly to your inbox.
          </p>

          {/* Form */}
          <form onSubmit={handleSubscribe} className="flex mb-2.5">
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Your professional email"
              required
              className="flex-1 bg-white/10 border border-white/20 border-r-0 rounded-l-lg px-4 py-2.5 text-[13px] text-white placeholder-white/40 outline-none focus:border-white/50 transition-colors"
            />
            <button
              type="submit"
              className="bg-white text-blue-700 font-semibold text-[13px] px-5 py-2.5 rounded-r-lg hover:bg-blue-50 transition-colors shrink-0"
            >
              Subscribe
            </button>
          </form>
          <p className="text-[11.5px] text-white/35">We value your privacy. Unsubscribe at any time.</p>
        </div>

        {/* ── Right: Recent Updates ── */}
        <div className="bg-black/15 px-12 py-14">

          {/* Title */}
          <h3 className="flex items-center gap-2 text-[14px] font-semibold text-blue-300 mb-5">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/>
              <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/>
            </svg>
            Recent System Updates
          </h3>

          {/* Update Items */}
          <ul className="flex flex-col">
            {updates.map((u, i) => (
              <li
                key={i}
                className={`flex gap-4 py-3.5 ${i < updates.length - 1 ? 'border-b border-white/10' : ''}`}
              >
                <span className="text-[11px] font-bold text-blue-400 min-w-[46px] pt-0.5 tracking-wide">
                  {u.date}
                </span>
                <p className="text-[13px] text-slate-300 leading-relaxed">{u.text}</p>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </section>
  )
}
