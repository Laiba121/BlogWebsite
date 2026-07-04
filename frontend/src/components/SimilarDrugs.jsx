import { useEffect, useMemo, useState } from 'react'

import { getDrugs } from '../api'

const SimilarDrugs = ({ drug }) => {
  const [drugs, setDrugs] = useState([])

  useEffect(() => {
    // Best-effort: query by category/title keyword
    const query = drug?.category || drug?.title || ''
    if (!query) return

    getDrugs({ page: 1, limit: 12, query })
      .then((res) => setDrugs(res?.drugs || []))
      .catch(() => setDrugs([]))
  }, [drug?.category, drug?.title])

  const items = useMemo(() => {
    return drugs.slice(0, 3)
  }, [drugs])

  return (
    <div className="bg-white border rounded-lg p-5 mt-5">
      <h3 className="font-bold mb-4">Similar Drugs</h3>

      {items.map((d) => (
        <div key={d._id || d.setId} className="border rounded p-3 mb-2">
          {d.title}
        </div>
      ))}
    </div>
  )
}

export default SimilarDrugs;
