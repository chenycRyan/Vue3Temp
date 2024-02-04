import { resolve } from 'path'
import { defineConfig, ConfigEnv, UserConfig, loadEnv } from 'vite'
import { createVitePlugins } from './build/vite/plugins'
import { VITE_PORT, VITE_DROP_CONSOLE } from './build/constant'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }: ConfigEnv): UserConfig => {
  const isBuild = command === 'build'
  return {
    // base: '/identity-resolution/web/',
    resolve: {
      alias: {
        '@': resolve(__dirname, './src')
      }
    },
    server: {
      hmr: { overlay: false },
      host: '0.0.0.0',
      port: VITE_PORT, // 类型： number 指定服务器端口;
      open: false, // 类型： boolean | string在服务器启动时自动在浏览器中打开应用程序；
      cors: true, // 类型： boolean | CorsOptions 为开发服务器配置 CORS。默认启用并允许任何源
      proxy: {
        // 跨域代理
        '/api': {
          target: 'http://192.168.0.52:9113',
          changeOrigin: true,
          rewrite: path => path.replace(/^\/api/, '')
        }
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "@/styles/element/index.scss" as *;`
        }
      }
    },
    plugins: createVitePlugins(isBuild),
    esbuild: {
      pure: VITE_DROP_CONSOLE ? ['console.log', 'debugger'] : []
    },
    build: {
      outDir: 'dist',
      target: 'es2015',
      minify: 'esbuild',
      cssTarget: 'chrome80',
      chunkSizeWarningLimit: 2000,
      rollupOptions: {
        output: {
          chunkFileNames: 'assets/js/[name]-[hash].js',
          entryFileNames: 'assets/js/[name]-[hash].js',
          assetFileNames: 'assets/[ext]/[name]-[hash].[ext]'
        }
      }
    }
  }
})
