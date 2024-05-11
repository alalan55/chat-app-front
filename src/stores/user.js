import { defineStore, acceptHMRUpdate } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null,
    token: null,
    activeChat: null
  }),
  actions: {
    setActiveChat(payload) {
      this.activeChat = payload
    },
    resetActiveChat() {
      this.activeChat = null
    },
    setCurrentUserAndToken(payload) {
      this.user = payload.content
      this.token = payload.token
      localStorage.setItem('user', JSON.stringify(payload.content))
      localStorage.setItem('token', payload.token)
    },
    setCurrentUser(payload) {
      this.user = payload
      localStorage.removeItem('user')
      localStorage.setItem('user', JSON.stringify(payload))
    },
    resetUserInfos() {
      this.user = null
      this.token = null
      this.activeChat = null
      localStorage.removeItem('token')
      localStorage.removeItem('user')
    }
  },
  getters: {
    $current_user: (state) => state.user,
    $token: (state) => state.token,
    $activeChat: (state) => state.activeChat
  }
})

if (import.meta.hot) import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
