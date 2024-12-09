import { defineCustomElement } from 'vue'

import MultiLineChart from './components/MultiLineChart'

const MultiLineChartElement = defineCustomElement(MultiLineChart)

customElements.define('multiline-chart', MultiLineChartElement, { shadowRoot: false })
