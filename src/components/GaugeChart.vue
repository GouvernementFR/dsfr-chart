<template>

  <div class="widget_container fr-grid-row" :id="widgetId">
    <div class="r_col fr-col-12">
      <div class="chart ml-lg">
        <div class="gauge-container">
          <div class="rectangle" :style="styleRectangleOver">
            <p class="fr-text--md fr-mt-1w text-pct">{{Math.round(percentage)}} %</p>
          </div>
          <div class="rectangle" :style="styleRectangleUnder"></div>
        </div>
        <div class="gauge-container">
          <p class="fr-text--xs fr-mt-1w">{{init}}</p>
          <p class="fr-text--xs fr-mt-1w r-align">{{target}}</p>
        </div>
        <div class="flex fr-mt-3v" v-if="legend">
          <span class="legende_dot"></span>
          <p class="fr-text--sm fr-text--bold fr-ml-1v fr-mb-0">Valeur cible</p>
        </div>
        <div class="flex fr-mt-3v" v-if="legend">
          <span class="legende_dot" :style="styleLegend"></span>
          <p class="fr-text--sm fr-text--bold fr-ml-1v fr-mb-0">Valeur actuelle</p>
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
      styleRectangleUnder: '',
      styleLegend: '',
      colorParse: ''
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
    legend: {
      type: Boolean,
      default: true
    },
    color: {
      type: String,
      default: 'green-bourgeon'
    }
  },
  methods: {
    createChart () {
      this.percentage = 100 * (this.value - this.init) / (this.target - this.init)
      this.colorParse = this.getHexaFromName(this.color)
      this.styleRectangleOver = 'background-color:' + this.colorParse + '; width:' + this.percentage + '%'
      this.styleRectangleUnder = 'width:' + (100 - this.percentage) + '%'
      this.styleLegend = 'background-color:' + this.colorParse
      const aa = document.getElementById(this.widgetId).getElementsByClassName('gauge-container')[0]
      console.log(aa)
    },
    // displayTooltip (e) {
    //   if (isMobile) return
    //   const parentWidget = document.getElementById(this.widgetId)
    //   const hoverdep = e.target.className.baseVal.replace(/FR|-|dep|reg|acad/g, '')

    //   const className = this.getClassMap(hoverdep, 'dep')
    //   const elCol = parentWidget.getElementsByClassName(className)
    //   elCol[0].style.opacity = '0.72'
    //   this.tooltip.value = this.dataParse[hoverdep]
    //   this.tooltip.place = this.getDep(hoverdep).label

    //   const elem = parentWidget.getElementsByClassName('map_tooltip')[0]
    //   const tooltipRect = elem.getBoundingClientRect()
    //   const tooltipWidth = tooltipRect.width
    //   const tooltipHeight = tooltipRect.height

    //   const containerRect = e.target.getBoundingClientRect()
    //   let tooltipX = containerRect.left + ((containerRect.width - tooltipWidth) / 2)
    //   let tooltipY = containerRect.top - tooltipHeight

    //   const limitsRect = parentWidget.getBoundingClientRect()
    //   if (tooltipY < limitsRect.top) {
    //     tooltipY = containerRect.bottom
    //   }
    //   if (tooltipX + tooltipWidth > limitsRect.right) {
    //     tooltipX = containerRect.right - tooltipWidth - 10
    //     tooltipY = containerRect.top - tooltipHeight / 2
    //   }

    //   this.tooltip.top = tooltipY + 'px'
    //   this.tooltip.left = tooltipX + 'px'
    //   this.tooltip.visibility = 'visible'
    // },
    // hideTooltip (e) {
    //   if (isMobile) return
    //   this.tooltip.visibility = 'hidden'
    //   const parentWidget = document.getElementById(this.widgetId)
    //   const hoverdep = e.target.className.baseVal.replace(/FR|-|dep|reg|acad/g, '')
    //   const className = this.getClassMap(hoverdep, 'dep')
    //   const elCol = parentWidget.getElementsByClassName(className)
    //   elCol[0].style.opacity = '1'
    // },
    // changeGeoLevel (e) {
    //   // Get clicked departement
    //   let clickdep
    //   try {
    //     clickdep = e.path[1]._prevClass
    //   } catch (error) {
    //     try {
    //       clickdep = e.explicitOriginalTarget._prevClass
    //       if (clickdep === undefined) {
    //         clickdep = e.explicitOriginalTarget.parentNode._prevClass
    //       }
    //     } catch (error) {
    //       clickdep = e.toElement._prevClass
    //       if (clickdep === undefined) {
    //         clickdep = e.toElement.parentElement._prevClass
    //       }
    //     }
    //   }
    //   if (clickdep === 'France') {
    //     clickdep = e.target.className.baseVal.replace(/FR|-|dep|reg|acad/g, '')
    //   } else {
    //     clickdep = e.target.className.baseVal.replace(/FR|-|dep|reg|acad/g, '')
    //   }

    //   this.zoomDep = clickdep
    //   this.createChart()
    // },
    // resetGeoFilters () {
    //   this.zoomDep = undefined
    //   this.createChart()
    // },

    changeTheme (theme) {
      this.colorParse = this.getHexaFromName(this.color)
      this.styleRectangleOver = 'background-color:' + this.colorParse + '; width:' + this.percentage + '%'
      this.styleLegend = 'background-color:' + this.colorParse
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
  }
}

</script>

<style scoped lang="scss">
.widget_container {
  .ml-lg {
    margin-left: 0;
  }
  @media (min-width: 62em) {
    .ml-lg {
      margin-left: 3rem;
    }
  }
  @media (max-width: 62em) {
    .chart .flex {
      margin-left: 0 !important
    }
  }
  .gauge-container{
    width: 90%;
    margin:auto;
    display: flex;
    .rectangle {
      background-color: #eee;
      height:40px;
      text-align: center;
    }
    .r-align {
      margin-left: auto;
      margin-right: 0;
    }
    .text-pct {
      color: white;
      margin: auto
    }
  }
  .r_col {
    align-self: center;
    .flex {
      display: flex;
      width: 90%;
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
