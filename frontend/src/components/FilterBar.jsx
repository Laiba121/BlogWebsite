// ─────────────────────────────────────────────────────────────
//  src/components/FilterBar.jsx
//  Filter type tabs (All / Tablets / Syrup / IV) + Sort dropdown
// ─────────────────────────────────────────────────────────────

import { useState, useRef, useEffect } from "react";
import { ChevronDownIcon } from "../icons/Icons";
import { filterTabs, sortOptions } from "../data/searchData";

export default function FilterBar({
  activeFilter,
  setActiveFilter,
  sortBy,
  setSortBy,
}) {
  const [sortOpen, setSortOpen] = useState(false);
  const sortRef = useRef(null);

  // Close sort dropdown on outside click
  useEffect(() => {
    function handleOutside(e) {
      if (sortRef.current && !sortRef.current.contains(e.target)) {
        setSortOpen(false);
      }
    }
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, []);

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6">

      {/* ── Filter tabs ── */}
      <div className="flex items-center gap-2 flex-wrap">
        {filterTabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveFilter(tab)}
            className={`px-3.5 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              activeFilter === tab
                ? "bg-blue-600 text-white shadow-sm"
                : "bg-white border border-slate-200 text-slate-600 hover:border-blue-300 hover:text-blue-600"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* ── Sort dropdown ── */}
      <div className="flex items-center gap-2 text-sm text-slate-500 shrink-0">
        <span className="font-medium">Sort by:</span>
        <div className="relative" ref={sortRef}>
          <button
            onClick={() => setSortOpen((p) => !p)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-sm font-semibold text-slate-700 hover:border-slate-300 transition-colors"
          >
            {sortBy}
            <span className={`transition-transform duration-200 ${sortOpen ? "rotate-180" : ""}`}>
              <ChevronDownIcon />
            </span>
          </button>

          {sortOpen && (
            <div className="absolute right-0 top-full mt-1.5 w-40 bg-white border border-slate-100 rounded-xl shadow-lg py-1 z-50">
              {sortOptions.map((opt) => (
                <button
                  key={opt}
                  onClick={() => {
                    setSortBy(opt);
                    setSortOpen(false);
                  }}
                  className={`w-full text-left px-3 py-1.5 text-sm transition-colors ${
                    sortBy === opt
                      ? "text-blue-600 bg-blue-50 font-medium"
                      : "text-slate-600 hover:bg-slate-50 hover:text-blue-600"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
