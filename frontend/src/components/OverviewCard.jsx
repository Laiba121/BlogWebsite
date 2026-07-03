const OverviewCard = ({ drug }) => {
  return (
    <div className="bg-white border rounded-lg p-5 mb-4">
      <h2 className="font-semibold text-lg mb-3">Overview</h2>

      <p className="text-gray-600">
        {drug?.shortDescription || drug?.purpose ||
          'No description available for this medicine yet.'}
      </p>
    </div>
  )
}

export default OverviewCard;
