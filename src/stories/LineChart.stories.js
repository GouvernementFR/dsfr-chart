import { chartData } from '../assets/data';

export default {
  component: 'line-chart',
};

export const Default = {
  args: chartData.lineChart.default,
};

export const Multiple = {
  args: chartData.lineChart.multiple,
};
