import { defineCustomElement } from 'vue'

import GaugeChart from './components/GaugeChart'

const GaugeChartElement = defineCustomElement(GaugeChart)

customElements.define('gauge-chart', GaugeChartElement, { shadowRoot: false })
