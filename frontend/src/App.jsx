import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'

import Navbar from './components/Navbar'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import ArticlesPage from './pages/ArticlesPage'
import ArticleDetailPage from './pages/ArticleDetailPage'
import CategoriesPage from './pages/CategoriesPage'
import AboutPage from './pages/AboutPage'
import SubscribePage from './pages/SubscribePage'
import SignInPage from './pages/SignInPage'
import SignUpPage from './pages/SignUpPage'

// Admin pages
import Dashboard from './pages/admin/Dashboard'
import Medicines from './pages/admin/Medicines'
import Categories from './pages/admin/Categories'
import Converts from './pages/admin/Converts'
import Users from './pages/admin/Users'
import Ads from './pages/admin/Ads'
import Settings from './pages/admin/Settings'
import AdminRoute from './components/AdminRoute'
import Profile from './pages/admin/Profile'


// ✅ Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}

function AppContent() {
  const { pathname } = useLocation()
  const isAdminRoute = pathname.startsWith('/admin')

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {!isAdminRoute && <Navbar />}

      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/articles" element={<ArticlesPage />} />
          <Route path="/articles/:slug" element={<ArticleDetailPage />} />
          <Route path="/categories" element={<CategoriesPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/subscribe" element={<SubscribePage />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          
          {/* Admin Routes */}
          <Route path="/admin" element={<AdminRoute><Dashboard /></AdminRoute>} />
          <Route path="/admin/medicines" element={<AdminRoute><Medicines /></AdminRoute>} />
          <Route path="/admin/categories" element={<AdminRoute><Categories /></AdminRoute>} />
          <Route path="/admin/converts" element={<AdminRoute><Converts /></AdminRoute>} />
          <Route path="/admin/users" element={<AdminRoute><Users /></AdminRoute>} />
          <Route path="/admin/ads" element={<AdminRoute><Ads /></AdminRoute>} />
          <Route path="/admin/settings" element={<AdminRoute><Settings /></AdminRoute>} />
          <Route path="/admin/profile" element={<AdminRoute><Profile /></AdminRoute>} />
        </Routes>
      </main>

      {!isAdminRoute && <Footer />}
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