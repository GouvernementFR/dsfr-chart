<template>
  <div
    :ref="widgetId"
    class="widget_container fr-grid-row"
  >
    <div class="r_col fr-col-12">
      <div class="chart">
        <div class="linechart_tooltip">
          <div class="tooltip_header fr-text--sm fr-mb-0" />
          <div class="tooltip_body">
            <div class="tooltip_value">
              <span class="tooltip_dot" />
            </div>
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
              :style="{ 'background-color': colorParse[index] }"
            />
            <p class="fr-text--sm fr-text--bold fr-ml-1w fr-mb-0">
              {{ capitalize(nameParse[index]) }}
            </p>
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
  </div>
</template>

<script>
import { Chart } from 'chart.js';
import { mixin, choosePalette } from '@/utils/global.js';
import { generateColors } from '@/utils/colors.js';
import { configureChartDefaults } from '@/utils/configureChartDefaults.js';

export default {
  name: 'PieChart',
  mixins: [mixin],
  props: {
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
    fill: {
      type: [Boolean, String],
      default: false,
    },
    date: {
      type: String,
      default: undefined,
    },
    selectedPalette: {
      type: String,
      default: '',
    },
    unitTooltip: {
      type: String,
      default: '', // Default to an empty string if no unit is specified
    },
  },
  data() {
    return {
      widgetId: '',
      chartId: '',
      chart: undefined,
      legendLeftMargin: 100,
      display: '',
      datasets: [],
      labels: undefined,
      xparse: [],
      yparse: [],
      nameParse: [],
      tmpColorParse: [],
      colorParse: [],
      colorHover: [],
      typeGraph: 'doughnut',
      isSmall: false,
    };
  },
  computed: {
    style() {
      return this.legendLeftMargin + 'px';
    },
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
      this.legendLeftMargin = 100;
      this.display = '';
      this.datasets = [];
      this.labels = undefined;
      this.xparse = [];
      this.yparse = [];
      this.nameParse = [];
      this.tmpColorParse = [];
      this.colorParse = [];
      this.colorHover = [];
      this.typeGraph = '';
    },
    getData() {
      // Détermination du type de graphique
      this.typeGraph = this.fill ? 'pie' : 'doughnut';

      // Parsing des données
      this.xparse = JSON.parse(this.x);
      this.yparse = JSON.parse(this.y);

      let tmpNameParse = [];
      if (this.name !== undefined) {
        tmpNameParse = JSON.parse(this.name);
      }
      if (this.color !== undefined) {
        this.tmpColorParse = JSON.parse(this.color);
      }

      this.loadColors();

      for (let i = 0; i < this.yparse.length; i++) {
        if (tmpNameParse[i] !== undefined) {
          this.nameParse.push(tmpNameParse[i]);
        } else {
          this.nameParse.push('Serie' + (i + 1));
        }
      }

      // Formatage des données
      this.labels = this.xparse;
      this.datasets = [
        {
          data: this.yparse,
          borderColor: this.colorParse,
          backgroundColor: this.colorParse,
          hoverBackgroundColor: this.colorHover,
          hoverBorderColor: this.colorHover,
        },
      ];
    },
    createChart() {
      if (this.chart) this.chart.destroy();

      this.getData();

      const ctx = this.$refs[this.chartId].getContext('2d');

      this.chart = new Chart(ctx, {
        type: this.typeGraph,
        data: {
          labels: this.labels,
          datasets: this.datasets,
        },
        options: {
          responsive: true,
          maintainAspectRatio: true,
          layout: {
            padding: {
              left: 50,
              right: 50,
              top: 0,
              bottom: 0,
            },
          },
          animation: {
            easing: 'easeInOutBack',
            duration: 1000,
          },
          legend: {
            display: false,
          },
          tooltips: {
            displayColors: false,
            backgroundColor: '#6b6b6b',
            enabled: false,
            callbacks: {
              label: (tooltipItems) => {
                return this.datasets[0].data[tooltipItems.index];
              },
              title: (tooltipItems) => {
                return this.labels[tooltipItems[0].index];
              },
              labelTextColor: (tooltipItems) => {
                return this.colorParse[tooltipItems.index];
              },
            },
            custom: (context) => {
              // Tooltip Element
              const tooltipEl = this.$el.querySelector('.linechart_tooltip');

              // Hide if no tooltip
              const tooltipModel = context;
              if (tooltipModel.opacity === 0) {
                tooltipEl.style.opacity = 0;
                return;
              }

              // Set caret Position
              tooltipEl.classList.remove('above', 'below', 'no-transform');
              if (tooltipModel.yAlign) {
                tooltipEl.classList.add(tooltipModel.yAlign);
              } else {
                tooltipEl.classList.add('no-transform');
              }

              function getBody(bodyItem) {
                return bodyItem.lines;
              }
              // Set Text
              if (tooltipModel.body) {
                const titleLines = tooltipModel.title || [];
                const bodyLines = tooltipModel.body.map(getBody);

                const divDate = tooltipEl.querySelector('.tooltip_header.fr-text--sm.fr-mb-0');
                divDate.innerHTML = titleLines;
                const color = tooltipModel.labelTextColors[0];
                const divValue = this.$el.querySelector('.tooltip_value');
                const value = bodyLines[0][0]; // assuming bodyLines[0][0] contains the value
                const displayValue = `${value}${this.unitTooltip ? ' ' + this.unitTooltip : ''}`;

                // Retrieve the node name for tooltip dots
                const tooltipDotElement = this.$el.querySelector('.tooltip_dot');
                const nodeName = tooltipDotElement ? tooltipDotElement.attributes[0].nodeName : 'data-attribute';

                divValue.innerHTML = `
                  <div class="tooltip_value-content">
                    <span ${nodeName}="" class="tooltip_dot" style="background-color:${color};"></span>
                    ${displayValue}
                  </div>
                `;
              }

              const { offsetLeft: positionX, offsetTop: positionY } = this.chart.canvas;

              const canvasWidth = Number(this.chart.canvas.style.width.replace(/\D/g, ''));
              const canvasHeight = Number(this.chart.canvas.style.height.replace(/\D/g, ''));
              tooltipEl.style.position = 'absolute';
              tooltipEl.style.padding = tooltipModel.padding + 'px ' + tooltipModel.padding + 'px';
              tooltipEl.style.pointerEvents = 'none';
              let tooltipX = positionX + tooltipModel.caretX + 10;
              let tooltipY = positionY + tooltipModel.caretY - 18;
              if (tooltipX + tooltipEl.clientWidth + this.legendLeftMargin > positionX + canvasWidth) {
                tooltipX = positionX + tooltipModel.caretX - tooltipEl.clientWidth - 10;
              }
              if (tooltipY + tooltipEl.clientHeight > positionY + 0.9 * canvasHeight) {
                tooltipY = positionY + tooltipModel.caretY - tooltipEl.clientHeight + 18;
              }
              if (tooltipX < positionX) {
                tooltipX = positionX + tooltipModel.caretX - tooltipEl.clientWidth / 2;
                tooltipY = positionY + tooltipModel.caretY - tooltipEl.clientHeight - 18;
              }
              tooltipEl.style.left = tooltipX + 'px';
              tooltipEl.style.top = tooltipY + 'px';
              tooltipEl.style.opacity = 1;
            },
          },
        },
      });
    },
    loadColors() {
      const { colorParse, colorHover, legendColors } = generateColors({
        yparse: this.yparse,
        tmpColorParse: this.tmpColorParse,
        selectedPalette: this.selectedPalette,
      });

      this.colorParse = colorParse;
      this.colorHover = colorHover;
      this.legendColors = legendColors;
    },
    choosePalette() {
      // Using the refactored choosePalette function from utils
      return choosePalette(this.selectedPalette);
    },
    changeColors(theme) {
      Chart.defaults.global.defaultFontColor = this.getHexaFromToken('text-mention-grey', theme);
      this.loadColors();
      this.chart.data.datasets[0].borderColor = this.colorParse;
      this.chart.data.datasets[0].backgroundColor = this.colorParse;
      this.chart.data.datasets[0].hoverBackgroundColor = this.colorHover;
      this.chart.data.datasets[0].hoverBorderColor = this.colorHover;
      this.chart.update(0);
    },
  },
};
</script>

<style scoped lang="scss">
@import '@/styles/Tooltip.scss';
@import '@/styles/Rcol.scss';
@import '@/styles/WidgetContainer.scss';
</style>
