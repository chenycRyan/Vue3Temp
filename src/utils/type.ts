export interface IFormPara {
  show: boolean
  title: string
  btnLoading: boolean
  width: string
  formLabelWidth?: string
  rowClass?: string
  initForm: any
  rules?: any
  cityCallback?: any
}

export interface IColumn {
  type?: string
  prop: string
  label: string
  width?: string
  twidth?: string
  disabled?: boolean
  options?: any
  slot?: any
  show?: any
  info?: boolean
  callback?: any
  tagShow?: boolean
  url?: string
  queryKey?: string
  placeholder?: string
}
export interface ITableParam {
  loading: boolean
  showAction?: boolean
  total?: number
  customBtn?: string[]
}
export interface IPage {
  page: number
  size: number
}

export interface IMenuOptions {
  path: string
  title: string
  icon?: string
  isLink?: string
  close?: boolean
  children?: IMenuOptions[]
}

export interface IAddress {
  id: number
  name: string
  wholename: string
  code: number
  label?: string
  value?: number
  parentId: number | null
  type: string
  parent?: object | null
  lnglat: number[]
  children?: IAddress[]
}
