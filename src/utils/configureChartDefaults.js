import { Chart } from 'chart.js';

export const configureChartDefaults = () => {
  Chart.defaults.global.defaultFontFamily = 'Marianne';
  Chart.defaults.global.defaultFontSize = 12;
  Chart.defaults.global.defaultLineHeight = 1.66;
  Chart.defaults.global.defaultFontColor = '#DDDDDD';
};
