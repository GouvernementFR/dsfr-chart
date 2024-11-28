import Vue from 'vue'

import LineChart from './components/LineChart'

import vueCustomElement from 'vue-custom-element'

Vue.config.productionTip = false

Vue.use(vueCustomElement)

Vue.customElement('line-chart', LineChart)
