// SubscribePage.jsx
import { useState } from 'react'
import { subscribe } from '../api'

export default function SubscribePage() {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const res = await subscribe(email)
      setMessage(res.message || 'Subscribed successfully!')
      setEmail('')
    } catch (err) {
      setMessage('Subscription failed. Try again.')
    }
  }

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Subscribe</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          placeholder="Enter your email"
          className="w-full border p-2 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <button
          type="submit"
          className="w-full bg-black text-white p-2 rounded"
        >
          Subscribe
        </button>
      </form>

      {message && (
        <p className="mt-4 text-center text-sm text-gray-600">
          {message}
        </p>
      )}
    </div>
  )
}