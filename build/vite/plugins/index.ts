/**
 * @name createVitePlugins
 * @description 封装plugins数组统一调用
 */
import { PluginOption } from 'vite'
import vue from '@vitejs/plugin-vue'
import { AutoImportDeps } from './autoImport'
import { AutoRegistryComponents } from './components'
import { ConfigSvgIconsPlugin } from './svgIcons'
import { ConfigCompressPlugin } from './compress'
import { ConfigVisualizerConfig } from './visualizer'
export function createVitePlugins(isBuild: boolean) {
  console.log(isBuild)
  const vitePlugins: (PluginOption | PluginOption[])[] = [
    // vue支持
    vue()
  ]

  // 自动按需引入组件
  vitePlugins.push(AutoRegistryComponents())
  // 自动按需引入依赖
  vitePlugins.push(AutoImportDeps())
  // svg支持
  vitePlugins.push(ConfigSvgIconsPlugin(isBuild))

  if (isBuild) {
    // rollup-plugin-gzip
    vitePlugins.push(ConfigCompressPlugin())
    // rollup-plugin-visualizer
    //@ts-ignore
    vitePlugins.push(ConfigVisualizerConfig())
  }
  return vitePlugins
}
