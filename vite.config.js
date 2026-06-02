import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const BACKEND_URL = 'https://ngo-backend-j2lt.onrender.com'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  define: {
    'import.meta.env.VITE_API_BASE': JSON.stringify(`${BACKEND_URL}/api`),
    'import.meta.env.VITE_SERVER_URL': JSON.stringify(BACKEND_URL),
  },
})
