// Mixins spécialisés pour fonctionnalités communes des graphiques

/**
 * Mixin pour la gestion des tooltips personnalisés
 */
export const tooltipMixin = {
  methods: {
    setupTooltip() {
      const tooltip = this.$el.querySelector('.tooltip');
      if (!tooltip) return;

      // Logique commune de positionnement et affichage des tooltips
      this.tooltip = {
        element: tooltip,
        show: (x, y, content) => {
          tooltip.style.left = x + 'px';
          tooltip.style.top = y + 'px';
          tooltip.style.opacity = '1';
          tooltip.innerHTML = content;
        },
        hide: () => {
          tooltip.style.opacity = '0';
        },
      };
    },

    formatTooltipContent(dataPoint, seriesName = '') {
      const value = this.formatNumber(dataPoint.value);
      const unit = this.unitTooltip ? ` ${this.unitTooltip}` : '';
      
      return `
        <div class="tooltip_header">${dataPoint.label}</div>
        <div class="tooltip_body">
          ${seriesName ? `<strong>${seriesName}</strong><br>` : ''}
          ${value}${unit}
        </div>
      `;
    },
  },
};

/**
 * Mixin pour la gestion des légendes
 */
export const legendMixin = {
  computed: {
    legendItems() {
      return this.nameParse.map((name, index) => ({
        name: this.capitalize(name),
        color: this.getLegendColor(index),
        visible: true,
      }));
    },
  },
  methods: {
    toggleLegendItem(index) {
      // Basculer la visibilité d'un élément de légende
      if (this.chart && this.chart.data.datasets[index]) {
        const dataset = this.chart.data.datasets[index];
        dataset.hidden = !dataset.hidden;
        this.chart.update();
      }
    },

    getLegendColor(index) {
      // Méthode par défaut - peut être surchargée
      if (Array.isArray(this.colorParse[0])) {
        return this.colorParse[0][index] || '#ccc';
      }
      return this.colorParse[index] || '#ccc';
    },
  },
};

/**
 * Mixin pour la gestion responsive des graphiques
 */
export const responsiveMixin = {
  data() {
    return {
      resizeObserver: null,
    };
  },
  mounted() {
    this.setupResponsiveChart();
  },
  beforeUnmount() {
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
  },
  methods: {
    setupResponsiveChart() {
      const container = this.$refs[this.widgetId];
      if (!container) return;

      // Observer les changements de taille
      this.resizeObserver = new ResizeObserver((entries) => {
        for (const entry of entries) {
          const width = entry.contentRect.width;
          this.display = width > 486 ? 'big' : 'small';
          
          // Redimensionner le graphique si nécessaire
          if (this.chart) {
            this.chart.resize();
          }
        }
      });

      this.resizeObserver.observe(container);
    },
  },
};

/**
 * Mixin pour la gestion des thèmes (clair/sombre)
 */
export const themeMixin = {
  mounted() {
    this.setupThemeListener();
  },
  methods: {
    setupThemeListener() {
      const element = document.documentElement;
      element.addEventListener('dsfr.theme', (e) => {
        if (this.chartId !== '') {
          this.handleThemeChange(e.detail.theme);
        }
      });
    },

    handleThemeChange() {
      // Régénérer les couleurs selon le nouveau thème
      this.generateColors();
      
      // Mettre à jour le graphique
      if (this.chart) {
        this.updateChartColors();
      }
    },

    updateChartColors() {
      // Mise à jour des couleurs dans Chart.js
      if (!this.chart) return;

      this.chart.data.datasets.forEach((dataset, index) => {
        if (this.colorParse[index]) {
          dataset.backgroundColor = this.colorParse[index];
          dataset.borderColor = this.colorParse[index];
        }
        if (this.colorHover[index]) {
          dataset.hoverBackgroundColor = this.colorHover[index];
          dataset.hoverBorderColor = this.colorHover[index];
        }
      });

      this.chart.update('none'); // Mise à jour sans animation
    },
  },
};

/**
 * Mixin pour la gestion des données et parsing
 */
export const dataParsingMixin = {
  methods: {
    parseStringData(data, isArray = false) {
      if (!data) return isArray ? [] : '';
      
      try {
        const parsed = JSON.parse(data);
        return Array.isArray(parsed) ? parsed : (isArray ? [parsed] : parsed);
      } catch {
        return isArray ? [data] : data;
      }
    },

    resetChartData() {
      // Réinitialise toutes les données parsées
      this.datasets = [];
      this.labels = [];
      this.xparse = [];
      this.yparse = [];
      this.nameParse = [];
      this.colorParse = [];
      this.colorHover = [];
    },

    validateRequiredData() {
      // Validation des données obligatoires
      if (!this.x || !this.y) {
        console.error('Missing required data: x and y are required');
        return false;
      }
      return true;
    },
  },
};

/**
 * Mixin pour l'animation des graphiques
 */
export const animationMixin = {
  methods: {
    getAnimationConfig(type = 'default') {
      const animations = {
        default: {
          duration: 750,
          easing: 'easeInOutQuart',
        },
        fast: {
          duration: 300,
          easing: 'easeOutQuart',
        },
        slow: {
          duration: 1500,
          easing: 'easeInOutCubic',
        },
        none: {
          duration: 0,
        },
      };

      return animations[type] || animations.default;
    },

    animateChart(animationType = 'default') {
      if (this.chart) {
        this.chart.options.animation = this.getAnimationConfig(animationType);
        this.chart.update();
      }
    },
  },
};

/**
 * Mixin pour l'accessibilité
 */
export const accessibilityMixin = {
  mounted() {
    this.setupAccessibility();
  },
  methods: {
    setupAccessibility() {
      const canvas = this.$refs[this.chartId];
      if (!canvas) return;

      // Ajouter les attributs ARIA
      canvas.setAttribute('role', 'img');
      canvas.setAttribute('aria-label', this.getChartDescription());
      
      // Ajouter la navigation au clavier si nécessaire
      if (this.interactive) {
        canvas.setAttribute('tabindex', '0');
        this.setupKeyboardNavigation();
      }
    },

    getChartDescription() {
      // Description par défaut - peut être surchargée
      const chartType = this.$options.name || 'Chart';
      const dataCount = this.labels?.length || 0;
      return `${chartType} avec ${dataCount} éléments de données`;
    },

    setupKeyboardNavigation() {
      const canvas = this.$refs[this.chartId];
      if (!canvas) return;

      canvas.addEventListener('keydown', (e) => {
        // Navigation basique avec les flèches
        switch (e.key) {
          case 'ArrowLeft':
          case 'ArrowRight':
            // Logique de navigation dans les données
            this.navigateData(e.key === 'ArrowRight' ? 1 : -1);
            e.preventDefault();
            break;
        }
      });
    },

    navigateData(direction) {
      // Implémentation de base - à surcharger selon le type de graphique
      console.log('Navigation:', direction);
    },
  },
};

/**
 * Mixin combiné avec toutes les fonctionnalités communes
 */
export const fullChartMixin = {
  mixins: [
    tooltipMixin,
    legendMixin,
    responsiveMixin,
    themeMixin,
    dataParsingMixin,
    animationMixin,
    accessibilityMixin,
  ],
};