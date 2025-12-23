<template>
  <Teleport
    :disabled="!$el?.ownerDocument.getElementById(databoxId) || (!databoxId && !databoxType && databoxSource === 'global')"
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
              <table :aria-labelledby="'title-' + databoxId">
                <thead>
                  <tr>
                    <th
                      v-if="xparse.length"
                      scope="col"
                    >
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
                      {{ formatNumber(colItem[rowIndex]) }}
                    </td>
                  </tr>
                  <tr
                    v-for="(rowItem, rowIndex) in lineParse"
                    :key="rowIndex"
                  >
                    <!-- eslint-disable vue/no-v-html -->
                    <td
                      v-for="(cellItem, cellIndex) in rowItem"
                      :key="cellIndex"
                      :class="getClass(cellItem)"
                      v-html="cellItem"
                    />
                    <!-- eslint-enable vue/no-v-html -->
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
import { chartMixins } from '@/utils/global.js';

export default {
  name: 'TableChart',
  mixins: [chartMixins],
  props: {
    databoxId: {
      type: String,
      default: null,
    },
    databoxType: {
      type: String,
      default: null,
    },
    databoxSource: {
      type: String,
      default: 'global',
    },
    x: {
      type: String,
      default: '',
    },
    y: {
      type: String,
      default: '',
    },
    subX: {
      type: String,
      default: null,
    },
    subY: {
      type: String,
      default: null,
    },
    line: {
      type: String,
      default: '',
    },
    name: {
      type: String,
      default: '',
    },
    tableName: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      widgetId: '',
      tableId: '',
      xparse: [],
      yparse: [],
      subXParse: [],
      subYParse: [],
      lineParse: [],
      nameParse: [],
      selectedIndex: -1,
    };
  },
  watch: {
    $props: {
      handler() {
        if (this.tableId) {
          this.resetData();
          this.getData();
        }
      },
      deep: true,
      immediate: true,
    },
  },
  created() {
    this.tableId = `dsfr-table-${Math.floor(Math.random() * 1000)}`;
    this.widgetId = `dsfr-widget-${Math.floor(Math.random() * 1000)}`;
  },
  mounted() {
    this.resetData();
    this.getData();
    // Wait for next tick to get chart element
    this.$nextTick(() => {
      this.observeRelatedChart();
    });
  },
  methods: {
    resetData() {
      this.xparse = [];
      this.yparse = [];
      this.lineParse = [];
      this.nameParse = [];
    },
    getData() {
      // Parsing des données
      if (this.x && this.y) {
        try {
          this.xparse = JSON.parse(this.x ?? '[]');
          this.yparse = JSON.parse(this.y ?? '[]');
          this.subXParse = JSON.parse(this.subX);
          this.subYParse = JSON.parse(this.subY);
        } catch (error) {
          console.error('Erreur lors du parsing des données x ou y:', error);
          return;
        }
      }

      if (this.line) {
        try {
          this.lineParse = JSON.parse(this.line ?? '[]');
        } catch (error) {
          console.error('Erreur lors du parsing des données line:', error);
          return;
        }
      }

      let tmpNameParse = [];
      if (this.name) {
        try {
          tmpNameParse = JSON.parse(this.name);
        } catch (error) {
          console.error('Erreur lors du parsing de name:', error);
        }
      }

      this.nameParse = [];
      for (let i = 0; i < this.yparse.length; i++) {
        if (tmpNameParse[i]) {
          this.nameParse.push(tmpNameParse[i]);
        } else {
          this.nameParse.push(`Série ${i + 1}`);
        }
      }

      for (let i = 0; i < (this.lineParse.length ? this.lineParse[0].length : 0); i++) {
        if (tmpNameParse[i]) {
          this.nameParse.push(tmpNameParse[i]);
        } else {
          this.nameParse.push(`Série ${i + 1}`);
        }
      }
    },
    getClass(value) {
      let classes = '';
      if (typeof value === 'string' && value.replace(/<[^>]*>/g, '').length > 132) {
        classes += 'cell-overflow ';
      }
      if (typeof value === 'number') {
        classes += 'cell-number ';
      } else {
        classes += 'cell-text ';
      }

      return classes;
    },
    observeRelatedChart() {
      const databoxSource = this.databoxSource === 'global' ? 'default' : `${this.databoxSource}`;
      const target = document.querySelector(`#${this.databoxId}-chart-${databoxSource} .widget_container`);
      const options = {
        attributes: true, // Listens for attribute changes.
        subtree: false, // Prevents observing descendants of the target element.
        childList: false, // Ignores additions or removals of child elements.
      };
      if (target) {
        const observer = new MutationObserver((mutationList) => {
          for (const mutation of mutationList) {
            if (mutation.attributeName === 'data-index') {
              this.selectedIndex = parseInt(mutation.target.getAttribute('data-index'));

              if (this.selectedIndex === -1) {
                this.xparse = JSON.parse(this.x);
                this.yparse = JSON.parse(this.y);
              } else {
                this.xparse = this.subXParse[this.selectedIndex];
                this.yparse = [this.subYParse[this.selectedIndex]];
              }
            }
          }
        });

        observer.observe(target, options);
      }
    },
  },
};
</script>

<style scoped>
* {
  --table-offset: 0px;
}
</style>
