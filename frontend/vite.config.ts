import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  // Setup local host
  // https://qiita.com/ginger-yell/items/602091d7010f77fbb47a
  server: {
    host:true,
    port:3000
  },
  preview: {
    host:true,
    port:3000
  },
  plugins: [react()],
})
