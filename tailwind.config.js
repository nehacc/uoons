/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      width: {
        'custom': 'calc(100vw - 350px)',
      },
      colors: {
        primary: "#fea928",
        secondary: "#ed8900",
      },
      container: {
        
        center: true,
        padding: {
          DEFAULT: "1rem",
          sm: "3rem",
        },
      },
    },
  },
  
  plugins: [],
}

