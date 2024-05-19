// vite.config.js
import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000', // Porta del backend Flask
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''), // riscrivo senza /api il percorso
      },
    },
  },
});
