import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/grzeszuk/', // Tutaj wpisujesz dokładną nazwę swojego repozytorium z ukośnikami
})