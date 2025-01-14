<template>
  <div class="box">
    <div :class="['databox-card', 'databox__group', { 'databox__group--height': indicator }]">
      <div class="databox__header fr-p-2w">
        <div class="databox__header-title">
          <div class="fr-col databox__header-icon">
            <h4 class="databox__header-serietitle fr-h6 fr-mb-0">
              <span id="tooltip-target">{{ dataBoxTitle }}</span>
            </h4>
          </div>
          <div class="fr-col-3 databox__header-fullScreenIcon">
            <button
              id="button-tooltip"
              class="infobulle-btn fr-btn fr-btn--tertiary-no-outline fr-p-0"
              type="button"
              aria-describedby="tooltip-btn"
              aria-label="Afficher plus d'informations"
            >
              <span
                class="fr-icon-question-line fr-icon--sm"
                aria-hidden="true"
              />
            </button>
            <span
              id="tooltip-btn"
              class="fr-tooltip fr-placement"
              role="tooltip"
              aria-hidden="true"
            >
              <p class="tooltip__title">
                <span id="tooltip-target">{{ dataBoxTitle }}</span>
              </p>
              <p class="tooltip__description">{{ dataBoxDescription }}</p>
            </span>
            <!-- Bouton pour ouvrir la modale -->
            <button
              v-if="modalSettings.hasModal"
              type="button"
              class="fr-btn fr-btn--tertiary-no-outline fr-p-0"
              :aria-controls="modalSettings.modalId"
              aria-label="Afficher la modale"
              @click="$emit('open-modal')"
            >
              <span
                class="fr-icon-modal-fill fr-icon--sm"
                aria-label="Afficher la modale"
                aria-hidden="true"
              />
            </button>
            <div
              ref="dropdownContainer"
              class="dropdown-wrapper"
            >
              <button
                title="Dropdown"
                type="button"
                class="dropdown-toggle fr-btn fr-btn--tertiary-no-outline fr-p-0"
                aria-label="Afficher le menu déroulant"
                @click="toggleDropdown"
              >
                <span
                  class="fr-icon-more-line fr-icon--sm"
                  aria-hidden="true"
                />
              </button>
              <div
                class="dropdown-menu"
                :class="{ show: isDropdownOpen }"
              >
                <div
                  class="dropdown-menu"
                  :class="{ show: isDropdownOpen }"
                >
                  <button
                    v-for="action in dropdownActions"
                    :key="action.id"
                    class="dropdown-item"
                    :aria-label="action.ariaLabel"
                    :title="action.ariaLabel"
                    type="submit"
                    @click="performAction(action)"
                  >
                    {{ action.ariaLabel }}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- Description et indicateur de tendance -->
        <div
          v-if="indicator"
          class="databox__header-subSection"
        >
          <div class="up-down__container">
            <p
              v-if="trendValue.includes('-')"
              class="fr-text--xs fr-m-0"
            >
              En baisse de
              <span
                class="fr-badge fr-badge--brown-caramel fr-badge--sm fr-ml-1v"
                :aria-label="'Baisse de ' + trendValue.replace('-', '').trim()"
              >
                <span
                  class="fr-pr-1v"
                  aria-hidden="true"
                >↘ </span>
                {{ trendValue.replace('-', '').trim() }} %
              </span>
            </p>
            <p
              v-else
              class="fr-text--xs fr-m-0"
            >
              En hausse de
              <span
                class="fr-badge fr-badge--green-emeraude fr-badge--sm fr-ml-1v"
                :aria-label="'Hausse de ' + trendValue.trim()"
              >
                <span
                  class="fr-pr-1v"
                  aria-hidden="true"
                >↗ </span>
                {{ trendValue.trim() }} %
              </span>
            </p>
          </div>
        </div>

        <!-- Sélecteur de source -->
        <div
          v-if="addSources && selectOptions.length > 0"
          class="databox__content-selectSection fr-pt-2w"
        >
          <select-source
            :id-select="widgetId"
            :optiondefault="defaultOption"
            :ls-options="selectOptions"
            @select-source="transfertSourceOption"
          />
        </div>
      </div>

      <!-- Contenu de la DataBox -->
      <transition
        name="fade-slide"
        mode="out-in"
      >
        <div
          v-if="shouldDisplayChart || shouldDisplayTable"
          ref="chartContainer"
          class="databox__content fr-p-2w"
        >
          <!-- Affichage de la valeur de l'indicateur -->
          <div
            v-if="indicator"
            class="databox__content-indicator"
          >
            <p class="fr-display--xs fr-mb-0 databox__content-indicator-text">
              {{ value }}
            </p>
          </div>

          <!-- Graphique -->
          <div
            v-if="shouldDisplayChart"
            :ref="`chart-section-${widgetId}`"
            class="databox__content-chart"
          >
            <div class="databox__content-chart-section-canvas">
              <component
                :is="component"
                v-bind="chartProps"
              />
            </div>
          </div>

          <!-- Légende du graphique -->
          <div
            v-if="shouldDisplayLegend"
            class="databox__content-legendContainer"
          >
            <div
              v-for="(name, index) in serieObj.serie_values.name"
              :key="index"
              class="databox__content-legend"
            >
              <div
                class="databox__content-legend-icon fr-mr-1w"
                :style="{ 'background-color': getHexaFromName(serieObj.serie_values.color[index]) }"
              />
              <div>
                <p class="fr-m-0 fr-text--xs">
                  {{ name }}
                </p>
              </div>
            </div>
          </div>
          <!-- Tableau -->
          <div
            v-if="shouldDisplayTable"
            :ref="`table-section-${widgetId}`"
            class="databox__content-table-responsive"
          >
            <table-vue
              :caption-title="captionTitle"
              :table-data="serieObj.table"
              :is-multiline-table-header="isMultilineTableHeader"
            />
          </div>
        </div>
      </transition>

      <!-- Pied de page : Source, mise à jour et icônes -->
      <div class="databox__footer">
        <div class="databox__footer-content fr-p-2w">
          <div class="databox__footer-content-text">
            <p class="fr-text--xs fr-mb-0">
              {{ source }}, {{ changeDateFormat(dataBoxDate) }}
            </p>
          </div>
          <div
            v-if="!indicator"
            class="fr-ml-md-6w databox__footer-content-icon"
          >
            <div
              v-if="component"
              class="databox__footer-content-segmented-controls"
            >
              <div class="databox__footer-content-calltoaction fr-pr-1w" />
              <segmented-controls
                :show-icons="true"
                :idcontrol="serieObj.id_accordion + '1'"
                @chart-selected="handleChartSelected"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PieChart from './PieChart.vue';
import BarChart from './BarChart.vue';
import MapChart from './MapChart.vue';
import MultiLineChart from './MultiLineChart.vue';
import SelectSource from './SelectSource.vue';
import SegmentedControls from './SegmentedControls.vue';
import TableVue from './TableVue.vue';
import { mixin, changeDateFormat } from '@/utils/global.js';

export default {
  name: 'DataBox',
  components: {
    PieChart,
    BarChart,
    MultiLineChart,
    SelectSource,
    SegmentedControls,
    TableVue,
    MapChart,
  },
  mixins: [mixin],
  props: {
    dropdownActions: {
      type: Array,
      default: () => [
        { id: '1', ariaLabel: "Capture d'écran", action: 'actionBtn1' },
        { id: '2', ariaLabel: 'Télécharger CSV', action: 'actionBtn2' },
      ],
    },
    unitTooltip: {
      type: String,
      default: '',
    },
    isMultilineTableHeader: {
      type: [Boolean, String],
      default: true,
    },
    dataBoxTitle: {
      type: String,
      default: 'Titre de la dataBox',
    },
    dataBoxDescription: {
      type: String,
      default: 'Description de la dataBox.',
    },
    indicator: {
      type: [Boolean, String],
      default: false,
    },
    trendValue: {
      type: String,
      default: '5',
    },
    value: {
      type: String,
      default: '1500',
    },
    component: {
      type: String,
      default: 'PieChart',
    },
    addSources: {
      type: [Boolean, String],
      default: false,
    },
    selectOptions: {
      type: Array,
      default: () => [{ value: 'ubm', label: 'Exposition médiatique' }],
    },
    captionTitle: {
      type: String,
      default: 'Titre du tableau',
    },
    defaultOption: {
      type: String,
      default: 'ubm',
    },
    dataBoxDate: {
      type: String,
      default: '2024-04-22',
    },
    source: {
      type: String,
      default: 'SIG',
    },
    modalSettings: {
      type: Object,
      default: () => ({
        hasModal: false,
        modalId: 'fr-modal-1',
      }),
      validator(value) {
        if (typeof value.hasModal !== 'boolean' || typeof value.modalId !== 'string') {
          return false;
        }
        return true;
      },
    },
    serieObj: {
      type: Object,
      required: false,
      default: () => ({
        showGraph: true,
        unitTooltip: '%',
        serie_values: {
          x: [['Serie 1', 'Serie 2', 'Serie 3']],
          y: [[100, 200, 300]],
        },
        table: [
          ['Serie 1', '100'],
          ['Serie 2', '200'],
          ['Serie 3', '300'],
        ],
      }),
      validator() {
        return true;
      },
    },
  },
  emits: ['open-modal', 'select-source-api'],
  data() {
    return {
      widgetId: '',
      isDropdownOpen: false,
      localShowGraph: this.serieObj.showGraph,
    };
  },
  computed: {
    chartProps() {
      const result = {};
      const keysToStringify = ['x', 'y', 'name', 'color', 'vline', 'vlinecolor', 'vlinename', 'hline', 'hlinecolor', 'hlinename'];

      keysToStringify.forEach((key) => {
        if (this.serieObj.serie_values && this.serieObj.serie_values[key]) {
          result[key] = JSON.stringify(this.serieObj.serie_values[key]);
        }
      });

      result.unitTooltip = this.serieObj.unitTooltip || '';

      return result;
    },
    shouldDisplayLegend() {
      return this.localShowGraph && this.component && !this.indicator;
    },
    shouldDisplayChart() {
      return this.localShowGraph && this.component && !this.indicator;
    },
    shouldDisplayTable() {
      return !this.localShowGraph;
    },
  },
  mounted() {
    // Utiliser ResizeObserver sans modifier directement les dimensions dans le callback
    this.resizeObserver = new ResizeObserver(() => {
      this.updateHeight(); // Appel de la méthode pour ajuster la hauteur
    });

    // Observer le container du graphique
    if (this.$refs.chartContainer) {
      this.resizeObserver.observe(this.$refs.chartContainer);
    }

    // Ajout d'un écouteur pour détecter les clics en dehors du dropdown
    document.addEventListener('click', this.handleClickOutside);
  },
  beforeUnmount() {
    // Retirer l'écouteur de l'événement de clic
    document.removeEventListener('click', this.handleClickOutside);

    // Nettoyage du ResizeObserver
    if (this.resizeObserver) {
      this.resizeObserver.disconnect(); // Arrête l'observation
    }
  },
  methods: {
    changeDateFormat,
    emitOpenModal() {
      this.$emit('open-modal');
    },
    updateHeight() {
      const chartContainer = this.$refs.chartContainer;
      if (chartContainer) {
        // Utilisation de requestAnimationFrame pour éviter la boucle d'updates
        requestAnimationFrame(() => {
          const parentHeight = chartContainer.parentElement.offsetHeight;
          const parentWidth = chartContainer.parentElement.offsetWidth;
          // Ajuster la hauteur du conteneur de manière appropriée
          const newHeight = Math.min(parentHeight, parentWidth * 0.6); // Par exemple, 60% de la largeur
          this.$el.style.setProperty('--chart-height', `${newHeight}px`);
        });
      }
    },
    toggleView(viewType) {
      this.showGraph = viewType === 'graphique';
      this.updateHeight();
    },
    toggleDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen;
    },
    handleClickOutside(event) {
      if (this.$refs.dropdownContainer && !this.$refs.dropdownContainer.contains(event.target)) {
        this.isDropdownOpen = false;
      }
    },
    transfertSourceOption(selectedOption) {
      this.$emit('select-source-api', selectedOption);
    },
    handleChartSelected(type) {
      this.localShowGraph = type === 'graphique';
    },
    performAction(action) {
      if (typeof this[action.action] === 'function') {
        this[action.action](); // Exécute la méthode correspondante
      } else {
        console.warn(`Action ${action.action} non définie`);
      }
      this.isDropdownOpen = false;
    },
    actionBtn1() {
      // Ici, logique pour la première action (par exemple, capture d'écran)
      alert('Action 1 effectuée !');
    },
    actionBtn2() {
      // Ici, logique pour la deuxième action (par exemple, télécharger CSV)
      alert('Action 2 effectuée !');
    },
  },
};
</script>

<style scoped lang="scss">
@import '@/styles/dataBox.scss';
</style>
