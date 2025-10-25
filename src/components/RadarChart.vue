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
import { Chart, RadarController, RadialLinearScale } from 'chart.js';
import chroma from 'chroma-js';
import { chartMixins, generateChartIds, setupThemeListener } from '../utils/global.js';
import { choosePalette, generateColors } from '@/utils/colors.js';
import ChartShell from '@/components/ChartShell.vue';
import { externalTooltip } from '@/utils/externalTooltip.js';
import { ensureArrayOfArrays, ensureArray } from '@/utils/propParsers.js';

Chart.register(RadarController, RadialLinearScale);

export default {
  name: 'RadarChart',
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
    y: {
      type: String,
      required: true,
    },
    name: {
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
      labels: [],
      xparse: [],
      yparse: [],
      nameParse: [],
      tmpColorParse: [],
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
      this.display = '';
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
        this.xparse = ensureArrayOfArrays(this.x, []);
        this.yparse = ensureArrayOfArrays(this.y, []);

        const tmpNameParse = ensureArray(this.name, []);

      for (let i = 0; i < this.yparse.length; i++) {
        if (tmpNameParse[i]) {
          this.nameParse.push(tmpNameParse[i]);
        } else {
          this.nameParse.push('Série ' + (i + 1));
        }
      }

      this.labels = this.xparse[0];

      this.loadColors();

      this.datasets = this.yparse.map((dataSet, index) => ({
        pointRadius: 5,
        pointHoverRadius: 5,
        data: dataSet,
        borderColor: this.colorParse[index],
        pointBackgroundColor: this.colorParse[index],
        backgroundColor: chroma(this.colorParse[index]).alpha(0.3).hex(),
        fill: true,
        hoverBorderColor: this.colorHover[index],
        hoverBackgroundColor: this.colorHover[index],
      }));
    },
    loadColors() {
      const { colorParse, colorHover } = generateColors({
        yparse: this.yparse.map(() => [1]), // Simule une série avec une valeur unique
        tmpColorParse: this.tmpColorParse,
        selectedPalette: this.selectedPalette,
        colors: this.colors,
      });

      this.colorParse = colorParse.map((colors) => colors[0]); // Récupère uniquement la première couleur de chaque série
      this.colorHover = colorHover.map((colors) => colors[0]); // Idem pour les couleurs de survol
    },
    choosePalette() {
      return choosePalette(this.selectedPalette, this.colors);
    },
    createChart() {
      if (this.chart) this.chart.destroy();

      this.getData();

      const ctx = this.$refs[this.chartId].getContext('2d');

      this.chart = new Chart(ctx, {
        type: 'radar',
        data: {
          labels: this.labels,
          datasets: this.datasets,
        },
        options: {
          interaction: {
            mode: 'index',
            intersect: false,
          },
          aspectRatio: this.aspectRatio,
          scales: {
            r: {
              angleLines: {
                display: true,
                borderDash: [3, 3],
              },
              ticks: {
                display: false,
              },
              grid: {
                color: '#6b6b6b',
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
                  const label = [];
                  this.datasets.forEach((set) => {
                    label.push(set.data[tooltipItems.dataIndex]);
                  });
                  return label;
                },
                title: (tooltipItems) => {
                  return tooltipItems[0].label;
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
    changeColors(theme) {
      this.loadColors();

      // Mise à jour des couleurs dans le graphique
      this.chart.data.datasets.forEach((dataset, i) => {
        dataset.borderColor = this.colorParse[i];
        dataset.pointBorderColor = this.colorParse[i];
        dataset.pointBackgroundColor = this.colorParse[i];
        dataset.hoverBorderColor = this.colorHover[i];
        dataset.hoverBackgroundColor = this.colorHover[i];
        dataset.pointHoverBorderColor = this.colorHover[i];
        dataset.pointHoverBackgroundColor = this.colorHover[i];
      });

      this.chart.options.scales.r.pointLabels.color = theme === 'dark' ? '#cecece' : Chart.defaults.color;

      this.chart.update('none');
    },
  },
};
</script>

<style scoped lang="scss">

</style>
