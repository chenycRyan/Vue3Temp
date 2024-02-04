import { defineStore } from 'pinia'
import piniaPersistConfig from '@/config/piniaPersist'
import { AppState, ThemeConfig } from '../interface/index'
import { DEFAULT_PRIMARY } from '@/config/config'

const appList = {
  MES: '实训平台',
  CODE: '编码标识平台',
  EDGE: '边缘网关计算平台',
  DATA: '数据采集'
}
export const AppStore = defineStore('AppState', {
  state: (): AppState => ({
    theme: {
      layout: 'columns',
      primary: DEFAULT_PRIMARY,
      isDark: false,
      isGrey: false,
      isBlue: true,
      isPrint: true,
      isWeak: false,
      breadcrumb: true,
      tabs: true,
      footer: true
    },
    isCollapse: false,
    language: 'zh',
    assemblySize: 'default',
    //用来标识
    isMobile: false,
    appType: 'MES', // MES / CODE
    appName: appList.CODE
  }),
  getters: {},
  actions: {
    setIsMobile(val: boolean) {
      this.isMobile = val
    },
    setCollapseVal(val: boolean) {
      this.isCollapse = val
    },
    setCollapse() {
      this.isCollapse = !this.isCollapse
    },
    setAssemblySize(assemblySize: string) {
      this.assemblySize = assemblySize
    },
    setLanguage(language: string) {
      this.language = language
    },
    // setThemeConfig
    setThemeConfig(themeConfig: ThemeConfig) {
      this.theme = themeConfig
    },
    setAppType(type: string) {
      this.appType = type
      this.appName = appList[type]
    },
    setAppName(name: string) {
      this.appName = name
    }
  },
  persist: piniaPersistConfig('AppState')
})
