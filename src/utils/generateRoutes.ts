import path from 'path-browserify'
import { RouteRecordRaw } from 'vue-router'
import type { Router } from 'vue-router'
import { isExternal } from '@/utils/is'
import { pick, cloneDeep } from 'lodash-es'

function hasPermission(names: string[], route: RouteRecordRaw) {
  if (route.meta?.hidden) return true
  if (route.meta?.alwaysShow) return true
  return true
  //   if (route.name) return names.includes(route.name?.toUpperCase())
}

export function generateRoutes(names: string[], routes: RouteRecordRaw[]) {
  const arr: RouteRecordRaw[] = []
  routes.forEach((item: RouteRecordRaw) => {
    const map = { ...item }
    if (hasPermission(names, map)) {
      if (map.children) {
        map.children = generateRoutes(names, map.children)
      }
      arr.push(map)
    }
  })
  return arr
}

export function convertPath(routes: RouteRecordRaw[], baseUrl = '/') {
  return routes.map(route => {
    route = { ...route }
    route.path = route.path !== '*' && !isExternal(route.path) ? path.resolve(baseUrl, route.path) : route.path
    if (route.children && route.children.length > 0) {
      route.children = convertPath(route.children, route.path)
      if (route.children.length > 0) {
        if (!route.redirect) route.redirect = route.children[0].redirect ? route.children[0].redirect : route.children[0].path
      }
    }
    return route
  })
}

export function filterRoutes(asyncRoutes: RouteRecordRaw[]) {
  // 该处可传递权限
  let routes = cloneDeep(asyncRoutes)
  let finalRoutes = generateRoutes([], routes)
  return convertPath(finalRoutes)
}

function addRoutes(router: Router, routes: RouteRecordRaw[], parentName: any = '') {
  routes.forEach((item: RouteRecordRaw) => {
    let route: any
    if (item.redirect) {
      route = pick(item, ['path', 'redirect', 'name', 'meta', 'component'])
    } else {
      route = pick(item, ['path', 'name', 'component', 'meta'])
    }

    parentName ? router.addRoute(parentName, route) : router.addRoute(route)
    if (item.children && item.children.length) {
      addRoutes(router, item.children, item.name)
    }
  })
}

export async function registerRoutes(router: Router, routes: RouteRecordRaw[]) {
  try {
    await addRoutes(router, routes)
    return true
  } catch (err) {
    console.log(err)
  }
}
