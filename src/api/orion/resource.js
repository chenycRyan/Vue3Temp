import http from '@/utils/http'

export function getResourcePage(params) {
  return http.get(`/contract/page`, params)
}

// #region 资源信息查询

/**
 * 根据id查询资源信息
 * @param {*} id 资源id
 */
export function getById(id) {
  return http.get(`/resources/${id}`)
}

/**
 * 根据资源名按页查询资源信息
 * @param {*} page 当前页面索引
 * @param {*} size 页面大小
 * @param {*} url 资源名
 */
export function listByPageWithParams(params) {
  return http.get(`/resources/page`, params)
}

/**
 * 根据id添加资源信息
 * @param {*} data 添加
 */
export function addOne(data) {
  return http.post(`/resources`, data)
}

/**
 * 根据资源id更新资源数据
 * @param {*} id 资源id
 * @param {*} data 更新数据
 */
export function updateById(id, data) {
  return http.put(`/resources/${id}`, data)
}

/**
 * 根据资源id删除资源信息
 * @param {*} id 资源id
 */
export function deleteById(id) {
  return http.delete(`/resources/${id}`)
}

// #endregion
