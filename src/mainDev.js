import { defineCustomElement } from 'vue'

import LineChart from './components/LineChart'
import BarChart from './components/BarChart'
import MapChart from './components/MapChart'
import MultiLineChart from './components/MultiLineChart'
import BarLineChart from './components/BarLineChart'
import PieChart from './components/PieChart'
import ScatterChart from './components/ScatterChart'
import MapChartReg from './components/MapChartReg'
import GaugeChart from './components/GaugeChart'
import TableChart from './components/TableChart'
import RadarChart from './components/RadarChart'
import DataBox from './components/DataBox.vue'

import '../node_modules/@gouvfr/dsfr/dist/dsfr.module.min.js'

import '../node_modules/@gouvfr/dsfr/dist/dsfr.main.min.css'
import '../node_modules/@gouvfr/dsfr/dist/utility/utility.main.min.css'
import '../node_modules/@gouvfr/dsfr/dist/utility/icons/icons-system/icons-system.min.css'

customElements.define('line-chart', defineCustomElement(LineChart, { shadowRoot: false }))
customElements.define('bar-chart', defineCustomElement(BarChart, { shadowRoot: false }))
customElements.define('map-chart', defineCustomElement(MapChart, { shadowRoot: false }))
customElements.define('multiline-chart', defineCustomElement(MultiLineChart, { shadowRoot: false }))
customElements.define('bar-line-chart', defineCustomElement(BarLineChart, { shadowRoot: false }))
customElements.define('pie-chart', defineCustomElement(PieChart, { shadowRoot: false }))
customElements.define('scatter-chart', defineCustomElement(ScatterChart, { shadowRoot: false }))
customElements.define('map-chart-reg', defineCustomElement(MapChartReg, { shadowRoot: false }))
customElements.define('gauge-chart', defineCustomElement(GaugeChart, { shadowRoot: false }))
customElements.define('table-chart', defineCustomElement(TableChart, { shadowRoot: false }))
customElements.define('radar-chart', defineCustomElement(RadarChart, { shadowRoot: false }))
customElements.define('data-box', defineCustomElement(DataBox, { shadowRoot: false }))
