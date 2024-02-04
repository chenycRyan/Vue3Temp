<template>
  <el-config-provider :locale="locale">
    <router-view v-if="isRouterAlive"></router-view>
  </el-config-provider>
</template>
<script setup lang="ts">
import { AppStore } from '@/store'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
const locale = ref(zhCn)
const isRouterAlive = ref(true)
const appStore = AppStore()

const resize = () => {
  const mobileWidth = 997
  //bool -true -mobile    bool -false -pc
  const bool = window.innerWidth < mobileWidth
  appStore.setCollapseVal(bool)
  appStore.setIsMobile(bool)
}
const reload = () => {
  isRouterAlive.value = false
  nextTick(() => {
    isRouterAlive.value = true
  })
}
provide('reload', reload)
onMounted(() => {
  resize()
  window.addEventListener('resize', resize)
})
onBeforeUnmount(() => {
  window.removeEventListener('resize', resize)
})
</script>
