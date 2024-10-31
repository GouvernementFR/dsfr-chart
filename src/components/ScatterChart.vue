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
        <!-- Légende pour les séries de données -->
        <div v-for="(item, index) in nameParse" :key="item" class="flex fr-mt-3v fr-mb-1v"
          :style="{ 'margin-left': isSmall ? '0px' : style }">
          <span class="legende_dot" :style="{ 'background-color': colorParse[index] }"></span>
          <p class='fr-text--sm fr-text--bold fr-ml-1w fr-mb-0'>
            {{ capitalize(nameParse[index]) }}
          </p>
        </div>
        <!-- Légende pour les lignes horizontales -->
        <div v-for="(item2, index2) in hlineNameParse" :key="item2" class="flex fr-mt-3v"
          :style="{ 'margin-left': isSmall ? '0px' : style }">
          <span class="legende_dash_line1" :style="{ 'background-color': hlineColorParse[index2] }"></span>
          <span class="legende_dash_line2" :style="{ 'background-color': hlineColorParse[index2] }"></span>
          <p class="fr-text--sm fr-text--bold fr-ml-1w fr-mb-0">{{ capitalize(hlineNameParse[index2]) }}</p>
        </div>
        <!-- Légende pour les lignes verticales -->
        <div v-for="(item3, index3) in vlineNameParse" :key="item3" class="flex fr-mt-3v fr-mb-1v"
          :style="{ 'margin-left': isSmall ? '0px' : style }">
          <span class="legende_dash_line1" :style="{ 'background-color': vlineColorParse[index3] }"></span>
          <span class="legende_dash_line2" :style="{ 'background-color': vlineColorParse[index3] }"></span>
          <p class="fr-text--sm fr-text--bold fr-ml-1w fr-mb-0">{{ capitalize(vlineNameParse[index3]) }}</p>
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
import { Chart } from 'chart.js'
import chroma from 'chroma-js' // Assure-toi que chroma-js est installé
import { mixin, getColorsByIndex, categoricalPalette, sequentialAscending, sequentialDescending, divergentAscending, divergentDescending, neutralColor, defaultColor } from '@/utils.js'

export default {
  name: 'ScatterChart',
  mixins: [mixin],
  data() {
    return {
      widgetId: '',
      chartId: '',
      chart: undefined,
      legendLeftMargin: 100,
      display: '',
      datasets: [],
      xAxisType: 'category',
      labels: undefined,
      opacity: [],
      showPoint: [],
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
      colorPrecisionBar: '#161616',
      colorHover: [],
      isSmall: false
    }
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
    pointradius: {
      type: Number,
      default: 8
    },
    showline: {
      type: Boolean,
      default: false
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
    // Nouveau paramètre pour choisir la palette de couleurs
    selectedPalette: {
      type: String,
      default: ''
    },
    // Index de la série à mettre en avant
    highlightIndex: {
      type: Number,
      default: -1
    },
  },
  computed: {
    style() {
      return this.legendLeftMargin + 'px'
    }
  },
  methods: {
    resetData() {
      if (this.chart) {
        this.chart.destroy()
      }
      this.legendLeftMargin = 100
      this.datasets = []
      this.xAxisType = 'category'
      this.labels = undefined
      this.opacity = []
      this.showPoint = []
      this.xparse = []
      this.yparse = []
      this.nameParse = []
      this.tmpColorParse = []
      this.colorParse = []
      this.vlineParse = []
      this.vlineColorParse = []
      this.tmpVlineColorParse = []
      this.vlineNameParse = []
      this.hlineParse = []
      this.hlineColorParse = []
      this.tmpHlineColorParse = []
      this.hlineNameParse = []
      this.ymax = 0
      this.colorPrecisionBar = '#161616'
      this.colorHover = []
    },
    getData() {
      const self = this
      // Récupération des paramètres
      try {
        this.xparse = JSON.parse(this.x)
        this.yparse = JSON.parse(this.y)
      } catch (error) {
        console.error('Erreur lors du parsing de x ou y:', error)
        return
      }

      let tmpNameParse = []
      if (this.name !== undefined) {
        try {
          tmpNameParse = JSON.parse(self.name)
        } catch (error) {
          console.error('Erreur lors du parsing de name:', error)
        }
      }
      if (this.color !== undefined) {
        try {
          this.tmpColorParse = JSON.parse(self.color)
        } catch (error) {
          console.error('Erreur lors du parsing de color:', error)
        }
      }

      this.loadColors()

      for (let i = 0; i < this.yparse.length; i++) {
        self.showPoint.push(true)
        if (tmpNameParse[i] !== undefined) {
          self.nameParse.push(tmpNameParse[i])
        } else {
          self.nameParse.push('Serie' + (i + 1))
        }
      }

      // Récupération données Vline
      if (this.vline !== undefined) {
        this.vlineParse = JSON.parse(this.vline)
        let tmpVlineNameParse = []
        if (this.vlinename !== undefined) {
          tmpVlineNameParse = JSON.parse(self.vlinename)
        }
        if (this.vlinecolor !== undefined) {
          this.tmpVlineColorParse = JSON.parse(self.vlinecolor)
        }

        for (let i = 0; i < this.vlineParse.length; i++) {
          if (tmpVlineNameParse[i] !== undefined) {
            self.vlineNameParse.push(tmpVlineNameParse[i])
          } else {
            self.vlineNameParse.push('V' + (i + 1))
          }
        }
      }

      // Récupération données Hline
      if (this.hline !== undefined) {
        this.hlineParse = JSON.parse(this.hline)
        let tmpHlineNameParse = []
        if (this.hlinename !== undefined) {
          tmpHlineNameParse = JSON.parse(self.hlinename)
        }
        if (this.hlinecolor !== undefined) {
          this.tmpHlineColorParse = JSON.parse(self.hlinecolor)
        }

        for (let i = 0; i < this.hlineParse.length; i++) {
          if (tmpHlineNameParse[i] !== undefined) {
            self.hlineNameParse.push(tmpHlineNameParse[i])
          } else {
            self.hlineNameParse.push('H' + (i + 1))
          }
        }
      }

      // Formatage des données
      let data = []
      // Cas où x est numérique
      if (typeof self.xparse[0][0] === 'number') {
        const allX = []
        self.xparse.forEach(function (xj, j) {
          const dj = []
          const xsort = xj.map((a) => a).sort((a, b) => a - b)
          xsort.forEach(function (k) {
            const index = xj.findIndex((element) => element === k)
            dj.push({
              x: k,
              y: self.yparse[j][index]
            })
            if (!allX.includes(k)) {
              allX.push(k)
            }
          })
          data.push(dj)
        })
        self.labels = undefined
        self.xAxisType = 'linear'
      } else {
        // Cas où x est non numérique
        data = self.yparse
        self.labels = self.xparse[0]
        self.xAxisType = 'category'
      }

      // Set ymax
      self.ymax = Math.max.apply(null, self.hlineParse)

      // Tracé de la courbe
      data.forEach(function (dj, j) {
        self.datasets.push({
          data: dj,
          fill: false,
          borderColor: self.colorParse[j],
          backgroundColor: self.colorParse[j],
          type: 'scatter',
          pointRadius: 4,
          pointHoverRadius: 4,
          pointStyle: 'rect',
          pointRadius: self.pointradius,
          pointHoverRadius: self.pointradius + 1,
          pointHoverBackgroundColor: self.colorHover[j],
          pointHoverBorderColor: self.colorHover[j],
          showLine: self.showline,
          borderWidth: 2
        })
      })
    },
    createChart() {
      Chart.defaults.global.defaultFontFamily = 'Marianne'
      Chart.defaults.global.defaultFontSize = 12
      Chart.defaults.global.defaultLineHeight = 1.66

      this.getData()
      const self = this
      const ctx = document.getElementById(self.chartId).getContext('2d')
      this.chart = new Chart(ctx, {
        type: 'scatter',
        data: {
          labels: self.labels,
          datasets: self.datasets
        },
        plugins: [{
          afterDatasetDraw: function (chart, args, options) {
            const ctx = chart.chart.ctx;
            const xScales = chart.config.options.scales.xAxes;
            const yScales = chart.config.options.scales.yAxes;

            const xAxisId = xScales[0].id || xScales[0].scaleLabel.labelString;
            const yAxisId = yScales[0].id || yScales[0].scaleLabel.labelString;

            const xAxis = chart.scales[xAxisId];
            const yAxis = chart.scales[yAxisId];

            if (self.vlineParse !== undefined) {
              self.vlineParse.forEach(function (line, j) {
                const x = xAxis.getPixelForValue(line);

                ctx.beginPath();
                ctx.moveTo(x, yAxis.top);
                ctx.strokeStyle = self.vlineColorParse[j];
                ctx.lineWidth = 3;
                ctx.setLineDash([10, 5]);
                ctx.lineTo(x, yAxis.bottom);
                ctx.stroke();
              });
            }
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
          }
        },
        {
          // Mise à jour de la méthode beforeDatasetsDraw
          beforeDatasetsDraw: function (chart, args, options) {
            if (chart.tooltip._active && chart.tooltip._active.length) {
              const activePoint = chart.tooltip._active[0];
              const ctx = chart.chart.ctx;
              const x = activePoint.tooltipPosition().x;
              const y = activePoint.tooltipPosition().y;

              const xScale = activePoint._xScale;
              const yScale = activePoint._yScale;

              if (xScale && yScale) {
                ctx.save();
                ctx.beginPath();
                ctx.moveTo(x, yScale.top);
                ctx.lineTo(x, yScale.bottom);
                ctx.lineWidth = 1;
                ctx.strokeStyle = self.colorPrecisionBar;
                ctx.setLineDash([10, 5]);
                ctx.stroke();
                ctx.restore();

                ctx.save();
                ctx.beginPath();
                ctx.moveTo(xScale.left, y);
                ctx.lineTo(xScale.right, y);
                ctx.lineWidth = 1;
                ctx.strokeStyle = self.colorPrecisionBar;
                ctx.setLineDash([10, 5]);
                ctx.stroke();
                ctx.restore();
              }
            }
          }
        }],
        options: {
          aspectRatio: this.aspectratio,
          animation: {
            duration: 1000,
            easing: 'easeOutBounce',
            animateScale: true,
            animateRotate: true
          },
          scales: {
            xAxes: [{
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
                    return value.toString().substring(5, 7) + '/' + value.toString().substring(0, 4)
                  } else {
                    return value
                  }
                }
              }
            }],
            yAxes: [{
              gridLines: {
                drawTicks: false,
                zeroLineColor: '#DDDDDD',
                color: '#DDDDDD',
                borderDash: [3],
                lineWidth: 1
              },
              ticks: {
                padding: 4,
                autoSkip: true,
                maxTicksLimit: 5,
                suggestedMax: self.ymax,
                callback: function (value, index, values) {
                  if (value >= 1000000000 || value <= -1000000000) {
                    return value / 1e9 + 'B'
                  } else if (value >= 1000000 || value <= -1000000) {
                    return value / 1e6 + 'M'
                  } else if (value >= 1000 || value <= -1000) {
                    return value / 1e3 + 'K'
                  }
                  return value
                }
              },
              afterFit: function (axis) {
                self.legendLeftMargin = axis.width
              }
            }]
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
                const label = []
                self.datasets.forEach(function (set, i) {
                  if (self.showPoint[i]) {
                    if (self.xAxisType === 'linear') {
                      const index = self.xparse[i].indexOf(tooltipItems.xLabel)
                      if (index !== -1) {
                        label.push(self.convertIntToHuman(self.yparse[i][index]))
                      } else {
                        label.push(undefined)
                      }
                    } else {
                      label.push(self.convertIntToHuman(set.data[tooltipItems.index]))
                    }
                  }
                })
                return label
              },
              title: function (tooltipItems) {
                return tooltipItems[0].label
              },
              labelTextColor: function (tooltipItems) {
                const colors = []
                self.showPoint.forEach(function (show, i) {
                  if (show) {
                    colors.push(self.colorParse[i])
                  }
                })
                return colors
              }
            },
            custom: function (context) {
              // Tooltip Element
              const tooltipEl = self.$el.querySelector('.linechart_tooltip')

              // Hide if no tooltip
              const tooltipModel = context
              if (tooltipModel.opacity === 0) {
                tooltipEl.style.opacity = 0
                return
              }

              // Set caret Position
              tooltipEl.classList.remove('above', 'below', 'no-transform')
              if (tooltipModel.yAlign) {
                tooltipEl.classList.add(tooltipModel.yAlign)
              } else {
                tooltipEl.classList.add('no-transform')
              }

              function getBody(bodyItem) {
                return bodyItem.lines
              }
              // Set Text
              if (tooltipModel.body) {
                const titleLines = tooltipModel.title || []
                const bodyLines = tooltipModel.body.map(getBody)

                const divDate = self.$el.querySelector('.tooltip_header')
                divDate.innerHTML = titleLines[0]

                const divValue = self.$el.querySelector('.tooltip_value')

                divValue.innerHTML = ''
                bodyLines[0].forEach(function (line, i) {
                  if (line !== undefined) {
                    divValue.innerHTML += `
                      <div class="tooltip_value-content">
                        <span class="tooltip_dot" style="background-color:${self.colorParse[i]};"></span>
                        <p class="tooltip_place fr-mb-0">${line}</p>
                      </div>
                    `;                  
                  }
                })
              }

              const {
                offsetLeft: positionX,
                offsetTop: positionY
              } = self.chart.canvas

              const canvasWidth = Number(self.chart.canvas.style.width.replace(/\D/g, ''))
              const canvasHeight = Number(self.chart.canvas.style.height.replace(/\D/g, ''))
              tooltipEl.style.position = 'absolute'
              tooltipEl.style.padding = tooltipModel.padding + 'px ' + tooltipModel.padding + 'px'
              tooltipEl.style.pointerEvents = 'none'
              let tooltipX = positionX + tooltipModel.caretX + 10
              let tooltipY = positionY + tooltipModel.caretY - 18
              if (tooltipX + tooltipEl.clientWidth + self.legendLeftMargin > positionX + canvasWidth) {
                tooltipX = positionX + tooltipModel.caretX - tooltipEl.clientWidth - 10
              }
              if (tooltipY + tooltipEl.clientHeight > positionY + 0.9 * canvasHeight) {
                tooltipY = positionY + tooltipModel.caretY - tooltipEl.clientHeight + 18
              }
              if (tooltipX < positionX) {
                tooltipX = positionX + tooltipModel.caretX - tooltipEl.clientWidth / 2
                tooltipY = positionY + tooltipModel.caretY - tooltipEl.clientHeight - 18
              }
              tooltipEl.style.left = tooltipX + 'px'
              tooltipEl.style.top = tooltipY + 'px'
              tooltipEl.style.opacity = 1
            }
          }
        }
      })
    },
    ChangeShowPoint(index) {
      const self = this
      this.showPoint[index] = !this.showPoint[index]
      if (this.showPoint[index]) {
        this.chart.data.datasets[index].pointRadius = self.pointradius
        this.chart.data.datasets[index].showLine = self.showline
      } else {
        this.chart.data.datasets[index].pointRadius = 0
        this.chart.data.datasets[index].showLine = false
      }
      this.opacity.length = 0
      this.showPoint.forEach(function (show, j) {
        if (show) {
          self.opacity.push(1)
        } else {
          self.opacity.push(0.3)
        }
      })
      this.chart.update(0)
    },
    loadColors() {
      this.colorParse = [];
      this.colorHover = [];

      // Choisir la palette en fonction du paramètre selectedPalette ou auto-détection
      let palette;
      switch (this.selectedPalette) {
        case 'categorical':
          palette = categoricalPalette;
          break;
        case 'sequential':
          palette = sequentialPalette;
          break;
        case 'divergent':
          palette = divergentPalette;
          break;
        default:
          // Auto-détection de la palette
          if (this.yparse.some(arr => arr.some(value => value < 0))) {
            palette = divergentPalette;
          } else if (this.yparse.length === 1) {
            palette = sequentialPalette;
          } else {
            palette = categoricalPalette;
          }
          break;
      }

      for (let i = 0; i < this.yparse.length; i++) {
        let color;

        if (this.tmpColorParse[i] !== undefined) {
          color = this.tmpColorParse[i];
        } else if (i === this.highlightIndex) {
          color = defaultColor;
        } else if (this.highlightIndex !== -1) {
          color = neutralColor;
        } else {
          color = getColorsByIndex(i, palette);
        }

        // Vérifier et convertir la couleur en format hexadécimal
        try {
          color = chroma(color).hex();
        } catch (error) {
          console.error(`Format de couleur invalide: ${color}`, error);
          color = '#000000'; // Couleur par défaut en cas d'erreur
        }

        this.colorParse.push(color);
        this.colorHover.push(chroma(color).darken(0.8).hex());
      }

      // Couleurs pour les lignes verticales
      this.vlineColorParse = [];
      for (let i = 0; i < this.vlineParse.length; i++) {
        if (this.tmpVlineColorParse[i] !== undefined) {
          this.vlineColorParse.push(this.tmpVlineColorParse[i]);
        } else {
          this.vlineColorParse.push(neutralColor);
        }
      }

      // Couleurs pour les lignes horizontales
      this.hlineColorParse = [];
      for (let i = 0; i < this.hlineParse.length; i++) {
        if (this.tmpHlineColorParse[i] !== undefined) {
          this.hlineColorParse.push(this.tmpHlineColorParse[i]);
        } else {
          this.hlineColorParse.push(neutralColor);
        }
      }
    },
    changeColors(theme) {
      Chart.defaults.global.defaultFontColor = this.getHexaFromToken('text-mention-grey', theme)
      this.chart.options.scales.xAxes[0].gridLines.color = this.getHexaFromToken('border-default-grey', theme)
      this.chart.options.scales.xAxes[0].gridLines.zeroLineColor = this.getHexaFromToken('border-default-grey', theme)

      this.chart.options.scales.yAxes[0].gridLines.color = this.getHexaFromToken('border-default-grey', theme)
      this.chart.options.scales.yAxes[0].gridLines.zeroLineColor = this.getHexaFromToken('border-default-grey', theme)

      if (theme === 'light') {
        this.colorPrecisionBar = '#161616'
      } else {
        this.colorPrecisionBar = '#FFFFFF'
      }

      // Recharger les couleurs
      this.loadColors()

      for (let i = 0; i < this.yparse.length; i++) {
        this.chart.data.datasets[i].borderColor = this.colorParse[i]
        this.chart.data.datasets[i].backgroundColor = this.colorParse[i]
        this.chart.data.datasets[i].pointHoverBackgroundColor = this.colorHover[i]
        this.chart.data.datasets[i].pointHoverBorderColor = this.colorHover[i]
      }
      this.chart.update(0)
    }
  },
  created() {
    this.chartId = 'myChart' + Math.floor(Math.random() * (1000))
    this.widgetId = 'widget' + Math.floor(Math.random() * (1000))
  },
  mounted() {
    document.getElementById(this.widgetId).offsetWidth > 486 ? this.display = 'big' : this.display = 'small'
    this.createChart()
    const element = document.documentElement
    element.addEventListener('dsfr.theme', (e) => {
      this.changeColors(e.detail.theme)
    })
    addEventListener('resize', (event) => {
      this.isSmall = document.documentElement.clientWidth < 767
    })
  },
  beforeUpdate() {
    this.resetData()
    this.createChart()
    const element = document.documentElement
    this.changeColors(element.getAttribute('data-fr-theme'))
  }
}
</script>

<style scoped lang="scss">
@import './Style/ScatterChart.scss';
</style>
