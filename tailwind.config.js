/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1E40AF',
          dark: '#1a357a',
          light: '#2a4fc7'
        },
        secondary: {
          DEFAULT: '#FBBF24',
          dark: '#d9a30f',
          light: '#fcd34d'
        },
        background: {
          DEFAULT: '#FAFAF9',
          white: '#FFFFFF',
          dark: '#f5f5f4'
        },
        text: {
          DEFAULT: '#111827',
          muted: '#6b7280',
          light: '#f9fafb'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif']
      }
    },
  },
  plugins: [],
}
