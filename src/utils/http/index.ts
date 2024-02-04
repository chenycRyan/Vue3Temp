import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'
import { showMessage } from './status'
import { ElMessage } from 'element-plus'
import { UserStore } from '@/store'
import router from '@/router'
// 批量同类型异常请求，只提示一次
let eleMsg: any
const newMessage = (op: any) => {
  if (eleMsg) {
    eleMsg.close()
  }
  eleMsg = ElMessage(op)
}
const typeList = ['error', 'success', 'info', 'warning']
typeList.forEach(type => {
  newMessage[type] = (op: any) => {
    if (typeof op === 'string') {
      op = {
        message: op
      }
    }
    op.type = type
    return newMessage(op)
  }
})

const config = {
  // @ts-ignore
  baseURL: window.appsettings.baseUrl_JAVA,
  // 设置超时时间（100s）
  timeout: 100000,
  // 跨域时候允许携带凭证
  withCredentials: true
}

class RequestHttp {
  service: AxiosInstance
  public constructor(config: AxiosRequestConfig) {
    // 实例化axios
    this.service = axios.create(config)

    /**
     * @description 请求拦截器
     * 客户端发送请求 -> [请求拦截器] -> 服务器
     * token校验(JWT) : 接受服务器返回的token,存储到vuex/本地储存当中
     */
    this.service.interceptors.request.use(
      // @ts-ignore
      (config: AxiosRequestConfig) => {
        const userStore = UserStore()
        const token = userStore.token
        if (token) {
          // @ts-ignore
          config.headers.Authorization = `Bearer ${token}`
        }
        return { ...config }
      },
      (error: AxiosError) => {
        return Promise.reject(error)
      }
    )

    /**
     * @description 响应拦截器
     *  服务器换返回信息 -> [拦截统一处理] -> 客户端JS获取到信息
     */
    this.service.interceptors.response.use(
      (response: AxiosResponse) => {
        const { data } = response
        return data
      },
      async (error: AxiosError) => {
        console.log('axios error', error)
        const { message, response, code, config } = error

        if (response && response.status == 415) {
          if (response.data.toString().includes('授权')) {
            localStorage.clear()
            const userStore = UserStore()
            userStore.resetInfo()
            newMessage({ message: '请先申请授权码, 通过审核后在此进行授权方可使用软件', type: 'error', duration: 6000 })
            router.push('/401')
            return
          }
        } else if (response && response.status == 401) {
          localStorage.clear()
          const userStore = UserStore()
          userStore.resetInfo()
          newMessage({ message: '用户状态已失效，请重新登录！', type: 'error' })
          router.push('/login')
          return
        } else {
          if (config.url.includes('mes-s7/query') || config.url.includes('mes-device-detail/list')) {
            return
          }
          if (response || message) {
            let msg = response
              ? response.data && typeof response.data == 'string'
                ? response.data
                : showMessage(response.status)
              : message
            if (msg.toString().length > 100 || !msg) msg = `服务器发生错误，错误代码：${code}`
            newMessage({ message: msg, type: 'error' })
          }
        }
        return Promise.reject(error)
      }
    )
  }

  // * 常用请求方法封装
  get<T>(url: string, params?: object, _object = {}): Promise<T> {
    return this.service.get(url, { params, ..._object })
  }
  post<T>(url: string, params?: object, _object = {}): Promise<T> {
    return this.service.post(url, params, _object)
  }
  put<T>(url: string, params?: object, _object = {}): Promise<T> {
    return this.service.put(url, params, _object)
  }
  delete<T>(url: string, params?: any, _object = {}): Promise<T> {
    return this.service.delete(url, { params, ..._object })
  }
  patch<T>(url: string, params?: any, _object = {}): Promise<T> {
    return this.service.patch(url, { params, ..._object })
  }
}

export default new RequestHttp(config)
