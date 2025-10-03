import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: "/Pickup-Sports-Client/", // This line was missing
  plugins: [react()],
})