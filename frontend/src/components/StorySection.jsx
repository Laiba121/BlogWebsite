const cards = [
  {
    title: "Our Story",
    text: "Founded by a coalition of clinical researchers and medical educators."
  },
  {
    title: "The Clinical Gap",
    text: "We observed that while medical knowledge grows rapidly..."
  },
  {
    title: "Innovation through Integration",
    text: "By integrating peer-reviewed research..."
  },
  {
    title: "A Future First Approach",
    text: "Today PharmaContext serves thousands of professionals."
  }
];

const StorySection = () => {
  return (
    <section className="grid md:grid-cols-2 gap-4 py-10">
      {cards.map((card, index) => (
        <div
          key={index}
          className="border rounded-lg p-6 bg-white shadow-sm"
        >
          <h3 className="font-semibold text-[#003B8E] mb-3">
            {card.title}
          </h3>

          <p className="text-gray-600 text-sm">
            {card.text}
          </p>
        </div>
      ))}
    </section>
  );
};

export default StorySection;