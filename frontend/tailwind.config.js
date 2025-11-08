// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        purple: {
          50: '#f9f6fb',
          100: '#f1eaf6',
          200: '#e3d5ee',
          300: '#cdb4e1',
          400: '#a87acc',
          500: '#8a56b5',
          600: '#9a077aff',
          700: '#602971ff',
          800: '#733287ff',
          900: '#791075ff',
        },
        marigold: {
          50: '#fffaf2',
          100: '#fff2e0',
          200: '#ffe2b8',
          300: '#ffd28f',
          400: '#ffc267',
          500: '#ffad4a',
          600: '#e6953a',
          700: '#b3742e',
          800: '#805423',
          900: '#4d3315',
        }
      },
    },
  },
  plugins: [],
}