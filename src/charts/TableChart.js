import { defineCustomElement } from 'vue';

import '@/styles/style.scss';
import '@/styles/TableChart.scss';

import TableChart from '@/components/TableChart.vue';

const TableChartElement = defineCustomElement(TableChart, { shadowRoot: false });

customElements.define('table-chart', TableChartElement);
