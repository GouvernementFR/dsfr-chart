/* eslint-disable */
<template>
  <div class="widget_container fr-grid-row" :id="widgetId">
    <div class="r_col fr-col-12">
      <div class="chart">
        <div class="linechart_tooltip" ref="tooltip">
          <div class="tooltip_header"></div>
          <div class="tooltip_body">
            <div class="tooltip_value">
              <div v-for="(item, index) in nameParse" :key="item" class="flex fr-mt-3v fr-mb-1v"
                :style="{ 'border-bottom': '1px solid #e0e0e0' }">
                <div class="tooltip_value-content">
                  <span class="tooltip_dot" :style="{ 'background-color': colorParse[index] }"></span>
                  <p class='tooltip_place'>{{ capitalize(nameParse[index]) }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <canvas :id="chartId"></canvas>
        <div class="flex fr-mt-1w fr-mb-0" :style="{ 'margin-left': isSmall ? '0px' : style }">
          <span class="legende_dot" :style="{ 'background-color': colorParse }"></span>
          <p class="fr-text--sm fr-text--bold fr-ml-1w fr-mb-0">{{ capitalize(name) }}</p>
        </div>
        <div v-for="(item, index) in hlineNameParse" :key="item" class="flex fr-mt-3v" :style="{ 'margin-left': isSmall ? '0px' : style }">
          <span class="legende_dash_line1" :style="{ 'background-color': hlineColorParse[index] }"></span>
          <span class="legende_dash_line2" :style="{ 'background-color': hlineColorParse[index] }"></span>
          <p class="fr-text--sm fr-text--bold fr-ml-1w fr-mb-0">{{ capitalize(hlineNameParse[index]) }}</p>
        </div>
        <div v-for="(item2, index2) in vlineParse" :key="item2" class="flex fr-mt-3v fr-mb-1v" :style="{ 'margin-left': isSmall ? '0px' : style }">
          <span class="legende_dash_line1" :style="{ 'background-color': vlineColorParse[index2] }"></span>
          <span class="legende_dash_line2" :style="{ 'background-color': vlineColorParse[index2] }"></span>
          <p class="fr-text--sm fr-text--bold fr-ml-1w fr-mb-0">{{ capitalize(vlineNameParse[index2]) }}</p>
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
import Chart from 'chart.js';
import chroma from 'chroma-js';
import { mixin } from '@/utils.js';
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

export default {
  name: 'LineChart',
  mixins: [mixin],
  data() {
    return {
      widgetId: '',
      chartId: '',
      chart: null,
      legendLeftMargin: 0,
      datasets: [],
      xAxisType: 'category',
      labels: undefined,
      xparse: [],
      yparse: [],
      vlineParse: [],
      vlineColorParse: [],
      tmpVlineColorParse: [],
      vlineNameParse: [],
      nameParse: [],
      hlineParse: [],
      hlineColorParse: [],
      tmpHlineColorParse: [],
      hlineNameParse: [],
      ymax: 0,
      colorParse: '',
      colorPrecisionBar: '#161616',
      colorHover: '',
      isSmall: false
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
      default: 'S1'
    },
    color: {
      type: String,
      default: undefined
    },
    vline: {
      type: String,
      default: undefined
    },
    vlinecolor: {
      type: String,
      default: undefined
    },
    vlinename: {
      type: String,
      default: undefined
    },
    hline: {
      type: String,
      default: undefined
    },
    hlinecolor: {
      type: String,
      default: undefined
    },
    hlinename: {
      type: String,
      default: undefined
    },
    date: {
      type: String,
      default: undefined
    },
    aspectratio: {
      type: Number,
      default: 2
    },
    formatdate: {
      type: Boolean,
      default: false
    },
    selectedPalette: {
      type: String,
      default: ''
    },
    highlightIndex: {
      type: Number,
      default: -1
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
      this.legendLeftMargin = 0;
      this.datasets = [];
      this.xAxisType = 'category';
      this.labels = undefined;
      this.xparse = [];
      this.yparse = [];
      this.vlineParse = [];
      this.vlineColorParse = [];
      this.tmpVlineColorParse = [];
      this.vlineNameParse = [];
      this.hlineParse = [];
      this.hlineColorParse = [];
      this.tmpHlineColorParse = [];
      this.hlineNameParse = [];
      this.ymax = 0;
      this.colorParse = '';
      this.colorPrecisionBar = '#161616';
      this.colorHover = '';
    },
    getData() {
      // Récupération des paramètres
      this.xparse = JSON.parse(this.x);
      this.yparse = JSON.parse(this.y);

      // Récupération données Vline
      if (this.vline !== undefined) {
        this.vlineParse = JSON.parse(this.vline);
        let tmpVlineNameParse = [];
        if (this.vlinename !== undefined) {
          tmpVlineNameParse = JSON.parse(this.vlinename);
        }
        if (this.vlinecolor !== undefined) {
          this.tmpVlineColorParse = JSON.parse(this.vlinecolor);
        }

        for (let i = 0; i < this.vlineParse.length; i++) {
          if (tmpVlineNameParse[i] !== undefined) {
            this.vlineNameParse.push(tmpVlineNameParse[i]);
          } else {
            this.vlineNameParse.push('V' + (i + 1));
          }
        }
      }

      // Récupération données Hline
      if (this.hline !== undefined) {
        this.hlineParse = JSON.parse(this.hline);
        let tmpHlineNameParse = [];
        if (this.hlinename !== undefined) {
          tmpHlineNameParse = JSON.parse(this.hlinename);
        }
        if (this.hlinecolor !== undefined) {
          this.tmpHlineColorParse = JSON.parse(this.hlinecolor);
        }

        for (let i = 0; i < this.hlineParse.length; i++) {
          if (tmpHlineNameParse[i] !== undefined) {
            this.hlineNameParse.push(tmpHlineNameParse[i]);
          } else {
            this.hlineNameParse.push('H' + (i + 1));
          }
        }
      }

      this.loadColors();
      let dataLine = [];

      // Cas où x est numérique
      if (typeof this.xparse[0] === 'number') {
        const xsort = this.xparse.map((a) => a).sort((a, b) => a - b);
        xsort.forEach((k) => {
          const index = this.xparse.findIndex((element) => element === k);
          dataLine.push({
            x: k,
            y: this.yparse[index]
          });
        });
        this.labels = undefined;
        this.xAxisType = 'linear';
      } else {
        // Cas où x est non numérique
        dataLine = this.yparse;
        this.labels = this.xparse;
        this.xAxisType = 'category';
      }

      // Définir ymax
      this.ymax = Math.max.apply(null, this.hlineParse);

      // Tracer de la courbe
      this.datasets = [
        {
          label: this.name,
          data: dataLine,
          borderColor: this.colorParse,
          backgroundColor: 'rgba(0, 0, 0, 0)',
          type: 'line',
          pointRadius: 4,
          pointBackgroundColor: this.colorParse,
          pointBorderColor: this.colorParse,
          pointHoverBackgroundColor: this.colorHover,
          pointHoverBorderColor: this.colorHover,
          pointHoverRadius: 6,
          borderWidth: 2,
          fill: false
        }
      ];
    },
    loadColors() {
      const palette = this.choosePalette();
      let color;
      if (this.color !== undefined) {
        color = this.color;
      } else {
        color = getColorsByIndex(0, palette);
      }
      this.colorParse = color;
      this.colorHover = chroma(color).brighten(0.5).hex();

      // Couleurs pour les lignes verticales (vlines)
      this.vlineColorParse = [];
      for (let i = 0; i < this.vlineParse.length; i++) {
        if (this.tmpVlineColorParse[i] !== undefined) {
          this.vlineColorParse.push(this.tmpVlineColorParse[i]);
        } else {
          this.vlineColorParse.push(getDefaultColor());
        }
      }

      // Couleurs pour les lignes horizontales (hlines)
      this.hlineColorParse = [];
      for (let i = 0; i < this.hlineParse.length; i++) {
        if (this.tmpHlineColorParse[i] !== undefined) {
          this.hlineColorParse.push(this.tmpHlineColorParse[i]);
        } else {
          this.hlineColorParse.push(getDefaultColor());
        }
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
      this.chart.options.scales.xAxes[0].ticks.fontColor = getNeutralColor();
      this.chart.options.scales.xAxes[0].gridLines.color = getNeutralColor();
      this.chart.options.scales.xAxes[0].gridLines.zeroLineColor = getNeutralColor();

      this.chart.options.scales.yAxes[0].ticks.fontColor = getNeutralColor();
      this.chart.options.scales.yAxes[0].gridLines.color = getNeutralColor();
      this.chart.options.scales.yAxes[0].gridLines.zeroLineColor = getNeutralColor();

      this.loadColors();
      if (theme === 'light') {
        this.colorPrecisionBar = '#161616';
      } else {
        this.colorPrecisionBar = '#FFFFFF';
      }
      this.chart.data.datasets[0].borderColor = this.colorParse;
      this.chart.data.datasets[0].pointBackgroundColor = this.colorParse;
      this.chart.data.datasets[0].pointBorderColor = this.colorParse;
      this.chart.data.datasets[0].pointHoverBackgroundColor = this.colorHover;
      this.chart.data.datasets[0].pointHoverBorderColor = this.colorHover;
      this.chart.update(0);
    },
    createChart() {
      Chart.defaults.global.defaultFontFamily = 'Marianne';
      Chart.defaults.global.defaultFontSize = 12;
      Chart.defaults.global.defaultLineHeight = 1.66;
      Chart.defaults.global.defaultFontColor = getNeutralColor();

      this.getData();
      const ctx = document.getElementById(this.chartId).getContext('2d');
      const self = this;
      this.chart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: this.labels,
          datasets: this.datasets
        },
        options: {
          responsive: true,
          maintainAspectRatio: true,
          aspectRatio: this.aspectratio,
          animation: {
            easing: 'easeInOutBack',
            duration: 1000
          },
          scales: {
            xAxes: [
              {
                type: this.xAxisType,
                gridLines: {
                  drawTicks: false,
                  zeroLineColor: getNeutralColor(),
                  drawOnChartArea: false,
                  color: getNeutralColor(),
                  lineWidth: 1
                },
                ticks: {
                  fontColor: getNeutralColor(),
                  labelOffset: 10,
                  callback: function (value) {
                    if (self.formatdate) {
                      const date = new Date(value);
                      return date.getMonth() + 1 + '/' + date.getFullYear();
                    } else {
                      return value;
                    }
                  }
                }
              }
            ],
            yAxes: [
              {
                gridLines: {
                  drawTicks: false,
                  zeroLineColor: getNeutralColor(),
                  color: getNeutralColor(),
                  lineWidth: 1
                },
                ticks: {
                  fontColor: getNeutralColor(),
                  padding: 8,
                  suggestedMax: this.ymax,
                  autoSkip: true,
                  maxTicksLimit: 5,
                  callback: function (value, index, values) {
                    if (value >= 1e9 || value <= -1e9) {
                      return value / 1e9 + 'B';
                    } else if (value >= 1e6 || value <= -1e6) {
                      return value / 1e6 + 'M';
                    } else if (value >= 1e3 || value <= -1e3) {
                      return value / 1e3 + 'K';
                    }
                    return value;
                  }
                },
                afterFit: function (axis) {
                  self.legendLeftMargin = axis.width;
                }
              }
            ]
          },
          legend: {
            display: false
          },
          tooltips: {
            enabled: false,
            mode: 'index',
            intersect: false,
            custom: function (tooltipModel) {
              const tooltipEl = self.$refs.tooltip;

              if (tooltipModel.opacity === 0) {
                tooltipEl.style.opacity = 0;
                return;
              }

              tooltipEl.classList.remove('above', 'below', 'no-transform');
              if (tooltipModel.yAlign) {
                tooltipEl.classList.add(tooltipModel.yAlign);
              } else {
                tooltipEl.classList.add('no-transform');
              }

              if (tooltipModel.body) {
                const titleLines = tooltipModel.title || [];
                const bodyLines = tooltipModel.body.map(function (bodyItem) {
                  return bodyItem.lines;
                });

                const divDate = tooltipEl.querySelector('.tooltip_header');
                divDate.innerHTML = titleLines[0];

                const divValue = tooltipEl.querySelector('.tooltip_value');
                divValue.innerHTML = '';

                bodyLines.forEach(function (line, i) {
                  if (line !== undefined) {
                    divValue.innerHTML += `
                    <div class="tooltip_value-content" style="display: flex; justify-content: space-between; align-items: center;">
                      <span class="tooltip_dot" style="background-color: ${self.colorParse};"></span>
                      <p class="tooltip_place fr-mb-0">${line}</p>
                    </div>
                  `;
                  }
                });
              }

              const positionX = self.chart.canvas.offsetLeft;
              const positionY = self.chart.canvas.offsetTop;

              tooltipEl.style.position = 'absolute';
              tooltipEl.style.pointerEvents = 'none';

              let tooltipX = positionX + tooltipModel.caretX + 10;
              let tooltipY = positionY + tooltipModel.caretY - 18;

              const canvasWidth = self.chart.canvas.clientWidth;
              const canvasHeight = self.chart.canvas.clientHeight;

              if (tooltipX + tooltipEl.clientWidth + self.legendLeftMargin > positionX + canvasWidth) {
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
        },
        plugins: [
          {
            afterDatasetsDraw: function (chart) {
              const ctx = chart.ctx;
              const xAxis = chart.scales['x-axis-0'];
              const yAxis = chart.scales['y-axis-0'];

              // Lignes verticales (vlines)
              if (self.vlineParse !== undefined) {
                self.vlineParse.forEach(function (line, j) {
                  const x = xAxis.getPixelForValue(line);

                  ctx.beginPath();
                  ctx.moveTo(x, yAxis.bottom);
                  ctx.strokeStyle = self.vlineColorParse[j];
                  ctx.lineWidth = 3;
                  ctx.setLineDash([10, 5]);
                  ctx.lineTo(x, yAxis.top);
                  ctx.stroke();
                });
              }

              // Lignes horizontales (hlines)
              if (self.hlineParse !== undefined) {
                self.hlineParse.forEach(function (line, j) {
                  const y = yAxis.getPixelForValue(line);

                  ctx.beginPath();
                  ctx.moveTo(xAxis.left, y);
                  ctx.strokeStyle = self.hlineColorParse[j];
                  ctx.lineWidth = 3;
                  ctx.setLineDash([10, 5]);
                  ctx.lineTo(xAxis.right, y);
                  ctx.stroke();
                });
              }
            },
            afterDraw: function (chart) {
              if (chart.tooltip._active && chart.tooltip._active.length) {
                const ctx = chart.ctx;
                const activePoint = chart.tooltip._active[0];
                const x = activePoint.tooltipPosition().x;
                const y = activePoint.tooltipPosition().y;
                const xAxis = chart.scales['x-axis-0'];
                const yAxis = chart.scales['y-axis-0'];

                ctx.save();
                ctx.beginPath();
                ctx.moveTo(x, yAxis.top);
                ctx.lineTo(x, yAxis.bottom);
                ctx.lineWidth = 1;
                ctx.strokeStyle = self.colorPrecisionBar;
                ctx.setLineDash([10, 5]);
                ctx.stroke();
                ctx.restore();

                ctx.save();
                ctx.beginPath();
                ctx.moveTo(xAxis.left, y);
                ctx.lineTo(xAxis.right, y);
                ctx.lineWidth = 1;
                ctx.strokeStyle = self.colorPrecisionBar;
                ctx.setLineDash([10, 5]);
                ctx.stroke();
                ctx.restore();
              }
            }
          }
        ]
      });
    }
  },
  created() {
    this.widgetId = 'widget' + Math.floor(Math.random() * 1000);
    this.chartId = 'myChart' + Math.floor(Math.random() * 1000);
  },
  mounted() {
    const element = document.documentElement; // Référence à l'élément <html> du DOM
    this.createChart();
    element.addEventListener('dsfr.theme', (e) => {
      if (this.chartId !== '') {
        this.changeColors(e.detail.theme);
      }
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
@import './Style/LineChart.scss'
</style>
