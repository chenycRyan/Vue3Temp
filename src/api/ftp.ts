// Ftp接口

import http from '@/utils/http'

/**
 * 根据路径查询ftp路径下的文件
 *
 * @export getFtpFile
 * @param {*} data
 */
export function getFtpFile(data: any) {
  return http.post(`/taskfile/ftp/get-all-file`, data)
}

/**
 * 根据路径，文件名上传指定ftp路径下
 *
 * @export uploadFtpFile
 * @param {*} data
 */
export function uploadFtpFile(fileName: string, remotePath: string, data: any) {
  return http.post(`/taskfile/ftp/upload-ftp-file?fileName=${fileName}&remotePath=${remotePath}`, data, {
    headers: { 'Content-Type': 'multipart/form-data' }
  })
}
/**
 * 根据路径，文件名下载指定ftp路径下
 *
 * @export downloadFtpFile
 * @param {*} data
 */
// export function downloadFtpFile(data: any) {
//   return http.post(`/taskfile/ftp/download-ftp-file`, data, { responseType: 'blob' })
// }
export function downloadFtpFile(params: any) {
  return http.get(`/taskfile/ftp/download-ftp-file`, params, { responseType: 'blob' })
}
/**
 * 根据路径，文件名删除指定ftp路径下
 * @export deleteServerFiles
 */
export function deleteServerFiles(data: any) {
  return http.post(`/taskfile/ftp/deleteServerFiles`, data)
}
/**
 * 指定FTP路径新建文件夹
 * @export mkdir
 */
export function mkdir(data: any) {
  return http.post(`/taskfile/ftp/make-dictionary`, data)
}

/**
 * 重命名文件、移动文件
 * @export renameFile
 */
export function renameFile(newFilePath: string, originalFilePath: string) {
  return http.post(`/taskfile/ftp/rename?newFilePath=${newFilePath}&originalFilePath=${originalFilePath}`)
}

/**
 * 查询ftp账号信息
 * @export getFTPConfig
 */
export function getFTPConfig() {
  return http.get(`/ftp-info`)
}

/**
 * 修改Ftp配置信息
 * @export modifyFTPConfig
 */
export function modifyFTPConfig(data: any) {
  return http.put(`/ftp-info`, data)
}
// /**
//  * 添加Ftp配置信息
//  * @export addFTPConfig
//  */
// export function addFTPConfig(data: any) {
//   return http.post(`/ftp-info`, data, { baseURL: '/ftpApi' })
//   // return http.post(`/ftp-info`, data)
// }
/**
 * 删除Ftp配置信息
 * @export deleteFTPConfig
 */
export function deleteFTPConfig(id: number) {
  return http.delete(`/ftp-info/${id}`)
}
/**
 * 设置Ftp配置信息
 * @export setCurrentConfig
 */
export function setCurrentConfig(id: number) {
  return http.post(`/ftp-info/current/${id}`)
}
