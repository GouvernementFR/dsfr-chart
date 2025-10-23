// Exemples concrets d'utilisation du ChartColorsService

// 🆕 1. Utilisation simple dans un composant
import { ChartColorsService } from '@/utils/chart-colors-service.js';

// Exemple 1: Composant basique
const ExampleChart = {
  name: 'ExampleChart',
  methods: {
    generateColors() {
      // AVANT : Code répété dans chaque composant
      // const palette = choosePalette(this.selectedPalette, this.colors);
      // const colorParse = [];
      // for (let i = 0; i < this.yparse.length; i++) {
      //   // ... 20+ lignes de logique dupliquée
      // }

      // APRÈS : Une seule ligne !
      const result = ChartColorsService.generateColorsForChart('bar', {
        yparse: this.yparse,
        selectedPalette: this.selectedPalette,
        colors: this.colors,
        highlightIndex: [0, 2], // Mettre en avant les indices 0 et 2
      });

      // Assignation automatique
      this.colorParse = result.colorParse;
      this.colorHover = result.colorHover;
      this.legendColors = result.legendColors;
    }
  }
};

// 🆕 2. Utilisation avec mixin (encore plus simple)
import { barChartColorsMixin } from '@/utils/chart-colors-service.js';

const SimpleBarChart = {
  name: 'SimpleBarChart',
  mixins: [barChartColorsMixin], // Ajoute automatiquement generateColors()
  methods: {
    createChart() {
      // La méthode generateColors() est automatiquement disponible !
      this.generateColors(); // ✨ Magique !
      
      // Les couleurs sont maintenant dans this.colorParse, this.colorHover, etc.
    }
  }
};

// 🆕 3. Utilisation avancée pour graphiques combinés
const barLineColors = ChartColorsService.generateColorsForChart('bar-line', {
  yparse: [[10, 20, 30], [5, 15, 25]], // Données barres et lignes
  selectedPalette: 'categorical',
  barsColors: ['#1e40af', '#dc2626'], // Couleurs spécifiques barres
  linesColors: ['#059669', '#7c2d12'], // Couleurs spécifiques lignes
  vlineParse: [15], // Ligne verticale à x=15
  hlineParse: [20], // Ligne horizontale à y=20
});

// Résultat :
// {
//   colorBarParse: ['#1e40af', '#dc2626'],
//   colorParse: ['#059669', '#7c2d12'], 
//   vlineColorParse: ['#6b6b6b'],
//   hlineColorParse: ['#6b6b6b']
// }

// 🆕 4. Comparaison AVANT/APRÈS avec PieChart
import { pieChartColorsMixin } from '@/utils/chart-colors-service.js';

const EnhancedPieChart = {
  mixins: [pieChartColorsMixin],
  // La méthode generateColors() est automatiquement disponible !
};

// 🆕 5. Utilisation avec différentes palettes
const examples = [
  // Palette catégorique (par défaut)
  ChartColorsService.generateColorsForChart('line', {
    yparse: [[1, 2, 3], [4, 5, 6]],
    selectedPalette: 'categorical'
  }),

  // Palette séquentielle
  ChartColorsService.generateColorsForChart('bar', {
    yparse: [[10, 20, 30]],
    selectedPalette: 'sequentialAscending'
  }),

  // Palette divergente
  ChartColorsService.generateColorsForChart('pie', {
    yparse: [[1, 2, 3, 4]],
    selectedPalette: 'divergentAscending'
  }),

  // Couleurs personnalisées
  ChartColorsService.generateColorsForChart('radar', {
    yparse: [[1, 2, 3]],
    colors: ['#ff0000', '#00ff00', '#0000ff'] // RGB custom
  }),
];

// 🆕 6. Hook pour la Composition API (futur)
import { useChartColors } from '@/utils/chart-colors-service.js';

const CompositionAPIExample = {
  setup() {
    const chartColors = useChartColors('scatter', {
      yparse: [[1, 2, 3]],
      selectedPalette: 'categorical'
    });

    return {
      colors: chartColors
    };
  }
};

// 🆕 7. Configuration dynamique 
const DynamicChart = {
  methods: {
    updateChartType(newType) {
      // Reconfiguration dynamique des couleurs selon le type
      const config = this.getColorsConfig();
      const result = ChartColorsService.generateColorsForChart(newType, config);
      
      Object.assign(this, result);
      this.chart.update();
    },

    getColorsConfig() {
      return {
        yparse: this.yparse,
        selectedPalette: this.selectedPalette,
        colors: this.colors,
        // Configuration spécifique selon le contexte
        ...(this.highlightMode && { highlightIndex: [0] }),
        ...(this.reverseOrder && { reverseOrder: true }),
      };
    }
  }
};

// Export des exemples
export {
  ExampleChart,
  SimpleBarChart,
  EnhancedPieChart,
  CompositionAPIExample,
  DynamicChart,
  examples,
  barLineColors
};