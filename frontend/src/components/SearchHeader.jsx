// ─────────────────────────────────────────────────────────────
//  src/components/SearchHeader.jsx
//  Shows "Showing results for X" + "Did you mean Y?" suggestion
// ─────────────────────────────────────────────────────────────

export default function SearchHeader({
  query       = "",
  totalResults = 0,
  suggestion  = "",
  onSuggestionClick,
}) {
  return (
    <div className="mb-5">
      {/* Results title */}
      <div className="flex items-baseline gap-2 flex-wrap">
        <p className="text-sm text-slate-500">
          Showing results for
        </p>
        <h1 className="text-xl font-bold text-slate-900">
          "{query}"
        </h1>
        <span className="text-sm text-slate-400">
          — {totalResults} results found
        </span>
      </div>

      {/* Did you mean */}
      {suggestion && (
        <p className="text-sm text-slate-500 mt-1">
          Did you mean:{" "}
          <button
            onClick={() => onSuggestionClick && onSuggestionClick(suggestion)}
            className="text-blue-600 font-medium hover:underline"
          >
            {suggestion}?
          </button>
        </p>
      )}
    </div>
  );
}
