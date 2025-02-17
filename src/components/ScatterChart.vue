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
            v-for="(item, index) in hlineNameParse"
            :key="index"
            class="flex fr-mt-3v"
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
            class="flex fr-mt-3v fr-mb-1v"
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
              {{ capitalize(name) }}
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
  </Teleport>
</template>

<script>
import { Chart, ScatterController } from 'chart.js';
import { chartMixins, configureChartDefaults } from '@/utils/global.js';
import { choosePalette, generateScatterChartColors } from '@/utils/colors.js';

Chart.register(ScatterController);

export default {
  name: 'ScatterChart',
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
    xMin: {
      type: [Number, String],
      default: '',
    },
    xMax: {
      type: [Number, String],
      default: '',
    },
    yMin: {
      type: [Number, String],
      default: '',
    },
    yMax: {
      type: [Number, String],
      default: '',
    },
    name: {
      type: String,
      default: '',
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
    showLine: {
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
    formatDate: {
      type: [Boolean, String],
      default: false,
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
      display: '',
      datasets: [],
      xAxisType: 'category',
      labels: [],
      xparse: [],
      yparse: [],
      nameParse: [],
      tmpColorParse: [],
      colorParse: [],
      vlineParse: [],
      vlineColorParse: [],
      tmpVlineColorParse: [],
      vlineNameParse: [],
      hlineParse: [],
      hlineColorParse: [],
      tmpHlineColorParse: [],
      hlineNameParse: [],
      colorHover: [],
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
      this.datasets = [];
      this.xAxisType = 'category';
      this.labels = [];
      this.xparse = [];
      this.yparse = [];
      this.nameParse = [];
      this.tmpColorParse = [];
      this.colorParse = [];
      this.vlineParse = [];
      this.vlineColorParse = [];
      this.tmpVlineColorParse = [];
      this.vlineNameParse = [];
      this.hlineParse = [];
      this.hlineColorParse = [];
      this.tmpHlineColorParse = [];
      this.hlineNameParse = [];
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
      if (this.name) {
        try {
          tmpNameParse = JSON.parse(this.name);
        } catch (error) {
          console.error('Erreur lors du parsing de name:', error);
        }
      }

      for (let i = 0; i < this.yparse.length; i++) {
        if (tmpNameParse[i]) {
          this.nameParse.push(tmpNameParse[i]);
        } else {
          this.nameParse.push('Série ' + (i + 1));
        }
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

      // Formatage des données
      let data = [];
      // Cas où x est numérique
      if (typeof this.xparse[0][0] === 'number') {
        const allX = [];
        this.xparse.forEach((x, i) => {
          const dj = [];
          const xsort = x.map((a) => a).sort((a, b) => a - b);
          xsort.forEach((k) => {
            const index = x.findIndex((element) => element === k);
            dj.push({
              x: k,
              y: this.yparse[i][index],
            });
            if (!allX.includes(k)) {
              allX.push(k);
            }
          });
          data.push(dj);
        });
        this.labels = [];
        this.xAxisType = 'linear';
      } else {
        // Cas où x est non numérique
        data = this.yparse;
        this.labels = this.xparse[0];
        this.xAxisType = 'category';
      }

      // Chargement des couleurs
      this.loadColors();

      // Préparation des datasets
      this.datasets = data.map((dataSet, index) => ({
        data: dataSet,
        fill: false,
        borderColor: this.colorParse[index],
        backgroundColor: this.colorParse[index],
        pointRadius: 5,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: this.colorHover[index],
        pointHoverBorderColor: this.colorHover[index],
        showLine: this.showLine,
        borderWidth: 2,
        tension: 0.4,
      }));
    },
    createChart() {
      if (this.chart) this.chart.destroy();

      this.getData();

      const ctx = this.$refs[this.chartId].getContext('2d');

      this.chart = new Chart(ctx, {
        type: 'scatter',
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

                ctx.save();
                ctx.beginPath();
                ctx.moveTo(x, chart.scales.y.top);
                ctx.lineTo(x, chart.scales.y.bottom);
                ctx.lineWidth = 1;
                ctx.strokeStyle = this.colorPrecisionBar;
                ctx.setLineDash([10, 5]);
                ctx.stroke();
                ctx.restore();

                this.yparse.forEach((i) => {
                  let y = chart.scales.y.getPixelForValue(i[index]);
                  ctx.save();
                  ctx.beginPath();
                  ctx.moveTo(chart.scales.x.left, y);
                  ctx.lineTo(chart.scales.x.right, y);
                  ctx.lineWidth = 1;
                  ctx.strokeStyle = this.colorPrecisionBar;
                  ctx.setLineDash([10, 5]);
                  ctx.stroke();
                  ctx.restore();
                });
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
                drawOnChartArea: false,
              },
              ticks: {
                padding: 10,
              },
              ...(this.xMin ? { suggestedMin: this.xMin } : {}),
              ...(this.xMax ? { suggestedMax: this.xMax } : {}),
            },
            y: {
              grid: {
                drawTicks: false,
              },
              border: {
                dash: [3],
              },
              ticks: {
                padding: 5,
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
              ...(this.yMin ? { suggestedMin: this.yMin } : {}),
              ...(this.yMax ? { suggestedMax: this.yMax } : {}),
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
                  this.datasets.forEach((set, i) => {
                    if (this.xAxisType === 'linear') {
                      const index = this.xparse[i].indexOf(tooltipItems.parsed.x);
                      if (index !== -1) {
                        label.push(this.formatNumber(this.yparse[i][index]));
                      }
                    } else {
                      label.push(this.formatNumber(set.data[tooltipItems.dataIndex]));
                    }
                  });
                  return label;
                },
                title: (tooltipItems) => {
                  return tooltipItems[0].parsed.x;
                },
                labelTextColor: () => {
                  return this.colorParse;
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

                  const divDate = tooltipEl.querySelector('.tooltip_header.fr-text--sm.fr-mb-0');
                  divDate.innerHTML = titleLines[0];

                  const divValue = tooltipEl.querySelector('.tooltip_value');
                  divValue.innerHTML = '';

                  // Iterate over bodyLines to set the color and value in the tooltip
                  bodyLines[0].forEach((line, i) => {
                    const displayValue = `${line}${this.unitTooltip ? ' ' + this.unitTooltip : ''}`;
                    if (line) {
                      divValue.innerHTML += `
                        <div class="tooltip_value-content">
                          <span class="tooltip_dot" style="background-color:${this.colorParse[i]};"></span>
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
    loadColors() {
      const { colorParse, colorHover, vlineColorParse, hlineColorParse } = generateScatterChartColors({
        yparse: this.yparse,
        tmpColorParse: this.tmpColorParse,
        selectedPalette: this.selectedPalette,
        vlineParse: this.vlineParse,
        tmpVlineColorParse: this.tmpVlineColorParse,
        hlineParse: this.hlineParse,
        tmpHlineColorParse: this.tmpHlineColorParse,
      });

      this.colorParse = colorParse;
      this.colorHover = colorHover;
      this.vlineColorParse = vlineColorParse;
      this.hlineColorParse = hlineColorParse;
    },
    choosePalette() {
      // Using the refactored choosePalette function from utils
      return choosePalette(this.selectedPalette);
    },
    changeColors(theme) {
      this.loadColors();

      // Mise à jour des couleurs dans le graphique
      this.chart.data.datasets.forEach((dataset, i) => {
        dataset.borderColor = this.colorParse[i];
        dataset.backgroundColor = this.colorParse[i];
        dataset.pointBorderColor = this.colorParse[i];
        dataset.pointBackgroundColor = this.colorParse[i];
        dataset.hoverBorderColor = this.colorHover[i];
        dataset.hoverBackgroundColor = this.colorHover[i];
        dataset.pointHoverBorderColor = this.colorHover[i];
        dataset.pointHoverBackgroundColor = this.colorHover[i];
      });

      this.chart.options.scales.x.ticks.color = theme === 'dark' ? '#cecece' : Chart.defaults.color;
      this.chart.options.scales.y.ticks.color = theme === 'dark' ? '#cecece' : Chart.defaults.color;

      this.chart.update('none');
    },
  },
};
</script>

<style scoped lang="scss">

</style>
