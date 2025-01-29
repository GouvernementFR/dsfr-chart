import { defineCustomElement } from 'vue';

import '@/styles/style.scss';
import '@/styles/GaugeChart.scss';

import GaugeChart from '@/components/GaugeChart.vue';

const GaugeChartElement = defineCustomElement(GaugeChart);

customElements.define('gauge-chart', GaugeChartElement, { shadowRoot: false });
