/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Christmas-inspired dark theme
        'santa-red': '#c41e3a',
        'pine-green': '#0d5c2e',
        'snow-white': '#f8fafc',
        'night-sky': '#0f172a',
        'gold-star': '#fbbf24',
      },
    },
  },
  plugins: [],
}
