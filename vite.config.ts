/*
 * @Author: jiatan_wei
 * @Description: 
 * @Date: 2023-02-24 16:04:08
 */
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import stringHash from 'string-hash'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: [
      { find: '@', replacement: path.resolve(__dirname, './src') }
    ]
  },
  plugins: [vue()],
  base: '/vite-mindmap/',
  build: {
    outDir: 'docs'
  },
  css: {
    modules: {
      generateScopedName: (name, filename, css) => {
        const f = filename.split('?')[0].split('.')[0]
        const file = path.basename(f)
        const hash = stringHash(css).toString(36).substr(0, 5);
        return `${file}_${name}_${hash}`
      }
    }
  }
})
