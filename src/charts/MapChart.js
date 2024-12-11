import Vue from 'vue'

import MapChart from '../components/MapChart'

import vueCustomElement from 'vue-custom-element'

Vue.config.productionTip = false

Vue.use(vueCustomElement)

Vue.customElement('map-chart', MapChart)
