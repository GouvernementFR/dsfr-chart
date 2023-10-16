import Vue from 'vue'

import MagicQuadrantChart from './components/MagicQuadrantChart'

import vueCustomElement from 'vue-custom-element'

Vue.config.productionTip = false

Vue.use(vueCustomElement)

Vue.customElement('magic-quadrant-chart', MagicQuadrantChart)
