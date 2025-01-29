import { html } from 'lit';

import { Default as PieChart } from './PieChart.stories';

const meta = {
  component: 'data-box',
  args: {
    segmentedControl: true,
    screenshot: true,
    download: true,
    fullscreen: true,
    modalTitle: 'Titre de la modale',
    modalContent: 'Contenu de la modale',
    id: 'storybook-databox',
    date: '04/11/2024'
  },
  argTypes: {
    date: {
      control: 'text'
    }
  }
};

export default meta;

export const Single = {
  args: {
    title: 'Statut des emplois en France en 2018',
    tooltipTitle: 'Statut des emplois en France',
    tooltipContent: "Pour l'année 2018. France hors Mayotte, population des ménages, personnes en emploi.",
    source: 'Insee, enquête Emploi',
    trend: '-15%'
  },
  render: (args) => html`
    <data-box
      id="${args.id}"
      title="${args.title}"
      tooltip-title="${args.tooltipTitle}"
      tooltip-content="${args.tooltipContent}"
      source="${args.source}"
      date="${args.date}"
      trend="${args.trend}"
      segmented-control="${args.segmentedControl}"
      screenshot="${args.screenshot}"
      download="${args.download}"
      fullscreen="${args.fullscreen}"
      modal-title="${args.modalTitle}"
      modal-content="${args.modalContent}"
    >
    </data-box>
    <pie-chart
      databox-id="${args.id}"
      databox-type="chart"
      x="${PieChart.args.x}"
      y="${PieChart.args.y}"
      name="${PieChart.args.name}"
      unit-tooltip="${PieChart.args.unitTooltip}"
    >
    </pie-chart>
    <table-chart
      databox-id="${args.id}"
      databox-type="table"
      x="${PieChart.args.name}"
      y="${PieChart.args.y}"
      name="${PieChart.args.name}"
      table-name="Catégories"
    >
    </table-chart>
  `
};

export const Multiple = {
  args: {
    title: 'Emplois en France de 1926 à 1950',
    tooltipTitle: 'Emplois en France',
    tooltipContent: "Nombre d'emplois en France de 1926 à 1950, par genre. Se base sur les données de l'INSEE et de Pôle Emploi et d'une autre source.",
    source: 'INSEE, Pôle Emploi, Autre source',
    trend: '+15 points'
  },
  render: (args) => html`
    <data-box
      id="${args.id}"
      title="${args.title}"
      tooltip-title="${args.tooltipTitle}"
      tooltip-content="${args.tooltipContent}"
      source="${args.source}"
      date="${args.date}"
      trend="${args.trend}"
      segmented-control="${args.segmentedControl}"
      screenshot="${args.screenshot}"
      download="${args.download}"
      fullscreen="${args.fullscreen}"
      modal-title="${args.modalTitle}"
      modal-content="${args.modalContent}"
    >
    </data-box>
    <scatter-chart
      databox-id="${args.id}"
      databox-type="chart"
      databox-source="insee"
      x="[[1926, 1928, 1930, 1932, 1934, 1936, 1938, 1940, 1942, 1944, 1946, 1948, 1950], [1926, 1928, 1930, 1932, 1934, 1936, 1938, 1940, 1942, 1944, 1946, 1948, 1950], [1926, 1928, 1930, 1932, 1934, 1936, 1938, 1940, 1942, 1944, 1946, 1948, 1950]]"
      y="[[35, 35, 37, 37, 39, 41, 43, 48, 51, 52, 54, 55, 56], [76, 83, 82, 80, 81, 80, 81, 80, 81, 80, 79, 75, 72], [54, 56, 58, 57, 59, 60, 62, 64, 66, 66, 66, 65, 64]]"
      name='["Femmes", "Hommes", "Ensemble"]'
      unit-tooltip="%"
      show-line="true"
    >
    </scatter-chart>
    <scatter-chart
      databox-id="${args.id}"
      databox-type="chart"
      databox-source="pole-emploi"
      x="[[1926, 1928, 1930, 1932, 1934, 1936, 1938, 1940, 1942, 1944, 1946, 1948, 1950], [1926, 1928, 1930, 1932, 1934, 1936, 1938, 1940, 1942, 1944, 1946, 1948, 1950], [1926, 1928, 1930, 1932, 1934, 1936, 1938, 1940, 1942, 1944, 1946, 1948, 1950]]"
      y="[[48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60], [61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73], [55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67]]"
      name='["Femmes", "Hommes", "Ensemble"]'
      unit-tooltip="%"
      show-line="true"
    >
    </scatter-chart>
    <scatter-chart
      databox-id="${args.id}"
      databox-type="chart"
      databox-source="autre"
      x="[[1926, 1928, 1930, 1932, 1934, 1936, 1938, 1940, 1942, 1944, 1946, 1948, 1950], [1926, 1928, 1930, 1932, 1934, 1936, 1938, 1940, 1942, 1944, 1946, 1948, 1950], [1926, 1928, 1930, 1932, 1934, 1936, 1938, 1940, 1942, 1944, 1946, 1948, 1950]]"
      y="[[67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79], [40, 39, 38, 37, 36, 35, 34, 33, 32, 31, 30, 29, 28], [38, 42, 39, 43, 40, 44, 41, 45, 42, 46, 43, 47, 44]]"
      name='["Femmes", "Hommes", "Ensemble"]'
      unit-tooltip="%"
      show-line="true"
    >
    </scatter-chart>
    <table-chart
      databox-id="${args.id}"
      databox-type="table"
      databox-source="insee"
      x="[1926, 1928, 1930, 1932, 1934, 1936, 1938, 1940, 1942, 1944, 1946, 1948, 1950]"
      y="[[48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60], [61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73], [55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67]]"
      name='["Femmes", "Hommes", "Ensemble"]'
      table-name="Années INSEE"
    >
    </table-chart>
    <table-chart
      databox-id="${args.id}"
      databox-type="table"
      x="[1926, 1928, 1930, 1932, 1934, 1936, 1938, 1940, 1942, 1944, 1946, 1948, 1950]"
      y="[[35, 35, 37, 37, 39, 41, 43, 48, 51, 52, 54, 55, 56], [76, 83, 82, 80, 81, 80, 81, 80, 81, 80, 79, 75, 72], [54, 56, 58, 57, 59, 60, 62, 64, 66, 66, 66, 65, 64]]"
      name='["Femmes", "Hommes", "Ensemble"]'
      table-name="Années"
    >
    </table-chart>
  `
};
