<template>
  <ChartShell
    :databox-id="databoxId"
    :databox-type="databoxType"
    :databox-source="databoxSource"
    :widget-id="widgetId"
    :chart-id="chartId"
    :name-parse="nameParse"
    :color-parse="colorParse"
    :date="date"
  >
    <template #canvas>
      <canvas :ref="chartId" />
    </template>
    <template #legend>
      <div class="chart_legend fr-mb-0 fr-mt-4v">
        <div
          v-for="(item, index) in nameParse"
          :key="index"
          class="flex fr-mt-3v fr-mb-1v"
        >
          <span
            class="legende_dot"
            :style="{ 'background-color': colorParse[index] }"
          />
          <p class="fr-text--sm fr-text--bold fr-ml-1w fr-mb-0">
            {{ capitalize(item) }}
          </p>
        </div>
      </div>
    </template>
  </ChartShell>
</template>

<script>
import { Chart, ScatterController } from 'chart.js';
import { chartMixins, generateChartIds, setupThemeListener } from '@/utils/global.js';
import { choosePalette, generateScatterChartColors } from '@/utils/colors.js';
import { ensureArray, ensureArrayOfArrays, parseVhLines } from '@/utils/propParsers.js';
import { ticksCallback } from '@/utils/labels.js';
import { plugins } from '@/utils/plugins.js';
import ChartShell from '@/components/ChartShell.vue';
import { externalTooltip } from '@/utils/externalTooltip.js';

Chart.register(ScatterController);

export default {
  name: 'ScatterChart',
  components: { ChartShell },
  mixins: [chartMixins],
  props: {
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
    showLine: {
      type: [Boolean, String],
      default: false,
    },
    aspectRatio: {
      type: [Number, String],
      default: 2,
    },
    formatDate: {
      type: [Boolean, String],
      default: false,
    },
    selectedPalette: {
      type: String,
      default: '',
    },
    colors: {
      type: Array,
      default: undefined,
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
      display: '',
      datasets: [],
      xAxisType: 'category',
      labels: [],
      xparse: [],
      yparse: [],
      nameParse: [],
      tmpColorParse: [],
      colorParse: [],
      vlineParse: [],
      vlineColorParse: [],
      tmpVlineColorParse: [],
      vlineNameParse: [],
      hlineParse: [],
      hlineColorParse: [],
      tmpHlineColorParse: [],
      hlineNameParse: [],
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
      this.xAxisType = 'category';
      this.labels = [];
      this.xparse = [];
      this.yparse = [];
      this.nameParse = [];
      this.tmpColorParse = [];
      this.colorParse = [];
      this.vlineParse = [];
      this.vlineColorParse = [];
      this.tmpVlineColorParse = [];
      this.vlineNameParse = [];
      this.hlineParse = [];
      this.hlineColorParse = [];
      this.tmpHlineColorParse = [];
      this.hlineNameParse = [];
      this.colorHover = [];
    },
    getData() {
      // Parsing des données (support legacy JSON strings)
      this.xparse = ensureArrayOfArrays(this.x);
      this.yparse = ensureArrayOfArrays(this.y);

      const tmpNameParse = ensureArray(this.name, []);

      for (let i = 0; i < this.yparse.length; i++) {
        if (tmpNameParse[i]) {
          this.nameParse.push(tmpNameParse[i]);
        } else {
          this.nameParse.push('Série ' + (i + 1));
        }
      }

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

      let data = [];
      // Cas où x est numérique
      if (typeof this.xparse[0][0] === 'number') {
        const allX = [];
        this.xparse.forEach((x, i) => {
          const dj = [];
          const xsort = x.map((a) => a).sort((a, b) => a - b);
          xsort.forEach((k) => {
            const index = x.findIndex((element) => element === k);
            dj.push({
              x: k,
              y: this.yparse[i][index],
            });
            if (!allX.includes(k)) {
              allX.push(k);
            }
          });
          data.push(dj);
        });
        this.labels = [];
        this.xAxisType = 'linear';
      } else {
        // Cas où x est non numérique
        data = this.yparse;
        this.labels = this.xparse[0];
        this.xAxisType = 'category';
      }

      this.loadColors();

      this.datasets = data.map((dataSet, index) => ({
        data: dataSet,
        fill: false,
        borderColor: this.colorParse[index],
        backgroundColor: this.colorParse[index],
        pointRadius: 5,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: this.colorHover[index],
        pointHoverBorderColor: this.colorHover[index],
        showLine: this.showLine,
        borderWidth: 2,
        tension: 0.4,
      }));
    },
    createChart() {
      if (this.chart) this.chart.destroy();

      this.getData();

      const ctx = this.$refs[this.chartId].getContext('2d');

      this.chart = new Chart(ctx, {
        type: 'scatter',
        data: {
          labels: this.labels,
          datasets: this.datasets,
        },
        plugins: [
          {
            id: 'hoverAxisLines',
            afterDraw: plugins.hoverAxisLines.afterDraw_1D(this.yparse),
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
              type: this.xAxisType,
              grid: {
                drawOnChartArea: false,
              },
              ticks: {
                padding: 10,
              },
              ...(this.xMin ? { suggestedMin: this.xMin } : {}),
              ...(this.xMax ? { suggestedMax: this.xMax } : {}),
            },
            y: {
              grid: {
                drawTicks: false,
              },
              border: {
                dash: [3],
              },
              ticks: {
                padding: 5,
                maxTicksLimit: 5,
                callback: ticksCallback,
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
              displayColors: false,
              backgroundColor: '#6b6b6b',
              callbacks: {
                label: (tooltipItems) => {
                  const label = [];
                  this.datasets.forEach((set, i) => {
                    if (this.xAxisType === 'linear') {
                      const index = this.xparse[i].indexOf(tooltipItems.parsed.x);
                      if (index !== -1) {
                        label.push(this.formatNumber(this.yparse[i][index]));
                      }
                    } else {
                      label.push(this.formatNumber(set.data[tooltipItems.dataIndex]));
                    }
                  });
                  return label;
                },
                title: (tooltipItems) => {
                  return tooltipItems[0].parsed.x;
                },
                labelTextColor: () => {
                  return this.colorParse;
                },
              },
              external: (context) => externalTooltip(context, this, { unitTooltip: this.unitTooltip }),
            },
          },
        },
      });
    },
    loadColors() {
      const { colorParse, colorHover, vlineColorParse, hlineColorParse } = generateScatterChartColors({
        yparse: this.yparse,
        tmpColorParse: this.tmpColorParse,
        selectedPalette: this.selectedPalette,
        vlineParse: this.vlineParse,
        tmpVlineColorParse: this.tmpVlineColorParse,
        hlineParse: this.hlineParse,
        tmpHlineColorParse: this.tmpHlineColorParse,
        colors: this.colors,
      });

      this.colorParse = colorParse;
      this.colorHover = colorHover;
      this.vlineColorParse = vlineColorParse;
      this.hlineColorParse = hlineColorParse;
    },
    choosePalette() {
      return choosePalette(this.selectedPalette, this.colors);
    },
    changeColors(theme) {
      this.loadColors();

      // Mise à jour des couleurs dans le graphique
      this.chart.data.datasets.forEach((dataset, i) => {
        dataset.borderColor = this.colorParse[i];
        dataset.backgroundColor = this.colorParse[i];
        dataset.pointBorderColor = this.colorParse[i];
        dataset.pointBackgroundColor = this.colorParse[i];
        dataset.hoverBorderColor = this.colorHover[i];
        dataset.hoverBackgroundColor = this.colorHover[i];
        dataset.pointHoverBorderColor = this.colorHover[i];
        dataset.pointHoverBackgroundColor = this.colorHover[i];
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
