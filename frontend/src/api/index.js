import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000',
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

export const signIn = (credentials) =>
  api.post('/api/auth/signin', credentials).then(r => r.data)

export const signUp = (payload) =>
  api.post('/api/auth/signup', payload).then(r => r.data)

export const getAdminProfile = (token) =>
  api.get('/api/admin/profile', { headers: { Authorization: `Bearer ${token}` } }).then(r => r.data)

export const updateAdminProfile = (formData, token) =>
  api.put('/api/admin/profile', formData, { headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' } }).then(r => r.data)

export default api