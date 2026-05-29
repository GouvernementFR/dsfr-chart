import '@gouvfr/dsfr/dist/dsfr.module.min.js';
import '@gouvfr/dsfr/dist/dsfr.main.min.css';
import '@gouvfr/dsfr/dist/utility/utility.main.min.css';

import '@/charts/main.js';
import '@/styles/style.scss';

import { html } from 'lit';

document.addEventListener('DOMContentLoaded', function () {
  if (window.dsfr && window.dsfr.start) {
    window.dsfr.start();
  }
});

/** @type { import('@storybook/web-components-vite').Preview } */
export default {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [(story) => html`<div class="fr-col-12 fr-col-md-7">${story()}</div>`],
};
