/* eslint-disable */
<template>
  <div class="widget_container fr-grid-row" :id="widgetId">
    <div class="r_col fr-col-12">
      <div class="chart">
        <div class="linechart_tooltip">
          <div class="tooltip_header fr-text--sm fr-mb-0"></div>
          <div class="tooltip_body">
            <div class="tooltip_value">
              <span class="tooltip_dot"></span>
            </div>
          </div>
        </div>
        <canvas :id="chartId"></canvas>
        <div class="chart_legend fr-mb-0 fr-mt-4v">
          <div v-for="(item, index) in nameParse" :key="item" class="flex fr-mt-3v fr-mb-1v">
            <span class="legende_dot" :style="{ 'background-color': colorParse[index] }"></span>
            <p class="fr-text--sm fr-text--bold fr-ml-1w fr-mb-0">
              {{ capitalize(nameParse[index]) }}
            </p>
          </div>
        </div>
        <div v-if="date !== undefined" class="flex fr-mt-1w" :style="{ 'margin-left': isSmall ? '0px' : style }">
          <p class="fr-text--xs">Mise à jour : {{ date }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import { Chart } from 'chart.js';
import chroma from 'chroma-js';
import annotationPlugin from 'chartjs-plugin-annotation';
import { choosePalette, mixin } from '@/utils/global.js';
import { generateColors } from '@/utils/colors.js';
import { configureChartDefaults } from '@/utils/configureChartDefaults.js';

Chart.pluginService.register(annotationPlugin);

export default {
  name: 'RadarChart',
  mixins: [mixin],
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
      isSmall: false,
    };
  },
  props: {
    x: {
      type: String,
      required: true
    },
    y: {
      type: String,
      required: true
    },
    name: {
      type: String,
      default: undefined
    },
    date: {
      type: String,
      default: undefined
    },
    selectedPalette: {
      type: String,
      default: ''
    },
    unitTooltip: {
      type: String,
      default: ''  // Default to an empty string if no unit is specified
    }
  },
  computed: {
    style() {
      return this.legendLeftMargin + 'px';
    }
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
    },
    getData() {
      // Récupération des paramètres
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
      const data = this.yparse;
      this.labels = this.xparse[0];

      // Tracé de la courbe
      data.forEach((dj, j) => {
        this.datasets.push({
          pointRadius: 5,
          pointHoverRadius: 5,
          data: dj,
          borderColor: this.colorParse[j],
          pointBackgroundColor: this.colorParse[j],
          backgroundColor: chroma(this.colorParse[j]).alpha(0.3).hex(),
          fill: true,
          hoverBorderColor: this.colorHover[j],
          hoverBackgroundColor: this.colorHover[j]
        });
      });
    },
    loadColors() {
      // Utilisation de generateColors
      const { colorParse, colorHover } = generateColors({
        yparse: this.yparse.map(() => [1]), // Simule une série avec une valeur unique
        tmpColorParse: this.tmpColorParse,
        selectedPalette: this.selectedPalette,
      });

      this.colorParse = colorParse.map(colors => colors[0]); // Récupère uniquement la première couleur de chaque série
      this.colorHover = colorHover.map(colors => colors[0]); // Idem pour les couleurs de survol
    },

    choosePalette() {
      // Using the refactored choosePalette function from utils
      return choosePalette(this.selectedPalette);
    },
    changeColors(theme) {
      Chart.defaults.global.defaultFontColor = this.getHexaFromToken('text-mention-grey', theme);
      this.chart.options.scale.gridLines.color = this.getHexaFromToken('text-mention-grey', theme);


      this.loadColors();
      for (let i = 0; i < this.yparse.length; i++) {
        this.chart.data.datasets[i].borderColor = this.colorParse[i];
        this.chart.data.datasets[i].pointBackgroundColor = this.colorParse[i];
        this.chart.data.datasets[i].backgroundColor = chroma(this.colorParse[i]).alpha(0.3).hex();
        this.chart.data.datasets[i].hoverBorderColor = this.colorHover[i];
        this.chart.data.datasets[i].hoverBackgroundColor = this.colorHover[i];
      }
      this.chart.update(0);
    },
    createChart() {
      if (this.chart) this.chart.destroy();

      this.getData();
      const ctx = document.getElementById(this.chartId).getContext('2d');
      this.chart = new Chart(ctx, {
        type: 'radar',
        data: {
          labels: this.labels,
          datasets: this.datasets
        },
        options: {
          animation: {
            easing: 'easeInOutBack',
            duration: 0
          },
          scale: {
            ticks: {
              display: false,  // Hide the tick labels
              backdropColor: 'transparent',
            },
            gridLines: {
              color: '#DDDDDD',
            },
            angleLines: {
              color: '#DDDDDD',
              lineWidth: 1,
              borderDash: [3, 3]
            },
          },
          legend: {
            display: false
          },
          tooltips: {
            enabled: false,
            displayColors: false,
            backgroundColor: '#6b6b6b',
            callbacks: {
              label: (tooltipItems) => {
                const label = [];
                this.datasets.forEach((set) => {
                  label.push(set.data[tooltipItems.index]);
                });
                return label;
              },
              title: (tooltipItems) => {
                return tooltipItems[0].label;
              },
              labelTextColor: () => {
                return this.colorParse;
              }
            },
            custom: (tooltipModel) => {
              // Tooltip Element
              const tooltipEl = this.$el.querySelector('.linechart_tooltip');

              // Hide if no tooltip
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
                const titleLines = [this.xparse[0][tooltipModel.dataPoints[0].index]];
                const bodyLines = tooltipModel.body.map(getBody);

                // Set the title in the tooltip header
                const divDate = tooltipEl.querySelector('.tooltip_header.fr-text--sm.fr-mb-0');
                divDate.innerHTML = titleLines[0];

                const divValue = tooltipEl.querySelector('.tooltip_value');
                divValue.innerHTML = '';

                // Retrieve the node name for tooltip dots
                const tooltipDotElement = this.$el.querySelector('.tooltip_dot');
                const nodeName = tooltipDotElement ? tooltipDotElement.attributes[0].nodeName : 'data-attribute';

                // Process each line in bodyLines to display in the tooltip
                bodyLines[0].forEach((line, i) => {
                  if (line !== undefined && tooltipModel.dataPoints[i]) {
                    // Get the color for the specific dataset index safely
                    const dataPoint = tooltipModel.dataPoints[i];
                    const datasetIndex = dataPoint.datasetIndex;

                    // Ensure that colorParse and datasetIndex are valid
                    const color = this.colorParse[datasetIndex] ? this.colorParse[datasetIndex] : '#000';  // Default to black if not found

                    // Include unitTooltip if provided
                    const displayValue = `${line}${this.unitTooltip ? ' ' + this.unitTooltip : ''}`;

                    divValue.innerHTML += `
                      <div class="tooltip_value-content" style="display: flex; align-items: center;">
                        <span ${nodeName}="" class="tooltip_dot" style="background-color:${color};"></span>
                        ${displayValue}
                      </div>
                    `;
                  }
                });
              }

              // Position the tooltip
              const { offsetLeft: positionX, offsetTop: positionY } = this.chart.canvas;
              const canvasWidth = Number(this.chart.canvas.style.width.replace(/\D/g, ''));
              const canvasHeight = Number(this.chart.canvas.style.height.replace(/\D/g, ''));

              tooltipEl.style.position = 'absolute';
              tooltipEl.style.padding = `${tooltipModel.padding}px ${tooltipModel.padding}px`;
              tooltipEl.style.pointerEvents = 'none';

              let tooltipX = positionX + window.pageXOffset + tooltipModel.caretX + 10;
              let tooltipY = positionY + window.pageYOffset + tooltipModel.caretY - 18;

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

              tooltipEl.style.left = `${tooltipX}px`;
              tooltipEl.style.top = `${tooltipY}px`;
              tooltipEl.style.opacity = 1;
            }
          }
        }
      });
    }
  },
  created() {
    configureChartDefaults();
    this.chartId = 'myChart' + Math.floor(Math.random() * 1000);
    this.widgetId = 'widget' + Math.floor(Math.random() * 1000);
  },
  mounted() {
    this.display =
      document.getElementById(this.widgetId).offsetWidth > 486 ? 'big' : 'small';
    this.createChart();
    const element = document.documentElement; // Référence à l'élément <html> du DOM
    element.addEventListener('dsfr.theme', (e) => {
      this.changeColors(e.detail.theme);
    });
    addEventListener('resize', () => {
      this.isSmall = document.documentElement.clientWidth < 767;
    });
  },
  beforeUpdate() {
    this.resetData();
    this.createChart();
    const element = document.documentElement;
    this.changeColors(element.getAttribute('data-fr-theme'));
  }
};
</script>

<style scoped lang="scss">
@import '@/styles/Tooltip.scss';
@import '@/styles/Rcol.scss';
@import '@/styles/WidgetContainer.scss';
</style>
