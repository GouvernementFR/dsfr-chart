import Vue from 'vue'
import GaugeChart from '../components/GaugeChart'
import vueCustomElement from 'vue-custom-element'
Vue.config.productionTip = false
Vue.use(vueCustomElement)
Vue.customElement('gauge-chart', GaugeChart)
