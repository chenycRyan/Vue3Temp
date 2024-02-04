<template>
  <el-icon class="collapse-icon" @click="appStore.setCollapse()">
    <component :is="isCollapse ? 'Expand' : 'Fold'"></component>
  </el-icon>
</template>
<script lang="ts" setup>
import { AppStore } from '@/store'
const appStore = AppStore()
const isCollapse = computed((): boolean => appStore.isCollapse)
</script>
<style lang="scss" scoped>
.collapse-icon {
  margin-right: 20px;
  font-size: 22px;
  cursor: pointer;
}
</style>
