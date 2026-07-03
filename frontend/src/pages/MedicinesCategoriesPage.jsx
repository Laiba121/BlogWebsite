// ─────────────────────────────────────────────────────────────
//  src/pages/CategoriesPage.jsx
//  Assembled Categories page — composes all sub-components
// ─────────────────────────────────────────────────────────────

import { useEffect, useMemo, useState } from 'react'

import Navbar from '../components/Navbar'
import PageHeader from '../components/PageHeader'
import Footer from '../components/Footer'

import { getCategories } from '../api'

export default function MedicinesCategoriesPage() {
  const [categories, setCategories] = useState([])
  const [filterBy, setFilterBy] = useState('')

  useEffect(() => {
    getCategories()
      .then(setCategories)
      .catch(() => setCategories([]))
  }, [])

  const displayed = useMemo(() => {
    if (!filterBy) return categories
    const q = filterBy.toLowerCase()
    return categories.filter(
      (c) => c.name?.toLowerCase().includes(q) || c.slug?.toLowerCase().includes(q)
    )
  }, [categories, filterBy])

  return (
    <div className="min-h-screen bg-slate-50 font-sans antialiased">
      <Navbar activeLink="Categories" />

      <PageHeader
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Categories' },
        ]}
        badge="Pharmacology Directory"
        title="Medicine Categories"
        description="Browse our comprehensive database of medical categories and therapeutic agents — organized for clinical precision."
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-6">
          <input
            value={filterBy}
            onChange={(e) => setFilterBy(e.target.value)}
            placeholder="Filter categories..."
            className="w-full md:w-96 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm"
          />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {displayed.map((c) => (
            <a
              key={c.slug}
              href={`/category/${c.slug}`}
              className="bg-white border border-slate-200 rounded-xl p-4 text-center hover:border-blue-300 hover:bg-blue-50"
            >
              <div className="text-[13px] font-semibold text-slate-900">{c.name}</div>
            </a>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  )
}

