import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getArticle } from '../api'

export default function ArticleDetailPage() {
  const { slug } = useParams()
  const [article, setArticle] = useState(null)

  useEffect(() => {
    getArticle(slug).then(setArticle)
  }, [slug])

  if (!article) return <p className="p-6">Loading...</p>

  return (
    <div className="p-6 max-w-3xl mx-auto">

      <h1 className="text-3xl font-bold mb-2">{article.title}</h1>

      <p className="text-sm text-gray-500 mb-4">
        {article.author} • {article.readTime}
      </p>

      <p className="text-gray-600 mb-6">
        {article.description}
      </p>

      <div className="whitespace-pre-line leading-7 text-gray-800">
        {article.content}
      </div>

    </div>
  )
}