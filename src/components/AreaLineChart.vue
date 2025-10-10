<template>
  <Teleport
    :disabled="!$el?.ownerDocument.getElementById(databoxId) || (!databoxId && !databoxType && databoxSource === 'default')"
    :to="'#' + databoxId + '-' + databoxType + '-' + databoxSource"
  >
    <div
      :ref="widgetId"
      class="widget_container fr-grid-row"
    >
      <div class="fr-col-12">
        <div class="chart">
          <div class="tooltip">
            <div class="tooltip_header fr-text--sm fr-mb-0" />
            <div class="tooltip_body">
              <div class="tooltip_value">
                <!-- Areas -->
                <div
                  v-for="(areaColor, index) in colorAreaParse"
                  :key="index"
                  class="flex fr-mt-3v fr-mb-1v"
                  :style="{ 'border-bottom': '1px solid #e0e0e0' }"
                >
                  <div class="tooltip_value-content">
                    <span
                      class="tooltip_dot"
                      :style="{ 'background-color': colorAreaParse[Math.min(index, colorAreaParse.length - 1)] }"
                    />
                    <p class="tooltip_place">
                      {{ capitalize(nameAreasParse[index] || 'Area ' + (index + 1)) }}
                    </p>
                  </div>
                </div>

                <!-- Lignes -->
                <div
                  v-for="(lineColor, index) in colorParse"
                  :key="index"
                  class="flex fr-mt-3v fr-mb-1v"
                  :style="{ 'border-bottom': '1px solid #e0e0e0' }"
                >
                  <div class="tooltip_value-content">
                    <span
                      class="tooltip_dot"
                      :style="{ 'background-color': colorParse[Math.min(index, colorParse.length - 1)] }"
                    />
                    <p class="tooltip_place">
                      {{ capitalize(nameLinesParse[index] || 'Line ' + (index + 1)) }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <canvas :ref="chartId" />

          <div class="chart_legend fr-mb-0 fr-mt-4v">
            <!-- Areas -->
            <div
              v-for="(areaName, index) in nameAreasParse"
              :key="index"
              class="flex fr-mt-3v fr-mb-1v"
            >
              <span
                class="legende_dot"
                :style="{ 'background-color': colorAreaParse[Math.min(index, colorAreaParse.length - 1)] }"
              />
              <p class="fr-text--sm fr-text--bold fr-ml-1w fr-mb-0">
                {{ capitalize(areaName || 'Area ' + (index + 1)) }}
              </p>
            </div>

            <!-- Lignes -->
            <div
              v-for="(lineName, index) in nameLinesParse"
              :key="index"
              class="flex fr-mt-3v fr-mb-1v"
            >
              <span
                class="legende_dot"
                :style="{ 'background-color': colorParse[Math.min(index, colorParse.length - 1)] }"
              />
              <p class="fr-text--sm fr-text--bold fr-ml-1w fr-mb-0">
                {{ capitalize(lineName || 'Line ' + (index + 1)) }}
              </p>
            </div>
          </div>

          <div
            v-if="date"
            class="flex fr-mt-1w"
          >
            <p class="fr-text--xs">
              Mise à jour : {{ date }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script>
import { Chart, LineController, LineElement, Filler, PointElement, LinearScale, CategoryScale } from 'chart.js';
import { chartMixins, configureChartDefaults } from '@/utils/global.js';
import { generateAreaLineChartColors } from '@/utils/colors.js';
import { getIndexes, ticksCallback } from '@/utils/labels.js';
import { plugins } from '@/utils/plugins.js';

Chart.register(LineController, LineElement, Filler, PointElement, LinearScale, CategoryScale);

export default {
  name: 'AreaLineChart',
  mixins: [chartMixins],
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
    x: {
      type: Array,
      required: true
    },
    yAreas: {
      type: Array,
      required: true
    },
    yLines: {
      type: Array,
      required: true
    },
    xMin: {
      type: [Number, String],
      default: '',
    },
    xMax: {
      type: [Number, String],
      default: '',
    },
    yAreaMin: {
      type: [Number, String],
      default: '',
    },
    yAreaMax: {
      type: [Number, String],
      default: '',
    },
    yLineMin: {
      type: [Number, String],
      default: '',
    },
    yLineMax: {
      type: [Number, String],
      default: '',
    },
    nameAreas: {
      type: Array,
      default: () => []
    },
    nameLines: {
      type: Array,
      default: () => []
    },
    aspectRatio: {
      type: [Number, String],
      default: 2
    },
    selectedPalette: {
      type: String,
      default: 'categorical'
    },
    areasColors: {
      type: Array,
      default: undefined
    },
    linesColors: {
      type: Array,
      default: undefined
    },
    unitTooltipArea: {
      type: String,
      default: ''
    },
    unitTooltipLine: {
      type: String,
      default: ''
    },
    date: {
      type: String,
      default: ''
    },
    showLinesLabels: {
      type: [Array],
      default: () => [],
    },
    showAreasLabels: {
      type: [Array],
      default: () => [],
    },
    singleAxis: {
      type: Boolean,
      default: false
    },
    pointRadius: {
      type: Number,
      default: 5,
    },
    highlightStart: {
      type: [String, Number],
      default: null
    },
    highlightEnd: {
      type: [String, Number],
      default: null
    },
    highlightLabel: {
      type: String,
      default: ''
    },
    highlightLabelColor: {
      type: String,
      default: 'rgba(100, 100, 100, 1)'
    },
    highlightLabelSize: {
      type: Number,
      default: 14
    },
    highlightLabelPosition: {
      type: String,
      default: 'top', // 'top' | 'middle' | 'bottom'
      validator: (v) => ['top', 'middle', 'bottom'].includes(v)
    },
  },
  data() {
    this.chart = undefined;
    return {
      widgetId: '',
      chartId: '',
      display: '',
      areasDatasets: [],
      linesDatasets: [],
      labels: [],
      xparse: [],
      yAreaParse: [],
      yLineParse: [],
      showAreaLabelsParse: [],
      showLinesLabelsParse: [],
      nameAreasParse: [],
      nameLinesParse: [],
      colorParse: [],
      colorAreaParse: [],
      colorAreaLineParse: [],
      colorHover: [],
      colorAreaHover: [],
    };
  },
  created() {
    configureChartDefaults();
    this.chartId = 'dsfr-chart-' + Math.floor(Math.random() * 1000);
    this.widgetId = 'dsfr-widget-' + Math.floor(Math.random() * 1000);
  },
  mounted() {
    this.resetData();
    this.createChart();
  },
  methods: {
    resetData() {
      if (this.chart) this.chart.destroy();
      this.areasDatasets = [];
      this.linesDatasets = [];
      this.labels = [];
      this.xparse = [];
      this.yAreaParse = [];
      this.yLineParse = [];
      this.showAreaLabelsParse = [];
      this.showLinesLabelsParse = [];
      this.nameAreasParse = [];
      this.nameLinesParse = [];
      this.colorParse = [];
      this.colorAreaParse = [];
      this.colorAreaLineParse = [];
      this.colorHover = [];
      this.colorAreaHover = [];
    },
    getData() {
      try {
        if (typeof this.x === 'string' || typeof this.yAreas === 'string' || typeof this.yLines === 'string') {
          console.error("Cette fonctionnalité n'est plus supportée. Veuillez passer les props 'x', 'yAreas' et 'yLines' comme une liste de nombres.");
        }
        // On gère la legacy où x et y pouvaient être passés en string
        this.xparse = typeof this.x === 'string' ? JSON.parse(this.x) : this.x;

        this.yAreaParse = typeof this.yAreas === 'string' ? JSON.parse(this.yAreas) : this.yAreas;
        this.yLineParse = typeof this.yLines === 'string' ? JSON.parse(this.yLines) : this.yLines;

        if (!Array.isArray(this.xparse) || !Array.isArray(this.xparse[0])) {
          throw new Error("La prop 'x' doit être une liste de listes.");
        }
        if (!Array.isArray(this.yAreaParse) || !Array.isArray(this.yAreaParse[0])) {
          throw new Error("La prop 'yAreas' doit être une liste de listes.");
        }
        if (!Array.isArray(this.yLineParse) || (this.yLineParse.length > 0 && !Array.isArray(this.yLineParse[0]))) {
          throw new Error("La prop 'yLines' doit être une liste de listes.");
        }

        this.nameAreasParse = typeof this.nameAreas === 'string' ? JSON.parse(this.nameAreas) : this.nameAreas;
        this.nameLinesParse = typeof this.nameLines === 'string' ? JSON.parse(this.nameLines) : this.nameLines;
      } catch (err) {
        console.error('Erreur parsing:', err);
        return;
      }

      try {
        this.showAreaLabelsParse = typeof this.showAreasLabels === 'string' ? JSON.parse(this.showAreasLabels) : this.showAreasLabels;
        this.showLinesLabelsParse = typeof this.showLinesLabels === 'string' ? JSON.parse(this.showLinesLabels) : this.showLinesLabels;

        if (!Array.isArray(this.showAreaLabelsParse)) {
          throw new Error("La prop 'showAreasLabels' doit être une liste.");
        }
        if (!Array.isArray(this.showLinesLabelsParse)) {
          throw new Error("La prop 'showLinesLabels' doit être une liste.");
        }
      } catch (error) {
        console.error("Erreur lors du parsing des données 'showLinesLabels' ou 'showAreasLabels':", error);
        return;
      }

      this.labels = this.xparse[0];

      // Charger les couleurs
      const { colorAreaParse, colorAreaLineParse, colorAreaHover, colorParse, colorHover } = generateAreaLineChartColors({
        yLinesLength: this.yLineParse.length,
        yBarsLength: this.yAreaParse.length,
        selectedPalette: this.selectedPalette,
        areasColors: this.areasColors,
        linesColors: this.linesColors,
      });

      this.colorAreaLineParse = colorAreaLineParse;
      this.colorAreaParse = colorAreaParse;
      this.colorAreaHover = colorAreaHover;
      this.colorParse = colorParse;
      this.colorHover = colorHover;

      // Crée datasets area
      this.areasDatasets = this.yAreaParse.map((data, i) => ({
        data,
        type: 'line',
        fill: true,
        backgroundColor: this.colorAreaParse[i],
        borderColor: this.colorAreaLineParse[i],
        tension: 0.4,
        pointRadius: 0,
        pointHoverRadius: 0,
        order: 2,
      }));

      // Crée datasets line
      this.linesDatasets = this.yLineParse.map((data, i) => ({
        data,
        type: 'line',
        fill: false,
        borderColor: this.colorParse[i],
        pointBorderColor: this.colorParse[i],
        pointBackgroundColor: this.colorParse[i],
        pointRadius: this.pointRadius,
        pointHoverRadius: this.pointRadius,
        tension: 0.4,
        yAxisID: this.singleAxis ? 'y' : 'yLine',
        order: 1,
      }));
    },
    createChart() {
      if (this.chart) this.chart.destroy();

      this.getData();

      const ctx = this.$refs[this.chartId].getContext('2d');

      // NOTE: Il est important de conserver l'ordre des datasets (lines avant areas) pour le bon fonctionnement du plugin de labels
      const datasets = [...this.linesDatasets, ...this.areasDatasets];

      const indexesWithLabels = [
        ...getIndexes(this.linesDatasets, this.showLinesLabelsParse),
        ...getIndexes(this.areasDatasets, this.showAreaLabelsParse)
      ];

      this.chart = new Chart(ctx, {
        data: {
          labels: this.labels,
          datasets: datasets,
        },
        plugins: [
          {
            id: 'hoverAxisLines',
            afterDraw: plugins.hoverAxisLines.afterDraw_2D.call(this, this.yAreaParse, this.yLineParse),
          },
          {
            id: 'pointLabels',
            afterDatasetsDraw: plugins.pointLabels.afterDatasetsDraw.call(this, indexesWithLabels),
          },
          {
            id: 'highlightZone',
            beforeDraw: plugins.highlightZone.beforeDraw.bind(this),
          },
        ],
        options: {
          layout: {
            padding: 0, // supprime toutes les marges
          },
          aspectRatio: this.aspectRatio,
          scales: {
            x: {
              grid: {
                drawTicks: false,
                drawOnChartArea: false,
              },
              ...(this.xMin ? { suggestedMin: this.xMin } : {}),
              ...(this.xMax ? { suggestedMax: this.xMax } : {}),
            },
            y: {
              type: 'linear',
              position: 'left',
              offset: false,
              grid: {
                drawTicks: false,
              },
              border: {
                dash: [3],
              },
              ticks: {
                padding: 10,
                maxTicksLimit: 5,
                callback: ticksCallback,
              },
              ...(this.yAreaMin ? { suggestedMin: this.yAreaMin } : {}),
              ...(this.yAreaMax ? { suggestedMax: this.yAreaMax } : {}),
            },
            yLine: {
              display: !this.singleAxis && this.yLineParse.length > 0,
              type: 'linear',
              position: 'right',
              id: 'yLine',
              beginAtZero: true,
              grid: {
                drawTicks: false,
              },
              border: {
                dash: [3],
              },
              ticks: {
                padding: 10,
                maxTicksLimit: 5,
                callback: ticksCallback,
              },
              ...(this.yLineMin ? { suggestedMin: this.yLineMin } : {}),
              ...(this.yLineMax ? { suggestedMax: this.yLineMax } : {}),
            },
          },
          plugins: {
            legend: {
              display: false
            },
            tooltip: {
              enabled: false,
              displayColors: false,
              backgroundColor: '#6b6b6b',
              callbacks: {
                label: (tooltipItems) => {
                  const label = [];
                  [...this.areasDatasets, ...this.linesDatasets].forEach((set) => {
                    label.push(this.formatNumber(set.data[tooltipItems.dataIndex]));
                  });
                  return label;
                },
                title: (tooltipItems) => {
                  return tooltipItems[0].label;
                },
              },
              external: (context) => {
                // Tooltip Element
                const dom = document.getElementById(this.databoxId + '-' + this.databoxType + '-' + this.databoxSource) || this.$el.nextElementSibling;

                const tooltipEl = dom.querySelector('.tooltip');

                const tooltipModel = context.tooltip;

                if (!tooltipEl) return;

                // Hide if no tooltip
                if (!tooltipModel || tooltipModel.opacity === 0) {
                  tooltipEl.style.opacity = 0;
                  return;
                }

                // Set tooltip position classes
                tooltipEl.classList.remove('above', 'below', 'no-transform');
                if (tooltipModel.yAlign) {
                  tooltipEl.classList.add(tooltipModel.yAlign);
                } else {
                  tooltipEl.classList.add('no-transform');
                }

                // Set Text
                if (tooltipModel.body) {
                  const titleLines = tooltipModel.title || [];
                  const bodyLines = tooltipModel.body.map((bodyItem) => {
                    return bodyItem.lines;
                  });

                  // Set the title in the tooltip header
                  const divDate = tooltipEl.querySelector('.tooltip_header.fr-text--sm.fr-mb-0');
                  divDate.innerHTML = titleLines[0];

                  const divValue = tooltipEl.querySelector('.tooltip_value');
                  divValue.innerHTML = '';

                  // Access color arrays for different datasets
                  const colors = [...this.colorParse, ...this.colorAreaParse]; // Adjust to match your color variables

                  // Iterate over bodyLines to set the color and value in the tooltip
                  bodyLines[0].forEach((line, i) => {
                    if (line) {
                      const color = colors[Math.min(i, colors.length - 1)];

                      // Détecter si c'est une barre ou une ligne en fonction de l'index
                      const displayValue = i === 0 ? `${line}${this.unitTooltipArea ? ' ' + this.unitTooltipArea : ''}` : `${line}${this.unitTooltipLine ? ' ' + this.unitTooltipLine : ''}`;

                      divValue.innerHTML += `
                        <div class="tooltip_value-content">
                          <span class="tooltip_dot" style="background-color:${color};"></span>
                          <p class="tooltip_place fr-mb-0">${displayValue}</p>
                        </div>
                      `;
                    }
                  });
                }

                // Position the tooltip
                const { offsetLeft: positionX, offsetTop: positionY } = this.chart.canvas;

                const canvasWidth = Number(this.chart.canvas.style.width.replace(/\D/g, ''));
                const canvasHeight = Number(this.chart.canvas.style.height.replace(/\D/g, ''));

                let tooltipX = positionX + tooltipModel.caretX + 10;
                let tooltipY = positionY + tooltipModel.caretY - 20;
                if (tooltipX + tooltipEl.clientWidth > positionX + canvasWidth) {
                  tooltipX = positionX + tooltipModel.caretX - tooltipEl.clientWidth - 10;
                }
                if (tooltipY + tooltipEl.clientHeight > positionY + 0.9 * canvasHeight) {
                  tooltipY = positionY + tooltipModel.caretY - tooltipEl.clientHeight + 20;
                }
                if (tooltipX < positionX) {
                  tooltipX = positionX + tooltipModel.caretX - tooltipEl.clientWidth / 2;
                  tooltipY = positionY + tooltipModel.caretY - tooltipEl.clientHeight - 20;
                }

                tooltipEl.style.position = 'absolute';
                tooltipEl.style.padding = tooltipModel.padding + 'px ' + tooltipModel.padding + 'px';
                tooltipEl.style.pointerEvents = 'none';
                tooltipEl.style.left = tooltipX + 'px';
                tooltipEl.style.top = tooltipY + 'px';
                tooltipEl.style.opacity = 1;
              },
            },
          },
        },
      });

    },
    changeColors(theme) {
      this.loadColors();

      // Mise à jour des couleurs dans le graphique
      this.areasDatasets.forEach((dataset, i) => {
        dataset.borderColor = this.colorAreaLineParse[i % this.colorAreaLineParse.length];
        dataset.backgroundColor = this.colorAreaParse[i % this.colorAreaParse.length];
        dataset.pointBorderColor = this.colorAreaParse[i % this.colorAreaParse.length];
        dataset.pointBackgroundColor = this.colorAreaParse[i % this.colorAreaParse.length];
        dataset.pointHoverBorderColor = this.colorAreaHover[i % this.colorAreaHover.length];
        dataset.pointHoverBackgroundColor = this.colorAreaHover[i % this.colorAreaHover.length];
      });

      // Mise à jour des datasets line
      this.linesDatasets.forEach((dataset, i) => {
        dataset.borderColor = this.colorParse[i % this.colorParse.length];
        dataset.pointBorderColor = this.colorParse[i % this.colorParse.length];
        dataset.pointBackgroundColor = this.colorParse[i % this.colorParse.length];
        dataset.pointHoverBorderColor = this.colorHover[i % this.colorHover.length];
        dataset.pointHoverBackgroundColor = this.colorHover[i % this.colorHover.length];
      });

      this.chart.options.scales.x.ticks.color = theme === 'dark' ? '#cecece' : Chart.defaults.color;
      this.chart.options.scales.y.ticks.color = theme === 'dark' ? '#cecece' : Chart.defaults.color;
      this.chart.options.scales.yLine.ticks.color = theme === 'dark' ? '#cecece' : Chart.defaults.color;

      this.chart.update('none');
    },
  },
};
</script>

<style scoped lang="scss">

</style>
