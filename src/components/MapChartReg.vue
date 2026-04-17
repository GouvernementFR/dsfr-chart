<template>
  <Teleport
    v-if="!databoxId || targetReady"
    :to="'#' + databoxId + '-' + databoxType + '-' + databoxSource"
    :disabled="!databoxId"
  >
    <div
      :ref="widgetId"
      class="widget_container fr-grid-row"
    >
      <MapInfo :data="InfoProps" />
      <div class="fr-col-12 fr-col-lg-9 align-stretch">
        <button
          v-if="zoomDep"
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
                  {{ formatNumber(tooltip.value) }}
                </div>
              </div>
            </div>
          </div>
          <div
            class="map_container no_select"
            :style="{ display: displayFrance }"
          >
            <france
              :config="MapProps"
              :on-click="changeGeoLevel"
              :on-dbl-click="resetGeoFilters"
              :on-enter="displayTooltip"
              :on-leave="hideTooltip"
            />
          </div>
          <div class="map_sub_container fr-grid-row no_select">
            <div
              class="drom fr-col-sm"
              :style="{ display: displayGuadeloupe }"
            >
              <guadeloupe
                :config="MapProps"
                :on-click="changeGeoLevel"
                :on-dbl-click="resetGeoFilters"
                :on-enter="displayTooltip"
                :on-leave="hideTooltip"
              />
            </div>
            <div
              class="drom fr-col-sm"
              :style="{ display: displayMartinique }"
            >
              <martinique
                :config="MapProps"
                :on-click="changeGeoLevel"
                :on-dbl-click="resetGeoFilters"
                :on-enter="displayTooltip"
                :on-leave="hideTooltip"
              />
            </div>
            <div
              class="drom fr-col-sm"
              :style="{ display: displayGuyane }"
            >
              <guyane
                :config="MapProps"
                :on-click="changeGeoLevel"
                :on-dbl-click="resetGeoFilters"
                :on-enter="displayTooltip"
                :on-leave="hideTooltip"
              />
            </div>
            <div
              class="drom fr-col-sm"
              :style="{ display: displayReunion }"
            >
              <reunion
                :config="MapProps"
                :on-click="changeGeoLevel"
                :on-dbl-click="resetGeoFilters"
                :on-enter="displayTooltip"
                :on-leave="hideTooltip"
              />
            </div>
            <div
              class="drom fr-col-sm"
              :style="{ display: displayMayotte }"
            >
              <mayotte
                :config="MapProps"
                :on-click="changeGeoLevel"
                :on-dbl-click="resetGeoFilters"
                :on-enter="displayTooltip"
                :on-leave="hideTooltip"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script>
import * as d3 from 'd3-scale';
import MapInfo from '@/components/MapInfo.vue';
import maps from '@/components/maps';
import { formatNumber, isMobile, mapMixins } from '@/utils/global.js';
import { choosePalette } from '@/utils/colors.js';

export default {
  name: 'MapChartReg',
  components: {
    MapInfo,
    ...maps,
  },
  mixins: [
    {
      methods: {
        ...mapMixins.methods,
        formatNumber,
      },
    },
  ],
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
      type: [Number, String],
      default: '',
    },
    date: {
      type: String,
      default: '',
    },
    region: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      default: 'Données',
    },
    selectedPalette: {
      type: String,
      default: 'sequentialAscending',
    },
  },
  data() {
    return {
      dataParse: {},
      widgetId: '',
      scaleMin: 0,
      scaleMax: 0,
      colorLeft: '',
      colorRight: '',
      zoomDep: '',
      InfoProps: {
        localisation: '',
        level: '',
        names: [],
        min: 0,
        max: 0,
        colorMin: '',
        colorMax: '',
        value: 0,
        valueReg: undefined,
        date: '',
      },
      MapProps: {
        viewBox: '0 0 1010 1010',
        displayPath: {},
        colorStroke: '#FFFFFF',
      },
      tooltip: {
        top: '0px',
        left: '0px',
        visibility: 'hidden',
        value: undefined,
        place: '',
      },
      displayFrance: '',
      displayGuadeloupe: '',
      displayMartinique: '',
      displayMayotte: '',
      displayReunion: '',
      displayGuyane: '',
      dromColor: '#6b6b6b',
      targetReady: false,
    };
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
    targetReady(val) {
      if (val) {
        this.$nextTick(() => {
          this.createChart();
        });
      }
    },
  },
  created() {
    this.widgetId = `dsfr-widget-${Math.floor(Math.random() * 1000)}`;
  },
  mounted() {
    if (!this.databoxId || !this.databoxType) {
      this.createChart();
      // The template is not retriggered in maps, force update to process after other elements
      this.$forceUpdate();
    } else {
      const targetId = `${this.databoxId}-${this.databoxType}-${this.databoxSource}`;
      if (document.getElementById(targetId)) {
        this.targetReady = true;
      } else {
        this._targetObserver = new MutationObserver(() => {
          if (document.getElementById(targetId)) {
            this._targetObserver.disconnect();
            this.targetReady = true;
        }
        });
        this._targetObserver.observe(document.body, { childList: true, subtree: true });
      }
    }

    document.documentElement.addEventListener('dsfr.theme', (e) => {
      if (this.chartId !== '') {
        this.changeColors(e.detail.theme);
      }
    });
  },
  beforeUnmount() {
    if (this._targetObserver) {
      this._targetObserver.disconnect();
    }
  },
  methods: {
    createChart() {
      const parentWidget = this.$refs[this.widgetId];

      // Parsing des données
      try {
        this.dataParse = JSON.parse(this.data);
      } catch (error) {
        console.error('Erreur lors du parsing des données data:', error);
        return;
      }

      const palette = this.choosePalette();

      // Choisir les couleurs extrêmes basées sur la palette
      this.colorLeft = palette[0];
      this.colorRight = palette[palette.length - 1];
      this.InfoProps.colorMin = this.colorLeft;
      this.InfoProps.colorMax = this.colorRight;
      this.InfoProps.date = this.date;
      this.InfoProps.names = this.name;

      let values = [];

      this.MapProps.displayPath = {};

      // Afficher uniquement les départements de la région sélectionnée
      let listDep = this.getDepsFromReg(this.region);
      for (const key of listDep) {
        if (this.dataParse[key] !== undefined) {
          values.push(this.dataParse[key]);
        }
      }

      // Calcul des min et max pour l'échelle
      this.scaleMin = Math.min(...values);
      this.scaleMax = Math.max(...values);

      // Define color scale based on regional values
      const colorScale = d3.scaleLinear().domain([this.scaleMin, this.scaleMax]).range([this.colorLeft, this.colorRight]);

      const xmin = [],
        xmax = [],
        ymin = [],
        ymax = [];

      // Iterate over each department in France and hide
      for (const key of this.getAllDep()) {
        const className = `FR-${key}`;
        const elCol = parentWidget.getElementsByClassName(className);

        elCol[0].setAttribute('fill', 'rgba(255, 255, 255, 0)');
        this.MapProps.displayPath[className] = 'none';
      }
      // Iterate over each department in the region and set colors
      for (const key of listDep) {
        const className = `FR-${key}`;
        const elCol = parentWidget.getElementsByClassName(className);

        if (elCol.length === 0) {
          console.warn(`L'élément de la carte n'existe pas pour la valeur ${className}, veuillez le supprimer de vos données.`);
          continue;
        }

        if (!this.zoomDep) {
          if (listDep.includes(key)) {
            const polygon = elCol[0].getBBox();
            // Reset the fill and stroke for all paths
            elCol[0].setAttribute('fill', colorScale(this.dataParse[key]));
            elCol[0].setAttribute('stroke', this.MapProps.colorStroke);
            elCol[0].setAttribute('stroke-width', '0.2%');
            this.MapProps.displayPath[className] = '';
            xmin.push(polygon.x);
            ymin.push(polygon.y);
            xmax.push(polygon.x + polygon.width);
            ymax.push(polygon.y + polygon.height);
          }
        } else if (this.zoomDep === key) {
          const polygon = elCol[0].getBBox();
          // Highlight the selected path with a stroke
          elCol[0].setAttribute('fill', colorScale(this.dataParse[key]));
          elCol[0].setAttribute('stroke', '#1212FF');
          elCol[0].setAttribute('stroke-width', 2);
          // Teleport to end of SVG to be on top for stroke
          elCol[0].parentNode.appendChild(elCol[0]);
          this.MapProps.displayPath[className] = '';
          xmin.push(polygon.x);
          ymin.push(polygon.y);
          xmax.push(polygon.x + polygon.width);
          ymax.push(polygon.y + polygon.height);
        } else if (listDep.includes(key)) {
          const polygon = elCol[0].getBBox();
          elCol[0].setAttribute('fill', colorScale(this.dataParse[key]).replace(')', ', 0.6)').replace('rgb', 'rgba'));
          elCol[0].setAttribute('stroke', this.MapProps.colorStroke);
          elCol[0].setAttribute('stroke-width', '0.2%');
          this.MapProps.displayPath[className] = '';
          xmin.push(polygon.x);
          ymin.push(polygon.y);
          xmax.push(polygon.x + polygon.width);
          ymax.push(polygon.y + polygon.height);
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
        this.MapProps.viewBox = `${xminValue} ${yminValue} ${size} ${size}`;
      }

      this.InfoProps.level = `dans la région ${this.getReg(this.region).region}`;
      if (this.zoomDep) {
        this.InfoProps.localisation = this.getDep(this.zoomDep).department;
      } else {
        this.InfoProps.localisation = this.getReg(this.region).region;
      }
      this.InfoProps.value = this.value;
      this.InfoProps.valueReg = typeof this.dataParse[this.zoomDep] === 'number' ? this.dataParse[this.zoomDep].toString() : this.dataParse[this.zoomDep];

      this.displayFrance = 'none';
      this.displayGuadeloupe = 'none';
      this.displayMartinique = 'none';
      this.displayMayotte = 'none';
      this.displayReunion = 'none';
      this.displayGuyane = 'none';
      // Setting visibility for DROM regions
      if (this.region === '971') {
        this.displayGuadeloupe = '';
      } else if (this.region === '972') {
        this.displayMartinique = '';
      } else if (this.region === '973') {
        this.displayGuyane = '';
      } else if (this.region === '974') {
        this.displayReunion = '';
      } else if (this.region === '976') {
        this.displayMayotte = '';
      } else {
        this.displayFrance = '';
      }

      this.InfoProps.min = this.scaleMin;
      this.InfoProps.max = this.scaleMax;
    },
    displayTooltip(e) {
      if (isMobile()) {
        return;
      }
      const parentWidget = this.$refs[this.widgetId];
      const hoverElement = e.target.className.baseVal;
      const hoverValues = hoverElement.replace('FR-', '').split(' ');

      const elCol = parentWidget.getElementsByClassName(hoverElement);
      elCol[0].style.opacity = 0.8;
      this.tooltip.value = undefined;
      for (const hoverValue of hoverValues) {
        if (this.dataParse[hoverValue] !== undefined) {
          this.tooltip.value = this.dataParse[hoverValue];
        }
        if (this.getDep(hoverValue)) {
          this.tooltip.place = this.getDep(hoverValue).department;
        }
      }

      const franceRect = parentWidget.querySelector('.map_container').getBoundingClientRect();
      const tooltipRect = parentWidget.querySelector('.map_tooltip').getBoundingClientRect();
      const containerRect = e.target.getBoundingClientRect();

      const adjust = window.innerWidth > 1000 ? window.innerWidth / 30 : window.innerWidth / 15;

      let tooltipX = containerRect.x - franceRect.x + tooltipRect.width - adjust;
      const tooltipY = containerRect.y - franceRect.y;

      if (tooltipX + tooltipRect.width + adjust > franceRect.x) {
        tooltipX = containerRect.x / 2 - franceRect.x + tooltipRect.width + adjust / 2;
      }

      this.tooltip.top = `${tooltipY}px`;
      this.tooltip.left = `${tooltipX}px`;
      this.tooltip.visibility = 'visible';
    },
    hideTooltip(e) {
      if (isMobile()) {
        return;
      }
      this.tooltip.visibility = 'hidden';
      const parentWidget = this.$refs[this.widgetId];
      const hoverElement = e.target.className.baseVal;

      const elCol = parentWidget.getElementsByClassName(hoverElement);
      elCol[0].style.opacity = 1;
    },
    changeGeoLevel(e) {
      this.zoomDep = e.target.className.baseVal.replace('FR-', '').split(' ')[0];
      this.createChart();
    },
    resetGeoFilters() {
      this.zoomDep = '';
      this.createChart();
    },
    choosePalette() {
      return choosePalette(this.selectedPalette);
    },
    changeColors(theme) {
      if (theme === 'light') {
        this.dromColor = '#6b6b6b';
        this.MapProps.colorStroke = '#FFFFFF';
      } else {
        this.dromColor = '#cecece';
        this.MapProps.colorStroke = '#161616';
      }
      this.createChart();
    },
  },
};
</script>

<style scoped lang="scss">
@use '@/styles/MapChart.scss';
</style>
