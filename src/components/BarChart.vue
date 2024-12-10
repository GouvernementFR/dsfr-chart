<template>
  <div
    :ref="widgetId"
    class="widget_container fr-grid-row"
  >
    <div class="r_col fr-col-12">
      <div class="chart">
        <!-- Tooltip personnalisé -->
        <div
          class="linechart_tooltip"
          :style="{ opacity: 0, position: 'absolute' }"
        >
          <div class="tooltip_header fr-text--sm fr-mb-0" />
          <div class="tooltip_body">
            <div class="tooltip_value" />
          </div>
        </div>
        <!-- Canvas pour le graphique -->
        <canvas :ref="chartId" />
        <!-- Légende -->

        <div class="chart_legend fr-mb-0 fr-mt-4v">
          <div
            v-for="(item, index) in nameParse"
            :key="item"
            class="flex fr-mt-3v fr-mb-1v"
          >
            <span
              class="legende_dot"
              :style="{ 'background-color': legendColors[index] }"
            />
            <p class="fr-text--sm fr-text--bold fr-ml-1w fr-mb-0">
              {{ capitalize(nameParse[index]) }}
            </p>
          </div>
        </div>
        <!-- Date de mise à jour -->
        <div
          v-if="date !== undefined"
          class="flex fr-mt-1w"
        >
          <p class="fr-text--xs">
            Mise à jour : {{ date }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Chart } from 'chart.js';
import { mixin, choosePalette } from '@/utils/global.js';
import { generateColors } from '@/utils/colors.js';
import { configureChartDefaults } from '@/utils/configureChartDefaults.js';

import annotationPlugin from 'chartjs-plugin-annotation';

Chart.pluginService.register(annotationPlugin);

export default {
  name: 'BarChart',
  mixins: [mixin],
  props: {
    x: {
      type: String,
      required: true,
    },
    y: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      default: undefined,
    },
    stacked: {
      type: [Boolean, String],
      default: false,
    },
    horizontal: {
      type: [Boolean, String],
      default: false,
    },
    barsize: {
      type: Number,
      default: undefined,
    },
    date: {
      type: String,
      default: undefined,
    },
    aspectratio: {
      type: Number,
      default: 1,
    },
    formatdate: {
      type: [Boolean, String],
      default: false,
    },
    selectedPalette: {
      type: String,
      default: '',
    },
    highlightIndex: {
      type: Array,
      default: () => [3, 4],
    },
    isDescendingOrder: {
      type: [Boolean, String],
      default: false, // Default is false; set to true for fixed green-to-red legend order
    },
    unitTooltip: {
      type: String,
      default: '', // Default to an empty string if no unit is specified
    },
  },
  data() {
    return {
      widgetId: '',
      chartId: '',
      chart: undefined,
      legendLeftMargin: 100,
      datasets: [],
      labels: [],
      xparse: [],
      yparse: [],
      nameParse: [],
      tmpColorParse: [],
      colorParse: [],
      colorHover: [],
      typeGraph: '',
      isSmall: false,
      legendColors: [], // Ajoutez cette ligne
    };
  },
  created() {
    configureChartDefaults();
    this.chartId = 'myChart' + Math.floor(Math.random() * 1000);
    this.widgetId = 'widget' + Math.floor(Math.random() * 1000);
  },
  mounted() {
    this.resetData();
    this.createChart();

    this.display = this.$refs[this.widgetId].offsetWidth > 486 ? 'big' : 'small';
    const element = document.documentElement;
    element.addEventListener('dsfr.theme', (e) => {
      if (this.chartId !== '') {
        this.changeColors(e.detail.theme);
      }
    });
    addEventListener('resize', () => {
      this.isSmall = document.documentElement.clientWidth < 767;
    });
  },
  methods: {
    resetData() {
      if (this.chart) {
        this.chart.destroy();
      }
      this.datasets = [];
      this.labels = [];
      this.xparse = [];
      this.yparse = [];
      this.nameParse = [];
      this.tmpColorParse = [];
      this.colorParse = [];
      this.colorHover = [];
    },
    getData() {
      this.typeGraph = this.horizontal ? 'horizontalBar' : 'bar';

      // Parsing des données
      try {
        this.xparse = JSON.parse(this.x);
        this.yparse = JSON.parse(this.y);
      } catch (error) {
        console.error('Erreur lors du parsing des données x ou y:', error);
        return;
      }

      // Parsing des noms de séries
      let tmpNameParse = [];
      if (this.name !== undefined) {
        try {
          tmpNameParse = JSON.parse(this.name);
        } catch (error) {
          console.error('Erreur lors du parsing de name:', error);
        }
      }

      // Assignation des noms de séries
      for (let i = 0; i < this.yparse.length; i++) {
        this.nameParse.push(tmpNameParse[i] !== undefined ? tmpNameParse[i] : 'Série ' + (i + 1));
      }

      // Assignation des labels
      this.labels = this.xparse[0];

      // Chargement des couleurs
      this.loadColors();

      // Préparation des datasets
      this.datasets = this.yparse.map((dataSet, index) => ({
        label: this.nameParse[index],
        data: dataSet,
        backgroundColor: this.colorParse[index],
        borderColor: this.colorParse[index],
        hoverBackgroundColor: this.colorHover[index],
        hoverBorderColor: this.colorHover[index],
        barThickness: this.barsize || (this.stacked ? 32 : this.horizontal ? 20 : 32),
        maxBarThickness: 32, // Définissez une épaisseur maximale pour les barres
      }));
    },
    choosePalette() {
      // Using the refactored choosePalette function from utils
      return choosePalette(this.selectedPalette);
    },
    loadColors() {
      const { colorParse, colorHover, legendColors } = generateColors({
        yparse: this.yparse,
        tmpColorParse: this.tmpColorParse,
        highlightIndex: this.highlightIndex,
        selectedPalette: this.selectedPalette,
        reverseOrder: this.selectedPalette === 'divergentDescending',
      });

      this.colorParse = colorParse;
      this.colorHover = colorHover;
      this.legendColors = legendColors;
    },
    createChart() {
      if (this.chart) this.chart.destroy();

      this.getData();

      const ctx = this.$refs[this.chartId].getContext('2d');

      this.chart = new Chart(ctx, {
        type: this.typeGraph,
        data: {
          labels: this.labels,
          datasets: this.datasets,
        },
        options: {
          responsive: true,
          maintainAspectRatio: true, // Changez à true pour maintenir le ratio
          aspectRatio: 2, // Ajustez ce ratio pour gérer la hauteur/largeur du graphique
          animation: {
            easing: 'easeInOutBack',
            duration: 1000,
          },
          scales: {
            xAxes: [
              {
                offset: true, // Remove any offset from the X-axis
                stacked: this.stacked,
                gridLines: {
                  display: false,
                },
                ticks: {
                  beginAtZero: true,
                  padding: 5, // Espace supplémentaire autour des étiquettes
                },
              },
            ],
            yAxes: [
              {
                stacked: this.stacked,
                offset: true,
                gridLines: {
                  drawTicks: false,
                  zeroLineColor: '#DDDDDD',
                  color: '#DDDDDD',
                  borderDash: [3],
                  lineWidth: 1,
                },
                ticks: {
                  beginAtZero: true,
                  padding: 5, // Espace supplémentaire autour des étiquettes
                },
              },
            ],
          },
          legend: {
            display: false,
          },
          tooltips: {
            enabled: false,
            displayColors: false,
            backgroundColor: '#6b6b6b',
            callbacks: {
              label: (tooltipItems) => {
                const datasetIndex = tooltipItems.datasetIndex;
                const index = tooltipItems.index;
                const value = this.datasets[datasetIndex].data[index];
                return this.convertIntToHuman(value);
              },
              title: (tooltipItems) => tooltipItems[0].label,
              labelTextColor: (tooltipItems) => {
                const datasetIndex = tooltipItems.datasetIndex;
                const index = tooltipItems.index;
                return this.colorParse[datasetIndex][index];
              },
            },
            custom: (tooltipModel) => {
              const tooltipEl = this.$el.querySelector('.linechart_tooltip');

              if (!tooltipEl) return;

              if (!tooltipModel || tooltipModel.opacity === 0) {
                tooltipEl.style.opacity = 0;
                return;
              }

              // Set tooltip position classes
              tooltipEl.classList.remove('above', 'below', 'no-transform');
              if (tooltipModel.yAlign) {
                tooltipEl.classList.add(tooltipModel.yAlign);
              } else {
                tooltipEl.classList.add('no-transform');
              }

              // Update tooltip content
              const titleLines = tooltipModel.title || [];

              const divDate = tooltipEl.querySelector('.tooltip_header.fr-text--sm.fr-mb-0');
              divDate.innerHTML = titleLines[0];

              const divValue = tooltipEl.querySelector('.tooltip_value');
              divValue.innerHTML = '';

              // Iterate over each data point to set the color and value in the tooltip
              tooltipModel.dataPoints.forEach((dataPoint) => {
                const datasetIndex = dataPoint.datasetIndex;
                const index = dataPoint.index;

                // Ensure the color is correctly referenced
                const colorArray = this.colorParse[datasetIndex];
                const color = colorArray ? colorArray[index] : '#000'; // Fallback to black if color is undefined

                const value = this.convertIntToHuman(this.datasets[datasetIndex].data[index]);
                const displayValue = `${value}${this.unitTooltip ? ' ' + this.unitTooltip : ''}`;

                divValue.innerHTML += `
                  <div class="tooltip_value-content" style="display: flex; align-items: center;">
                    <span class="tooltip_dot" style="background-color:${color};"></span>
                    <p class="tooltip_place fr-mb-0">${displayValue}</p>
                  </div>
                `;
              });

              // Position the tooltip
              const position = this.chart.canvas.getBoundingClientRect();
              tooltipEl.style.position = 'absolute';
              tooltipEl.style.pointerEvents = 'none';

              let tooltipX = position.left + window.pageXOffset + tooltipModel.caretX + 10;
              let tooltipY = position.top + window.pageYOffset + tooltipModel.caretY - 18;

              tooltipEl.style.left = `${tooltipX}px`;
              tooltipEl.style.top = `${tooltipY}px`;
              tooltipEl.style.opacity = 1;
            },
          },
        },
      });
    },
    changeColors(theme) {
      Chart.defaults.global.defaultFontColor = this.getHexaFromToken('text-mention-grey', theme);
      this.loadColors();

      if (theme === 'light') {
        this.colorPrecisionBar = '#161616';
      } else {
        this.colorPrecisionBar = '#FFFFFF';
      }

      // Mise à jour des couleurs dans le graphique
      this.chart.data.datasets.forEach((dataset, i) => {
        dataset.borderColor = this.colorParse[i];
        dataset.backgroundColor = this.colorParse[i];
        dataset.hoverBorderColor = this.colorHover[i];
        dataset.hoverBackgroundColor = this.colorHover[i];
      });

      this.chart.update(0);
    },
  },
};
</script>

<style lang="scss">
@import '@/styles/Tooltip.scss';
@import '@/styles/Rcol.scss';
@import '@/styles/WidgetContainer.scss';
</style>
