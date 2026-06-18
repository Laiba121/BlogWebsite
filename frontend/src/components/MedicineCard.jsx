const statusStyles = {
  APPROVED: 'bg-green-100 text-green-700 border border-green-300',
  RESTRICTED: 'bg-yellow-100 text-yellow-700 border border-yellow-300',
  OTC: 'bg-blue-50 text-blue-700 border border-blue-200',
}

export default function MedicineCard({ medicine }) {
  const { status, name, description, drugClass, slug } = medicine

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-[18px] flex flex-col hover:border-blue-300 hover:shadow-[0_2px_12px_rgba(37,99,235,0.08)] transition-all cursor-pointer">

      {/* Status Badge */}
      <span className={`inline-block text-[10px] font-bold tracking-wide px-2 py-0.5 rounded mb-2.5 w-fit ${statusStyles[status] || statusStyles.APPROVED}`}>
        {status}
      </span>

      {/* Name */}
      <h3 className="text-[16px] font-semibold text-slate-900 mb-2 leading-snug">{name}</h3>

      {/* Description */}
      <p className="text-[12.5px] text-slate-500 leading-relaxed flex-1 mb-3.5 line-clamp-3">{description}</p>

      {/* Footer */}
      <div className="flex items-center justify-between mt-auto">
        <span className="text-[11px] text-slate-500 bg-slate-100 border border-slate-200 rounded-full px-2.5 py-0.5">
          {drugClass}
        </span>
        <a
          href={`/medicine/${slug}`}
          className="flex items-center gap-1 text-[12px] text-blue-600 font-medium hover:gap-1.5 transition-all"
        >
          View Details
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 18l6-6-6-6"/>
          </svg>
        </a>
      </div>
    </div>
  )
}
