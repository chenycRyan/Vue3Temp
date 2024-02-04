import { RouteRecordRaw } from 'vue-router'

export interface UserState {
  token: string
  user_id: number | undefined
  user_name: string | undefined
  real_name: string | undefined
  avatar?: string
  organization?: string
  location?: string
  email?: string
  roleList: string[]
  isAdmin: boolean
}

export interface MenuOptions {
  path: string
  title: string
  icon?: string
  isLink?: string
  close?: boolean
  children?: MenuOptions[]
}

export interface MenuState {
  isCollapse: boolean
  menuList: RouteRecordRaw[]
}

export interface RouteState {
  routes: RouteRecordRaw[]
  addRoutes: RouteRecordRaw[]
}

export interface ThemeConfig {
  layout: string
  primary: string
  isDark: boolean
  isBlue: boolean
  isPrint: boolean
  breadcrumb: boolean
  tabs: boolean
  footer: boolean
  isGrey: boolean
  isWeak: boolean
}

export interface AppState {
  theme: ThemeConfig
  assemblySize: string
  language: string
  isCollapse: boolean
  isMobile: boolean
  appType: string
  appName: string
}

export interface AuthState {
  authButtons: {
    [key: string]: any
  }
  authRouter: string[]
}
export interface TabState {
  curTab: string
  tabList: MenuOptions[]
}

export interface StatusState {
  startTime: any
  endTime: any
  start: boolean
  end: boolean
  order: { id: number } | null
  company: any
}
