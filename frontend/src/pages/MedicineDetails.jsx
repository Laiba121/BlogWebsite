import Navbar from "../components/Navbar";
import Breadcrumb from "../components/Breadcrumb";
import MedicineHeader from "../components/MedicineHeader";
import OverviewCard from "../components/OverviewCard";
import AccordionSection from "../components/AccordionSection";
import CommunityDiscussion from "../components/CommunityDiscussion";
import QuickFacts from "../components/QuickFacts";
import SimilarDrugs from "../components/SimilarDrugs";
import SponsoredAd from "../components/SponsoredAd";
import NewsletterCards from "../components/NewsletterCards";
import RelatedMedicine from "../components/RelatedMedicine";
import Footer from "../components/Footer";

const MedicineDetails = () => {
  return (
    <>
      <Navbar />

      <div className="max-w-7xl mx-auto px-5 py-6">
        <Breadcrumb />

        <div className="grid lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3">
            <MedicineHeader />

            <OverviewCard />

            <AccordionSection
              title="Uses"
              content="Uses content goes here."
            />

            <AccordionSection
              title="Dosage & Administration"
              content="Dosage content goes here."
            />

            <AccordionSection
              title="Side Effects"
              content="Side effects content goes here."
            />

            <AccordionSection
              title="Important Warnings"
              content="Warnings content goes here."
            />

            <AccordionSection
              title="FAQs"
              content="FAQs content goes here."
            />

            <CommunityDiscussion />
          </div>

          <div>
            <QuickFacts />
            <SimilarDrugs />
            <SponsoredAd />
            <NewsletterCards />
          </div>
        </div>

        <RelatedMedicine />
      </div>

      <Footer />
    </>
  );
};

export default MedicineDetails;