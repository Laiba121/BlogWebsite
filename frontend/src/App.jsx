import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Home from './pages/Home'
import MedicineDetails from './pages/MedicineDetails'
import MedicinesPage from './pages/MedicinesPage'
import MedicinesCategoriesPage from './pages/MedicinesCategoriesPage'
import EditorialPage from './pages/EditorialPage'
import Contact from './pages/Contact'

import Dashboard from './pages/admin/Dashboard'
import Medicines from './pages/admin/Medicines'
import Categories from './pages/admin/Categories'
import Converts from './pages/admin/Converts'
import Users from './pages/admin/Users'
import Ads from './pages/admin/Ads'
import Settings from './pages/admin/Settings'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

function AppContent() {
  return (
    <div className="min-h-screen bg-gray-50">
      <main>
        <Routes>
          {/* Home */}
          <Route path="/" element={<Home />} />

          {/* Medicine Routes */}
          <Route path="/medicine" element={<MedicineDetails />} />
          <Route path="/medicines" element={<MedicinesPage />} />
          <Route path="/categories" element={<MedicinesCategoriesPage />} />
          <Route path="/editorial" element={<EditorialPage />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<AboutUs />} />
          {/* Admin Routes */}
          <Route path="/admin" element={<Dashboard />} />
          <Route path="/admin/medicines" element={<Medicines />} />
          <Route path="/admin/categories" element={<Categories />} />
          <Route path="/admin/converts" element={<Converts />} />
          <Route path="/admin/users" element={<Users />} />
          <Route path="/admin/ads" element={<Ads />} />
          <Route path="/admin/settings" element={<Settings />} />
        </Routes>
      </main>
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <AppContent />
    </BrowserRouter>
  )
}