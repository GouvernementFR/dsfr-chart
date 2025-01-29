<template>
  <Teleport
    :disabled="!databoxId && !databoxType && databoxSource === 'default'"
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
  </Teleport>
</template>

<script>
import { BarController, BarElement, Chart } from 'chart.js';
import { mixin, configureChartDefaults } from '@/utils/global.js';
import { choosePalette, generateColors } from '@/utils/colors.js';

Chart.register(BarController, BarElement);

export default {
  name: 'BarChart',
  mixins: [mixin],
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
    barSize: {
      type: Number,
      default: undefined,
    },
    date: {
      type: String,
      default: undefined,
    },
    aspectRatio: {
      type: Number,
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
      widgetId: '',
      chartId: '',
      legendLeftMargin: 100,
      datasets: [],
      labels: undefined,
      xparse: [],
      yparse: [],
      nameParse: [],
      tmpColorParse: [],
      colorParse: [],
      colorHover: [],
      isSmall: false,
      legendColors: [],
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
      // Parsing des données
      try {
        this.xparse = JSON.parse(this.x);
        this.yparse = JSON.parse(this.y);
      } catch (error) {
        console.error('Erreur lors du parsing des données x ou y:', error);
        return;
      }

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
        if (tmpNameParse[i] !== undefined) {
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
        barThickness: this.barSize || (this.stacked ? 32 : this.horizontal ? 20 : 32),
        maxBarThickness: 32,
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
        options: {
          indexAxis: this.horizontal ? 'y' : 'x',
          responsive: true,
          aspectRatio: this.aspectRatio,
          scales: {
            x: {
              offset: true, // Remove any offset from the X-axis
              stacked: this.stacked,
              grid: {
                display: false,
                borderColor: 'transparent',
              },
              ticks: {
                beginAtZero: true,
                padding: 15, // Espace supplémentaire autour des étiquettes
              },
            },
            y: {
              stacked: this.stacked,
              offset: true,
              grid: {
                drawTicks: false,
                lineWidth: 1,
              },
              border: {
                dash: [3],
              },
              ticks: {
                beginAtZero: true,
                padding: 5, // Espace supplémentaire autour des étiquettes
              },
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
                  const value = this.datasets[tooltipItems.datasetIndex].data[tooltipItems.dataIndex];
                  return this.convertIntToHuman(value);
                },
                title: (tooltipItems) => {
                  return tooltipItems[0].label;
                },
                labelTextColor: (tooltipItems) => {
                  return this.colorParse[tooltipItems.datasetIndex][tooltipItems.dataIndex];
                },
              },
              external: (context) => {
                // Tooltip Element
                const dom = this.databoxId ? document.getElementById(this.databoxId + '-' + this.databoxType + '-' + this.databoxSource) : this.$el.nextElementSibling;

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

                // Update tooltip content
                const titleLines = tooltipModel.title || [];

                const divDate = tooltipEl.querySelector('.tooltip_header.fr-text--sm.fr-mb-0');
                divDate.innerHTML = titleLines[0];

                const divValue = tooltipEl.querySelector('.tooltip_value');
                divValue.innerHTML = '';

                // Iterate over each data point to set the color and value in the tooltip
                tooltipModel.dataPoints.forEach((dataPoint) => {
                  const datasetIndex = dataPoint.datasetIndex;
                  const index = dataPoint.dataIndex;

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

                let tooltipX = position.left + window.scrollX + tooltipModel.caretX + 10;
                let tooltipY = position.top + window.scrollY + tooltipModel.caretY - 18;

                tooltipEl.style.left = `${tooltipX}px`;
                tooltipEl.style.top = `${tooltipY}px`;
                tooltipEl.style.opacity = 1;
              },
            },
          },
        },
      });
    },
    // eslint-disable-next-line no-unused-vars
    changeColors(theme) {
      this.loadColors();

      // Mise à jour des couleurs dans le graphique
      this.chart.data.datasets.forEach((dataset, i) => {
        dataset.borderColor = this.colorParse[i];
        dataset.backgroundColor = this.colorParse[i];
        dataset.hoverBorderColor = this.colorHover[i];
        dataset.hoverBackgroundColor = this.colorHover[i];
      });

      this.chart.update('none');
    },
  },
};
</script>

<style scoped lang="scss">

</style>
