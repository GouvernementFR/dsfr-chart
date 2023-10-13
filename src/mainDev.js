import Vue from 'vue'

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
import WaffleChart from './components/WaffleChart'

import '../node_modules/@gouvfr/dsfr/dist/dsfr.module.min.js'

import vueCustomElement from 'vue-custom-element'

require('../node_modules/@gouvfr/dsfr/dist/dsfr.main.css')
require('../node_modules/@gouvfr/dsfr/dist/utility/utility.main.css')
require('../node_modules/@gouvfr/dsfr/dist/utility/icons/icons-system/icons-system.min.css')

Vue.config.productionTip = false

Vue.use(vueCustomElement)

Vue.customElement('line-chart', LineChart)
Vue.customElement('bar-chart', BarChart)
Vue.customElement('map-chart', MapChart)
Vue.customElement('multiline-chart', MultiLineChart)
Vue.customElement('bar-line-chart', BarLineChart)
Vue.customElement('pie-chart', PieChart)
Vue.customElement('scatter-chart', ScatterChart)
Vue.customElement('map-chart-reg', MapChartReg)
Vue.customElement('gauge-chart', GaugeChart)
Vue.customElement('table-chart', TableChart)
Vue.customElement('radar-chart', RadarChart)
Vue.customElement('waffle-chart', WaffleChart)
