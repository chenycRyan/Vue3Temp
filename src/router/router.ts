import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import { constantRoutes } from './constant'
const Layout = () => import('@/layout/index.vue')
const Frame = () => import('@/components/FrameBlank/index.vue')
// 编码标识任务路由
export const asyncRoutes: RouteRecordRaw[] = [
  {
    path: '/mes',
    name: 'mes',
    component: Layout,
    meta: {
      title: '任务5',
      type: 'MES'
    },
    children: [
      {
        path: 'home',
        name: 'home',
        component: () => import('@/views/tasks/index.vue'),
        meta: {
          title: '任务5.4'
        }
      }
    ]
  }
]

export const routes: RouteRecordRaw[] = [...constantRoutes]

console.log('routesroutesroutes', routes)
const router = createRouter({
  history: createWebHashHistory(),
  routes,
  strict: false,
  // 切换页面，滚到最顶部
  scrollBehavior: () => ({ left: 0, top: 0 })
})

export default router
