import { defineCustomElement } from 'vue'

import PieChart from './components/PieChart'

const PieChartElement = defineCustomElement(PieChart)

customElements.define('pie-chart', PieChartElement, { shadowRoot: false })
