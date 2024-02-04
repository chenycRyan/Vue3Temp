<template>
  <div>
    <el-dropdown trigger="click">
      <div class="avatar">
        <img src="@/assets/images/avatar.png" alt="avatar" />
      </div>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="goLogin"> 登出 </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script lang="ts" setup>
import { UserStore, RouteStore } from '@/store'
const router = useRouter()
const route = useRoute()
const userStore = UserStore()
const routeStore = RouteStore()
const goLogin = () => {
  localStorage.clear()
  userStore.resetInfo()
  routeStore.setRoutes([])
  router.push(`/login?redirect=${route.fullPath}`)
}
</script>

<style lang="scss" scoped>
.avatar {
  width: 35px;
  height: 35px;
  overflow: hidden;
  cursor: pointer;
  border-radius: 50%;
  img {
    width: 100%;
    height: 100%;
  }
}
</style>
