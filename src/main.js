import Vue from 'vue'

// import store from './store'
// import { getData } from './import.js'

// import Map from './components/Map'
import LineChart from './components/LineChart'
import BarChart from './components/BarChart'
import MapChart from './components/MapChart'
import MultiLineChart from './components/MultiLineChart'
import BarLineChart from './components/BarLineChart'
import PieChart from './components/PieChart'
import ScatterChart from './components/ScatterChart'

import vueCustomElement from 'vue-custom-element'
// Vue.use(getData(store))

Vue.config.productionTip = false

Vue.use(vueCustomElement)

// Vue.customElement('da-map', Map)
Vue.customElement('line-chart', LineChart)
Vue.customElement('bar-chart', BarChart)
Vue.customElement('map-chart', MapChart)
Vue.customElement('multiline-chart', MultiLineChart)
Vue.customElement('bar-line-chart', BarLineChart)
Vue.customElement('pie-chart', PieChart)
Vue.customElement('scatter-chart', ScatterChart)
