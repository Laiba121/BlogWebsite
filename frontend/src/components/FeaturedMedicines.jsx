import { useEffect, useMemo, useState } from 'react'

import MedicineCard from './MedicineCard'
import { getDrugs } from '../api'

export default function FeaturedMedicines() {
  const [drugs, setDrugs] = useState([])

  useEffect(() => {
    getDrugs({ page: 1, limit: 12 })
      .then((res) => {
        // backend returns { success, drugs, pagination }
        setDrugs(res?.drugs || [])
      })
      .catch(() => setDrugs([]))
  }, [])

  const featured = useMemo(() => {
    // Fallback: show first 4 newest drugs
    return drugs.slice(0, 4)
  }, [drugs])

  return (
    <section className="bg-white border-t border-slate-100 px-8 py-12">


      {/* Header */}
      <div className="mb-6">
        <h2 className="text-[20px] font-semibold text-slate-900 mb-1">Featured Medicine Profiles</h2>
        <p className="text-[13px] text-slate-500">In-depth clinical data for widely prescribed treatments.</p>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-4 gap-3.5">
        {featured.map((med) => (
          <MedicineCard
            key={med._id || med.setId || med.title}
            medicine={{
              status: med.hasFullDetails ? 'APPROVED' : 'RESTRICTED',
              name: med.title,
              description: med.shortDescription || med.purpose || med.dosage || 'Medicine profile',
              drugClass: med.category || 'Medicine',
              slug: med.setId || med.title,
            }}
          />
        ))}
      </div>

    </section>
  )
}
