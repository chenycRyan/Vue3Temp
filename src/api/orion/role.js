import http from '@/utils/http'
// #region 角色信息查询

/**
 * 根据id查询角色信息
 * @param {*} id 角色id
 */
export function getById(id) {
  return http.get(`/roles/${id}`)
}

/**
 * 根据角色名按页查询角色信息
 * @param {*} page 当前页面索引
 * @param {*} size 页面大小
 * @param {*} name 角色名
 * @param {*} description 描述
 */
export function listByPageWithParams(page, size, name = '', description = '', tenantId) {
  page = page - 1
  const params = { page, size, tenantId }
  if (name !== '') params.name = name
  if (description !== '') params.description = description

  return http.get(`/roles/page`, params)
}

/**
 * 根据id添加角色信息
 * @param {*} data 添加
 */
export function addOne(data) {
  return http.post(`/roles`, data)
}

/**
 * 根据角色id更新角色数据
 * @param {*} id 角色id
 * @param {*} data 更新数据
 */
export function updateById(id, data) {
  return http.put(`/roles/${id}`, data)
}

/**
 * 根据角色id删除角色信息
 * @param {*} id 角色id
 */
export function deleteById(id) {
  return http.delete(`/roles/${id}`)
}

// #endregion
