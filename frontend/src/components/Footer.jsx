export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white p-4 mt-auto">
      <p className="text-center text-sm">
        © {new Date().getFullYear()} CareerPulse. All rights reserved.
      </p>
    </footer>
  )
}