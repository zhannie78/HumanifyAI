/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0faf4',
          100: '#dbf4e4',
          200: '#b9e6cc',
          300: '#84d3aa',
          400: '#4ca867',
          500: '#38915c',
          600: '#2d744a',
          700: '#275c3e',
          800: '#234a34',
          900: '#1e3d2c',
          950: '#0f1f16',
        },
        secondary: {
          50: '#f0faf4',
          100: '#dbf4e4',
          200: '#b9e6cc',
          300: '#84d3aa',
          400: '#4ca867',
          500: '#38915c',
          600: '#2d744a',
          700: '#275c3e',
          800: '#234a34',
          900: '#1e3d2c',
          950: '#0f1f16',
        },
        accent: {
          50: '#f0faf4',
          100: '#dbf4e4',
          200: '#b9e6cc',
          300: '#84d3aa',
          400: '#4ca867',
          500: '#38915c',
          600: '#2d744a',
          700: '#275c3e',
          800: '#234a34',
          900: '#1e3d2c',
          950: '#0f1f16',
        },
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 0.5s ease-in-out',
        slideUp: 'slideUp 0.5s ease-in-out',
      },
    },
  },
  plugins: [],
};