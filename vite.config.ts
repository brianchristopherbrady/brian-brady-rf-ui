import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteSingleFile } from 'vite-plugin-singlefile'

// https://vite.dev/config/
export default defineConfig({
  base: './', // keeps built asset URLs relative so build/index.html works when opened directly from disk
  build: {
    outDir: 'build',
  },
  // inlines JS/CSS as a classic script into index.html so it runs from file:// (module scripts are blocked there)
  plugins: [react(), viteSingleFile()],
})
