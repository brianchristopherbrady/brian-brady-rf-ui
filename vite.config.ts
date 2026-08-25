import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteSingleFile } from 'vite-plugin-singlefile'

// https://vite.dev/config/
export default defineConfig({
  base: './', // keeps built asset URLs relative so build/index.html works when opened directly from disk
  build: {
    outDir: 'build',
  },
  // Inlines JS and CSS so file:// loading does not require cross-origin asset requests.
  plugins: [react(), viteSingleFile()],
})
