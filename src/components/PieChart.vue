<template>
  <Teleport
    :disabled="!$el?.ownerDocument.getElementById(databoxId) || (!databoxId && !databoxType && databoxSource === 'default')"
    :to="'#' + databoxId + '-' + databoxType + '-' + databoxSource"
  >
    <div
      :ref="widgetId"
      class="widget_container fr-grid-row"
      :data-index="selectedIndex"
      :data-sub-chart="isSubChart"
    >
      <div class="fr-col-12">
        <div class="chart">
          <div class="tooltip">
            <div class="tooltip_header fr-text--sm fr-mb-0" />
            <div class="tooltip_body">
              <div class="tooltip_value" />
            </div>
          </div>

          <div
            v-if="isSubChart"
            :class="isSubLevel ? '' : 'fr-mt-6v'"
            :style="{ textAlign: 'center' }"
          >
            <button
              v-if="isSubLevel"
              class="fr-btn fr-btn--sm fr-icon-arrow-go-back-fill fr-btn--icon-left fr-btn--tertiary-no-outline fr-ml-4w"
              :style="{ position: 'absolute', left: 0 }"
              @click="resetSub"
            >
              Retour
            </button>
            <p
              v-if="subTitle"
              class="fr-mb-0"
            >
              {{ subTitle }}
            </p>
          </div>

          <canvas
            :ref="chartId"
            role="img"
            :aria-labelledby="'title-' + databoxId"
          />

          <div class="chart_legend fr-mb-0 fr-mt-4v">
            <div
              v-for="(item, index) in nameParse"
              :key="index"
              class="flex fr-mt-3v fr-mb-1v"
            >
              <span
                class="legend_dot"
                :style="{ 'background-color': colorParse[0][index] }"
              />
              <p class="fr-text--sm fr-text--bold fr-ml-1w fr-mb-0">
                {{ capitalize(item) }}
              </p>
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
    </div>
  </Teleport>
</template>

<script>
import { ArcElement, Chart, DoughnutController, PieController } from 'chart.js';
import { chartMixins, configureChartDefaults } from '@/utils/global.js';
import { choosePalette, generateColors } from '@/utils/colors.js';

Chart.register(DoughnutController, PieController, ArcElement);

export default {
  name: 'PieChart',
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
      type: String,
      required: true,
    },
    y: {
      type: String,
      required: true,
    },
    subX: {
      type: String,
      default: null,
    },
    subY: {
      type: String,
      default: null,
    },
    name: {
      type: String,
      default: '',
    },
    fill: {
      type: [Boolean, String],
      default: false,
    },
    date: {
      type: String,
      default: '',
    },
    aspectRatio: {
      type: [Number, String],
      default: 2,
    },
    selectedPalette: {
      type: String,
      default: '',
    },
    unitTooltip: {
      type: String,
      default: '',
    },
  },
  data() {
    this.chart = undefined;

    return {
      widgetId: '',
      chartId: '',
      selectedIndex: -1,
      display: '',
      datasets: [],
      labels: [],
      xparse: [],
      yparse: [],
      subXParse: [],
      subYParse: [],
      nameParse: [],
      tmpColorParse: [],
      colorParse: [],
      colorHover: [],
      isSubChart: false,
      isSubLevel: false,
      subTitle: null,
    };
  },
  watch: {
    $props: {
      handler() {
        // Check if the chart is already created to prevent useless re-renders
        if (this.chartId) {
          this.resetData();
          this.getData();
          this.createChart();
        }
      },
      deep: true,
      immediate: true,
    },
  },
  created() {
    configureChartDefaults();
    this.chartId = `dsfr-chart-${Math.floor(Math.random() * 1000)}`;
    this.widgetId = `dsfr-widget-${Math.floor(Math.random() * 1000)}`;
  },
  mounted() {
    this.resetData();
    this.createChart();

    this.display = this.$refs[this.widgetId].offsetWidth > 486 ? 'big' : 'small';
    const element = document.documentElement;
    element.addEventListener('dsfr.theme', (e) => {
      if (this.chartId !== '') {
        this.changeColors(e.detail.theme);
      }
    });
  },
  methods: {
    resetData() {
      if (this.chart) {
        this.chart.destroy();
      }
      this.display = '';
      this.datasets = [];
      this.labels = [];
      this.xparse = [];
      this.yparse = [];
      this.subXParse = [];
      this.subYParse = [];
      this.nameParse = [];
      this.tmpColorParse = [];
      this.colorParse = [];
      this.colorHover = [];
    },
    getData() {
      // Parsing des données
      try {
        this.xparse = JSON.parse(this.x);
        this.yparse = JSON.parse(this.y);
        this.subXParse = JSON.parse(this.subX);
        this.subYParse = JSON.parse(this.subY);
      } catch (error) {
        console.error('Erreur lors du parsing des données x ou y:', error);
        return;
      }

      if (this.subXParse && this.subYParse) {
        this.isSubChart = true;
      }

      let tmpNameParse = [];
      if (this.name) {
        try {
          tmpNameParse = JSON.parse(this.name);
        } catch (error) {
          console.error('Erreur lors du parsing de name:', error);
        }
      }

      this.nameParse = [];
      for (let i = 0; i < this.yparse[0].length; i++) {
        if (tmpNameParse[i]) {
          this.nameParse.push(tmpNameParse[i]);
        } else {
          this.nameParse.push(`Série ${i + 1}`);
        }
      }

      // Assignation des labels
      this.labels = this.xparse[0];

      // Chargement des couleurs
      this.loadColors();

      // Préparation des datasets
      this.datasets = this.yparse.map((dataSet, index) => ({
        data: dataSet,
        borderColor: this.colorParse[index],
        backgroundColor: this.colorParse[index],
        hoverBorderColor: this.colorHover[index],
        hoverBackgroundColor: this.colorHover[index],
      }));
    },
    createChart() {
      if (this.chart) {
        this.chart.destroy();
      }

      this.getData();

      const ctx = this.$refs[this.chartId].getContext('2d');

      this.chart = new Chart(ctx, {
        type: [true, 'true', ''].includes(this.fill) ? 'pie' : 'doughnut',
        data: {
          labels: this.labels,
          datasets: this.datasets,
        },
        options: {
          aspectRatio: this.aspectRatio,
          layout: {
            padding: {
              left: 50,
              right: 50,
              top: 0,
              bottom: 0,
            },
          },
          plugins: {
            legend: {
              display: false,
            },
            tooltip: {
              enabled: false,
              displayColors: false,
              backgroundColor: '#6b6b6b',
              callbacks: {
                label: (tooltipItems) => this.datasets.map((set) => this.formatNumber(set.data[tooltipItems.dataIndex])),
                title: (tooltipItems) => tooltipItems[0].label,
                labelTextColor: () => this.colorParse,
              },
              external: (context) => {
                // Tooltip Element
                const dom = document.getElementById(`${this.databoxId}-${this.databoxType}-${this.databoxSource}`) ?? this.$el.nextElementSibling;

                const tooltipEl = dom.querySelector('.tooltip');

                const tooltipModel = context.tooltip;

                if (!tooltipEl) {
                  return;
                }

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

                // Set tooltip content
                if (tooltipModel.body) {
                  const titleLines = tooltipModel.title || [];
                  const bodyLines = tooltipModel.body.map((bodyItem) => bodyItem.lines);

                  // Set the title in the tooltip header
                  const divDate = tooltipEl.querySelector('.tooltip_header.fr-text--sm.fr-mb-0');
                  divDate.innerHTML = titleLines[0];

                  // Clear the existing tooltip content
                  const divValue = tooltipEl.querySelector('.tooltip_value');
                  divValue.innerHTML = '';

                  // Iterate over bodyLines to set the color and value in the tooltip
                  bodyLines[0].forEach((line, i) => {
                    if (line && line !== 'NaN' && tooltipModel.dataPoints[i]) {
                      const { datasetIndex, dataIndex } = tooltipModel.dataPoints[i];

                      // Ensure the color is correctly referenced
                      const color = this.colorParse[datasetIndex] ? this.colorParse[datasetIndex][dataIndex] : '#000';

                      const displayValue = `${line}${this.unitTooltip ? ` ${this.unitTooltip}` : ''}`;

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
                tooltipEl.style.padding = `${tooltipModel.padding}px ${tooltipModel.padding}px`;
                tooltipEl.style.pointerEvents = 'none';
                tooltipEl.style.left = `${tooltipX}px`;
                tooltipEl.style.top = `${tooltipY}px`;
                tooltipEl.style.opacity = 1;
              },
            },
          },
          onClick: (e) => {
            if (!this.subYParse) {
              return;
            }

            const activePoints = this.chart.getElementsAtEventForMode(e, 'nearest', { intersect: true }, true);

            if (activePoints.length > 0) {
              const { index } = activePoints[0];
              const clickedLabel = this.chart.data.labels[index];

              if (!this.subTitle) {
                // Update title for 2nd level
                this.subTitle = clickedLabel;
              }

              // Check if the category is the main category
              if (this.subYParse[index] && !this.isSubLevel) {
                this.updateChart(index);
                this.isSubLevel = true;
                this.selectedIndex = index;
              }
            }
          },
        },
      });
    },
    loadColors() {
      let yparseSimple = this.yparse;
      if (this.selectedPalette === '' || this.selectedPalette === 'categorical') {
        yparseSimple = this.yparse[0];
      }

      const { colorParse, colorHover } = generateColors({
        yparse: yparseSimple,
        tmpColorParse: this.tmpColorParse,
        selectedPalette: this.selectedPalette,
      });

      this.colorParse = [colorParse.flat()];
      this.colorHover = [colorHover.flat()];
    },
    choosePalette() {
      // Using the refactored choosePalette function from utils
      return choosePalette(this.selectedPalette);
    },
    // eslint-disable-next-line no-unused-vars
    changeColors(theme) {
      this.loadColors();

      // Mise à jour des couleurs dans le graphique
      this.chart.data.datasets.forEach((dataset, i) => {
        dataset.borderColor = this.colorParse[i];
        dataset.backgroundColor = this.colorParse[i];
        dataset.hoverBorderColor = this.colorHover[i];
        dataset.hoverBackgroundColor = this.colorHover[i];
      });

      this.chart.update('none');
    },
    updateChart(category) {
      const children = this.subYParse[category];

      // If the category doesn't have any children, let's do nothing
      if (!children || children.length === 0) {
        return;
      }

      this.chart.data.labels = this.subXParse[category];
      this.chart.data.datasets[0].data = this.subYParse[category];
      this.chart.update();
    },
    resetSub() {
      this.isSubLevel = false;
      this.subTitle = null;
      this.chart.data.labels = this.xparse[0];
      this.chart.data.datasets[0].data = this.yparse[0];
      this.chart.update();

      this.selectedIndex = -1;
    },
  },
};
</script>
