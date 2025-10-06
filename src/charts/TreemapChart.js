import { defineCustomElement } from 'vue';

import '@/styles/style.scss';
import '@/styles/TreemapChart.scss';

import TreemapChart from '@/components/TreemapChart.vue';

const TreemapChartElement = defineCustomElement(TreemapChart, { shadowRoot: false });

customElements.define('treemap-chart', TreemapChartElement);
