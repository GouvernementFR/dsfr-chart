import { chartData } from '../assets/data';

export default {
  component: 'bar-chart',
};

export const Vertical = {
  args: chartData.barChart.vertical,
};

export const Horizontal = {
  args: chartData.barChart.horizontal,
};

export const Stacked = {
  args: chartData.barChart.stacked,
};
