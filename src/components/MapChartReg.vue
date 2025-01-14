<template>
  <Teleport
    :disabled="!databoxId && !databoxType && databoxSource === 'default'"
    :to="'#' + databoxId + '-' + databoxType + '-' + databoxSource"
  >
    <div
      :ref="widgetId"
      class="widget_container fr-grid-row"
    >
      <LeftCol :props="leftColProps" />
      <div class="fr-col-12 fr-col-lg-9 align-stretch">
        <button
          v-if="zoomDep !== undefined"
          class="fr-btn fr-btn--sm fr-icon-arrow-go-back-fill fr-btn--icon-left fr-btn--tertiary-no-outline fr-ml-4w"
          @click="resetGeoFilters"
        >
          Retour
        </button>
        <div class="map">
          <div
            class="map_tooltip"
            :style="{ top: tooltip.top, left: tooltip.left, visibility: tooltip.visibility }"
          >
            <div class="tooltip_header fr-text--sm fr-mb-0">
              {{ tooltip.place }}
            </div>
            <div class="tooltip_body">
              <div class="tooltip_value-content">
                <div class="tooltip_value">
                  {{ convertStringToLocaleNumber(tooltip.value) }}
                </div>
              </div>
            </div>
          </div>
          <div
            class="france_container no_select"
            :style="{ display: displayFrance }"
          >
            <france
              :props="FranceProps"
              :onclick="changeGeoLevel"
              :ondblclick="resetGeoFilters"
              :onenter="displayTooltip"
              :onleave="hideTooltip"
            />
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script>
import * as d3 from 'd3-scale';
import LeftCol from '@/components/LeftCol.vue';
import maps from '@/components/maps';
import { mixin, isMobile } from '@/utils/global.js';
import { choosePalette } from '@/utils/colors.js';

export default {
  name: 'MapChartReg',
  components: {
    LeftCol,
    ...maps,
  },
  mixins: [mixin],
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
    data: {
      type: String,
      required: true,
    },
    value: {
      type: Number,
      default: undefined,
    },
    date: {
      type: String,
      required: true,
    },
    region: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      default: 'Data',
    },
    selectedPalette: {
      type: String,
      default: 'sequentialAscending',
    },
  },
  data() {
    this.chart = undefined;

    return {
      dataParse: {},
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
        valueReg: 0,
        date: '',
      },
      FranceProps: {
        viewBox: '0 0 262 262',
        displayDep: {},
        colorStroke: '#FFFFFF',
      },
      tooltip: {
        top: '0px',
        left: '0px',
        visibility: 'hidden',
        value: 0,
        place: '',
      },
      displayFrance: '',
      displayGuadeloupe: '',
      displayMartinique: '',
      displayMayotte: '',
      displayReunion: '',
      displayGuyanne: '',
      colorStrokeDOM: '#FFFFFF',
    };
  },
  created() {
    this.chartId = 'myChart' + Math.floor(Math.random() * 1000);
    this.widgetId = 'widget' + Math.floor(Math.random() * 1000);
  },
  mounted() {
    this.createChart();

    const element = document.documentElement;
    element.addEventListener('dsfr.theme', (e) => {
      if (this.chartId !== '') {
        this.changeTheme(e.detail.theme);
      }
    });
  },
  methods: {
    createChart() {
      const parentWidget = this.$refs[this.widgetId];
      const self = this;

      // Parsing des données
      try {
        this.dataParse = JSON.parse(this.data);
      } catch (error) {
        console.error('Erreur lors du parsing des données x ou y:', error);
        return;
      }

      // Choisir les couleurs extrêmes basées sur la palette
      const palette = this.choosePalette();

      this.colLeft = palette[0];
      this.colRight = palette[palette.length - 1];
      this.leftColProps.colMin = this.colLeft;
      this.leftColProps.colMax = this.colRight;
      this.leftColProps.date = this.date;
      this.leftColProps.names = this.name;

      const values = [];
      let listDep = [];

      self.FranceProps.displayDep = {};

      // Afficher uniquement les départements de la région sélectionnée
      listDep = this.getDepsFromReg(this.region);
      listDep.forEach((key) => {
        values.push(self.dataParse[key]);
      });

      // Calcul des min et max pour l'échelle
      this.scaleMin = Math.min(...values);
      this.scaleMax = Math.max(...values);

      // Define color scale based on regional values
      const colorScale = d3.scaleLinear().domain([this.scaleMin, this.scaleMax]).range([this.colLeft, this.colRight]);

      let xmin = [],
        xmax = [],
        ymin = [],
        ymax = [];

      // Iterate over each department in the region and set colors
      for (const key in self.dataParse) {
        const className = this.getClassMap(key, 'dep'); // Use department-level mapping
        const elCol = parentWidget.getElementsByClassName(className);

        if (listDep.includes(key)) {
          // If the department is in the selected region
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

      // Remplir les colonnes de gauche
      this.leftColProps.localisation = this.getReg(this.region).label;
      this.leftColProps.value = this.value;
      this.leftColProps.valueReg = this.dataParse[this.zoomDep];
      this.leftColProps.min = this.scaleMin;
      this.leftColProps.max = this.scaleMax;
    },
    choosePalette() {
      // Using the refactored choosePalette function from utils
      return choosePalette(this.selectedPalette);
    },
    displayTooltip(e) {
      if (isMobile()) return;
      const parentWidget = this.$refs[this.widgetId];
      const hoverdep = e.target.className.baseVal.replace(/FR|-|dep|reg|acad/g, '');

      const className = this.getClassMap(hoverdep, 'dep');
      const elCol = parentWidget.getElementsByClassName(className);
      elCol[0].style.opacity = '0.72';
      this.tooltip.value = this.dataParse[hoverdep];
      this.tooltip.place = this.getDep(hoverdep).label;

      const elem = parentWidget.getElementsByClassName('map_tooltip')[0];
      const tooltipRect = elem.getBoundingClientRect();
      const tooltipWidth = tooltipRect.width;
      const tooltipHeight = tooltipRect.height;

      const containerRect = e.target.getBoundingClientRect();
      let tooltipX = containerRect.left + (containerRect.width - tooltipWidth) / 2;
      let tooltipY = containerRect.top - tooltipHeight;

      const limitsRect = parentWidget.getBoundingClientRect();
      if (tooltipY < limitsRect.top) {
        tooltipY = containerRect.bottom;
      }
      if (tooltipX + tooltipWidth > limitsRect.right) {
        tooltipX = containerRect.right - tooltipWidth - 10;
        tooltipY = containerRect.top - tooltipHeight / 2;
      }

      this.tooltip.top = tooltipY + 'px';
      this.tooltip.left = tooltipX + 'px';
      this.tooltip.visibility = 'visible';
    },
    hideTooltip(e) {
      if (isMobile()) return;
      this.tooltip.visibility = 'hidden';
      const parentWidget = this.$refs[this.widgetId];
      const hoverdep = e.target.className.baseVal.replace(/FR|-|dep|reg|acad/g, '');
      const className = this.getClassMap(hoverdep, 'dep');
      const elCol = parentWidget.getElementsByClassName(className);
      elCol[0].style.opacity = '1';
    },
    changeGeoLevel(e) {
      // Get clicked department
      let clickdep = e.target.className.baseVal.replace(/FR|-|dep|reg|acad/g, '');

      this.zoomDep = clickdep;
      this.createChart();
    },
    resetGeoFilters() {
      this.zoomDep = undefined;
      this.createChart();
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
    },
  },
};
</script>

<style scoped lang="scss">
@import '@/styles/MapChart.scss';
</style>
