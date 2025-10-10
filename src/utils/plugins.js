export const plugins = {
  hoverAxisLines: {
    /**
     * This function needs to access the chart context (this) to get the props values,
     * it must be bound to the component instance, to be used as a plugin.
     * @example
     *
     * ```js
     * const plugins = [
        {
          id: 'hoverAxisLines',
          beforeDraw: plugins.hoverAxisLines.afterDraw_2D.call(this, dataset1, dataset2),
        },
      ]
     * ```
     */
    afterDraw_2D: (dataset1, dataset2) => function(chart) {
      if (chart.tooltip?._active && chart.tooltip?._active.length) {
        const { ctx } = chart;
        const x = chart.tooltip.getActiveElements()[0].element.tooltipPosition().x;
        const index = chart.tooltip._active[0].index;

        const yAreas = chart.scales.y.getPixelForValue(dataset1[index]);
        const yLines = chart.scales.y.getPixelForValue(dataset2[index]);

        // Ligne verticale
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(x, chart.scales.y.top);
        ctx.lineTo(x, chart.scales.y.bottom);
        ctx.lineWidth = 1;
        ctx.strokeStyle = this.colorPrecisionBar;
        ctx.setLineDash([10, 5]);
        ctx.stroke();
        ctx.restore();

        // Ligne horizontale sur area
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(chart.scales.x.left, yAreas);
        ctx.lineTo(x, yAreas);
        ctx.lineWidth = 1;
        ctx.strokeStyle = this.colorPrecisionBar;
        ctx.setLineDash([10, 5]);
        ctx.stroke();
        ctx.restore();

        // Ligne horizontale sur line
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(chart.scales.x.left, yLines);
        ctx.lineTo(x, yLines);
        ctx.lineWidth = 1;
        ctx.strokeStyle = this.colorPrecisionBar;
        ctx.setLineDash([10, 5]);
        ctx.stroke();
        ctx.restore();
      }
    },
    /**
     * This function needs to access the chart context (this) to get the props values,
     * it must be bound to the component instance, to be used as a plugin.
     * @example
     *
     * ```js
     * const plugins = [
        {
          id: 'hoverAxisLines',
          beforeDraw: plugins.hoverAxisLines.afterDraw_1D.call(this, dataset1),
        },
      ]
     * ```
     */
    afterDraw_1D: (dataset1) => function(chart) {
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

        dataset1.forEach((i) => {
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
  pointLabels: {
    /**
     * This function needs to access the chart context (this) to get the props values,
     * it must be bound to the component instance, to be used as a plugin.
     * @example
     *
     * ```js
     * const plugins = [
        {
          id: 'pointLabels',
          beforeDraw: plugins.pointLabels.afterDatasetsDraw.call(this, indexesWithLabels),
        },
      ]
     * ```
     */
    afterDatasetsDraw: (indexesWithLabels) => function(chart) {
      const { ctx, chartArea } = chart;
      const drawnBoxes = [];
      const padding = 2; // marge intérieure minimale avec le bord du chart

      chart.data.datasets.forEach((dataset, i) => {
        const meta = chart.getDatasetMeta(i);
        if (meta.hidden) return;

        meta.data.forEach((point, index) => {
          if (!indexesWithLabels[i] || !indexesWithLabels[i].includes(index)) return;

          const value = dataset.data[index];
          const text = value.y !== undefined ? value.y : value;
          const fontSize = 12;

          ctx.font = `${fontSize}px sans-serif`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'bottom';

          let x = point.x;
          let y = point.y - 10;

          const textWidth = ctx.measureText(text).width;
          const textHeight = fontSize;

          const box = {
            left: x - textWidth / 2,
            right: x + textWidth / 2,
            top: y - textHeight,
            bottom: y,
          };

          if (box.left < chartArea.left + padding) {
            x += (chartArea.left + padding) - box.left;
          }
          if (box.right > chartArea.right - padding) {
            x -= box.right - (chartArea.right - padding);
          }
          if (box.top < chartArea.top + padding) {
            y += (chartArea.top + padding) - box.top;
          }
          if (box.bottom > chartArea.bottom - padding) {
            y -= box.bottom - (chartArea.bottom - padding);
          }

          const adjustedBox = {
            left: x - textWidth / 2,
            right: x + textWidth / 2,
            top: y - textHeight,
            bottom: y,
          };

          const overlaps = drawnBoxes.some(b =>
            !(adjustedBox.right < b.left || adjustedBox.left > b.right || adjustedBox.bottom < b.top || adjustedBox.top > b.bottom)
          );
          if (overlaps) return;

          ctx.fillStyle = '#333';
          ctx.fillText(text, x, y);

          drawnBoxes.push(adjustedBox);
        });
      });
    },
  },
  highlightZone: {
    /**
     * This function needs to access the chart context (this) to get the props values,
     * it must be bound to the component instance, to be used as a plugin.
     * @example
     *
     * ```js
     * const plugins = [
        {
          id: 'highlightZone',
          beforeDraw: plugins.highlightZone.beforeDraw.bind(this),
        },
      ]
     * ```
     */
    beforeDraw: function (chart) {
      const { ctx, chartArea, scales } = chart;
      const start = this.highlightStart;
      const end = this.highlightEnd;

      if (!start || !end) return;

      const xStart = scales.x.getPixelForValue(start);
      const xEnd = scales.x.getPixelForValue(end);

      // === Zone grisée ===
      ctx.save();
      ctx.fillStyle = 'rgba(150, 150, 150, 0.15)';
      ctx.fillRect(xStart, chartArea.top, xEnd - xStart, chartArea.bottom - chartArea.top);

      // === Bordures ===
      ctx.strokeStyle = 'rgba(150, 150, 150, 0.25)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(xStart, chartArea.top);
      ctx.lineTo(xStart, chartArea.bottom);
      ctx.moveTo(xEnd, chartArea.top);
      ctx.lineTo(xEnd, chartArea.bottom);
      ctx.stroke();

      // === Texte optionnel ===
      if (this.highlightLabel) {
        ctx.fillStyle = this.highlightLabelColor;
        ctx.font = `${this.highlightLabelSize}px sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        const textX = (xStart + xEnd) / 2;
        let textY = chartArea.top + 20;

        if (this.highlightLabelPosition === 'middle')
          textY = chartArea.top + (chartArea.bottom - chartArea.top) / 2;
        else if (this.highlightLabelPosition === 'bottom')
          textY = chartArea.bottom - 20;

        ctx.fillText(this.highlightLabel, textX, textY);
      }

      ctx.restore();
    },
  },
}