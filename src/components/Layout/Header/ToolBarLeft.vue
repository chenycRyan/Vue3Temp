<template>
  <div class="tool-bar-left">
    <CollapseIcon></CollapseIcon>
    <BreadCrumb v-if="themeConfig.breadcrumb"></BreadCrumb>
  </div>
</template>
<script lang="ts" setup>
import { AppStore } from '@/store'
const appStore = AppStore()
const themeConfig = computed(() => appStore.theme)
</script>
<style lang="scss" scoped>
.tool-bar-left {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
