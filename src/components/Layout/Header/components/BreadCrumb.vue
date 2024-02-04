<template>
  <el-breadcrumb :separator-icon="ArrowRight">
    <transition-group name="breadcrumb" mode="out-in">
      <el-breadcrumb-item v-for="item in matched" :key="item.path" :to="{ path: item.path }">
        {{ item.meta.title }}
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>
<script lang="ts" setup>
import { ArrowRight } from '@element-plus/icons-vue'
const route = useRoute()
const matched = computed(() => route.matched.filter(item => item.meta && item.meta.title && item.meta.title !== '首页'))
</script>
<style lang="scss" scoped></style>
