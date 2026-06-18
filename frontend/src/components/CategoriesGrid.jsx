// ─────────────────────────────────────────────────────────────
//  src/components/CategoriesGrid.jsx
//  Responsive 4-column grid of CategoryCard components
// ─────────────────────────────────────────────────────────────

import CategoriesCard from "./CategoriesCard";

export default function CategoriesGrid({ categories = [] }) {
  if (categories.length === 0) {
    return (
      <div className="text-center py-20 text-slate-400">
        <span className="text-4xl">🔍</span>
        <p className="mt-3 text-sm font-medium">No categories found.</p>
        <p className="text-xs mt-1">Try adjusting your filter or sort options.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {categories.map((cat) => (
        <CategoriesCard key={cat.id} cat={cat} />
      ))}
    </div>
  );
}
