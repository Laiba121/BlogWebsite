import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import MedicineDetails from './pages/MedicineDetails'
import MedicinesPage from './pages/MedicinesPage'
import MedicienesCategoriesPage from './pages/MedicinesCategoriesPage'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/medicine" element={<MedicineDetails />} /> 
        <Route path="/medicines" element={<MedicinesPage />} />
        <Route path="/categories" element={<MedicienesCategoriesPage />} /> 
      </Routes>
    </Router>
  )
}

export default App
