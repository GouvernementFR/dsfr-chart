/* eslint-disable */
<template>
  <div class="widget_container fr-grid-row" :ref="widgetId">
    <div class="r_col fr-col-12">
      <div class="chart">
        <div class="gauge-container">
          <div class="jauge" :style="'height:' + height">
            <div class="jauge-fill" :style="'width:' + width + '%'">
              <span class="jauge-text fr-text fr-text--sm fr-text-title--blue-france fr-pl-1w">{{percentage}}%</span>
            </div>
          </div>
        </div>
        <div class="gauge-container">
          <p class="fr-text--xs fr-text-mention--grey fr-mt-1w fr-mb-0">{{convertIntToHuman(init)}}</p>
          <p class="fr-text--xs fr-text-mention--grey fr-mt-1w r-align fr-mb-0">{{convertIntToHuman(target)}}</p>
        </div>
        <div v-if="initdate !== undefined && targetdate !== undefined" class="gauge-container">
          <p class="fr-text--xs fr-text-mention--grey">{{initdate}}</p>
          <p class="fr-text--xs fr-text-mention--grey r-align">{{targetdate}}</p>
        </div>
        <div class="flex" v-if="legend">
          <span class="legende_dot target_legend"></span>
          <p class="fr-text--sm fr-text--bold fr-ml-2v fr-mb-0">Valeur cible</p>
        </div>
        <div class="flex fr-mt-3v" v-if="legend">
          <span class="legende_dot actual_legend"></span>
          <p class="fr-text--sm fr-text--bold fr-ml-2v fr-mb-0">Valeur actuelle</p>
        </div>
        <div v-if="date!==undefined" class="flex fr-mt-1w">
          <p class="fr-text--xs">Mise à jour : {{date}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import { mixin } from '@/utils/global.js'

export default {
  name: 'GaugeChart',
  mixins: [mixin],
  data () {
    return {
      widgetId: '',
      percentage: 0,
      styleRectangleOver: '',
      styleRectangleUnder: '',
      styleLegendOver: '',
      styleLegendUnder: '',
      colorOver: '',
      colorUnder: '',
      width: undefined
    }
  },
  props: {
    value: {
      type: Number,
      default: undefined
    },
    percentvalue: {
      type: Number,
      default: undefined
    },
    init: {
      type: Number,
      required: true
    },
    target: {
      type: Number,
      required: true
    },
    targetdate: {
      type: String,
      default: undefined
    },
    initdate: {
      type: String,
      default: undefined
    },
    height: {
      type: String,
      default: '2rem'
    },
    legend: {
      type: [Boolean, String],
      default: true
    },
    date: {
      type: String,
      default: undefined
    }
  },
  methods: {
    createChart () {
      if (this.percentvalue === undefined) {
        this.percentage = Math.round(100 * (this.value - this.init) / (this.target - this.init))
      } else {
        this.percentage = Math.round(this.percentvalue)
      }
      this.width = Math.min(100, this.percentage)
    },
    changeTheme (theme) {
      // this.colorOver = this.getHexaFromName(this.color)
      // this.colorUnder = this.getHexaFromToken('background-contrats-grey', theme)
      // const widthOver = Math.min(100, this.percentage)
      // this.styleRectangleOver = 'background-color:' + this.colorOver + '; width:' + widthOver + '%;' + 'height:' + this.height
      // this.styleRectangleUnder = 'background-color:' + this.colorUnder + '; width:' + (100 - widthOver) + '%'
      // this.styleLegendOver = 'background-color:' + this.colorOver
      // this.styleLegendUnder = 'background-color:' + this.colorUnder
      // this.styleRectangleOver = 'height:' + this.height
    }
  },
  created () {
    this.widgetId = 'widget' + Math.floor(Math.random() * (1000))
  },
  mounted() {
    this.createChart();

    this.display = this.$refs[this.widgetId].offsetWidth > 486 ? 'big' : 'small';
  }
}

</script>

<style scoped lang="scss">
@import '@/styles/GaugeChart.scss';
</style>
