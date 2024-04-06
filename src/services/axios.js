import axios from 'axios'
const token = ''

const http = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    Authorization: `Bearer ${token}`
  }
})

export default http
