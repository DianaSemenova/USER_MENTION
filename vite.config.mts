import path from 'path';

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  resolve: {
    alias: [{ find: 'src', replacement: path.resolve(__dirname, './src') }],
  },
  plugins: [react()],
  build: {
    outDir: 'build',
  },
  server: {
    open: true,
    port: 3000,
  },
  css: {
    preprocessorOptions: {
      scss: {},
    },
  },
});
