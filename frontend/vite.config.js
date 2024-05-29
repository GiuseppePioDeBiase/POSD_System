// vite.config.js
import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react'
import reactRefresh from '@vitejs/plugin-react-refresh';

export default {
  plugins: [reactRefresh()],
};
export default defineConfig({
    build: {
        /** If you set esmExternals to true, this plugins assumes that
         all external dependencies are ES modules */

        commonjsOptions: {
            esmExternals: true
        },
    },

    server: {
        proxy: {
            '/api': {
                target: 'http://localhost:5000', // Porta del backend Flask
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, ''), // riscrivo senza /api il percorso
            },
        },
    },
    plugins: [react()],
});
