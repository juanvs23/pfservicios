import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

//const origin = import.meta.env. import.meta.env.VITE_APP_URL


// https://vitejs.dev/config/
export default defineConfig({
  base: `/`,
  plugins: [react()],
  build: { chunkSizeWarningLimit: 1600 },
  resolve: {
    alias: {
      "@": "./src",
    },
  },
})
