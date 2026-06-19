const StatsCard = ({ value, label }) => {
  return (
    <div className="bg-gray-100 rounded-lg p-6 text-center">
      <h2 className="text-4xl font-bold text-[#004AAD]">
        {value}
      </h2>

      <p className="text-gray-500 text-sm mt-2">
        {label}
      </p>
    </div>
  );
};

export default StatsCard;