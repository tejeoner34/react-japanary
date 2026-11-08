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
  server: {
    proxy: {
      '/proxy/jisho': {
        target: 'https://jisho.org',
        changeOrigin: true,
        rewrite: (requestPath) => requestPath.replace(/^\/proxy\/jisho/, '/api/v1/search/words'),
      },
      '/proxy/tatoeba': {
        target: 'https://tatoeba.org',
        changeOrigin: true,
        rewrite: (requestPath) => requestPath.replace(/^\/proxy\/tatoeba/, '/en/api_v0/search'),
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
