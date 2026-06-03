import { URL, fileURLToPath } from 'node:url';
import process from 'node:process';

import vue from '@vitejs/plugin-vue';

const library = process.env.LIBRARY || 'DSFRChart';

/** @type {import('vite').UserConfig} */
export default {
  appType: 'custom',
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  define: {
    'process.env.NODE_ENV': JSON.stringify('production'),
  },
  publicDir: '',
  build: {
    minify: true,
    outDir: fileURLToPath(new URL(`dist/${library}`, import.meta.url)),
    emptyOutDir: true,
    lib: {
      entry: library === 'DSFRChart' ? 'src/charts/main.js' : `src/charts/${library}.js`,
      name: library,
      fileName: library,
    },
  },
  plugins: [vue()],
};
