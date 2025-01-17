import { defineCustomElement } from 'vue';

import '@/styles/style.scss';
import '@/styles/MapChart.scss';

import MapChart from '@/components/MapChart.vue';

const MapChartElement = defineCustomElement(MapChart);

customElements.define('map-chart', MapChartElement, { shadowRoot: false });
