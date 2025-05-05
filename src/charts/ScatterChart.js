import { defineCustomElement } from 'vue';

import '@/styles/style.scss';

import ScatterChart from '@/components/ScatterChart.vue';

const ScatterChartElement = defineCustomElement(ScatterChart, { shadowRoot: false });

customElements.define('scatter-chart', ScatterChartElement);
