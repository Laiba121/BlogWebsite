import { useEffect, useMemo, useState } from 'react'

import MedicineCard from './MedicineCard'
import { getDrugs } from '../api'

const MedicineGrid = () => {
  const [drugs, setDrugs] = useState([])

  useEffect(() => {
    getDrugs({ page: 1, limit: 12 })
      .then((res) => setDrugs(res?.drugs || []))
      .catch(() => setDrugs([]))
  }, [])

  const medicines = useMemo(() => {
    return drugs.map((d) => ({
      status: d.hasFullDetails ? 'APPROVED' : 'RESTRICTED',
      name: d.title,
      description: d.shortDescription || d.purpose || d.dosage || '',
      drugClass: d.category || 'Medicine',
      slug: d.setId || d.title,
    }))
  }, [drugs])

  return (
    <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
      {medicines.map((medicine) => (
        <MedicineCard key={medicine.slug} medicine={medicine} />
      ))}
    </div>
  )
}

export default MedicineGrid;

