<template>
  <div>
    <div class="message">
      <el-popover placement="bottom" :width="310" trigger="click">
        <template #reference>
          <el-badge :value="3" class="item">
            <i :class="'iconfont icon-xiaoxi'" class="toolBar-icon"></i>
          </el-badge>
        </template>
        <template #default>
          <el-tabs v-model="activeName">
            <el-tab-pane label="通知(3)" name="first">
              <div class="message-list">
                <div class="message-item">
                  <i :class="'iconfont icon-xiaoxi'" class="message-icon"></i>
                  <div class="message-content">
                    <span class="message-title">一键三连 🧡</span>
                    <span class="message-date">一分钟前</span>
                  </div>
                </div>
                <div class="message-item">
                  <i :class="'iconfont icon-xiaoxi'" class="message-icon"></i>
                  <div class="message-content">
                    <span class="message-title">一键三连 💙</span>
                    <span class="message-date">一小时前</span>
                  </div>
                </div>
                <div class="message-item">
                  <i :class="'iconfont icon-xiaoxi'" class="message-icon"></i>
                  <div class="message-content">
                    <span class="message-title">一键三连 💚</span>
                    <span class="message-date">半天前</span>
                  </div>
                </div>
              </div>
            </el-tab-pane>
            <el-tab-pane label="消息(0)" name="second">
              <el-empty description="暂无消息" />
            </el-tab-pane>
            <el-tab-pane label="代办(0)" name="third">
              <el-empty description="暂无代办" />
            </el-tab-pane>
          </el-tabs>
        </template>
      </el-popover>
    </div>
  </div>
</template>

<script lang="ts" setup>
const activeName = ref('first')
</script>

<style lang="scss" scoped>
.message-list {
  display: flex;
  flex-direction: column;
  .message-item {
    display: flex;
    align-items: center;
    padding: 20px 0;
    border-bottom: 1px solid var(--el-border-color-light);
    &:last-child {
      border: none;
    }
    .message-icon {
      width: 40px;
      height: 40px;
      margin: 0 20px 0 5px;
    }
    .message-content {
      display: flex;
      flex-direction: column;
      .message-title {
        margin-bottom: 5px;
      }
      .message-date {
        font-size: 12px;
        color: var(--el-text-color-secondary);
      }
    }
  }
}
</style>
