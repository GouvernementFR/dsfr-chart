<template>
  <Teleport
    defer
    :disabled="!$el?.ownerDocument.getElementById(databoxId) || (!databoxId && !databoxType && databoxSource === 'default')"
    :to="'#' + databoxId + '-' + databoxType + '-' + databoxSource"
  >
    <div
      :ref="widgetId"
      class="widget_container fr-grid-row"
    >
      <div class="fr-col-12">
        <div class="chart">
          <div class="tooltip">
            <div class="tooltip_header fr-text--sm fr-mb-0" />
            <div class="tooltip_body">
              <div class="tooltip_value" />
            </div>
          </div>

          <!-- canvas slot -->
          <slot name="canvas" />

          <!-- default legend slot -->
          <slot name="legend">
            <div class="chart_legend fr-mb-0 fr-mt-4v">
              <div
                v-for="(item, index) in nameParse"
                :key="index"
                class="flex fr-mt-3v fr-mb-1v"
              >
                <span
                  class="legende_dot"
                  :style="{ 'background-color': colorParse[index % colorParse.length] }"
                />
                <p class="fr-text--sm fr-text--bold fr-ml-1w fr-mb-0">
                  {{ capitalize(item) }}
                </p>
              </div>
            </div>
          </slot>

          <div
            v-if="date"
            class="flex fr-mt-1w"
          >
            <p class="fr-text--xs">
              Mise à jour : {{ date }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script>
import { capitalize } from '@/utils/global.js';

export default {
  name: 'ChartShell',
  props: {
    databoxId: { type: String, default: null },
    databoxType: { type: String, default: null },
    databoxSource: { type: String, default: 'default' },
    widgetId: { type: String, required: true },
    chartId: { type: String, required: true },
    nameParse: { type: Array, default: () => [] },
    colorParse: { type: Array, default: () => [] },
    date: { type: String, default: '' },
  },
  methods: {
    capitalize,
  },
};
</script>

<style scoped lang="scss">
</style>
