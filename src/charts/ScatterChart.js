import { defineCustomElement } from 'vue'

import ScatterChart from './components/ScatterChart'

const ScatterChartElement = defineCustomElement(ScatterChart)

customElements.define('scatter-chart', ScatterChartElement, { shadowRoot: false })
