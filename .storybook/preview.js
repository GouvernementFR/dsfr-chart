import '../node_modules/@gouvfr/dsfr/dist/dsfr.module.min.js';
import '../node_modules/@gouvfr/dsfr/dist/dsfr.main.min.css';
import '../node_modules/@gouvfr/dsfr/dist/utility/utility.main.min.css';

import '../src/charts/main.js';
import '../src/styles/style.scss';

import { html } from 'lit';

document.addEventListener('DOMContentLoaded', function () {
  if (window.dsfr && window.dsfr.start) {
    window.dsfr.start();
  }
});

/** @type { import('@storybook/web-components').Preview } */
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
