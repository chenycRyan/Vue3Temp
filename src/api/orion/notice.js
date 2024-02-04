import http from '@/utils/http'

/**
 *
 *
 * @param {*} params
 */
export function getPage(params) {
  const { page, size, ...form } = params
  const keys = Object.keys(form)
  const map = { page, size }
  keys.forEach(item => {
    if (form[item]) {
      map[item] = form[item]
    }
  })
  return http.get(`/notice/page`, map)
}
export function getUserPage(params) {
  const { page, size, ...form } = params
  const keys = Object.keys(form)
  const map = { page, size }
  keys.forEach(item => {
    if (form[item]) {
      map[item] = form[item]
    }
  })
  return http.get(`/notice/user/page`, map)
}
/**
 * 删除公告
 * @param {*} id
 */
export function deleteById(id) {
  return http.delete(`/notice/${id}`)
}
/**
 * 添加公告
 * @param {*} data
 */
export function getById(id) {
  return http.get(`/notice/${id}`)
}
/**
 * 添加公告
 * @param {*} data
 */
export function addItem(data) {
  return http.post(`/notice/publish`, data)
}
/**
 * 单个公告已读
 * @param {*} data
 */
export function readItem(id) {
  return http.put(`/notice/read/${id}`)
}
/**
 * 全部已读
 * @param {*} data
 */
export function batchRead() {
  return http.put(`/notice/read`)
}
