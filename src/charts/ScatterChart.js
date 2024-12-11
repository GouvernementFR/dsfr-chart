import Vue from 'vue'

import ScatterChart from '../components/ScatterChart'

import vueCustomElement from 'vue-custom-element'

Vue.config.productionTip = false

Vue.use(vueCustomElement)

Vue.customElement('scatter-chart', ScatterChart)
