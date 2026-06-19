/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'ibm-blue': '#0f62fe',
        'ibm-blue-light': '#4589ff',
        'ibm-blue-dark': '#0043ce',
        'ibm-dark': '#161616',
        'ibm-dark-light': '#262626',
        'ibm-dark-lighter': '#393939',
        'accent-gold': '#ffd700',
        'accent-silver': '#c0c0c0',
        'accent-bronze': '#cd7f32',
        'accent-green': '#24a148',
        'accent-red': '#da1e28',
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(15, 98, 254, 0.1)',
        'glass-lg': '0 12px 48px 0 rgba(15, 98, 254, 0.2)',
        'neon': '0 0 20px rgba(15, 98, 254, 0.5), 0 0 40px rgba(15, 98, 254, 0.3)',
      },
      animation: {
        'rank-up': 'bounce 0.5s ease-in-out',
        'rank-down': 'bounce 0.5s ease-in-out',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}

// Made with Bob
