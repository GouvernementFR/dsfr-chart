<template>
  <ChartShell
    :databox-id="databoxId"
    :databox-type="databoxType"
    :databox-source="databoxSource"
    :widget-id="widgetId"
    :chart-id="chartId"
    :name-parse="[...nameLinesParse, ...nameAreasParse]"
    :color-parse="[...colorParse, ...colorAreaParse]"
    :date="date"
  >
    <template #canvas>
      <canvas :ref="chartId" />
    </template>
    <template #legend>
      <div class="chart_legend fr-mb-0 fr-mt-4v">
        <!-- Lignes -->
        <div
          v-for="(lineName, index) in nameLinesParse"
          :key="index"
          class="flex fr-mt-3v fr-mb-1v"
        >
          <span
            class="legende_dot"
            :style="{ 'background-color': colorParse[Math.min(index, colorParse.length - 1)] }"
          />
          <p class="fr-text--sm fr-text--bold fr-ml-1w fr-mb-0">
            {{ capitalize(lineName || 'Line ' + (index + 1)) }}
          </p>
        </div>

        <!-- Areas -->
        <div
          v-for="(areaName, index) in nameAreasParse"
          :key="index"
          class="flex fr-mt-3v fr-mb-1v"
        >
          <span
            class="legende_dot"
            :style="{ 'background-color': colorAreaParse[Math.min(index, colorAreaParse.length - 1)] }"
          />
          <p class="fr-text--sm fr-text--bold fr-ml-1w fr-mb-0">
            {{ capitalize(areaName || 'Area ' + (index + 1)) }}
          </p>
        </div>
      </div>
    </template>
  </ChartShell>
</template>

<script>
import { Chart, LineController, LineElement, Filler, PointElement, LinearScale, CategoryScale } from 'chart.js';
import { chartMixins, generateChartIds, setupThemeListener } from '@/utils/global.js';
import { generateAreaLineChartColors } from '@/utils/colors.js';
import { ensureArray, ensureArrayOfArrays } from '@/utils/propParsers.js';
import { getIndexes, ticksCallback } from '@/utils/labels.js';
import { plugins } from '@/utils/plugins.js';
import ChartShell from '@/components/ChartShell.vue';
import { externalTooltip } from '@/utils/externalTooltip.js';

Chart.register(LineController, LineElement, Filler, PointElement, LinearScale, CategoryScale);

export default {
  name: 'AreaLineChart',
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
      required: true
    },
    yAreas: {
      type: Array,
      required: true
    },
    yLines: {
      type: Array,
      required: true
    },
    xMin: {
      type: [Number, String],
      default: '',
    },
    xMax: {
      type: [Number, String],
      default: '',
    },
    yAreaMin: {
      type: [Number, String],
      default: '',
    },
    yAreaMax: {
      type: [Number, String],
      default: '',
    },
    yLineMin: {
      type: [Number, String],
      default: '',
    },
    yLineMax: {
      type: [Number, String],
      default: '',
    },
    nameAreas: {
      type: Array,
      default: () => []
    },
    nameLines: {
      type: Array,
      default: () => []
    },
    aspectRatio: {
      type: [Number, String],
      default: 2
    },
    selectedPalette: {
      type: String,
      default: 'categorical'
    },
    areasColors: {
      type: Array,
      default: undefined
    },
    linesColors: {
      type: Array,
      default: undefined
    },
    unitTooltipArea: {
      type: String,
      default: ''
    },
    unitTooltipLine: {
      type: String,
      default: ''
    },
    date: {
      type: String,
      default: ''
    },
    showLinesLabels: {
      type: [Array],
      default: () => [],
    },
    showAreasLabels: {
      type: [Array],
      default: () => [],
    },
    singleAxis: {
      type: Boolean,
      default: false
    },
    pointRadius: {
      type: Number,
      default: 5,
    },
    highlightStart: {
      type: [String, Number],
      default: null
    },
    highlightEnd: {
      type: [String, Number],
      default: null
    },
    highlightLabel: {
      type: String,
      default: ''
    },
    highlightLabelColor: {
      type: String,
      default: ''
    },
  },
  data() {
    return {
      widgetId: '',
      chartId: '',
      display: '',
      chart: undefined,
      areasDatasets: [],
      linesDatasets: [],
      labels: [],
      xparse: [],
      yAreaParse: [],
      yLineParse: [],
      nameAreasParse: [],
      nameLinesParse: [],
      showAreaLabelsParse: [],
      showLinesLabelsParse: [],
      colorAreaLineParse: [],
      colorAreaParse: [],
      colorAreaHover: [],
      colorParse: [],
      colorHover: [],
    };
  },
  watch: {
    $props: {
      handler() {
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
    this.resetData();
    this.createChart();

    this.display = (this.$refs[this.widgetId] && (this.$refs[this.widgetId].offsetWidth || (this.$refs[this.widgetId].$el && this.$refs[this.widgetId].$el.offsetWidth)))
      ? (this.$refs[this.widgetId].offsetWidth || this.$refs[this.widgetId].$el.offsetWidth) > 486 ? 'big' : 'small'
      : 'small';
    setupThemeListener(this.chartId, (theme) => this.changeColors(theme));
  },
  methods: {
    resetData() {
      if (this.chart) {
        this.chart.destroy();
      }
      this.display = '';
      this.areasDatasets = [];
      this.linesDatasets = [];
      this.labels = [];
      this.xparse = [];
      this.yAreaParse = [];
      this.yLineParse = [];
      this.nameAreasParse = [];
      this.nameLinesParse = [];
      this.showAreaLabelsParse = [];
      this.showLinesLabelsParse = [];
      this.colorAreaLineParse = [];
      this.colorAreaParse = [];
      this.colorAreaHover = [];
      this.colorParse = [];
      this.colorHover = [];
    },
    loadColors() {
      const { colorAreaParse, colorAreaLineParse, colorAreaHover, colorParse, colorHover } = generateAreaLineChartColors({
        yLinesLength: this.yLineParse.length,
        yBarsLength: this.yAreaParse.length,
        selectedPalette: this.selectedPalette,
        areasColors: this.areasColors,
        linesColors: this.linesColors,
      });

      this.colorAreaLineParse = colorAreaLineParse;
      this.colorAreaParse = colorAreaParse;
      this.colorAreaHover = colorAreaHover;
      this.colorParse = colorParse;
      this.colorHover = colorHover;
    },
    getData() {
      // Parsing des données (supports legacy JSON strings)
      this.xparse = ensureArrayOfArrays(this.x);
      this.yAreaParse = ensureArrayOfArrays(this.yAreas);
      this.yLineParse = ensureArrayOfArrays(this.yLines);

      // Noms
      this.nameAreasParse = ensureArray(this.nameAreas, []);
      this.nameLinesParse = ensureArray(this.nameLines, []);

      // Labels à afficher sur les points
      this.showAreaLabelsParse = ensureArray(this.showAreasLabels, []);
      this.showLinesLabelsParse = ensureArray(this.showLinesLabels, []);

      // Construction des labels et alignement des séries si x est numérique
      if (typeof this.xparse[0] === 'number') {
        const xsort = [...this.xparse].sort((a, b) => a - b);

        const dataAreas = this.yAreaParse.map(() => []);
        const dataLines = this.yLineParse.map(() => []);

        xsort.forEach((k) => {
          const index = this.xparse.findIndex((el) => el === k);

          this.yAreaParse.forEach((area, i) => {
            dataAreas[i].push(area[index]);
          });

          this.yLineParse.forEach((line, i) => {
            dataLines[i].push(line[index]);
          });
        });

        this.labels = xsort;
        // réassigner les séries réordonnées
        this.yAreaParse = dataAreas;
        this.yLineParse = dataLines;
      } else {
        // Cas catégoriel : la première ligne de x contient les labels
        this.labels = this.xparse[0];
      }

      // Charger les couleurs
      this.loadColors();

      // Crée datasets area
      this.areasDatasets = this.yAreaParse.map((data, i) => ({
        data,
        type: 'line',
        fill: true,
        backgroundColor: this.colorAreaParse[i],
        borderColor: this.colorAreaLineParse[i],
        tension: 0.4,
        pointRadius: 0,
        pointHoverRadius: 0,
        order: 2,
      }));

      // Crée datasets line
      this.linesDatasets = this.yLineParse.map((data, i) => ({
        data,
        type: 'line',
        fill: false,
        borderColor: this.colorParse[i],
        pointBorderColor: this.colorParse[i],
        pointBackgroundColor: this.colorParse[i],
        pointRadius: this.pointRadius,
        pointHoverRadius: this.pointRadius,
        tension: 0.4,
        yAxisID: this.singleAxis ? 'y' : 'yLine',
        order: 1,
      }));
    },
    createChart() {
      if (this.chart) this.chart.destroy();

      this.getData();

      const ctx = this.$refs[this.chartId].getContext('2d');

      // NOTE: Il est important de conserver l'ordre des datasets (lines avant areas) pour le bon fonctionnement du plugin de labels
      const datasets = [...this.areasDatasets, ...this.linesDatasets];

      const indexesWithLabels = [
        ...getIndexes(this.areasDatasets, this.showAreaLabelsParse),
        ...getIndexes(this.linesDatasets, this.showLinesLabelsParse),
      ];

      this.chart = new Chart(ctx, {
        data: {
          labels: this.labels,
          datasets: datasets,
        },
        plugins: [
          {
            id: 'hoverAxisLines',
            afterDraw: plugins.hoverAxisLines.afterDraw_2D.call(this, this.yAreaParse, this.yLineParse),
          },
          {
            id: 'pointLabels',
            afterDatasetsDraw: plugins.pointLabels.afterDatasetsDraw.call(this, indexesWithLabels),
          },
          {
            id: 'highlightZone',
            beforeDraw: plugins.highlightZone.beforeDraw.bind(this),
          },
        ],
        options: {
          interaction: {
            mode: 'index',
            intersect: false,
          },
          layout: {
            padding: 0, // supprime toutes les marges
          },
          aspectRatio: this.aspectRatio,
          scales: {
            x: {
              grid: {
                drawTicks: false,
                drawOnChartArea: false,
              },
              ...(this.xMin ? { suggestedMin: this.xMin } : {}),
              ...(this.xMax ? { suggestedMax: this.xMax } : {}),
            },
            y: {
              type: 'linear',
              position: 'left',
              offset: false,
              grid: {
                drawTicks: false,
              },
              border: {
                dash: [3],
              },
              ticks: {
                padding: 10,
                maxTicksLimit: 5,
                callback: ticksCallback,
              },
              ...(this.yAreaMin ? { suggestedMin: this.yAreaMin } : {}),
              ...(this.yAreaMax ? { suggestedMax: this.yAreaMax } : {}),
            },
            yLine: {
              display: !this.singleAxis && this.yLineParse.length > 0,
              type: 'linear',
              position: 'right',
              id: 'yLine',
              beginAtZero: true,
              grid: {
                drawTicks: false,
              },
              border: {
                dash: [3],
              },
              ticks: {
                padding: 10,
                maxTicksLimit: 5,
                callback: ticksCallback,
              },
              ...(this.yLineMin ? { suggestedMin: this.yLineMin } : {}),
              ...(this.yLineMax ? { suggestedMax: this.yLineMax } : {}),
            },
          },
          plugins: {
            legend: {
              display: false
            },
            tooltip: {
              enabled: false,
              displayColors: false,
              backgroundColor: '#6b6b6b',
              callbacks: {
                label: (tooltipItems) => {
                  const label = [];
                  [...this.areasDatasets, ...this.linesDatasets].forEach((set) => {
                    label.push(this.formatNumber(set.data[tooltipItems.dataIndex]));
                  });
                  return label;
                },
                title: (tooltipItems) => {
                  return tooltipItems[0].label;
                },
              },
              external: (context) => externalTooltip(context, this, { unitLookup: (i) => (i < this.areasDatasets.length ? this.unitTooltipArea : this.unitTooltipLine) }),
            },
          },
        },
      });
    },
    changeColors(theme) {
      this.loadColors();

      // Mise à jour des couleurs dans le graphique
      this.areasDatasets.forEach((dataset, i) => {
        dataset.borderColor = this.colorAreaLineParse[i % this.colorAreaLineParse.length];
        dataset.backgroundColor = this.colorAreaParse[i % this.colorAreaParse.length];
        dataset.pointBorderColor = this.colorAreaParse[i % this.colorAreaParse.length];
        dataset.pointBackgroundColor = this.colorAreaParse[i % this.colorAreaParse.length];
        dataset.pointHoverBorderColor = this.colorAreaHover[i % this.colorAreaHover.length];
        dataset.pointHoverBackgroundColor = this.colorAreaHover[i % this.colorAreaHover.length];
      });

      // Mise à jour des datasets line
      this.linesDatasets.forEach((dataset, i) => {
        dataset.borderColor = this.colorParse[i % this.colorParse.length];
        dataset.pointBorderColor = this.colorParse[i % this.colorParse.length];
        dataset.pointBackgroundColor = this.colorParse[i % this.colorParse.length];
        dataset.pointHoverBorderColor = this.colorHover[i % this.colorHover.length];
        dataset.pointHoverBackgroundColor = this.colorHover[i % this.colorHover.length];
      });

      this.chart.options.scales.x.ticks.color = theme === 'dark' ? '#cecece' : Chart.defaults.color;
      this.chart.options.scales.y.ticks.color = theme === 'dark' ? '#cecece' : Chart.defaults.color;
      this.chart.options.scales.yLine.ticks.color = theme === 'dark' ? '#cecece' : Chart.defaults.color;

      this.chart.update('none');
    },
  },
};
</script>

<style scoped lang="scss">

</style>
