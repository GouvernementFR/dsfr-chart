import { defineCustomElement } from 'vue'

import BarLineChart from './components/BarLineChart'

const BarLineChartElement = defineCustomElement(BarLineChart)

customElements.define('bar-line-chart', BarLineChartElement, { shadowRoot: false })
