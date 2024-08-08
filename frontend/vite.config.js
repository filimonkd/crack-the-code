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
    host: '127.0.0.1',
    port: 5173
  }
})
