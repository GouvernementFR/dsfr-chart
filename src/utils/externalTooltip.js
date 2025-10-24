// Shared external tooltip handler for Chart.js used across charts
export function externalTooltip(context, component, opts = {}) {
  const dom = document.getElementById(component.databoxId + '-' + component.databoxType + '-' + component.databoxSource) || component.$el.nextElementSibling;

  const tooltipEl = dom ? dom.querySelector('.tooltip') : null;
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
    const bodyLines = tooltipModel.body.map((bodyItem) => bodyItem.lines);

    // Set the tooltip header
    const divDate = tooltipEl.querySelector('.tooltip_header.fr-text--sm.fr-mb-0');
    if (divDate) divDate.innerHTML = titleLines[0] || '';

    // Clear the existing tooltip content
    const divValue = tooltipEl.querySelector('.tooltip_value');
    if (divValue) divValue.innerHTML = '';

    // If series colors are present on the component, use them; fallback to neutral
    const colors = component.colorParse || [];
      const unit = opts.unitTooltip ?? component.unitTooltip;
      const unitLookup = opts.unitLookup;

      // Iterate over bodyLines to set the color and value in the tooltip
      (bodyLines[0] || []).forEach((line, i) => {
        const resolvedUnit = typeof unitLookup === 'function' ? unitLookup(i) : unit;
        const displayValue = line !== undefined && line !== null ? `${line}${resolvedUnit ? ' ' + resolvedUnit : ''}` : '';
        if (line) {
          divValue.innerHTML += `
            <div class="tooltip_value-content">
              <span class="tooltip_dot" style="background-color:${colors[i] || '#000'};"></span>
              <p class="tooltip_place fr-mb-0">${displayValue}</p>
            </div>
          `;
        }
      });
  }

  // Position the tooltip
  const { offsetLeft: positionX, offsetTop: positionY } = component.chart.canvas;

  const canvasWidth = Number(component.chart.canvas.style.width.replace(/\D/g, ''));
  const canvasHeight = Number(component.chart.canvas.style.height.replace(/\D/g, ''));

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
}

export default externalTooltip;
