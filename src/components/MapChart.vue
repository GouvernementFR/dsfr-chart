<template>
  <Teleport
    :disabled="!$el?.ownerDocument.getElementById(databoxId) || (!databoxId && !databoxType && databoxSource === 'default')"
    :to="'#' + databoxId + '-' + databoxType + '-' + databoxSource"
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
                  {{ tooltip.value }}
                </div>
              </div>
            </div>
          </div>
          <div
            v-if="isDep"
            class="france_container no_select"
            :style="{ display: displayFrance }"
          >
            <france
              :config="FranceProps"
              :onclick="changeGeoLevel"
              :ondblclick="resetGeoFilters"
              :onenter="displayTooltip"
              :onleave="hideTooltip"
            />
          </div>
          <div
            v-if="isReg"
            class="france_container no_select"
            :style="{ display: displayFrance }"
          >
            <france-reg
              :config="FranceProps"
              :onclick="changeGeoLevel"
              :ondblclick="resetGeoFilters"
              :onenter="displayTooltip"
              :onleave="hideTooltip"
            />
          </div>
          <!-- <div
            v-if="isAcad"
            class="france_container no_select"
            :style="{ display: displayFrance }"
          >
            <france-acad
              :config="FranceProps"
              :onclick="changeGeoLevel"
              :ondblclick="resetGeoFilters"
              :onenter="displayTooltip"
              :onleave="hideTooltip"
            />
          </div> -->
          <div class="om_container fr-grid-row no_select">
            <div
              class="om fr-col-sm"
              :style="{ display: displayGuadeloupe }"
            >
              <span
                class="om_title fr-text--xs fr-my-1w"
                :style="{ color: dromColor }"
              >
                Guadeloupe
              </span>
              <guadeloupe
                height="50"
                :config="DromProps"
                :onclick="changeGeoLevel"
                :ondblclick="resetGeoFilters"
                :onenter="displayTooltip"
                :onleave="hideTooltip"
              />
            </div>
            <div
              class="om fr-col-sm"
              :style="{ display: displayMartinique }"
            >
              <span
                class="fr-text--xs fr-my-1w"
                :style="{ color: dromColor }"
              >
                Martinique
              </span>
              <martinique
                height="50"
                :config="DromProps"
                :onclick="changeGeoLevel"
                :ondblclick="resetGeoFilters"
                :onenter="displayTooltip"
                :onleave="hideTooltip"
              />
            </div>
            <div
              class="om fr-col-sm"
              :style="{ display: displayGuyane }"
            >
              <span
                class="fr-text--xs fr-my-1w"
                :style="{ color: dromColor }"
              >
                Guyane
              </span>
              <guyane
                height="50"
                :config="DromProps"
                :onclick="changeGeoLevel"
                :ondblclick="resetGeoFilters"
                :onenter="displayTooltip"
                :onleave="hideTooltip"
              />
            </div>
            <div
              class="om fr-col-sm"
              :style="{ display: displayReunion }"
            >
              <span
                class="fr-text--xs fr-my-1w"
                :style="{ color: dromColor }"
              >
                La Réunion
              </span>
              <reunion
                height="50"
                :config="DromProps"
                :onclick="changeGeoLevel"
                :ondblclick="resetGeoFilters"
                :onenter="displayTooltip"
                :onleave="hideTooltip"
              />
            </div>
            <div
              class="om fr-col-sm"
              :style="{ display: displayMayotte }"
            >
              <span
                class="fr-text--xs fr-my-1w"
                :style="{ color: dromColor }"
              >
                Mayotte
              </span>
              <mayotte
                height="50"
                :config="DromProps"
                :onclick="changeGeoLevel"
                :ondblclick="resetGeoFilters"
                :onenter="displayTooltip"
                :onleave="hideTooltip"
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
import { mapMixins, isMobile } from '@/utils/global.js';
import { choosePalette } from '@/utils/colors.js';

export default {
  name: 'MapChart',
  components: {
    MapInfo,
    ...maps,
  },
  mixins: [mapMixins],
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
      required: true,
    },
    level: {
      type: String,
      default: 'dep',
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
    return {
      dataParse: {},
      widgetId: '',
      scaleMin: 0,
      scaleMax: 0,
      colorLeft: '',
      colorRight: '',
      isDep: true,
      isReg: false,
      isAcad: false,
      zoomDep: '',
      InfoProps: {
        localisation: '',
        names: [],
        min: 0,
        max: 0,
        colorMin: '',
        colorMax: '',
        value: 0,
        valueNat: 0,
        date: '',
      },
      FranceProps: {
        viewBox: '0 0 1010 1010',
        displayDep: {},
        colorStroke: '#FFFFFF',
      },
      DromProps: {
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
      displayGuyane: '',
      dromColor: '#6b6b6b',
    };
  },
  created() {
    this.widgetId = 'dsfr-widget-' + Math.floor(Math.random() * 1000);
    this.isDep = this.level === 'dep';
    this.isReg = this.level === 'reg';
    this.isAcad = this.level === 'acad';
  },
  mounted() {
    this.createChart();

    const element = document.documentElement;
    element.addEventListener('dsfr.theme', (e) => {
      this.changeTheme(e.detail.theme);
    });
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

      const values = [];
      let listDep = [];

      this.FranceProps.displayDep = {};

      // Remplir la carte avec les départements/régions
      if (this.zoomDep) {
        if (this.isDep) {
          const region = this.getDep(this.zoomDep).region_value;
          listDep = this.getDepsFromReg(region);
        } else if (this.isReg) {
          listDep = this.getAllReg();
        } else if (this.isAcad) {
          listDep = [this.getAcad(this.zoomDep).value];
        }

        for (const key of listDep) {
          values.push(this.dataParse[key]);
        }
      } else {
        for (const key in this.dataParse) {
          values.push(this.dataParse[key]);
        }
      }

      // Calcul des min et max pour l'échelle
      this.scaleMin = Math.min(...values);
      this.scaleMax = Math.max(...values);

      // Define color scale based on regional values
      const colorScale = d3.scaleLinear().domain([this.scaleMin, this.scaleMax]).range([this.colorLeft, this.colorRight]);

      let xmin = [],
        xmax = [],
        ymin = [],
        ymax = [];

      // Iterate over each department in France and set colors
      for (const key in this.dataParse) {
        const className = 'FR-' + key;
        const elCol = parentWidget.getElementsByClassName(className);

        if (!this.zoomDep) {
          elCol.length !== 0 && elCol[0].setAttribute('fill', colorScale(this.dataParse[key]));
          this.FranceProps.displayDep[className] = '';
        } else {
          const polygon = document.querySelector('.' + className).getBBox();
          if (this.zoomDep === key) {
            elCol.length !== 0 && elCol[0].setAttribute('fill', colorScale(this.dataParse[key]));
            this.FranceProps.displayDep[className] = '';
            xmin.push(polygon.x);
            ymin.push(polygon.y);
            xmax.push(polygon.x + polygon.width);
            ymax.push(polygon.y + polygon.height);
          } else if (listDep.includes(key)) {
            elCol.length !== 0 && elCol[0].setAttribute('fill', this.colorLeft + 'B3');
            this.FranceProps.displayDep[className] = '';
            xmin.push(polygon.x);
            ymin.push(polygon.y);
            xmax.push(polygon.x + polygon.width);
            ymax.push(polygon.y + polygon.height);
          } else {
            // Hide other departments outside the selected region
            elCol.length !== 0 && elCol[0].setAttribute('fill', 'rgba(255, 255, 255, 0)');
            this.FranceProps.displayDep[className] = 'none';
          }
        }
      }

      if (this.zoomDep) {
        // Logic for zoom level and dimensions adjustment
        if (this.isDep) {
          this.InfoProps.localisation = this.getDep(this.zoomDep).department;
          const xminValue = Math.min(...xmin);
          const yminValue = Math.min(...ymin);
          const xmaxValue = Math.max(...xmax);
          const ymaxValue = Math.max(...ymax);
          const width = xmaxValue - xminValue;
          const height = ymaxValue - yminValue;
          const size = Math.max(width, height);
          this.FranceProps.viewBox = `${xminValue} ${yminValue} ${size} ${size}`;
        } else if (this.isReg) {
          this.InfoProps.localisation = this.getReg(this.zoomDep).region;
        } else if (this.isAcad) {
          this.InfoProps.localisation = this.getAcad(this.zoomDep).academy;
        }
        this.InfoProps.value = this.value;
        this.InfoProps.valueNat = this.dataParse[this.zoomDep];

        if (this.isDep) {
          this.displayFrance = 'none';
          this.displayGuadeloupe = 'none';
          this.displayMartinique = 'none';
          this.displayMayotte = 'none';
          this.displayReunion = 'none';
          this.displayGuyane = 'none';
          // Setting visibility for DOM regions
          if ((this.zoomDep === '971' && this.level === 'dep') || (this.zoomDep === '01' && this.level === 'reg')) {
            this.displayGuadeloupe = '';
          } else if ((this.zoomDep === '972' && this.level === 'dep') || (this.zoomDep === '02' && this.level === 'reg')) {
            this.displayMartinique = '';
          } else if ((this.zoomDep === '973' && this.level === 'dep') || (this.zoomDep === '03' && this.level === 'reg')) {
            this.displayGuyane = '';
          } else if ((this.zoomDep === '974' && this.level === 'dep') || (this.zoomDep === '04' && this.level === 'reg')) {
            this.displayReunion = '';
          } else if ((this.zoomDep === '976' && this.level === 'dep') || (this.zoomDep === '06' && this.level === 'reg')) {
            this.displayMayotte = '';
          } else {
            this.displayFrance = '';
          }
        }
      } else {
        this.InfoProps.localisation = 'France';
        this.InfoProps.value = this.value;
        this.InfoProps.valueNat = 0;
        this.FranceProps.viewBox = '0 0 1010 1010';
        this.displayFrance = '';
        this.displayGuadeloupe = '';
        this.displayMartinique = '';
        this.displayMayotte = '';
        this.displayReunion = '';
        this.displayGuyane = '';
      }

      this.InfoProps.names = this.name;
      this.InfoProps.min = this.scaleMin;
      this.InfoProps.max = this.scaleMax;
      this.InfoProps.colorMin = this.colorLeft;
      this.InfoProps.colorMax = this.colorRight;
    },
    displayTooltip(e) {
      if (isMobile()) return;
      const parentWidget = this.$refs[this.widgetId];
      const hoverElement = e.target.className.baseVal;
      const hoverValue = hoverElement.replace('FR-', '');

      const elCol = parentWidget.getElementsByClassName(hoverElement);
      elCol[0].style.opacity = 0.8;
      this.tooltip.value = this.dataParse[hoverValue];
      if (this.isDep) {
        this.tooltip.place = this.getDep(hoverValue).department;
      } else if (this.isReg) {
        this.tooltip.place = this.getReg(hoverValue).region;
      } else if (this.isAcad) {
        this.tooltip.place = this.getAcad(hoverValue).academy;
      }

      const franceRect = parentWidget.querySelector('.france_container').getBoundingClientRect();
      const tooltipRect = parentWidget.querySelector('.map_tooltip').getBoundingClientRect();
      const containerRect = e.target.getBoundingClientRect();

      const adjust = window.innerWidth > 1000 ? window.innerWidth / 30 : window.innerWidth / 15;

      let tooltipX = containerRect.x - franceRect.x + tooltipRect.width - adjust;
      let tooltipY = containerRect.y - franceRect.y;

      if (tooltipX + tooltipRect.width + adjust > franceRect.x) {
        tooltipX = containerRect.x / 2 - franceRect.x + tooltipRect.width + adjust / 2;
      }

      this.tooltip.top = tooltipY + 'px';
      this.tooltip.left = tooltipX + 'px';
      this.tooltip.visibility = 'visible';
    },
    hideTooltip(e) {
      if (isMobile()) return;
      this.tooltip.visibility = 'hidden';
      const parentWidget = this.$refs[this.widgetId];
      const hoverElement = e.target.className.baseVal;

      const elCol = parentWidget.getElementsByClassName(hoverElement);
      elCol[0].style.opacity = 1;
    },
    changeGeoLevel(e) {
      // Get clicked department value
      const hoverValue = e.target.className.baseVal.replace('FR-', '');
      this.zoomDep = hoverValue;
      this.createChart();
    },
    resetGeoFilters() {
      this.zoomDep = '';
      this.createChart();
    },
    choosePalette() {
      // Using the refactored choosePalette function from utils
      return choosePalette(this.selectedPalette);
    },
    changeTheme(theme) {
      if (theme === 'light') {
        this.dromColor = '#6b6b6b';
        this.FranceProps.colorStroke = '#FFFFFF';
        this.DromProps.colorStroke = '#FFFFFF';
      } else {
        this.dromColor = '#cecece';
        this.FranceProps.colorStroke = '#161616';
        this.DromProps.colorStroke = '#161616';
      }
      this.createChart();
    },
  },
};
</script>

<style scoped lang="scss">
@import '@/styles/MapChart.scss';
</style>
