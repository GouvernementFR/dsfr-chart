<template>
  <!-- 
    FIXME: Temporary fix for Teleport issue when databoxId is not found in the DOM.
    This bug is due to the different lifecycle between Chart.js and Chart.js-Treemap.
   -->
  <Teleport
    :disabled="false"
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

          <!-- <div class="chart_legend fr-mb-0 fr-mt-4v">
            <div
              v-for="(item, index) in nameParse"
              :key="index"
              class="flex fr-mt-3v fr-mb-1v"
            >
              <span
                class="legende_dot"
                :style="{ 'background-color': colorParse[index % colorParse.length] }"
              />
              <p class="fr-text--sm fr-text--bold fr-ml-1w fr-mb-0">
                {{ capitalize(item) }}
              </p>
            </div>
          </div> -->

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
import { Chart } from 'chart.js';
import { TreemapController, TreemapElement } from 'chartjs-chart-treemap';
import { chartMixins, configureChartDefaults } from '@/utils/global.js';
import { choosePalette, generateTreemapChartColors } from '@/utils/colors.js';

Chart.register(TreemapController, TreemapElement);

export default {
  name: 'TreemapChart',
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
    tree: {
      type: Array,
      required: true,
    },
    names: {
      type: String,
      default: '',
    },
    value: {
      type: String,
      default: 'value',
    },
    label: {
      type: String,
      default: 'label',
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
    colors: {
      type: Array,
      default: undefined,
    },
    highlightIndex: {
      type: Array,
      default: () => [],
    },
    unitTooltip: {
      type: String,
      default: '',
    },
    borderWidth: {
      type: [Number, String],
      default: 2,
    },
    borderColor: {
      type: String,
      default: '#ffffff',
    },
  },
  data() {
    this.chart = undefined;

    return {
      widgetId: '',
      chartId: '',
      datasets: [],
      dataParse: [],
      nameParse: [],
      colorParse: [],
      colorHover: [],
    };
  },
  watch: {
    $props: {
      handler() {
        // Check if the chart is already created to prevent useless re-renders
        if (this.chartId) {
          this.resetData();
          this.getData();
          this.createChart();
        }
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

    this.display = this.$refs[this.widgetId].offsetWidth > 486 ? 'big' : 'small';
    const element = document.documentElement;
    element.addEventListener('dsfr.theme', (e) => {
      if (this.chartId !== '') {
        this.changeColors(e.detail.theme);
      }
    });
  },
  methods: {
    resetData() {
      if (this.chart) {
        this.chart.destroy();
      }
      this.datasets = [];
      this.dataParse = [];
      this.nameParse = [];
      this.colorParse = [];
      this.colorHover = [];
    },
    getData() {
      // Parsing des données
      try {
        if (typeof this.tree === 'string') {
          console.error("Cette fonctionnalité n'est plus supportée. Veuillez passer la prop 'tree' comme une liste de nombres.");
        }

        this.dataParse = typeof this.tree === 'string' ? JSON.parse(this.tree) : this.tree;
      } catch (error) {
        console.error("Erreur lors du parsing des données de 'tree':", error);
        return;
      }

      // Parsing des données
      try {
        if (typeof this.names === 'string') {
          console.error("Cette fonctionnalité n'est plus supportée. Veuillez passer la prop 'names' comme une liste de strings.");
        }

        this.nameParse = typeof this.names === 'string' ? JSON.parse(this.names) : this.names;
      } catch (error) {
        console.error("Erreur lors du parsing des données de 'names':", error);
        return;
      }

      // Chargement des couleurs
      this.loadColors();

      this.datasets = [{
        tree: this.dataParse,
        labels: {
          display: true,
          font: {
            size: 14,
            weight: 'bold',
            formatter(ctx) {
              const data = ctx.chart.data;
              return `Custom Text: ${data.datasets[ctx.datasetIndex].tree[ctx.dataIndex]}`;
            }
          }
        },
        backgroundColor: (ctx) => {
          const index = ctx.dataIndex;
          return this.colorParse[index % this.colorParse.length];
        },
        hoverBackgroundColor: (ctx) => {
          const index = ctx.dataIndex;
          return this.colorHover[index % this.colorHover.length];
        },
        borderColor: this.borderColor,
        borderWidth: this.borderWidth,
      }];
    },
    loadColors() {
      // Simuler une structure yparse pour la génération des couleurs
      const mockYparse = [this.dataParse.map(item => item[this.value] || item.value)];
      
      const { colorParse, colorHover } = generateTreemapChartColors({
        yparse: mockYparse,
        tmpColorParse: [],
        highlightIndex: this.highlightIndex,
        selectedPalette: this.selectedPalette,
        reverseOrder: this.selectedPalette === 'divergentDescending',
        colors: this.colors,
      });

      this.colorParse = colorParse;
      this.colorHover = colorHover;
    },
    choosePalette() {
      // Using the refactored choosePalette function from utils
      return choosePalette(this.selectedPalette, this.colors);
    },
    createChart() {
      if (this.chart) this.chart.destroy();

      this.getData();

      const ctx = this.$refs[this.chartId].getContext('2d');

      this.chart = new Chart(ctx, {
        type: 'treemap',
        data: {
          datasets: this.datasets,
        },
        options: {
          aspectRatio: this.aspectRatio,
          responsive: true,
          maintainAspectRatio: true,
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
                  return this.formatNumber(value);
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
                const dom = document.getElementById(this.databoxId + '-' + this.databoxType + '-' + this.databoxSource) || this.$el.nextElementSibling;

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
                  // const titleLines = this.nameParse;

                  const divDate = tooltipEl.querySelector('.tooltip_header.fr-text--sm.fr-mb-0');
                  divDate.innerHTML = '';

                  const divValue = tooltipEl.querySelector('.tooltip_value');
                  divValue.innerHTML = '';

                  // Iterate over each data point to set the color and value in the tooltip
                  tooltipModel.dataPoints.forEach((dataPoint) => {
                    const datasetIndex = dataPoint.datasetIndex;
                    const index = dataPoint.dataIndex;

                    // Ensure the color is correctly referenced
                    const color = this.colorParse[index % this.colorParse[datasetIndex].length];

                    const value = this.formatNumber(this.datasets[datasetIndex].data[index]);

                    const displayValue = `${value.v}${this.unitTooltip ? ' ' + this.unitTooltip : ''}`;

                    divValue.innerHTML += `
                    <div class="tooltip_value-content">
                      <span class="tooltip_dot" style="background-color:${color};"></span>
                      <p class="tooltip_place fr-mb-0">${displayValue}</p>
                    </div>
                  `;
                  });
                }

                // Position the tooltip
                const { offsetLeft: positionX, offsetTop: positionY } = this.chart.canvas;

                const canvasWidth = Number(this.chart.canvas.style.width.replace(/\D/g, ''));
                const canvasHeight = Number(this.chart.canvas.style.height.replace(/\D/g, ''));

                let tooltipX = positionX + tooltipModel.caretX + 10;
                let tooltipY = positionY + tooltipModel.caretY - 20;
                if (tooltipX + tooltipEl.clientWidth > positionX + canvasWidth) {
                  tooltipX = positionX + tooltipModel.caretX - tooltipEl.clientWidth - 10;
                }
                if (tooltipY + tooltipEl.clientHeight > positionY + 0.9 * canvasHeight) {
                  tooltipY = positionY + tooltipModel.caretY - tooltipEl.clientHeight + 20;
                }
                if (tooltipX < positionX) {
                  tooltipX = positionX + tooltipModel.caretX - tooltipEl.clientWidth / 2;
                  tooltipY = positionY + tooltipModel.caretY - tooltipEl.clientHeight - 20;
                }

                tooltipEl.style.position = 'absolute';
                tooltipEl.style.padding = tooltipModel.padding + 'px ' + tooltipModel.padding + 'px';
                tooltipEl.style.pointerEvents = 'none';
                tooltipEl.style.left = tooltipX + 'px';
                tooltipEl.style.top = tooltipY + 'px';
                tooltipEl.style.opacity = 1;
              },
            },
          },
        },
      });
    },
    changeColors() {
      this.loadColors();

      // Mise à jour des couleurs dans le graphique
      if (this.chart && this.chart.data.datasets[0]) {
        this.chart.data.datasets[0].backgroundColor = (ctx) => {
          const index = ctx.dataIndex;
          return this.colorParse[index % this.colorParse.length];
        };
        this.chart.data.datasets[0].hoverBackgroundColor = (ctx) => {
          const index = ctx.dataIndex;
          return this.colorHover[index % this.colorHover.length];
        };
      }

      this.chart.update('none');
    },
  },
};
</script>

<style scoped lang="scss">

</style>