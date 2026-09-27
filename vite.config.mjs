import { defineConfig } from 'vite';

export default defineConfig({
  root: 'html',
  base: '/pata-amiga/',
  build: {
    outDir: '../dist',
    emptyOutDir: true
  }
});