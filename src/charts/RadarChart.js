import Vue from 'vue'
import RadarChart from '../components/RadarChart'
import vueCustomElement from 'vue-custom-element'
Vue.config.productionTip = false
Vue.use(vueCustomElement)
Vue.customElement('radar-chart', RadarChart)
