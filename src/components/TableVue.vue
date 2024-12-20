<template>
  <div
    id="table-bordered-component"
    class="fr-table--sm fr-table fr-table fr-table--layout-fixed fr-table--no-caption fr-mb-0"
  >
    <div class="fr-table__wrapper">
      <div class="fr-table__container">
        <div class="fr-table__content">
          <table
            id="table--sm"
            :class="{ 'fr-cell--multiline': isMultilineTableHeader }"
          >
            <caption>
              {{ captionTitle }}
            </caption>
            <thead>
              <tr>
                <th
                  v-for="(item, index) in tableData[0]"
                  :key="index"
                  class="column-word-position"
                  scope="col"
                >
                  {{ item }}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(row, rowIndex) in tableData.slice(1)"
                :ref="'table-sm-row-key-' + rowIndex"
                :key="rowIndex"
                :data-row-key="rowIndex"
              >
                <td
                  v-for="(column, columnIndex) in row"
                  :key="columnIndex"
                  class="fr-cell--center fr-px-2v"
                >
                  <div
                    v-if="columnIndex === 0 && tableData[0].includes('Axes') && tableData[0].includes('Support')"
                    class="principaux-indicateurs-axes-cell"
                  >
                    <div class="principaux-indicateurs-axes-cell__axe-tag">
                      <p
                        v-for="(item, index) in filteredItems[rowIndex]"
                        :key="index"
                        class="fr-tag fr-tag--sm fr-mb-1v"
                        :style="{ backgroundColor: item.color, color: 'white', overflow: 'hidden', textOverflow: 'ellipsis', display: 'block', width: '100%' }"
                      >
                        {{ item.name }}
                      </p>
                    </div>
                  </div>
                  <div v-else-if="tableData[0].includes('Axes') && !tableData[0].includes('UBM') && columnIndex === 2">
                    <a :href="column.split('-url-')[1]">{{ column.split('-url-')[0] }}</a>
                  </div>

                  <div
                    v-else-if="columnIndex === 1 && tableData[0].includes('Axes')"
                    class="cell-multiline-with-hover"
                  >
                    {{ column }}
                  </div>

                  <!-- première colonne tableau graph -->
                  <div
                    v-else-if="columnIndex === 0 && !tableData[0].includes('Axes') && !tableData[0].includes('Portée')"
                    class="cell-multiline-with-hover"
                  >
                    {{ column }}
                  </div>

                  <div v-else-if="(tableData[0].includes('Auteur') && columnIndex === 0) || (((tableData[0].includes('Auteur') && tableData[0].includes('Verbatim')) || (tableData[0].includes('Support') && tableData[0].includes('Verbatim') && !tableData[0].includes('Axes'))) && columnIndex === 1)">
                    <div class="cell-multiline-without-hover">
                      <a :href="column.split('-url-')[1]">{{ column.split('-url-')[0] }}</a>
                    </div>
                  </div>

                  <div v-else-if="(tableData[0].includes('Site') && tableData[0].includes('Verbatim') && columnIndex === 3) || (tableData[0].includes('Portée') && columnIndex === 1)">
                    <div class="cell-social-network">
                      <img
                        :src="column"
                        :alt="column"
                        class="cell-social-network__icon"
                      >
                    </div>
                  </div>

                  <!-- deuxième colonne tableau graph -->
                  <div
                    v-else
                    class="cells-tab-segment-graph"
                  >
                    {{ column }}
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TableVue',
  props: {
    tableData: {
      type: Array,
      required: true,
    },
    captionTitle: {
      type: String,
      required: true,
    },
    isMultilineTableHeader: {
      type: [Boolean, String],
      default: true, // Défini par défaut à true
    },
  },
  computed: {
    filteredItems() {
      return this.tableData.slice(1).map((row) => {
        return row[0].filter((item) => item.display);
      });
    },
  },
};
</script>

<style scoped lang="scss">
@import '@/styles/tableVue.scss';
</style>
