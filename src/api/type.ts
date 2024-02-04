export namespace ISupplier {
  export interface IAddForm {
    city: 'string'
    latitude: 'string'
    longitude: 'string'
    remark: 'string'
    status: 'string'
    supplierCode: 'string'
    supplierName: 'string'
  }
}

export namespace ICommon {
  export interface IPage {
    content: any
    totalElements: number
    size: number
  }
  export interface IAPIFun {
    addItem: (data: any) => Promise<unknown>
    update: (data: any) => Promise<unknown>
    deleteItem: (id: number) => Promise<unknown>
    findById: (id: number) => Promise<unknown>
    findList: (params?: any) => Promise<unknown>
    findPage: (params: any) => Promise<IPage>
  }
}
