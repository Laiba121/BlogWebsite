import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
})

// ✅ Handle errors globally
api.interceptors.response.use(
  res => res,
  err => {
    console.error(err.response?.data || err.message)
    return Promise.reject(err)
  }
)

export const getArticles = (params) =>
  api.get('/api/articles', { params }).then(r => r.data)

export const getArticle = (slug) =>
  api.get(`/api/articles/${slug}`).then(r => r.data)

export const getCategories = () =>
  api.get('/api/categories').then(r => r.data)

export const subscribe = (email) =>
  api.post('/api/subscribe', { email }).then(r => r.data)

export default api