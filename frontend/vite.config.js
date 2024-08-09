import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from "tailwindcss";

// https://vitejs.dev/config/
export default defineConfig({
  css: {
    postcss: {
      plugins: [tailwindcss()],
    },
  },
  base: '/',
  plugins: [react()],
  server: {
    hmr: {
      clientPort: 443,
    },
    host: '127.0.0.1',
    port: 3000
  }
})
