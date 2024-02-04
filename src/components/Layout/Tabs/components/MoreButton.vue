<template>
  <el-dropdown trigger="click">
    <!-- <el-icon class="icon-more"><Menu /></el-icon> -->
    <el-button type="primary" size="small">
      更多
      <el-icon class="el-icon--right"><ArrowDown /></el-icon>
    </el-button>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="closeLeftTab">
          <el-icon><Back /></el-icon>关闭左侧
        </el-dropdown-item>
        <el-dropdown-item @click="closeRightTab">
          <el-icon><Right /></el-icon>关闭右侧
        </el-dropdown-item>
      </el-dropdown-menu>
      <el-dropdown-item @click="closeOtherTab">
        <el-icon><CircleClose /></el-icon>关闭其他
      </el-dropdown-item>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
import { TabStore } from '@/store'
import { ArrowDown } from '@element-plus/icons-vue'

const tabStore = TabStore()

const closeLeftTab = () => {
  const index = tabStore.tabList.findIndex(item => item.path == tabStore.curTab)
  if (index > 0) {
    const deleteTabs = tabStore.tabList.slice(0, index)
    const deleteTabPaths = (deleteTabs?.length && deleteTabs.map(item => item.path)) || []
    deleteTabPaths?.length && tabStore.closeMultipleTab(deleteTabPaths)
  }
}

const closeRightTab = () => {
  const index = tabStore.tabList.findIndex(item => item.path == tabStore.curTab)
  if (index != -1) {
    const deleteTabs = tabStore.tabList.slice(index + 1, tabStore.tabList.length)
    const deleteTabPaths = (deleteTabs?.length && deleteTabs.map(item => item.path)) || []
    deleteTabPaths?.length && tabStore.closeMultipleTab(deleteTabPaths)
  }
}

const closeOtherTab = () => {
  const deleteTabPaths: string[] = []
  tabStore.tabList.forEach(item => {
    if (item.path != tabStore.curTab) {
      deleteTabPaths.push(item.path)
    }
  })
  deleteTabPaths?.length && tabStore.closeMultipleTab(deleteTabPaths)
}
</script>

<style scoped lang="scss">
.icon-more {
  color: #409eff;
  font-size: 24px;
}
:deep(.el-button) {
  padding: 8px;
}
</style>
