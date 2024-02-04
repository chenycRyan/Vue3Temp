import { computed, onBeforeMount } from 'vue'
import { AppStore } from '@/store'
import { DEFAULT_PRIMARY, CSS_PREFIX } from '@/config/config'
import { getLightColor, getDarkColor } from '@/utils/theme/tool'
import { ElMessage } from 'element-plus'

export const useTheme = () => {
  const appStore = AppStore()
  const themeConfig = computed(() => appStore.theme)

  // 切换暗黑模式
  const switchDark = () => {
    const body = document.documentElement as HTMLElement
    if (themeConfig.value.isDark) body.setAttribute('class', 'dark')
    else body.setAttribute('class', '')
  }

  // 切换全蓝模式
  const switchBlue = () => {
    const body = document.documentElement as HTMLElement
    if (themeConfig.value.isBlue) body.setAttribute('class', 'blue')
    else body.setAttribute('class', '')
  }

  // 切换打印模式
  const switchPrint = () => {
    const body = document.documentElement as HTMLElement
    if (themeConfig.value.isPrint) body.setAttribute('class', 'print')
    else body.setAttribute('class', '')
  }

  // 修改主题颜色
  const changePrimary = (val: string | null): any => {
    if (!val) {
      val = DEFAULT_PRIMARY
      ElMessage({ type: 'success', message: `主题颜色已重置为 ${DEFAULT_PRIMARY}` })
    }
    appStore.setThemeConfig({ ...themeConfig.value, primary: val })
    document.documentElement.style.setProperty(
      `--${CSS_PREFIX}-color-primary-dark-2`,
      `${getDarkColor(themeConfig.value.primary, 0.1)}`
    )
    document.documentElement.style.setProperty(`--${CSS_PREFIX}-color-primary`, themeConfig.value.primary)
    // 颜色变浅
    for (let i = 1; i <= 9; i++) {
      document.documentElement.style.setProperty(
        `--${CSS_PREFIX}-color-primary-light-${i}`,
        `${getLightColor(themeConfig.value.primary, i / 10)}`
      )
    }

    // 	if (type === "grey") body.setAttribute("style", "filter: grayscale(1)"); 灰色
    //	if (type === "weak") body.setAttribute("style", "filter: invert(80%)"); 弱色
  }
  onBeforeMount(() => {
    switchDark()
    switchBlue()
    switchPrint()
    changePrimary(themeConfig.value.primary)
  })
  return {
    switchDark,
    switchPrint,
    switchBlue,
    changePrimary
  }
}
