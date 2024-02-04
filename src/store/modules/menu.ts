import { defineStore } from 'pinia'
import piniaPersistConfig from '@/config/piniaPersist'
import { MenuState } from '../interface'
import { RouteRecordRaw } from 'vue-router'
import { constantRoutes } from '@/router/constant'

export const MenuStore = defineStore('MenuState', {
  state: (): MenuState => ({
    isCollapse: false,
    menuList: []
  }),
  actions: {
    setCollapse() {
      this.isCollapse = !this.isCollapse
    },
    setMenuList(menuList: RouteRecordRaw[]) {
      this.menuList = constantRoutes.concat(menuList)
    }
  },
  persist: piniaPersistConfig('MenuState')
})
