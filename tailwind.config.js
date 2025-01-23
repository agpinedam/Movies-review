module.exports = {
  content: [
      './src/frontend/**/*.{js,jsx,ts,tsx,html}',
  ],
  theme: {
      extend: {
          fontFamily: {
              sans: ['Poppins', 'sans-serif'],
          },
          colors: {
              blueCustom: '#3b82f6', // Azul principal
              grayLight: '#f3f4f6',  // Gris claro
              grayDark: '#d1d5db',  // Gris oscuro
              whiteCustom: '#ffffff', // Blanco
          },
      },
  },
  plugins: [],
};
