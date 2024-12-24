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
          <div class="flex fr-mt-1w fr-mb-0">
            <span class="legende_dot" />
            <p class="fr-text--sm fr-text--bold fr-ml-1w fr-mb-0">
              {{ capitalize(name) }}
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
          class="flex fr-mt-3v fr-mb-1v"
          :style="{ 'margin-left': isSmall ? '0px' : style }"
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
import { Chart, LineController, LineElement } from 'chart.js';
import { mixin, configureChartDefaults } from '@/utils/global.js';
import { choosePalette, generateBarLineChartColors } from '@/utils/colors.js';

Chart.register(LineController, LineElement);

export default {
  name: 'LineChart',
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
      default: 'S1',
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
      legendLeftMargin: 0,
      datasets: [],
      xAxisType: 'category',
      labels: undefined,
      xparse: [],
      yparse: [],
      vlineParse: [],
      vlineColorParse: [],
      tmpVlineColorParse: [],
      vlineNameParse: [],
      nameParse: [],
      hlineParse: [],
      hlineColorParse: [],
      tmpHlineColorParse: [],
      hlineNameParse: [],
      ymax: 0,
      colorParse: '',
      colorHover: '',
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
    this.widgetId = 'widget' + Math.floor(Math.random() * 1000);
    this.chartId = 'myChart' + Math.floor(Math.random() * 1000);
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
      this.datasets = [];
      this.xAxisType = 'category';
      this.labels = undefined;
      this.xparse = [];
      this.yparse = [];
      this.vlineParse = [];
      this.vlineColorParse = [];
      this.tmpVlineColorParse = [];
      this.vlineNameParse = [];
      this.hlineParse = [];
      this.hlineColorParse = [];
      this.tmpHlineColorParse = [];
      this.hlineNameParse = [];
      this.ymax = 0;
      this.colorParse = '';
      this.colorHover = '';
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
      // Cas où x est numérique
      if (typeof this.xparse[0] === 'number') {
        const xsort = this.xparse.map((a) => a).sort((a, b) => a - b);
        xsort.forEach((k) => {
          const index = this.xparse.findIndex((element) => element === k);
          dataLine.push({
            x: k,
            y: this.yparse[index],
          });
        });
        this.labels = xsort;
        this.xAxisType = 'linear';
      } else {
        // Cas où x est non numérique
        dataLine = this.yparse;
        this.labels = this.xparse;
        this.xAxisType = 'category';
      }

      this.ymax = Math.max.apply(null, this.hlineParse);

      // Chargement des couleurs
      this.loadColors();

      // Préparation des datasets
      this.datasets = [
        {
          label: this.name,
          data: dataLine,
          borderColor: this.colorParse,
          backgroundColor: 'rgba(0, 0, 0, 0)',
          pointRadius: 5,
          pointHoverRadius: 5,
          pointBackgroundColor: this.colorParse,
          pointBorderColor: this.colorParse,
          pointHoverBackgroundColor: this.colorHover,
          pointHoverBorderColor: this.colorHover,
          borderWidth: 2,
          fill: false,
          tension: 0.4,
        },
      ];
    },
    loadColors() {
      const { colorParse, colorHover, vlineColorParse, hlineColorParse } = generateBarLineChartColors({
        vlineParse: this.vlineParse,
        hlineParse: this.hlineParse,
        tmpVlineColorParse: this.tmpVlineColorParse,
        tmpHlineColorParse: this.tmpHlineColorParse,
        selectedPalette: this.selectedPalette,
      });

      // Assignation des couleurs générées
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
      this.chart.data.datasets.forEach((dataset) => {
        dataset.borderColor = this.colorParse;
        dataset.backgroundColor = this.colorParse;
        dataset.pointBorderColor = this.colorParse;
        dataset.pointBackgroundColor = this.colorParse;
        dataset.hoverBorderColor = this.colorHover;
        dataset.hoverBackgroundColor = this.colorHover;
        dataset.pointHoverBorderColor = this.colorHover;
        dataset.pointHoverBackgroundColor = this.colorHover;
      });

      this.chart.update('none');
    },
    createChart() {
      if (this.chart) this.chart.destroy();

      this.getData();

      const ctx = this.$refs[this.chartId].getContext('2d');

      this.chart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: this.labels,
          datasets: this.datasets,
        },
        plugins: [
          {
            afterDraw: (chart) => {
              if (chart.tooltip._active && chart.tooltip._active.length) {
                const { ctx } = chart;
                const activePoint = chart.tooltip.getActiveElements()[0];
                const x = activePoint.element.tooltipPosition().x;
                const y = activePoint.element.tooltipPosition().y;

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
                ctx.moveTo(chart.scales.x.left, y);
                ctx.lineTo(chart.scales.x.right, y);
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
          responsive: true,
          aspectRatio: this.aspectRatio,
          scales: {
            x: {
              offset: true,
              type: this.xAxisType,
              grid: {
                drawTicks: false,
                drawOnChartArea: false,
                lineWidth: 1,
              },
              border: {
                dash: [3],
              },
              ticks: {
                padding: 10, // Espace supplémentaire autour des étiquettes
                labelOffset: 10,
                callback: (value) => {
                  if (this.formatDate) {
                    const date = new Date(value);
                    return date.getMonth() + 1 + '/' + date.getFullYear();
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
              suggestedMax: this.ymax,
              ticks: {
                position: 'left',
                padding: 10, // Espace supplémentaire autour des étiquettes
                maxTicksLimit: 5,
                callback: (value) => {
                  if (value >= 1e9 || value <= -1e9) {
                    return value / 1e9 + 'B';
                  } else if (value >= 1e6 || value <= -1e6) {
                    return value / 1e6 + 'M';
                  } else if (value >= 1e3 || value <= -1e3) {
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
              mode: 'index',
              intersect: false,
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

                if (tooltipModel.body) {
                  const titleLines = tooltipModel.title || [];
                  const bodyLines = tooltipModel.body.map((bodyItem) => {
                    return bodyItem.lines;
                  });

                  // Set tooltip header
                  const divDate = tooltipEl.querySelector('.tooltip_header.fr-text--sm.fr-mb-0');
                  divDate.innerHTML = titleLines[0];

                  // Clear existing tooltip content
                  const divValue = tooltipEl.querySelector('.tooltip_value');
                  divValue.innerHTML = '';

                  // Iterate through each line in the body and add formatted HTML
                  bodyLines.forEach((line, i) => {
                    if (line !== undefined) {
                      const color = Array.isArray(this.colorParse) ? this.colorParse[i] : this.colorParse;

                      // Extraire uniquement la valeur numérique sans le texte "Prix moyen en euros"
                      const valueOnly = line[0].replace(this.name + ': ', ''); // Enlever le nom depuis le prop `name`

                      divValue.innerHTML += `
                        <div class="tooltip_value-content" style="display: flex; justify-content: space-between; align-items: center;">
                          <span class="tooltip_dot" style="background-color: ${color};"></span>
                          <p class="tooltip_place fr-mb-0">${valueOnly}${this.unitTooltip ? ' ' + this.unitTooltip : ''}</p>
                        </div>
                      `;
                    }
                  });
                }

                const positionX = this.chart.canvas.offsetLeft;
                const positionY = this.chart.canvas.offsetTop;

                tooltipEl.style.position = 'absolute';
                tooltipEl.style.pointerEvents = 'none';

                let tooltipX = positionX + tooltipModel.caretX + 10;
                let tooltipY = positionY + tooltipModel.caretY - 18;

                const canvasWidth = this.chart.canvas.clientWidth;
                const canvasHeight = this.chart.canvas.clientHeight;

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
  },
};
</script>

<style scoped lang="scss">
@import '@/styles/Tooltip.scss';
@import '@/styles/Rcol.scss';
@import '@/styles/WidgetContainer.scss';
</style>
