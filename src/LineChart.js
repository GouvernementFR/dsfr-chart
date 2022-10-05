import Vue from 'vue'

// import store from './store'
// import { getData } from './import.js'

// import Map from './components/Map'
import LineChart from './components/LineChart'

import vueCustomElement from 'vue-custom-element'
// Vue.use(getData(store))

Vue.config.productionTip = false

Vue.use(vueCustomElement)

// Vue.customElement('da-map', Map)
Vue.customElement('line-chart', LineChart)
