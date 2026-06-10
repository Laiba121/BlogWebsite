import React from 'react'
import Navbar from '../components/Navbar'
import HeroSection from '../components/HeroSection'
import CategoryGrid from '../components/CategoryGrid'
import MedicineCard from '../components/MedicineCard'
import TrendingSection from '../components/TrendingSection'
import NewsletterSection from '../components/NewsletterSection'
import Footer from '../components/Footer'   

const Home = () => {
  return (
    <div>
        <Navbar/>
        <HeroSection/>
        <CategoryGrid/> 
        <MedicineCard/>
        <TrendingSection/>
        <NewsletterSection/>
        <Footer/>   
    </div>
  )
}

export default Home