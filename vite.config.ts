import { defineConfig } from 'vite'
import path from 'path'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/viva-recruitment-site/',
  plugins: [react()],
  resolve: {
    alias: {
        '@': path.resolve(__dirname, './src'),
        '@shared': path.resolve(__dirname, './src/shared'),
    },
  },
})

