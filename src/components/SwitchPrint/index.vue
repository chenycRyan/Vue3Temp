<template>
  <el-switch
    v-model="themeConfig.isPrint"
    @change="onAddPrintChange"
    inline-prompt
    active-color="#212d7b"
    inactive-color="#dcdfe6"
    :active-icon="MagicStick"
    :inactive-icon="Sunny"
  />
</template>

<script setup lang="ts" name="switchPrint">
import { computed } from 'vue'
import { AppStore } from '@/store'
import { MagicStick, Sunny } from '@element-plus/icons-vue'
import { useTheme } from '@/hook/useTheme'
const appStore = AppStore()

const { switchPrint } = useTheme()

const themeConfig = computed(() => appStore.theme)

const onAddPrintChange = () => {
  switchPrint()
}
</script>
