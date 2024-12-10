import { defineCustomElement } from 'vue';

import MultiLineChart from '@/components/MultiLineChart.vue';

const MultiLineChartElement = defineCustomElement(MultiLineChart);

customElements.define('multiline-chart', MultiLineChartElement, { shadowRoot: false });
