import http from '@/utils/http'
// #region 权限信息查询

/**
 * 根据id查询权限信息
 * @param {*} id 权限id
 */
export function getById(id) {
  return http.get(`/permissions/${id}`)
}

/**
 * 根据权限名按页查询权限信息
 * @param {*} page 当前页面索引
 * @param {*} size 页面大小
 * @param {*} name 权限名称
 * @param {*} description 描述
 */
export function listByPageWithParams(page, size, name = '', description = '', tenantId) {
  const params = { page, size, tenantId }
  if (name !== '') params.name = name
  if (description !== '') params.description = description

  return http.get(`/permissions/page`, params)
}

/**
 * 根据权限名查询所有权限信息
 * @param {*} name 权限名称
 * @param {*} description 描述
 */
export function listWithParams(name = '', description = '') {
  const params = {}
  if (name === '') params.name = name
  if (description === '') params.description = description

  return http.get(`/permissions/list`, params)
}

/**
 * 根据id添加权限信息
 * @param {*} data 添加
 */
export function addOne(data) {
  return http.post(`/permissions`, data)
}

/**
 * 根据权限id更新权限数据
 * @param {*} id 权限id
 * @param {*} data 更新数据
 */
export function updateById(id, data) {
  return http.put(`/permissions/${id}`, data)
}

/**
 * 根据权限id删除权限信息
 * @param {*} id 权限id
 */
export function deleteById(id) {
  return http.delete(`/permissions/${id}`)
}

// #endregion
