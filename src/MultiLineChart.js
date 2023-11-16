import Vue from 'vue'

import MultiLineChart from './components/MultiLineChart'

import vueCustomElement from 'vue-custom-element'

Vue.config.productionTip = false

Vue.use(vueCustomElement)

Vue.customElement('multiline-chart', MultiLineChart)
