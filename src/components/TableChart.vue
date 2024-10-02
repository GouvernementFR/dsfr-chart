<template>
  <div class="widget_container fr-grid-row" :id="widgetId">
    <div class='fr-table scroll' :id="tableId" :style="styleHeight">
      <table aria-labelledby="table-caption">
        <caption id="table-caption">{{varname}}</caption>
        <thead>
          <tr>
            <th scope="col">{{varname}}</th>
            <th v-for="(item, index) in nameParse" :key="index" scope="col">{{item}}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, rowIndex) in xparse" :key="rowIndex" :id="'table-row-' + rowIndex">
            <td :class="getClass(item)">{{item}}</td>
            <td v-for="(item2, colIndex) in yparse" :key="colIndex" :class="getClass(yparse[colIndex][rowIndex])">{{convertIntToHumanTable(yparse[colIndex][rowIndex])}}</td>
          </tr>
        </tbody>
      </table>
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
      nameParse: [],
      styleHeight: ''
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
    },
    maxheight: {
      type: String,
      default: '25rem'
    }
  },
  methods: {
    resetData () {
      this.xparse = []
      this.yparse = []
      this.nameParse = []
    },
    getData () {
      const self = this
      this.xparse = JSON.parse(this.x)
      this.yparse = JSON.parse(this.y)

      this.styleHeight = 'max-height:' + this.maxheight

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
    getClass (value) {
      return typeof value === 'number' ? 'text-right' : 'text-left'
    }
  },
  created () {
    this.widgetId = 'widget' + Math.floor(Math.random() * (1000))
    this.tableId = 'table' + Math.floor(Math.random() * (1000))
  },
  mounted () {
    this.getData()
  },
  beforeUpdate () {
    this.resetData()
    this.getData()
  }
}
</script>

<style scoped lang="scss">
.scroll {
  table-layout: fixed;
  border-collapse: collapse;
  overflow: auto;
}

.scroll thead {
  position: sticky;
  top: 0;
}

.text-right {
  text-align: right;
}

.text-left {
  text-align: left;
}

.caption {
  font-weight: bold;
  text-align: left;
}
</style>
