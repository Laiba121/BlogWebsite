import { useEffect, useState } from 'react'
import { getArticles, getCategories } from '../api'
import { Link } from 'react-router-dom'

export default function ArticlesPage() {
  const [articles, setArticles] = useState([])
  const [categories, setCategories] = useState([])
  const [selected, setSelected] = useState('')

  useEffect(() => {
    getCategories().then(setCategories)
  }, [])

  useEffect(() => {
    getArticles(selected ? { category: selected } : {})
      .then(setArticles)
  }, [selected])

  return (
    <div className="p-6 max-w-6xl mx-auto">

      <h1 className="text-3xl font-bold mb-6">Articles</h1>

      {/* Filters */}
      <div className="flex gap-3 mb-6 flex-wrap">
        <button
          onClick={() => setSelected('')}
          className="px-3 py-1 bg-gray-200 rounded"
        >
          All
        </button>

        {categories.map((cat) => (
          <button
            key={cat.slug}
            onClick={() => setSelected(cat.slug)}
            className="px-3 py-1 bg-blue-100 rounded"
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Articles */}
      <div className="grid md:grid-cols-3 gap-6">
        {articles.map((a) => (
          <Link
            key={a.slug}
            to={`/articles/${a.slug}`}
            className="bg-white p-4 shadow rounded hover:shadow-lg"
          >
            <h2 className="font-bold">{a.title}</h2>
            <p className="text-sm text-gray-500">{a.category}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}