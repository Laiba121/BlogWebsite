import { useSiteSettings } from '../context/SiteSettingsContext'

export default function Footer() {
  const { settings } = useSiteSettings()

  return (
    <footer className="bg-slate-900 px-8 py-8">

      {/* Top row */}
      <div className="flex items-center justify-between mb-5 flex-wrap gap-4">
        <div>
          <span className="block text-[16px] font-bold text-white mb-1">{settings.siteName}</span>
          <p className="text-[12px] text-slate-500">© 2024 {settings.siteName}. All rights reserved.</p>
        </div>

        <nav className="flex gap-5 flex-wrap">
          {['Privacy Policy', 'Terms of Service', 'Contact Us', 'Medical Disclaimer'].map(link => (
            <a
              key={link}
              href={`/${link.toLowerCase().replace(/ /g, '-')}`}
              className="text-[12.5px] text-slate-400 hover:text-slate-200 transition-colors"
            >
              {link}
            </a>
          ))}
        </nav>
      </div>

      {/* Disclaimer */}
      <div className="border-t border-slate-800 pt-5">
        <p className="text-[11.5px] text-slate-600 text-center leading-relaxed">
          Disclaimer: The information provided on {settings.siteName} is for educational and informational purposes only and is not
          intended as medical advice. Always consult with a qualified healthcare professional before starting any new medication or treatment.
        </p>
      </div>

    </footer>
  )
}
