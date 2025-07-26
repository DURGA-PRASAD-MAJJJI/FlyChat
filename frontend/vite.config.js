import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './',         // 👈 important for relative asset paths
  build: {
    outDir: 'dist',   // 👈 Vercel expects this from vercel.json
  },
})
