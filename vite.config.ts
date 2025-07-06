import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/shoghlly-platform/', // 👈 لازم نفس اسم الريبو
})
