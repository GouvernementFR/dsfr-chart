import { defineCustomElement } from 'vue';

import '@/styles/style.scss';

import RadarChart from '@/components/RadarChart.vue';

const RadarChartElement = defineCustomElement(RadarChart);

customElements.define('radar-chart', RadarChartElement, { shadowRoot: false });
