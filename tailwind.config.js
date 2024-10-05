/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'custom-bg': "url('/src/assets/background.jpg')", // Path to your image
      },
      colors: {
        'custom-yellow': '#facc15', // Define your custom color
       'custom-blue': 'rgb(21, 95, 250)',
       'custom-red': '#d51e1e', // Define the custom color
       'custom-pink': '#ff1493'
      },

    },
  },
  plugins: [],
}

