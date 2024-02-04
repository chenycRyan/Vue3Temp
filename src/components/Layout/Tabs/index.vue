<template>
  <div class="tabs-container">
    <!-- <el-tabs class="tabs-cons" v-model="curTab" type="card" closable @tab-remove="removeTab" @tab-click="clickTab">
      <el-tab-pane v-for="item in tabList" :key="item.path" :label="item.title" :name="item.path" :path="item.path">
        <template #label>
          <span style="display: inline-block">{{ item.title }}</span>
        </template>
      </el-tab-pane>
    </el-tabs> -->
    <div id="tags-view-container" class="tags-view-container">
      <el-scrollbar ref="scrollContainer" :vertical="false" class="tags-view-wrapper">
        <router-link
          v-for="tag in tabList"
          ref="tag"
          :key="tag.path"
          :class="isActive(tag.path) ? 'active' : ''"
          :to="{ path: tag.path }"
          class="tags-view-item"
        >
          {{ tag.title }}

          <el-icon @click.prevent.stop="removeTab(tag.path)"><Close /></el-icon>
        </router-link>
      </el-scrollbar>
      <div class="more-button">
        <more-button></more-button>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { TabsPaneContext, TabPaneName } from 'element-plus'
import { TabStore } from '@/store'
import { Close } from '@element-plus/icons-vue'
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
const isActive = (path: string) => {
  return path === route.path
}
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
<style lang="scss" scoped>
.tags-view-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 34px;
  width: 100%;
  background: #fff;
  border-bottom: 1px solid #d8dce5;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
  @media (max-width: 576px) {
    height: auto;
	 padding-bottom: 10px;
  } 
  .tags-view-wrapper {
    .tags-view-item {
      display: inline-block;
      position: relative;
      cursor: pointer;
      height: 26px;
      line-height: 26px;
      border: 1px solid #d8dce5;
      color: #495060;
      background: #fff;
      padding: 0 8px;
      font-size: 12px;
      margin-left: 5px;
      margin-top: 4px;
      &:first-of-type {
        margin-left: 15px;
      }
      &:last-of-type {
        margin-right: 15px;
      }
      &.active {
        background-color: var(--el-color-primary);
        color: #fff;
        border-color: var(--el-color-primary);
        &::before {
          content: '';
          background: #fff;
          display: inline-block;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          position: relative;
          margin-right: 2px;
        }
      }
    }
  }
  .contextmenu {
    margin: 0;
    background: #fff;
    z-index: 3000;
    position: absolute;
    list-style-type: none;
    padding: 5px 0;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 400;
    color: #333;
    box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);
    li {
      margin: 0;
      padding: 7px 16px;
      cursor: pointer;
      &:hover {
        background: #eee;
      }
    }
  }
}
</style>

<style lang="scss">
//reset element css of el-icon-close
.tags-view-wrapper {
  .tags-view-item {
    .el-icon-close {
      width: 16px;
      height: 16px;
      vertical-align: 2px;
      border-radius: 50%;
      text-align: center;
      transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
      transform-origin: 100% 50%;
      &:before {
        transform: scale(0.6);
        display: inline-block;
        vertical-align: -3px;
      }
      &:hover {
        background-color: #b4bccc;
        color: #fff;
      }
    }
  }
}
</style>
