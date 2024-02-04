import http from '@/utils/http'

export function setAuth(key: string) {
  return http.post(`/aes?param=${key}`)
}
export function getSystemAuth() {
  return http.get(`/aes/get`)
}
export function getAuthKey(params: any) {
  return http.get(`/aes/get/key`, params)
}

export function setLicense(data: any) {
  return http.post(`/license/submit`, data)
}

export function getLicense() {
  return http.get(`/license/baseInfo`)
}
export function getLicenseCode(data) {
  return http.post(`/license/apply`, data)
}
export function getOffLineCode(data) {
  return http.post(`/license/create/applyCode`, data)
}
export function getConnectFlag() {
  return http.get(`/net/connect`)
}
