import { defineStore } from 'pinia'
import piniaPersistConfig from '@/config/piniaPersist'
import { RouteState } from '../interface'
import { RouteRecordRaw } from 'vue-router'
import { constantRoutes } from '@/router/constant'
import { filterRoutes } from '@/utils/generateRoutes'
import { UserStore } from './user'
export const RouteStore = defineStore('RouteState', {
  state: (): RouteState => ({
    addRoutes: [],
    routes: []
  }),
  actions: {
    setRoutes(routes: RouteRecordRaw[]) {
      this.addRoutes = routes
      this.routes = constantRoutes.concat(routes)
    },
    async generateRoutes(routes: RouteRecordRaw[]) {
      // 可传递权限
      let accessRoutes = filterRoutes(routes)
      const userStore = UserStore()
      const isAdmin = userStore.isAdmin
      //admin账号 边缘计算多一个教师端的任务2.1
      if (!isAdmin) {
        accessRoutes.forEach((m, i, arr) => {
          if (m.name === 'edge') {
            arr[i].children = m.children.filter(n => n.name !== 'task-two-one')
          }
        })
      }
      this.setRoutes(accessRoutes)
      return accessRoutes
    }
  },
  persist: piniaPersistConfig('RouteState')
})
