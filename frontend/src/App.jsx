import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import MedicineDetails from './pages/MedicineDetails'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/medicine" element={<MedicineDetails />} />  
      </Routes>
    </Router>
  )
}

export default App
