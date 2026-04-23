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
import AdminPage from "./pages/AdminPannel"


// ✅ Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />

      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />

        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/articles" element={<ArticlesPage />} />
            <Route path="/articles/:slug" element={<ArticleDetailPage />} />
            <Route path="/categories" element={<CategoriesPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/subscribe" element={<SubscribePage />} />
            
<Route path="/admin" element={<AdminPage />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  )
}