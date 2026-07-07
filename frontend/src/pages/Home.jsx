import Navbar from '../components/Navbar'
import HeroSection from '../components/HeroSection'
import CategoryGrid from '../components/CategoryGrid'
import FeaturedMedicines from '../components/FeaturedMedicines'
import TrendingSection from '../components/TrendingSection'
import NewsletterSection from '../components/NewsletterSection'
import Footer from '../components/Footer'
import AdSenseAd from '../components/AdSenseAd'

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <Navbar />
      <HeroSection />
      <CategoryGrid />
      <FeaturedMedicines />
      <AdSenseAd />
      <TrendingSection />
      <NewsletterSection />
      <Footer />
    </div>
  )
}
