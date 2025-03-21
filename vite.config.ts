import path from 'path'
import {defineConfig, loadEnv} from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig(({mode}) => {
  const env = {...process.env, ...loadEnv(mode, process.cwd())}

  return {
    plugins: [react(), tailwindcss()],
    base: env.VITE_BASE_URL || '/',
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
    worker: {
      format: 'es',
    },
  }
})
