<template>
  <ChartShell
    :databox-id="databoxId"
    :databox-type="databoxType"
    :databox-source="databoxSource"
    :widget-id="widgetId"
    :chart-id="chartId"
    :name-parse="nameParse"
    :color-parse="colorParse[0] || []"
    :date="date"
  >
    <template #canvas>
      <canvas :ref="chartId" />
    </template>
  </ChartShell>
</template>

<script>
import { ArcElement, Chart, DoughnutController, PieController } from 'chart.js';
import { chartMixins, generateChartIds, setupThemeListener } from '@/utils/global.js';
import { choosePalette, generateColors } from '@/utils/colors.js';
import ChartShell from '@/components/ChartShell.vue';
import { externalTooltip } from '@/utils/externalTooltip.js';

Chart.register(DoughnutController, PieController, ArcElement);

export default {
  name: 'PieChart',
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
    fill: {
      type: [Boolean, String],
      default: false,
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

      for (let i = 0; i < this.yparse[0].length; i++) {
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
        data: dataSet,
        borderColor: this.colorParse[index],
        backgroundColor: this.colorParse[index],
        hoverBorderColor: this.colorHover[index],
        hoverBackgroundColor: this.colorHover[index],
      }));
    },
    createChart() {
      if (this.chart) this.chart.destroy();

      this.getData();

      const ctx = this.$refs[this.chartId].getContext('2d');

      this.chart = new Chart(ctx, {
        type: this.fill ? 'pie' : 'doughnut',
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
          layout: {
            padding: {
              left: 50,
              right: 50,
              top: 0,
              bottom: 0,
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
      });
    },
    loadColors() {
      let yparseSimple = this.yparse;
      if (this.selectedPalette === '' || this.selectedPalette === 'categorical') {
        yparseSimple = this.yparse[0];
      }

      const { colorParse, colorHover } = generateColors({
        yparse: yparseSimple,
        tmpColorParse: this.tmpColorParse,
        selectedPalette: this.selectedPalette,
        colors: this.colors,
      });

      this.colorParse = [colorParse.flat()];
      this.colorHover = [colorHover.flat()];
    },
    choosePalette() {
      // Using the refactored choosePalette function from utils
      return choosePalette(this.selectedPalette, this.colors);
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
