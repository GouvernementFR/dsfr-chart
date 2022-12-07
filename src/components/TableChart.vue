<template>
  <div class="widget_container fr-grid-row" :id="widgetId">
         <div class = 'fr-table scroll' :id="tableId">
    </div>
</div>
</template>
<script>
import { Chart } from 'chart.js'
import { mixin } from '@/utils.js'
import annotationPlugin from 'chartjs-plugin-annotation'

Chart.pluginService.register(annotationPlugin)

export default {
  name: 'TableChart',
  mixins: [mixin],
  data () {
    return {
      widgetId: '',
      chartId: '',
      tableId: '',
      legendLeftMargin: 100,
      display: '',
      datasets: [],
      labels: undefined,
      xparse: [],
      yparse: [],
      nameParse: [],
      tmpColorParse: [],
      colorParse: [],
      listColors: [],
      vlineParse: [],
      vlineColorParse: [],
      tmpVlineColorParse: [],
      vlineNameParse: [],
      hlineParse: [],
      hlineColorParse: [],
      tmpHlineColorParse: [],
      hlineNameParse: [],
      typeGraph: '',
      ymax: 0,
      annotations: [],
      colorPrecisionBar: '#161616',
      colorBox: '#2f2f2f',
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
    },
    varname: {
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
      if (this.horizontal) {
        this.typeGraph = 'horizontalBar'
      } else {
        this.typeGraph = 'bar'
      }
      this.listColors = this.getAllColors()
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
      let data = []

      // Cas ou x est non numérique
      data = self.yparse
      self.labels = self.xparse[0]
      self.xAxisType = 'category'

      // Set ymax
      if (!this.horizontal) {
        self.ymax = Math.max.apply(null, self.hlineParse)
      }
      // Tracé de la courbe
      data.forEach(function (dj, j) {
        self.datasets.push({
          data: dj,
          borderColor: self.colorParse[j],
          backgroundColor: self.colorParse[j],
          hoverBorderColor: self.colorHover[j],
          hoverBackgroundColor: self.colorHover[j]
        })
      })
    },
    loadColors () {
      this.colorParse = []
      this.colorHover = []
      for (let i = 0; i < this.yparse.length; i++) {
        if (this.tmpColorParse[i] !== undefined) {
          this.colorParse.push(this.getHexaFromName(this.tmpColorParse[i]))
          this.colorHover.push(this.getHexaFromName(this.tmpColorParse[i], { hover: true }))
        } else {
          this.colorParse.push(this.getHexaFromName(this.listColors[i]))
          this.colorHover.push(this.getHexaFromName(this.listColors[i], { hover: true }))
        }
      }
    },
    createTableBar () {
      console.log('je suis length de yparse')
      console.log(this.yparse.length)
      const chartbox = document.getElementById(this.tableId)
      const TableDiv = document.createElement('DIV')
      TableDiv.setAttribute('id', 'tableDiv')
      const Table = document.createElement('TABLE')
      const thead = Table.createTHead()
      Table.classList.add('scroll')
      thead.insertRow(0)
      for (let i = 0; i < this.nameParse.length; i++) {
        thead.rows[0].insertCell(i).innerText = this.nameParse[i]
      }
      thead.rows[0].insertCell(0).innerText = this.varname
      const tbody = Table.createTBody()
      for (let i = 0; i < this.yparse[0].length; i++) {
        tbody.insertRow(i)
        for (let index = 0; index < this.yparse.length; index++) {
          tbody.rows[i].insertCell(index).innerText = this.yparse[index][i]
        }
        tbody.rows[i].insertCell(0).innerText = this.xparse[0][i]
      }
      tbody.classList.add('scroll')
      chartbox.appendChild(TableDiv)
      TableDiv.appendChild(Table)
    }
  },
  created () {
    this.chartId = 'myChart' + Math.floor(Math.random() * (1000))
    this.widgetId = 'widget' + Math.floor(Math.random() * (1000))
    this.tableId = 'table' + Math.floor(Math.random() * (1000))
  },
  mounted () {
    document.getElementById(this.widgetId).offsetWidth > 486 ? this.display = 'big' : this.display = 'small'
    this.getData()
    this.createTableBar()
    const element = document.documentElement // Reference à l'element <html> du DOM
    element.addEventListener('dsfr.theme', (e) => {
      this.changeColors(e.detail.theme)
    })
  }
}
</script>
<style scoped lang="scss">
.scroll {
  table-layout: fixed;
  border-collapse: collapse;
  overflow: auto;
  max-height: 25em;
}
.scroll thead {
  position: sticky;
  top: 0;
}
</style>
