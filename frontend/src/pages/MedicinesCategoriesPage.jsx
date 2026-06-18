// ─────────────────────────────────────────────────────────────
//  src/pages/CategoriesPage.jsx
//  Assembled Categories page — composes all sub-components
// ─────────────────────────────────────────────────────────────

import { useState, useMemo } from "react";

import Navbar          from "../components/Navbar";
import PageHeader      from "../components/PageHeader";
import StatsBar        from "../components/StatsBar";
import Toolbar         from "../components/Toolbar";
import CategoriesGrid  from "../components/CategoriesGrid";
import EditorialCard   from "../components/EditorialCard";
import InteractionCard from "../components/InteractionCard";
import Footer          from "../components/Footer";

import { categoryData } from "../data/categoriesData";

export default function CategoriesPage() {
  const [sortBy,    setSortBy]    = useState("alpha");
  const [filterBy,  setFilterBy]  = useState("");

  // Derived: filtered + sorted list
  const displayed = useMemo(() => {
    let list = [...categoryData];

    // Filter (simple example: could be extended with real status flags)
    if (filterBy && filterBy !== "All") {
      list = list.filter((c) =>
        c.tag.toLowerCase().includes(filterBy.toLowerCase()) ||
        c.name.toLowerCase().includes(filterBy.toLowerCase())
      );
    }

    // Sort
    list.sort((a, b) => {
      if (sortBy === "count") return b.count - a.count;
      if (sortBy === "new")   return b.id - a.id;          // newest by id
      return a.name.localeCompare(b.name);                  // alpha (default)
    });

    return list;
  }, [sortBy, filterBy]);

  return (
    <div className="min-h-screen bg-slate-50 font-sans antialiased">

      {/* ── 1. Navigation bar ── */}
      <Navbar activeLink="Categories" />

      {/* ── 2. Hero / page header ── */}
      <PageHeader
        breadcrumbs={[
          { label: "Home",       href: "/" },
          { label: "Categories"            },
        ]}
        badge="Pharmacology Directory"
        title="Medicine Categories"
        description="Browse our comprehensive database of medical categories and therapeutic agents — organized for clinical precision."
      />

      {/* ── 3. Main content ── */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* Summary stats row */}
        <StatsBar categories={categoryData} />

        {/* Sort / filter toolbar */}
        <Toolbar
          total={displayed.length}
          sortBy={sortBy}
          setSortBy={setSortBy}
          filterBy={filterBy}
          setFilterBy={setFilterBy}
        />

        {/* 4-column responsive category grid */}
        <CategoriesGrid categories={displayed} />

        {/* Feature row: editorial + interaction DB */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
          <EditorialCard
            tag="Trending"
            title="Latest Editorial: Immunotherapy"
            excerpt="Exploring the new frontier of oncology through biological response modifiers."
            href="#"
            ctaLabel="Read Article"
          />
          <InteractionCard
            badge="✦ Clinical Guidance"
            title="Drug Interaction Database"
            description="Access our updated cross-reference tool for potential contraindications and polypharmacy management. Verified by board-certified clinical pharmacists."
            primaryCta={{ label: "Launch Interaction Tool ↗", href: "#" }}
            secondaryCta={{ label: "Download PMI Guides",       href: "#" }}
          />
        </div>
      </main>

      {/* ── 5. Footer ── */}
      <Footer />
    </div>
  );
}
