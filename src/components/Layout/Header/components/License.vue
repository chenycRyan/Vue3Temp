<template>
  <div>
    <el-tooltip class="box-item" effect="dark" content="系统授权信息" placement="bottom">
      <!-- <img src="@/assets/images/license.png" @click="openDialog" class="icons" alt="" /> -->
      <i :class="['iconfont', 'icon-shujushouquan']" @click="openDialog"></i>
    </el-tooltip>
    <el-dialog title="授权信息" width="600px" v-model="dialogVisible">
      <el-descriptions :column="2" border>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">授权截止日期</div>
          </template>
          {{ licenseInfo.expireDate }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">申请用户</div>
          </template>
          {{ licenseInfo.licenseUser }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">申请用户类型</div>
          </template>
          {{ licenseInfo.licenseUserType }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label> 更新授权码 </template>
          <el-button type="primary" @click="resetLicense(licenseInfo.expireDate)">更新</el-button>
        </el-descriptions-item>
      </el-descriptions>
    </el-dialog>
  </div>
</template>
<script setup>
import { getLicense } from '@/api/auth'

let dialogVisible = ref(false)
let licenseInfo = ref({})
const openDialog = () => {
  getLicense().then(res => {
    licenseInfo.value = res
    dialogVisible.value = true
    if (licenseInfo.value.permanent) {
      licenseInfo.value.expireDate = '永久'
    }
    const typeObj = { SCHOOL: '学校', ENTERPRISE: '企业', PERSON: '个人' }
    licenseInfo.value.licenseUserType = typeObj[res.licenseUserType]
  })
}
const router = useRouter()
const route = useRoute()
const resetLicense = expireDate => {
  router.push({
    path: '/401',
    query: {
      expireDate,
      redirect: route.fullPath
    }
  })
}
</script>
<style lang="scss" scoped>
.icons {
  width: 24px;
  height: 24px;
  margin-right: 10px;
  margin-top: 4px;
  cursor: pointer;
}
</style>
