import { defineCustomElement } from 'vue';

import '@/styles/style.scss';

import BarLineChart from '@/components/BarLineChart.vue';

const BarLineChartElement = defineCustomElement(BarLineChart);

customElements.define('bar-line-chart', BarLineChartElement, { shadowRoot: false });
