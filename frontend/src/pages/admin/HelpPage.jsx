import { ArrowRight, BookOpen, LifeBuoy, MessageCircle, ShieldCheck } from 'lucide-react'
import AdminLayout from '../../components/admin/AdminLayout'

const helpCards = [
  {
    title: 'Managing medicines',
    description: 'Create, edit, and publish medicine records from the medicines section with full detail controls.',
    icon: BookOpen,
  },
  {
    title: 'Site settings',
    description: 'Update branding, contact details, social links, SEO metadata, and upload logos from settings.',
    icon: ShieldCheck,
  },
  {
    title: 'Support channels',
    description: 'Use the contact page and newsletter tools to keep your audience informed and supported.',
    icon: MessageCircle,
  },
]

export default function HelpPage() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="rounded-2xl border border-blue-100 bg-linear-to-r from-blue-600 to-indigo-600 p-8 text-white shadow-sm">
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-white/20 p-3">
              <LifeBuoy size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-semibold">Help Center</h1>
              <p className="mt-1 text-sm text-blue-100">Quick guidance to manage your pharmacy content and settings.</p>
            </div>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {helpCards.map((card) => {
            const Icon = card.icon
            return (
              <div key={card.title} className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                  <Icon size={20} />
                </div>
                <h2 className="text-lg font-semibold text-gray-900">{card.title}</h2>
                <p className="mt-2 text-sm text-gray-600">{card.description}</p>
              </div>
            )
          })}
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900">Need more support?</h2>
          <p className="mt-2 text-sm text-gray-600">Reach out through the contact page or review the published content workflow to keep everything aligned.</p>
          <button className="mt-4 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-700">
            Open support guide <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </AdminLayout>
  )
}
