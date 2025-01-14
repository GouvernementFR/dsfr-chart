<template>
  <Teleport
    :disabled="!databoxId && !databoxType && databoxSource === 'default'"
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
            :style="{ 'margin-left': isSmall ? '0px' : style }"
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
            :style="{ 'margin-left': isSmall ? '0px' : style }"
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
  </Teleport>
</template>

<script>
import { Chart, ScatterController } from 'chart.js';
import { mixin, configureChartDefaults } from '@/utils/global.js';
import { choosePalette, generateScatterChartColors } from '@/utils/colors.js';

Chart.register(ScatterController);

export default {
  name: 'ScatterChart',
  mixins: [mixin],
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
    name: {
      type: String,
      default: undefined,
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
    pointRadius: {
      type: Number,
      default: 5,
    },
    showLine: {
      type: [Boolean, String],
      default: false,
    },
    date: {
      type: String,
      default: undefined,
    },
    aspectRatio: {
      type: Number,
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
    highlightIndex: {
      type: Number,
      default: -1,
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
      xAxisType: 'category',
      labels: undefined,
      opacity: [],
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
      ymax: 0,
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
      this.datasets = [];
      this.xAxisType = 'category';
      this.labels = undefined;
      this.opacity = [];
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
      this.ymax = 0;
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
          this.nameParse.push('Série ' + (i + 1));
        }
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

      // Formatage des données
      let data = [];
      // Cas où x est numérique
      if (typeof this.xparse[0][0] === 'number') {
        const allX = [];
        this.xparse.forEach((xj, j) => {
          const dj = [];
          const xsort = xj.map((a) => a).sort((a, b) => a - b);
          xsort.forEach((k) => {
            const index = xj.findIndex((element) => element === k);
            dj.push({
              x: k,
              y: this.yparse[j][index],
            });
            if (!allX.includes(k)) {
              allX.push(k);
            }
          });
          data.push(dj);
        });
        this.labels = undefined;
        this.xAxisType = 'linear';
      } else {
        // Cas où x est non numérique
        data = this.yparse;
        this.labels = this.xparse[0];
        this.xAxisType = 'category';
      }

      this.ymax = Math.max.apply(null, this.hlineParse);

      // Chargement des couleurs
      this.loadColors();

      // Préparation des datasets
      this.datasets = data.map((dataSet, index) => ({
        data: dataSet,
        fill: false,
        borderColor: this.colorParse[index],
        backgroundColor: this.colorParse[index],
        pointRadius: this.pointRadius,
        pointHoverRadius: this.pointRadius,
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

                this.yparse.forEach((yj) => {
                  let y = chart.scales.y.getPixelForValue(yj[index]);
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
              type: this.xAxisType,
              grid: {
                drawOnChartArea: false,
                lineWidth: 1,
              },
              ticks: {
                callback: (value) => {
                  if (this.formatDate) {
                    return value.toString().substring(5, 7) + '/' + value.toString().substring(0, 4);
                  } else {
                    return value;
                  }
                },
              },
            },
            y: {
              grid: {
                drawTicks: false,
                lineWidth: 1,
              },
              border: {
                dash: [3],
              },
              ticks: {
                padding: 4,
                autoSkip: true,
                maxTicksLimit: 5,
                suggestedMax: this.ymax,
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
                  this.datasets.forEach((set, i) => {
                    if (this.xAxisType === 'linear') {
                      const index = this.xparse[i].indexOf(tooltipItems.parsed.x);
                      if (index !== -1) {
                        label.push(this.convertIntToHuman(this.yparse[i][index]));
                      } else {
                        label.push(undefined);
                      }
                    } else {
                      label.push(this.convertIntToHuman(set.data[tooltipItems.dataIndex]));
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
                const dom = this.databoxId ? document.getElementById(this.databoxId + '-' + this.databoxType + '-' + this.databoxSource) : this.$el.nextElementSibling;

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
                  bodyLines[0].forEach((line, i) => {
                    const displayValue = `${line}${this.unitTooltip ? ' ' + this.unitTooltip : ''}`;
                    if (line !== undefined) {
                      divValue.innerHTML += `
                      <div class="tooltip_value-content">
                        <span class="tooltip_dot" style="background-color:${this.colorParse[i]};"></span>
                        <p class="tooltip_place fr-mb-0">${displayValue}</p>
                      </div>
                    `;
                    }
                  });
                }

                const { offsetLeft: positionX, offsetTop: positionY } = this.chart.canvas;

                const canvasWidth = Number(this.chart.canvas.style.width.replace(/\D/g, ''));
                const canvasHeight = Number(this.chart.canvas.style.height.replace(/\D/g, ''));
                tooltipEl.style.position = 'absolute';
                tooltipEl.style.padding = tooltipModel.padding + 'px ' + tooltipModel.padding + 'px';
                tooltipEl.style.pointerEvents = 'none';
                let tooltipX = positionX + tooltipModel.caretX + 10;
                let tooltipY = positionY + tooltipModel.caretY - 18;
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
        highlightIndex: this.highlightIndex,
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
    // eslint-disable-next-line no-unused-vars
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

      this.chart.update('none');
    },
  },
};
</script>

<style scoped lang="scss">

</style>
