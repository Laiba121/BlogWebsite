// ─────────────────────────────────────────────────────────────
//  src/components/ResultCard.jsx
//  Individual medicine search result card
// ─────────────────────────────────────────────────────────────

import { ArrowRightIcon } from "../icons/Icons";

// Status badge color map
const statusColors = {
  green:  {
    badge: "bg-green-50 text-green-700",
    dot:   "bg-green-500",
    avail: "text-green-600",
  },
  orange: {
    badge: "bg-orange-50 text-orange-700",
    dot:   "bg-orange-500",
    avail: "text-orange-600",
  },
  red: {
    badge: "bg-red-50 text-red-700",
    dot:   "bg-red-500",
    avail: "text-red-600",
  },
};

export default function ResultCard({ result }) {
  const sc = statusColors[result.statusColor] ?? statusColors.green;
  const ac = statusColors[result.availabilityColor] ?? statusColors.green;

  return (
    <div className="bg-white border border-slate-100 rounded-2xl p-5 flex flex-col gap-3 hover:shadow-md hover:shadow-slate-100 hover:-translate-y-0.5 transition-all duration-200 group">

      {/* ── Top row: status badge + icon ── */}
      <div className="flex items-start justify-between">
        <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest ${sc.badge}`}>
          <span className={`w-1.5 h-1.5 rounded-full ${sc.dot}`} />
          {result.status}
        </span>
        <div className="w-9 h-9 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-lg shrink-0">
          {result.icon}
        </div>
      </div>

      {/* ── Medicine name + description ── */}
      <div>
        <h3 className="font-semibold text-slate-800 text-sm leading-snug group-hover:text-blue-600 transition-colors">
          {result.name}
        </h3>
        <p className="text-xs text-slate-400 mt-0.5">{result.description}</p>
      </div>

      {/* ── Tags ── */}
      <div className="flex flex-wrap gap-1.5">
        {result.tags.map((tag) => (
          <span
            key={tag}
            className="px-2 py-0.5 bg-slate-100 text-slate-600 text-[11px] font-medium rounded-md"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* ── Footer: availability + view link ── */}
      <div className="flex items-center justify-between pt-2 border-t border-slate-50 mt-auto">
        <span className={`flex items-center gap-1 text-xs font-medium ${ac.avail}`}>
          <span className={`w-1.5 h-1.5 rounded-full ${ac.dot}`} />
          {result.availability}
        </span>

        <a
          href={`/medicine/${result.slug}`}
          className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors"
        >
          View Profile
          <ArrowRightIcon className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  );
}
