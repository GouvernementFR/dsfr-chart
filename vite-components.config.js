import vue from '@vitejs/plugin-vue';
import path from 'path';

// eslint-disable-next-line no-undef
const library = process.env.LIBRARY || 'DSFRChart';

/** @type {import('vite').UserConfig} */
export default {
  define: {
    'process.env': {},
  },
  appType: 'custom',
  resolve: {
    alias: {
      // eslint-disable-next-line no-undef
      '@': path.resolve(__dirname, './src'),
    },
  },
  publicDir: '',
  build: {
    minify: true,
    outDir: path.resolve('dist/' + library),
    emptyOutDir: true,
    lib: {
      entry: library === 'DSFRChart' ? 'src/charts/main.js' : `src/charts/${library}.js`,
      name: library,
      fileName: library,
    },
  },
  plugins: [vue()],
};
