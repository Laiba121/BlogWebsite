// ─────────────────────────────────────────────────────────────
//  src/components/EditorialCard.jsx
//  Dark gradient promotional card for the latest editorial post
// ─────────────────────────────────────────────────────────────

import { ArrowRightIcon } from "../icons/icons";

export default function EditorialCard({
  tag       = "Trending",
  title     = "Latest Editorial: Immunotherapy",
  excerpt   = "Exploring the new frontier of oncology through biological response modifiers.",
  href      = "#",
  ctaLabel  = "Read Article",
}) {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-800 via-slate-900 to-blue-950 text-white min-h-[200px] flex flex-col justify-end p-6">

      {/* ── Ambient glow blobs ── */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-6 right-6 w-32 h-32 rounded-full bg-blue-500 opacity-20 blur-3xl" />
        <div className="absolute bottom-6 left-6 w-24 h-24 rounded-full bg-cyan-500 opacity-20 blur-2xl" />
      </div>

      {/* ── Content ── */}
      <div className="relative z-10">
        {/* Tag */}
        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-amber-400 text-amber-900 text-[10px] font-bold rounded uppercase tracking-widest mb-3">
          <span className="w-1.5 h-1.5 bg-amber-700 rounded-full" aria-hidden="true" />
          {tag}
        </span>

        {/* Title */}
        <h3 className="font-bold text-base leading-snug mb-1.5">{title}</h3>

        {/* Excerpt */}
        <p className="text-slate-300 text-xs leading-relaxed mb-4 max-w-sm">{excerpt}</p>

        {/* CTA */}
        <a
          href={href}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-white text-slate-900 text-xs font-semibold rounded-lg hover:bg-slate-100 transition-colors"
        >
          {ctaLabel}
          <ArrowRightIcon />
        </a>
      </div>
    </div>
  );
}
