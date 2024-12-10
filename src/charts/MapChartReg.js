import { defineCustomElement } from 'vue';

import MapChartReg from '@/components/MapChartReg.vue';

const MapChartRegElement = defineCustomElement(MapChartReg);

customElements.define('map-chart-reg', MapChartRegElement, { shadowRoot: false });
