import Vue from 'vue'

import LineChart from './components/LineChart'
import BarChart from './components/BarChart'
import MapChart from './components/MapChart'
import MultiLineChart from './components/MultiLineChart'
import BarLineChart from './components/BarLineChart'
import PieChart from './components/PieChart'
import ScatterChart from './components/ScatterChart'

import vueCustomElement from 'vue-custom-element'

require('../node_modules/@gouvfr/dsfr/dist/dsfr.min.css')
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
