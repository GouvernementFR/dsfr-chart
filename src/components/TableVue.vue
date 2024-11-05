/* eslint-disable */
<template>
  <div class="fr-table--sm fr-table fr-table fr-table--layout-fixed fr-table--no-caption fr-mb-0 "
    id="table-bordered-component">
    <div class="fr-table__wrapper">
      <div class="fr-table__container">
        <div class="fr-table__content">
          <table :class="{'fr-cell--multiline': isMultilineTableHeader}" id="table--sm">
            <caption>{{ captionTitle }}</caption>
            <thead>
              <tr>
                <th class="column-word-position" scope="col" v-for="(item, index) in tablevue_data[0]" :key="index">{{
                  item }}</th>
              </tr>
            </thead>
            <tbody>
              <tr :id="'table-sm-row-key-' + rowIndex" v-for="(row, rowIndex) in tablevue_data.slice(1)" :key="rowIndex"
                :data-row-key="rowIndex">
                <td class="fr-cell--center fr-px-2v" v-for="(column, columnIndex) in row " :key="columnIndex">
                  <div class="principaux-indicateurs-axes-cell"
                    v-if="columnIndex === 0 && tablevue_data[0].includes('Axes') && tablevue_data[0].includes('Support')">
                    <div class="principaux-indicateurs-axes-cell__axe-tag">
                      <p v-for="(item, index) in filteredItems[rowIndex]" :key="index"
                        class="fr-tag fr-tag--sm fr-mb-1v" :style="{ backgroundColor: item.color, color: 'white',
                          overflow: 'hidden', textOverflow: 'ellipsis',display: 'block', width: '100%' }">
                        {{ item.name }}
                      </p>
                    </div>
                  </div>
                  <div
                    v-else-if="(tablevue_data[0].includes('Axes') && !tablevue_data[0].includes('UBM')) && columnIndex === 2">
                    <a :href="column.split('-url-')[1]">{{ column.split('-url-')[0] }}</a>
                  </div>

                  <div class="cell-multiline-with-hover"
                    v-else-if="columnIndex === 1 && tablevue_data[0].includes('Axes')">
                    {{ column }}
                  </div>

                  <!-- première colonne tableau graph -->
                  <div class="cell-multiline-with-hover"
                    v-else-if="columnIndex === 0 && !tablevue_data[0].includes('Axes') && !tablevue_data[0].includes('Portée')">
                    {{ column }}
                  </div>

                  <div
                    v-else-if="((tablevue_data[0].includes('Auteur') && columnIndex === 0) || ((tablevue_data[0].includes('Auteur') && tablevue_data[0].includes('Verbatim')) || (tablevue_data[0].includes('Support') && tablevue_data[0].includes('Verbatim') && !tablevue_data[0].includes('Axes'))) && columnIndex === 1)">

                    <div class="cell-multiline-without-hover">
                      <a :href="column.split('-url-')[1]">{{ column.split('-url-')[0] }}</a>
                    </div>
                  </div>

                  <div
                    v-else-if="((tablevue_data[0].includes('Site') && tablevue_data[0].includes('Verbatim') && columnIndex === 3) || (tablevue_data[0].includes('Portée') && columnIndex === 1))">
                    <div class="cell-social-network">
                      <img :src="column" :alt="column" class="cell-social-network__icon" />
                    </div>
                  </div>

                  <!-- deuxième colonne tableau graph -->
                  <div class="cells-tab-segment-graph" v-else>
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
/* eslint-disable */
export default {
  name: "TableVue",
  props: {
    tablevue_data: {
      type: Array,
      required: true,
    },
    captionTitle: {
      type: String,
      required: true,
    },
    isMultilineTableHeader: {
      type: Boolean,
      default: true, // Défini par défaut à true
    },
  },
  computed: {
    filteredItems() {
      return this.tablevue_data.slice(1).map((row) => {
        return row[0].filter((item) => item.display);
      });
    },
  },
};
</script>

<style scoped lang="scss">
@import '../styles/components/boxes/tableVue.scss';
</style>
