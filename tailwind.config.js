/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      './src/frontend/**/*.{js,jsx,ts,tsx,html}', // Busca componentes en la carpeta frontend
    ],
    theme: {
      extend: {
        fontFamily: {
          sans: ['Poppins', 'sans-serif'], // Personalización de fuente
        },
        colors: {
          blueCustom: '#3b82f6', // Azul personalizado
          grayLight: '#f3f4f6',  // Gris claro
          grayDark: '#d1d5db',   // Gris oscuro
        },
      },
    },
    plugins: [],
  };
  