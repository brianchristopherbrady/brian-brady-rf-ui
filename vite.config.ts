import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: './', // keeps built asset URLs relative so build/index.html works when opened directly from disk
  build: {
    outDir: 'build',
  },
  plugins: [react()],
})
