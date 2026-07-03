// ─────────────────────────────────────────────────────────────
//  src/components/PageHeader.jsx
//  Hero-style page header with breadcrumb, badge, title & desc
// ─────────────────────────────────────────────────────────────

export default function PageHeader({
  breadcrumbs = [{ label: "Home", href: "/" }, { label: "Categories" }],
  badge = "Pharmacology Directory",
  title = "Medicine Categories",
  description = "Browse our comprehensive database of medical categories and therapeutic agents — organized for clinical precision.",
}) {
  return (
    <div className="bg-gradient-to-b from-slate-50 to-white border-b border-slate-100 px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-7xl mx-auto">

        {/* ── Breadcrumb ── */}
        <nav className="flex items-center gap-1.5 text-xs text-slate-400 mb-5" aria-label="Breadcrumb">
          {breadcrumbs.map((crumb, i) => (
            <span key={i} className="flex items-center gap-1.5">
              {i > 0 && <span>/</span>}
              {crumb.href ? (
                <a href={crumb.href} className="hover:text-blue-600 transition-colors">
                  {crumb.label}
                </a>
              ) : (
                <span className="text-slate-600 font-medium">{crumb.label}</span>
              )}
            </span>
          ))}
        </nav>

        {/* ── Content ── */}
        <div className="max-w-2xl">
          {/* Animated badge */}
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-blue-50 text-blue-600 text-xs font-semibold rounded-full mb-3 tracking-wide uppercase">
            <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" />
            {badge}
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 leading-tight mb-3">
            {title}
          </h1>

          {/* Description */}
          <p className="text-slate-500 text-base leading-relaxed">{description}</p>
        </div>
      </div>
    </div>
  );
}
