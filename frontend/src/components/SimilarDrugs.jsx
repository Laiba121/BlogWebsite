const SimilarDrugs = () => {
  const drugs = [
    "Ibuprofen",
    "Aspirin",
    "Naproxen"
  ];

  return (
    <div className="bg-white border rounded-lg p-5 mt-5">
      <h3 className="font-bold mb-4">
        Similar Drugs
      </h3>

      {drugs.map((drug) => (
        <div
          key={drug}
          className="border rounded p-3 mb-2"
        >
          {drug}
        </div>
      ))}
    </div>
  );
};

export default SimilarDrugs;