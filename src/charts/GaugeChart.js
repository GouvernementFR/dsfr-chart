import { defineCustomElement } from 'vue';

import GaugeChart from '@/components/GaugeChart.vue';

const GaugeChartElement = defineCustomElement(GaugeChart);

customElements.define('gauge-chart', GaugeChartElement, { shadowRoot: false });
