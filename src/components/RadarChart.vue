<template>
  <div
    :ref="widgetId"
    class="widget_container fr-grid-row"
  >
    <div class="r_col fr-col-12">
      <div class="chart">
        <div class="linechart_tooltip">
          <div class="tooltip_header fr-text--sm fr-mb-0" />
          <div class="tooltip_body">
            <div class="tooltip_value">
              <span class="tooltip_dot" />
            </div>
          </div>
        </div>
        <canvas :ref="chartId" />
        <div class="chart_legend fr-mb-0 fr-mt-4v">
          <div
            v-for="(item, index) in nameParse"
            :key="index"
            class="flex fr-mt-3v fr-mb-1v"
          >
            <span
              class="legende_dot"
              :style="{ 'background-color': colorParse[index] }"
            />
            <p class="fr-text--sm fr-text--bold fr-ml-1w fr-mb-0">
              {{ capitalize(item) }}
            </p>
          </div>
        </div>
        <div
          v-if="date !== undefined"
          class="flex fr-mt-1w"
          :style="{ 'margin-left': isSmall ? '0px' : style }"
        >
          <p class="fr-text--xs">
            Mise à jour : {{ date }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Chart, RadarController, RadialLinearScale } from 'chart.js';
import chroma from 'chroma-js';
import { mixin, configureChartDefaults } from '@/utils/global.js';
import { choosePalette, generateColors } from '@/utils/colors.js';

Chart.register(RadarController, RadialLinearScale);

export default {
  name: 'RadarChart',
  mixins: [mixin],
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
    date: {
      type: String,
      default: undefined,
    },
    aspectRatio: {
      type: Number,
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
      legendLeftMargin: 100,
      display: '',
      datasets: [],
      labels: undefined,
      xparse: [],
      yparse: [],
      nameParse: [],
      tmpColorParse: [],
      colorParse: [],
      colorHover: [],
      isSmall: false,
    };
  },
  computed: {
    style() {
      return this.legendLeftMargin + 'px';
    },
  },
  created() {
    configureChartDefaults();
    this.chartId = 'myChart' + Math.floor(Math.random() * 1000);
    this.widgetId = 'widget' + Math.floor(Math.random() * 1000);
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
    addEventListener('resize', () => {
      this.isSmall = document.documentElement.clientWidth < 767;
    });
  },
  methods: {
    resetData() {
      if (this.chart) {
        this.chart.destroy();
      }
      this.legendLeftMargin = 100;
      this.display = '';
      this.datasets = [];
      this.labels = undefined;
      this.xparse = [];
      this.yparse = [];
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
      } catch (error) {
        console.error('Erreur lors du parsing des données x ou y:', error);
        return;
      }

      let tmpNameParse = [];
      if (this.name !== undefined) {
        try {
          tmpNameParse = JSON.parse(this.name);
        } catch (error) {
          console.error('Erreur lors du parsing de name:', error);
        }
      }

      for (let i = 0; i < this.yparse.length; i++) {
        if (tmpNameParse[i] !== undefined) {
          this.nameParse.push(tmpNameParse[i]);
        } else {
          this.nameParse.push('Serie' + (i + 1));
        }
      }

      // Assignation des labels
      this.labels = this.xparse[0];

      // Chargement des couleurs
      this.loadColors();

      // Préparation des datasets
      this.datasets = this.yparse.map((dataSet, index) => ({
        pointRadius: 5,
        pointHoverRadius: 5,
        data: dataSet,
        borderColor: this.colorParse[index],
        pointBackgroundColor: this.colorParse[index],
        backgroundColor: chroma(this.colorParse[index]).alpha(0.3).hex(),
        fill: true,
        hoverBorderColor: this.colorHover[index],
        hoverBackgroundColor: this.colorHover[index],
      }));
    },
    loadColors() {
      // Utilisation de generateColors
      const { colorParse, colorHover } = generateColors({
        yparse: this.yparse.map(() => [1]), // Simule une série avec une valeur unique
        tmpColorParse: this.tmpColorParse,
        selectedPalette: this.selectedPalette,
      });

      this.colorParse = colorParse.map((colors) => colors[0]); // Récupère uniquement la première couleur de chaque série
      this.colorHover = colorHover.map((colors) => colors[0]); // Idem pour les couleurs de survol
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
        dataset.pointBorderColor = this.colorParse[i];
        dataset.pointBackgroundColor = this.colorParse[i];
        dataset.hoverBorderColor = this.colorHover[i];
        dataset.hoverBackgroundColor = this.colorHover[i];
        dataset.pointHoverBorderColor = this.colorHover[i];
        dataset.pointHoverBackgroundColor = this.colorHover[i];
      });

      this.chart.update('none');
    },
    createChart() {
      if (this.chart) this.chart.destroy();

      this.getData();

      const ctx = this.$refs[this.chartId].getContext('2d');

      this.chart = new Chart(ctx, {
        type: 'radar',
        data: {
          labels: this.labels,
          datasets: this.datasets,
        },
        options: {
          aspectRatio: this.aspectRatio,
          scales: {
            r: {
              angleLines: {
                display: true,
                borderDash: [3, 3],
              },
              ticks: {
                display: false, // Hide the tick labels
                backdropColor: 'transparent',
              },
              grid: {
                color: '#666666',
              },
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
                label: (tooltipItems) => {
                  const label = [];
                  this.datasets.forEach((set) => {
                    label.push(set.data[tooltipItems.dataIndex]);
                  });
                  return label;
                },
                title: (tooltipItems) => {
                  return tooltipItems[0].label;
                },
                labelTextColor: () => {
                  return this.colorParse;
                },
              },
              external: (context) => {
                // Tooltip Element
                const tooltipEl = this.$el.querySelector('.linechart_tooltip');

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
                  const titleLines = [this.xparse[0][tooltipModel.dataPoints[0].dataIndex]];
                  const bodyLines = tooltipModel.body.map((bodyItem) => {
                    return bodyItem.lines;
                  });

                  // Set the title in the tooltip header
                  const divDate = tooltipEl.querySelector('.tooltip_header.fr-text--sm.fr-mb-0');
                  divDate.innerHTML = titleLines[0];

                  const divValue = tooltipEl.querySelector('.tooltip_value');
                  divValue.innerHTML = '';

                  // Retrieve the node name for tooltip dots
                  const tooltipDotElement = tooltipEl.querySelector('.tooltip_dot');
                  const nodeName = tooltipDotElement ? tooltipDotElement.attributes[0].nodeName : 'data-attribute';

                  // Process each line in bodyLines to display in the tooltip
                  bodyLines[0].forEach((line, i) => {
                    if (line !== undefined && tooltipModel.dataPoints[i]) {
                      // Get the color for the specific dataset index safely
                      const dataPoint = tooltipModel.dataPoints[i];
                      const datasetIndex = dataPoint.datasetIndex;

                      // Ensure that colorParse and datasetIndex are valid
                      const color = this.colorParse[datasetIndex] ? this.colorParse[datasetIndex] : '#000'; // Default to black if not found

                      // Include unitTooltip if provided
                      const displayValue = `${line}${this.unitTooltip ? ' ' + this.unitTooltip : ''}`;

                      divValue.innerHTML += `
                      <div class="tooltip_value-content">
                        <span ${nodeName}="" class="tooltip_dot" style="background-color:${color};"></span>
                        ${displayValue}
                      </div>
                    `;
                    }
                  });
                }

                // Position the tooltip
                const { offsetLeft: positionX, offsetTop: positionY } = this.chart.canvas;
                const canvasWidth = Number(this.chart.canvas.style.width.replace(/\D/g, ''));
                const canvasHeight = Number(this.chart.canvas.style.height.replace(/\D/g, ''));

                tooltipEl.style.position = 'absolute';
                tooltipEl.style.padding = `${tooltipModel.padding}px ${tooltipModel.padding}px`;
                tooltipEl.style.pointerEvents = 'none';

                let tooltipX = positionX + window.scrollX + tooltipModel.caretX + 10;
                let tooltipY = positionY + window.scrollY + tooltipModel.caretY - 18;

                if (tooltipX + tooltipEl.clientWidth + this.legendLeftMargin > positionX + canvasWidth) {
                  tooltipX = positionX + tooltipModel.caretX - tooltipEl.clientWidth - 10;
                }
                if (tooltipY + tooltipEl.clientHeight > positionY + 0.9 * canvasHeight) {
                  tooltipY = positionY + tooltipModel.caretY - tooltipEl.clientHeight + 18;
                }
                if (tooltipX < positionX) {
                  tooltipX = positionX + tooltipModel.caretX - tooltipEl.clientWidth / 2;
                  tooltipY = positionY + tooltipModel.caretY - tooltipEl.clientHeight - 18;
                }

                tooltipEl.style.left = `${tooltipX}px`;
                tooltipEl.style.top = `${tooltipY}px`;
                tooltipEl.style.opacity = 1;
              },
            },
          },
        },
      });
    },
  },
};
</script>

<style scoped lang="scss">
@import '@/styles/Tooltip.scss';
@import '@/styles/Rcol.scss';
@import '@/styles/WidgetContainer.scss';
</style>
