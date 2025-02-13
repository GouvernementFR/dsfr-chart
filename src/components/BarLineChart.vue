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
                <div
                  class="flex fr-mt-3v fr-mb-1v"
                  :style="{ 'border-bottom': '1px solid #e0e0e0' }"
                >
                  <div class="tooltip_value-content">
                    <span
                      class="tooltip_dot"
                      :style="{ 'background-color': colorBarParse }"
                    />
                    <p class="tooltip_place">
                      {{ capitalize(nameBar) }}
                    </p>
                  </div>
                </div>
                <div
                  class="flex fr-mt-3v fr-mb-1v"
                  :style="{ 'border-bottom': '1px solid #e0e0e0' }"
                >
                  <div class="tooltip_value-content">
                    <span
                      class="tooltip_dot"
                      :style="{ 'background-color': colorParse }"
                    />
                    <p class="tooltip_place">
                      {{ capitalize(nameLine) }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <canvas :ref="chartId" />

          <div class="chart_legend fr-mb-0 fr-mt-4v">
            <div class="flex fr-mt-3v fr-mb-1v">
              <span
                class="legende_dot"
                :style="{ 'background-color': colorBarParse }"
              />
              <p class="fr-text--sm fr-text--bold fr-ml-1w fr-mb-0">
                {{ capitalize(nameBar) }}
              </p>
            </div>
            <div class="flex fr-mt-3v fr-mb-1v">
              <span
                class="legende_dot"
                :style="{ 'background-color': colorParse }"
              />
              <p class="fr-text--sm fr-text--bold fr-ml-1w fr-mb-0">
                {{ capitalize(nameLine) }}
              </p>
            </div>
            <div
              v-for="(item, index) in hlineNameParse"
              :key="index"
              class="flex"
            >
              <span
                class="legende_dash_line"
                :style="{ 'background-color': hlineColorParse[index] }"
              />
              <span
                class="legende_dash_line legende_dash_line_end"
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
                class="legende_dash_line"
                :style="{ 'background-color': vlineColorParse[index] }"
              />
              <span
                class="legende_dash_line legende_dash_line_end"
                :style="{ 'background-color': vlineColorParse[index] }"
              />
              <p class="fr-text--sm fr-text--bold fr-ml-1w fr-mb-0">
                {{ capitalize(item) }}
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
import { Chart, LineController, LineElement } from 'chart.js';
import { chartMixins, configureChartDefaults } from '@/utils/global.js';
import { choosePalette, generateBarLineChartColors } from '@/utils/colors.js';

Chart.register(LineController, LineElement);

export default {
  name: 'BarLineChart',
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
    yBar: {
      type: String,
      required: true,
    },
    yLine: {
      type: String,
      required: true,
    },
    xMin: {
      type: [Number, String],
      default: '',
    },
    xMax: {
      type: [Number, String],
      default: '',
    },
    yBarMin: {
      type: [Number, String],
      default: '',
    },
    yBarMax: {
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
    nameBar: {
      type: String,
      default: '',
    },
    nameLine: {
      type: String,
      default: '',
    },
    barSize: {
      type: [Number, String],
      default: 'flex',
    },
    maxBarSize: {
      type: [Number, String],
      default: 32,
    },
    vline: {
      type: String,
      default: '',
    },
    vlinecolor: {
      type: String,
      default: '',
    },
    vlinename: {
      type: String,
      default: '',
    },
    hline: {
      type: String,
      default: '',
    },
    hlinecolor: {
      type: String,
      default: '',
    },
    hlinename: {
      type: String,
      default: '',
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
      default: 'categorical',
    },
    unitTooltipBar: {
      type: String,
      default: '',
    },
    unitTooltipLine: {
      type: String,
      default: '',
    },
  },
  data() {
    this.chart = undefined;

    return {
      widgetId: '',
      chartId: '',
      display: '',
      datasets: [],
      labels: [],
      xparse: [],
      ybarparse: [],
      ylineparse: [],
      vlineParse: [],
      vlineColorParse: [],
      tmpVlineColorParse: [],
      vlineNameParse: [],
      hlineParse: [],
      hlineColorParse: [],
      tmpHlineColorParse: [],
      hlineNameParse: [],
      colorParse: [],
      colorBarParse: [],
      colorHover: [],
      colorBarHover: [],
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
      this.ybarparse = [];
      this.ylineparse = [];
      this.vlineParse = [];
      this.vlineColorParse = [];
      this.tmpVlineColorParse = [];
      this.vlineNameParse = [];
      this.hlineParse = [];
      this.hlineColorParse = [];
      this.tmpHlineColorParse = [];
      this.hlineNameParse = [];
      this.colorParse = [];
      this.colorBarParse = [];
      this.colorHover = [];
      this.colorBarHover = [];
    },
    getData() {
      // Parsing des données
      try {
        this.xparse = JSON.parse(this.x);
        this.ybarparse = JSON.parse(this.yBar);
        this.ylineparse = JSON.parse(this.yLine);
      } catch (error) {
        console.error('Erreur lors du parsing des données x ou y-bar ou y-line:', error);
        return;
      }

      // Récupération données Vline
      if (this.vline) {
        this.vlineParse = JSON.parse(this.vline);
        let tmpVlineNameParse = [];
        if (this.vlinename) {
          tmpVlineNameParse = JSON.parse(this.vlinename);
        }
        if (this.vlinecolor) {
          this.tmpVlineColorParse = JSON.parse(this.vlinecolor);
        }

        for (let i = 0; i < this.vlineParse.length; i++) {
          if (tmpVlineNameParse[i]) {
            this.vlineNameParse.push(tmpVlineNameParse[i]);
          } else {
            this.vlineNameParse.push('V' + (i + 1));
          }
        }
      }

      // Récupération données Hline
      if (this.hline) {
        this.hlineParse = JSON.parse(this.hline);
        let tmpHlineNameParse = [];
        if (this.hlinename) {
          tmpHlineNameParse = JSON.parse(this.hlinename);
        }
        if (this.hlinecolor) {
          this.tmpHlineColorParse = JSON.parse(this.hlinecolor);
        }

        for (let i = 0; i < this.hlineParse.length; i++) {
          if (tmpHlineNameParse[i]) {
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
          dataBar.push(this.ybarparse[index]);
          dataLine.push(this.ylineparse[index]);
        });
        this.labels = xsort;
      } else {
        // Cas où x est non numérique
        dataBar = this.ybarparse;
        dataLine = this.ylineparse;
        this.labels = this.xparse;
      }

      // Chargement des couleurs
      this.loadColors();

      // Préparation des datasets
      this.datasets = [
        {
          data: dataBar,
          type: 'bar',
          borderColor: this.colorBarParse,
          backgroundColor: this.colorBarParse,
          hoverBorderColor: this.colorBarHover,
          hoverBackgroundColor: this.colorBarHover,
          pointRadius: 5,
          pointHoverRadius: 5,
          barThickness: this.barSize,
          ...(this.maxBarSize ? { maxBarThickness: this.maxBarSize } : {}),
          barPercentage: 0.5,
        },
        {
          data: dataLine,
          type: 'line',
          borderColor: this.colorParse,
          backgroundColor: 'rgba(0, 0, 0, 0)',
          pointBorderColor: this.colorParse,
          pointBackgroundColor: this.colorParse,
          pointHoverBorderColor: this.colorHover,
          pointHoverBackgroundColor: this.colorHover,
          pointRadius: 5,
          pointHoverRadius: 5,
          yAxisID: 'yLine',
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
              if (chart.tooltip?._active && chart.tooltip?._active.length) {
                const { ctx } = chart;
                const x = chart.tooltip.getActiveElements()[0].element.tooltipPosition().x;
                const index = chart.tooltip._active[0].index;

                const yBar = chart.scales.y.getPixelForValue(this.ybarparse[index]);
                const yLine = chart.scales.yLine.getPixelForValue(this.ylineparse[index]);

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
                ctx.moveTo(chart.scales.x.right, yLine);
                ctx.lineTo(x, yLine);
                ctx.lineWidth = 1;
                ctx.strokeStyle = this.colorPrecisionBar;
                ctx.setLineDash([10, 5]);
                ctx.stroke();
                ctx.restore();

                ctx.save();
                ctx.beginPath();
                ctx.moveTo(chart.scales.x.left, yBar);
                ctx.lineTo(x, yBar);
                ctx.lineWidth = 1;
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
              grid: {
                drawTicks: false,
              },
              border: {
                dash: [3],
              },
              ticks: {
                padding: 10,
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
              ...(this.yBarMin ? { suggestedMin: this.yBarMin } : {}),
              ...(this.yBarMax ? { suggestedMax: this.yBarMax } : {}),
            },
            yLine: {
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
              ...(this.yLineMin ? { suggestedMin: this.yLineMin } : {}),
              ...(this.yLineMax ? { suggestedMax: this.yLineMax } : {}),
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
                  const colors = [this.colorBarParse, this.colorParse]; // Adjust to match your color variables

                  // Iterate over bodyLines to set each line with the correct color and value
                  bodyLines[0].forEach((line, i) => {
                    if (line) {
                      const color = colors[i] ? colors[i] : '#000';

                      // Détecter si c'est une barre ou une ligne en fonction de l'index
                      const displayValue = i === 0 ? `${line}${this.unitTooltipBar ? ' ' + this.unitTooltipBar : ''}` : `${line}${this.unitTooltipLine ? ' ' + this.unitTooltipLine : ''}`;

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
