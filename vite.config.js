import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],
    root: './src/frontend', // Define la raíz del frontend
    build: {
        outDir: '../../dist/frontend', // Carpeta de salida relativa a la raíz del frontend
        emptyOutDir: true,            // Limpia la carpeta de salida antes de construir
    },
    server: {
        host: '0.0.0.0',
        port: 5173
      /*   proxy: {
            '/api': 'http://localhost:5000', // Proxy para el backend
        }, */
    },
});
