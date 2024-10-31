/* eslint-disable */
<template>
  <div class="widget_container fr-grid-row" :id="widgetId">
    <LeftCol :props="leftColProps"></LeftCol>
    <div class="r_col fr-col-12 fr-col-lg-9">
      <button
        class="fr-btn fr-btn--sm fr-icon-arrow-go-back-fill fr-btn--icon-left fr-btn--tertiary-no-outline fr-ml-4w"
        @click="resetGeoFilters" v-if="zoomDep !== undefined">
        Retour
      </button>
      <div class="map m-lg">
        <div ref="mapTooltip" class="map_tooltip"
          :style="{ top: tooltip.top, left: tooltip.left, visibility: tooltip.visibility }">
          <div class="tooltip_header">{{ tooltip.place }}</div>
          <div class="tooltip_body">
            <div class="tooltip_value-content">
              <div class="tooltip_value">{{ convertStringToLocaleNumber(tooltip.value) }}</div>
            </div>
          </div>
        </div>
        <div class="france_container no_select" :style="{ display: displayFrance }">
          <france :props="FranceProps" :onclick="changeGeoLevel" :ondblclick="resetGeoFilters" :onenter="displayTooltip"
            :onleave="hideTooltip"></france>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import chroma from 'chroma-js'
import LeftCol from '@/components/LeftCol'
import maps from '@/components/maps'
import * as d3 from 'd3-scale'
import { isMobile } from 'mobile-device-detect'
import { mixin, getColorsByIndex, categoricalPalette, sequentialAscending, sequentialDescending, divergentAscending, divergentDescending, neutralColor, defaultColor } from '@/utils.js'

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
        valueReg: 0,
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
    color: {
      type: String,
      default: 'green-bourgeon'
    },
    // Nouveau paramètre pour choisir entre les anciennes ou nouvelles couleurs
    useNewColors: {
      type: Boolean,
      default: true
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
      if (!this.level) {
        console.warn("Level is undefined, setting default level to 'dep'");
        this.level = 'dep'; // Valeur par défaut
      }
      const palette = this.choosePalette();

      this.colLeft = palette[0];
      this.colRight = palette[palette.length - 1];

      this.leftColProps.colMin = this.colLeft;
      this.leftColProps.colMax = this.colRight;

      this.leftColProps.date = this.date;
      this.leftColProps.names = this.name;
      this.leftColProps.min = this.scaleMin;
      this.leftColProps.max = this.scaleMax;

      const parentWidget = document.getElementById(this.widgetId);
      const self = this;

      this.dataParse = JSON.parse(this.data);
      const values = [];

      let listDep = [];
      self.FranceProps.displayDep = {};

      if (this.zoomDep !== undefined) {
        if (this.level === 'dep') {
          const a = this.getDep(this.zoomDep).region_value;
          listDep = this.getDepsFromReg(a);
        } else if (this.level === 'reg') {
          listDep = this.getAllReg();
        } else {
          listDep = [this.getAcad(this.zoomDep).value];
        }
        listDep.forEach(function (key) {
          values.push(self.dataParse[key]);
        });
      } else {
        for (const key in self.dataParse) {
          values.push(self.dataParse[key]);
        }
      }

      this.scaleMin = Math.min.apply(null, values);
      this.scaleMax = Math.max.apply(null, values);

      const colorScale = d3.scaleLinear().domain([this.scaleMin, this.scaleMax]).range([this.colLeft, this.colRight]);

      let xmin = [], xmax = [], ymin = [], ymax = [];

      for (const key in self.dataParse) {
        const className = this.getClassMap ? this.getClassMap(key, this.level) : null;

        // Si `className` est `null`, on continue la boucle
        if (!className) {
          console.warn(`Class map not found for key: ${key}, level: ${this.level}`);
          continue;
        }

        const elCol = parentWidget.getElementsByClassName(className);
        if (elCol.length !== 0) {
          const polygon = elCol[0].getBBox(); // Assurez-vous que getBBox est utilisé correctement

          // Si polygon n'existe pas, continuez la boucle
          if (!polygon) {
            console.warn(`Polygon not found for key: ${key}`);
            continue;
          }

          xmin.push(polygon.x);
          ymin.push(polygon.y);
          xmax.push(polygon.x + polygon.width);
          ymax.push(polygon.y + polygon.height);
        }

        if (xmin.length > 0 && ymin.length > 0 && xmax.length > 0 && ymax.length > 0) {
          const xminValue = Math.min(...xmin);
          const yminValue = Math.min(...ymin);
          const xmaxValue = Math.max(...xmax);
          const ymaxValue = Math.max(...ymax);

          const width = xmaxValue - xminValue;
          const height = ymaxValue - yminValue;
          const size = Math.max(width, height);

          // Si la taille est valide, mettez à jour la vue
          if (isFinite(xminValue) && isFinite(yminValue) && isFinite(size)) {
            this.FranceProps.viewBox = `${xminValue} ${yminValue} ${size} ${size}`;
          } else {
            console.warn("Invalid values for viewBox, falling back to default viewBox.");
            this.FranceProps.viewBox = "0 0 262 262"; // Vue par défaut en cas de problème
          }
        } else {
          console.warn("Empty xmin, ymin, xmax, or ymax arrays, falling back to default viewBox.");
          this.FranceProps.viewBox = "0 0 262 262"; // Vue par défaut si aucune valeur valide n'est trouvée
        }

        if (self.zoomDep === undefined) {
          const color = getColorsByIndex(key, palette);
          elCol.length !== 0 && elCol[0].setAttribute('fill', color);
          self.FranceProps.displayDep[className] = '';
        } else {
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
      xmin = Math.min.apply(null, xmin);
      ymin = Math.min.apply(null, ymin);
      xmax = Math.max.apply(null, xmax);
      ymax = Math.max.apply(null, ymax);
      const width = xmax - xmin;
      const height = ymax - ymin;
      const size = Math.max(width, height);
      this.FranceProps.viewBox = xmin + ' ' + ymin + ' ' + size + ' ' + size;

      this.leftColProps.levelNat = (this.valuereg !== undefined && this.zoomDep !== undefined);
      this.leftColProps.valuereg = this.valuereg;
      if (this.zoomDep === undefined) {
        this.leftColProps.localisation = 'France';
        this.leftColProps.value = this.valuereg;
      } else {
        this.leftColProps.localisation = this.getDep(this.zoomDep).label;
        this.leftColProps.value = this.dataParse[this.zoomDep];
      }

      this.leftColProps.names = this.name;
      this.leftColProps.min = this.scaleMin;
      this.leftColProps.max = this.scaleMax;
      this.leftColProps.colMin = this.colLeft;
      this.leftColProps.colMax = this.colRight;
    },
    choosePalette() {
      // Priorité à la sélection manuelle de la palette
      switch (this.selectedPalette) {
        case 'categorical':
          return categoricalPalette;
        case 'sequentialAscending':
          return sequentialAscending;
        case 'sequentialDescending':
          return sequentialDescending;
        case 'divergentAscending':
          return divergentAscending;
        case 'divergentDescending':
          return divergentDescending;
        case 'neutral':
          return [neutralColor]; // La couleur neutre comme palette unique
        case 'defaultColor':
          return [defaultColor]; // Couleur unicolore par défaut
        default:
          break;
      }

      // Détection automatique si `selectedPalette` n'est pas spécifié
      if (this.yparse.some(arr => arr.some(value => value < 0))) {
        return divergentAscending; // Si des valeurs sont négatives, utiliser la palette divergente par défaut
      }

      if (this.yparse.length === 1) {
        return sequentialAscending; // Si une seule série de données, utiliser une palette séquentielle par défaut
      }

      // Par défaut, on retourne la palette catégorielle
      return categoricalPalette;
    },
    displayTooltip(e) {
      if (isMobile) return
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
      if (isMobile) return
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
@import './Style/MapChartReg.scss';
</style>
