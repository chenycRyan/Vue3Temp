<template>
  <el-switch
    v-model="themeConfig.isDark"
    @change="onAddDarkChange"
    inline-prompt
    active-color="#0a0a0a"
    inactive-color="#dcdfe6"
    :active-icon="Sunny"
    :inactive-icon="Moon"
  />
</template>

<script setup lang="ts" name="switchDark">
import { computed } from 'vue'
import { AppStore } from '@/store'
import { Sunny, Moon } from '@element-plus/icons-vue'
import { useTheme } from '@/hook/useTheme'
const appStore = AppStore()

const { switchDark } = useTheme()

const themeConfig = computed(() => appStore.theme)

const onAddDarkChange = () => {
  switchDark()
}
</script>
