/* eslint-disable */
<template>
  <div class="widget_container fr-grid-row" :id="widgetId">
    <div class="r_col fr-col-12">
      <div class="chart">
        <div class="linechart_tooltip">
          <div class="tooltip_header fr-text--sm fr-mb-0"></div>
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
        <div class="chart_legend fr-mb-0 fr-mt-4v">
          <div class="flex">
            <span class="legende_dot" :style="{ 'background-color': colorBarParse }"></span>
            <p class="fr-text--sm fr-text--bold fr-ml-1w fr-mb-0">{{ capitalize(namebar) }}</p>
          </div>
          <div class="flex">
            <span class="legende_dot" :style="{ 'background-color': colorParse }"></span>
            <p class="fr-text--sm fr-text--bold fr-ml-1w fr-mb-0">{{ capitalize(name) }}</p>
          </div>
          <div v-for="(item, index) in hlineNameParse" :key="item" class="flex">
            <span class="legende_dash_line1" :style="{ 'background-color': hlineColorParse[index] }"></span>
            <span class="legende_dash_line2" :style="{ 'background-color': hlineColorParse[index] }"></span>
            <p class="fr-text--sm fr-text--bold fr-ml-1w fr-mb-0">{{ capitalize(hlineNameParse[index]) }}</p>
          </div>
          <div v-for="(item2, index2) in vlineParse" :key="item2" class="flex">
            <span class="legende_dash_line1" :style="{ 'background-color': vlineColorParse[index2] }"></span>
            <span class="legende_dash_line2" :style="{ 'background-color': vlineColorParse[index2] }"></span>
            <p class="fr-text--sm fr-text--bold fr-ml-1w fr-mb-0">{{ capitalize(vlineNameParse[index2]) }}</p>
          </div>
        </div>
        <div v-if="date !== undefined" class="flex fr-mt-1w">
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
import {
  choosePalette,
  getColorsByIndex,
  getNeutralColor,
} from '@/utils.js';

export default {
  name: 'BarLineChart',
  mixins: [mixin],
  data() {
    return {
      widgetId: '',
      chartId: '',
      chart: undefined,
      legendLeftMargin: 0,
      display: '',
      datasets: [],
      xAxisType: 'category',
      labels: undefined,
      xparse: [],
      yparse: [],
      ybarparse: [],
      vlineParse: [],
      vlineColorParse: [],
      nameParse: [],
      tmpVlineColorParse: [],
      vlineNameParse: [],
      hlineParse: [],
      hlineColorParse: [],
      tmpHlineColorParse: [],
      hlineNameParse: [],
      ymax: 0,
      colorParse: undefined,
      colorBarParse: undefined,
      colorPrecisionBar: '#161616',
      colorHover: undefined,
      colorbarHover: undefined,
      isSmall: false
    };
  },
  props: {
    x: {
      type: String,
      required: true
    },
    ybar: {
      type: String,
      required: true
    },
    namebar: {
      type: String,
      default: 'B1'
    },
    colorbar: {
      type: String,
      default: undefined
    },
    y: {
      type: String,
      required: true
    },
    name: {
      type: String,
      default: 'S1'
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
      default: 'categorical'
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
      this.legendLeftMargin = 0;
      this.display = '';
      this.datasets = [];
      this.xAxisType = 'category';
      this.labels = undefined;
      this.xparse = [];
      this.yparse = [];
      this.ybarparse = [];
      this.vlineParse = [];
      this.vlineColorParse = [];
      this.tmpVlineColorParse = [];
      this.vlineNameParse = [];
      this.hlineParse = [];
      this.hlineColorParse = [];
      this.tmpHlineColorParse = [];
      this.hlineNameParse = [];
      this.ymax = 0;
      this.colorParse = undefined;
      this.colorBarParse = undefined;
      this.colorPrecisionBar = '#161616';
      this.colorHover = undefined;
      this.colorbarHover = undefined;
    },
    getData() {
      // Récupération des paramètres
      this.xparse = JSON.parse(this.x);
      this.yparse = JSON.parse(this.y);
      this.ybarparse = JSON.parse(this.ybar);

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
      let dataBar = [];
      // Cas où x est numérique
      if (typeof this.xparse[0] === 'number') {
        const xsort = this.xparse.map((a) => a).sort((a, b) => a - b);
        xsort.forEach((k) => {
          const index = this.xparse.findIndex((element) => element === k);
          dataLine.push(this.yparse[index]);
          dataBar.push(this.ybarparse[index]);
        });
        this.labels = xsort;
        this.xAxisType = 'category';
      } else {
        // Cas où x est non numérique
        dataLine = this.yparse;
        dataBar = this.ybarparse;
        this.labels = this.xparse;
        this.xAxisType = 'category';
      }

      // Définir ymax
      this.ymax = Math.max.apply(null, this.hlineParse);

      // Tracer de la courbe
      this.datasets = [
        {
          data: dataBar,
          backgroundColor: this.colorBarParse,
          borderColor: this.colorBarParse,
          hoverBorderColor: this.colorbarHover,
          hoverBackgroundColor: this.colorbarHover,
          pointRadius: 4,
          pointHoverRadius: 4,
          barThickness: 32,
          type: 'bar',
          barPercentage: 0.5,
          yAxisID: 'yAxisL',
          order: 2
        },
        {
          data: dataLine,
          backgroundColor: 'rgba(0, 0, 0, 0)',
          borderColor: this.colorParse,
          type: 'line',
          pointRadius: 7,
          pointHoverRadius: 7,
          pointBackgroundColor: this.colorParse,
          pointBorderColor: this.colorParse,
          pointHoverBackgroundColor: this.colorHover,
          pointHoverBorderColor: this.colorHover,
          yAxisID: 'yAxisR',
          order: 1
        }
      ];
    },
    choosePalette() {
      // Using the refactored choosePalette function from utils
      return choosePalette(this.selectedPalette);
    },

    loadColors() {
      const palette = this.choosePalette();

      // Couleur pour la ligne
      if (this.color !== undefined) {
        this.colorParse = this.color;
      } else {
        this.colorParse = getColorsByIndex(1, palette);
      }

      // Couleur pour les barres
      if (this.colorbar !== undefined) {
        this.colorBarParse = this.colorbar;
      } else {
        this.colorBarParse = getColorsByIndex(0, palette);
      }

      // Couleurs pour le survol (hover)
      this.colorHover = chroma(this.colorParse).darken(0.8).hex();
      this.colorbarHover = chroma(this.colorBarParse).darken(0.8).hex();

      // Couleurs pour les lignes verticales (vlines)
      this.vlineColorParse = [];
      for (let i = 0; i < this.vlineParse.length; i++) {
        if (this.tmpVlineColorParse[i] !== undefined) {
          this.vlineColorParse.push(this.tmpVlineColorParse[i]);
        } else {
          this.vlineColorParse.push(getNeutralColor());
        }
      }

      // Couleurs pour les lignes horizontales (hlines)
      this.hlineColorParse = [];
      for (let i = 0; i < this.hlineParse.length; i++) {
        if (this.tmpHlineColorParse[i] !== undefined) {
          this.hlineColorParse.push(this.tmpHlineColorParse[i]);
        } else {
          this.hlineColorParse.push(getNeutralColor());
        }
      }
    },
    createChart() {
      Chart.defaults.global.defaultFontFamily = 'Marianne';
      Chart.defaults.global.defaultFontSize = 12;
      Chart.defaults.global.defaultLineHeight = 1.66;
      Chart.defaults.global.defaultFontColor = '#DDDDDD';

      this.getData();
      const self = this;
      const ctx = document.getElementById(self.chartId).getContext('2d');
      this.chart = new Chart(ctx, {
        data: {
          labels: self.labels,
          datasets: self.datasets
        },
        plugins: [
          {
            afterDatasetDraw: function (chart, args, options) {
              if (self.vlineParse !== undefined) {
                self.vlineParse.forEach(function (line, j) {
                  const ctx = chart.ctx;
                  const xAxis = chart.scales['x-axis-0'];
                  const yAxis = chart.scales.yAxisL;

                  const x = xAxis.getPixelForValue(line);

                  ctx.beginPath();
                  ctx.moveTo(x, yAxis.bottom);
                  ctx.strokeStyle = self.vlineColorParse[j];
                  ctx.lineWidth = '3';
                  ctx.setLineDash([10, 5]);
                  ctx.lineTo(x, yAxis.top);
                  ctx.stroke();
                });
              }
              if (self.hlineParse !== undefined) {
                self.hlineParse.forEach(function (line, j) {
                  const ctx = chart.ctx;
                  const xAxis = chart.scales['x-axis-0'];
                  const yAxis = chart.scales.yAxisL;
                  const y = yAxis.getPixelForValue(line);

                  ctx.beginPath();
                  ctx.moveTo(xAxis.left, y);
                  ctx.strokeStyle = self.hlineColorParse[j];
                  ctx.lineWidth = '3';
                  ctx.setLineDash([10, 5]);
                  ctx.lineTo(xAxis.right, y);
                  ctx.stroke();
                });
              }
            }
          },
          {
            afterDraw: function (chart, args, options) {
              if (chart.tooltip._active !== undefined) {
                if (chart.tooltip._active.length !== 0) {
                  const x = chart.tooltip._active[0]._model.x;
                  const index = chart.tooltip._active[0]._index;
                  const yAxisR = chart.scales.yAxisR;
                  const yAxisL = chart.scales.yAxisL;
                  const xAxis = chart.scales['x-axis-0'];

                  const y = yAxisR.getPixelForValue(self.yparse[index]);
                  const ybar = yAxisL.getPixelForValue(self.ybarparse[index]);

                  const ctx = chart.ctx;

                  // Draw the vertical line under the points
                  ctx.save();
                  ctx.beginPath();
                  ctx.moveTo(x, yAxisL.top);
                  ctx.lineTo(x, yAxisL.bottom);
                  ctx.lineWidth = '1';
                  ctx.strokeStyle = self.colorPrecisionBar;
                  ctx.setLineDash([10, 5]);
                  ctx.stroke();
                  ctx.restore();

                  // Draw the horizontal line for the line chart value
                  ctx.save();
                  ctx.beginPath();
                  ctx.moveTo(xAxis.left, y);
                  ctx.lineTo(x, y);
                  ctx.lineWidth = '1';
                  ctx.strokeStyle = self.colorPrecisionBar;
                  ctx.setLineDash([10, 5]);
                  ctx.stroke();
                  ctx.restore();

                  // Draw the horizontal line for the bar chart value
                  ctx.save();
                  ctx.beginPath();
                  ctx.moveTo(xAxis.left, ybar);
                  ctx.lineTo(x, ybar);
                  ctx.lineWidth = '1';
                  ctx.strokeStyle = self.colorPrecisionBar;
                  ctx.setLineDash([10, 5]);
                  ctx.stroke();
                  ctx.restore();
                }
              }
            }
          }
        ],
        options: {
          aspectRatio: this.aspectratio,
          animation: {
            easing: 'easeInOutBack',
            duration: 1000
          },
          scales: {
            xAxes: [
              {
                offset: true,
                type: self.xAxisType,
                gridLines: {
                  zeroLineColor: '#DDDDDD',
                  drawOnChartArea: false,
                  color: '#DDDDDD',
                  lineWidth: 1
                },
                ticks: {
                  callback: function (value) {
                    if (self.formatdate) {
                      return value.toString().substring(5, 7) + '/' + value.toString().substring(0, 4);
                    } else {
                      return value;
                    }
                  }
                }
              }
            ],
            yAxes: [
              {
                position: 'left',
                id: 'yAxisL',
                gridLines: {
                  drawTicks: false,
                  zeroLineColor: '#DDDDDD',
                  color: '#DDDDDD',
                  borderDash: [3],
                  lineWidth: 1
                },
                ticks: {
                  padding: 8,
                  suggestedMin: 0,
                  suggestedMax: self.ymax,
                  maxTicksLimit: 5,
                  callback: function (value, index, values) {
                    if (value >= 1000000000 || value <= -1000000000) {
                      return value / 1e9 + 'B';
                    } else if (value >= 1000000 || value <= -1000000) {
                      return value / 1e6 + 'M';
                    } else if (value >= 1000 || value <= -1000) {
                      return value / 1e3 + 'K';
                    }
                    return value;
                  }
                },
                afterFit: function (axis) {
                  self.legendLeftMargin = axis.width;
                }
              },
              {
                position: 'right',
                id: 'yAxisR',
                gridLines: {
                  drawTicks: false,
                  zeroLineColor: '#DDDDDD',
                  color: '#DDDDDD',
                  borderDash: [3],
                  lineWidth: 1
                },
                ticks: {
                  padding: 8,
                  maxTicksLimit: 5,
                  suggestedMin: 0,
                  callback: function (value, index, values) {
                    if (value >= 1000000000 || value <= -1000000000) {
                      return value / 1e9 + 'B';
                    } else if (value >= 1000000 || value <= -1000000) {
                      return value / 1e6 + 'M';
                    } else if (value >= 1000 || value <= -1000) {
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
            displayColors: false,
            backgroundColor: '#6b6b6b',
            callbacks: {
              label: function (tooltipItems) {
                const label = [];
                self.datasets.forEach(function (set, i) {
                  label.push(self.convertIntToHuman(set.data[tooltipItems.index]));
                });
                return label;
              },
              title: function (tooltipItems) {
                return tooltipItems[0].label;
              }
            },
            custom: function (context) {
              // Tooltip Element
              const tooltipEl = self.$el.querySelector('.linechart_tooltip');

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

                // Set the title in the tooltip header
                const divDate = tooltipEl.querySelector('.tooltip_header.fr-text--sm.fr-mb-0');
                divDate.innerHTML = titleLines[0];

                const divValue = tooltipEl.querySelector('.tooltip_value');
                divValue.innerHTML = '';

                // Access color arrays for different datasets
                const colors = [self.colorBarParse, self.colorParse]; // Adjust to match your color variables

                // If there is no .tooltip_dot element, set a fallback for nodeName
                const tooltipDotElement = self.$el.querySelector('.tooltip_dot');
                const nodeName = tooltipDotElement ? tooltipDotElement.attributes[0].nodeName : 'data-attribute';

                // Iterate over bodyLines to set each line with the correct color and value
                bodyLines[0].forEach(function (line, i) {
                  if (line !== undefined) {
                    const color = colors[i] ? colors[i] : '#000'; // Fallback to black if color is undefined
                    const displayValue = `${line}${self.unitTooltip ? ' ' + self.unitTooltip : ''}`;

                    divValue.innerHTML += `
                      <div class="tooltip_value-content" style="display: flex; align-items: center;">
                        <span ${nodeName} class="tooltip_dot" style="background-color:${color};"></span>
                        ${displayValue}
                      </div>
                    `;
                  }
                });
              }

              // Position the tooltip
              const { offsetLeft: positionX, offsetTop: positionY } = self.chart.canvas;
              const canvasWidth = Number(self.chart.canvas.style.width.replace(/\D/g, ''));
              const canvasHeight = Number(self.chart.canvas.style.height.replace(/\D/g, ''));

              tooltipEl.style.position = 'absolute';
              tooltipEl.style.padding = `${tooltipModel.padding}px ${tooltipModel.padding}px`;
              tooltipEl.style.pointerEvents = 'none';

              let tooltipX = positionX + window.pageXOffset + tooltipModel.caretX + 10;
              let tooltipY = positionY + window.pageYOffset + tooltipModel.caretY - 18;

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

              tooltipEl.style.left = `${tooltipX}px`;
              tooltipEl.style.top = `${tooltipY}px`;
              tooltipEl.style.opacity = 1;
            }

          }
        }
      });
    },
    changeColors(theme) {
      this.chart.options.scales.xAxes[0].ticks.fontColor = this.getHexaFromToken('text-mention-grey', theme);

      this.loadColors();
      if (theme === 'light') {
        this.colorPrecisionBar = '#161616';
      } else {
        this.colorPrecisionBar = '#FFFFFF';
      }
      this.chart.data.datasets[0].backgroundColor = this.colorBarParse;
      this.chart.data.datasets[0].borderColor = this.colorBarParse;
      this.chart.data.datasets[1].borderColor = this.colorParse;
      this.chart.data.datasets[0].hoverBackgroundColor = this.colorbarHover;
      this.chart.data.datasets[0].hoverBorderColor = this.colorbarHover;
      this.chart.data.datasets[1].pointHoverBackgroundColor = this.colorHover;
      this.chart.data.datasets[1].pointHoverBorderColor = this.colorHover;
      this.chart.update(0);
    }
  },
  created() {
    this.chartId = 'myChart' + Math.floor(Math.random() * 1000);
    this.widgetId = 'widget' + Math.floor(Math.random() * 1000);
  },
  mounted() {
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
@import './Style/Tooltip.scss';
@import './Style/Rcol.scss';
@import './Style/WidgetContainer.scss';
</style>
