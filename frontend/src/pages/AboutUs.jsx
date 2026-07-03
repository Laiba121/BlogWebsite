import Navbar from "../components/Navbar";
import AboutHeroSection from "../components/AboutHeroSection";
import StorySection from "../components/StorySection";
import MissionVision from "../components/MissionVision";
import EditorialStandards from "../components/EditorialStandards";
import CTASection from "../components/CTASection";
import Footer from "../components/Footer";

const AboutUs = () => {
  return (
    <div className="bg-white">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <AboutHeroSection />
        <StorySection />
        <MissionVision />
        <EditorialStandards />
        <CTASection />
      </div>

      <Footer />
    </div>
  );
};

export default AboutUs;