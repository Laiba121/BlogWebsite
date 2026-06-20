import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AdminLayout from '../../components/admin/AdminLayout'
import api, { getAdminProfile, updateAdminProfile } from '../../api'

export default function Profile() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', bio: '' })
  const [avatarFile, setAvatarFile] = useState(null)
  const [preview, setPreview] = useState(null)

  useEffect(() => {
    const token = localStorage.getItem('careerpulse_token')
    if (!token) return navigate('/signin')

    getAdminProfile(token)
      .then(user => {
        setForm({ name: user.name || '', email: user.email || '', bio: user.bio || '' })
        setPreview(user.avatar || null)
      })
      .catch(() => {
        // on error, redirect to signin
        localStorage.removeItem('careerpulse_token')
        localStorage.removeItem('careerpulse_user')
        navigate('/signin')
      })
      .finally(() => setLoading(false))
  }, [])

  function handleFile(e) {
    const f = e.target.files?.[0]
    if (!f) return
    setAvatarFile(f)
    const url = URL.createObjectURL(f)
    setPreview(url)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setSaving(true)
    try {
      const token = localStorage.getItem('careerpulse_token')
      const fd = new FormData()
      fd.append('name', form.name)
      fd.append('email', form.email)
      fd.append('bio', form.bio)
      if (form.password) fd.append('password', form.password)
      if (avatarFile) fd.append('avatar', avatarFile)

      const updated = await updateAdminProfile(fd, token)
      // persist and navigate
      localStorage.setItem('careerpulse_user', JSON.stringify(updated))
      navigate('/admin')
    } catch (err) {
      console.error(err)
      alert('Unable to update profile')
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <AdminLayout><div className="p-6">Loading...</div></AdminLayout>

  return (
    <AdminLayout>
      <div className="p-6 max-w-3xl mx-auto">
        <h2 className="text-2xl font-semibold mb-2">Profile Settings</h2>
        <p className="text-sm text-gray-500 mb-6">Update your profile details and avatar.</p>

        <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-xl overflow-hidden bg-gray-100 flex items-center justify-center">
              {preview ? (
                <img src={preview} alt="avatar" className="w-full h-full object-cover" />
              ) : (
                <div className="text-gray-400">No Image</div>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Profile Image</label>
              <input type="file" accept="image/*" onChange={handleFile} className="mt-2 text-sm" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="mt-1 block w-full rounded-md border-gray-200" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} className="mt-1 block w-full rounded-md border-gray-200" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Bio</label>
            <textarea value={form.bio} onChange={e => setForm({ ...form, bio: e.target.value })} className="mt-1 block w-full rounded-md border-gray-200" rows={4} />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">New Password (leave blank to keep)</label>
            <input type="password" value={form.password || ''} onChange={e => setForm({ ...form, password: e.target.value })} className="mt-1 block w-full rounded-md border-gray-200" />
          </div>

          <div className="flex items-center gap-3">
            <button type="submit" disabled={saving} className="px-4 py-2 bg-blue-600 text-white rounded-lg">
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
            <button type="button" onClick={() => navigate('/admin')} className="px-3 py-2 border rounded-lg">Cancel</button>
          </div>
        </form>
      </div>
    </AdminLayout>
  )
}
