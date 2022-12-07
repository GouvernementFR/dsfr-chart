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
      tableId: '',
      xparse: [],
      yparse: [],
      nameParse: []
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
    varname: {
      type: String,
      default: undefined
    }
  },
  methods: {
    getData () {
      const self = this
      // Récupération des paramètres
      this.xparse = JSON.parse(this.x)
      this.yparse = JSON.parse(this.y)

      let tmpNameParse = []
      if (this.name !== undefined) {
        tmpNameParse = JSON.parse(self.name)
      }

      for (let i = 0; i < this.yparse.length; i++) {
        if (tmpNameParse[i] !== undefined) {
          self.nameParse.push(tmpNameParse[i])
        } else {
          self.nameParse.push('Serie' + (i + 1))
        }
      }
    },
    createTableBar () {
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
    this.widgetId = 'widget' + Math.floor(Math.random() * (1000))
    this.tableId = 'table' + Math.floor(Math.random() * (1000))
  },
  mounted () {
    this.getData()
    this.createTableBar()
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
