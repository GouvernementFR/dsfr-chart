import Vue from 'vue'

import PieChart from '../components/PieChart'

import vueCustomElement from 'vue-custom-element'

Vue.config.productionTip = false

Vue.use(vueCustomElement)

Vue.customElement('pie-chart', PieChart)
