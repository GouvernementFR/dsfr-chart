<template>
  <ChartShell
    :databox-id="databoxId"
    :databox-type="databoxType"
    :databox-source="databoxSource"
    :widget-id="widgetId"
    :chart-id="chartId"
    :name-parse="nameParse"
    :color-parse="legendColors"
    :date="date"
  >
    <template #canvas>
      <canvas :ref="chartId" />
    </template>
    <!-- default legend provided by ChartShell is fine, it uses provided legendColors -->
  </ChartShell>
</template>

<script>
import { BarController, BarElement, Chart } from 'chart.js';
import { chartMixins, generateChartIds, setupThemeListener } from '@/utils/global.js';
import { choosePalette, generateColors } from '@/utils/colors.js';
import ChartShell from '@/components/ChartShell.vue';
import { externalTooltip } from '@/utils/externalTooltip.js';

Chart.register(BarController, BarElement);

export default {
  name: 'BarChart',
  components: { ChartShell },
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
      type: Array,
      required: true,
    },
    y: {
      type: Array,
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
    pointValues: {
      type: Array,
      default: () => [],
    },
    pointColor: {
      type: String,
      default: '#000',
    },
    pointRadius: {
      type: Number,
      default: 5,
    },
  },
  data() {
    this.chart = undefined;

    return {
      widgetId: '',
      chartId: '',
      datasets: [],
      labels: [],
      xparse: [],
      yparse: [],
      pvparse: [],
      nameParse: [],
      tmpColorParse: [],
      colorParse: [],
      colorHover: [],
      legendColors: [],
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
    generateChartIds.call(this);
  },
  mounted() {
    setupThemeListener.call(this);
    this.resetData();
    this.createChart();

    this.display = (this.$refs[this.widgetId] && (this.$refs[this.widgetId].offsetWidth || (this.$refs[this.widgetId].$el && this.$refs[this.widgetId].$el.offsetWidth)))
      ? (this.$refs[this.widgetId].offsetWidth || this.$refs[this.widgetId].$el.offsetWidth) > 486 ? 'big' : 'small'
      : 'small';
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
      this.pvparse = [];
      this.nameParse = [];
      this.tmpColorParse = [];
      this.colorParse = [];
      this.colorHover = [];
    },
    getData() {
      // Parsing des données
      try {
        if (typeof this.x === 'string' || typeof this.y === 'string') {
          console.error("Cette fonctionnalité n'est plus supportée. Veuillez passer les props 'x' et 'y' comme une liste de nombres.");
        }
        // On gère la legacy où x et y pouvaient être passés en string
        this.xparse = typeof this.x === 'string' ? JSON.parse(this.x) : this.x;
        this.yparse = typeof this.y === 'string' ? JSON.parse(this.y) : this.y;
        this.pvparse = typeof this.pointValues === 'string' ? JSON.parse(this.pointValues) : this.pointValues;

        if (!Array.isArray(this.xparse) || !Array.isArray(this.xparse[0])) {
          throw new Error("La prop 'x' doit être une liste de listes.");
        }
        if (!Array.isArray(this.yparse) || !Array.isArray(this.yparse[0])) {
          throw new Error("La prop 'y' doit être une liste de listes.");
        }
      } catch (error) {
        console.error('Erreur lors du parsing des données x ou y:', error);
        return;
      }

      let tmpNameParse = [];
      if (this.name) {
        try {
          if (typeof this.name === 'string') {
            console.error("Cette fonctionnalité n'est plus supportée. Veuillez passer les props 'name' comme une liste de nombres.");
          }
          // On gère la legacy où name pouvait être passé en string
          tmpNameParse = typeof this.name === 'string' ? JSON.parse(this.name) : this.name;
        } catch (error) {
          console.error('Erreur lors du parsing de name:', error);
        }
      }

      // Assignation des noms de séries
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
        backgroundColor: this.colorParse[index % this.colorParse.length],
        borderColor: this.colorParse[index % this.colorParse.length],
        hoverBackgroundColor: this.colorHover[index % this.colorHover.length],
        hoverBorderColor: this.colorHover[index % this.colorHover.length],
        barThickness: this.barSize,
        ...(this.maxBarSize ? { maxBarThickness: this.maxBarSize } : {}),
      }));
    },
    choosePalette() {
      // Using the refactored choosePalette function from utils
      return choosePalette(this.selectedPalette, this.colors);
    },
    loadColors() {
      const { colorParse, colorHover, legendColors } = generateColors({
        yparse: this.yparse,
        tmpColorParse: this.tmpColorParse,
        highlightIndex: this.highlightIndex,
        selectedPalette: this.selectedPalette,
        reverseOrder: this.selectedPalette === 'divergentDescending',
        colors: this.colors,
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
          interaction: {
            mode: 'index',
            intersect: false,
            axis: this.horizontal ? 'y' : 'x',
          },
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
              external: (context) => externalTooltip(context, this, { unitTooltip: this.unitTooltip }),
            },
          },
        },
        plugins: [
          {
            id: 'barPoints',
            afterDatasetsDraw: (chart) => {
              const { ctx, scales } = chart;
              const isHorizontal = chart.config.options.indexAxis === 'y';
              const datasets = chart.data.datasets;
              const pointValues = this.pvparse;

              ctx.save();

              datasets.forEach((dataset, datasetIndex) => {
                const meta = chart.getDatasetMeta(datasetIndex);
                const data = dataset.data;

                data.forEach((value, i) => {
                  if (pointValues[datasetIndex] && pointValues[datasetIndex][i] != null) {
                    const pointValue = pointValues[datasetIndex][i];
                    const bar = meta.data[i];
                    if (!bar) return;

                    // Récupération de la position du point en fonction du mode horizontal ou vertical
                    const x = isHorizontal
                      ? scales.x.getPixelForValue(pointValue)
                      : bar.x;
                    const y = isHorizontal
                      ? bar.y
                      : scales.y.getPixelForValue(pointValue);

                    // Dessin du point
                    ctx.beginPath();
                    ctx.arc(x, y, this.pointRadius, 0, 2 * Math.PI);
                    ctx.fillStyle = this.pointColor;
                    ctx.fill();
                    ctx.closePath();
                  }
                });
              });

              ctx.restore();
            },
          }
        ]
      });
    },
    changeColors(theme) {
      this.loadColors();

      // Mise à jour des couleurs dans le graphique
      this.chart.data.datasets.forEach((dataset, i) => {
        dataset.borderColor = this.colorParse[i];
        dataset.backgroundColor = this.colorParse[i];
        dataset.hoverBorderColor = this.colorHover[i];
        dataset.hoverBackgroundColor = this.colorHover[i];
      });

      this.chart.options.scales.x.ticks.color = theme === 'dark' ? '#cecece' : Chart.defaults.color;
      this.chart.options.scales.y.ticks.color = theme === 'dark' ? '#cecece' : Chart.defaults.color;

      this.chart.update('none');
    },
  },
};
</script>

<style scoped lang="scss">

</style>
