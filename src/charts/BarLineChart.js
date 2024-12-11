import Vue from 'vue'

import BarLineChart from '../components/BarLineChart'

import vueCustomElement from 'vue-custom-element'

Vue.config.productionTip = false

Vue.use(vueCustomElement)

Vue.customElement('bar-line-chart', BarLineChart)
