import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import inspect from 'vite-plugin-inspect'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), inspect()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
