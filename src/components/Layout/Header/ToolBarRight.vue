<template>
  <div class="tool-bar-right">
    <div class="header-icon">
      <ThemeSetting></ThemeSetting>
      <License></License>
      <Fullscreen></Fullscreen>
    </div>
    <span class="username">{{ username }}</span>
    <Avatar></Avatar>
  </div>
</template>
<script lang="ts" setup>
import { UserStore } from '@/store'
const userStore = UserStore()
const username = computed(() => userStore.user_name)
</script>
<style lang="scss" scoped>
.tool-bar-right {
  display: flex;
  align-items: center;
  justify-content: center;
  .username {
    font-size: 18px;
    margin-right: 10px;
  }
  .header-icon {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100px;
    margin-right: 24px;
  }
}
</style>
