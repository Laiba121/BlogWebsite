import { useState, useEffect } from 'react'
import { getArticles } from '../api'

export function useArticles(params = {}) {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let isMounted = true

    setLoading(true)

    getArticles(params)
      .then(data => {
        if (isMounted) setArticles(data)
      })
      .catch(err => {
        if (isMounted) setError(err)
      })
      .finally(() => {
        if (isMounted) setLoading(false)
      })

    return () => {
      isMounted = false
    }
  }, [params])

  return { articles, loading, error }
}