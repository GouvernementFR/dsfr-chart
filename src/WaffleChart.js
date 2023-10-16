import Vue from 'vue'
import WaffleChart from './components/WaffleChart'
import vueCustomElement from 'vue-custom-element'
Vue.config.productionTip = false
Vue.use(vueCustomElement)
Vue.customElement('waffle-chart', WaffleChart)