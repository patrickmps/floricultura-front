/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        primary: '#F3F5EE',
        secundary: '#E5E8DE'
      },
      fontFamily: {
        'title': ['Raleway', 'sans-serif'],
        'body': ['Montserrat', 'sans-serif']
      },
      stroke: {
        primary: '#303030'
      },

      strokeWidth: {
        '3': '3px',
      },

      colors: {
        primary: "#303030",
        pink: {
          600: '#DD2576',
          
        }
      },
      width: {
        98: '410px',
        102: '450px'
      },
      
    },
  },
  plugins: [],
}

