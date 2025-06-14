import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/happy-birthday-project/',
  build: {
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          if (!assetInfo.name) return 'assets/[name][extname]'
          if (/\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/i.test(assetInfo.name)) {
            return `assets/media/[name][extname]`
          }
          if (/\.(png|jpe?g|gif|svg|bmp|webp)(\?.*)?$/i.test(assetInfo.name)) {
            return `assets/images/[name][extname]`
          }
          return `assets/[name][extname]`
        }
      }
    }
  }
})
