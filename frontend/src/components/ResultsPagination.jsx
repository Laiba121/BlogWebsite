// ─────────────────────────────────────────────────────────────
//  src/components/Pagination.jsx
//  Page number navigation: prev / numbers / dots / next
// ─────────────────────────────────────────────────────────────

import { ChevronLeftIcon, ChevronRightIcon } from "../icons/Icons";

export default function Pagination({
  currentPage  = 1,
  totalPages   = 12,
  onPageChange,
}) {
  // Build visible page buttons: [1, 2, 3, "...", 12]
  function getPages() {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    const pages = [1, 2, 3];
    if (currentPage > 4) pages.push("...");
    if (currentPage > 3 && currentPage < totalPages - 1) pages.push(currentPage);
    pages.push("...");
    pages.push(totalPages);
    // De-duplicate
    return [...new Set(pages)];
  }

  function go(page) {
    if (page < 1 || page > totalPages) return;
    onPageChange && onPageChange(page);
  }

  const pages = getPages();

  return (
    <div className="flex items-center justify-center gap-1.5 mt-10">

      {/* Prev */}
      <button
        onClick={() => go(currentPage - 1)}
        disabled={currentPage === 1}
        className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:border-blue-300 hover:text-blue-600 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        aria-label="Previous page"
      >
        <ChevronLeftIcon />
      </button>

      {/* Page numbers */}
      {pages.map((page, i) =>
        page === "..." ? (
          <span
            key={`dots-${i}`}
            className="w-8 h-8 flex items-center justify-center text-slate-400 text-sm"
          >
            ···
          </span>
        ) : (
          <button
            key={page}
            onClick={() => go(page)}
            className={`w-8 h-8 flex items-center justify-center rounded-lg text-sm font-medium transition-colors ${
              currentPage === page
                ? "bg-blue-600 text-white shadow-sm"
                : "border border-slate-200 text-slate-600 hover:border-blue-300 hover:text-blue-600"
            }`}
            aria-label={`Page ${page}`}
            aria-current={currentPage === page ? "page" : undefined}
          >
            {page}
          </button>
        )
      )}

      {/* Next */}
      <button
        onClick={() => go(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:border-blue-300 hover:text-blue-600 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        aria-label="Next page"
      >
        <ChevronRightIcon />
      </button>
    </div>
  );
}
