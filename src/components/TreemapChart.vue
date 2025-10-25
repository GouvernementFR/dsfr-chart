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
  </ChartShell>
</template>

<script>
import { Chart } from 'chart.js';
import { TreemapController, TreemapElement } from 'chartjs-chart-treemap';
import { chartMixins, configureChartDefaults, setupThemeListener } from '@/utils/global.js';
import { choosePalette, generateTreemapChartColors } from '@/utils/colors.js';
import ChartShell from '@/components/ChartShell.vue';
import { externalTooltip } from '@/utils/externalTooltip.js';
import { ensureArray, normalizeNumber } from '@/utils/propParsers.js';

Chart.register(TreemapController, TreemapElement);

function splitLabelToFit(label, maxWidth, ctx) {
  const words = label.split(' ');
  const lines = [];
  let currentLine = '';
  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    const newLine = currentLine + ' ' + word;
    const width = ctx.chart.ctx.measureText(newLine).width;
    if (width < maxWidth) {
      currentLine = newLine;
    } else {
      lines.push(currentLine);
      currentLine = word;
    }
  }
  lines.push(currentLine);
  return lines;
}

export default {
  name: 'TreemapChart',
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
    tree: {
      type: Array,
      required: true,
    },
    name: {
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
    this.getData();
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
      this.datasets = [];
      this.dataParse = [];
      this.nameParse = [];
      this.colorParse = [];
      this.colorHover = [];
    },
    getData() {
      this.dataParse = ensureArray(this.tree, []);
      this.nameParse = ensureArray(this.name, []);

      this.loadColors();

      this.datasets = [{
        tree: this.dataParse.map((v, i) => ({label: this.nameParse[i], value: v})),
        key: 'value',
        labels: {
          display: true,
          font: {
            size: 14,
            weight: 'bold',
          },
          formatter(ctx) {
            if (ctx.type !== 'data') {
              return;
            }
            const data = ctx.chart.data;
            const value = data.datasets[ctx.datasetIndex].tree[ctx.dataIndex].label;
            return splitLabelToFit(value, ctx.raw.w * 0.8, ctx);
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
        borderWidth: normalizeNumber(this.borderWidth, 2),
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
          interaction: {
            mode: 'index',
            intersect: false,
            axis: 'xy',
          },
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
                  return this.formatNumber(value.v);
                },
                title: (tooltipItems) => {
                  const ctx = tooltipItems[0];
                  const value = this.datasets[ctx.datasetIndex].tree[ctx.dataIndex].label;
                  return value;
                },
                labelTextColor: (tooltipItems) => {
                  return this.colorParse[tooltipItems.datasetIndex][tooltipItems.dataIndex];
                },
              },
              external: (context) => externalTooltip(context, this, {
                unitTooltip: this.unitTooltip,
                colorResolver: (comp, idx, datasetIndex, dataIndex) => {
                  if (comp.colorParse && Array.isArray(comp.colorParse[datasetIndex]) && comp.colorParse[datasetIndex][dataIndex]) {
                    return comp.colorParse[datasetIndex][dataIndex % comp.colorParse[datasetIndex].length];
                  }
                  return (comp.colorParse && comp.colorParse[dataIndex % comp.colorParse.length]) || '#000';
                }
              }),
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
