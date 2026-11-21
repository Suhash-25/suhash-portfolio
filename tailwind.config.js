/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: '#0B0F19',
        paper: {
          50: '#FBF9F5',
          100: '#F4EFE6',
          900: '#121826',
          950: '#0D131F'
        },
        slate: {
          850: '#131B2E',
          900: '#0F172A',
          950: '#0B0F19',
        },
        ink: '#18181b',
        sticker: {
          yellow: '#fef08a',
          cyan: '#bae6fd',
          emerald: '#a7f3d0',
          orange: '#fed7aa',
          pink: '#fbcfe8',
          purple: '#ddd6fe'
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
        display: ['Bricolage Grotesque', 'Plus Jakarta Sans', 'sans-serif'],
        handwriting: ['Caveat', 'cursive'],
      },
      boxShadow: {
        'brutal-sm': '2px 2px 0px rgba(15, 23, 42, 0.9)',
        'brutal': '4px 4px 0px rgba(15, 23, 42, 0.9)',
        'brutal-lg': '6px 6px 0px rgba(15, 23, 42, 0.95)',
        'brutal-white': '4px 4px 0px rgba(255, 255, 255, 0.2)',
        'brutal-amber': '4px 4px 0px #d97706',
        'brutal-emerald': '4px 4px 0px #059669',
      }
    },
  },
  plugins: [],
}
