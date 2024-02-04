<template>
  <div class="fullscreen">
    <i :class="['iconfont', 'icon-shujushouquan']" class="toolBar-icon" @click="license"></i>
  </div>
  <el-drawer v-model="authDrawer" title="授权信息" size="350px" modal-class="auth-drawer">
    <el-row class="auth-line">
      <el-col :span="24" class="auth-title">授权申请软件</el-col>
      <el-col :span="24">{{ licenseInfo.software }}</el-col>
    </el-row>
    <el-row class="auth-line">
      <el-col :span="24" class="auth-title">申请单位</el-col>
      <el-col :span="24">{{ licenseInfo.licenseUser }}</el-col>
    </el-row>
    <el-row class="auth-line">
      <el-col :span="24" class="auth-title">单位类型</el-col>
      <el-col :span="24">{{ licenseInfo.licenseUserType }}</el-col>
    </el-row>
    <el-row class="auth-line">
      <el-col :span="24" class="auth-title">邮箱地址</el-col>
      <el-col :span="24">{{ licenseInfo.email }}</el-col>
    </el-row>
    <el-row class="auth-line">
      <el-col :span="24" class="auth-title">授权有效期</el-col>
      <el-col :span="24">{{ licenseInfo.permanent ? '永久' : licenseInfo.expireDate }}</el-col>
    </el-row>
  </el-drawer>
</template>

<script setup>
import { getLicense } from '@/api/auth'
import { ElMessage } from 'element-plus'
const authDrawer = ref(false)
const licenseInfo = ref({
  licenseUserType: '',
  software: '',
  licenseUser: '',
  permanent: false,
  expireDate: '',
  email: ''
})
function license() {
  getLicense()
    .then(res => {
      console.log('getLicense', res)
      authDrawer.value = true
      licenseInfo.value = res
    })
    .catch(() => {
      ElMessage.warning('授权证书获取失败')
    })
}
</script>

<style lang="scss" scoped>
.auth-drawer {
  .auth-line {
    margin-top: 2vh;
    font-size: 16px;
    line-height: 1.6em;
    .auth-title {
      font-weight: bold;
    }
  }
}
</style>
