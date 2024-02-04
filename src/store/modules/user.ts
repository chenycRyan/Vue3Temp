import { defineStore } from 'pinia'
import piniaPersistConfig from '@/config/piniaPersist'
import { UserState } from '../interface'
import { getAuthInfo } from '@/api/orion'
export const UserStore = defineStore('UserState', {
  state: (): UserState => ({
    token: '',
    user_id: undefined,
    user_name: undefined,
    real_name: undefined,
    avatar: undefined,
    organization: undefined,
    location: undefined,
    email: undefined,
    roleList: [],
    isAdmin: false
  }),
  actions: {
    setUserName(name: string) {
      this.user_name = name
      if (name == 'admin') {
        this.isAdmin = true
      } else {
        this.isAdmin = false
      }
    },
    setToken(token: string) {
      this.token = token
      localStorage.setItem('USER_TOKEN', token)
    },
    // 设置用户的信息
    setInfo(partial: Partial<UserState>) {
      this.$patch(partial)
    },
    async userAuth() {
      const res: any = await getAuthInfo()
      const { userName, userId, realName } = res
      this.setInfo({ user_name: userName, user_id: userId, real_name: realName })
    },
    // 重置用户信息
    resetInfo() {
      this.$reset()
    }
  },
  persist: piniaPersistConfig('UserState')
})
