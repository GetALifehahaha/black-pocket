/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./App.tsx", "./components/**/*.{js,jsx,ts,tsx}", "./app/**/*.{js,jsx,ts,tsx}",],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: { 
        'main': {
          DEFAULT: '#FFFFFF',
        },
        'dark': {
          DEFAULT: '#0E1726'
        },
        'blue': {
          DEFAULT: '#219FE3'
        },
        'orange': {
          DEFAULT: '#0E1726'
        }
      }
    },
    fontFamily: {
      urbanist: ['Urbanist']
    }
  },
  plugins: [],
}