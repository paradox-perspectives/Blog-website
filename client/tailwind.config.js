/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        merriweather: ['Merriweather', 'serif'],
        arial: ['Arial', 'sans-serif'],
        cambria: ['Cambria', 'Times New Roman', 'serif']
      }
    }
  },
  plugins: [],
}

