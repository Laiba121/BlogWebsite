import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
      
      {/* Logo */}
      <Link to="/" className="text-2xl font-bold text-blue-600">
        CareerPulse
      </Link>

      {/* Links */}
      <div className="flex gap-6 text-gray-700 font-medium">
        <Link className="hover:text-blue-600" to="/">Home</Link>
        <Link className="hover:text-blue-600" to="/articles">Articles</Link>
        <Link className="hover:text-blue-600" to="/categories">Categories</Link>
        <Link className="hover:text-blue-600" to="/about">About</Link>
        <Link className="hover:text-blue-600" to="/subscribe">Subscribe</Link>
        {/* ADMIN PANEL LINK */}
        <Link
          to="/admin"
          className="text-red-600 font-bold"
        >
          Admin
        </Link>
      </div>

    </nav>
  )
}