/** @type {import('tailwindcss').Config} */
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
          blueCustom: '#3b82f6',
          grayLight: '#f3f4f6',
          grayDark: '#d1d5db',   
        },
      },
    },
    plugins: [],
  };
  