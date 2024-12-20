import { defineCustomElement } from 'vue';

import MapChart from '@/components/MapChart.vue';

const MapChartElement = defineCustomElement(MapChart);

customElements.define('map-chart', MapChartElement, { shadowRoot: false });
