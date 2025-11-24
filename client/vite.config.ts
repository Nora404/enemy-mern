import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Alle Requests, die mit /api beginnen, werden an den Backend-Server weitergeleitet
      "/api": {
        target: "http://localhost:4000",
        changeOrigin: true
      }
    }
  }
});
