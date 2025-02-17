import { defineCustomElement } from 'vue';

import '@/styles/style.scss';
import '@/styles/TableChart.scss';

import TableChart from '@/components/TableChart.vue';

const TableChartElement = defineCustomElement(TableChart);

customElements.define('table-chart', TableChartElement, { shadowRoot: false });
