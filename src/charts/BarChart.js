import Vue from 'vue'

import BarChart from './components/BarChart'

import vueCustomElement from 'vue-custom-element'

Vue.config.productionTip = false

Vue.use(vueCustomElement)

Vue.customElement('bar-chart', BarChart)
