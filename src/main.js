import { defineCustomElement } from 'vue';

import LineChart from '@/components/LineChart.vue';
import BarChart from '@/components/BarChart.vue';
import MapChart from '@/components/MapChart.vue';
import MultiLineChart from '@/components/MultiLineChart.vue';
import BarLineChart from '@/components/BarLineChart.vue';
import PieChart from '@/components/PieChart.vue';
import ScatterChart from '@/components/ScatterChart.vue';
import MapChartReg from '@/components/MapChartReg.vue';
import GaugeChart from '@/components/GaugeChart.vue';
import TableChart from '@/components/TableChart.vue';
import RadarChart from '@/components/RadarChart.vue';
import DataBox from '@/components/DataBox.vue';

import '../node_modules/@gouvfr/dsfr/dist/dsfr.module.min.js';

import '../node_modules/@gouvfr/dsfr/dist/dsfr.main.min.css';
import '../node_modules/@gouvfr/dsfr/dist/utility/utility.main.min.css';
import '../node_modules/@gouvfr/dsfr/dist/utility/icons/icons-system/icons-system.min.css';

customElements.define('line-chart', defineCustomElement(LineChart, { shadowRoot: false }));
customElements.define('bar-chart', defineCustomElement(BarChart, { shadowRoot: false }));
customElements.define('map-chart', defineCustomElement(MapChart, { shadowRoot: false }));
customElements.define('multiline-chart', defineCustomElement(MultiLineChart, { shadowRoot: false }));
customElements.define('bar-line-chart', defineCustomElement(BarLineChart, { shadowRoot: false }));
customElements.define('pie-chart', defineCustomElement(PieChart, { shadowRoot: false }));
customElements.define('scatter-chart', defineCustomElement(ScatterChart, { shadowRoot: false }));
customElements.define('map-chart-reg', defineCustomElement(MapChartReg, { shadowRoot: false }));
customElements.define('gauge-chart', defineCustomElement(GaugeChart, { shadowRoot: false }));
customElements.define('table-chart', defineCustomElement(TableChart, { shadowRoot: false }));
customElements.define('radar-chart', defineCustomElement(RadarChart, { shadowRoot: false }));
customElements.define('data-box', defineCustomElement(DataBox, { shadowRoot: false }));
