/* eslint-disable */
import chroma from 'chroma-js';
import {
    getDefaultColor, getColorsByIndex,
    getNeutralColor,
    choosePalette
  } from '@/utils/global.js';

/**
 * Génère des couleurs pour un graphique.
 * @param {Object} options - Options pour configurer les couleurs.
 * @param {Array} options.yparse - Données pour lesquelles les couleurs doivent être générées.
 * @param {Array} options.tmpColorParse - Couleurs personnalisées pour chaque série.
 * @param {Array} options.highlightIndex - Indices des données à mettre en surbrillance.
 * @param {string} options.selectedPalette - Palette sélectionnée pour générer les couleurs.
 * @param {boolean} options.reverseOrder - Indique si les couleurs doivent être inversées.
 * @returns {Object} - Couleurs générées.
 */
export function generateColors({
    yparse = [],
    tmpColorParse = [],
    highlightIndex = [],
    selectedPalette = '',
    reverseOrder = false
}) {
    const colorParse = [];
    const colorHover = [];
    const palette = choosePalette(selectedPalette);

    // Si nécessaire, inverser l'ordre des données (divergentDescending)
    const adjustedYparse = reverseOrder ? [...yparse].reverse() : yparse;

    // Génération des couleurs pour chaque série de données
    for (let i = 0; i < adjustedYparse.length; i++) {
        const dataSet = adjustedYparse[i];
        let colors = [];
        let hoverColors = [];

        if (tmpColorParse[i] !== undefined) {
            // Couleur personnalisée
            const color = tmpColorParse[i];
            const dataLength = dataSet && dataSet.length ? dataSet.length : 1;
            colors = Array(dataLength).fill(color);
            hoverColors = colors.map(c => chroma(c).darken(0.8).hex());
        } else if (selectedPalette === 'neutral' && highlightIndex.length > 0 && Array.isArray(dataSet)) {
            // Palette neutre avec indices de surbrillance
            const dataLength = dataSet && dataSet.length ? dataSet.length : 1;
            for (let j = 0; j < dataLength; j++) {
                const color = highlightIndex.includes(j) ? getDefaultColor() : getNeutralColor();
                colors.push(color);
                hoverColors.push(chroma(color).darken(0.8).hex());
            }
        } else if (selectedPalette.startsWith('divergent')) {
            // Palette divergente (ascending/descending)
            const dataLength = dataSet && dataSet.length ? dataSet.length : 1;
            colors = Array(dataLength).fill(palette[i % palette.length]);
            hoverColors = colors.map(c => chroma(c).darken(0.8).hex());
        } else if (selectedPalette === 'categorical' || !selectedPalette) {
            // Palette catégorique ou défaut
            const color = getColorsByIndex(i, palette);
            const dataLength = dataSet && dataSet.length ? dataSet.length : 1;
            colors = Array(dataLength).fill(color);
            hoverColors = colors.map(c => chroma(c).darken(0.8).hex());
        } else {
            // Cas par défaut : génération de couleurs via une échelle
            const allDataValues = yparse.flat();
            const minValue = Math.min(...allDataValues);
            const maxValue = Math.max(...allDataValues);
            const colorScale = chroma.scale(palette).domain([maxValue, minValue]);
            const data = dataSet || [minValue];
            colors = data.map(value => chroma(colorScale(value)).hex());
            hoverColors = colors.map(color => chroma(color).darken(0.8).hex());
        }

        // Ajoute les couleurs générées pour cette série
        colorParse.push(colors);
        colorHover.push(hoverColors);
    }


    // Gestion des couleurs de légende
    const legendColors = reverseOrder
        ? colorParse.map(c => c[0]).reverse()
        : colorParse.map(c => c[0]);

    return {
        colorParse,
        colorHover,
        legendColors
    };
}

/**
 * Génère les couleurs pour le composant BarLineChart.
 */
export function generateBarLineChartColors({
    vlineParse = [],
    hlineParse = [],
    tmpVlineColorParse = [],
    tmpHlineColorParse = [],
    colorbar = undefined,
    color = undefined,
    selectedPalette = ''
}) {
    const palette = choosePalette(selectedPalette);

    const colorBarParse = colorbar || getColorsByIndex(0, palette);
    const colorbarHover = chroma(colorBarParse).darken(0.8).hex();

    const colorParse = color || getColorsByIndex(1, palette);
    const colorHover = chroma(colorParse).darken(0.8).hex();

    const vlineColorParse = vlineParse.map((_, i) =>
        tmpVlineColorParse[i] !== undefined ? tmpVlineColorParse[i] : getNeutralColor()
    );

    const hlineColorParse = hlineParse.map((_, i) =>
        tmpHlineColorParse[i] !== undefined ? tmpHlineColorParse[i] : getNeutralColor()
    );

    return {
        colorBarParse,
        colorbarHover,
        colorParse,
        colorHover,
        vlineColorParse,
        hlineColorParse
    };
}

export function generateScatterChartColors({
    yparse = [],
    tmpColorParse = [],
    selectedPalette = '',
    highlightIndex = -1,
    vlineParse = [],
    tmpVlineColorParse = [],
    hlineParse = [],
    tmpHlineColorParse = []
}) {
    const palette = choosePalette(selectedPalette);

    // Génération des couleurs pour les séries
    const colorParse = [];
    const colorHover = [];
    for (let i = 0; i < yparse.length; i++) {
        let color;

        if (tmpColorParse[i] !== undefined) {
            color = tmpColorParse[i];
        } else if (i === highlightIndex) {
            color = getNeutralColor(); // Couleur par défaut pour la mise en avant
        } else {
            color = getColorsByIndex(i, palette);
        }

        colorParse.push(color);
        colorHover.push(chroma(color).darken(0.8).hex());
    }

    // Génération des couleurs pour les lignes verticales
    const vlineColorParse = vlineParse.map((_, i) =>
        tmpVlineColorParse[i] !== undefined ? tmpVlineColorParse[i] : getNeutralColor()
    );

    // Génération des couleurs pour les lignes horizontales
    const hlineColorParse = hlineParse.map((_, i) =>
        tmpHlineColorParse[i] !== undefined ? tmpHlineColorParse[i] : getNeutralColor()
    );

    return {
        colorParse,
        colorHover,
        vlineColorParse,
        hlineColorParse
    };
}
