import { useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'

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

import { getDrugBySetIdOrSlug } from '../api'

const MedicineDetails = () => {
  const { setId } = useParams()
  const [drug, setDrug] = useState(null)
  const [loading, setLoading] = useState(true)

  const normalizedSetId = useMemo(() => setId || '', [setId])

  useEffect(() => {
    let mounted = true

    setLoading(true)
    getDrugBySetIdOrSlug(normalizedSetId)
      .then((d) => {
        if (!mounted) return
        setDrug(d)
      })
      .catch(() => {
        if (!mounted) return
        setDrug(null)
      })
      .finally(() => {
        if (!mounted) return
        setLoading(false)
      })

    return () => {
      mounted = false
    }
  }, [normalizedSetId])

  return (
    <>
      <Navbar />

      <div className="max-w-7xl mx-auto px-5 py-6">
        <Breadcrumb />

        <div className="grid lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3">
            {/* Pass drug data down */}
            <MedicineHeader drug={drug} />

            <OverviewCard drug={drug} />

            <AccordionSection
              title="Uses"
              content={drug?.purpose || '—'}
            />

            <AccordionSection
              title="Dosage & Administration"
              content={drug?.dosage || '—'}
            />

            <AccordionSection
              title="Side Effects"
              content={Array.isArray(drug?.warnings) ? drug.warnings.join(', ') : drug?.warnings || '—'}
            />

            <AccordionSection
              title="Important Warnings"
              content={drug?.warnings || '—'}
            />

            <AccordionSection
              title="FAQs"
              content={'—'}
            />

            <CommunityDiscussion />
          </div>

          <div>
            <QuickFacts drug={drug} />
            <SimilarDrugs drug={drug} />
            <SponsoredAd />
            <NewsletterCards />
          </div>
        </div>

        <RelatedMedicine drug={drug} />
      </div>

      <Footer />
    </>
  )
}

export default MedicineDetails;
