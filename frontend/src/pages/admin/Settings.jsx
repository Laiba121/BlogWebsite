import { useState } from 'react'
import {
  AtSign,
  CloudUpload,
  FileImage,
  Globe,
  Headphones,
  Search,
  Settings as SettingsIcon,
  Share2,
  TrendingUp,
} from 'lucide-react'
import AdminLayout from '../../components/admin/AdminLayout'

const tabs = [
  { id: 'general', label: 'General Settings', icon: SettingsIcon },
  { id: 'contact', label: 'Contact & Support', icon: Headphones },
  { id: 'social', label: 'Social Links', icon: Share2 },
  { id: 'seo', label: 'SEO Configuration', icon: TrendingUp },
  { id: 'smtp', label: 'SMTP / Email', icon: AtSign },
]

const initialValues = {
  siteName: 'PharmaContext Medical Information',
  tagline: 'Authoritative Pharmaceutical Database for Professionals',
  supportEmail: 'support@pharmacontext.com',
  supportPhone: '+1 (555) 019-2400',
  facebook: 'https://facebook.com/pharmacontext',
  linkedin: 'https://linkedin.com/company/pharmacontext',
  metaTitle: 'PharmaContext Medical Information',
  metaDescription: 'Trusted pharmaceutical information for professionals.',
  smtpHost: 'smtp.pharmacontext.com',
  smtpEmail: 'notifications@pharmacontext.com',
}

export default function Settings() {
  const [activeTab, setActiveTab] = useState('general')
  const [values, setValues] = useState(initialValues)
  const [savedAt, setSavedAt] = useState('2 mins ago')

  function updateField(event) {
    const { name, value } = event.target
    setValues((current) => ({ ...current, [name]: value }))
  }

  function handleDiscard() {
    setValues(initialValues)
    setActiveTab('general')
    setSavedAt('changes discarded')
  }

  function handleSave(event) {
    event.preventDefault()
    setSavedAt('just now')
  }

  return (
    <AdminLayout>
      <form onSubmit={handleSave} className="min-h-[calc(100vh-8rem)]">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-[#00498f]">Settings</h1>
            <p className="mt-1 text-sm text-slate-500">Configure website settings step by step.</p>
          </div>

          <div className="relative w-full max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input
              className="h-10 w-full rounded border border-slate-200 bg-white pl-10 pr-3 text-xs outline-none focus:border-[#0061b7]"
              placeholder="Search settings..."
            />
          </div>
        </div>

        <section className="overflow-hidden rounded border border-[#0096ff] bg-[#f7f8fb] shadow-sm">
          <div className="border-b border-[#cfd6df] px-5">
            <div className="flex gap-7 overflow-x-auto">
              {tabs.map((tab) => {
                const Icon = tab.icon
                const active = activeTab === tab.id

                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex h-[60px] shrink-0 items-center gap-2 border-b-2 text-xs font-semibold ${
                      active
                        ? 'border-[#0061b7] text-[#00498f]'
                        : 'border-transparent text-slate-600 hover:text-[#00498f]'
                    }`}
                  >
                    <Icon size={13} />
                    {tab.label}
                  </button>
                )
              })}
            </div>
          </div>

          <div className="grid gap-8 px-5 py-6 lg:grid-cols-[260px_1fr]">
            <StepIntro activeTab={activeTab} />
            <div className="rounded-md border border-[#c8d1dd] bg-white p-6">
              {activeTab === 'general' && <GeneralSettings values={values} onChange={updateField} />}
              {activeTab === 'contact' && <ContactSettings values={values} onChange={updateField} />}
              {activeTab === 'social' && <SocialSettings values={values} onChange={updateField} />}
              {activeTab === 'seo' && <SeoSettings values={values} onChange={updateField} />}
              {activeTab === 'smtp' && <SmtpSettings values={values} onChange={updateField} />}
            </div>
          </div>

          <div className="mx-5 mb-6 mt-1 flex flex-wrap items-center justify-between gap-4 rounded bg-[#e0e1e4] px-5 py-4 shadow-[0_12px_28px_rgba(15,23,42,0.16)]">
            <div className="flex items-center gap-2 text-[11px] font-medium text-[#253245]">
              <span className="h-2 w-2 rounded-full bg-[#0d9488]" />
              Last saved: {savedAt}
            </div>

            <div className="flex items-center gap-4">
              <button type="button" onClick={handleDiscard} className="text-xs font-bold text-[#00498f]">
                Discard Changes
              </button>
              <button type="submit" className="h-10 rounded bg-[#00498f] px-8 text-xs font-bold text-white">
                Save Changes
              </button>
            </div>
          </div>

          <footer className="mt-40 flex flex-wrap items-center justify-between gap-3 border-t border-[#d7dce3] bg-[#e7e9ed] px-5 py-4 text-[11px] text-slate-600">
            <p>© 2024 PharmaContext Medical Information. All rights reserved.</p>
            <div className="flex flex-wrap items-center gap-5">
              <a href="#" className="hover:text-[#00498f]">Privacy Policy</a>
              <a href="#" className="hover:text-[#00498f]">Terms of Service</a>
              <a href="#" className="hover:text-[#00498f]">Medical Disclaimer</a>
            </div>
          </footer>
        </section>
      </form>
    </AdminLayout>
  )
}

function StepIntro({ activeTab }) {
  const content = {
    general: ['Identity & Branding', 'Configure the core identity of the PharmaContext medical directory.'],
    contact: ['Contact & Support', 'Manage public contact details and support channels.'],
    social: ['Social Links', 'Connect official social profiles for the website.'],
    seo: ['SEO Configuration', 'Control search metadata and discovery settings.'],
    smtp: ['SMTP / Email', 'Configure outgoing email sender details.'],
  }[activeTab]

  return (
    <div>
      <h2 className="text-lg font-bold leading-tight text-[#00498f]">{content[0]}</h2>
      <p className="mt-3 max-w-[250px] text-xs leading-5 text-slate-600">{content[1]}</p>
    </div>
  )
}

function GeneralSettings({ values, onChange }) {
  return (
    <>
      <TextInput label="Site Name" name="siteName" value={values.siteName} onChange={onChange} />
      <TextInput label="Tagline" name="tagline" value={values.tagline} onChange={onChange} />
      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        <UploadField title="Primary Logo" description="SVG, PNG or WebP up to 5MB" icon={<CloudUpload size={23} />} />
        <UploadField title="Favicon" description="ICO or PNG (32x32px)" icon={<FileImage size={20} />} />
      </div>
    </>
  )
}

function ContactSettings({ values, onChange }) {
  return (
    <>
      <TextInput label="Support Email" name="supportEmail" value={values.supportEmail} onChange={onChange} />
      <TextInput label="Support Phone" name="supportPhone" value={values.supportPhone} onChange={onChange} />
    </>
  )
}

function SocialSettings({ values, onChange }) {
  return (
    <>
      <TextInput label="Facebook URL" name="facebook" value={values.facebook} onChange={onChange} />
      <TextInput label="LinkedIn URL" name="linkedin" value={values.linkedin} onChange={onChange} />
    </>
  )
}

function SeoSettings({ values, onChange }) {
  return (
    <>
      <TextInput label="Meta Title" name="metaTitle" value={values.metaTitle} onChange={onChange} />
      <TextInput label="Meta Description" name="metaDescription" value={values.metaDescription} onChange={onChange} />
    </>
  )
}

function SmtpSettings({ values, onChange }) {
  return (
    <>
      <TextInput label="SMTP Host" name="smtpHost" value={values.smtpHost} onChange={onChange} icon={<Globe size={15} />} />
      <TextInput label="Sender Email" name="smtpEmail" value={values.smtpEmail} onChange={onChange} />
    </>
  )
}

function TextInput({ label, name, value, onChange, icon }) {
  return (
    <label className="mb-5 block text-xs font-medium text-[#273449]">
      {label}
      <div className="relative mt-2">
        {icon && <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">{icon}</span>}
        <input
          name={name}
          value={value}
          onChange={onChange}
          className={`h-12 w-full rounded border border-[#c8d1dd] bg-[#f1f3f6] px-3 text-xs text-[#273449] outline-none focus:border-[#0061b7] ${
            icon ? 'pl-9' : ''
          }`}
        />
      </div>
    </label>
  )
}

function UploadField({ title, description, icon }) {
  return (
    <div>
      <p className="mb-2 text-xs font-medium text-[#273449]">{title}</p>
      <button
        type="button"
        className="flex h-[58px] w-full items-center justify-center gap-3 rounded border border-dashed border-[#9cacbd] bg-white text-[#0061b7]"
      >
        {icon}
        <span className="text-[10px] font-semibold text-slate-500">{description}</span>
      </button>
    </div>
  )
}
