<template>
  <div class="home card">
    <img class="home-bg" src="@/assets/images/homeBGpage.png" alt="welcome" />
    <div class="auth">
      <!-- <div>授权公司：{{ authInfo.company }}</div> -->
      <img class="img" src="@/assets/images/blue-theme/auth-bg.png" alt="" />
      <div>授权日期：{{ authInfo.expDate }}</div>
    </div>
  </div>
</template>
<script setup>
import dayjs from 'dayjs'
import { getSystemAuth } from '@/api/auth'
const authInfo = reactive({ company: '', expDate: '', key: '' })
onMounted(async () => {
  const res = await getSystemAuth()
  Object.assign(authInfo, res)
  authInfo.expDate = dayjs(authInfo.expDate).format('YYYY年MM月DD日')
})
</script>
<style lang="scss" scoped>
.home {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background: #eeeeee;
  .home-bg {
    width: 70%;
    margin-bottom: 20px;
  }
}
.auth {
  position: fixed;
  bottom: 10px;
  right: 20px;
  width: 180px;
  height: 150px;
  border-radius: 5px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  color: #123680;
  text-align: center;
  font-size: 12px;
  background: #f1ede6;
  .img {
    height: 100px;
    margin-bottom: 10px;
  }
}
</style>
