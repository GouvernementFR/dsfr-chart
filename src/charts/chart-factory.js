import { defineCustomElement } from 'vue';
import '@/styles/style.scss';

// Configuration simplifiée des composants
const chartsConfig = {
  'bar-chart': () => import('@/components/BarChart.vue'),
  'line-chart': () => import('@/components/LineChart.vue'),
  'pie-chart': () => import('@/components/PieChart.vue'),
  'gauge-chart': () => import('@/components/GaugeChart.vue'),
  'radar-chart': () => import('@/components/RadarChart.vue'),
  'scatter-chart': () => import('@/components/ScatterChart.vue'),
  'treemap-chart': () => import('@/components/TreemapChart.vue'),
  'map-chart': () => import('@/components/MapChart.vue'),
  'map-chart-reg': () => import('@/components/MapChartReg.vue'),
  'table-chart': () => import('@/components/TableChart.vue'),
  'table-bar-chart': () => import('@/components/TableBarChart.vue'),
  'area-line-chart': () => import('@/components/AreaLineChart.vue'),
  'bar-line-chart': () => import('@/components/BarLineChart.vue'),
  'data-box': () => import('@/components/DataBox.vue'),
};

// Styles spécifiques par composant
const stylesMap = {
  'gauge-chart': () => import('@/styles/GaugeChart.scss'),
  'map-chart': () => import('@/styles/MapChart.scss'),
  'map-chart-reg': () => import('@/styles/MapChart.scss'),
  'table-chart': () => import('@/styles/TableChart.scss'),
};

// Fonction utilitaire pour définir un seul composant
export async function defineChart(chartName) {
  if (!chartsConfig[chartName]) {
    console.error(`Chart "${chartName}" not found`);
    return;
  }

  // Vérifier si l'élément est déjà défini
  if (customElements.get(chartName)) {
    console.warn(`Chart "${chartName}" is already defined`);
    return;
  }

  // Charger le style si nécessaire
  if (stylesMap[chartName]) {
    await stylesMap[chartName]();
  }
  
  // Charger le composant
  const componentModule = await chartsConfig[chartName]();
  const component = componentModule.default;
  
  const element = defineCustomElement(component, { shadowRoot: false });
  customElements.define(chartName, element);
}

// Fonction pour définir tous les composants
export async function defineAllCharts() {
  const chartNames = Object.keys(chartsConfig);
  await Promise.all(chartNames.map(defineChart));
}

// Export pour rétrocompatibilité
export { chartsConfig };