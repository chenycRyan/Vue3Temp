import http from '@/utils/http'

/**
 * 获取登录日志列表页面
 *
 * @param {*} params
 */
export function getLoginLogPageList(params) {
  const { page, size, ...form } = params
  const keys = Object.keys(form)
  const map = { page, size }
  keys.forEach(item => {
    if (form[item]) {
      map[item] = form[item]
    }
  })
  return http.get(`/loginlog/page`, map)
}

/**
 * 根据用户id删除用户信息
 * @param {*} id 用户id
 */
export function deleteLogById(id) {
  return http.delete(`/loginlog/${id}`)
}

/**
 * 导出日志
 * @param {*} id 用户id
 */
export function exportLog(params) {
  const { page, size, ...form } = params
  const keys = Object.keys(form)
  const map = { page, size }
  keys.forEach(item => {
    if (form[item]) {
      map[item] = form[item]
    }
  })

  return http.service({
    url: `/loginlog/export`,
    method: 'get',
    params: map,
    responseType: 'blob'
  })
}
