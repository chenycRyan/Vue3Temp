<!-- 分栏布局 纵向布局 -->
<template>
  <el-container class="layout-columns">
    <el-aside :style="{ width: isCollapse ? '0px' : '240px' }" class="aside">
      <div class="logo flx-center">
        <!-- <img src="@/assets/images/mes_images/mylogo-w.png" v-if="isProd" alt="logo" /> -->
        <span>{{ appName }} </span>
      </div>
      <el-scrollbar class="scrollbar">
        <el-menu
          class="menu"
          :default-active="activeMenu"
          :router="false"
          :collapse="false"
          :collapse-transition="false"
          background-color="#191a20"
          text-color="#bdbdc0"
          active-text-color="#ffffff"
        >
          <SubMenu :menuList="menuList"></SubMenu>
        </el-menu>
      </el-scrollbar>
    </el-aside>
    <el-container>
      <el-header class="header">
        <ToolBarLeft></ToolBarLeft>
        <ToolBarRight></ToolBarRight>
      </el-header>
      <el-main class="main"><Main></Main></el-main>
    </el-container>
  </el-container>
  <div>
    <ThemeDrawer />
  </div>
</template>
<script lang="ts" setup>
import { AppStore, RouteStore } from '@/store'
const route = useRoute()
const routeStore = RouteStore()
const appStore = AppStore()
const isCollapse = computed(() => appStore.isCollapse)
const appName = computed(() => appStore.appName)
const activeMenu = computed(() => route.path)
const boardPaths = ['/edge-frame', '/code-frame', '/video-frame']
// console.log('menuList routeStore', routeStore.routes)
// console.log('route path', route, route.path, route.path.split('/'), route.name)
const menuList = computed(() => {
  if (route.path && route.path.indexOf('/') !== -1) {
    const modname = route.path.split('/')[1]
    if (['mes', 'code', 'edge'].includes(modname)) {
      const routeType = modname.toUpperCase()
      appStore.setAppType(routeType)
    }
  }
  let resultRoutes = routeStore.routes.filter(item => item.meta?.type == appStore.appType || item.meta.type == undefined)
  // 数据采集去掉大屏菜单项
  if (resultRoutes.some(ele => ele.path === '/data')) {
    return resultRoutes.filter(ele => boardPaths.indexOf(ele.path) < 0)
  }
  return resultRoutes
})
const isProd = process.env.NODE_ENV !== 'development'
console.log('menuList', menuList.value)
onMounted(() => {})
</script>
<style lang="scss" scoped>
@import './index.scss';
</style>
