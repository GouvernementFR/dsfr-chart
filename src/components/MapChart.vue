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
            v-if="isDep"
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
          <div
            v-if="isReg"
            class="map_container no_select"
            :style="{ display: displayFrance }"
          >
            <france-reg
              :config="MapProps"
              :on-click="changeGeoLevel"
              :on-dbl-click="resetGeoFilters"
              :on-enter="displayTooltip"
              :on-leave="hideTooltip"
            />
          </div>
          <div
            v-if="isAca"
            class="map_container no_select"
            :style="{ display: displayFrance }"
          >
            <france-aca
              :config="MapProps"
              :on-click="changeGeoLevel"
              :on-dbl-click="resetGeoFilters"
              :on-enter="displayTooltip"
              :on-leave="hideTooltip"
            />
          </div>
          <div
            v-if="isWorld"
            class="map_container no_select"
          >
            <world
              :config="MapProps"
              :on-click="changeGeoLevel"
              :on-dbl-click="resetGeoFilters"
              :on-enter="displayTooltip"
              :on-leave="hideTooltip"
            />
          </div>
          <div
            v-if="!isWorld"
            class="map_sub_container fr-grid-row no_select"
          >
            <div
              class="drom fr-col-sm"
              :style="{ display: displayGuadeloupe }"
            >
              <span
                class="fr-text--xs fr-my-1w"
                :style="{ color: dromColor }"
              >
                Guadeloupe
              </span>
              <guadeloupe
                height="50"
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
              <span
                class="fr-text--xs fr-my-1w"
                :style="{ color: dromColor }"
              >
                Martinique
              </span>
              <martinique
                height="50"
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
              <span
                class="fr-text--xs fr-my-1w"
                :style="{ color: dromColor }"
              >
                Guyane
              </span>
              <guyane
                height="50"
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
              <span
                class="fr-text--xs fr-my-1w"
                :style="{ color: dromColor }"
              >
                La Réunion
              </span>
              <reunion
                height="50"
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
              <span
                class="fr-text--xs fr-my-1w"
                :style="{ color: dromColor }"
              >
                Mayotte
              </span>
              <mayotte
                height="50"
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
import chroma from 'chroma-js';
import MapInfo from '@/components/MapInfo.vue';
import maps from '@/components/maps';
import { formatNumber, isMobile, mapMixins } from '@/utils/global.js';
import { choosePalette } from '@/utils/colors.js';

export default {
  name: 'MapChart',
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
    level: {
      type: String,
      default: 'dep',
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
      isDep: true,
      isReg: false,
      isAca: false,
      isWorld: false,
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
        valueNat: null,
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
        value: null,
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
    this.isDep = this.level === 'dep';
    this.isReg = this.level === 'reg';
    this.isAca = this.level === 'aca';
    this.isWorld = this.level === 'monde';
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
      if (this.widgetId !== '') {
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
      let listDep = [];

      this.MapProps.displayPath = {};

      // Préparation des valeurs de la carte avec les départements/régions/académies/pays
      if (this.zoomDep) {
        const zoomDepValues = this.zoomDep.split(' ');

        for (const zoomDep of zoomDepValues) {
          if (this.dataParse[zoomDep] === undefined) {
            continue;
          }

          if (this.isDep) {
            const region = this.getDep(zoomDep).region_value;
            listDep = this.getDepsFromReg(region);
            // listDep = this.getAllDep();
          } else if (this.isReg) {
            // listDep = [this.getReg(zoomDep).value];
            listDep = this.getAllReg();
          } else if (this.isAca) {
            // listDep = [this.getAca(zoomDep).value];
            listDep = this.getAllAca();
          } else if (this.isWorld) {
            const continent = this.getCountry(zoomDep).continent_value;
            listDep = this.getCountriesFromContinent(continent);
            // listDep = this.getAllCountries();
          }
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
      values = values.filter((value) => value !== undefined && value !== null);

      this.scaleMin = values.length > 0 ? Math.min(...values) : 0;
      this.scaleMax = values.length > 0 ? Math.max(...values) : 0;

      // Define color scale based on regional values
      const colorScale = chroma.scale([this.colorLeft, this.colorRight]).domain([this.scaleMin, this.scaleMax]);

      const xmin = [],
        xmax = [],
        ymin = [],
        ymax = [];

      // Iterate over each element in input data and set colors
      for (const key in this.dataParse) {
        const className = this.isAca || this.isWorld ? key : `FR-${key}`;
        const elCol = parentWidget.getElementsByClassName(className);

        if (elCol.length === 0) {
          console.warn(`L'élément de la carte n'existe pas pour la valeur ${className}, veuillez le supprimer de vos données.`);
          continue;
        }

        if (!this.zoomDep) {
          // Reset the fill and stroke for all paths
          elCol[0].setAttribute('fill', colorScale(this.dataParse[key]));
          elCol[0].setAttribute('stroke', this.MapProps.colorStroke);
          elCol[0].setAttribute('stroke-width', '0.2%');
          this.MapProps.displayPath[className] = '';
        } else {
          const polygon = elCol[0].getBBox();

          const zoomDepValues = this.zoomDep.split(' ');

          for (const zoomDep of zoomDepValues) {
            if (this.dataParse[zoomDep] === undefined) {
              continue;
            }

            if (zoomDep === key) {
              // Highlight the selected path with a stroke
              elCol[0].setAttribute('fill', colorScale(this.dataParse[zoomDep]));
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
              // Fill with the lighter color for other paths
              elCol[0].setAttribute('fill', colorScale(this.dataParse[key]).alpha(0.6));
              elCol[0].setAttribute('stroke', this.MapProps.colorStroke);
              elCol[0].setAttribute('stroke-width', '0.2%');
              this.MapProps.displayPath[className] = '';
              xmin.push(polygon.x);
              ymin.push(polygon.y);
              xmax.push(polygon.x + polygon.width);
              ymax.push(polygon.y + polygon.height);
            } else {
              // Hide other paths outside the selected area
              elCol[0].setAttribute('fill', 'rgba(255, 255, 255, 0)');
              this.MapProps.displayPath[className] = 'none';
            }
          }
        }
      }

      if (this.zoomDep) {
        const zoomDepValues = this.zoomDep.split(' ');

        for (const zoomDep of zoomDepValues) {
          if (this.dataParse[zoomDep] === undefined) {
            continue;
          }

          // Logic for zoom level and dimensions adjustment
          const xminValue = Math.min(...xmin);
          const yminValue = Math.min(...ymin);
          const xmaxValue = Math.max(...xmax);
          const ymaxValue = Math.max(...ymax);
          const width = xmaxValue - xminValue;
          const height = ymaxValue - yminValue;
          const size = Math.max(width, height);
          this.MapProps.viewBox = `${xminValue} ${yminValue} ${size} ${size}`;

          this.InfoProps.level = 'en France';
          if (this.isDep) {
            this.InfoProps.localisation = this.getDep(zoomDep).department;
          } else if (this.isReg) {
            this.InfoProps.localisation = this.getReg(zoomDep).region;
          } else if (this.isAca) {
            this.InfoProps.localisation = this.getAca(zoomDep).academy;
          } else if (this.isWorld) {
            this.InfoProps.level = 'dans le monde';
            this.InfoProps.localisation = this.getCountry(zoomDep).country;
          }
          this.InfoProps.value = this.value;
          this.InfoProps.valueNat = this.dataParse[zoomDep];

          if (this.isDep) {
            this.displayFrance = 'none';
            this.displayGuadeloupe = 'none';
            this.displayMartinique = 'none';
            this.displayMayotte = 'none';
            this.displayReunion = 'none';
            this.displayGuyane = 'none';
            // Setting visibility for DROM regions
            if (zoomDep === '971') {
              this.displayGuadeloupe = '';
            } else if (zoomDep === '972') {
              this.displayMartinique = '';
            } else if (zoomDep === '973') {
              this.displayGuyane = '';
            } else if (zoomDep === '974') {
              this.displayReunion = '';
            } else if (zoomDep === '976') {
              this.displayMayotte = '';
            } else {
              this.displayFrance = '';
            }
          }
        }
      } else {
        if (this.isWorld) {
          this.InfoProps.localisation = 'Monde';
          this.InfoProps.level = 'dans le monde';
          this.MapProps.viewBox = '0 0 1010 710';
        } else {
          this.InfoProps.localisation = 'France';
          this.InfoProps.level = 'en France';
          this.MapProps.viewBox = '0 0 1010 1010';
        }
        this.InfoProps.value = this.value;
        this.InfoProps.valueNat = null;
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
      if (isMobile()) {
        return;
      }
      const parentWidget = this.$refs[this.widgetId];
      const hoverElement = e.target.className.baseVal;
      const hoverValues = hoverElement.replace('FR-', '').split(' ');

      const elCol = parentWidget.getElementsByClassName(hoverElement);
      elCol[0].style.opacity = 0.8;
      this.tooltip.value = null;
      for (const hoverValue of hoverValues) {
        if (this.dataParse[hoverValue] !== undefined) {
          this.tooltip.value = this.dataParse[hoverValue];
        }
        if (this.isDep && this.getDep(hoverValue)) {
          this.tooltip.place = this.getDep(hoverValue).department;
        } else if (this.isReg && this.getReg(hoverValue)) {
          this.tooltip.place = this.getReg(hoverValue).region;
        } else if (this.isAca && this.getAca(hoverValue)) {
          this.tooltip.place = this.getAca(hoverValue).academy;
        } else if (this.isWorld && this.getCountry(hoverValue)) {
          this.tooltip.place = this.getCountry(hoverValue).country;
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
      this.zoomDep = e.target.className.baseVal.replace('FR-', '');
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
