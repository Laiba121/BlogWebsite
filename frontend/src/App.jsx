import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { useSiteSettings } from './context/SiteSettingsContext'

import Home from './pages/Home'
import SignInPage from './pages/SignInPage'
import SignUpPage from './pages/SignUpPage'
import VerifyEmailPage from './pages/VerifyEmailPage'
import ResetPasswordPage from './pages/ResetPasswordPage'
import MedicineDetails from './pages/MedicineDetails'
import MedicinesPage from './pages/MedicinesPage'
import MedicinesCategoriesPage from './pages/MedicinesCategoriesPage'
import EditorialPage from './pages/EditorialPage'
import Contact from './pages/Contact'
import AboutUs from "./pages/AboutUs";

import Dashboard from './pages/admin/Dashboard'
import Medicines from './pages/admin/Medicines'
import Categories from './pages/admin/Categories'
import Comments from './pages/admin/Comments'
import Users from './pages/admin/Users'
import Ads from './pages/admin/Ads'
import Settings from './pages/admin/Settings'
import AdminRoute from './components/AdminRoute'
import Profile from './pages/admin/Profile'
import HelpPage from './pages/admin/HelpPage'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

function AppContent() {
  const { settings } = useSiteSettings()

  useEffect(() => {
    document.title = settings.metaTitle || settings.siteName || 'PharmaContext'

    let metaDescription = document.querySelector('meta[name="description"]')
    if (!metaDescription) {
      metaDescription = document.createElement('meta')
      metaDescription.setAttribute('name', 'description')
      document.head.appendChild(metaDescription)
    }
    metaDescription.setAttribute('content', settings.metaDescription || '')
  }, [settings.metaTitle, settings.metaDescription, settings.siteName])

  return (
    <div className="min-h-screen bg-gray-50">
      <main>
        <Routes>
          {/* Home */}
          <Route path="/" element={<Home />} />

          {/* Medicine Routes */}
          
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/verify-email" element={<VerifyEmailPage />} />
          <Route path="/verify-email/:token" element={<VerifyEmailPage />} />
          <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
          <Route path="/medicine/:setIdOrSlug" element={<MedicineDetails />} />
          <Route path="/medicine" element={<MedicineDetails />} />
          <Route path="/medicines" element={<MedicinesPage />} />
          <Route path="/categories" element={<MedicinesCategoriesPage />} />
          <Route path="/editorial" element={<EditorialPage />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<AboutUs />} />
          {/* Admin Routes */}
          <Route path="/admin" element={<AdminRoute><Dashboard /></AdminRoute>} />
          <Route path="/admin/medicines" element={<AdminRoute><Medicines /></AdminRoute>} />
          <Route path="/admin/categories" element={<AdminRoute><Categories /></AdminRoute>} />
          <Route path="/admin/comments" element={<AdminRoute><Comments /></AdminRoute>} />
          <Route path="/admin/users" element={<AdminRoute><Users /></AdminRoute>} />
          <Route path="/admin/ads" element={<AdminRoute><Ads /></AdminRoute>} />
          <Route path="/admin/settings" element={<AdminRoute><Settings /></AdminRoute>} />
          <Route path="/admin/profile" element={<AdminRoute><Profile /></AdminRoute>} />
          <Route path="/admin/help" element={<AdminRoute><HelpPage /></AdminRoute>} />
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
