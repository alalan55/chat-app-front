import axios from 'axios'
import { useUserStore } from '@/stores/user'
// const token =

const http = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL
})

http.interceptors.request.use((config) => {
  const userStore = useUserStore()
  config.headers.Authorization = `Bearer ${userStore.$token}`
  config.headers.Accept = 'application/json'
  return config
})

export default http
