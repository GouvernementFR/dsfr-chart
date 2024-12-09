import { defineCustomElement } from 'vue'

import BarChart from './components/BarChart'

const BarChartElement = defineCustomElement(BarChart)

customElements.define('bar-chart', BarChartElement, { shadowRoot: false })
