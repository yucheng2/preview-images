import tailwindcss from '@tailwindcss/vite'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import electron from 'vite-plugin-electron/simple'

export default defineConfig({
  plugins: [
    vue(),
    tailwindcss(),
    electron({
      main: {
        entry: 'electron/main.ts',
      },
      preload: {
        input: 'electron/preload.ts',
      },
    }),
  ],
})
