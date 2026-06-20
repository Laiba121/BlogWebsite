import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
      
      {/* Logo */}
      <Link to="/" className="text-2xl font-bold text-primary-500">
        CareerPulse
      </Link>

      {/* Links */}
      <div className="flex flex-wrap items-center gap-4 text-gray-700 font-medium">
        <Link className="hover:text-primary-500" to="/">Home</Link>
        <Link className="hover:text-primary-500" to="/articles">Articles</Link>
        <Link className="hover:text-primary-500" to="/categories">Categories</Link>
        <Link className="hover:text-primary-500" to="/about">About</Link>
        <Link className="hover:text-primary-500" to="/subscribe">Subscribe</Link>
        <Link to="/signin" className="rounded-full bg-primary-500 text-white bg-black px-4 py-2 font-semibold shadow hover:bg-primary-700">
          Sign In
        </Link>
      </div>

    </nav>
  )
}