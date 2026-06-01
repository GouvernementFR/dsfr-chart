import '@gouvfr/dsfr/dist/dsfr.module.min.js';
import '@gouvfr/dsfr/dist/dsfr.main.min.css';
import '@gouvfr/dsfr/dist/utility/utility.main.min.css';

import '@/charts/main.js';
import '@/styles/style.scss';

import { createApp } from 'vue';
import Documentation from '@/components/doc/Documentation.vue';

document.addEventListener('DOMContentLoaded', () => {
  if (window.dsfr && window.dsfr.start) {
    window.dsfr.start();
  }
});

createApp(Documentation).mount('#app');
