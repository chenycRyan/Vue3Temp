<template>
  <el-drawer v-model="themeDrawer" title="布局设置" size="300px" modal-class="theme-drawer">
    <!-- 全局主题 -->
    <el-divider class="divider" content-position="center">
      <el-icon class="icon"><ColdDrink /></el-icon>
      全局主题
    </el-divider>
    <div class="theme-item">
      <span>主题颜色</span>
      <el-color-picker v-model="themeConfig.primary" :predefine="colorList" @change="changePrimary" />
    </div>
    <!-- <div class="theme-item">
      <span>暗黑模式</span>
      <SwitchDark></SwitchDark>
    </div> -->
    <!-- <div class="theme-item">
      <span>蓝色模式</span>
      <SwitchBlue></SwitchBlue>
    </div> -->
    <!-- <div class="theme-item">
      <span>打印模式</span>
      <SwitchPrint></SwitchPrint>
    </div> -->
    <!-- 界面设置 -->
    <el-divider class="divider" content-position="center">
      <el-icon><Setting /></el-icon>
      界面设置
    </el-divider>
    <div class="theme-item">
      <span>折叠菜单</span>
      <el-switch v-model="isCollapse" />
    </div>
    <div class="theme-item">
      <span>面包屑</span>
      <el-switch v-model="themeConfig.breadcrumb" />
    </div>
    <div class="theme-item">
      <span>标签栏</span>
      <el-switch v-model="themeConfig.tabs" />
    </div>
  </el-drawer>
</template>
<script lang="ts" setup>
import { AppStore } from '@/store'
import mittBus from '@/utils/mittBus'
import { DEFAULT_PRIMARY } from '@/config/config'
import { useTheme } from '@/hook/useTheme'
const appStore = AppStore()
const themeDrawer = ref(false)
const themeConfig = computed(() => appStore.theme)
const colorList = [
  DEFAULT_PRIMARY,
  '#DAA96E',
  '#0C819F',
  '#409EFF',
  '#27ae60',
  '#ff5c93',
  '#e74c3c',
  '#fd726d',
  '#f39c12',
  '#9b59b6'
]
const isCollapse = computed({
  get() {
    return appStore.isCollapse
  },
  set() {
    appStore.setCollapse()
  }
})
onMounted(() => {
  mittBus.on('openThemeDrawer', openThemeDrawer)
})

onBeforeUnmount(() => {
  mittBus.off('openThemeDrawer')
})

const { changePrimary } = useTheme()
const openThemeDrawer = () => {
  themeDrawer.value = true
}
</script>
<style lang="scss" scoped>
@import './index.scss';
.theme-drawer {
  font-size: 18px;
}
</style>
