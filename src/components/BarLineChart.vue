<template>
  <ChartShell
    :databox-id="databoxId"
    :databox-type="databoxType"
    :databox-source="databoxSource"
    :widget-id="widgetId"
    :chart-id="chartId"
    :name-parse="[...nameBarsParse, ...nameLinesParse]"
    :color-parse="[...colorBarParse, ...colorParse]"
    :date="date"
  >
    <template #canvas>
      <canvas :ref="chartId" />
    </template>

    <template #legend>
      <div class="chart_legend fr-mb-0 fr-mt-4v">
        <!-- Barre -->
        <div
          v-for="(barName, index) in nameBarsParse"
          :key="index"
          class="flex fr-mt-3v fr-mb-1v"
        >
          <span
            class="legende_dot"
            :style="{ 'background-color': colorBarParse[Math.min(index, colorBarParse.length - 1)] }"
          />
          <p class="fr-text--sm fr-text--bold fr-ml-1w fr-mb-0">
            {{ capitalize(barName || 'Bar ' + (index + 1)) }}
          </p>
        </div>

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

        <!-- Hlines -->
        <div
          v-for="(item, index) in hlineNameParse"
          :key="index"
          class="flex"
        >
          <span
            class="legende_dash_line"
            :style="{ 'background-color': hlineColorParse[index] }"
          />
          <span
            class="legende_dash_line legende_dash_line_end"
            :style="{ 'background-color': hlineColorParse[index] }"
          />
          <p class="fr-text--sm fr-text--bold fr-ml-1w fr-mb-0">
            {{ capitalize(item) }}
          </p>
        </div>

        <!-- Vlines -->
        <div
          v-for="(item, index) in vlineNameParse"
          :key="index"
          class="flex"
        >
          <span
            class="legende_dash_line"
            :style="{ 'background-color': vlineColorParse[index] }"
          />
          <span
            class="legende_dash_line legende_dash_line_end"
            :style="{ 'background-color': vlineColorParse[index] }"
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
    </template>
  </ChartShell>
</template>

<script>
import { Chart, LineController, LineElement } from 'chart.js';
import { chartMixins, configureChartDefaults, setupThemeListener } from '@/utils/global.js';
import { choosePalette, generateBarLineChartColors } from '@/utils/colors.js';
import { ensureArray, ensureArrayOfArrays, parseVhLines } from '@/utils/propParsers.js';
import { ticksCallback } from '@/utils/labels.js';
import { plugins } from '@/utils/plugins.js';
import ChartShell from '@/components/ChartShell.vue';
import { externalTooltip } from '@/utils/externalTooltip.js';

Chart.register(LineController, LineElement);

export default {
  name: 'BarLineChart',
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
      type: String,
      required: true,
    },
    yBars: {
      type: Array,
      required: true,
    },
    yLines: {
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
    yBarMin: {
      type: [Number, String],
      default: '',
    },
    yBarMax: {
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
    stacked: {
      type: [Boolean, String],
      default: false,
    },
    nameBars: {
      type: Array,
      default: () => [],
    },
    nameLines: {
      type: Array,
      default: () => [],
    },
    barSize: {
      type: [Number, String],
      default: 'flex',
    },
    maxBarSize: {
      type: [Number, String],
      default: 32,
    },
    vline: {
      type: String,
      default: '',
    },
    vlinecolor: {
      type: String,
      default: '',
    },
    vlinename: {
      type: String,
      default: '',
    },
    hline: {
      type: String,
      default: '',
    },
    hlinecolor: {
      type: String,
      default: '',
    },
    hlinename: {
      type: String,
      default: '',
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
      default: 'categorical',
    },
    barsColors: {
      type: Array,
      default: undefined,
    },
    linesColors: {
      type: Array,
      default: undefined,
    },
    hideLines: {
      type: Boolean,
      default: false,
    },
    singleAxis: {
      type: Boolean,
      default: false
    },
    unitTooltipBar: {
      type: String,
      default: '',
    },
    unitTooltipLine: {
      type: String,
      default: '',
    },
  },
  data() {
    this.chart = undefined;

    return {
      widgetId: '',
      chartId: '',
      display: '',
      barsDatasets: [],
      linesDatasets: [],
      labels: [],
      xparse: [],
      yBarParse: [],
      nameBarsParse: [],
      nameLinesParse: [],
      yLineParse: [],
      vlineParse: [],
      vlineColorParse: [],
      tmpVlineColorParse: [],
      vlineNameParse: [],
      hlineParse: [],
      hlineColorParse: [],
      tmpHlineColorParse: [],
      hlineNameParse: [],
      colorParse: [],
      colorBarParse: [],
      colorHover: [],
      colorBarHover: [],
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
      this.barsDatasets = [];
      this.linesDatasets = [];
      this.labels = [];
      this.xparse = [];
      this.yBarParse = [];
      this.yLineParse = [];
      this.vlineParse = [];
      this.nameLinesParse = [];
      this.nameBarsParse = [];
      this.vlineColorParse = [];
      this.tmpVlineColorParse = [];
      this.vlineNameParse = [];
      this.hlineParse = [];
      this.hlineColorParse = [];
      this.tmpHlineColorParse = [];
      this.hlineNameParse = [];
      this.colorParse = [];
      this.colorBarParse = [];
      this.colorHover = [];
      this.colorBarHover = [];
    },
    getData() {
      // Parsing des données
      // Parsing des données (support legacy JSON strings)
      this.xparse = ensureArrayOfArrays(this.x);
      this.yBarParse = ensureArrayOfArrays(this.yBars);
      this.yLineParse = ensureArrayOfArrays(this.yLines);

      this.nameLinesParse = ensureArray(this.nameLines, []);
      this.nameBarsParse = ensureArray(this.nameBars, []);

      // Récupération données Vline
      if (this.vline) {
        const { parse, names, colors } = parseVhLines(this.vline, this.vlinename, this.vlinecolor);
        this.vlineParse = parse;
        this.vlineNameParse = names;
        this.tmpVlineColorParse = colors;
      }

      // Récupération données Hline
      if (this.hline) {
        const { parse, names, colors } = parseVhLines(this.hline, this.hlinename, this.hlinecolor);
        this.hlineParse = parse;
        this.hlineNameParse = names;
        this.tmpHlineColorParse = colors;
      }

      const dataBars = this.yBarParse.map(() => []); // tableau pour les barres
      const dataLines = this.yLineParse.map(() => []); // tableau de tableaux pour chaque ligne

      if (typeof this.xparse[0] === 'number') {
        const xsort = [...this.xparse].sort((a, b) => a - b);

        xsort.forEach((k) => {
          const index = this.xparse.findIndex((el) => el === k);

          this.yBarParse.forEach((bar, barIdx) => {
            dataBars[barIdx].push(bar[index]);
          });

          // Pour chaque ligne
          this.yLineParse.forEach((line, lineIdx) => {
            dataLines[lineIdx].push(line[index]);
          });
        });

        this.labels = xsort;
      } else {
        // Cas où x n'est pas numérique
        this.labels = this.xparse[0];

        this.yBarParse.forEach((bar, barIdx) => {
          dataBars[barIdx].push(...bar);
        });

        this.yLineParse.forEach((line, lineIdx) => {
          dataLines[lineIdx].push(...line);
        });
      }
      // Chargement des couleurs
      this.loadColors();

      this.barsDatasets = dataBars.map((barData, i) => ({
        data: barData,
        type: 'bar',
        borderColor: this.colorBarParse[i % this.colorBarParse.length],
        backgroundColor: this.colorBarParse[i % this.colorBarParse.length],
        barThickness: this.barSize,
        maxBarThickness: this.maxBarSize,
        order: 2,
      }));

      // Crée les datasets des lignes
      this.linesDatasets = dataLines.map((lineData, i) => ({
        data: lineData,
        type: 'line',
        borderColor: this.hideLines ? 'transparent' : this.colorParse[i % this.colorParse.length],
        backgroundColor: 'rgba(0,0,0,0)',
        pointBorderColor: this.colorParse[i % this.colorParse.length],
        pointBackgroundColor: this.colorParse[i % this.colorParse.length],
        yAxisID: this.singleAxis ? 'y' : 'yLine',
        tension: 0.4,
        order: 1,
      }));
    },
    choosePalette() {
      // Using the refactored choosePalette function from utils
      return {bar: choosePalette(this.selectedPalette, this.barsColors), line: choosePalette(this.selectedPalette, this.linesColors)};
    },
    loadColors() {
      const { colorBarParse, colorBarHover, colorParse, colorHover, vlineColorParse, hlineColorParse } = generateBarLineChartColors({
        yLinesLength: this.yLineParse.length,
        vlineParse: this.vlineParse,
        hlineParse: this.hlineParse,
        tmpVlineColorParse: this.tmpVlineColorParse,
        tmpHlineColorParse: this.tmpHlineColorParse,
        selectedPalette: this.selectedPalette,
        barsColors: this.barsColors,
        linesColors: this.linesColors,
      });

      this.colorBarParse = colorBarParse;
      this.colorBarHover = colorBarHover;
      this.colorParse = colorParse;
      this.colorHover = colorHover;
      this.vlineColorParse = vlineColorParse;
      this.hlineColorParse = hlineColorParse;
    },
    createChart() {
      if (this.chart) this.chart.destroy();

      this.getData();

      const ctx = this.$refs[this.chartId].getContext('2d');

      this.chart = new Chart(ctx, {
        data: {
          labels: this.labels,
          datasets: [...this.barsDatasets, ...this.linesDatasets],
        },
        plugins: [
          {
            id: 'hoverAxisLines',
            afterDraw: plugins.hoverAxisLines.afterDraw_2D(this.yBarParse, this.yLineParse),
          },
        ],
        options: {
          interaction: {
            mode: 'index',
            intersect: false,
          },
          aspectRatio: this.aspectRatio,
          scales: {
            x: {
              offset: true,
              stacked: this.stacked,
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
              stacked: this.stacked,
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
              ...(this.yBarMin ? { suggestedMin: this.yBarMin } : {}),
              ...(this.yBarMax ? { suggestedMax: this.yBarMax } : {}),
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
              display: false,
            },
            tooltip: {
              enabled: false,
              displayColors: false,
              backgroundColor: '#6b6b6b',
              callbacks: {
                label: (tooltipItems) => {
                  const label = [];
                  [...this.barsDatasets, ...this.linesDatasets].forEach((set) => {
                    label.push(this.formatNumber(set.data[tooltipItems.dataIndex]));
                  });
                  return label;
                },
                title: (tooltipItems) => {
                  return tooltipItems[0].label;
                },
              },
              external: (context) => externalTooltip(context, this, { unitLookup: (i) => (i < this.barsDatasets.length ? this.unitTooltipBar : this.unitTooltipLine) }),
            },
          },
        },
      });
    },
    changeColors(theme) {
      this.loadColors();

      // Mise à jour des couleurs dans le graphique
      this.chart.data.datasets.forEach((dataset, i) => {
        if (dataset.type === 'bar') {
          dataset.borderColor = this.colorBarParse[i % this.colorBarParse.length];
          dataset.backgroundColor = this.colorBarParse[i % this.colorBarParse.length];
          dataset.hoverBorderColor = this.colorBarHover[i % this.colorBarHover.length];
          dataset.hoverBackgroundColor = this.colorBarHover[i % this.colorBarHover.length];
        } else if (dataset.type === 'line') {
          dataset.borderColor = this.hideLines ? 'transparent' : this.colorParse[i % this.colorParse.length];
          dataset.pointBorderColor = this.colorParse[i % this.colorParse.length];
          dataset.pointBackgroundColor = this.colorParse[i % this.colorParse.length];
          dataset.pointHoverBorderColor = this.colorHover[i % this.colorHover.length];
          dataset.pointHoverBackgroundColor = this.colorHover[i % this.colorHover.length];
        }
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
