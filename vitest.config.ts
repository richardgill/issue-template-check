/// <reference types="vitest" />

import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'

// https://vitejs.dev/config/
export default defineConfig({
  //@ts-ignore
  plugins: [react()],
  test: {
    environment: 'jsdom',
    mockReset: true,
    testTimeout: 10000,
    exclude: ['./e2e/**/*', './node_modules/**/*']
  }
})
