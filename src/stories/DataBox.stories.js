import { html } from 'lit';

import { chartData } from '../assets/data';

export default {
  component: 'data-box',
  argTypes: {
    date: {
      control: 'text',
    }
  }
};

const scatterData = JSON.parse(chartData.scatterChart.linked.y);

const defaultScatterData = JSON.stringify(scatterData);
const sortedScatterData = JSON.stringify(scatterData.map((arr) => arr.sort((a, b) => a - b)));
const reversedScatterData = JSON.stringify(scatterData.map((arr) => arr.reverse()));

const tableParse = (data) => JSON.stringify(JSON.parse(data)[0]);

export const Simple = {
  args: chartData.dataBox.simple,
  render: (args) => html`
    <data-box
      id="${args.id}"
      title="${args.title}"
      tooltip-title="${args.tooltipTitle}"
      tooltip-content="${args.tooltipContent}"
      modal-title="${args.modalTitle}"
      modal-content="${args.modalContent}"
      source="${args.source}"
      date="${args.date}"
      trend="${args.trend}"
    >
    </data-box>
    <pie-chart
      databox-id="${args.id}"
      databox-type="chart"
      x="${chartData.pieChart.doughnut.x}"
      y="${chartData.pieChart.doughnut.y}"
      name="${chartData.pieChart.doughnut.name}"
      unit-tooltip="${chartData.pieChart.doughnut.unitTooltip}"
    >
    </pie-chart>
    <table-chart
      databox-id="${args.id}"
      databox-type="table"
      x="${tableParse(chartData.pieChart.doughnut.x)}"
      y="${chartData.pieChart.doughnut.y}"
      name='["Pourcentage"]'
      table-name="Catégories"
    >
    </table-chart>
  `
};

export const Complete = {
  args: chartData.dataBox.complete,
  render: (args) => html`
    <data-box
      id="${args.id}"
      title="${args.title}"
      tooltip-title="${args.tooltipTitle}"
      tooltip-content="${args.tooltipContent}"
      modal-title="${args.modalTitle}"
      modal-content="${args.modalContent}"
      source="${args.source}"
      date="${args.date}"
      trend="${args.trend}"
      segmented-control="${args.segmentedControl}"
      screenshot="${args.screenshot}"
      download="${args.download}"
      fullscreen="${args.fullscreen}"
      actions="${JSON.stringify(args.actions)}"
    >
    </data-box>
    <scatter-chart
      databox-id="${args.id}"
      databox-type="chart"
      databox-source="insee"
      x="${chartData.scatterChart.linked.x}"
      y="${defaultScatterData}"
      name="${chartData.scatterChart.linked.name}"
      show-line="${chartData.scatterChart.linked.showLine}"
      unit-tooltip="${chartData.scatterChart.linked.unitTooltip}"
    >
    </scatter-chart>
    <scatter-chart
      databox-id="${args.id}"
      databox-type="chart"
      databox-source="pole-emploi"
      x="${chartData.scatterChart.linked.x}"
      y="${sortedScatterData}"
      name="${chartData.scatterChart.linked.name}"
      show-line="${chartData.scatterChart.linked.showLine}"
      unit-tooltip="${chartData.scatterChart.linked.unitTooltip}"
    >
    </scatter-chart>
    <scatter-chart
      databox-id="${args.id}"
      databox-type="chart"
      databox-source="autre"
      x="${chartData.scatterChart.linked.x}"
      y="${reversedScatterData}"
      name="${chartData.scatterChart.linked.name}"
      show-line="${chartData.scatterChart.linked.showLine}"
      unit-tooltip="${chartData.scatterChart.linked.unitTooltip}"
    >
    </scatter-chart>
    <table-chart
      databox-id="${args.id}"
      databox-type="table"
      databox-source="insee"
      x="${tableParse(chartData.scatterChart.linked.x)}"
      y="${defaultScatterData}"
      name="${chartData.scatterChart.linked.name}"
      table-name="Années INSEE"
    >
    </table-chart>
    <table-chart
      databox-id="${args.id}"
      databox-type="table"
      x="${tableParse(chartData.scatterChart.linked.x)}"
      y="${reversedScatterData}"
      table-name="Années"
    >
    </table-chart>
  `
};
