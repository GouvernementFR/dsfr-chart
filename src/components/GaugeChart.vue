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
          <div class="gauge-container">
            <div
              class="jauge"
              :style="{ height: height }"
            >
              <div
                class="jauge-fill"
                :style="{ width: width + '%' }"
              >
                <span class="jauge-text fr-text fr-text--sm fr-text-title--blue-france fr-pl-1w">{{ percentage }}%</span>
              </div>
            </div>
          </div>
          <div class="gauge-container">
            <p class="fr-text--xs fr-text-mention--grey fr-mt-1w fr-mb-0">
              {{ formatNumber(init) }}
            </p>
            <p class="fr-text--xs fr-text-mention--grey fr-mt-1w fr-mb-0 fr-ml-auto fr-mr-0">
              {{ formatNumber(target) }}
            </p>
          </div>
          <div
            v-if="initDate && targetDate"
            class="gauge-container"
          >
            <p class="fr-text--xs fr-text-mention--grey">
              {{ initDate }}
            </p>
            <p class="fr-text--xs fr-text-mention--grey fr-ml-auto fr-mr-0">
              {{ targetDate }}
            </p>
          </div>
          <div
            v-if="showLegend"
            class="flex"
          >
            <span class="legende_dot target_legend" />
            <p class="fr-text--sm fr-text--bold fr-ml-2v fr-mb-0">
              Valeur cible
            </p>
          </div>
          <div
            v-if="showLegend"
            class="flex fr-mt-3v fr-mb-1v"
          >
            <span class="legende_dot actual_legend" />
            <p class="fr-text--sm fr-text--bold fr-ml-2v fr-mb-0">
              Valeur actuelle
            </p>
          </div>
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
import { chartMixins } from '@/utils/global.js';
import { normalizeNumber, normalizeBoolean } from '@/utils/propParsers.js';

export default {
  name: 'GaugeChart',
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
      default: 'default',
    },
    value: {
      type: [Number, String],
      default: '',
    },
    percent: {
      type: [Number, String],
      default: '',
    },
    init: {
      type: [Number, String],
      required: true,
    },
    target: {
      type: [Number, String],
      required: true,
    },
    initDate: {
      type: String,
      default: '',
    },
    targetDate: {
      type: String,
      default: '',
    },
    height: {
      type: String,
      default: '2rem',
    },
    legend: {
      type: [Boolean, String],
      default: true,
    },
    date: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      widgetId: '',
      percentage: 0,
      styleRectangleOver: '',
      styleRectangleUnder: '',
      styleLegendOver: '',
      styleLegendUnder: '',
      colorOver: '',
      colorUnder: '',
      width: '',
    };
  },
  computed: {
    showLegend() {
      return normalizeBoolean(this.legend, true);
    },
  },
  watch: {
    $props: {
      handler() {
        // Check if the widget is already created to prevent useless re-renders
        if (this.widgetId) {
          this.createChart();
        }
      },
      deep: true,
      immediate: true,
    },
  },
  created() {
    this.widgetId = 'dsfr-widget-' + Math.floor(Math.random() * 1000);
  },
  mounted() {
    this.createChart();

    this.display = this.$refs[this.widgetId].offsetWidth > 486 ? 'big' : 'small';
  },
  methods: {
    createChart() {
      const init = normalizeNumber(this.init, 0);
      const target = normalizeNumber(this.target, 0);
      const val = normalizeNumber(this.value, null);
      const pct = normalizeNumber(this.percent, null);

      if (pct !== null) {
        this.percentage = Math.round(pct);
      } else if (val !== null && target !== init) {
        this.percentage = Math.round((100 * (val - init)) / (target - init));
      } else {
        this.percentage = 0;
      }

      this.width = Math.min(100, Math.max(0, this.percentage));
    },
  },
};
</script>

<style scoped lang="scss">
@import '@/styles/GaugeChart.scss';
</style>
