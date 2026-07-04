import { useEffect, useMemo, useState } from 'react'

import { getDrugs } from '../api'

const RelatedMedicine = ({ drug }) => {
  const [items, setItems] = useState([])

  useEffect(() => {
    const query = drug?.category || drug?.title || ''
    if (!query) return

    getDrugs({ page: 1, limit: 12, query })
      .then((res) => setItems(res?.drugs || []))
      .catch(() => setItems([]))
  }, [drug?.category, drug?.title])

  const displayed = useMemo(() => items.slice(0, 4), [items])

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Recently Viewed & Related</h2>

      <div className="grid md:grid-cols-4 gap-4">
        {displayed.map((d) => (
          <div key={d._id || d.setId} className="bg-white border rounded-lg p-4">
            <h4 className="font-semibold">{d.title}</h4>

            <a
              href={`/medicine/${d.setId || d.title}`}
              className="text-blue-700 mt-3 inline-block"
            >
              View Profile
            </a>
          </div>
        ))}
      </div>
    </div>
  )
}

export default RelatedMedicine;
