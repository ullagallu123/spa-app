import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: process.env.VITE_API_URL,  // Fallback if not set
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
