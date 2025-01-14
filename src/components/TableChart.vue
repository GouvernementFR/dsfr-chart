<template>
  <div
    :ref="widgetId"
    class="widget_container fr-grid-row"
  >
    <div
      :ref="tableId"
      class="fr-table scroll"
      :style="{ maxHeight: '25rem' }"
    >
      <table aria-labelledby="table-caption">
        <caption id="table-caption">
          {{ tableName }}
        </caption>
        <thead>
          <tr>
            <th scope="col">
              {{ tableName }}
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
            v-for="(rowItem, rowIndex) in xparse"
            :key="rowIndex"
          >
            <td :class="getClass(rowItem)">
              {{ rowItem }}
            </td>
            <td
              v-for="(colItem, colIndex) in yparse"
              :key="colIndex"
              :class="getClass(colItem[rowIndex])"
            >
              {{ convertIntToHumanTable(colItem[rowIndex]) }}
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
    tableName: {
      type: String,
      default: undefined,
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
      this.xparse = JSON.parse(this.x);
      this.yparse = JSON.parse(this.y);

      let tmpNameParse = [];
      if (this.name !== undefined) {
        try {
          tmpNameParse = JSON.parse(this.name);
        } catch (error) {
          console.error('Erreur lors du parsing de name:', error);
        }
      }

      for (let i = 0; i < this.yparse.length; i++) {
        if (tmpNameParse[i] !== undefined) {
          this.nameParse.push(tmpNameParse[i]);
        } else {
          this.nameParse.push('Serie' + (i + 1));
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
