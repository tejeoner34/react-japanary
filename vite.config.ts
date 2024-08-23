/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: 'tests/config/setup.ts',
  },
  plugins: [react()],
  base: '/react-japanary/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
