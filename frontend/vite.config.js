// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  plugins: [react()],
  resolve: {
    dedupe: ['react', 'react-dom'] // Importante para React 19
  },
  optimizeDeps: {
    include: ['react', 'react-dom'] // Garante que sejam incluídos corretamente
  }
})