const MedicineCard = ({ medicine }) => {
  return (
    <div className="bg-white border rounded-lg p-4 hover:shadow-md transition">
      <div className="flex justify-between">
        <div className="w-10 h-10 bg-blue-50 rounded"></div>

        <span
          className={`px-3 py-1 text-xs rounded-full ${
            medicine.status === "Approved"
              ? "bg-cyan-100 text-cyan-700"
              : "bg-orange-100 text-orange-700"
          }`}
        >
          {medicine.status}
        </span>
      </div>

      <h3 className="font-semibold mt-5">
        {medicine.name}
      </h3>

      <p className="text-gray-400 text-sm italic mt-1">
        {medicine.generic}
      </p>

      <hr className="my-4" />

      <p className="text-sm text-gray-600">
        {medicine.category}
      </p>
    </div>
  );
};

export default MedicineCard;