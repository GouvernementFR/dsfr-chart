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
              <div
                v-for="(item, index) in nameParse"
                :key="item"
                class="flex fr-mt-3v fr-mb-1v"
                :style="{ 'border-bottom': '1px solid #e0e0e0' }"
              >
                <div class="tooltip_value-content">
                  <span
                    class="tooltip_dot"
                    :style="{ 'background-color': colorParse[index] }"
                  />
                  <p class="tooltip_place">
                    {{ capitalize(nameParse[index]) }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <canvas :ref="chartId" />
        <div class="chart_legend fr-mb-0 fr-mt-4v">
          <div
            v-for="(item, index) in nameParse"
            :key="item"
            class="flex fr-mt-3v fr-mb-1v"
          >
            <span
              class="legende_dot"
              :style="{ 'background-color': colorParse[index], opacity: opacity[index] }"
              @click="ChangeShowLine(index)"
            />
            <p
              class="fr-text--sm fr-text--bold fr-ml-1w fr-mb-0"
              :style="{ opacity: opacity[index] }"
              @click="ChangeShowLine(index)"
            >
              {{ capitalize(nameParse[index]) }}
            </p>
          </div>
        </div>
        <div
          v-for="(item2, index2) in hlineNameParse"
          :key="item2"
          class="flex fr-mt-3v"
          :style="{ 'margin-left': isSmall ? '0px' : style }"
        >
          <span
            class="legende_dash_line1"
            :style="{ 'background-color': hlineColorParse[index2] }"
          />
          <span
            class="legende_dash_line2"
            :style="{ 'background-color': hlineColorParse[index2] }"
          />
          <p class="fr-text--sm fr-text--bold fr-ml-1w fr-mb-0">
            {{ capitalize(hlineNameParse[index2]) }}
          </p>
        </div>
        <div
          v-for="(item3, index3) in vlineNameParse"
          :key="item3"
          class="flex fr-mt-3v fr-mb-1v"
          :style="{ 'margin-left': isSmall ? '0px' : style }"
        >
          <span
            class="legende_dash_line1"
            :style="{ 'background-color': vlineColorParse[index3] }"
          />
          <span
            class="legende_dash_line2"
            :style="{ 'background-color': vlineColorParse[index3] }"
          />
          <p class="fr-text--sm fr-text--bold fr-ml-1w fr-mb-0">
            {{ capitalize(vlineNameParse[index3]) }}
          </p>
        </div>
        <div
          v-if="date !== undefined"
          class="flex fr-mt-1w"
          :style="{ 'margin-left': isSmall ? '0px' : style }"
        >
          <p class="fr-text--xs">
            Mise à jour : {{ date }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Chart } from 'chart.js';
import chroma from 'chroma-js';
import { mixin, getColorsByIndex, getNeutralColor, choosePalette } from '@/utils/global.js';
import { configureChartDefaults } from '@/utils/configureChartDefaults.js';

export default {
  name: 'MultiLineChart',
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
    vline: {
      type: String,
      default: undefined,
    },
    vlinecolor: {
      type: String,
      default: undefined,
    },
    vlinename: {
      type: String,
      default: undefined,
    },
    hline: {
      type: String,
      default: undefined,
    },
    hlinecolor: {
      type: String,
      default: undefined,
    },
    hlinename: {
      type: String,
      default: undefined,
    },
    date: {
      type: String,
      default: undefined,
    },
    aspectratio: {
      type: Number,
      default: 2,
    },
    formatdate: {
      type: [Boolean, String],
      default: false,
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
      legendLeftMargin: 100,
      display: '',
      datasets: [],
      xAxisType: 'category',
      labels: undefined,
      opacity: [],
      showLine: [],
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
      ymax: 0,
      colorPrecisionBar: '',
      colorHover: [],
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
      this.legendLeftMargin = 100;
      this.display = '';
      this.datasets = [];
      this.xAxisType = '';
      this.labels = undefined;
      this.opacity = [];
      this.showLine = [];
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
      this.ymax = 0;
      this.colorPrecisionBar = '';
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
        this.showLine.push(true);
        if (tmpNameParse[i] !== undefined) {
          this.nameParse.push(tmpNameParse[i]);
        } else {
          this.nameParse.push('Serie' + (i + 1));
        }
      }

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

      // Formatage des données
      let data = [];
      // Cas où x est numérique
      if (typeof this.xparse[0][0] === 'number') {
        const allX = [];
        this.xparse.forEach((xj, j) => {
          const dj = [];
          const xsort = xj.map((a) => a).sort((a, b) => a - b);
          xsort.forEach((k) => {
            const index = xj.findIndex((element) => element === k);
            dj.push({
              x: k,
              y: this.yparse[j][index],
            });
            if (!allX.includes(k)) {
              allX.push(k);
            }
          });
          data.push(dj);
        });
        this.labels = undefined;
        this.xAxisType = 'linear';
      } else {
        // Cas où x est non numérique
        data = this.yparse;
        this.labels = this.xparse[0];
        this.xAxisType = 'category';
      }

      // Définir ymax
      this.ymax = Math.max.apply(null, this.hlineParse.concat(this.yparse.flat()));

      // Tracé de la courbe
      data.forEach((dj, j) => {
        this.datasets.push({
          data: dj,
          fill: false,
          borderColor: this.colorParse[j],
          type: 'line',
          pointRadius: 5,
          pointHoverRadius: 5,
          pointBackgroundColor: this.colorParse[j],
          pointBorderColor: this.colorParse[j],
          pointHoverBackgroundColor: this.colorHover[j],
          pointHoverBorderColor: this.colorHover[j],
          borderWidth: 2,
        });
      });
    },
    loadColors() {
      this.colorParse = [];
      this.colorHover = [];
      const palette = this.choosePalette();
      for (let i = 0; i < this.yparse.length; i++) {
        if (this.tmpColorParse[i] !== undefined) {
          const color = this.tmpColorParse[i];
          this.colorParse.push(color);
          this.colorHover.push(chroma(color).brighten(0.5).hex());
        } else {
          const color = getColorsByIndex(i, palette);
          this.colorParse.push(color);
          this.colorHover.push(chroma(color).brighten(0.5).hex());
        }
      }

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
    choosePalette() {
      // Using the refactored choosePalette function from utils
      return choosePalette(this.selectedPalette);
    },
    changeColors(theme) {
      Chart.defaults.global.defaultFontColor = this.getHexaFromToken('text-mention-grey', theme);
      this.chart.options.scales.xAxes[0].ticks.fontColor = this.getHexaFromToken('text-mention-grey', theme);
      this.chart.options.scales.yAxes[0].ticks.fontColor = this.getHexaFromToken('text-mention-grey', theme);

      this.loadColors();
      if (theme === 'light') {
        this.colorPrecisionBar = '#161616';
      } else {
        this.colorPrecisionBar = '#FFFFFF';
      }
      for (let i = 0; i < this.yparse.length; i++) {
        this.chart.data.datasets[i].borderColor = this.colorParse[i];
        this.chart.data.datasets[i].backgroundColor = this.colorParse[i];
        this.chart.data.datasets[i].pointHoverBackgroundColor = this.colorHover[i];
        this.chart.data.datasets[i].pointHoverBorderColor = this.colorHover[i];
      }
      this.chart.update(0);
    },

    createChart() {
      if (this.chart) this.chart.destroy();

      this.getData();

      const self = this;
      const ctx = this.$refs[self.chartId].getContext('2d');

      this.chart = new Chart(ctx, {
        data: {
          labels: self.labels,
          datasets: self.datasets,
        },
        plugins: [
          {
            afterDatasetDraw: function (chart) {
              if (self.vlineParse !== undefined) {
                self.vlineParse.forEach(function (line, j) {
                  const ctx = chart.ctx;
                  const xAxis = chart.scales['x-axis-0'];
                  const yAxis = chart.scales['y-axis-0'];

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
                  const yAxis = chart.scales['y-axis-0'];
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
            },
          },
          {
            afterDraw: function (chart) {
              if (chart.tooltip._active !== undefined) {
                if (chart.tooltip._active.length !== 0) {
                  const x = chart.tooltip._active[0]._model.x;
                  let y;
                  const index = chart.tooltip._active[0]._index;
                  const yAxis = chart.scales['y-axis-0'];
                  const xAxis = chart.scales['x-axis-0'];
                  const ctx = chart.ctx;
                  ctx.save();
                  ctx.beginPath();
                  ctx.moveTo(x, yAxis.top);
                  ctx.lineTo(x, yAxis.bottom);
                  ctx.lineWidth = '1';
                  ctx.strokeStyle = self.colorPrecisionBar;
                  ctx.setLineDash([10, 5]);
                  ctx.stroke();
                  ctx.restore();

                  self.yparse.forEach(function (yj) {
                    y = yAxis.getPixelForValue(yj[index]);
                    ctx.save();
                    ctx.beginPath();
                    ctx.moveTo(xAxis.left, y);
                    ctx.lineTo(xAxis.right, y);
                    ctx.lineWidth = '1';
                    ctx.strokeStyle = self.colorPrecisionBar;
                    ctx.setLineDash([10, 5]);
                    ctx.stroke();
                    ctx.restore();
                  });
                }
              }
            },
          },
        ],
        options: {
          aspectRatio: this.aspectratio,
          animation: {
            easing: 'easeInOutBack',
            duration: 1000,
          },
          scales: {
            xAxes: [
              {
                offset: true,
                position: 'center',
                type: self.xAxisType,
                gridLines: {
                  zeroLineColor: '#DDDDDD',
                  drawOnChartArea: false,
                  color: '#DDDDDD',
                  lineWidth: 1,
                },
                ticks: {
                  padding: 10, // Espace supplémentaire autour des étiquettes
                  callback: function (value) {
                    if (self.formatdate) {
                      return value.toString().substring(5, 7) + '/' + value.toString().substring(0, 4);
                    } else {
                      return value;
                    }
                  },
                },
              },
            ],
            yAxes: [
              {
                position: 'left',
                gridLines: {
                  drawTicks: false,
                  zeroLineColor: '#DDDDDD',
                  color: '#DDDDDD',
                  borderDash: [3],
                  lineWidth: 1,
                },
                ticks: {
                  padding: 4,
                  autoSkip: true,
                  maxTicksLimit: 5,
                  suggestedMax: self.ymax,
                  callback: function (value) {
                    if (value >= 1000000000 || value <= -1000000000) {
                      return value / 1e9 + 'B';
                    } else if (value >= 1000000 || value <= -1000000) {
                      return value / 1e6 + 'M';
                    } else if (value >= 1000 || value <= -1000) {
                      return value / 1e3 + 'K';
                    }
                    return value;
                  },
                },
                afterFit: function (axis) {
                  self.legendLeftMargin = axis.width;
                },
              },
            ],
          },
          legend: {
            display: false,
          },
          tooltips: {
            enabled: false,
            displayColors: false,
            backgroundColor: '#6b6b6b',
            callbacks: {
              label: function (tooltipItems) {
                const label = [];
                self.datasets.forEach(function (set, i) {
                  if (self.showLine[i]) {
                    if (self.xAxisType === 'linear') {
                      const index = self.xparse[i].indexOf(tooltipItems.xLabel);
                      if (index !== -1) {
                        label.push(self.yparse[i][index]);
                      } else {
                        label.push(undefined);
                      }
                    } else {
                      label.push(set.data[tooltipItems.index]);
                    }
                  }
                });
                return label;
              },
              title: function (tooltipItems) {
                return tooltipItems[0].label;
              },
              labelTextColor: function () {
                const colors = [];
                self.showLine.forEach(function (show, i) {
                  if (show) {
                    colors.push(self.colorParse[i]);
                  }
                });
                return colors;
              },
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

              // Set Text
              if (tooltipModel.body) {
                const titleLines = tooltipModel.title || [];
                const bodyLines = tooltipModel.body.map(getBody);

                // Set the tooltip header
                const divDate = tooltipEl.querySelector('.tooltip_header.fr-text--sm.fr-mb-0');
                divDate.innerHTML = titleLines[0];

                // Clear the existing tooltip content
                const divValue = self.$el.querySelector('.tooltip_value');
                divValue.innerHTML = '';

                // Check if `.tooltip_dot` element exists and get its attribute node name
                const tooltipDot = self.$el.querySelector('.tooltip_dot');
                const nodeName = tooltipDot ? tooltipDot.attributes[0].nodeName : 'data-attribute'; // Default attribute if `.tooltip_dot` is missing

                // Iterate through each line in the body and add formatted HTML with correct colors
                bodyLines[0].forEach((line, i) => {
                  if (line !== undefined) {
                    const lineColor = tooltipModel.labelTextColors[i] || self.colorParse[i]; // Use tooltipModel color if available, fallback to self.colorParse

                    // Append the line with color and optional unitTooltip
                    divValue.innerHTML += `
                      <div class="tooltip_value-content" style="display: flex; justify-content: space-between; align-items: center;">
                        <span ${nodeName}="" class="tooltip_dot" style="background-color:${lineColor};"></span>
                        ${line}${self.unitTooltip ? ' ' + self.unitTooltip : ''}<br>
                      </div>
                    `;
                  }
                });
              }

              // Helper function for extracting body lines
              function getBody(bodyItem) {
                return bodyItem.lines;
              }

              const { offsetLeft: positionX, offsetTop: positionY } = self.chart.canvas;

              const canvasWidth = Number(self.chart.canvas.style.width.replace(/\D/g, ''));
              const canvasHeight = Number(self.chart.canvas.style.height.replace(/\D/g, ''));
              tooltipEl.style.position = 'absolute';
              tooltipEl.style.padding = tooltipModel.padding + 'px ' + tooltipModel.padding + 'px';
              tooltipEl.style.pointerEvents = 'none';
              let tooltipX = positionX + tooltipModel.caretX + 10;
              let tooltipY = positionY + tooltipModel.caretY - 18;
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
            },
          },
        },
      });
    },
    ChangeShowLine(index) {
      this.showLine[index] = !this.showLine[index];
      this.chart.data.datasets[index].showLine = this.showLine[index];
      this.opacity.length = 0;
      this.showLine.forEach((show) => {
        if (show) {
          this.opacity.push(1);
        } else {
          this.opacity.push(0.3);
        }
      });
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
