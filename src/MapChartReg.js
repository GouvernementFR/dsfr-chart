import Vue from 'vue'
import MapChartReg from './components/MapChartReg'
import vueCustomElement from 'vue-custom-element'
Vue.config.productionTip = false
Vue.use(vueCustomElement)
Vue.customElement('map-chart-reg', MapChartReg)
