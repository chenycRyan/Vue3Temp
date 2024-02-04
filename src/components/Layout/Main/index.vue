<template>
  <Tabs v-if="themeConfig.tabs"></Tabs>
  <el-main class="main-container">
    <router-view v-slot="{ Component }" :key="key">
      <transition appear name="fade-transform" mode="out-in">
        <!-- <keep-alive> -->
        <component :is="Component" :key="key" />
        <!-- </keep-alive> -->
      </transition>
    </router-view>
  </el-main>
</template>

<script lang="ts" setup>
import { AppStore } from '@/store'
// 路由中添加key解决切换路由时页面不展示内容，刷新后才展示内容问题
const route = useRoute()
const key = computed(() => {
  return route.path + Math.random()
})
const appStore = AppStore()
const themeConfig = computed(() => appStore.theme)
</script>

<style lang="scss" scoped>
.main-container {
  background-color: #f2f3f5;
  flex: 1;
  @media (max-width: 576px) {
    padding: 10px;
  }
}
</style>
