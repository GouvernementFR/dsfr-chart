/* eslint-disable */
<template>
  <div class="widget_container fr-grid-row" :id="widgetId">
    <div class="r_col fr-col-12">
      <div class="chart">
        <div class="linechart_tooltip">
          <div class="tooltip_header"></div>
          <div class="tooltip_body">
            <div class="tooltip_value">
              <div v-for="(item, index) in nameParse" :key="item" class="flex fr-mt-3v fr-mb-1v"
                :style="{ 'border-bottom': '1px solid #e0e0e0' }">
                <div class="tooltip_value-content">
                  <span class="tooltip_dot" :style="{ 'background-color': colorParse[index] }"></span>
                  <p class='tooltip_place'>{{ capitalize(nameParse[index]) }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <canvas :id="chartId"></canvas>
        <div v-for="(item, index) in nameParse" :key="item" class="flex fr-mt-3v fr-mb-1v"
          :style="{ 'margin-left': isSmall ? '0px' : style }">
          <span class="legende_dot" :style="{ 'background-color': colorParse[index] }"></span>
          <p class='fr-text--sm fr-text--bold fr-ml-1w fr-mb-0'>
            {{ capitalize(nameParse[index]) }}
          </p>
        </div>
        <div v-for="(item2, index2) in hlineNameParse" :key="item2" class="flex fr-mt-3v"
          :style="{ 'margin-left': isSmall ? '0px' : style }">
          <span class="legende_dash_line1" v-bind:style="{ 'background-color': hlineColorParse[index2] }"></span>
          <span class="legende_dash_line2" v-bind:style="{ 'background-color': hlineColorParse[index2] }"></span>
          <p class="fr-text--sm fr-text--bold fr-ml-1w fr-mb-0">{{ capitalize(hlineNameParse[index2]) }}</p>
        </div>
        <div v-for="(item3, index3) in vlineNameParse" :key="item3" class="flex fr-mt-3v fr-mb-1v"
          :style="{ 'margin-left': isSmall ? '0px' : style }">
          <span class="legende_dash_line1" v-bind:style="{ 'background-color': vlineColorParse[index3] }"></span>
          <span class="legende_dash_line2" v-bind:style="{ 'background-color': vlineColorParse[index3] }"></span>
          <p class="fr-text--sm fr-text--bold fr-ml-1w fr-mb-0">{{ capitalize(vlineNameParse[index3]) }}</p>
        </div>
        <div v-if="date !== undefined" class="flex fr-mt-1w" :style="{ 'margin-left': isSmall ? '0px' : style }">
          <p class="fr-text--xs">Mise à jour : {{ date }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import { Chart } from 'chart.js'
import chroma from 'chroma-js'; // Importez chroma-js
import { mixin, getColorsByIndex, categoricalPalette, sequentialAscending, sequentialDescending, divergentAscending, divergentDescending, neutralColor, defaultColor, limitCategories } from '@/utils.js' // Importation des nouvelles fonctions et palettes
import annotationPlugin from 'chartjs-plugin-annotation'

Chart.pluginService.register(annotationPlugin)

export default {
  name: 'BarChart',
  mixins: [mixin],
  data() {
    return {
      widgetId: '',
      chartId: '',
      chart: undefined,
      legendLeftMargin: 100,
      display: '',
      datasets: [],
      labels: undefined,
      xparse: [],
      yparse: [],
      nameParse: [],
      tmpColorParse: [],
      colorParse: [],
      listColors: [], // Liste pour les anciennes couleurs
      vlineParse: [],
      vlineColorParse: [],
      tmpVlineColorParse: [],
      vlineNameParse: [],
      hlineParse: [],
      hlineColorParse: [],
      tmpHlineColorParse: [],
      hlineNameParse: [],
      typeGraph: '',
      ymax: 0,
      annotations: [],
      colorPrecisionBar: '#161616',
      colorBox: '#2f2f2f',
      colorHover: [],
      isSmall: false
    }
  },
  props: {
    x: {
      type: String,
      required: true
    },
    y: {
      type: String,
      required: true
    },
    name: {
      type: String,
      default: undefined
    },
    color: {
      type: String,
      default: undefined
    },
    vline: {
      type: String,
      default: undefined
    },
    vlinecolor: {
      type: String,
      default: undefined
    },
    vlinename: {
      type: String,
      default: undefined
    },
    hline: {
      type: String,
      default: undefined
    },
    hlinecolor: {
      type: String,
      default: undefined
    },
    hlinename: {
      type: String,
      default: undefined
    },
    stacked: {
      type: Boolean,
      default: false
    },
    horizontal: {
      type: Boolean,
      default: false
    },
    barsize: {
      type: Number,
      default: undefined
    },
    date: {
      type: String,
      default: undefined
    },
    aspectratio: {
      type: Number,
      default: 1
    },
    formatdate: {
      type: Boolean,
      default: false
    },
    selectedPalette: {
      type: String,
      default: '',  // Aucnes palettes n'est définie par default
    },
    highlightIndex: {
      type: Number,
      default: -1  // Si aucune donnée n'est mise en avant, on met tout en neutre
    },

  },
  computed: {
    style() {
      return this.legendLeftMargin + 'px'
    }
  },
  methods: {
    resetData() {
      this.chart.destroy()
      this.legendLeftMargin = 100
      this.display = ''
      this.datasets = []
      this.labels = undefined
      this.xparse = []
      this.yparse = []
      this.nameParse = []
      this.tmpColorParse = []
      this.colorParse = []
      this.listColors = []
      this.vlineParse = []
      this.vlineColorParse = []
      this.tmpVlineColorParse = []
      this.vlineNameParse = []
      this.hlineParse = []
      this.hlineColorParse = []
      this.tmpHlineColorParse = []
      this.hlineNameParse = []
      this.typeGraph = ''
      this.ymax = 0
      this.annotations = []
      this.colorPrecisionBar = '#161616'
      this.colorBox = '#2f2f2f'
      this.colorHover = []
    },

    getData() {
      const self = this;
      this.typeGraph = this.horizontal ? 'horizontalBar' : 'bar';

      // Ensure this.x and this.y are properly defined and parsed
      try {
        this.xparse = JSON.parse(this.x);
        this.yparse = JSON.parse(this.y);
      } catch (error) {
        console.error("Error parsing x or y data:", error);
        return;  // Exit if parsing fails
      }

      // Check if xparse and yparse are valid arrays
      if (!Array.isArray(this.xparse) || this.xparse.length === 0 || !Array.isArray(this.yparse) || this.yparse.length === 0) {
        console.error("xparse or yparse are not valid arrays");
        return;
      }

      let tmpNameParse = [];
      if (this.name !== undefined) {
        try {
          tmpNameParse = JSON.parse(self.name);
        } catch (error) {
          console.error("Error parsing name:", error);
        }
      }

      if (this.color !== undefined) {
        try {
          this.tmpColorParse = JSON.parse(self.color);
        } catch (error) {
          console.error("Error parsing color:", error);
        }
      }

      const maxCategories = 8;  // Max number of categories allowed
      let limitedCategoriesApplied = false;  // Flag to check if limiting was applied

      // Check if categories exceed the limit and apply the "Autres" logic if necessary
      if (this.xparse[0].length > maxCategories) {
        const limitedCategories = limitCategories(this.xparse[0], this.yparse.map(y => y.slice(0)), maxCategories);
        this.labels = limitedCategories.labels;  // Apply limited labels
        this.yparse = this.yparse.map((data, idx) => {
          return limitedCategories.data.map((catData, index) => {
            return Array.isArray(catData) ? catData[idx] : catData;
          });
        });  // Apply limited data
        limitedCategoriesApplied = true;
      } else {
        this.labels = this.xparse[0];  // Use full labels if no limit is needed
      }

      // If categories were limited, log the message for debugging
      if (limitedCategoriesApplied) {
        this.limitedCategoriesApplied = true;
        console.log("Categories have been limited to 8, 'Autres' applied.");
      } else {
        console.log("No need to limit categories, all categories displayed.");
      }

      // Load colors
      this.loadColors();

      // Initialize nameParse for the legend
      for (let i = 0; i < this.yparse.length; i++) {
        self.nameParse.push(tmpNameParse[i] !== undefined ? tmpNameParse[i] : 'Serie' + (i + 1));
      }

      // Prepare datasets for the chart
      self.datasets = this.yparse.map((dj, j) => ({
        data: dj,
        borderColor: self.colorParse[j],
        backgroundColor: self.colorParse[j],
        hoverBorderColor: self.colorHover[j],
        hoverBackgroundColor: self.colorHover[j],
        barThickness: self.barsize || (self.stacked ? 32 : self.horizontal ? 8 : 24)
      }));
    },

    createChart() {
      Chart.defaults.global.defaultFontFamily = 'Marianne'
      Chart.defaults.global.defaultFontSize = 12
      Chart.defaults.global.defaultLineHeight = 1.66

      this.getData()
      const self = this
      const ctx = document.getElementById(self.chartId).getContext('2d')
      this.chart = new Chart(ctx, {
        type: self.typeGraph,
        data: {
          labels: self.labels,
          datasets: self.datasets.map((dataset, index) => ({
            ...dataset,
            borderColor: self.colorParse[index],  // Application des couleurs du bord
            backgroundColor: self.colorParse[index],  // Application des couleurs de fond
            hoverBorderColor: self.colorHover[index],  // Couleur au survol pour le bord
            hoverBackgroundColor: self.colorHover[index]  // Couleur au survol pour le fond
          }))
        },
        options: {
          aspectRatio: this.aspectratio,
          animation: {
            easing: 'easeInOutBack',
            duration: 1000
          },
          scales: {
            xAxes: [{
              stacked: self.stacked,
              offset: true,
              gridLines: {
                zeroLineColor: '#DDDDDD',
                drawOnChartArea: false,
                color: '#DDDDDD',
                lineWidth: 1
              },
              ticks: {
                callback: function (value) {
                  return self.formatdate ? `${value.substring(5, 7)}/${value.substring(0, 4)}` : value
                }
              }
            }],
            yAxes: [{
              stacked: self.stacked,
              gridLines: {
                drawTicks: false,
                zeroLineColor: '#DDDDDD',
                color: '#DDDDDD',
                borderDash: [3],
                lineWidth: 1
              },
              ticks: {
                suggestedMin: 0,
                padding: 8,
                suggestedMax: self.ymax,
                autoSkip: true,
                maxTicksLimit: 5,
                callback: function (value) {
                  if (value >= 1e9 || value <= -1e9) return `${value / 1e9}B`
                  if (value >= 1e6 || value <= -1e6) return `${value / 1e6}M`
                  if (value >= 1e3 || value <= -1e3) return `${value / 1e3}K`
                  return value
                }
              },
              afterFit: function (axis) {
                self.legendLeftMargin = axis.width
              }
            }]
          },
          legend: {
            display: false
          },
          tooltips: {
            enabled: false, // Active les tooltips par défaut
            displayColors: false,
            backgroundColor: '#6b6b6b',
            callbacks: {
              label: function (tooltipItems) {
                const label = [];
                self.datasets.forEach(function (set) {
                  label.push(self.convertIntToHuman(set.data[tooltipItems.index]));
                });
                return label;
              },
              title: function (tooltipItems) {
                return tooltipItems[0].label;
              },
              labelTextColor: function (tooltipItems) {
                return self.colorParse[tooltipItems.index];
              }
            },
            custom: function (context) {
              const tooltipEl = self.$el.querySelector('.linechart_tooltip');
              const tooltipModel = context;

              if (!tooltipModel || tooltipModel.opacity === 0) {
                tooltipEl.style.opacity = 0;
                return;
              }

              // Set caret Position
              tooltipEl.classList.remove('above', 'below', 'no-transform');
              if (tooltipModel.yAlign) {
                tooltipEl.classList.add(tooltipModel.yAlign);
              } else {
                tooltipEl.classList.add('no-transform');
              }

              function getBody(bodyItem) {
                return bodyItem.lines;
              }

              if (tooltipModel.body) {
                const titleLines = tooltipModel.title || [];
                const bodyLines = tooltipModel.body.map(getBody);

                const divDate = self.$el.querySelector('.tooltip_header');
                divDate.innerHTML = titleLines[0];

                const divValue = self.$el.querySelector('.tooltip_value');
                divValue.innerHTML = '';

                if (tooltipModel.dataPoints) { // Vérifier si dataPoints existe
                  bodyLines[0].forEach(function (line, i) {
                    const dataPoint = tooltipModel.dataPoints[i];
                    if (dataPoint) {
                      const color = self.colorParse[dataPoint.datasetIndex];
                      divValue.innerHTML += `
                      <div class="tooltip_value-content">
                        <span class="tooltip_dot" style="background-color:${color};"></span>
                        <p class="tooltip_place fr-mb-0">${line}</p>
                      </div>
                    `;
                    }
                  });
                }
              }

              const { offsetLeft: positionX, offsetTop: positionY } = self.chart.canvas;
              const canvasWidth = Number(self.chart.canvas.style.width.replace(/\D/g, ''));
              const canvasHeight = Number(self.chart.canvas.style.height.replace(/\D/g, ''));

              tooltipEl.style.position = 'absolute';
              tooltipEl.style.pointerEvents = 'none';

              let tooltipX = positionX + tooltipModel.caretX + 10;
              let tooltipY = positionY + tooltipModel.caretY - 18;

              if (tooltipX + tooltipEl.clientWidth + self.legendLeftMargin > positionX + canvasWidth) {
                tooltipX = positionX + tooltipModel.caretX - tooltipEl.clientWidth - 10;
              }

              if (tooltipY + tooltipEl.clientHeight > positionY + 0.9 * canvasHeight) {
                tooltipY = positionY + tooltipModel.caretY - tooltipEl.clientHeight + 18;
              }

              if (tooltipX < positionX) {
                tooltipX = positionX + tooltipModel.caretX - tooltipEl.clientWidth / 2;
                tooltipY = positionY + tooltipModel.caretY - tooltipEl.clientHeight - 18;
              }

              tooltipEl.style.left = tooltipX + 'px';
              tooltipEl.style.top = tooltipY + 'px';
              tooltipEl.style.opacity = 1;
            }

          }
        }
      })
    },
    loadColors() {
      this.colorParse = [];
      this.colorHover = [];

      // Utilisation de la méthode choosePalette pour obtenir la bonne palette
      const paletteType = this.choosePalette();


      for (let i = 0; i < this.yparse.length; i++) {
        let color;

        if (i === this.highlightIndex) {
          color = defaultColor; // Couleur mise en avant
        } else if (this.highlightIndex !== -1) {
          color = neutralColor; // Couleur neutre si une autre série est mise en avant
        } else {
          // Application de la palette (paletteType peut être divergente, séquentielle, etc.)
          color = Array.isArray(paletteType) ? getColorsByIndex(i, paletteType) : paletteType;
        }

        // Validation de la couleur : assurez-vous que `color` est valide
        try {
          // chroma(color) vérifie et applique le format correctement
          const validatedColor = chroma(color).hex(); // Convertit en format hexadécimal si nécessaire
          this.colorParse.push(validatedColor);

          // Couleur pour hover
          const hoverColor = chroma(validatedColor).darken(0.8).hex();
          this.colorHover.push(hoverColor);
        } catch (error) {
          console.error(`Invalid color format: ${color}`, error);
          // Utiliser une couleur par défaut en cas d'erreur
          const fallbackColor = '#000000';
          this.colorParse.push(fallbackColor);
          this.colorHover.push(chroma(fallbackColor).darken(0.8).hex());
        }
      }
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

      // Par défaut, on retourne la palette catégorielle
      return categoricalPalette;
    },
    changeColors(theme) {
      // Code pour changer les couleurs du graphique en fonction du thème (clair ou sombre)
      this.loadColors()

      // Mise à jour des couleurs dans le graphique
      this.chart.data.datasets.forEach((dataset, i) => {
        dataset.borderColor = this.colorParse[i]
        dataset.backgroundColor = this.colorParse[i]
        dataset.hoverBorderColor = this.colorHover[i]
        dataset.hoverBackgroundColor = this.colorHover[i]
      })

      this.chart.update(0)
    }
  },
  created() {
    this.chartId = 'myChart' + Math.floor(Math.random() * 1000)
    this.widgetId = 'widget' + Math.floor(Math.random() * 1000)
  },
  mounted() {
    this.createChart()

    document.getElementById(this.widgetId).offsetWidth > 486 ? this.display = 'big' : this.display = 'small'
    const element = document.documentElement
    element.addEventListener('dsfr.theme', (e) => {
      this.changeColors(e.detail.theme)
    })
    addEventListener('resize', (event) => {
      this.isSmall = document.documentElement.clientWidth < 767
    })
  },
  beforeUpdate() {
    this.resetData()
    this.createChart()
    const element = document.documentElement
    this.changeColors(element.getAttribute('data-fr-theme'))
  }
}
</script>

<style lang="scss">
@import './Style/BarChart.scss';
</style>
