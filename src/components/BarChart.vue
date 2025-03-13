<template>
  <Teleport
    :disabled="!$el?.ownerDocument.getElementById(databoxId) || (!databoxId && !databoxType && databoxSource === 'default')"
    :to="'#' + databoxId + '-' + databoxType + '-' + databoxSource"
  >
    <div
      :ref="widgetId"
      class="widget_container fr-grid-row"
    >
      <div class="fr-col-12">
        <div class="chart">
          <div class="tooltip">
            <div class="tooltip_header fr-text--sm fr-mb-0" />
            <div class="tooltip_body">
              <div class="tooltip_value" />
            </div>
          </div>

          <canvas :ref="chartId" />

          <div class="chart_legend fr-mb-0 fr-mt-4v">
            <div
              v-for="(item, index) in nameParse"
              :key="index"
              class="flex fr-mt-3v fr-mb-1v"
            >
              <span
                class="legende_dot"
                :style="{ 'background-color': legendColors[index] }"
              />
              <p class="fr-text--sm fr-text--bold fr-ml-1w fr-mb-0">
                {{ capitalize(item) }}
              </p>
            </div>
          </div>

          <div
            v-if="date"
            class="flex fr-mt-1w"
          >
            <p class="fr-text--xs">
              Mise à jour : {{ date }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script>
import { BarController, BarElement, Chart } from 'chart.js';
import { chartMixins, configureChartDefaults } from '@/utils/global.js';
import { choosePalette, generateColors } from '@/utils/colors.js';

Chart.register(BarController, BarElement);

export default {
  name: 'BarChart',
  mixins: [chartMixins],
  props: {
    databoxId: {
      type: String,
      default: null,
    },
    databoxType: {
      type: String,
      default: null,
    },
    databoxSource: {
      type: String,
      default: 'default',
    },
    x: {
      type: String,
      required: true,
    },
    y: {
      type: String,
      required: true,
    },
    xMin: {
      type: [Number, String],
      default: '',
    },
    xMax: {
      type: [Number, String],
      default: '',
    },
    yMin: {
      type: [Number, String],
      default: '',
    },
    yMax: {
      type: [Number, String],
      default: '',
    },
    name: {
      type: String,
      default: '',
    },
    stacked: {
      type: [Boolean, String],
      default: false,
    },
    horizontal: {
      type: [Boolean, String],
      default: false,
    },
    barSize: {
      type: [Number, String],
      default: 'flex',
    },
    maxBarSize: {
      type: [Number, String],
      default: 32,
    },
    date: {
      type: String,
      default: '',
    },
    aspectRatio: {
      type: [Number, String],
      default: 2,
    },
    selectedPalette: {
      type: String,
      default: '',
    },
    highlightIndex: {
      type: Array,
      default: () => [3, 4],
    },
    unitTooltip: {
      type: String,
      default: '',
    },
  },
  data() {
    this.chart = undefined;

    return {
      mounted: false,
      widgetId: '',
      chartId: '',
      datasets: [],
      labels: [],
      xparse: [],
      yparse: [],
      nameParse: [],
      tmpColorParse: [],
      colorParse: [],
      colorHover: [],
      legendColors: [],
      theme: 'light',
    };
  },
  watch: {
    $props: {
      handler() {
        if (!this.mounted) return;
        this.getData();
        this.chart.data.labels = this.labels;
        if (this.datasets.length < this.chart.data.datasets.length) {
          // Delete the extra datasets
          this.chart.data.datasets.splice(this.datasets.length, this.chart.data.datasets.length - this.datasets.length);
        }
        this.datasets.forEach((dataset, i) => {
          if (!this.chart.data.datasets[i]) {
            // Add the dataset if it doesn't exist
            this.chart.data.datasets[i] = {};
          }
          // Update the dataset properties
          this.chart.data.datasets[i].label = dataset.label;
          this.chart.data.datasets[i].data = dataset.data;
          this.chart.data.datasets[i].backgroundColor = dataset.backgroundColor;
          this.chart.data.datasets[i].borderColor = dataset.borderColor;
          this.chart.data.datasets[i].hoverBackgroundColor = dataset.hoverBackgroundColor;
          this.chart.data.datasets[i].hoverBorderColor = dataset.hoverBorderColor;
          this.chart.data.datasets[i].barThickness = dataset.barThickness;
          this.chart.data.datasets[i].maxBarThickness = dataset.maxBarThickness;
        });
        this.chart.options = this.getOptions();
        this.chart.update();
      },
      deep: true,
      immediate: true,
    },
  },
  created() {
    configureChartDefaults();
    this.chartId = 'dsfr-chart-' + Math.floor(Math.random() * 1000);
    this.widgetId = 'dsfr-widget-' + Math.floor(Math.random() * 1000);
  },
  mounted() {
    this.resetData();
    this.createChart();

    this.mounted = true;
    this.display = this.$refs[this.widgetId].offsetWidth > 486 ? 'big' : 'small';
    const element = document.documentElement;
    element.addEventListener('dsfr.theme', (e) => {
      if (this.chartId !== '') {
        this.theme = e.detail.theme;
        this.changeColors();
      }
    });
  },
  methods: {
    resetData() {
      if (this.chart) {
        this.chart.destroy();
      }
      this.mounted = false;
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
      // Parsing des données
      try {
        this.xparse = JSON.parse(this.x);
        this.yparse = JSON.parse(this.y);
      } catch (error) {
        console.error('Erreur lors du parsing des données x ou y:', error);
        return;
      }

      let tmpNameParse = [];
      if (this.name) {
        try {
          tmpNameParse = JSON.parse(this.name);
        } catch (error) {
          console.error('Erreur lors du parsing de name:', error);
        }
      }

      // Assignation des noms de séries
      this.nameParse = [];
      for (let i = 0; i < this.yparse.length; i++) {
        if (tmpNameParse[i]) {
          this.nameParse.push(tmpNameParse[i]);
        } else {
          this.nameParse.push('Série ' + (i + 1));
        }
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
        barThickness: this.barSize,
        ...(this.maxBarSize ? { maxBarThickness: this.maxBarSize } : {}),
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
        type: 'bar',
        data: {
          labels: this.labels,
          datasets: this.datasets,
        },
        options: this.getOptions(),
      });
    },
    changeColors() {
      this.loadColors();

      // Mise à jour des couleurs dans le graphique
      this.chart.data.datasets.forEach((dataset, i) => {
        dataset.borderColor = this.colorParse[i];
        dataset.backgroundColor = this.colorParse[i];
        dataset.hoverBorderColor = this.colorHover[i];
        dataset.hoverBackgroundColor = this.colorHover[i];
      });

      this.chart.options.scales.x.ticks.color = this.theme === 'dark' ? '#cecece' : Chart.defaults.color;
      this.chart.options.scales.y.ticks.color = this.theme === 'dark' ? '#cecece' : Chart.defaults.color;

      this.chart.update('none');
    },
    getOptions() {
      return {
        indexAxis: this.horizontal ? 'y' : 'x',
        aspectRatio: this.aspectRatio,
        scales: {
          x: {
            offset: !this.horizontal,
            stacked: this.stacked,
            grid: {
              drawTicks: false,
              drawOnChartArea: this.horizontal,
            },
            ticks: {
              beginAtZero: true,
              padding: this.horizontal ? 5 : 15,
              color: this.theme === 'dark' ? '#cecece' : Chart.defaults.color,
            },
            ...(this.xMin ? { suggestedMin: this.xMin } : {}),
            ...(this.xMax ? { suggestedMax: this.xMax } : {}),
          },
          y: {
            stacked: this.stacked,
            offset: this.horizontal,
            grid: {
              drawTicks: false,
              drawOnChartArea: !this.horizontal,
            },
            border: {
              dash: [3],
            },
            ticks: {
              beginAtZero: true,
              padding: 5,
              color: this.theme === 'dark' ? '#cecece' : Chart.defaults.color,
            },
            ...(this.yMin ? { suggestedMin: this.yMin } : {}),
            ...(this.yMax ? { suggestedMax: this.yMax } : {}),
          },
        },
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            enabled: false,
            mode: 'index',
            displayColors: false,
            backgroundColor: '#6b6b6b',
            callbacks: {
              label: (tooltipItems) => {
                const value =
                  this.datasets[tooltipItems.datasetIndex].data[
                    tooltipItems.dataIndex
                  ];
                return this.formatNumber(value);
              },
              title: (tooltipItems) => {
                return tooltipItems[0].label;
              },
              labelTextColor: (tooltipItems) => {
                return this.colorParse[tooltipItems.datasetIndex][
                  tooltipItems.dataIndex
                ];
              },
            },
            external: (context) => {
              // Tooltip Element
              const dom =
                document.getElementById(
                  this.databoxId +
                    '-' +
                    this.databoxType +
                    '-' +
                    this.databoxSource
                ) || this.$el.nextElementSibling;

              const tooltipEl = dom.querySelector('.tooltip');

              const tooltipModel = context.tooltip;

              if (!tooltipEl) return;

              // Hide if no tooltip
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

              // Set Text
              if (tooltipModel.body) {
                const titleLines = tooltipModel.title || [];

                const divDate = tooltipEl.querySelector(
                  '.tooltip_header.fr-text--sm.fr-mb-0'
                );
                divDate.innerHTML = titleLines[0];

                const divValue = tooltipEl.querySelector('.tooltip_value');
                divValue.innerHTML = '';

                // Iterate over each data point to set the color and value in the tooltip
                tooltipModel.dataPoints.forEach((dataPoint) => {
                  const datasetIndex = dataPoint.datasetIndex;
                  const index = dataPoint.dataIndex;

                  // Ensure the color is correctly referenced
                  const color = this.colorParse[datasetIndex]
                    ? this.colorParse[datasetIndex][index]
                    : '#000';

                  const value = this.formatNumber(
                    this.datasets[datasetIndex].data[index]
                  );
                  const displayValue = `${value}${
                    this.unitTooltip ? ' ' + this.unitTooltip : ''
                  }`;

                  divValue.innerHTML += `
                    <div class="tooltip_value-content">
                      <span class="tooltip_dot" style="background-color:${color};"></span>
                      <p class="tooltip_place fr-mb-0">${displayValue}</p>
                    </div>
                  `;
                });
              }

              // Position the tooltip
              const { offsetLeft: positionX, offsetTop: positionY } =
                this.chart.canvas;

              const canvasWidth = Number(
                this.chart.canvas.style.width.replace(/\D/g, '')
              );
              const canvasHeight = Number(
                this.chart.canvas.style.height.replace(/\D/g, '')
              );

              let tooltipX = positionX + tooltipModel.caretX + 10;
              let tooltipY = positionY + tooltipModel.caretY - 20;
              if (tooltipX + tooltipEl.clientWidth > positionX + canvasWidth) {
                tooltipX =
                  positionX + tooltipModel.caretX - tooltipEl.clientWidth - 10;
              }
              if (
                tooltipY + tooltipEl.clientHeight >
                positionY + 0.9 * canvasHeight
              ) {
                tooltipY =
                  positionY + tooltipModel.caretY - tooltipEl.clientHeight + 20;
              }
              if (tooltipX < positionX) {
                tooltipX =
                  positionX + tooltipModel.caretX - tooltipEl.clientWidth / 2;
                tooltipY =
                  positionY + tooltipModel.caretY - tooltipEl.clientHeight - 20;
              }

              tooltipEl.style.position = 'absolute';
              tooltipEl.style.padding =
                tooltipModel.padding + 'px ' + tooltipModel.padding + 'px';
              tooltipEl.style.pointerEvents = 'none';
              tooltipEl.style.left = tooltipX + 'px';
              tooltipEl.style.top = tooltipY + 'px';
              tooltipEl.style.opacity = 1;
            },
          },
        },
      };
    },
  },
};
</script>

<style scoped lang="scss">

</style>
