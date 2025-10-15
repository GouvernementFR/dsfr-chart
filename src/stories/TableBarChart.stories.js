import { chartData } from '../assets/data';

export default {
  component: 'table-bar-chart',
};

export const Vertical = {
  args: chartData.tableBarChart.vertical,
};

export const Horizontal = {
  args: chartData.tableBarChart.horizontal,
};

export const Stacked = {
  args: chartData.tableBarChart.stacked,
};
