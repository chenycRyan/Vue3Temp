import http from '@/utils/http'
/**
 * 登录
 * @export login
 * @param {*} data
 */
export const login = (data: any) => {
  return http.post(`/users/common/login`, data)
}
/**
 * 获取用户信息
 * @export getAuthInfo
 * @param {*}
 */
export function getAuthInfo(): Promise<{ resources: string[] }> {
  return http.get(`/users/common/auth-info`)
}
/**
 * 登录
 * @export register
 * @param {*} data
 */
export const register = (data: any) => {
  return http.post(`/users/common/new-register`, data)
}
/**
 * 重置密码
 * @export restPassword
 * @param {*}userId
 */
export function restPassword(userId: number) {
  return http.put(`/users/admin/${userId}/default-password`)
}
/**
 * 获取用户列表
 * @export getUserPage
 * @param {*}params
 */
export function getUserPage(params: any) {
  return http.get(`/users/admin/page`, params)
}
/**
 *获取服务信息
 * @export getServer
 * @param {*}
 */
export function getServer() {
  return http.get(`/server/monitor`)
}
/**
 *查询在线用户列表
 * @export getonlinePage
 * @param {*}
 */
export function getonlinePage(params: any) {
  return http.get(`/users/common/online/page`, params)
}
/**
 * 强退用户
 * @export forceLogout
 * @param {*}userId
 */
export function forceLogout(userId: number) {
  return http.put(`/users/common/online/logout/${userId}`)
}
/**
 * 修改用户信息
 * @export modifyUserInfo
 * @param {*}userId
 */
export function modifyUserInfo(userId: number, data: any) {
  return http.put(`/users/common/${userId}/base-info`, data)
}

// 获取服务信息
export function getCache() {
  return http.get(`/cache/monitor`)
}
/**
 * 根据用户id修改用户和角色的关系表
 * @param {*} id 用户id
 * @param {*} data 角色id列表和用户id
 */
export function updateUserRole(id: number, data: any) {
  return http.put(`/users/admin/${id}/roles`, data)
}
