<template>
  <div class="login-container flex-center">
    <div class="login-content">
      <div class="login-left">
        <!-- <img src="@/assets/images/login_images/login_left0.png" alt="login" /> -->
      </div>
      <div class="login-box">
        <!-- <img class="login-img" src="@/assets/images/login_images/form_icon.png" alt="form_icon" /> -->
        <div class="login-form">
          <div class="login-logo">
            <p class="logo-text">系统登录</p>
          </div>
          <LoginForm ref="loginRef" />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts" name="login">
import LoginForm from './components/LoginForm.vue'
</script>
<style lang="scss" scoped>
@import './index.scss';
</style>
