import { defineCustomElement } from 'vue';

import '@/styles/style.scss';
import '@/styles/DataBox.scss';

import DataBox from '@/components/DataBox.vue';

const DataBoxElement = defineCustomElement(DataBox);

customElements.define('data-box', DataBoxElement, { shadowRoot: false });
