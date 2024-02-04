<template>
  <div>
    <el-form ref="loginFormRef" :model="loginForm" :rules="rules" size="large">
      <el-form-item prop="userName">
        <el-input v-model="loginForm.userName" placeholder="用户名:admin / student">
          <template #prefix>
            <el-icon class="el-input__icon"><User /></el-icon>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          type="password"
          v-model="loginForm.password"
          placeholder="密码:123456"
          show-password
          autocomplete="new-password"
        >
          <template #prefix>
            <el-icon class="el-input__icon"><Lock /></el-icon>
          </template>
        </el-input>
      </el-form-item>
    </el-form>
    <div class="login-btn">
      <el-button :icon="CircleClose" round size="large">重置</el-button>
      <el-button :icon="UserFilled" round size="large" type="primary" :loading="loading" @click="loginFun(loginFormRef)">
        登录
      </el-button>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { FormInstance, FormRules, ElMessage } from 'element-plus'
import { CircleClose, UserFilled } from '@element-plus/icons-vue'
import { UserStore } from '@/store'
import { login } from '@/api/orion'
import { cloneDeep } from 'lodash-es'
import { useRoute, useRouter } from 'vue-router'
import { reactive, ref } from 'vue'
const userStore = UserStore()
const route = useRoute()
const router = useRouter()
const loginFormRef = ref<FormInstance>()
const rules = reactive<FormRules>({
  userName: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
})
const loginForm = reactive({
  userName: 'admin',
  password: 'a123456'
})
const loading = ref<boolean>(false)
const loginFun = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate(async valid => {
    if (valid) {
      loading.value = true
      try {
        const formData = cloneDeep(loginForm)
        formData.password = window.btoa(formData.password)
        const res: any = await login(formData)
        if (!res) return false
        userStore.setUserName(res?.userName)
        userStore.setToken(res?.access_token)
        ElMessage.success('欢迎使用')

        if (route.query.redirect) {
          router.replace(route.query.redirect as string)
        } else {
          router.replace('/')
        }
      } finally {
        loading.value = false
      }
    }
  })
}
onMounted(() => {})
</script>
<style scoped lang="scss">
@import '../index.scss';
</style>
