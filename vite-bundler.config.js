import vue from '@vitejs/plugin-vue';
import { join, resolve } from 'path';
import { globSync } from 'node:fs';

/** @type {import('vite').UserConfig} */
export default {
  define: {
    'process.env': {},
  },
  appType: 'custom',
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  publicDir: '',
  build: {
    minify: true,
    outDir: resolve('dist/bundler/'),
    emptyOutDir: true,
    lib: {
      entry: globSync(join(__dirname, 'src/charts/*.js')),
      name: 'DSFRChart',
    },
  },
  plugins: [vue()],
};
