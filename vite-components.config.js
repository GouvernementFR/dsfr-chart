import vue from '@vitejs/plugin-vue';
import path from 'path';

const library = process.env.LIBRARY || 'DSFRChart';

/** @type {import('vite').UserConfig} */
export default {
  appType: 'custom',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  publicDir: '',
  build: {
    outDir: library,
    emptyOutDir: true,
    lib: {
      entry: library === 'DSFRChart' ? `src/charts/main.js` : `src/charts/${library}.js`,
      name: library,
      fileName: library,
    },
  },
  plugins: [vue()],
};
