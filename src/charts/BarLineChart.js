import { defineCustomElement } from 'vue';

import BarLineChart from '@/components/BarLineChart.vue';

const BarLineChartElement = defineCustomElement(BarLineChart);

customElements.define('bar-line-chart', BarLineChartElement, { shadowRoot: false });
