import { defineCustomElement } from 'vue';

import '@/styles/style.scss';

import MultiLineChart from '@/components/MultiLineChart.vue';

const MultiLineChartElement = defineCustomElement(MultiLineChart);

customElements.define('multiline-chart', MultiLineChartElement, { shadowRoot: false });
