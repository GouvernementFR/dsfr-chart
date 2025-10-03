import { defineCustomElement } from 'vue';

import '@/styles/style.scss';

import AreaLineChart from '@/components/AreaLineChart.vue';

const AreaLineChartElement = defineCustomElement(AreaLineChart, { shadowRoot: false });

customElements.define('area-line-chart', AreaLineChartElement);
