import Vue from 'vue'

import DataBox from './components/DataBox.vue'

import vueCustomElement from 'vue-custom-element'

Vue.config.productionTip = false

Vue.use(vueCustomElement)

Vue.customElement('data-box', DataBox)