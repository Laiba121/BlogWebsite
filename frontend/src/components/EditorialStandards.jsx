const standards = [
  {
    title: "Double Blind Review",
    text: "Every review process is reviewed by independent clinical pharmacists."
  },
  {
    title: "Evidence Only Basis",
    text: "Articles cite peer reviewed journals."
  },
  {
    title: "Continuous Auditing",
    text: "Content is continuously monitored."
  }
];

const EditorialStandards = () => {
  return (
    <section className="py-10">
      <h2 className="text-3xl font-bold text-[#003B8E] mb-2">
        Editorial Standards
      </h2>

      <p className="text-gray-500 mb-8">
        Transparency is the backbone of medical trust.
      </p>

      <div className="grid md:grid-cols-3 gap-5">
        {standards.map((item, index) => (
          <div
            key={index}
            className="border rounded-lg p-6"
          >
            <h4 className="font-semibold mb-3">
              {item.title}
            </h4>

            <p className="text-sm text-gray-600">
              {item.text}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default EditorialStandards;