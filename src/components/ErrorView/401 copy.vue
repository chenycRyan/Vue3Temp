<template>
  <div class="not-container">
    <img v-show="!route.query.expireDate" src="@/assets/images/error_images/dun.png" class="not-img" />
    <div class="not-detail">
      <h4>{{ route.query.expireDate ? '更新授权码!当前授权截止日期：' + route.query.expireDate : '当前授权已经失效!' }}</h4>
      <!-- <h4>请联系江苏汇博机器人技术股份有限公司</h4> -->
    </div>
    <div class="contact">
      <el-input
        type="textarea"
        :autosize="{ minRows: 4, maxRows: 4 }"
        v-model="licenseCode"
        placeholder="请输入授权秘钥"
      ></el-input>
      <el-button class="btn" type="primary" @click="handleAuth">授权</el-button>
    </div>
  </div>
</template>
<script setup>
import { setLicense } from '@/api/auth'
import { ElMessage } from 'element-plus'
const router = useRouter()
const route = useRoute()
const licenseCode = ref('')
const handleAuth = async () => {
  setLicense({ licenseCode: licenseCode.value }).then(res => {
    if (res === 'EFFECTIVE') {
      if (route.query.redirect) {
        router.replace(route.query.redirect)
      } else {
        router.replace(`/login`)
      }
    } else {
      const status = {
        NONE: '授权码缺失',
        INVALID: '授权码无效',
        NOT_MATCH: '授权码与软件不匹配',
        EXPIRED: '授权码过期',
        SYSTEM_TIME_INVALID: '系统时间无效',
        DISABLE: '授权码被禁用',
        ONLINES_OVER_LIMIT: '在线人数超限',
        NO_NETWORK: '网络没有连接'
      }
      ElMessage.warning(res ? status[res] : '系统授权异常，请联系管理员！')
    }
  })
}
</script>
<style scoped lang="scss">
@import './index.scss';
.not-container {
  background: url('@/assets/images/error_images/bg.jpg');
  background-size: 100% 100%;
  flex-direction: column;
  .not-img {
    margin-right: 0;
    margin-bottom: 20px;
  }
  h4 {
    color: rgb(255, 123, 0) !important;
    text-align: center;
    font-weight: bold;
  }
  .contact {
    width: 400px;
    border-top: 1px solid #f07b22;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding-top: 20px;
    .concat-img {
      margin-right: 20px;
    }
    .btn {
      margin-top: 10px;
      width: 100%;
    }
    h6 {
      font-size: 18px;
    }
  }
}
</style>
