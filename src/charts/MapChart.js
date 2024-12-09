import { defineCustomElement } from 'vue'

import MapChart from './components/MapChart'

const MapChartElement = defineCustomElement(MapChart)

customElements.define('map-chart', MapChartElement, { shadowRoot: false })
