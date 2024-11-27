import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  build: {
    manifest: true,
    chunkSizeWarningLimit: 1600,
    rollupOptions: {
      output: {
        chunkFileNames: `[name]-[hash].js`,
        entryFileNames: `[name]-[hash].js`,
        assetFileNames: () => {
          return '[name]-[hash][extname]'
        }
      },
    },
  },
})
