import { defineStore, acceptHMRUpdate } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null,
    token: null
  }),
  actions: {
    setCurrentUser(payload) {
      this.user = payload.content
      this.token = payload.token
      localStorage.setItem('user', JSON.stringify(payload.content))
      localStorage.setItem('token', payload.token)
    },
    resetUserInfos() {
      this.user = null
      this.token = null
      localStorage.removeItem('token')
      localStorage.removeItem('user')
    }
  },
  getters: {
    $current_user: (state) => state.user,
    $token: (state) => state.token
  }
})

if (import.meta.hot) import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
