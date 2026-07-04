const QuickFacts = ({ drug }) => {
  return (
    <div className="bg-white border rounded-lg p-5">
      <h3 className="font-bold mb-4">Quick Facts</h3>

      <ul className="space-y-2 text-sm">
        <li>
          Availability: {drug?.hasFullDetails ? 'APPROVED' : 'DATA PENDING'}
        </li>
        <li>Dosage: {drug?.dosage || '—'}</li>
        <li>Manufacturer: {drug?.manufacturer || '—'}</li>
        <li>Type: {drug?.category || '—'}</li>
      </ul>
    </div>
  )
}

export default QuickFacts;
