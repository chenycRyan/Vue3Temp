import { RouteRecordRaw } from 'vue-router'
import { convertPath } from '@/utils/generateRoutes'
const Layout = () => import('@/layout/index.vue')
const Frame = () => import('@/components/FrameBlank/index.vue')
const conroutes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: { path: '/mes/home' },
    meta: {
      hidden: true
    }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index.vue'),
    meta: {
      title: '登录',
      hidden: true
    }
  },

  {
    path: '401',
    name: '401',
    component: () => import('@/components/ErrorView/401.vue'),
    meta: {
      title: '401页面',
      hidden: true
    }
  },
  {
    path: '/error',
    name: 'error',
    component: Layout,
    meta: {
      title: '错误页',
      hidden: true
    },
    children: [
      {
        path: '403',
        name: '403',
        component: () => import('@/components/ErrorView/403.vue'),
        meta: {
          title: '403页面',
          hidden: true
        }
      },
      {
        path: '404',
        name: '404',
        component: () => import('@/components/ErrorView/404.vue'),
        meta: {
          title: '404页面',
          hidden: true
        }
      }
    ]
  },
  {
    // 找不到路由重定向到404页面
    path: '/:catchAll(.*)',
    meta: {
      hidden: true
    },
    component: () => import('@/components/ErrorView/404.vue')
  }
]

export const constantRoutes = convertPath(conroutes)
