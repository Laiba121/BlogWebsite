// ─────────────────────────────────────────────────────────────
//  src/components/StatsBar.jsx
//  Summary stats row shown at the top of the categories page
// ─────────────────────────────────────────────────────────────

export default function StatsBar({ categories = [] }) {
  const totalMedicines = categories.reduce((sum, c) => sum + c.count, 0);

  const stats = [
    { label: "Total Medicines", value: totalMedicines.toLocaleString(), icon: "💊" },
    { label: "Categories",      value: categories.length,               icon: "🗂️" },
    { label: "Last Updated",    value: "Jun 2025",                      icon: "🕐" },
    { label: "Reviewed by",     value: "Pharmacists",                   icon: "✅" },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="bg-white border border-slate-100 rounded-xl p-4 flex items-center gap-3 hover:shadow-sm transition-shadow"
        >
          <span className="text-2xl" role="img" aria-label={stat.label}>
            {stat.icon}
          </span>
          <div>
            <div className="font-bold text-slate-800 text-sm leading-tight">
              {stat.value}
            </div>
            <div className="text-xs text-slate-400 mt-0.5">{stat.label}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
