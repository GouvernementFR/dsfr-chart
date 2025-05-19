import { defineCustomElement } from 'vue';

import '@/styles/style.scss';
import '@/styles/MapChart.scss';

import MapChart from '@/components/MapChart.vue';

const MapChartElement = defineCustomElement(MapChart, { shadowRoot: false });

customElements.define('map-chart', MapChartElement);
