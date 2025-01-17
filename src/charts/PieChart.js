import { defineCustomElement } from 'vue';

import '@/styles/style.scss';

import PieChart from '@/components/PieChart.vue';

const PieChartElement = defineCustomElement(PieChart);

customElements.define('pie-chart', PieChartElement, { shadowRoot: false });
