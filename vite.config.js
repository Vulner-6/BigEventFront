import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  // 服务器代理配置
  server:{
    proxy:{
      '/api':{
        target:'http://localhost:8080',  // 后台服务所在的源，用这个源替换前端服务源
        changeOrigin:true,     // 开启修改源
        rewrite:(path)=>path.replace(/^\/api/,'')   // url路径中的 /api 将会被替换成 '' 
      }
    }
    
  }
})
