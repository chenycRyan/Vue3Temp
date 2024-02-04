import http from '@/utils/http'
import { ICommon } from './type'
import { filterParam } from '@/utils/index'
export const apiFun = (moduleUrl: string): ICommon.IAPIFun => {
  const url = moduleUrl
  const addItem = (data: any) => {
    return http.post(url, data)
  }

  const update = (data: any) => {
    return http.post(`${url}/update`, data)
  }

  const deleteItem = (id: number) => {
    return http.delete(`${url}/${id}`)
  }

  const findById = (id: number) => {
    return http.get(`${url}/${id}`)
  }

  const findList = (params?: any) => {
    params = filterParam(params)
    return http.get(`${url}/list`, params)
  }

  const findPage = (params: any) => {
    // params = filterParam(params)
    // params.sort = 'createdTime,DESC'
    return http.get<ICommon.IPage>(`${url}/page`, params)
  }
  return {
    addItem,
    update,
    deleteItem,
    findById,
    findList,
    findPage
  }
}
