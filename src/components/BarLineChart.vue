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
              <div
                v-for="(item, index) in nameParse"
                :key="index"
                class="flex fr-mt-3v fr-mb-1v"
                :style="{ 'border-bottom': '1px solid #e0e0e0' }"
              >
                <div class="tooltip_value-content">
                  <span
                    class="tooltip_dot"
                    :style="{ 'background-color': colorParse[index] }"
                  />
                  <p class="tooltip_place">
                    {{ capitalize(item) }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <canvas :ref="chartId" />
        <div class="chart_legend fr-mb-0 fr-mt-4v">
          <div class="flex">
            <span
              class="legende_dot"
              :style="{ 'background-color': colorBarParse }"
            />
            <p class="fr-text--sm fr-text--bold fr-ml-1w fr-mb-0">
              {{ capitalize(nameBar) }}
            </p>
          </div>
          <div class="flex">
            <span
              class="legende_dot"
              :style="{ 'background-color': colorParse }"
            />
            <p class="fr-text--sm fr-text--bold fr-ml-1w fr-mb-0">
              {{ capitalize(name) }}
            </p>
          </div>
          <div
            v-for="(item, index) in hlineNameParse"
            :key="index"
            class="flex"
          >
            <span
              class="legende_dash_line1"
              :style="{ 'background-color': hlineColorParse[index] }"
            />
            <span
              class="legende_dash_line2"
              :style="{ 'background-color': hlineColorParse[index] }"
            />
            <p class="fr-text--sm fr-text--bold fr-ml-1w fr-mb-0">
              {{ capitalize(item) }}
            </p>
          </div>
          <div
            v-for="(item, index) in vlineNameParse"
            :key="index"
            class="flex"
          >
            <span
              class="legende_dash_line1"
              :style="{ 'background-color': vlineColorParse[index] }"
            />
            <span
              class="legende_dash_line2"
              :style="{ 'background-color': vlineColorParse[index] }"
            />
            <p class="fr-text--sm fr-text--bold fr-ml-1w fr-mb-0">
              {{ capitalize(item) }}
            </p>
          </div>
        </div>
        <div
          v-if="date !== undefined"
          class="flex fr-mt-1w"
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
import { Chart, LineController, LineElement } from 'chart.js';
import { mixin, configureChartDefaults } from '@/utils/global.js';
import { choosePalette, generateBarLineChartColors } from '@/utils/colors.js';

Chart.register(LineController, LineElement);

export default {
  name: 'BarLineChart',
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
    yBar: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      default: '',
    },
    nameBar: {
      type: String,
      default: '',
    },
    vline: {
      type: String,
      default: undefined,
    },
    vlinecolor: {
      type: String,
      default: undefined,
    },
    vlinename: {
      type: String,
      default: undefined,
    },
    hline: {
      type: String,
      default: undefined,
    },
    hlinecolor: {
      type: String,
      default: undefined,
    },
    hlinename: {
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
      default: 'categorical',
    },
    unitTooltip: {
      type: String,
      default: '',
    },
    unitTooltipBar: {
      type: String,
      default: '',
    },
  },
  data() {
    this.chart = undefined;

    return {
      widgetId: '',
      chartId: '',
      legendLeftMargin: 0,
      display: '',
      datasets: [],
      xAxisType: 'category',
      labels: undefined,
      xparse: [],
      yparse: [],
      ybarparse: [],
      vlineParse: [],
      vlineColorParse: [],
      nameParse: [],
      tmpVlineColorParse: [],
      vlineNameParse: [],
      hlineParse: [],
      hlineColorParse: [],
      tmpHlineColorParse: [],
      hlineNameParse: [],
      ymax: 0,
      colorParse: undefined,
      colorBarParse: undefined,
      colorHover: undefined,
      colorBarHover: undefined,
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
      this.legendLeftMargin = 0;
      this.display = '';
      this.datasets = [];
      this.xAxisType = 'category';
      this.labels = undefined;
      this.xparse = [];
      this.yparse = [];
      this.ybarparse = [];
      this.vlineParse = [];
      this.vlineColorParse = [];
      this.tmpVlineColorParse = [];
      this.vlineNameParse = [];
      this.hlineParse = [];
      this.hlineColorParse = [];
      this.tmpHlineColorParse = [];
      this.hlineNameParse = [];
      this.ymax = 0;
      this.colorParse = undefined;
      this.colorBarParse = undefined;
      this.colorHover = undefined;
      this.colorBarHover = undefined;
    },
    getData() {
      // Parsing des données
      try {
        this.xparse = JSON.parse(this.x);
        this.yparse = JSON.parse(this.y);
        this.ybarparse = JSON.parse(this.yBar);
      } catch (error) {
        console.error('Erreur lors du parsing des données x ou y ou yBar:', error);
        return;
      }

      // Récupération données Vline
      if (this.vline !== undefined) {
        this.vlineParse = JSON.parse(this.vline);
        let tmpVlineNameParse = [];
        if (this.vlinename !== undefined) {
          tmpVlineNameParse = JSON.parse(this.vlinename);
        }
        if (this.vlinecolor !== undefined) {
          this.tmpVlineColorParse = JSON.parse(this.vlinecolor);
        }

        for (let i = 0; i < this.vlineParse.length; i++) {
          if (tmpVlineNameParse[i] !== undefined) {
            this.vlineNameParse.push(tmpVlineNameParse[i]);
          } else {
            this.vlineNameParse.push('V' + (i + 1));
          }
        }
      }

      // Récupération données Hline
      if (this.hline !== undefined) {
        this.hlineParse = JSON.parse(this.hline);
        let tmpHlineNameParse = [];
        if (this.hlinename !== undefined) {
          tmpHlineNameParse = JSON.parse(this.hlinename);
        }
        if (this.hlinecolor !== undefined) {
          this.tmpHlineColorParse = JSON.parse(this.hlinecolor);
        }

        for (let i = 0; i < this.hlineParse.length; i++) {
          if (tmpHlineNameParse[i] !== undefined) {
            this.hlineNameParse.push(tmpHlineNameParse[i]);
          } else {
            this.hlineNameParse.push('H' + (i + 1));
          }
        }
      }

      let dataLine = [];
      let dataBar = [];
      // Cas où x est numérique
      if (typeof this.xparse[0] === 'number') {
        const xsort = this.xparse.map((a) => a).sort((a, b) => a - b);
        xsort.forEach((k) => {
          const index = this.xparse.findIndex((element) => element === k);
          dataLine.push(this.yparse[index]);
          dataBar.push(this.ybarparse[index]);
        });
        this.labels = xsort;
        this.xAxisType = 'category';
      } else {
        // Cas où x est non numérique
        dataLine = this.yparse;
        dataBar = this.ybarparse;
        this.labels = this.xparse;
        this.xAxisType = 'category';
      }

      this.ymax = Math.max.apply(null, this.hlineParse);

      // Chargement des couleurs
      this.loadColors();

      // Préparation des datasets
      this.datasets = [
        {
          data: dataBar,
          backgroundColor: this.colorBarParse,
          borderColor: this.colorBarParse,
          hoverBorderColor: this.colorBarHover,
          hoverBackgroundColor: this.colorBarHover,
          pointRadius: 5,
          pointHoverRadius: 5,
          barThickness: 32,
          type: 'bar',
          barPercentage: 0.5,
          order: 2,
        },
        {
          data: dataLine,
          backgroundColor: 'rgba(0, 0, 0, 0)',
          borderColor: this.colorParse,
          type: 'line',
          pointRadius: 5,
          pointHoverRadius: 5,
          pointBackgroundColor: this.colorParse,
          pointBorderColor: this.colorParse,
          pointHoverBackgroundColor: this.colorHover,
          pointHoverBorderColor: this.colorHover,
          yAxisID: 'yBar',
          order: 1,
          tension: 0.4,
        },
      ];
    },
    choosePalette() {
      // Using the refactored choosePalette function from utils
      return choosePalette(this.selectedPalette);
    },
    loadColors() {
      const { colorBarParse, colorBarHover, colorParse, colorHover, vlineColorParse, hlineColorParse } = generateBarLineChartColors({
        vlineParse: this.vlineParse,
        hlineParse: this.hlineParse,
        tmpVlineColorParse: this.tmpVlineColorParse,
        tmpHlineColorParse: this.tmpHlineColorParse,
        selectedPalette: this.selectedPalette,
      });

      this.colorBarParse = colorBarParse;
      this.colorBarHover = colorBarHover;
      this.colorParse = colorParse;
      this.colorHover = colorHover;
      this.vlineColorParse = vlineColorParse;
      this.hlineColorParse = hlineColorParse;
    },
    createChart() {
      if (this.chart) this.chart.destroy();

      this.getData();

      const ctx = this.$refs[this.chartId].getContext('2d');

      this.chart = new Chart(ctx, {
        data: {
          labels: this.labels,
          datasets: this.datasets,
        },
        plugins: [
          {
            afterDraw: (chart) => {
              if (chart.tooltip._active && chart.tooltip._active.length) {
                const { ctx } = chart;
                const x = chart.tooltip.getActiveElements()[0].element.tooltipPosition().x;
                const index = chart.tooltip._active[0].index;

                const y = chart.scales.yBar.getPixelForValue(this.yparse[index]);
                const yBar = chart.scales.y.getPixelForValue(this.ybarparse[index]);

                ctx.save();
                ctx.beginPath();
                ctx.moveTo(x, chart.scales.y.top);
                ctx.lineTo(x, chart.scales.y.bottom);
                ctx.lineWidth = 1;
                ctx.strokeStyle = this.colorPrecisionBar;
                ctx.setLineDash([10, 5]);
                ctx.stroke();
                ctx.restore();

                ctx.save();
                ctx.beginPath();
                ctx.moveTo(chart.scales.x.right, y);
                ctx.lineTo(x, y);
                ctx.lineWidth = 1;
                ctx.strokeStyle = this.colorPrecisionBar;
                ctx.setLineDash([10, 5]);
                ctx.stroke();
                ctx.restore();

                ctx.save();
                ctx.beginPath();
                ctx.moveTo(chart.scales.x.left, yBar);
                ctx.lineTo(x, yBar);
                ctx.lineWidth = '1';
                ctx.strokeStyle = this.colorPrecisionBar;
                ctx.setLineDash([10, 5]);
                ctx.stroke();
                ctx.restore();
              }
            },
          },
        ],
        options: {
          aspectRatio: this.aspectRatio,
          scales: {
            x: {
              offset: true,
              type: this.xAxisType,
              grid: {
                drawTicks: true,
                drawOnChartArea: false,
                lineWidth: 1,
              },
            },
            y: {
              type: 'linear',
              position: 'left',
              grid: {
                drawTicks: false,
                lineWidth: 1,
              },
              border: {
                dash: [3],
              },
              ticks: {
                padding: 8,
                suggestedMin: 0,
                suggestedMax: this.ymax,
                maxTicksLimit: 5,
                callback: (value) => {
                  if (value >= 1000000000 || value <= -1000000000) {
                    return value / 1e9 + 'B';
                  } else if (value >= 1000000 || value <= -1000000) {
                    return value / 1e6 + 'M';
                  } else if (value >= 1000 || value <= -1000) {
                    return value / 1e3 + 'K';
                  }
                  return value;
                },
              },
              afterFit: (axis) => {
                this.legendLeftMargin = axis.width;
              },
            },
            yBar: {
              type: 'linear',
              position: 'right',
              id: 'yBar',
              beginAtZero: true,
              grid: {
                drawTicks: false,
                lineWidth: 1,
              },
              border: {
                dash: [3],
              },
              ticks: {
                padding: 8,
                maxTicksLimit: 5,
                suggestedMin: 0,
                callback: (value) => {
                  if (value >= 1000000000 || value <= -1000000000) {
                    return value / 1e9 + 'B';
                  } else if (value >= 1000000 || value <= -1000000) {
                    return value / 1e6 + 'M';
                  } else if (value >= 1000 || value <= -1000) {
                    return value / 1e3 + 'K';
                  }
                  return value;
                },
              },
              afterFit: (axis) => {
                this.legendLeftMargin = axis.width;
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
                    label.push(this.convertIntToHuman(set.data[tooltipItems.dataIndex]));
                  });
                  return label;
                },
                title: (tooltipItems) => {
                  return tooltipItems[0].label;
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
                  const colors = [this.colorBarParse, this.colorParse]; // Adjust to match your color variables

                  // If there is no .tooltip_dot element, set a fallback for nodeName
                  const tooltipDotElement = tooltipEl.querySelector('.tooltip_dot');
                  const nodeName = tooltipDotElement ? tooltipDotElement.attributes[0].nodeName : 'data-attribute';

                  // Iterate over bodyLines to set each line with the correct color and value
                  bodyLines[0].forEach((line, i) => {
                    if (line !== undefined) {
                      const color = colors[i] ? colors[i] : '#000'; // Fallback to black if color is undefined

                      // Détecter si c'est une barre ou une ligne en fonction de l'index
                      const displayValue =
                        i === 0
                          ? `${line}${this.unitTooltipBar ? ' ' + this.unitTooltipBar : ''}` // Barres
                          : `${line}${this.unitTooltip ? ' ' + this.unitTooltip : ''}`; // Lignes

                      divValue.innerHTML += `
                        <div class="tooltip_value-content" style="display: flex; align-items: center;">
                          <span ${nodeName} class="tooltip_dot" style="background-color:${color};"></span>
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
    // eslint-disable-next-line no-unused-vars
    changeColors(theme) {
      this.loadColors();

      // Mise à jour des couleurs dans le graphique
      this.chart.data.datasets.forEach((dataset) => {
        dataset.borderColor = this.colorParse;
        dataset.backgroundColor = this.colorBarParse;
        dataset.pointBorderColor = this.colorParse;
        dataset.pointBackgroundColor = this.colorParse;
        dataset.hoverBorderColor = this.colorHover;
        dataset.hoverBackgroundColor = this.colorBarHover;
        dataset.pointHoverBorderColor = this.colorHover;
        dataset.pointHoverBackgroundColor = this.colorHover;
      });

      this.chart.update('none');
    },
  },
};
</script>

<style scoped lang="scss">
@import '@/styles/Tooltip.scss';
@import '@/styles/Rcol.scss';
@import '@/styles/WidgetContainer.scss';
</style>
