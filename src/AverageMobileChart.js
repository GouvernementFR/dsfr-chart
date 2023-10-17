import Vue from 'vue'
import AverageMobileChart from './components/AverageMobileChart'
import vueCustomElement from 'vue-custom-element'
Vue.config.productionTip = false
Vue.use(vueCustomElement)
Vue.customElement('average-mobile-chart', AverageMobileChart)