/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['Bebas Neue', 'sans-serif'],
        mono: ['Space Mono', 'monospace'],
        serif: ['Cormorant Garamond', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        brand: {
          red: '#c0192c',
          paper: '#f5f2eb',
          ink: '#1a1a1a',
        }
      }
    }
  },
  plugins: [],
}
