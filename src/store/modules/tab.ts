import { defineStore } from 'pinia'
import piniaPersistConfig from '@/config/piniaPersist'
import { TabState, MenuOptions } from '../interface'
import router from '@/router'

export const TabStore = defineStore('TabState', {
  state: (): TabState => ({
    curTab: '',
    tabList: []
  }),
  actions: {
    setTab(tabPath: string) {
      this.curTab = tabPath
    },
    setTabList(tabList: MenuOptions[]) {
      this.tabList = tabList
    },
    async addTab(tabItem: MenuOptions) {
      if (this.tabList.every(item => item.path !== tabItem.path)) {
        const tabInfo: MenuOptions = {
          title: tabItem.title,
          path: tabItem.path,
          close: tabItem.close
        }
        this.tabList.push(tabInfo)
      }
      this.setTab(tabItem.path)
    },
    async removeTab(tabPath: string) {
      let tab = this.curTab
      const tabList = this.tabList
      let nextTab: any = null
      if (tab == tabPath) {
        tabList.forEach((item, index) => {
          if (item.path !== tabPath) return
          nextTab = tabList[index + 1] || tabList[index - 1]
        })
      }

      this.tabList = tabList.filter(item => item.path !== tabPath)

      if (nextTab) {
        this.curTab = nextTab.path
        router.push(nextTab.path)
      }
    },
    async closeMultipleTab(tabPaths: string[]) {
      this.tabList = this.tabList.filter(item => !tabPaths.includes(item.path))
    }
  },
  persist: piniaPersistConfig('TabState')
})
