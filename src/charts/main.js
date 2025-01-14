import { defineCustomElement } from 'vue';

import '@/styles/style.scss';

import DataBox from '@/components/DataBox.vue';

import BarChart from '@/components/BarChart.vue';
import BarLineChart from '@/components/BarLineChart.vue';
import GaugeChart from '@/components/GaugeChart.vue';
import LineChart from '@/components/LineChart.vue';
import MapChart from '@/components/MapChart.vue';
import MapChartReg from '@/components/MapChartReg.vue';
import MultiLineChart from '@/components/MultiLineChart.vue';
import PieChart from '@/components/PieChart.vue';
import RadarChart from '@/components/RadarChart.vue';
import ScatterChart from '@/components/ScatterChart.vue';
import TableChart from '@/components/TableChart.vue';

customElements.define('data-box', defineCustomElement(DataBox, { shadowRoot: false }));

customElements.define('bar-chart', defineCustomElement(BarChart, { shadowRoot: false }));
customElements.define('bar-line-chart', defineCustomElement(BarLineChart, { shadowRoot: false }));
customElements.define('gauge-chart', defineCustomElement(GaugeChart, { shadowRoot: false }));
customElements.define('line-chart', defineCustomElement(LineChart, { shadowRoot: false }));
customElements.define('map-chart-reg', defineCustomElement(MapChartReg, { shadowRoot: false }));
customElements.define('map-chart', defineCustomElement(MapChart, { shadowRoot: false }));
customElements.define('multiline-chart', defineCustomElement(MultiLineChart, { shadowRoot: false }));
customElements.define('pie-chart', defineCustomElement(PieChart, { shadowRoot: false }));
customElements.define('radar-chart', defineCustomElement(RadarChart, { shadowRoot: false }));
customElements.define('scatter-chart', defineCustomElement(ScatterChart, { shadowRoot: false }));
customElements.define('table-chart', defineCustomElement(TableChart, { shadowRoot: false }));
