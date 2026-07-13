import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    react(),
  ],

  resolve: {
    tsconfigPaths: true,
  },

  test: {
    globals: true,
    environment: 'jsdom',

    setupFiles: ['./vitest.setup.ts'],

    css: true,

    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
    },

    include: [
      'tests/unit/**/*.{test,spec}.{ts,tsx}',
    ],
  },
})