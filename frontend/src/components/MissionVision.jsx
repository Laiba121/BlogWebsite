import StatsCard from "./StatsCard";

const MissionVision = () => {
  return (
    <section className="py-12">
      <div className="grid lg:grid-cols-3 gap-5">
        
        <div className="bg-[#004AAD] text-white rounded-xl p-8 lg:col-span-1">
          <h3 className="text-2xl font-semibold mb-4">
            Our Mission
          </h3>

          <p className="text-sm leading-relaxed">
            To democratize access to high-quality pharmacological data.
          </p>

          <ul className="mt-8 space-y-2 text-sm">
            <li>✓ 12,500+ Daily Readers</li>
            <li>✓ 80+ Medical Contributors</li>
            <li>✓ Global Healthcare Reach</li>
          </ul>
        </div>

        <div className="lg:col-span-2 grid gap-5">
          <div className="bg-cyan-100 rounded-xl p-8">
            <h3 className="text-2xl font-semibold text-[#003B8E]">
              Our Vision
            </h3>

            <p className="text-gray-700 mt-3">
              To become the trusted global standard for
              pharmacological content.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            <StatsCard
              value="99%"
              label="Accuracy Rate"
            />

            <StatsCard
              value="24/7"
              label="Medical Updates"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionVision;