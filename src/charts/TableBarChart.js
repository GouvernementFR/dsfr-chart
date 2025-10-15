import { defineCustomElement } from 'vue';

import '@/styles/style.scss';

import TableBarChart from '@/components/TableBarChart.vue';

const TableBarChartElement = defineCustomElement(TableBarChart, { shadowRoot: false });

customElements.define('table-bar-chart', TableBarChartElement);
