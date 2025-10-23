import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      '/api': {   // '/api'로 시작하는 요청을 백엔드 게이트웨이로 전달
        target: 'http://localhost:8000', // Spring Gateway
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')   // 요청 경로에서 '/api' 제거
      }
    }
  }
})
