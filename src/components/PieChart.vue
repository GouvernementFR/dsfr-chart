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
        <div v-for="(item, index) in nameParse" :key="index" class="flex fr-mt-3v fr-mb-1v" :style="{'margin-left': style}">
          <span class="legende_dot" v-bind:style="{'background-color': colorParse[index]}"></span>
          <p class='fr-text--sm fr-text--bold fr-ml-1w fr-mb-0'>
            {{capitalize(nameParse[index])}}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Chart } from 'chart.js'
import { mixin } from '@/utils.js'
import pattern from 'patternomaly'
export default {
  name: 'PieChart',
  mixins: [mixin],
  data () {
    return {
      widgetId: '',
      chartId: '',
      legendLeftMargin: 100,
      display: '',
      datasets: [],
      labels: undefined,
      dicHline: {},
      xparse: [],
      yparse: [],
      nameParse: [],
      tmpColorParse: [],
      colorParse: [],
      listColors: [],
      listPattern: [],
      colorPattern: [],
      colorPatternHover: [],
      typeGraph: 'doughnut',
      colorHover: []
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
    fill: {
      type: Boolean,
      default: false
    },
    pattern: {
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
      if (this.fill) {
        this.typeGraph = 'pie'
      } else {
        this.typeGraph = 'doughnut'
      }
      this.listColors = this.getAllColors()
      this.listPattern = this.getAllPattern()
      this.xparse = JSON.parse(this.x)
      this.yparse = JSON.parse(this.y)

      let tmpNameParse = []
      if (this.name !== undefined) {
        tmpNameParse = JSON.parse(self.name)
      }
      if (this.color !== undefined) {
        this.tmpColorParse = JSON.parse(self.color)
      }

      this.loadColors()
      for (let i = 0; i < this.yparse.length; i++) {
        if (tmpNameParse[i] !== undefined) {
          self.nameParse.push(tmpNameParse[i])
        } else {
          self.nameParse.push('Serie' + (i + 1))
        }
      }

      // Formatage des données
      self.labels = self.xparse
      self.datasets = [{
        data: self.yparse,
        borderColor: self.colorParse,
        backgroundColor: self.colorParse,
        hoverBackgroundColor: self.colorHover,
        hoverBorderColor: self.colorHover
      }]
    },
    createChart () {
      Chart.defaults.global.defaultFontFamily = 'Marianne'
      Chart.defaults.global.defaultFontSize = 12
      Chart.defaults.global.defaultLineHeight = 1.66

      this.getData()
      const self = this
      const ctx = document.getElementById(self.chartId).getContext('2d')
      this.chart = new Chart(ctx, {
        type: self.typeGraph,
        data: {
          labels: self.labels,
          datasets: self.datasets
        },
        options: {
          cutoutPercentage: 54,
          animation: {
            easing: 'easeInOutBack',
            duration: 1000
          },
          legend: {
            display: false
          },
          tooltips: {
            displayColors: false,
            backgroundColor: '#6b6b6b',
            enabled: false,
            callbacks: {
              label: function (tooltipItems) {
                return self.datasets[0].data[tooltipItems.index]
              },
              title: function (tooltipItems) {
                return self.labels[tooltipItems[0].index]
              },
              labelTextColor: function (tooltipItems) {
                return self.colorParse[tooltipItems.index]
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
                divDate.innerHTML = titleLines

                const color = tooltipModel.labelTextColors[0]
                const divValue = self.$el.querySelector('.tooltip_value')

                const nodeName = self.$el.querySelector('.tooltip_dot').attributes[0].nodeName
                divValue.innerHTML = '<span ' + nodeName + '= "" class="tooltip_dot" style = "background-color:' + color + '"></span>' + ' ' + bodyLines[0]
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
    },
    loadColors () {
      this.colorParse = []
      this.colorHover = []
      this.colorPattern = []
      this.colorPatternHover = []
      for (let i = 0; i < this.yparse.length; i++) {
        if (this.tmpColorParse[i] !== undefined) {
          this.colorParse.push(this.getHexaFromName(this.tmpColorParse[i]))
          this.colorHover.push(this.getHexaFromName(this.tmpColorParse[i], { hover: true }))
        } else {
          this.colorParse.push(this.getHexaFromName(this.listColors[i]))
          this.colorHover.push(this.getHexaFromName(this.listColors[i], { hover: true }))
          this.colorPattern.push(pattern.draw(this.listPattern[i], this.getHexaFromName(this.listColors[i])))
          this.colorPatternHover.push(pattern.draw(this.listPattern[i], this.getHexaFromName(this.listColors[i], { hover: true })))
        }
      }
    },
    changeColors () {
      this.loadColors()
      this.chart.data.datasets[0].borderColor = this.colorParse
      if (this.pattern) {
        this.chart.data.datasets[0].backgroundColor = this.colorPattern
        this.chart.data.datasets[0].hoverBackgroundColor = this.colorPatternHover
      } else {
        this.chart.data.datasets[0].backgroundColor = this.colorParse
        this.chart.data.datasets[0].hoverBackgroundColor = this.colorHover
      }
      this.chart.data.datasets[0].hoverBorderColor = this.colorHover
      this.chart.update()
    }
  },
  created () {
    this.chartId = 'myChart' + Math.floor(Math.random() * (1000))
    this.widgetId = 'widget' + Math.floor(Math.random() * (1000))
  },
  mounted () {
    document.getElementById(this.widgetId).offsetWidth > 486 ? this.display = 'big' : this.display = 'small'
    this.createChart()
    const element = document.documentElement // Reference à l'element <html> du DOM
    element.addEventListener('dsfr.theme', (e) => {
      this.changeColors()
    })
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
        margin-left: 0;
      }
      .legende_dash_line1{
        min-width: 0.35rem;
        width: 0.35rem;
        height: 0.2rem;
        border-radius: 0%;
        display: inline-block;
        margin-top: 0.6rem;
      }
      .legende_dash_line2{
        min-width: 0.35rem;
        width: 0.35rem;
        height: 0.2rem;
        border-radius: 0%;
        display: inline-block;
        margin-top: 0.6rem;
        margin-left: 0.1rem;
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
        margin-right: 0.25rem;
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
