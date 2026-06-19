const CTASection = () => {
  return (
    <section className="bg-[#004AAD] text-white rounded-xl p-10 text-center my-10">
      <h2 className="text-3xl font-bold">
        Join the Editorial Revolution
      </h2>

      <p className="mt-3 text-blue-100">
        Access our full editorial policy and medical updates.
      </p>

      <div className="flex justify-center gap-4 mt-6 flex-wrap">
        <button className="bg-white text-[#004AAD] px-5 py-3 rounded">
          Browse Articles
        </button>

        <button className="border border-white px-5 py-3 rounded">
          Contact Us
        </button>
      </div>
    </section>
  );
};

export default CTASection;