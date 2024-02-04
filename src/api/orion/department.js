import http from '@/utils/http'
/**
 * 添加部门
 * @param {*} data 参数
 */
export function addDepartment(data) {
  return http.post(`/departments`, data)
}

/**
 * 更新部门数据
 * @param {*} id 部门ID
 * @param {*} data 要更新的数据
 */
export function updateDepartment(id, data) {
  return http.put(`/departments/${id}`, data)
}

/**
 * 删除一个部门
 * @param {*} id 部门ID
 */
export function removeDepartment(id) {
  return http.delete(`/departments/${id}`)
}

/**
 * 根据父ID查询子部门列表
 * @param {*} pid 父ID
 */
export function getSubListByPid(pid) {
  return http.get(`/departments/${pid}/sub-department/list`)
}

/**
 * 根据父ID查询
 * @param {*} pid 父ID
 */
export function getSubPagedByPid(pid) {
  return http.get(`/departments/${pid}/sub-department/page`)
}

/**
 * 查询部门列表
 * @param {*} params 查询参数
 */
export function findList(params = {}) {
  return http.get(`/departments/list`, params)
}

/**
 * 分页查询部门数据
 * @param {*} params 查询参数
 */
export function findPage(params = {}) {
  return http.get(`/departments/page`, params)
}

/**
 * 获取顶级部门
 */
export function getTopDepartment(params) {
  return http.get(`/departments/top`, params)
}
