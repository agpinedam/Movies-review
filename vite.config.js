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
        proxy: {
            '/api': 'http://localhost:5173', // Proxy para el backend
        },
    },
});
