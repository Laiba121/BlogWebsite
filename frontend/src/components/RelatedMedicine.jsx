const RelatedMedicine = () => {
  const medicines = [
    "Diclofenac",
    "Amoxicillin",
    "Tramadol",
    "Metamizole",
  ];

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">
        Recently Viewed & Related
      </h2>

      <div className="grid md:grid-cols-4 gap-4">
        {medicines.map((item) => (
          <div
            key={item}
            className="bg-white border rounded-lg p-4"
          >
            <h4 className="font-semibold">
              {item}
            </h4>

            <button className="text-blue-700 mt-3">
              View Profile
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelatedMedicine;