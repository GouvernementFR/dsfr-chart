<template>
  <div class="widget_container fr-grid-row" :id="widgetId">
    <div class="r_col fr-col-12">
      <div class="chart ml-lg">
        <div class="linechart_tooltip">
          <div class="tooltip_header"></div>
          <div class="tooltip_body">
            <div class="tooltip_value">
              <span class="tooltip_dot"></span>
            </div>
          </div>
        </div>
        <canvas :id="chartId"></canvas>
        <div v-for="index in nameParse.length" :key="index" class="flex fr-mt-3v fr-mb-1v" :style="{'margin-left': style}">
          <span class="legende_dot" v-bind:style="{'background-color': colorParse[index - 1]}"></span>
          <p class='fr-text--sm fr-text--bold fr-ml-1v fr-mb-0'>
            {{capitalize(nameParse[index - 1])}}
          </p>
        </div>
        <div v-for="index in hlineNameParse.length" :key="index" class="flex fr-mt-3v" :style="{'margin-left': style}">
          <span class="legende_dash_line1" v-bind:style="{'background-color': hlineColorParse[index - 1]}"></span>
          <span class="legende_dash_line2" v-bind:style="{'background-color': hlineColorParse[index - 1]}"></span>
          <p class="fr-text--sm fr-text--bold fr-ml-1v fr-mb-0">{{ capitalize(hlineNameParse[index - 1]) }}</p>
        </div>
        <div v-for="index in vlineNameParse.length" :key="index" class="flex fr-mt-3v fr-mb-1v" :style="{'margin-left': style}">
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
import annotationPlugin from 'chartjs-plugin-annotation'

Chart.pluginService.register(annotationPlugin)

export default {
  name: 'MultiLineChart',
  mixins: [mixin],
  data () {
    return {
      widgetId: '',
      chartId: '',
      legendLeftMargin: 100,
      display: '',
      datasets: [],
      labels: undefined,
      xparse: [],
      yparse: [],
      nameParse: [],
      colorParse: [],
      vlineParse: [],
      vlineColorParse: [],
      vlineNameParse: [],
      hlineParse: [],
      hlineColorParse: [],
      hlineNameParse: [],
      typeGraph: '',
      ymax: 0,
      annotations: []
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
    stacked: {
      type: Boolean,
      default: false
    },
    horizontal: {
      type: Boolean,
      default: false
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
      if (this.horizontal) {
        this.typeGraph = 'horizontalBar'
      } else {
        this.typeGraph = 'bar'
      }
      const listColors = ['#000091', '#007c3a', '#A558A0'].concat(chroma.brewer.Set2.reverse())
      this.xparse = JSON.parse(this.x)
      this.yparse = JSON.parse(this.y)

      let tmpNameParse = []
      if (this.name !== undefined) {
        tmpNameParse = JSON.parse(self.name)
      }
      let tmpColorParse = []
      if (this.color !== undefined) {
        tmpColorParse = JSON.parse(self.color)
      }

      for (let i = 0; i < this.yparse.length; i++) {
        if (tmpNameParse[i] !== undefined) {
          self.nameParse.push(tmpNameParse[i])
        } else {
          self.nameParse.push('Serie' + (i + 1))
        }
        if (tmpColorParse[i] !== undefined) {
          self.colorParse.push(tmpColorParse[i])
        } else {
          self.colorParse.push(listColors[i])
        }
      }

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

      // Formatage des données
      // const ctx = document.getElementById(self.chartId).getContext('2d')
      let data = []

      // Cas ou x est non numérique
      data = self.yparse
      self.labels = self.xparse[0]
      self.xAxisType = 'category'

      // Set ymax
      if (!this.horizontal) {
        self.ymax = Math.max.apply(null, self.hlineParse)
      }

      // Annotation
      if (this.horizontal) {
        const xlenght = self.xparse[0].length
        let nanno
        if ((xlenght % 2) === 0) {
          nanno = xlenght / 2
        } else {
          nanno = Math.floor(xlenght / 2) + 1
        }

        let sumY = 0
        self.yparse.forEach(function (y, j) {
          sumY = sumY + Math.abs(y)
        })

        let j = 0
        for (let i = 0; i < nanno; i++) {
          const anno = {
            type: 'box',
            drawTime: 'beforeDatasetsDraw',
            id: 'box' + i,
            xScaleID: 'x-axis-0',
            yScaleID: 'y-axis-0',
            xMin: -2 * sumY,
            xMax: 2 * sumY,
            yMax: j + 0.5,
            yMin: j - 0.5,
            backgroundColor: '#eeeeee'
          }

          j = j + 2
          self.annotations.push(anno)
        }
      }

      // Tracé de la courbe
      data.forEach(function (dj, j) {
        self.datasets.push({
          data: dj,
          borderColor: self.colorParse[j],
          backgroundColor: self.colorParse[j],
          hoverBorderColor: 'red',
          hoverBackgroundColor: 'red'
        })
      })
    },
    createChart () {
      Chart.defaults.global.defaultFontFamily = 'Marianne'
      this.getData()
      const self = this
      const ctx = document.getElementById(self.chartId).getContext('2d')
      this.chart = new Chart(ctx, {
        type: self.typeGraph,
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
        },
        {
          afterDraw: function (chart, args, options) {
            if (chart.tooltip._active !== undefined) {
              if (chart.tooltip._active.length !== 0) {
                const x = chart.tooltip._active[0]._model.x
                const y = chart.tooltip._active[0]._model.y
                const yAxis = chart.scales['y-axis-0']
                const xAxis = chart.scales['x-axis-0']
                const ctx = chart.ctx

                if (self.horizontal) {
                  ctx.save()
                  ctx.beginPath()
                  ctx.moveTo(x, yAxis.top)
                  ctx.lineTo(x, yAxis.bottom)
                  ctx.lineWidth = '1'
                  ctx.strokeStyle = '#161616'
                  ctx.setLineDash([10, 5])
                  ctx.stroke()
                  ctx.restore()
                } else {
                  ctx.save()
                  ctx.beginPath()
                  ctx.moveTo(xAxis.left, y)
                  ctx.lineTo(xAxis.right, y)
                  ctx.lineWidth = '1'
                  ctx.strokeStyle = '#161616'
                  ctx.setLineDash([10, 5])
                  ctx.stroke()
                  ctx.restore()
                }
              }
            }
          }
        }],
        options: {
          animation: {
            easing: 'easeInOutBack',
            duration: 0
          },
          annotation: {
            drawTime: 'beforeDatasetsDraw', // (default)
            annotations: self.annotations
          },
          scales: {
            xAxes: [{
              stacked: self.stacked,
              offset: true,
              gridLines: {
                color: 'rgba(0, 0, 0, 0)'
              }
            }],
            yAxes: [{
              stacked: self.stacked,
              gridLines: {
                color: '#e5e5e5',
                borderDash: [3]
              },
              ticks: {
                suggestedMin: 0,
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
            enabled: false,
            displayColors: false,
            backgroundColor: '#6b6b6b',
            callbacks: {
              label: function (tooltipItems) {
                const label = []
                self.datasets.forEach(function (set, i) {
                  label.push(set.data[tooltipItems.index])
                })
                return label
              },
              title: function (tooltipItems) {
                return tooltipItems[0].label
              },
              labelTextColor: function (tooltipItems) {
                return self.colorParse
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

              function getBody (bodyItem) {
                return bodyItem.lines
              }
              // Set Text
              if (tooltipModel.body) {
                const titleLines = tooltipModel.title || []
                const bodyLines = tooltipModel.body.map(getBody)

                const divDate = self.$el.querySelector('.tooltip_header')
                divDate.innerHTML = titleLines[0]

                const color = tooltipModel.labelTextColors[0]
                const divValue = self.$el.querySelector('.tooltip_value')

                const nodeName = self.$el.querySelector('.tooltip_dot').attributes[0].nodeName
                divValue.innerHTML = ''
                bodyLines[0].forEach(function (line, i) {
                  if (line !== undefined) {
                    divValue.innerHTML += '<span ' + nodeName + '= "" class="tooltip_dot" style = "background-color:' + color[i] + '"></span>' + ' ' + line + '<br>'
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
