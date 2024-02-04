export function uuid(hasHyphen?: boolean) {
  return (hasHyphen ? 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx' : 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx').replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0
    const v = c == 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

export function observerDomResize(dom: HTMLElement, callback: any) {
  const ResizeObserver = window.ResizeObserver
  const observer = new ResizeObserver(() => {
    callback()
  })

  observer.observe(dom)

  return observer
}

export function isBlank(value: any) {
  return value === null || value === ''
}

export function filterParam(param: object) {
  if (param) {
    const obj = {}
    Object.keys(param).forEach(item => {
      if ((Array.isArray(param[item]) && param[item].length) || !isBlank(param[item])) {
        obj[item] = param[item]
      }
    })
    return obj
  }
}

/**
 * octet-stream文件下载
 * 用于后台返回octet-stream时转换成文件自动下载
 * @param {*} content 文件流内容
 * @param {String} fileName 文件名称
 */
export function downloadFromStream(content: any, fileName: any) {
  const blob = new Blob([content])
  if ('msSaveOrOpenBlob' in navigator) {
    console.log('use msSaveOrOpenBlob download...')
    //@ts-ignore
    window.navigator.msSaveOrOpenBlob(blob, fileName)
    return
  }
  const eLink = document.createElement('a')
  eLink.download = fileName
  eLink.style.display = 'none'
  eLink.href = URL.createObjectURL(blob)
  document.body.appendChild(eLink)
  eLink.click()
  URL.revokeObjectURL(eLink.href) // 释放URL对象
  document.body.removeChild(eLink)
}
/**
 * @description 判断是否为IP
 * @param ip
 * @returns {boolean}
 */
export function isIP(ip: string): boolean {
  const reg =
    /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/
  return reg.test(ip)
}
/**
 * @description 判断是否是端口号
 * @param str
 * @returns {boolean}
 */
export function isPort(str: string): boolean {
  const reg = /^([0-9]|[1-9]\d|[1-9]\d{2}|[1-9]\d{3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/
  return reg.test(str)
}
