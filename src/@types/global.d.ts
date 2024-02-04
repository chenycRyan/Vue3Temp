declare namespace Types {
  type Query = {
    replace?: boolean
    [propName: string]: any
  }
  interface IFormPara {
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
  interface IColumn {
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
  }
  interface ITableParam {
    loading: boolean
    showAction?: boolean
    total?: number
  }
  interface IPage {
    page: number
    size: number
  }
}
