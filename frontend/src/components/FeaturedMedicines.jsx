import MedicineCard from './MedicineCard'

const medicines = [
  {
    status: 'APPROVED',
    name: 'Amoxicillin',
    description: 'A broad-spectrum penicillin antibiotic used to treat various bacterial infections including respiratory, urinary tract, and skin infections.',
    drugClass: 'Antibiotic',
    slug: 'amoxicillin',
  },
  {
    status: 'APPROVED',
    name: 'Atorvastatin',
    description: 'Lipid-lowering medication used to prevent cardiovascular disease in those at high risk and treat elevated cholesterol levels.',
    drugClass: 'Statin',
    slug: 'atorvastatin',
  },
  {
    status: 'RESTRICTED',
    name: 'Codeine Phosphate',
    description: 'Opioid pain medication used to treat mild to moderately severe pain, requiring strict dosage monitoring and a valid prescription.',
    drugClass: 'Analgesic',
    slug: 'codeine-phosphate',
  },
  {
    status: 'APPROVED',
    name: 'Lisinopril',
    description: 'An ACE inhibitor used to treat high blood pressure, heart failure, and after heart attacks to improve survival outcomes.',
    drugClass: 'ACE Inhibitor',
    slug: 'lisinopril',
  },
]

export default function FeaturedMedicines() {
  return (
    <section className="bg-white border-t border-slate-100 px-8 py-12">

      {/* Header */}
      <div className="mb-6">
        <h2 className="text-[20px] font-semibold text-slate-900 mb-1">Featured Medicine Profiles</h2>
        <p className="text-[13px] text-slate-500">In-depth clinical data for widely prescribed treatments.</p>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-4 gap-3.5">
        {medicines.map(med => (
          <MedicineCard key={med.slug} medicine={med} />
        ))}
      </div>
    </section>
  )
}
