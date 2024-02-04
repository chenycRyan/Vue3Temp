import { UserStore, RouteStore } from '@/store'
import router, { asyncRoutes } from './router'
import NProgress from '@/config/nprogress'
import { registerRoutes } from '@/utils/generateRoutes'

const whiteList = ['/login', '/401']
let routerFlag = false

router.beforeEach(async (to, from, next) => {
  NProgress.start()

  const userStore = UserStore()
  const routeStore = RouteStore()
  // 0. 如果没有token，尝试从云平台的缓存获取token
  const USER_TOKEN = localStorage.getItem('USER_TOKEN')
  if (USER_TOKEN) {
    userStore.setToken(USER_TOKEN)
  }
  const token = userStore.token
  // 1.如果是访问白名单页，直接放行,否则校验授权权限
  if (whiteList.includes(to.path)) {
    return next()
  }
  // 2.判断是否有 Token，没有重定向到 login，并携带当前退出页地址和参数
  if (!token) {
    routerFlag = false
    return next({ name: 'login', query: { redirect: to.fullPath } })
  }

  try {
    if (!routerFlag || !routeStore.addRoutes.length) {
      // 3.判断有token,就请求获取用户信息
      await userStore.userAuth()
      // 4.判断有添加过动态路由则直接进入页面，没有添加动态路由
      let accessRoutes = await routeStore.generateRoutes(asyncRoutes)
      await registerRoutes(router, accessRoutes)
      routerFlag = true
      return next({ ...to, replace: true })
    } else next()
  } catch (err) {
    console.log(err)
    return next({ name: 'login', query: { redirect: to.fullPath } })
  }
})

router.afterEach(() => {
  NProgress.done()
})

export default router
