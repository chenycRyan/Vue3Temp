<template>
  <div class="tabs-container">
    <el-tabs class="tabs-cons" v-model="curTab" type="card" closable @tab-remove="removeTab" @tab-click="clickTab">
      <el-tab-pane v-for="item in tabList" :key="item.path" :label="item.title" :name="item.path" :path="item.path">
        <template #label>
          <span style="display: inline-block">{{ item.title }}</span>
        </template>
      </el-tab-pane>
    </el-tabs>
    <div class="more-button">
      <more-button></more-button>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { TabsPaneContext, TabPaneName } from 'element-plus'
import { TabStore } from '@/store'
const route = useRoute()
const router = useRouter()
const tabStore = TabStore()
const tabList = computed(() => tabStore.tabList)
const curTab = computed({
  get: () => {
    return tabStore.curTab
  },
  set: val => {
    tabStore.setTab(val)
  }
})
const clickTab = (tabItem: TabsPaneContext) => {
  let path = tabItem.props.name as string
  router.push(path)
}
const removeTab = (tabPath: TabPaneName) => {
  tabStore.removeTab(tabPath as string)
}
// 监听路由变化
watch(
  () => route.path,
  () => {
    let params = {
      title: route.meta.title as string,
      path: route.path,
      close: true
    }
    tabStore.addTab(params)
  },
  {
    immediate: true
  }
)
</script>
<style lang="scss" scoped>
@import './index.scss';
</style>
