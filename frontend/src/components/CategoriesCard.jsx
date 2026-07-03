// ─────────────────────────────────────────────────────────────
//  src/components/CategoryCard.jsx
//  Individual medicine category card with icon, badge & progress
// ─────────────────────────────────────────────────────────────

import { ArrowRightIcon } from "../icons/icons";
import { colorMap } from "../data/categoriesData";

// Max count used for the progress bar scale
const MAX_COUNT = 220;

export default function CategoryCard({ cat }) {
  const c = colorMap[cat.color] ?? colorMap.blue;
  const fillPct = Math.min((cat.count / MAX_COUNT) * 100, 100);

  return (
    <a
      href={`/category/${cat.slug}`}
      className={`
        group relative flex flex-col bg-white border border-slate-100 rounded-2xl p-5
        transition-all duration-200
        hover:-translate-y-0.5 hover:shadow-md hover:shadow-slate-100
        ${c.hover}
        ring-0 hover:ring-1 ${c.ring}
      `}
    >
      {/* ── Count badge (top-right) ── */}
      <div className="absolute top-4 right-4">
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${c.badge}`}>
          {cat.count} Items
        </span>
      </div>

      {/* ── Icon box ── */}
      <div className={`w-10 h-10 rounded-xl ${c.icon} flex items-center justify-center text-xl mb-4 shrink-0`}>
        {cat.icon}
      </div>

      {/* ── Name + therapeutic tag ── */}
      <h3 className="font-semibold text-slate-800 text-sm group-hover:text-blue-600 transition-colors leading-snug">
        {cat.name}
      </h3>
      <span className={`inline-block mt-1 mb-2 px-1.5 py-0.5 rounded text-[10px] font-medium ${c.badge} opacity-70 w-fit`}>
        {cat.tag}
      </span>

      {/* ── Description ── */}
      <p className="text-xs text-slate-400 leading-relaxed line-clamp-2 flex-1">
        {cat.desc}
      </p>

      {/* ── Progress bar ── */}
      <div className="mt-4">
        <div className="w-full h-1 bg-slate-100 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full ${c.bar} transition-all duration-700`}
            style={{ width: `${fillPct}%` }}
            role="progressbar"
            aria-valuenow={cat.count}
            aria-valuemax={MAX_COUNT}
            aria-label={`${cat.count} medicines`}
          />
        </div>
      </div>

      {/* ── Hover arrow ── */}
      <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity text-slate-400">
        <ArrowRightIcon />
      </div>
    </a>
  );
}
