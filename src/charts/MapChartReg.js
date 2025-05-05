import { defineCustomElement } from 'vue';

import '@/styles/style.scss';
import '@/styles/MapChart.scss';

import MapChartReg from '@/components/MapChartReg.vue';

const MapChartRegElement = defineCustomElement(MapChartReg, { shadowRoot: false });

customElements.define('map-chart-reg', MapChartRegElement);
