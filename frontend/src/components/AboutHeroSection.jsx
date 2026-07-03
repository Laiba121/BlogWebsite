import AboutSection from "../assets/AboutSection.png";

const AboutHeroSection = () => {
  return (
    <section className="py-10">
      <div className="grid md:grid-cols-2 gap-10 items-center">
        <div>
          <p className="uppercase text-xs tracking-wider text-cyan-500 mb-4">
            Science Driven Healthcare
          </p>

          <h1 className="text-4xl font-bold text-[#003B8E] leading-tight">
            Empowering clinicians
            <br />
            with pharmacological
            <br />
            precision.
          </h1>

          <p className="text-gray-600 mt-5 leading-relaxed">
            PharmaContext is a highly curated medical platform designed
            for healthcare professionals, providing clarity in a sea of
            medical information.
          </p>

          <div className="flex gap-4 mt-6">
            <button className="bg-[#004AAD] text-white px-5 py-3 rounded">
              Our Clinical Impact
            </button>

            <button className="border border-gray-300 px-5 py-3 rounded">
              Explore Mission
            </button>
          </div>
        </div>

        <div>
         <img
  src={AboutSection}
  alt=""
  className="w-full h-87.5 rounded-xl shadow-lg"
/>
        </div>
      </div>
    </section>
  );
};

export default AboutHeroSection;