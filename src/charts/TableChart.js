import Vue from 'vue'
import TableChart from '../components/TableChart'
import vueCustomElement from 'vue-custom-element'
Vue.config.productionTip = false
Vue.use(vueCustomElement)
Vue.customElement('table-chart', TableChart)
