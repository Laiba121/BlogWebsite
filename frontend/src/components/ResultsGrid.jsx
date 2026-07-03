// ─────────────────────────────────────────────────────────────
//  src/components/ResultsGrid.jsx
//  Responsive 3-column grid of ResultCard components
// ─────────────────────────────────────────────────────────────

import ResultCard from "./ResultCard";

export default function ResultsGrid({ results = [] }) {
  if (results.length === 0) {
    return (
      <div className="text-center py-24">
        <span className="text-5xl">🔍</span>
        <p className="mt-4 font-semibold text-slate-700">No results found</p>
        <p className="text-sm text-slate-400 mt-1">
          Try searching with a different medicine name or generic name.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {results.map((result) => (
        <ResultCard key={result.id} result={result} />
      ))}
    </div>
  );
}
