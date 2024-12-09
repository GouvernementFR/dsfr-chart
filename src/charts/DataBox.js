import { defineCustomElement } from 'vue'

import DataBox from './components/DataBox.vue'

const DataBoxElement = defineCustomElement(DataBox)

customElements.define('data-box', DataBoxElement, { shadowRoot: false })
