/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#2E4036",   // Moss
        accent: "#CC5833",    // Clay
        cream: "#F2F0E9",     // Cream background
        charcoal: "#1A1A1A",  // Dark text/background
      },
      fontFamily: {
        sans: ["Outfit", "sans-serif"],
        heading: ["Plus Jakarta Sans", "sans-serif"],
        drama: ["Cormorant Garamond", "serif"],
        data: ["IBM Plex Mono", "monospace"],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'laser': 'laser 3s ease-in-out infinite',
      },
      keyframes: {
        laser: {
          '0%, 100%': { transform: 'translateY(0%)', opacity: '0.4' },
          '50%': { transform: 'translateY(100%)', opacity: '1' },
        }
      }
    },
  },
  plugins: [],
}
