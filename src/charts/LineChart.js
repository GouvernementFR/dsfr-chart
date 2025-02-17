import { defineCustomElement } from 'vue';

import '@/styles/style.scss';

import LineChart from '@/components/LineChart.vue';

const LineChartElement = defineCustomElement(LineChart);

customElements.define('line-chart', LineChartElement, { shadowRoot: false });
