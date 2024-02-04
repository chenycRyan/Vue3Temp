import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { UserStore } from './modules/user'
import { RouteStore } from './modules/routes'
import { AppStore } from './modules/app'
import { MenuStore } from './modules/menu'
import { AuthStore } from './modules/auth'
import { TabStore } from './modules/tab'
import { StatusStore } from './modules/status'

import { createPinia } from 'pinia'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

export { UserStore, AppStore, RouteStore, MenuStore, AuthStore, TabStore, StatusStore }
export default pinia
