/* eslint-disable */
<template>
  <div class="widget_container fr-grid-row" :id="widgetId">
    <div class="r_col fr-col-12">
      <div class="chart">
        <div class="linechart_tooltip">
          <div class="tooltip_header"></div>
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
import { mixin } from '@/utils.js';
import annotationPlugin from 'chartjs-plugin-annotation';
import {
  getColorsByIndex,
  getDefaultColor,
  getNeutralColor,
  categoricalPalette,
  sequentialAscending,
  sequentialDescending,
  divergentAscending,
  divergentDescending
} from '@/utils.js';

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
      selectedPalette: 'categorical' // Ajout de la propriété pour choisir la palette
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
    color: {
      type: String,
      default: undefined
    },
    date: {
      type: String,
      default: undefined
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
          pointStyle: 'rect',
          pointRadius: 4,
          pointHoverRadius: 4,
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
      this.colorParse = [];
      this.colorHover = [];
      const palette = this.choosePalette();
      for (let i = 0; i < this.yparse.length; i++) {
        let color;
        if (this.tmpColorParse[i] !== undefined) {
          color = this.tmpColorParse[i];
        } else {
          color = getColorsByIndex(i, palette);
        }
        this.colorParse.push(color);
        this.colorHover.push(chroma(color).brighten(0.5).hex());
      }
    },
    choosePalette() {
      // Priorité à la sélection manuelle de la palette
      switch (this.selectedPalette) {
        case 'categorical':
          return categoricalPalette;
        case 'sequentialAscending':
          return sequentialAscending;
        case 'sequentialDescending':
          return sequentialDescending;
        case 'divergentAscending':
          return divergentAscending;
        case 'divergentDescending':
          return divergentDescending;
        case 'neutral':
          return [getNeutralColor()];
        case 'defaultColor':
          return [getDefaultColor()];
        default:
          break;
      }

      // Par défaut, on retourne la palette catégorielle
      return categoricalPalette;
    },
    changeColors(theme) {
      Chart.defaults.global.defaultFontColor = getNeutralColor();
      this.chart.options.scale.gridLines.color = getNeutralColor();
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
      Chart.defaults.global.defaultFontFamily = 'Marianne';
      Chart.defaults.global.defaultFontSize = 12;
      Chart.defaults.global.defaultLineHeight = 1.66;
      Chart.defaults.global.defaultFontColor = getNeutralColor();

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
              backdropColor: 'transparent',
              fontColor: getNeutralColor()
            },
            gridLines: {
              color: getNeutralColor()
            }
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

                const divDate = this.$el.querySelector('.tooltip_header');
                divDate.innerHTML = titleLines[0];

                const color = tooltipModel.labelTextColors[0];
                const divValue = this.$el.querySelector('.tooltip_value');

                const nodeName = this.$el.querySelector('.tooltip_dot').attributes[0].nodeName;
                divValue.innerHTML = '';

                bodyLines[0].forEach((line, i) => {
                  if (line !== undefined) {
                    divValue.innerHTML += `
                      <div class="tooltip_value-content">
                        <span ${nodeName}="" class="tooltip_dot" style="background-color:${color[i]};"></span>
                        ${line}<br>
                      </div>
                    `;
                  }
                });
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
            }
          }
        }
      });
    }
  },
  created() {
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
@import './Style/RadarChart.scss';
</style>
