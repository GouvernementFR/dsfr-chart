<template>
  <div class="widget_container" :id="widgetId">
    <div class="r_col fr-col-12">
      <div class="chart ml-lg">
        <div class="linechart_tooltip">
          <div class="tooltip_header"></div>
          <div class="tooltip_body">
            <div class="tooltip_value">
              <span class="tooltip_dot" v-bind:style="{'background-color': color}"></span>
            </div>
          </div>
        </div>
        <canvas :id="chartId"></canvas>
        <div class="flex fr-mt-3v" :style="{'margin-left': style}">
          <span class="legende_dot" v-bind:style="{'background-color': color}"></span>
          <p class="fr-text--sm fr-text--bold fr-ml-1v fr-mb-0">{{ capitalize(name) }}</p>
        </div>
        <div v-for="index in hlineNameParse.length" :key="index" class="flex fr-mt-3v" :style="{'margin-left': style}">
          <span class="legende_dash_line1" v-bind:style="{'background-color': hlineColorParse[index - 1]}"></span>
          <span class="legende_dash_line2" v-bind:style="{'background-color': hlineColorParse[index - 1]}"></span>
          <p class="fr-text--sm fr-text--bold fr-ml-1v fr-mb-0">{{ capitalize(hlineNameParse[index - 1]) }}</p>
        </div>
        <div v-for="index in vlineParse.length" :key="index" class="flex fr-mt-3v fr-mb-1v" :style="{'margin-left': style}">
          <span class="legende_dash_line1" v-bind:style="{'background-color': vlineColorParse[index - 1]}"></span>
          <span class="legende_dash_line2" v-bind:style="{'background-color': vlineColorParse[index - 1]}"></span>
          <p class="fr-text--sm fr-text--bold fr-ml-1v fr-mb-0">{{ capitalize(vlineNameParse[index - 1]) }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import chroma from 'chroma-js'
import { Chart } from 'chart.js'
import { mixin } from '@/utils.js'

export default {
  name: 'LineChart',
  mixins: [mixin],
  data () {
    return {
      widgetId: '',
      chartId: '',
      legendLeftMargin: 0,
      display: '',
      datasets: [],
      xAxisType: 'category',
      labels: undefined,
      xparse: [],
      yparse: [],
      vlineParse: [],
      vlineColorParse: [],
      vlineNameParse: [],
      hlineParse: [],
      hlineColorParse: [],
      hlineNameParse: [],
      ymax: 0
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
      default: 'S1'
    },
    color: {
      type: String,
      default: '#000091'
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
    }
  },
  computed: {
    style () {
      return this.legendLeftMargin + 'px'
    }
  },
  methods: {
    getData () {
      const self = this
      // Récupération des paramètres
      this.xparse = JSON.parse(this.x)
      this.yparse = JSON.parse(this.y)

      // Récupération données Vline
      if (this.vline !== undefined) {
        this.vlineParse = JSON.parse(this.vline)
        let tmpVlineNameParse = []
        if (this.vlinename !== undefined) {
          tmpVlineNameParse = JSON.parse(self.vlinename)
        }
        let tmpVlineColorParse = []
        if (this.vlinecolor !== undefined) {
          tmpVlineColorParse = JSON.parse(self.vlinecolor)
        }

        for (let i = 0; i < this.vlineParse.length; i++) {
          if (tmpVlineNameParse[i] !== undefined) {
            self.vlineNameParse.push(tmpVlineNameParse[i])
          } else {
            self.vlineNameParse.push('V' + (i + 1))
          }
          if (tmpVlineColorParse[i] !== undefined) {
            self.vlineColorParse.push(tmpVlineColorParse[i])
          } else {
            self.vlineColorParse.push('#161616')
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
        let tmpHlineColorParse = []
        if (this.hlinecolor !== undefined) {
          tmpHlineColorParse = JSON.parse(self.hlinecolor)
        }

        for (let i = 0; i < this.hlineParse.length; i++) {
          if (tmpHlineNameParse[i] !== undefined) {
            self.hlineNameParse.push(tmpHlineNameParse[i])
          } else {
            self.hlineNameParse.push('H' + (i + 1))
          }
          if (tmpHlineColorParse[i] !== undefined) {
            self.hlineColorParse.push(tmpHlineColorParse[i])
          } else {
            self.hlineColorParse.push('#009081')
          }
        }
      }

      const ctx = document.getElementById(self.chartId).getContext('2d')
      let gradientFill
      this.display === 'big' ? gradientFill = ctx.createLinearGradient(0, 0, 0, 500) : gradientFill = ctx.createLinearGradient(0, 0, 0, 250)
      gradientFill.addColorStop(0, chroma(this.color).alpha(0.05).hex())

      let data = []
      // Cas ou x est numérique
      if (typeof self.xparse[0] === 'number') {
        const xsort = self.xparse.map((a) => a).sort((a, b) => a - b)
        xsort.forEach(function (k) {
          const index = self.xparse.findIndex((element) => element === k)
          data.push({
            x: k,
            y: self.yparse[index]
          })
        })
        self.labels = undefined
        self.xAxisType = 'linear'
      } else {
        // Cas ou x est non numérique
        data = self.yparse
        self.labels = self.xparse
        self.xAxisType = 'category'
      }

      // Set ymax
      self.ymax = Math.max.apply(null, self.hlineParse)

      // Tracer de la courbe
      self.datasets = [{
        data: data,
        backgroundColor: gradientFill,
        borderColor: self.color,
        type: 'line',
        pointRadius: 8,
        pointStyle: 'rect',
        pointBackgroundColor: 'rgba(0, 0, 0, 0)',
        pointBorderColor: 'rgba(0, 0, 0, 0)',
        pointHoverBackgroundColor: 'red',
        pointHoverBorderColor: 'red',
        pointHoverRadius: 6
      }]
    },
    createChart () {
      Chart.defaults.global.defaultFontFamily = 'Marianne'
      this.getData()
      const self = this
      const ctx = document.getElementById(self.chartId).getContext('2d')
      this.chart = new Chart(ctx, {
        data: {
          labels: self.labels,
          datasets: self.datasets
        },
        plugins: [{
          afterDatasetDraw: function (chart, args, options) {
            if (self.vlineParse !== undefined) {
              self.vlineParse.forEach(function (line, j) {
                const ctx = chart.ctx
                const xAxis = chart.scales['x-axis-0']
                const yAxis = chart.scales['y-axis-0']

                const x = xAxis.getPixelForValue(line)

                ctx.beginPath()
                ctx.moveTo(x, yAxis.bottom)
                ctx.strokeStyle = self.vlineColorParse[j]
                ctx.lineWidth = '3'
                ctx.setLineDash([10, 5])
                ctx.lineTo(x, yAxis.top)
                ctx.stroke()
              })
            }
            if (self.hlineParse !== undefined) {
              self.hlineParse.forEach(function (line, j) {
                const ctx = chart.ctx
                const xAxis = chart.scales['x-axis-0']
                const yAxis = chart.scales['y-axis-0']
                const y = yAxis.getPixelForValue(line)

                ctx.beginPath()
                ctx.moveTo(xAxis.left, y)
                ctx.strokeStyle = self.hlineColorParse[j]
                ctx.lineWidth = '3'
                ctx.setLineDash([10, 5])
                ctx.lineTo(xAxis.right, y)
                ctx.stroke()
              })
            }
          }
        }],
        options: {
          animation: {
            easing: 'easeInOutBack'
          },
          scales: {
            xAxes: [{
              type: self.xAxisType,
              gridLines: {
                color: 'rgba(0, 0, 0, 0)'
              }// ,
              // ticks: {
              //   autoSkip: true,
              //   maxTicksLimit: xTickLimit,
              //   maxRotation: 0,
              //   minRotation: 0
              // }
            }],
            yAxes: [{
              gridLines: {
                color: '#e5e5e5',
                borderDash: [3]
              },
              ticks: {
                suggestedMax: self.ymax,
                autoSkip: true,
                maxTicksLimit: 5,
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
            filter: function (tooltipItem) {
              return tooltipItem.datasetIndex === 0
            },
            enabled: false,
            displayColors: false,
            backgroundColor: '#6b6b6b',
            callbacks: {
              label: function (tooltipItems) {
                return tooltipItems.value
              },
              title: function (tooltipItems) {
                return tooltipItems[0].label
              }
            },
            custom: function (context) {
              // Tooltip Element
              const tooltipEl = self.$el.querySelector('.linechart_tooltip')
              const tooltipModel = context
              if (tooltipModel.opacity === 0 || tooltipModel.title[0] === undefined) {
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
              function getBody (bodyItem) {
                return bodyItem.lines
              }
              // Set Text
              if (tooltipModel.body) {
                const titleLines = tooltipModel.title || []
                const bodyLines = tooltipModel.body.map(getBody)
                const divDate = self.$el.querySelector('.tooltip_header')
                divDate.innerHTML = titleLines[0]
                const divValue = self.$el.querySelector('.tooltip_value')
                divValue.innerHTML = self.$el.querySelector('.tooltip_dot').outerHTML + ' ' + bodyLines[0]
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
              if (tooltipX + tooltipEl.clientWidth + self.legendLeftMargin > positionX + canvasWidth) { // tooltip disappears at the right of the canvas
                tooltipX = positionX + tooltipModel.caretX - tooltipEl.clientWidth - 10
              }
              if (tooltipY + tooltipEl.clientHeight > positionY + 0.9 * canvasHeight) { // tooltip disappears at the bottom of the canvas
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
    }
  },
  created () {
    this.chartId = 'myChart' + Math.floor(Math.random() * (1000))
    this.widgetId = 'widget' + Math.floor(Math.random() * (1000))
  },
  mounted () {
    document.getElementById(this.widgetId).offsetWidth > 486 ? this.display = 'big' : this.display = 'small'
    this.createChart()
  }
}
</script>
<style scoped lang="scss">
.widget_container {
  .ml-lg {
    margin-left: 0;
  }
  @media (min-width: 62em) {
    .ml-lg {
      margin-left: 3rem;
    }
  }
  @media (max-width: 62em) {
    .chart .flex {
      margin-left: 0 !important
    }
  }
  .r_col {
    align-self: center;
    .flex {
      display: flex;
      .legende_dot {
        min-width: 0.8rem;
        width: 0.8rem;
        height: 0.8rem;
        min-width: 0.8rem;
        background-color: #000091;
        display: inline-block;
        margin-top: 0.25rem;
      }
      .legende_dash_line1{
        min-width: 0.4rem;
        width: 0.4rem;
        height: 0.2rem;
        border-radius: 0%;
        display: inline-block;
        margin-top: 0.6rem;
      }
      .legende_dash_line2{
        min-width: 0.4rem;
        width: 0.4rem;
        height: 0.2rem;
        border-radius: 0%;
        display: inline-block;
        margin-top: 0.6rem;
        margin-left: 0.2rem;
      }
    }
  }
  .chart canvas {
    max-width: 100%;
  }
  .linechart_tooltip {
    opacity: 0;
    width: 11.25rem;
    height: auto;
    background-color: white;
    position: fixed;
    z-index: 999;
    box-shadow: 0 2px 6px 0 rgba(0, 0, 18, 0.16);
    text-align: left;
    pointer-events: none;
    font-size: 0.75rem;
    .tooltip_header {
      width: 100%;
      height: 1.75rem;
      background-color: #f6f6f6;
      color: #6b6b6b;
      padding-left: 0.75rem;
      padding-top: 0.25rem;
      padding-bottom: 0.25rem;
    }
    .tooltip_body {
      padding-left: 0.75rem;
      padding-right: 0.75rem;
      padding-top:0.25rem;
      line-height: 1.67;
      .tooltip_dot {
        min-width: 0.7rem;
        width: 0.7rem;
        height: 0.7rem;
        background-color: #000091;
        display: inline-block;
        margin-top: 0.25rem;
      }
      .tooltip_place {
        color: #242424;
      }
      .tooltip_value {
        color: #242424;
        font-weight: bold;
      }
    }
  }
}
</style>
