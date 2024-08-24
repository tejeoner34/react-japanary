/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  const config = {
    test: {
      environment: 'jsdom',
      globals: true,
      setupFiles: 'tests/config/setup.ts',
    },
    plugins: [react()],
    base: '/',
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
  };
  if (command !== 'serve') config.base = '/react-japanary/';
  return config;
});
