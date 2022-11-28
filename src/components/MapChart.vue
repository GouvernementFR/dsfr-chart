<template>

  <div class="widget_container fr-grid-row" :id="widgetId">
    <LeftCol :props="leftColProps"></LeftCol>
    <div class="r_col fr-col-12 fr-col-lg-9">
      <button class="fr-btn fr-btn--sm fr-icon-arrow-go-back-fill fr-btn--icon-left fr-btn--secondary fr-ml-4w" @click="resetGeoFilters" v-if="zoomDep !== undefined" >
        Retour
      </button>
      <div class="map m-lg">
          <div ref="mapTooltip" class="map_tooltip" :style="{top:tooltip.top,left:tooltip.left,visibility:tooltip.visibility}">
          <div class="tooltip_header">{{tooltip.place}}</div>
          <div class="tooltip_body">
            <div class="tooltip_value">{{convertStringToLocaleNumber(tooltip.value)}}</div>
          </div>
        </div>
        <div class="france_container no_select" :style="{display:displayFrance}">
          <france :props="FranceProps" :onclick="changeGeoLevel" :ondblclick="resetGeoFilters" :onenter="displayTooltip" :onleave="hideTooltip"></france>
        </div>
        <div class="om_container fr-grid-row no_select">
          <div class="om fr-col-4 fr-col-sm" :style="{display:displayGuadeloupe}">
            <span class="fr-text--xs fr-my-1w">Guadeloupe</span>
            <guadeloupe :props="colorStrokeDOM" :onclick="changeGeoLevel" :ondblclick="resetGeoFilters" :onenter="displayTooltip" :onleave="hideTooltip"></guadeloupe>
          </div>
          <div class="om fr-col-4 fr-col-sm" :style="{display:displayMartinique}">
            <span class="fr-text--xs fr-my-1w">Martinique</span>
            <martinique :props="colorStrokeDOM" :onclick="changeGeoLevel" :ondblclick="resetGeoFilters" :onenter="displayTooltip" :onleave="hideTooltip"></martinique>
          </div>
          <div class="om fr-col-4 fr-col-sm" :style="{display:displayGuyanne}">
            <span class="fr-text--xs fr-my-1w">Guyane</span>
            <guyane :props="colorStrokeDOM" :onclick="changeGeoLevel" :ondblclick="resetGeoFilters" :onenter="displayTooltip" :onleave="hideTooltip"></guyane>
          </div>
          <div class="om fr-col-4 fr-col-sm" :style="{display:displayReunion}">
            <span class="fr-text--xs fr-my-1w">La Réunion</span>
            <reunion :props="colorStrokeDOM" :onclick="changeGeoLevel" :ondblclick="resetGeoFilters" :onenter="displayTooltip" :onleave="hideTooltip"></reunion>
          </div>
          <div class="om fr-col-4 fr-col-sm" :style="{display:displayMayotte}">
            <span class="fr-text--xs fr-my-1w">Mayotte</span>
            <mayotte :props="colorStrokeDOM" :onclick="changeGeoLevel" :ondblclick="resetGeoFilters" :onenter="displayTooltip" :onleave="hideTooltip"></mayotte>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LeftCol from '@/components/LeftCol'
import maps from '@/components/maps'
import * as d3 from 'd3-scale'
import { isMobile } from 'mobile-device-detect'
import { mixin } from '@/utils.js'

export default {
  name: 'MapChart',
  mixins: [mixin],
  components: {
    LeftCol,
    ...maps
  },
  data () {
    return {
      dataParse: {},
      chart: undefined,
      widgetId: '',
      chartId: '',
      scaleMin: 0,
      scaleMax: 0,
      colLeft: '',
      colRight: '',
      zoomDep: undefined,
      leftColProps: {
        localisation: '',
        names: [],
        min: 0,
        max: 0,
        colMin: '',
        colMax: '',
        value: 0,
        valueNat: 0,
        levelNat: false,
        colorFillIcon: ''
      },
      FranceProps: {
        viewBox: '0 0 262 262',
        displayDep: {},
        colorStroke: '#FFFFFF'
      },
      tooltip: {
        top: '0px',
        left: '0px',
        visibility: 'hidden',
        value: 0,
        place: ''
      },
      displayFrance: '',
      displayGuadeloupe: '',
      displayMartinique: '',
      displayMayotte: '',
      displayReunion: '',
      displayGuyanne: '',
      colorStrokeDOM: '#FFFFFF'
    }
  },
  props: {
    data: {
      type: String,
      required: true
    },
    valuenat: {
      type: Number,
      default: undefined
    },
    name: {
      type: String,
      default: 'Data'
    },
    color: {
      type: String,
      default: 'green-bourgeon'
    }
  },
  methods: {
    createChart () {
      const parentWidget = document.getElementById(this.widgetId)
      const self = this

      // Define colorscale
      this.dataParse = JSON.parse(this.data)
      const values = []

      // Fill Map
      let listDep = []
      self.FranceProps.displayDep = {}
      if (this.zoomDep !== undefined) {
        const a = this.getDep(this.zoomDep).region_value
        listDep = this.getDepsFromReg(a)
        listDep.forEach(function (key, j) {
          values.push(self.dataParse[key])
        })
      } else {
        for (const key in self.dataParse) {
          values.push(self.dataParse[key])
        }
      }

      this.scaleMin = Math.min.apply(null, values)
      this.scaleMax = Math.max.apply(null, values)
      const x = d3.scaleLinear().domain([this.scaleMin, this.scaleMax]).range([this.colLeft, this.colRight])

      let xmin = []
      let xmax = []
      let ymin = []
      let ymax = []
      for (const key in self.dataParse) {
        const elCol = parentWidget.getElementsByClassName('FR-' + key)
        if (self.zoomDep === undefined) {
          elCol.length !== 0 && elCol[0].setAttribute('fill', x(self.dataParse[key]))
          self.FranceProps.displayDep['FR-' + key] = ''
        } else {
          const polygon = document.querySelector('.FR-' + key).getBBox()
          if (self.zoomDep === key) {
            elCol.length !== 0 && elCol[0].setAttribute('fill', x(self.dataParse[key]))
            self.FranceProps.displayDep['FR-' + key] = ''
            xmin.push(polygon.x)
            ymin.push(polygon.y)
            xmax.push(polygon.x + polygon.width)
            ymax.push(polygon.y + polygon.height)
          } else if (listDep.includes(key)) {
            elCol.length !== 0 && elCol[0].setAttribute('fill', 'rgba(247, 237, 211, 0.72)')
            self.FranceProps.displayDep['FR-' + key] = ''
            xmin.push(polygon.x)
            ymin.push(polygon.y)
            xmax.push(polygon.x + polygon.width)
            ymax.push(polygon.y + polygon.height)
          } else {
            elCol.length !== 0 && elCol[0].setAttribute('fill', 'rgba(255, 255, 255, 0)')
            self.FranceProps.displayDep['FR-' + key] = 'none'
          }
        }
      }

      if (this.zoomDep !== undefined) {
        this.leftColProps.localisation = this.getDep(this.zoomDep).label
        this.leftColProps.value = this.dataParse[this.zoomDep]
        this.leftColProps.levelNat = (this.valuenat !== undefined)
        this.leftColProps.valueNat = this.valuenat
        xmin = Math.min.apply(null, xmin)
        ymin = Math.min.apply(null, ymin)
        xmax = Math.max.apply(null, xmax)
        ymax = Math.max.apply(null, ymax)
        const width = xmax - xmin
        const height = ymax - ymin
        const size = Math.max(width, height)
        this.FranceProps.viewBox = xmin + ' ' + ymin + ' ' + size + ' ' + size

        this.displayFrance = 'none'
        this.displayGuadeloupe = 'none'
        this.displayMartinique = 'none'
        this.displayMayotte = 'none'
        this.displayReunion = 'none'
        this.displayGuyanne = 'none'
        if (self.zoomDep === '971') {
          this.displayGuadeloupe = ''
        } else if (self.zoomDep === '972') {
          this.displayMartinique = ''
        } else if (self.zoomDep === '973') {
          this.displayGuyanne = ''
        } else if (self.zoomDep === '974') {
          this.displayReunion = ''
        } else if (self.zoomDep === '976') {
          this.displayMayotte = ''
        } else {
          this.displayFrance = ''
        }
      } else {
        this.leftColProps.localisation = 'France'
        this.leftColProps.value = this.valuenat
        this.leftColProps.levelNat = false
        this.FranceProps.viewBox = '0 0 262 262'
        this.displayFrance = ''
        this.displayGuadeloupe = ''
        this.displayMartinique = ''
        this.displayMayotte = ''
        this.displayReunion = ''
        this.displayGuyanne = ''
      }

      // Fill leftCol
      this.leftColProps.names = this.name
      this.leftColProps.min = this.scaleMin
      this.leftColProps.max = this.scaleMax
      this.leftColProps.colMin = this.colLeft
      this.leftColProps.colMax = this.colRight
    },
    displayTooltip (e) {
      if (isMobile) return
      const parentWidget = document.getElementById(this.widgetId)
      const hoverdep = e.target.className.baseVal.replace(/FR-/g, '')
      const elCol = parentWidget.getElementsByClassName('FR-' + hoverdep)
      elCol[0].style.opacity = '0.72'
      this.tooltip.value = this.dataParse[hoverdep]
      this.tooltip.place = this.getDep(hoverdep).label

      const elem = parentWidget.getElementsByClassName('map_tooltip')[0]
      const tooltipRect = elem.getBoundingClientRect()
      const tooltipWidth = tooltipRect.width
      const tooltipHeight = tooltipRect.height
      // const { x: transformX, y: transformY } = this.getTransformCoordinates()

      const containerRect = e.target.getBoundingClientRect()
      let tooltipX = containerRect.left + ((containerRect.width - tooltipWidth) / 2)
      let tooltipY = containerRect.top - tooltipHeight

      const limitsRect = parentWidget.getBoundingClientRect()
      if (tooltipY < limitsRect.top) {
        tooltipY = containerRect.bottom
      }
      if (tooltipX + tooltipWidth > limitsRect.right) {
        tooltipX = containerRect.right - tooltipWidth - 10
        tooltipY = containerRect.top - tooltipHeight / 2
      }

      this.tooltip.top = tooltipY + 'px'
      this.tooltip.left = tooltipX + 'px'
      this.tooltip.visibility = 'visible'
    },
    hideTooltip (e) {
      if (isMobile) return
      this.tooltip.visibility = 'hidden'
      const parentWidget = document.getElementById(this.widgetId)
      const hoverdep = e.target.className.baseVal.replace(/FR-/g, '')
      const elCol = parentWidget.getElementsByClassName('FR-' + hoverdep)
      elCol[0].style.opacity = '1'
    },
    changeGeoLevel (e) {
      // Get clicked departement
      let clickdep
      try {
        clickdep = e.path[1]._prevClass
      } catch (error) {
        try {
          clickdep = e.explicitOriginalTarget._prevClass
          if (clickdep === undefined) {
            clickdep = e.explicitOriginalTarget.parentNode._prevClass
          }
        } catch (error) {
          clickdep = e.toElement._prevClass
          if (clickdep === undefined) {
            clickdep = e.toElement.parentElement._prevClass
          }
        }
      }
      if (clickdep === 'France') {
        clickdep = e.target._prevClass.replace(/FR-/, '')
      } else {
        clickdep = clickdep.replace(/FR-/g, '')
      }

      this.zoomDep = clickdep
      this.createChart()
    },
    resetGeoFilters () {
      this.zoomDep = undefined
      this.createChart()
    },
    // getTransformCoordinates () {
    //   const coordinates = { x: 0, y: 0 }
    //   // const tab = this.$el.closest('.fr-tabs__panel')
    //   // // .fr-tabs__panel are transformed in DSFR 1.7 with transform: translate(-100%).
    //   // if (tab && window.getComputedStyle(tab).getPropertyValue('transform')) {
    //   //   const tabs = tab.closest('.fr-tabs')
    //   //   coordinates.x = tabs.getBoundingClientRect().left * -1
    //   //   coordinates.y = tab.getBoundingClientRect().top * -1
    //   // }
    //   // console.log(coordinates)
    //   return coordinates
    // }
    changeTheme (theme) {
      console.log(theme)
      if (theme === 'light') {
        this.colLeft = '#eeeeee'
        this.colRight = this.getHexaFromName(this.color)
        this.FranceProps.colorStroke = '#FFFFFF'
        this.colorStrokeDOM = '#FFFFFF'
        this.leftColProps.colorFillIcon = '#161616'
      } else {
        this.colLeft = this.getHexaFromName(this.color)
        this.colRight = '#eeeeee'
        this.FranceProps.colorStroke = '#161616'
        this.colorStrokeDOM = '#161616'
        this.leftColProps.colorFillIcon = '#FFFFFF'
      }
      this.createChart()
    }
  },
  created () {
    this.chartId = 'myChart' + Math.floor(Math.random() * (1000))
    this.widgetId = 'widget' + Math.floor(Math.random() * (1000))
  },
  mounted () {
    // this.createChart()
    const element = document.documentElement // Reference à l'element <html> du DOM
    element.addEventListener('dsfr.theme', (e) => {
      this.changeTheme(e.detail.theme)
    })
  }
}

</script>

<style scoped lang="scss">
  .no_select {
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    -webkit-tap-highlight-color: transparent;
    user-select: none;
  }

  .widget_container{
    .m-lg {
      margin-left:0;
      margin-top:1.5rem;
    }
    .map {
      display:flex;
      flex-direction:column;
      align-items:center;
      .map_tooltip{
        width: 11.25rem;
        height: auto;
        background-color: white;
        position: fixed;
        z-index: 999;
        box-shadow: 0 2px 6px 0 rgba(0, 0, 18, 0.16);
        text-align: left;
        pointer-events: none;
        font-size: 0.75rem;
        .tooltip_header{
          width: 100%;
          height: 30px;
          background-color: #f6f6f6;
          color:#6b6b6b;
          padding-left: 0.75rem;
          padding-bottom: 0.25rem;
          padding-top:0.25rem;
        }
        .tooltip_body{
          padding-left: 0.75rem;
          padding-top:0.25rem;
          padding-right: 0.75rem;
          line-height: 1.67;
          .tooltip_place{
            color:#242424;
          }
          .tooltip_value{
            color:#242424;
            font-weight: bold;
          }
        }
      }
      .france_container{
        height:100%;
        svg {
          height:100%;
          width:100%;
          g {
            cursor: pointer;
          }
        }
      }
      .om_container{
        width:100%;
        .om{
          display: flex;
          flex-direction: column;
          align-items: center;
          color: #616161;
          span{
            display: block;
            white-space: nowrap;
          }
          g{
            cursor: pointer;
          }
        }
      }
    }
    @media (min-width: 62em) {
      .m-lg {
        margin-left:3rem;
        margin-top:0
      }
      .map {
        height:100%;
      }
    }
    @media (max-width: 62em) {
      .chart .flex {
        margin-left:0!important
      }
      .map {
        width:100%;
      }
    }
    .r_col {
      align-self:stretch;
      .flex{
        display: flex;
        align-items: center;
      }
    }

  }

</style>
