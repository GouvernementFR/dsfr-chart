import { defineCustomElement } from 'vue'

import TableChart from './components/TableChart'

const TableChartElement = defineCustomElement(TableChart)

customElements.define('table-chart', TableChartElement, { shadowRoot: false })
