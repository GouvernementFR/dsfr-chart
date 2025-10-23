// Service centralisé pour la gestion des couleurs de graphiques
import { 
  generateColors as baseGenerateColors,
  generateScatterChartColors,
  generateBarLineChartColors,
  generateAreaLineChartColors
} from '@/utils/colors.js';

/**
 * Factory pour générer les couleurs selon le type de graphique
 * Centralise toute la logique de couleurs et évite la duplication
 */
export class ChartColorsService {
  /**
   * Génère les couleurs pour n'importe quel type de graphique
   * @param {string} chartType - Type de graphique (bar, line, pie, etc.)
   * @param {Object} config - Configuration des couleurs
   * @returns {Object} Couleurs générées pour le graphique
   */
  static generateColorsForChart(chartType, config = {}) {
    const {
      yparse = [],
      selectedPalette = '',
      colors = null,
      highlightIndex = [],
      tmpColorParse = [],
      reverseOrder = false,
      // Spécifique aux graphiques combinés
      vlineParse = [],
      hlineParse = [],
      tmpVlineColorParse = [],
      tmpHlineColorParse = [],
      // Couleurs spécifiques pour graphiques mixtes
      barsColors = null,
      linesColors = null,
      areasColors = null,
    } = config;

    // Configuration de base commune
    const baseConfig = {
      yparse,
      tmpColorParse,
      highlightIndex,
      selectedPalette,
      reverseOrder,
      colors,
    };

    switch (chartType) {
      case 'bar':
      case 'line':
      case 'pie':
      case 'radar':
      case 'treemap':
        return this._generateStandardColors(baseConfig);

      case 'scatter':
        return this._generateScatterColors({
          ...baseConfig,
          vlineParse,
          hlineParse,
          tmpVlineColorParse,
          tmpHlineColorParse,
        });

      case 'bar-line':
        return this._generateBarLineColors({
          ...baseConfig,
          vlineParse,
          hlineParse,
          tmpVlineColorParse,
          tmpHlineColorParse,
          barsColors,
          linesColors,
        });

      case 'area-line':
        return this._generateAreaLineColors({
          ...baseConfig,
          vlineParse,
          hlineParse,
          tmpVlineColorParse,
          tmpHlineColorParse,
          areasColors,
          linesColors,
        });

      default:
        console.warn(`Unknown chart type: ${chartType}. Using standard colors.`);
        return this._generateStandardColors(baseConfig);
    }
  }

  /**
   * Couleurs pour graphiques standards (bar, line, pie, etc.)
   */
  static _generateStandardColors(config) {
    return baseGenerateColors(config);
  }

  /**
   * Couleurs pour graphiques scatter avec lignes
   */
  static _generateScatterColors(config) {
    return generateScatterChartColors(config);
  }

  /**
   * Couleurs pour graphiques bar + line combinés
   */
  static _generateBarLineColors(config) {
    return generateBarLineChartColors(config);
  }

  /**
   * Couleurs pour graphiques area + line combinés
   */
  static _generateAreaLineColors(config) {
    return generateAreaLineChartColors(config);
  }

  /**
   * Mixin pour simplifier l'utilisation dans les composants
   */
  static createColorsMixin(chartType) {
    return {
      methods: {
        generateColors() {
          const config = this.getColorsConfig();
          const result = ChartColorsService.generateColorsForChart(chartType, config);
          
          // Applique les résultats aux propriétés du composant
          Object.assign(this, result);
          
          return result;
        },

        getColorsConfig() {
          // Configuration de base - peut être surchargée dans le composant
          return {
            yparse: this.yparse,
            selectedPalette: this.selectedPalette,
            colors: this.colors,
            tmpColorParse: this.tmpColorParse || [],
            highlightIndex: this.highlightIndex || [],
            reverseOrder: this.selectedPalette === 'divergentDescending',
          };
        },
      },
    };
  }
}

/**
 * Mixins prêts à l'emploi pour chaque type de graphique
 */
export const barChartColorsMixin = ChartColorsService.createColorsMixin('bar');
export const lineChartColorsMixin = ChartColorsService.createColorsMixin('line');
export const pieChartColorsMixin = ChartColorsService.createColorsMixin('pie');
export const scatterChartColorsMixin = ChartColorsService.createColorsMixin('scatter');
export const barLineChartColorsMixin = ChartColorsService.createColorsMixin('bar-line');

/**
 * Hook pour utilisation dans la composition API (futur)
 */
export function useChartColors(chartType, config) {
  return ChartColorsService.generateColorsForChart(chartType, config);
}