// ─────────────────────────────────────────────────────────────
//  src/components/Toolbar.jsx
//  Section heading + Filter / Sort controls for categories grid
// ─────────────────────────────────────────────────────────────

import { useState, useRef, useEffect } from "react";
import { FilterIcon, SortIcon, ChevronDownIcon } from "../icons/Icons";

const FILTER_OPTIONS = ["All", "Active", "New", "Updated"];
const SORT_OPTIONS = [
  { value: "alpha", label: "Alphabetical" },
  { value: "count", label: "Most Items" },
  { value: "new",   label: "Newest" },
];

// ── Reusable Dropdown Component ───────────────────────────────
function Dropdown({ icon, label, options, onSelect, activeValue }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={ref}>

      {/* Trigger Button */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-slate-600 bg-white border border-slate-200 rounded-lg hover:border-slate-300 hover:bg-slate-50 transition-colors select-none"
      >
        {icon}
        <span>{label}</span>
        <span className={`transition-transform duration-200 ${open ? "rotate-180" : "rotate-0"}`}>
          <ChevronDownIcon />
        </span>
      </button>

      {/* Dropdown Panel */}
      {open && (
        <div className="absolute right-0 top-full mt-1.5 bg-white border border-slate-100 rounded-xl shadow-lg py-1 z-50 min-w-[10rem]">
          {options.map((opt) => {
            const val  = typeof opt === "string" ? opt : opt.value;
            const text = typeof opt === "string" ? opt : opt.label;
            const isActive = activeValue === val;

            return (
              <button
                key={val}
                onClick={() => {
                  onSelect(val);
                  setOpen(false);
                }}
                className={`w-full text-left px-3 py-1.5 text-sm transition-colors ${
                  isActive
                    ? "text-blue-600 bg-blue-50 font-medium"
                    : "text-slate-600 hover:bg-slate-50 hover:text-blue-600"
                }`}
              >
                {text}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ── Main Toolbar Component ────────────────────────────────────
export default function Toolbar({
  total      = 0,
  sortBy     = "alpha",
  setSortBy,
  filterBy   = "",
  setFilterBy,
}) {
  const activeFilter = filterBy || "All";
  const activeSort   = SORT_OPTIONS.find((o) => o.value === sortBy)?.label ?? "Alphabetical";

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6">

      {/* ── Left: Title + Count ── */}
      <div>
        <h2 className="text-lg font-semibold text-slate-800">
          Categories Overview
        </h2>
        <p className="text-xs text-slate-400 mt-0.5">
          {total} Active Therapeutic Class{total !== 1 ? "es" : ""} Found
        </p>
      </div>

      {/* ── Right: Filter + Sort ── */}
      <div className="flex items-center gap-2 flex-wrap">

        {/* Filter Dropdown */}
        <Dropdown
          icon={<FilterIcon />}
          label={`Filter By: ${activeFilter}`}
          options={FILTER_OPTIONS}
          activeValue={activeFilter}
          onSelect={(val) => setFilterBy && setFilterBy(val === "All" ? "" : val)}
        />

        {/* Sort Dropdown */}
        <Dropdown
          icon={<SortIcon />}
          label={`Sort: ${activeSort}`}
          options={SORT_OPTIONS}
          activeValue={sortBy}
          onSelect={(val) => setSortBy && setSortBy(val)}
        />

      </div>
    </div>
  );
}