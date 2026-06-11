// ─────────────────────────────────────────────────────────────
//  src/icons/Icons.jsx
//  All inline SVG icons used across the MedicineInfoHub UI
// ─────────────────────────────────────────────────────────────

export const SearchIcon = ({ className = "w-4 h-4" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.35-4.35" />
  </svg>
);

export const BellIcon = ({ className = "w-5 h-5" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
  </svg>
);

export const FilterIcon = ({ className = "w-4 h-4" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
  </svg>
);

export const SortIcon = ({ className = "w-4 h-4" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path d="M3 6h18M7 12h10M11 18h2" />
  </svg>
);

export const ArrowRightIcon = ({ className = "w-4 h-4" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

export const ChevronDownIcon = ({ className = "w-3 h-3" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

export const MenuIcon = ({ className = "w-5 h-5" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);

export const XIcon = ({ className = "w-5 h-5" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path d="M18 6 6 18M6 6l12 12" />
  </svg>
);
// ─────────────────────────────────────────────────────────────
//  src/icons/Icons.jsx
//  All inline SVG icons — no external library needed
// ─────────────────────────────────────────────────────────────

export const SearchIcon = ({ className = "w-4 h-4" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none"
    viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.35-4.35" />
  </svg>
);

export const BellIcon = ({ className = "w-5 h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none"
    viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
  </svg>
);

export const ArrowRightIcon = ({ className = "w-4 h-4" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none"
    viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

export const ChevronDownIcon = ({ className = "w-4 h-4" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none"
    viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

export const ChevronLeftIcon = ({ className = "w-4 h-4" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none"
    viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <polyline points="15 18 9 12 15 6" />
  </svg>
);

export const ChevronRightIcon = ({ className = "w-4 h-4" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none"
    viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

export const MenuIcon = ({ className = "w-5 h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none"
    viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);

export const XIcon = ({ className = "w-5 h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none"
    viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path d="M18 6 6 18M6 6l12 12" />
  </svg>
);
