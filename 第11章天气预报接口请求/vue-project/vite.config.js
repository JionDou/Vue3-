import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import path from "path";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    // alias: {
    //   '@': fileURLToPath(new URL('./src', import.meta.url))
    // }
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  // server:{
  //  proxy:{
  //   '/api': {
  //     target: 'http://apis.juhe.cn/',
  //     changeOrigin: true
  //   }
  //  }
  // }
})
