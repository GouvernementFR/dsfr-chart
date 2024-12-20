<template>
  <div
    :ref="widgetId"
    class="widget_container fr-grid-row"
  >
    <div
      :ref="tableId"
      class="fr-table scroll"
      :style="{ maxHeight: maxheight }"
    >
      <table aria-labelledby="table-caption">
        <caption id="table-caption">
          {{ varname }}
        </caption>
        <thead>
          <tr>
            <th scope="col">
              {{ varname }}
            </th>
            <th
              v-for="(item, index) in nameParse"
              :key="index"
              scope="col"
            >
              {{ item }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(item, rowIndex) in xparse"
            :key="rowIndex"
            :ref="'table-row-' + rowIndex"
          >
            <td :class="getClass(item)">
              {{ item }}
            </td>
            <td
              v-for="(item2, colIndex) in yparse"
              :key="colIndex"
              :class="getClass(yparse[colIndex][rowIndex])"
            >
              {{ convertIntToHumanTable(yparse[colIndex][rowIndex]) }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { mixin } from '@/utils/global.js';

export default {
  name: 'TableChart',
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
    varname: {
      type: String,
      default: undefined,
    },
    maxheight: {
      type: String,
      default: '25rem',
    },
  },
  data() {
    return {
      widgetId: '',
      tableId: '',
      xparse: [],
      yparse: [],
      nameParse: [],
    };
  },
  created() {
    this.widgetId = 'widget' + Math.floor(Math.random() * 1000);
    this.tableId = 'table' + Math.floor(Math.random() * 1000);
  },
  mounted() {
    this.resetData();
    this.getData();
  },
  methods: {
    resetData() {
      this.xparse = [];
      this.yparse = [];
      this.nameParse = [];
    },
    getData() {
      const self = this;
      this.xparse = JSON.parse(this.x);
      this.yparse = JSON.parse(this.y);

      let tmpNameParse = [];
      if (this.name !== undefined) {
        tmpNameParse = JSON.parse(self.name);
      }

      for (let i = 0; i < this.yparse.length; i++) {
        if (tmpNameParse[i] !== undefined) {
          self.nameParse.push(tmpNameParse[i]);
        } else {
          self.nameParse.push('Serie' + (i + 1));
        }
      }
    },
    getClass(value) {
      return typeof value === 'number' ? 'text-right' : 'text-left';
    },
  },
};
</script>

<style scoped lang="scss">
@import '@/styles/TableChart.scss';
</style>
