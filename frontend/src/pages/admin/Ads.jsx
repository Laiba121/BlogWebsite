import { useEffect, useState } from 'react'
import axios from 'axios'
import AdminLayout from '../../components/admin/AdminLayout'
import { useAdSettings } from '../../context/AdSettingsContext'

export default function Ads() {
  const { settings, setSettings } = useAdSettings()
  const [form, setForm] = useState(settings)
  const [message, setMessage] = useState('')

  useEffect(() => {
    setForm(settings)
  }, [settings])

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target
    setForm((current) => ({
      ...current,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const handleSave = async (event) => {
    event.preventDefault()
    try {
      const response = await axios.put('http://localhost:5000/api/ads', form)
      if (response.data?.settings) {
        setSettings(response.data.settings)
      }
      setMessage('Ad settings saved successfully.')
    } catch (error) {
      console.error(error)
      setMessage('Unable to save ad settings.')
    }
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-4xl font-bold text-gray-900">Ads</h1>
          <p className="text-gray-600 mt-2">Connect Google AdSense and place ads across the site.</p>
        </div>

        {message ? (
          <div className="rounded-lg border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-blue-700">
            {message}
          </div>
        ) : null}

        <form onSubmit={handleSave} className="space-y-5 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="grid gap-4 md:grid-cols-2">
            <label className="text-sm font-medium text-gray-700">
              Publisher ID
              <input
                name="publisherId"
                value={form.publisherId || ''}
                onChange={handleChange}
                placeholder="ca-pub-xxxxxxxxxxxxxxxx"
                className="mt-2 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </label>
            <label className="text-sm font-medium text-gray-700">
              Ad Slot ID
              <input
                name="slotId"
                value={form.slotId || ''}
                onChange={handleChange}
                placeholder="1234567890"
                className="mt-2 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </label>
          </div>

          <label className="flex items-center gap-3 text-sm font-medium text-gray-700">
            <input
              type="checkbox"
              name="enabled"
              checked={Boolean(form.enabled)}
              onChange={handleChange}
              className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            Enable AdSense ads on the site
          </label>

          <label className="text-sm font-medium text-gray-700">
            Placement
            <select
              name="placement"
              value={form.placement || 'sidebar'}
              onChange={handleChange}
              className="mt-2 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="sidebar">Sidebar</option>
              <option value="homepage">Homepage</option>
              <option value="content">Content Area</option>
            </select>
          </label>

          <div className="rounded-xl border border-dashed border-gray-300 bg-gray-50 p-4 text-sm text-gray-600">
            <p className="font-semibold text-gray-800">How to use it</p>
            <p className="mt-2">
              Add your Google AdSense publisher ID and ad slot ID here. The site will render the ad block automatically on the chosen placement.
            </p>
          </div>

          <button type="submit" className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700">
            Save Ad Settings
          </button>
        </form>
      </div>
    </AdminLayout>
  )
}
