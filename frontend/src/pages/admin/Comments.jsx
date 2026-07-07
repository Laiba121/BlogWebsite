import { useEffect, useState } from 'react'

import AdminLayout from '../../components/admin/AdminLayout'
import { deleteComment, getComments } from '../../api'

const getUserFromStorage = () => {
  try {
    const u = localStorage.getItem('pharmacontext_user')
    return u ? JSON.parse(u) : null
  } catch {
    return null
  }
}

export default function Comments() {
  const token = localStorage.getItem('pharmacontext_token') || ''
  const user = getUserFromStorage()

  const [medicineId, setMedicineId] = useState('')
  const [comments, setComments] = useState([])
  const [loading, setLoading] = useState(false)
  const [statusMessage, setStatusMessage] = useState('')

  useEffect(() => {
    if (!medicineId) {
      setComments([])
      return
    }

    let mounted = true
    setLoading(true)
    getComments(medicineId)
      .then((data) => {
        if (!mounted) return
        setComments(Array.isArray(data) ? data : [])
      })
      .catch(() => {
        if (!mounted) return
        setComments([])
      })
      .finally(() => {
        if (!mounted) return
        setLoading(false)
      })

    return () => {
      mounted = false
    }
  }, [medicineId])

  const handleDelete = async (id) => {
    setStatusMessage('')
    if (!token) {
      setStatusMessage('Not authenticated.')
      return
    }
    if (user?.role !== 'admin') {
      setStatusMessage('Admin access required.')
      return
    }

    try {
      const res = await deleteComment(id, token)
      setStatusMessage(res?.message || 'Comment deleted successfully.')

      const refreshed = await getComments(medicineId)
      setComments(Array.isArray(refreshed) ? refreshed : [])
    } catch (err) {
      setStatusMessage(err?.response?.data?.message || 'Unable to delete comment.')
    }
  }

  return (
    <AdminLayout>
      <div>
        <h1 className="text-4xl font-bold text-gray-900">Comments</h1>
        <p className="text-gray-600 mt-2">Manage user comments by medicine</p>

        <div className="mt-8 bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
            <label className="text-sm font-medium text-gray-700 sm:w-48">
              Medicine ID
            </label>
            <input
              className="border rounded p-2 w-full"
              value={medicineId}
              onChange={(e) => setMedicineId(e.target.value)}
              placeholder="Enter medicineId (setId)"
            />
          </div>

          {statusMessage ? (
            <div className="mt-4 text-sm text-gray-700">{statusMessage}</div>
          ) : null}

          <div className="mt-6">
            {loading ? (
              <div className="text-gray-600">Loading comments...</div>
            ) : comments.length === 0 ? (
              <div className="text-gray-600">No comments found.</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead>
                    <tr className="bg-gray-50 text-left">
                      <th className="p-3">Name</th>
                      <th className="p-3">Message</th>
                      <th className="p-3">Created</th>
                      <th className="p-3">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {comments.map((c) => (
                      <tr key={c._id} className="border-t">
                        <td className="p-3 font-medium">{c.name}</td>
                        <td className="p-3 whitespace-pre-wrap max-w-xl">
                          {c.message}
                        </td>
                        <td className="p-3 text-gray-600">
                          {c.createdAt ? new Date(c.createdAt).toLocaleString() : '—'}
                        </td>
                        <td className="p-3">
                          <button
                            type="button"
                            onClick={() => handleDelete(c._id)}
                            className="bg-red-600 text-white px-3 py-1 rounded"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}

