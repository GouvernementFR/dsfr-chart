/* eslint-disable */
<template>
  <div class="widget_container fr-grid-row" :id="widgetId">
    <LeftCol :props="leftColProps"></LeftCol>
    <div class="r_col fr-col-12 fr-col-lg-9">
      <button class="fr-btn fr-btn--sm fr-icon-arrow-go-back-fill fr-btn--icon-left fr-btn--tertiary-no-outline fr-ml-4w" @click="resetGeoFilters" v-if="zoomDep !== undefined" >
        Retour
      </button>
      <div class="map m-lg">
          <div ref="mapTooltip" class="map_tooltip" :style="{top:tooltip.top,left:tooltip.left,visibility:tooltip.visibility}">
            <div class="tooltip_header fr-text--sm fr-mb-0">{{ tooltip.place }}</div>
            <div class="tooltip_body">
              <div class="tooltip_value-content">

            <div class="tooltip_value">{{convertStringToLocaleNumber(tooltip.value)}}</div>
              </div>
          </div>
        </div>
        <div class="france_container no_select" :style="{display:displayFrance}">
          <france :props="FranceProps" :onclick="changeGeoLevel" :ondblclick="resetGeoFilters" :onenter="displayTooltip" :onleave="hideTooltip"></france>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import LeftCol from '@/components/LeftCol'
import maps from '@/components/maps'
import * as d3 from 'd3-scale'
import { isMobile, mixin, choosePalette } from '@/utils/global.js'

export default {
  name: 'MapChartReg',
  mixins: [mixin],
  components: {
    LeftCol,
    ...maps
  },
  data() {
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
        levelNat: false,
        locaParent: '',
        date: ''
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
    date: {
      type: String,
      required: true
    },
    region: {
      type: String,
      required: true
    },
    valuereg: {
      type: Number,
      default: undefined
    },
    name: {
      type: String,
      default: 'Data'
    },
    selectedPalette: {
      type: String,
      default: 'sequentialAscending'  // Aucune palette définie par défaut
    },
    highlightIndex: {
      type: Number,
      default: -1  // Si aucune donnée n'est mise en avant, on met tout en neutre
    }
  },
  methods: {
    createChart() {
    // Initialize region data
    const parentWidget = document.getElementById(this.widgetId);
    const self = this;
    this.dataParse = JSON.parse(this.data);

    // Define color scale
    const palette = this.choosePalette();
    this.colLeft = palette[0];
    this.colRight = palette[palette.length - 1];
    this.leftColProps.colMin = this.colLeft;
    this.leftColProps.colMax = this.colRight;
    this.leftColProps.date = this.date;
    this.leftColProps.names = this.name;

    const values = [];
    let listDep = [];

    // Display only departments within the selected region
    self.FranceProps.displayDep = {};
    listDep = this.getDepsFromReg(this.region); // Get departments for the specified region
    listDep.forEach(key => {
      values.push(self.dataParse[key]);
    });

    // Define color scale based on regional values
    this.scaleMin = Math.min(...values);
    this.scaleMax = Math.max(...values);
    const colorScale = d3.scaleLinear().domain([this.scaleMin, this.scaleMax]).range([this.colLeft, this.colRight]);

    let xmin = [], xmax = [], ymin = [], ymax = [];

    // Iterate over each department in the region and set colors
    for (const key in self.dataParse) {
      const className = this.getClassMap(key, 'dep'); // Use department-level mapping
      const elCol = parentWidget.getElementsByClassName(className);

      if (listDep.includes(key)) { // If the department is in the selected region
        elCol.length !== 0 && elCol[0].setAttribute('fill', colorScale(self.dataParse[key]));
        self.FranceProps.displayDep[className] = ''; // Show the department
        const polygon = elCol[0].getBBox();
        xmin.push(polygon.x);
        ymin.push(polygon.y);
        xmax.push(polygon.x + polygon.width);
        ymax.push(polygon.y + polygon.height);
      } else {
        // Hide other departments outside the selected region
        elCol.length !== 0 && elCol[0].setAttribute('fill', 'rgba(255, 255, 255, 0)');
        self.FranceProps.displayDep[className] = 'none';
      }
    }

    // Calculate viewBox to focus on the selected region
    if (xmin.length && ymin.length && xmax.length && ymax.length) {
      const xminValue = Math.min(...xmin);
      const yminValue = Math.min(...ymin);
      const xmaxValue = Math.max(...xmax);
      const ymaxValue = Math.max(...ymax);
      const width = xmaxValue - xminValue;
      const height = ymaxValue - yminValue;
      const size = Math.max(width, height);
      this.FranceProps.viewBox = `${xminValue} ${yminValue} ${size} ${size}`;
    }

    // Update left column properties for region-specific display
    this.leftColProps.localisation = this.getReg(this.region).label;
    this.leftColProps.value = this.valuereg;
    this.leftColProps.min = this.scaleMin;
    this.leftColProps.max = this.scaleMax;
  },
    choosePalette() {
      // Using the refactored choosePalette function from utils
      return choosePalette(this.selectedPalette);
    },
    displayTooltip(e) {
      if (isMobile()) return
      const parentWidget = document.getElementById(this.widgetId)
      const hoverdep = e.target.className.baseVal.replace(/FR|-|dep|reg|acad/g, '')

      const className = this.getClassMap(hoverdep, 'dep')
      const elCol = parentWidget.getElementsByClassName(className)
      elCol[0].style.opacity = '0.72'
      this.tooltip.value = this.dataParse[hoverdep]
      this.tooltip.place = this.getDep(hoverdep).label

      const elem = parentWidget.getElementsByClassName('map_tooltip')[0]
      const tooltipRect = elem.getBoundingClientRect()
      const tooltipWidth = tooltipRect.width
      const tooltipHeight = tooltipRect.height

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
    hideTooltip(e) {
      if (isMobile()) return
      this.tooltip.visibility = 'hidden'
      const parentWidget = document.getElementById(this.widgetId)
      const hoverdep = e.target.className.baseVal.replace(/FR|-|dep|reg|acad/g, '')
      const className = this.getClassMap(hoverdep, 'dep')
      const elCol = parentWidget.getElementsByClassName(className)
      elCol[0].style.opacity = '1'
    },
    changeGeoLevel(e) {
      // Get clicked departement
      let clickdep
      try {
        clickdep = e.path[1]._prevClass
      } catch (error) {
        try {
          clickdep = e.explicitOriginalTarget && e.explicitOriginalTarget._prevClass
          if (clickdep === undefined) {
            clickdep = e.explicitOriginalTarget.parentNode._prevClass
          }
        } catch (error) {
          clickdep = e.toElement && e.toElement._prevClass
          if (clickdep === undefined) {
            clickdep = e.toElement.parentElement._prevClass
          }
        }
      }
      if (clickdep === 'France') {
        clickdep = e.target.className.baseVal.replace(/FR|-|dep|reg|acad/g, '')
      } else {
        clickdep = e.target.className.baseVal.replace(/FR|-|dep|reg|acad/g, '')
      }

      this.zoomDep = clickdep
      this.createChart()
    },
    resetGeoFilters() {
      this.zoomDep = undefined
      this.createChart()
    },

    changeTheme(theme) {
      if (theme === 'light') {
        this.colLeft = '#eeeeee';
        this.colRight = this.getHexaFromName(this.color);
        this.FranceProps.colorStroke = '#FFFFFF';
        this.colorStrokeDOM = '#FFFFFF';
      } else {
        this.colLeft = this.getHexaFromName(this.color);
        this.colRight = '#eeeeee';
        this.FranceProps.colorStroke = '#161616';
        this.colorStrokeDOM = '#161616';
      }
      this.createChart();
    }
  },
  created() {
    this.chartId = 'myChart' + Math.floor(Math.random() * (1000))
    this.widgetId = 'widget' + Math.floor(Math.random() * (1000))
  },
  mounted() {
    const element = document.documentElement // Reference à l'element <html> du DOM
    element.addEventListener('dsfr.theme', (e) => {
      this.changeTheme(e.detail.theme)
    })
  }
}

</script>

<style scoped lang="scss">
@import '@/styles/MapChart.scss';
</style>
