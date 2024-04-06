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
      localStorage.setItem('user', JSON.stringify(payload))
      localStorage.setItem('token', payload.token)
    }
  },
  getters: {
    $current_user: (state) => state.user
  }
})

if (import.meta.hot) import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
