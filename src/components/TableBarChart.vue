<template>
  <Teleport
    defer
    :disabled="!$el?.ownerDocument.getElementById(databoxId) || (!databoxId && !databoxType && databoxSource === 'default')"
    :to="'#' + databoxId + '-' + databoxType + '-' + databoxSource"
  >
    <div
      :ref="widgetId"
      class="widget_container"
    >
      <div
        :ref="tableId"
        class="fr-table"
        :style="{ maxHeight: '30rem', overflow: 'auto' }"
      >
        <div class="fr-table__wrapper">
          <div class="fr-table__container">
            <div class="fr-table__content">
              <table>
                <thead>
                  <tr>
                    <th
                      v-if="xparse.length"
                      scope="col"
                    >
                      {{ tableName }}
                    </th>
                    <th
                      v-for="(nameP, index) in nameParse"
                      :key="index"
                      scope="col"
                    >
                      {{ nameP }}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(xItem, rowIndex) in xparse[0]"
                    :key="rowIndex"
                  >
                    <td>{{ xItem }}</td>
                    <td
                      v-for="(series, seriesIndex) in yparse"
                      :key="seriesIndex"
                    >
                      <div class="bar-cell">
                        <div
                          class="bar-container"
                          :class="{
                            'has-mixed': hasMixedValues(yparse[seriesIndex]),
                          }"
                        >
                          <div
                            class="bar"
                            :class="{
                              positive: series[rowIndex] >= 0,
                              negative: series[rowIndex] < 0,
                            }"
                            :style="{
                              width: getWidth(series[rowIndex], yparse[seriesIndex]) + '%',
                              left: getLeft(series[rowIndex], yparse[seriesIndex]) + '%',
                              backgroundColor: colorParse[seriesIndex % colorParse.length] || defaultColor,
                            }"
                          >
                            <span
                              class="bar-value"
                              style="color: var(--font-color)"
                            >
                              {{ formatNumber(series[rowIndex]) }}
                            </span>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script>
export default {
  name: 'TableBarChart',
  props: {
    databoxId: { type: String, default: null },
    databoxType: { type: String, default: null },
    databoxSource: { type: String, default: 'default' },
    x: { type: [String, Array], default: () => [] },
    y: { type: [String, Array], default: () => [] },
    name: { type: [String, Array], default: () => [] },
    colors: { type: Array, default: () => ['#e4794a', '#68a532', '#666666'] },
    tableName: { type: String, default: 'Bar chart' },
  },
  data() {
    return {
      widgetId: '',
      tableId: '',
      xparse: [],
      yparse: [],
      nameParse: [],
      colorParse: [],
      defaultColor: '#cccccc',
    };
  },
  watch: {
    $props: {
      handler() {
        this.resetData();
        this.getData();
      },
      deep: true,
      immediate: true,
    },
  },
  created() {
    this.tableId = 'dsfr-table-' + Math.floor(Math.random() * 1000);
    this.widgetId = 'dsfr-widget-' + Math.floor(Math.random() * 1000);
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
      this.colorParse = [];
    },
    getData() {
      try {
        this.xparse = typeof this.x === 'string' ? JSON.parse(this.x) : this.x;
        this.yparse = typeof this.y === 'string' ? JSON.parse(this.y) : this.y;
        this.colorParse = typeof this.colors === 'string' ? JSON.parse(this.colors) : this.colors;
      } catch (error) {
        console.error('Parsing error:', error);
        return;
      }
      const tmpName = typeof this.name === 'string' ? JSON.parse(this.name) : this.name;
      this.nameParse = tmpName.length ? tmpName : this.yparse.map((_, i) => 'Série ' + (i + 1));
    },
    formatNumber(value) {
      return typeof value === 'number'
        ? value.toLocaleString('fr-FR', { maximumFractionDigits: 1 })
        : value;
    },
    hasMixedValues(series) {
      return series.some(v => v < 0) && series.some(v => v > 0);
    },
    getMaxForSeries(series) {
      return Math.max(...series.map(v => Math.abs(v)));
    },
    getWidth(value, series) {
      const max = this.getMaxForSeries(series);
      const absValue = Math.abs(value);
      if (this.hasMixedValues(series)) {
        return max ? ((absValue / max) * 50) : 0;
      }
      return max ? ((absValue / max) * 100) : 0;
    },
    getLeft(value, series) {
      if (this.hasMixedValues(series)) {
        return value >= 0 ? 50 : 50;
      }
      return value >= 0 ? 0 : 100;
    },
  },
};
</script>

<style scoped lang="scss">
@import '@/styles/TableChart.scss';
.bar-cell {
  position: relative;
  height: 1.5rem;
  overflow: hidden;
}
.bar-container {
  position: relative;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  &.has-mixed::before {
    content: '';
    position: absolute;
    left: 50%;
    top: 0;
    bottom: 0;
    width: 1px;
    background-color: #999;
  }
}
.bar {
  position: absolute;
  height: 100%;
  display: flex;
  align-items: center;
  padding: 0 0.25rem;
  font-size: 0.75rem;
  font-weight: 500;
  box-sizing: border-box;
  &.positive {
    justify-content: flex-start;
  }
  &.negative {
    justify-content: flex-end;
    transform: translateX(-100%);
  }
}
.bar-value {
  position: relative;
  z-index: 1;
  white-space: nowrap;
  padding: 0 0.25rem;
}
</style>
