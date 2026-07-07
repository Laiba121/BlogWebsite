import { useEffect, useMemo, useState } from 'react'

import { getComments, postComment } from '../api'

const getUserFromStorage = () => {
  try {
    const u = localStorage.getItem('pharmacontext_user')
    return u ? JSON.parse(u) : null
  } catch {
    return null
  }
}

const CommunityDiscussion = ({ medicine }) => {
  const medicineId = medicine?.setId || ''
  const medicineName = medicine?.title || medicine?.genericName || ''

  const [comments, setComments] = useState([])
  const [loading, setLoading] = useState(false)

  const user = useMemo(() => getUserFromStorage(), [])
  const token = useMemo(() => localStorage.getItem('pharmacontext_token') || '', [])

  const [name, setName] = useState(user?.name || '')
  const [message, setMessage] = useState('')
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

  const handlePost = async () => {
    setStatusMessage('')

    if (!medicineId) {
      setStatusMessage('Medicine not found.')
      return
    }
    if (!token) {
      setStatusMessage('Please sign in to post a comment.')
      return
    }

    const trimmedName = String(name || '').trim()
    const trimmedMessage = String(message || '').trim()

    if (!trimmedName || !trimmedMessage) {
      setStatusMessage('Name and comment message are required.')
      return
    }

    try {
      const payload = { name: trimmedName, message: trimmedMessage, medicineName }
      const res = await postComment(medicineId, payload, token)
      setStatusMessage(res?.message || 'Comment posted successfully.')
      setMessage('')

      const refreshed = await getComments(medicineId)
      setComments(Array.isArray(refreshed) ? refreshed : [])
    } catch (err) {
      setStatusMessage(err?.response?.data?.message || 'Unable to post comment.')
    }
  }

  return (
    <div className="bg-white border rounded-lg p-5 mt-5">
      <h2 className="font-semibold text-lg mb-5">Community Discussions</h2>

      <div className="space-y-4">
        {loading ? (
          <div className="text-gray-600">Loading comments...</div>
        ) : comments.length === 0 ? (
          <div className="text-gray-600">No comments yet. Be the first to comment.</div>
        ) : (
          comments.map((c) => (
            <div key={c._id || `${c.name}-${c.createdAt}`} className="border-b pb-4">
              <h4 className="font-semibold">{c.name}</h4>
              <p className="text-gray-600 whitespace-pre-wrap">{c.message}</p>
            </div>
          ))
        )}
      </div>

      <div className="mt-6">
        <h3 className="font-semibold mb-3">Post a comment</h3>

        <div className="space-y-3">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border w-full rounded p-3"
            placeholder="Your name"
          />

          <textarea
            className="border w-full rounded p-3"
            rows="3"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Write a comment..."
          />

          {statusMessage ? (
            <div
              className={`text-sm ${
                statusMessage.toLowerCase().includes('success') ||
                statusMessage.toLowerCase().includes('posted')
                  ? 'text-green-700'
                  : 'text-red-600'
              }`}
            >
              {statusMessage}
            </div>
          ) : null}

          <button
            type="button"
            onClick={handlePost}
            className="mt-1 bg-blue-700 text-white px-4 py-2 rounded"
          >
            Post Comment
          </button>
        </div>
      </div>
    </div>
  )
}

export default CommunityDiscussion

