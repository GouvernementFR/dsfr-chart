<template>
  <div class="widget_container fr-grid-row" :id="widgetId">
    <div class = 'fr-table scroll' :id="tableId" :style="styleHeight">
      <table>
        <thead>
          <tr>
            <th scope="col">{{varname}}</th>
            <th v-for="(item, index) in nameParse" :key="item" scope="col">{{nameParse[index]}}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in xparse" :key="index">
            <td :class="getClass(item)">{{item}}</td>
            <td v-for="(item2, index2) in yparse" :key="index2" :class="getClass(yparse[index2][index])">{{yparse[index2][index]}}</td>
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
      // Récupération des paramètres
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
      if (typeof value === 'number') {
        return 'text-right'
      } else {
        return 'text-left'
      }
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
</style>
