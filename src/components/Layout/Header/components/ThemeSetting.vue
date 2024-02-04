<template>
  <div>
    <div class="theme-setting">
      <i :class="'iconfont icon-zhuti'" class="toolBar-icon" @click="openThemeDrawer"></i>
    </div>
  </div>
</template>

<script lang="ts" setup>
import mittBus from '@/utils/mittBus'
const openThemeDrawer = () => {
  mittBus.emit('openThemeDrawer')
}
</script>
