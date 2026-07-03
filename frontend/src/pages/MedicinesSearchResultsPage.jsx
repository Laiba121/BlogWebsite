// ─────────────────────────────────────────────────────────────
//  src/pages/SearchResultsPage.jsx
//  Full Search Results page — assembles all components
// ─────────────────────────────────────────────────────────────

import { useState, useMemo } from "react";

import Navbar        from "../components/Navbar";
import SearchHeader  from "../components/SearchHeader";
import FilterBar     from "../components/FilterBar";
import ResultsGrid   from "../components/ResultsGrid";
import Pagination    from "../components/Pagination";
import Footer        from "../components/Footer";

import { searchResults } from "../data/searchData";

export default function SearchResultsPage() {
  const [query,        setQuery]        = useState("Paracetamol");
  const [activeFilter, setActiveFilter] = useState("All Results");
  const [sortBy,       setSortBy]       = useState("Relevance");
  const [currentPage,  setCurrentPage]  = useState(1);

  // ── Derived: filter + sort results ──────────────────────────
  const displayed = useMemo(() => {
    let list = [...searchResults];

    // Filter by tab (simple tag/name match)
    if (activeFilter !== "All Results") {
      list = list.filter(
        (r) =>
          r.name.toLowerCase().includes(activeFilter.toLowerCase()) ||
          r.tags.some((t) => t.toLowerCase().includes(activeFilter.toLowerCase()))
      );
    }

    // Sort
    if (sortBy === "Name A-Z") list.sort((a, b) => a.name.localeCompare(b.name));
    if (sortBy === "Name Z-A") list.sort((a, b) => b.name.localeCompare(a.name));
    if (sortBy === "Newest")   list.sort((a, b) => b.id - a.id);

    return list;
  }, [activeFilter, sortBy]);

  return (
    <div className="min-h-screen bg-slate-50 font-sans antialiased">

      {/* ── 1. Navbar ── */}
      <Navbar
        activeLink="Categories"
        searchQuery={query}
        onSearchChange={setQuery}
        onSearchSubmit={(q) => {
          setQuery(q);
          setCurrentPage(1);
        }}
      />

      {/* ── 2. Main content ── */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Search heading + did you mean */}
        <SearchHeader
          query={query}
          totalResults={displayed.length}
          suggestion="Panadol"
          onSuggestionClick={(s) => setQuery(s)}
        />

        {/* Filter tabs + sort */}
        <FilterBar
          activeFilter={activeFilter}
          setActiveFilter={(f) => {
            setActiveFilter(f);
            setCurrentPage(1);
          }}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />

        {/* Results grid */}
        <ResultsGrid results={displayed} />

        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalPages={12}
          onPageChange={setCurrentPage}
        />
      </main>

      {/* ── 3. Footer ── */}
      <Footer />
    </div>
  );
}
