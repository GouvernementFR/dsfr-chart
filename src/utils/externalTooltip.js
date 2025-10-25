// Gestionnaire de tooltip externe partagé pour Chart.js utilisé par les différents graphiques
export function externalTooltip(context, component, opts = {}) {
  const dom = document.getElementById(component.databoxId + '-' + component.databoxType + '-' + component.databoxSource) || component.$el.nextElementSibling;

  const tooltipEl = dom ? dom.querySelector('.tooltip') : null;
  const tooltipModel = context.tooltip;

  if (!tooltipEl) return;

  // Masquer si aucun tooltip
  if (!tooltipModel || tooltipModel.opacity === 0) {
    tooltipEl.style.opacity = 0;
    return;
  }

  // Définir les classes de position du tooltip
  tooltipEl.classList.remove('above', 'below', 'no-transform');
  if (tooltipModel.yAlign) {
    tooltipEl.classList.add(tooltipModel.yAlign);
  } else {
    tooltipEl.classList.add('no-transform');
  }

  // Définir le texte
  if (tooltipModel.body) {
    const titleLines = tooltipModel.title || [];
    const bodyLines = tooltipModel.body.map((bodyItem) => bodyItem.lines);
    const dataPoints = tooltipModel.dataPoints || [];

  // Définir l'en-tête du tooltip
    const divDate = tooltipEl.querySelector('.tooltip_header.fr-text--sm.fr-mb-0');
    if (divDate) divDate.innerHTML = titleLines[0] || '';

  // Vider le contenu existant du tooltip
    const divValue = tooltipEl.querySelector('.tooltip_value');
    if (divValue) divValue.innerHTML = '';

    const unit = opts.unitTooltip ?? component.unitTooltip;
    const unitLookup = opts.unitLookup;
    const colorResolver = opts.colorResolver;

  // Privilégier l'itération sur dataPoints si présent afin de pouvoir mapper datasetIndex/dataIndex -> couleur correctement
    if (dataPoints.length > 0) {
      dataPoints.forEach((dp, idx) => {
        const line = (bodyLines[0] || [])[idx];
        if (line === undefined || line === null) return;
        const resolvedUnit = typeof unitLookup === 'function' ? unitLookup(idx, dp) : unit;

        let color = '#000';
        if (typeof colorResolver === 'function') {
          color = colorResolver(component, idx, dp.datasetIndex, dp.dataIndex) || color;
        } else if (component.colorParse) {
          // Essayer les formes courantes de colorParse (tableau plat ou tableau de tableaux par dataset)
          if (Array.isArray(component.colorParse[dp.datasetIndex]) && component.colorParse[dp.datasetIndex][dp.dataIndex]) {
            color = component.colorParse[dp.datasetIndex][dp.dataIndex];
          } else if (component.colorParse[idx]) {
            color = component.colorParse[idx];
          }
        }

        divValue.innerHTML += `
          <div class="tooltip_value-content">
            <span class="tooltip_dot" style="background-color:${color};"></span>
            <p class="tooltip_place fr-mb-0">${line}${resolvedUnit ? ' ' + resolvedUnit : ''}</p>
          </div>
        `;
      });
    } else {
  // Repli : itérer sur le premier tableau bodyLines
      (bodyLines[0] || []).forEach((line, i) => {
        if (line === undefined || line === null) return;
        const resolvedUnit = typeof unitLookup === 'function' ? unitLookup(i) : unit;
        const color = (component.colorParse && component.colorParse[i]) || '#000';
        divValue.innerHTML += `
          <div class="tooltip_value-content">
            <span class="tooltip_dot" style="background-color:${color};"></span>
            <p class="tooltip_place fr-mb-0">${line}${resolvedUnit ? ' ' + resolvedUnit : ''}</p>
          </div>
        `;
      });
    }
  }

  // Positionner le tooltip
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
