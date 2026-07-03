import { FaShareAlt } from "react-icons/fa";
import { FiDownload } from "react-icons/fi";

const MedicineHeader = ({ drug }) => {
  const category = drug?.category || 'Medicine'
  const title = drug?.title || 'Loading...'
  const generic = drug?.genericName?.[0] || drug?.brandName?.[0] || ''

  return (
    <div className="bg-white rounded-lg border p-5 mb-5">
      <span className="bg-green-100 text-green-700 px-3 py-1 rounded text-sm">
        {category}
      </span>

      <h1 className="text-4xl font-bold mt-3">{title}</h1>

      <p className="text-gray-500 mt-2">
        Generic: {generic || '—'}
      </p>

      <div className="flex gap-3 mt-5">
        <button className="border px-4 py-2 rounded flex items-center gap-2">
          <FaShareAlt />
          Share
        </button>

        <button className="bg-blue-700 text-white px-4 py-2 rounded flex items-center gap-2">
          <FiDownload />
          Export PDF
        </button>
      </div>
    </div>
  )
}

export default MedicineHeader;
