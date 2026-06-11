// ─────────────────────────────────────────────────────────────
//  src/components/InteractionCard.jsx
//  Clinical-guidance card for the Drug Interaction Database
// ─────────────────────────────────────────────────────────────

export default function InteractionCard({
  badge       = "✦ Clinical Guidance",
  title       = "Drug Interaction Database",
  description = "Access our updated cross-reference tool for potential contraindications and polypharmacy management. Verified by board-certified clinical pharmacists.",
  primaryCta  = { label: "Launch Interaction Tool ↗", href: "#" },
  secondaryCta = { label: "Download PMI Guides",       href: "#" },
}) {
  return (
    <div className="bg-white border border-slate-100 rounded-2xl p-6 flex flex-col justify-between h-full">

      {/* ── Top: badge, title, description ── */}
      <div>
        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-blue-50 text-blue-600 text-[10px] font-bold uppercase tracking-widest rounded mb-3">
          {badge}
        </span>

        <h3 className="font-bold text-slate-800 text-base mb-2">{title}</h3>

        <p className="text-slate-500 text-xs leading-relaxed max-w-sm">{description}</p>
      </div>

      {/* ── Bottom: CTAs ── */}
      <div className="flex flex-wrap gap-2 mt-5">
        <a
          href={primaryCta.href}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-blue-600 text-white text-xs font-semibold rounded-lg hover:bg-blue-700 transition-colors"
        >
          {primaryCta.label}
        </a>
        <a
          href={secondaryCta.href}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 border border-slate-200 text-slate-600 text-xs font-semibold rounded-lg hover:border-slate-300 hover:bg-slate-50 transition-colors"
        >
          {secondaryCta.label}
        </a>
      </div>
    </div>
  );
}
