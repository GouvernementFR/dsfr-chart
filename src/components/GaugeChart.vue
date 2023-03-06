<template>
  <div class="widget_container fr-grid-row" :id="widgetId">
    <div class="r_col fr-col-12">
      <div class="chart">
        <div class="gauge-container" :style="styleGauge">
          <div class="rectangle" :style="styleRectangleOver">
            <p class="fr-text--md fr-text--bold fr-mt-1v text-pct">{{percentage}} %</p>
          </div>
          <div class="rectangle" :style="styleRectangleUnder"></div>
        </div>
        <div class="gauge-container">
          <p class="fr-text--xs fr-text-mention--grey fr-mt-1w">{{init}}</p>
          <p class="fr-text--xs fr-text-mention--grey fr-mt-1w r-align">{{target}}</p>
        </div>
        <div class="flex fr-mt-3v" v-if="legend">
          <span class="legende_dot" :style="styleLegendUnder"></span>
          <p class="fr-text--sm fr-text--bold fr-ml-1v fr-mb-0">Valeur cible</p>
        </div>
        <div class="flex fr-mt-3v" v-if="legend">
          <span class="legende_dot" :style="styleLegendOver"></span>
          <p class="fr-text--sm fr-text--bold fr-ml-1v fr-mb-0">Valeur actuelle</p>
        </div>
        <div v-if="date!==undefined" class="flex fr-mt-1w">
          <p class="fr-text--xs">Mise à jour : {{date}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mixin } from '@/utils.js'

export default {
  name: 'GaugeChart',
  mixins: [mixin],
  data () {
    return {
      widgetId: '',
      percentage: 0,
      styleRectangleOver: '',
      styleGauge: '',
      styleRectangleUnder: '',
      styleLegendOver: '',
      styleLegendUnder: '',
      colorOver: '',
      colorUnder: ''
    }
  },
  props: {
    value: {
      type: Number,
      required: true
    },
    init: {
      type: Number,
      required: true
    },
    target: {
      type: Number,
      required: true
    },
    height: {
      type: String,
      default: '2rem'
    },
    legend: {
      type: Boolean,
      default: true
    },
    color: {
      type: String,
      default: 'green-bourgeon'
    },
    date: {
      type: String,
      default: undefined
    }
  },
  methods: {
    createChart () {
      this.percentage = Math.round(100 * (this.value - this.init) / (this.target - this.init))
    },
    changeTheme (theme) {
      this.colorOver = this.getHexaFromName(this.color)
      this.colorUnder = this.getHexaFromToken('background-contrats-grey', theme)
      const widthOver = Math.min(100, this.percentage)
      this.styleRectangleOver = 'background-color:' + this.colorOver + '; width:' + widthOver + '%;' + 'height:' + this.height
      this.styleRectangleUnder = 'background-color:' + this.colorUnder + '; width:' + (100 - widthOver) + '%'
      this.styleLegendOver = 'background-color:' + this.colorOver
      this.styleLegendUnder = 'background-color:' + this.colorUnder
    }
  },
  created () {
    this.widgetId = 'widget' + Math.floor(Math.random() * (1000))
  },
  mounted () {
    this.createChart()
    const element = document.documentElement // Reference à l'element <html> du DOM
    element.addEventListener('dsfr.theme', (e) => {
      this.changeTheme(e.detail.theme)
    })
  },
  updated () {
    const element = document.documentElement
    this.createChart()
    this.changeTheme(element.getAttribute('data-fr-theme'))
  }
}

</script>

<style scoped lang="scss">
.widget_container {
  .gauge-container{
    width: 100%;
    display: flex;
    .rectangle {
      text-align:center;
      justify-content: center;
    }
    .r-align {
      margin-left: auto;
      margin-right: 0;
    }
    .text-pct {
      color: white;
    }
  }
  .r_col {
    align-self: center;
    .flex {
      display: flex;
      width: 100%;
      margin: auto;
      .legende_dot {
        margin-left: 0px;
        min-width: 0.8rem;
        width: 0.8rem;
        height: 0.8rem;
        min-width: 0.8rem;
        background-color: #eee;
        display: inline-block;
        margin-top: 0.25rem;
      }
    }
  }
}
</style>
