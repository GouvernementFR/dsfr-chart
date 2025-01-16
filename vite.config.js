import vue from '@vitejs/plugin-vue';
import path from 'path';

/** @type {import('vite').UserConfig} */
export default {
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    outDir: 'docs',
    rollupOptions: {
      output: {
        entryFileNames: '[name].min.js',
        assetFileNames: (entry) => {
          if (entry.names[0].match(/\.svg$/)) {
            return 'img/[name].min[extname]';
          } else if (entry.names[0].match(/\.(ttf|otf|woff|woff2)?$/)) {
            return 'fonts/[name][extname]';
          }

          return '[name][extname]';
        },
      },
    },
  },
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag) => ['data-box', 'bar-chart', 'bar-line-chart', 'gauge-chart', 'line-chart', 'map-chart', 'map-chart-reg', 'multiline-chart', 'pie-chart', 'radar-chart', 'scatter-chart', 'table-chart'].includes(tag),
        },
      },
    }),
  ],
};
