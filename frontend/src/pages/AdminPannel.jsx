import { useState } from "react"
import axios from "axios"

export default function AdminPage() {
  const [form, setForm] = useState({})
  const [image, setImage] = useState(null)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const submit = async (e) => {
    e.preventDefault()

    const data = new FormData()
    Object.keys(form).forEach(k => data.append(k, form[k]))
    data.append("image", image)

    await axios.post("http://localhost:5000/api/admin/articles", data)

    alert("Article Created!")
  }

  return (
    <div className="p-6 max-w-xl mx-auto">

      <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>

      <form onSubmit={submit} className="space-y-3">

        <input name="title" placeholder="Title" onChange={handleChange} className="border p-2 w-full"/>

        <input name="slug" placeholder="Slug" onChange={handleChange} className="border p-2 w-full"/>

        <input name="category" placeholder="Category" onChange={handleChange} className="border p-2 w-full"/>

        <textarea name="description" placeholder="Description" onChange={handleChange} className="border p-2 w-full"/>

        <textarea name="content" placeholder="Content" onChange={handleChange} className="border p-2 w-full"/>

        <input type="file" onChange={(e) => setImage(e.target.files[0])} />

        <button className="bg-blue-600 text-white px-4 py-2">
          Create Article
        </button>

      </form>
    </div>
  )
}