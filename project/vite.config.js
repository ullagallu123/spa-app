import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: process.env.VITE_API_URL || 'http://default-api-url',
        changeOrigin: true,
        secure: false,  // Set to true for production if using HTTPS
      },
    },
  },
});
