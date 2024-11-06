/* eslint-disable */
<template>
  <div class="widget_container fr-grid-row" :id="widgetId">
    <div class="r_col fr-col-12">
      <div class="chart">
        <!-- Tooltip personnalisé -->
        <div class="linechart_tooltip" style="opacity: 0; position: absolute;">
          <div class="tooltip_header"></div>
          <div class="tooltip_body">
            <div class="tooltip_value"></div>
          </div>
        </div>
        <!-- Canvas pour le graphique -->
        <canvas :id="chartId"></canvas>
        <!-- Légende -->
        <div class="chart_legend fr-mb-0 fr-mt-4v">
          <div v-for="(item, index) in nameParse" :key="item" class="flex fr-mt-3v fr-mb-1v">
            <span class="legende_dot" :style="{ 'background-color': colorParse[index][0] }"></span>
            <p class="fr-text--sm fr-text--bold fr-ml-1w fr-mb-0">
              {{ capitalize(nameParse[index]) }}
            </p>
          </div>
        </div>
        <!-- Date de mise à jour -->
        <div v-if="date !== undefined" class="flex fr-mt-1w">
          <p class="fr-text--xs">Mise à jour : {{ date }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import { Chart } from 'chart.js';
import chroma from 'chroma-js';
import {
  mixin,
  getColorsByIndex,
  categoricalPalette,
  sequentialAscending,
  sequentialDescending,
  divergentAscending,
  divergentDescending,
  getNeutralColor,
  getDefaultColor,
} from '@/utils.js';
import annotationPlugin from 'chartjs-plugin-annotation';

Chart.pluginService.register(annotationPlugin);

export default {
  name: 'BarChart',
  mixins: [mixin],
  data() {
    return {
      widgetId: '',
      chartId: '',
      chart: undefined,
      legendLeftMargin: 100,
      datasets: [],
      labels: [],
      xparse: [],
      yparse: [],
      nameParse: [],
      tmpColorParse: [],
      colorParse: [],
      colorHover: [],
      typeGraph: '',
      isSmall: false,
    };
  },
  props: {
    x: {
      type: String,
      required: true,
    },
    y: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      default: undefined,
    },
    color: {
      type: String,
      default: undefined,
    },
    stacked: {
      type: Boolean,
      default: false,
    },
    horizontal: {
      type: Boolean,
      default: false,
    },
    barsize: {
      type: Number,
      default: undefined,
    },
    date: {
      type: String,
      default: undefined,
    },
    aspectratio: {
      type: Number,
      default: 1,
    },
    formatdate: {
      type: Boolean,
      default: false,
    },
    selectedPalette: {
      type: String,
      default: '',
    },
    highlightIndex: {
      type: Number,
      default: -1,
    },
  },
  methods: {
    resetData() {
      if (this.chart) {
        this.chart.destroy();
      }
      this.datasets = [];
      this.labels = [];
      this.xparse = [];
      this.yparse = [];
      this.nameParse = [];
      this.tmpColorParse = [];
      this.colorParse = [];
      this.colorHover = [];
    },

    getData() {
      this.typeGraph = this.horizontal ? 'horizontalBar' : 'bar';

      // Parsing des données
      try {
        this.xparse = JSON.parse(this.x);
        this.yparse = JSON.parse(this.y);
      } catch (error) {
        console.error('Erreur lors du parsing des données x ou y:', error);
        return;
      }

      // Parsing des noms de séries
      let tmpNameParse = [];
      if (this.name !== undefined) {
        try {
          tmpNameParse = JSON.parse(this.name);
        } catch (error) {
          console.error('Erreur lors du parsing de name:', error);
        }
      }

      // Assignation des noms de séries
      for (let i = 0; i < this.yparse.length; i++) {
        this.nameParse.push(tmpNameParse[i] !== undefined ? tmpNameParse[i] : 'Série ' + (i + 1));
      }

      // Assignation des labels
      this.labels = this.xparse[0];

      // Chargement des couleurs
      this.loadColors();

      // Préparation des datasets
      this.datasets = this.yparse.map((dataSet, index) => ({
        label: this.nameParse[index],
        data: dataSet,
        backgroundColor: this.colorParse[index],
        borderColor: this.colorParse[index],
        hoverBackgroundColor: this.colorHover[index],
        hoverBorderColor: this.colorHover[index],
        barThickness: this.barsize || (this.stacked ? 32 : this.horizontal ? 30 : 32),
      }));
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
          return [getNeutralColor()];
        case 'defaultColor':
          return [getDefaultColor()];
        default:
          break;
      }

      // Par défaut, on retourne la palette catégorielle
      return categoricalPalette;
    },

    loadColors() {
      this.colorParse = [];
      this.colorHover = [];

      // Obtenir la palette sélectionnée
      const palette = this.choosePalette();

      // Générer les couleurs pour chaque dataset
      for (let i = 0; i < this.yparse.length; i++) {
        const dataSet = this.yparse[i];
        let colors = [];
        let hoverColors = [];

        if (this.tmpColorParse[i] !== undefined) {
          // Si une couleur personnalisée est spécifiée pour la série
          const color = this.tmpColorParse[i];
          colors = Array(dataSet.length).fill(color);
          hoverColors = colors.map(c => chroma(c).darken(0.8).hex());
        } else if (i === this.highlightIndex) {
          // Si c'est la série à mettre en avant
          const color = getDefaultColor(); // Couleur mise en avant
          colors = Array(dataSet.length).fill(color);
          hoverColors = colors.map(c => chroma(c).darken(0.8).hex());
        } else if (this.highlightIndex !== -1) {
          // Si une série est mise en avant, les autres séries sont en couleur neutre
          const color = getNeutralColor(); // Couleur neutre
          colors = Array(dataSet.length).fill(color);
          hoverColors = colors.map(c => chroma(c).darken(0.8).hex());
        } else {
          if (this.selectedPalette === 'divergentAscending' || this.selectedPalette === 'divergentDescending') {
            // Utilisation de la palette divergente sans dégradé, couleurs fixes
            colors = Array(dataSet.length).fill(palette[i % palette.length]);
            hoverColors = colors.map(c => chroma(c).darken(0.8).hex());
          } else if (this.selectedPalette === 'categorical' || !this.selectedPalette) {
            // Palette catégorielle : une couleur par série
            const color = getColorsByIndex(i, palette);
            colors = Array(dataSet.length).fill(color);
            hoverColors = colors.map(c => chroma(c).darken(0.8).hex());
          } else if (this.selectedPalette === 'neutral' || this.selectedPalette === 'defaultColor') {
            // Palette neutre ou couleur par défaut : une seule couleur pour tout
            const color = palette[0];
            colors = Array(dataSet.length).fill(color);
            hoverColors = colors.map(c => chroma(c).darken(0.8).hex());
          } else {
            // Palettes séquentielles : couleur par valeur
            const allDataValues = this.yparse.flat();
            const minValue = Math.min(...allDataValues);
            const maxValue = Math.max(...allDataValues);
            const colorScale = chroma.scale(palette).domain([maxValue, minValue]);
            colors = dataSet.map(value => chroma(colorScale(value)).hex());
            hoverColors = colors.map(color => chroma(color).darken(0.8).hex());
          }
        }

        this.colorParse.push(colors);
        this.colorHover.push(hoverColors);
      }
    },

    createChart() {
      Chart.defaults.global.defaultFontFamily = 'Marianne';
      Chart.defaults.global.defaultFontSize = 12;
      Chart.defaults.global.defaultLineHeight = 1.66;

      this.getData();
      const ctx = document.getElementById(this.chartId).getContext('2d');

      this.chart = new Chart(ctx, {
        type: this.typeGraph,
        data: {
          labels: this.labels,
          datasets: this.datasets,
        },
        options: {
          aspectRatio: this.aspectratio,
          animation: {
            easing: 'easeInOutBack',
            duration: 1000,
          },
          scales: {
            xAxes: [
              {
                stacked: this.stacked,
                gridLines: {
                  display: false,
                },
                ticks: {
                  autoSkip: false,
                },
              },
            ],
            yAxes: [
              {
                stacked: this.stacked,
                gridLines: {
                  drawTicks: false,
                  zeroLineColor: '#DDDDDD',
                  color: '#DDDDDD',
                  borderDash: [3],
                  lineWidth: 1,
                },
                ticks: {
                  beginAtZero: true,
                },
              },
            ],
          },
          legend: {
            display: false,
          },
          tooltips: {
            enabled: false,
            displayColors: false,
            backgroundColor: '#6b6b6b',
            callbacks: {
              label: tooltipItems => {
                const datasetIndex = tooltipItems.datasetIndex;
                const index = tooltipItems.index;
                const value = this.datasets[datasetIndex].data[index];
                return this.convertIntToHuman(value);
              },
              title: tooltipItems => tooltipItems[0].label,
              labelTextColor: tooltipItems => {
                const datasetIndex = tooltipItems.datasetIndex;
                const index = tooltipItems.index;
                return this.colorParse[datasetIndex][index];
              },
            },
            custom: tooltipModel => {
              const tooltipEl = this.$el.querySelector('.linechart_tooltip');

              if (!tooltipEl) {
                return;
              }

              if (!tooltipModel || tooltipModel.opacity === 0) {
                tooltipEl.style.opacity = 0;
                return;
              }

              // Positionnement du tooltip
              tooltipEl.classList.remove('above', 'below', 'no-transform');
              if (tooltipModel.yAlign) {
                tooltipEl.classList.add(tooltipModel.yAlign);
              } else {
                tooltipEl.classList.add('no-transform');
              }

              // Mise à jour du contenu du tooltip
              const titleLines = tooltipModel.title || [];
              const bodyLines = tooltipModel.body.map(item => item.lines);

              const divDate = tooltipEl.querySelector('.tooltip_header');
              divDate.innerHTML = titleLines[0];

              const divValue = tooltipEl.querySelector('.tooltip_value');
              divValue.innerHTML = '';

              tooltipModel.dataPoints.forEach(dataPoint => {
                const datasetIndex = dataPoint.datasetIndex;
                const index = dataPoint.index;
                const color = this.colorParse[datasetIndex][index];
                const value = this.convertIntToHuman(this.datasets[datasetIndex].data[index]);
                const name = this.datasets[datasetIndex].label;

                divValue.innerHTML += `
                  <div class="tooltip_value-content">
                    <span class="tooltip_dot" style="background-color:${color};"></span>
                    <p class="tooltip_place fr-mb-0">${value}</p>
                  </div>
                `;
              });

              // Positionnement du tooltip
              const position = this.chart.canvas.getBoundingClientRect();
              tooltipEl.style.position = 'absolute';
              tooltipEl.style.pointerEvents = 'none';

              let tooltipX = position.left + window.pageXOffset + tooltipModel.caretX + 10;
              let tooltipY = position.top + window.pageYOffset + tooltipModel.caretY - 18;

              tooltipEl.style.left = tooltipX + 'px';
              tooltipEl.style.top = tooltipY + 'px';
              tooltipEl.style.opacity = 1;
            },
          },
        },
      });
    },

    changeColors(theme) {
      this.loadColors();

      // Mise à jour des couleurs dans le graphique
      this.chart.data.datasets.forEach((dataset, i) => {
        dataset.borderColor = this.colorParse[i];
        dataset.backgroundColor = this.colorParse[i];
        dataset.hoverBorderColor = this.colorHover[i];
        dataset.hoverBackgroundColor = this.colorHover[i];
      });

      this.chart.update(0);
    },
  },
  created() {
    this.chartId = 'myChart' + Math.floor(Math.random() * 1000);
    this.widgetId = 'widget' + Math.floor(Math.random() * 1000);
  },
  mounted() {
    this.createChart();

    this.display = document.getElementById(this.widgetId).offsetWidth > 486 ? 'big' : 'small';
    const element = document.documentElement;
    element.addEventListener('dsfr.theme', e => {
      this.changeColors(e.detail.theme);
    });
    addEventListener('resize', () => {
      this.isSmall = document.documentElement.clientWidth < 767;
    });
  },
  beforeUpdate() {
    this.resetData();
    this.createChart();
    const element = document.documentElement;
    this.changeColors(element.getAttribute('data-fr-theme'));
  },
};
</script>

<style lang="scss">
@import './Style/BarChart.scss';
</style>
