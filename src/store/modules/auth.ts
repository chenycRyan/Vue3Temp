import { defineStore } from 'pinia'
import piniaPersistConfig from '@/config/piniaPersist'
import { AuthState } from '../interface'

export const AuthStore = defineStore('AuthState', {
  state: (): AuthState => ({
    authButtons: {},
    authRouter: []
  }),
  actions: {
    async setAuthButtons(authButtonList: { [key: string]: any }) {
      this.authButtons = authButtonList
    },
    async setAuthRouter(dynamicRouter: string[]) {
      this.authRouter = dynamicRouter
    }
  },
  persist: piniaPersistConfig('AuthState')
})
