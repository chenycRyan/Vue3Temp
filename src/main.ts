import { createApp } from 'vue'
import store from '@/store'
import router from './router'
import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
import App from './App.vue'
import './utils/flexible'
import * as Icons from '@element-plus/icons-vue'
import 'element-plus/es/components/message/style/css'
import 'element-plus/es/components/message-box/style/css'
import 'element-plus/es/components/notification/style/css'
import '@/styles/index.scss'

const app = createApp(App)
app.directive('fo', {
  mounted(el, binding, vnode) {
    // 聚焦元素
    el.querySelector('input').focus()
  }
})
app.directive('focus', {
  mounted(el, binding, vnode) {
    // 聚焦元素
    el.focus()
  }
})
// 注册element Icons组件
Object.keys(Icons).forEach(key => {
  app.component(key, Icons[key as keyof typeof Icons])
})
dayjs.extend(duration)
app.config.globalProperties.$dayjs = dayjs
app.use(store).use(router).mount('#app')
