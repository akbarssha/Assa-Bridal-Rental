import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
export default defineConfig({
  content: [ "./index.html",
  "./src/components/Bridecollection.jsx",
  "./src/components/Footer.jsx",
  "./src/components/Header.jsx",
],
  theme: {
    extend: {
       fontFamily: {
      poppins: ['Poppins', 'sans-serif'],
    },
    },
  },
  plugins: [
    tailwindcss(),react()
  ],
})