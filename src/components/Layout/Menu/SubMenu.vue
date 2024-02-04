<template>
  <template v-for="subItem in menuList" :key="subItem.path">
    <div v-if="subItem.meta && !subItem.meta.hidden">
      <el-sub-menu v-if="subItem.children && subItem.children.length > 1" :index="subItem.path">
        <template #title>
          <span>{{ subItem.meta?.title }}</span>
        </template>
        <SubMenu :menuList="subItem.children" />
      </el-sub-menu>
      <el-menu-item v-else :index="subItem.path" @click="handleMenuClick(subItem)">
        <template #title>
          <span>{{ subItem.meta?.title }}</span>
        </template>
      </el-menu-item>
    </div>
  </template>
</template>

<script lang="ts" setup>
import { RouteRecordRaw } from 'vue-router'
defineProps<{ menuList: RouteRecordRaw[] }>()
const router = useRouter()
const handleMenuClick = (subItem: RouteRecordRaw) => {
  if (subItem.meta?.isLink) {
    let link = ''
    if ((subItem.meta?.isLink as string).includes('http')) {
      link = subItem.meta?.isLink as string
    } else {
      link = window.location.href.split('#')[0] + '#' + subItem.meta?.isLink
    }
    window.open(link, '_blank')
  } else {
    router.push(subItem.path)
  }
}
</script>
<style lang="scss" scoped>
.el-menu-item {
  &.is-active {
    background-color: var(--el-color-primary-light-7);
  }
  &:hover {
    background-color: var(--el-color-primary-light-9);
  }
}
</style>
