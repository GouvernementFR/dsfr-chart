import '../node_modules/@gouvfr/dsfr/dist/dsfr.module.min.js'
import "../node_modules/@gouvfr/dsfr/dist/dsfr.main.min.css";
import "../node_modules/@gouvfr/dsfr/dist/utility/icons/icons-system/icons-system.min.css";

import "../Charts/dsfr-chart.common.js";
import "../Charts/dsfr-chart.css";
import { html } from 'lit';

document.addEventListener("DOMContentLoaded", function () {
  if (window.dsfr && window.dsfr.start) {
    window.dsfr.start();
  }
});

/** @type { import('@storybook/web-components').Preview } */
const preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [(story) => html`<div class="fr-col-12 fr-col-md-7">${story()}</div>`]
};

export default preview;
