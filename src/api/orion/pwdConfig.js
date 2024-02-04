// 密码配置
import http from '@/utils/http'
// 获取密码配置
export function getPwdConfig() {
  return http.get(`/pwd-config`)
}

/**
 * 新增一个密码配置（暂时不需要）
 * @param {*} data 密码配置
 */
export function addPwdConfig(data) {
  return http.post(`/pwd-config`, data)
}

/**
 * 修改密码配置
 * @param {*} id 配置ID
 * @param {Object} data 配置内容
 */
export function editPwdConfig(id, data) {
  return http.put(`/pwd-config/${id}`, data)
}

/**
 * 删除密码配置
 * @param {*} id 配置ID
 */
export function deletePwdConfig(id) {
  return http.delete(`/pwd-config/${id}`)
}
