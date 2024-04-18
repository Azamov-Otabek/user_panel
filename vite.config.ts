import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react(),],
  resolve: {
    alias: [
      { find: '@', replacement: '/src' },
      { find: "@pages", replacement: '/src/pages' },
      { find: "@ui", replacement: '/src/components/ui' },
      { find: "@components", replacement: '/src/components'},
      { find: "@containers", replacement: '/src/components/containers'},
      { find: "@hooks", replacement: '/src/hooks'},
      { find: "@utils", replacement: '/src/utils'},
      { find: "@layout", replacement: '/src/layout'}
    ]
  }
})
