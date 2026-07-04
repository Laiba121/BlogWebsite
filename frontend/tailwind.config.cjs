module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f6ff',
          100: '#dbe9ff',
          200: '#b7dbff',
          300: '#83c0ff',
          400: '#3a92ff',
          500: '#0b5fff',
          600: '#0a54e6',
          700: '#0843b3',
          800: '#062f80',
          900: '#031a4d'
        },
        secondary: {
          50: '#ecfbfb',
          100: '#d7f6f6',
          300: '#71cfce',
          500: '#008b8b',
          700: '#006a6a'
        },
        tertiary: {
          50: '#fff2ea',
          100: '#ffe6d6',
          400: '#d06b2a',
          500: '#b65318',
          700: '#7a3d10'
        },
        neutral: {
          50: '#f8fafb',
          100: '#f1f5f9',
          300: '#cbd5e1',
          500: '#111827',
          700: '#0b1220',
          900: '#03040a'
        }
      }
    }
  },
  plugins: [],
}
