<template>
  <div
    :ref="widgetId"
    class="widget_container fr-grid-row"
  >
    <LeftCol :props="leftColProps" />
    <div class="r_col fr-col-12 fr-col-lg-9">
      <button
        v-if="zoomDep !== undefined"
        class="fr-btn fr-btn--sm fr-icon-arrow-go-back-fill fr-btn--icon-left fr-btn--tertiary-no-outline fr-ml-4w"
        @click="resetGeoFilters"
      >
        Retour
      </button>
      <div class="map m-lg">
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
          v-if="isDep"
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
        <div
          v-if="isReg"
          class="france_container no_select"
          :style="{ display: displayFrance }"
        >
          <france-reg
            :props="FranceProps"
            :onclick="changeGeoLevel"
            :ondblclick="resetGeoFilters"
            :onenter="displayTooltip"
            :onleave="hideTooltip"
          />
        </div>
        <div
          v-if="isAcad"
          class="france_container no_select"
          :style="{ display: displayFrance }"
        >
          <france-acad
            :props="FranceProps"
            :onclick="changeGeoLevel"
            :ondblclick="resetGeoFilters"
            :onenter="displayTooltip"
            :onleave="hideTooltip"
          />
        </div>
        <div class="om_container fr-grid-row no_select">
          <div
            class="om fr-col-4 fr-col-sm"
            :style="{ display: displayGuadeloupe }"
          >
            <span
              class="fr-text--xs fr-my-1w"
              :style="{ color: textMention }"
            >Guadeloupe</span>
            <guadeloupe
              :props="colorStrokeDOM"
              :onclick="changeGeoLevel"
              :ondblclick="resetGeoFilters"
              :onenter="displayTooltip"
              :onleave="hideTooltip"
            />
          </div>
          <div
            class="om fr-col-4 fr-col-sm fr-ml-1v"
            :style="{ display: displayMartinique }"
          >
            <span
              class="fr-text--xs fr-my-1w"
              :style="{ color: textMention }"
            >Martinique</span>
            <martinique
              :props="colorStrokeDOM"
              :onclick="changeGeoLevel"
              :ondblclick="resetGeoFilters"
              :onenter="displayTooltip"
              :onleave="hideTooltip"
            />
          </div>
          <div
            class="om fr-col-4 fr-col-sm fr-ml-1v"
            :style="{ display: displayGuyanne }"
          >
            <span
              class="fr-text--xs fr-my-1w"
              :style="{ color: textMention }"
            >Guyane</span>
            <guyane
              :props="colorStrokeDOM"
              :onclick="changeGeoLevel"
              :ondblclick="resetGeoFilters"
              :onenter="displayTooltip"
              :onleave="hideTooltip"
            />
          </div>
          <div
            class="om fr-col-4 fr-col-sm fr-ml-1v"
            :style="{ display: displayReunion }"
          >
            <span
              class="fr-text--xs fr-my-1w"
              :style="{ color: textMention }"
            >La Réunion</span>
            <reunion
              :props="colorStrokeDOM"
              :onclick="changeGeoLevel"
              :ondblclick="resetGeoFilters"
              :onenter="displayTooltip"
              :onleave="hideTooltip"
            />
          </div>
          <div
            class="om fr-col-4 fr-col-sm fr-ml-1v"
            :style="{ display: displayMayotte }"
          >
            <span
              class="fr-text--xs fr-my-1w"
              :style="{ color: textMention }"
            >Mayotte</span>
            <mayotte
              :props="colorStrokeDOM"
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
</template>

<script>
import chroma from 'chroma-js';
import LeftCol from '@/components/LeftCol.vue';
import maps from '@/components/maps';
import { mixin, isMobile } from '@/utils/global.js';
import { choosePalette, getColorsByIndex } from '@/utils/colors.js';

export default {
  name: 'MapChart',
  components: {
    LeftCol,
    ...maps,
  },
  mixins: [mixin],
  props: {
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
    this.chart = undefined;

    return {
      dataParse: {},
      widgetId: '',
      chartId: '',
      scaleMin: 0,
      scaleMax: 0,
      colLeft: '',
      colRight: '',
      isDep: true,
      isReg: false,
      isAcad: false,
      zoomDep: undefined,
      prefixClass: 'FR-',
      leftColProps: {
        localisation: '',
        names: [],
        min: 0,
        max: 0,
        colMin: '',
        colMax: '',
        value: 0,
        valueNat: 0,
        date: '',
        textMention: '',
        borderDefault: '',
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
      textMention: '',
    };
  },
  created() {
    this.chartId = 'myChart' + Math.floor(Math.random() * 1000);
    this.widgetId = 'widget' + Math.floor(Math.random() * 1000);
    this.isDep = this.level === 'dep';
    this.isReg = this.level === 'reg';
    this.isAcad = this.level === 'acad';
    this.prefixClass = 'FR-' + this.level + '-';
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

      const palette = this.choosePalette();

      // Choisir les couleurs extrêmes basées sur la palette
      this.colLeft = palette[0];
      this.colRight = palette[palette.length - 1];
      this.leftColProps.colMin = this.colLeft;
      this.leftColProps.colMax = this.colRight;
      this.leftColProps.date = this.date;
      this.leftColProps.names = this.name;

      const values = [];
      let listDep = [];

      self.FranceProps.displayDep = {};

      // Remplir la carte avec les départements/régions
      if (this.zoomDep !== undefined) {
        if (this.level === 'dep') {
          const a = this.getDep(this.zoomDep).region_value;
          listDep = this.getDepsFromReg(a);
        } else if (this.level === 'reg') {
          listDep = this.getAllReg();
        } else {
          listDep = [this.getAcad(this.zoomDep).value];
        }

        for (const key of listDep) {
          values.push(self.dataParse[key]);
        }
      } else {
        for (const key in self.dataParse) {
          values.push(self.dataParse[key]);
        }
      }

      // Calcul des min et max pour l'échelle
      this.scaleMin = Math.min(...values);
      this.scaleMax = Math.max(...values);

      let xmin = [],
        xmax = [],
        ymin = [],
        ymax = [];

      for (const key in self.dataParse) {
        const className = this.getClassMap(key, this.level);
        const elCol = parentWidget.getElementsByClassName(className);

        if (self.zoomDep === undefined) {
          // Appliquer les couleurs à chaque département/région
          const color = getColorsByIndex(key, palette);
          elCol.length !== 0 && elCol[0].setAttribute('fill', color);
          self.FranceProps.displayDep[className] = '';
        } else {
          // Logique pour zoomer sur des départements spécifiques
          const polygon = document.querySelector('.' + className).getBBox();
          if (self.zoomDep === key) {
            const color = getColorsByIndex(key, palette);
            elCol.length !== 0 && elCol[0].setAttribute('fill', color);
            self.FranceProps.displayDep[className] = '';
            xmin.push(polygon.x);
            ymin.push(polygon.y);
            xmax.push(polygon.x + polygon.width);
            ymax.push(polygon.y + polygon.height);
          } else if (listDep.includes(key)) {
            elCol.length !== 0 && elCol[0].setAttribute('fill', chroma(self.colLeft).alpha(0.72).hex());
            self.FranceProps.displayDep[className] = '';
            xmin.push(polygon.x);
            ymin.push(polygon.y);
            xmax.push(polygon.x + polygon.width);
            ymax.push(polygon.y + polygon.height);
          } else {
            elCol.length !== 0 && elCol[0].setAttribute('fill', 'rgba(255, 255, 255, 0)');
            self.FranceProps.displayDep[className] = 'none';
          }
        }
      }

      // Zoom logic remains the same, unchanged
      if (this.zoomDep !== undefined) {
        // Logic for zoom level and dimensions adjustment
        if (this.level === 'dep') {
          this.leftColProps.localisation = this.getDep(this.zoomDep).label;
          xmin = Math.min.apply(null, xmin);
          ymin = Math.min.apply(null, ymin);
          xmax = Math.max.apply(null, xmax);
          ymax = Math.max.apply(null, ymax);
          const width = xmax - xmin;
          const height = ymax - ymin;
          const size = Math.max(width, height);
          this.FranceProps.viewBox = xmin + ' ' + ymin + ' ' + size + ' ' + size;
        } else if (this.level === 'reg') {
          this.leftColProps.localisation = this.getReg(this.zoomDep).label;
        } else {
          this.leftColProps.localisation = this.getAcad(this.zoomDep).label;
        }
        this.leftColProps.value = this.value;
        this.leftColProps.valueNat = this.dataParse[this.zoomDep];

        if (this.level === 'dep') {
          this.displayFrance = 'none';
          this.displayGuadeloupe = 'none';
          this.displayMartinique = 'none';
          this.displayMayotte = 'none';
          this.displayReunion = 'none';
          this.displayGuyanne = 'none';
          // Setting visibility for DOM regions
          if ((self.zoomDep === '971' && self.level === 'dep') || (self.zoomDep === '01' && self.level === 'reg')) {
            this.displayGuadeloupe = '';
          } else if ((self.zoomDep === '972' && self.level === 'dep') || (self.zoomDep === '02' && self.level === 'reg')) {
            this.displayMartinique = '';
          } else if ((self.zoomDep === '973' && self.level === 'dep') || (self.zoomDep === '03' && self.level === 'reg')) {
            this.displayGuyanne = '';
          } else if ((self.zoomDep === '974' && self.level === 'dep') || (self.zoomDep === '04' && self.level === 'reg')) {
            this.displayReunion = '';
          } else if ((self.zoomDep === '976' && self.level === 'dep') || (self.zoomDep === '06' && self.level === 'reg')) {
            this.displayMayotte = '';
          } else {
            this.displayFrance = '';
          }
        }
      } else {
        this.leftColProps.localisation = 'France';
        this.leftColProps.value = this.value;
        this.leftColProps.valueNat = 0;
        if (this.level === 'dep') {
          this.FranceProps.viewBox = '0 0 262 262';
        } else if (this.level === 'reg') {
          this.FranceProps.viewBox = '0 0 800 800';
        } else {
          this.FranceProps.viewBox = '0 0 700 700';
        }
        this.displayFrance = '';
        this.displayGuadeloupe = '';
        this.displayMartinique = '';
        this.displayMayotte = '';
        this.displayReunion = '';
        this.displayGuyanne = '';
      }

      // Remplir les colonnes de gauche
      this.leftColProps.names = this.name;
      this.leftColProps.min = this.scaleMin;
      this.leftColProps.max = this.scaleMax;
      this.leftColProps.colMin = this.colLeft;
      this.leftColProps.colMax = this.colRight;
    },
    displayTooltip(e) {
      if (isMobile()) return;
      const parentWidget = this.$refs[this.widgetId];
      let hoverdep = e.target.className.baseVal.replace(/FR|-|dep|reg|acad/g, '');

      let className;
      if (hoverdep.includes('DOM')) {
        hoverdep = hoverdep.replace(/DOM/g, '');
        className = 'FR-DOM-' + hoverdep;
        if (this.level === 'reg') {
          hoverdep = this.getDep(hoverdep).region_value;
        }
      } else {
        className = this.getClassMap(hoverdep, this.level);
      }

      const elCol = parentWidget.getElementsByClassName(className);
      elCol[0].style.opacity = '0.72';
      this.tooltip.value = this.dataParse[hoverdep];
      if (this.level === 'dep') {
        this.tooltip.place = this.getDep(hoverdep).label;
      } else if (this.level === 'reg') {
        this.tooltip.place = this.getReg(hoverdep).label;
      } else {
        this.tooltip.place = this.getAcad(hoverdep).label;
      }

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
      let hoverdep = e.target.className.baseVal.replace(/FR|-|dep|reg|acad/g, '');
      let className;
      if (hoverdep.includes('DOM')) {
        hoverdep = hoverdep.replace(/DOM/g, '');
        className = 'FR-DOM-' + hoverdep;
        if (this.level === 'reg') {
          hoverdep = this.getDep(hoverdep).region_value;
        }
      } else {
        className = this.getClassMap(hoverdep, this.level);
      }

      const elCol = parentWidget.getElementsByClassName(className);
      elCol[0].style.opacity = '1';
    },
    changeGeoLevel(e) {
      // Get clicked department
      let clickdep = e.target.className.baseVal.replace(/FR|-|dep|reg|acad/g, '');

      if (clickdep.includes('DOM')) {
        clickdep = clickdep.replace(/DOM/g, '');
        if (this.level === 'reg') {
          clickdep = this.getDep(clickdep).region_value;
        }
      }
      this.zoomDep = clickdep;
      this.createChart();
    },
    resetGeoFilters() {
      this.zoomDep = undefined;
      this.createChart();
    },
    choosePalette() {
      // Using the refactored choosePalette function from utils
      return choosePalette(this.selectedPalette);
    },
    changeTheme(theme) {
      this.textMention = this.getHexaFromToken('text-mention-grey', theme);
      this.leftColProps.textMention = this.textMention;
      this.leftColProps.borderDefault = this.getHexaFromToken('border-default-grey', theme);
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
