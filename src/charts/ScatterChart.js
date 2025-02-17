import { defineCustomElement } from 'vue';

import '@/styles/style.scss';

import ScatterChart from '@/components/ScatterChart.vue';

const ScatterChartElement = defineCustomElement(ScatterChart);

customElements.define('scatter-chart', ScatterChartElement, { shadowRoot: false });
