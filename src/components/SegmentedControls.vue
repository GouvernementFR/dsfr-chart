<template>
  <fieldset class="fr-segmented fr-segmented--no-legend fr-segmented--sm">
    <div class="fr-segmented__elements">
      <!-- Première option -->
      <div class="fr-segmented__element">
        <input
          :ref="idcontrol + '-1'"
          value="1"
          type="radio"
          :name="idcontrol + 'segmented-2230'"
          :checked="isOption1Checked"
        >
        <label
          class="fr-label"
          :for="idcontrol + '-1'"
          :title="option1Label"
          @click="emitChartSelected(option1Value)"
        >
          <span
            v-if="showIcons"
            :class="[option1Icon, 'fr-icon', 'fr-icon--sm']"
            aria-hidden="true"
          />
          <span v-else>{{ option1Label }}</span>
        </label>
      </div>

      <!-- Deuxième option -->
      <div class="fr-segmented__element">
        <input
          :ref="idcontrol + '-2'"
          value="2"
          type="radio"
          :name="idcontrol + 'segmented-2230'"
          :checked="isOption2Checked"
        >
        <label
          class="fr-label"
          :for="idcontrol + '-2'"
          :title="option2Label"
          @click="emitChartSelected(option2Value)"
        >
          <span
            v-if="showIcons"
            :class="[option2Icon, 'fr-icon', 'fr-icon--sm']"
            aria-hidden="true"
          />
          <span v-else>{{ option2Label }}</span>
        </label>
      </div>
    </div>
  </fieldset>
</template>

<script>
export default {
  props: {
    idcontrol: {
      type: String,
      required: true,
    },
    showIcons: {
      type: [Boolean, String],
      default: true, // Par défaut, affiche les icônes
    },
    // Nouvelles props pour personnaliser les options
    option1Label: {
      type: String,
      default: 'Graphique',
    },
    option1Value: {
      type: String,
      default: 'graphique',
    },
    option1Icon: {
      type: String,
      default: 'fr-icon-pie-chart-2-fill', // Icône par défaut pour l'option 1
    },
    option2Label: {
      type: String,
      default: 'Tableau',
    },
    option2Value: {
      type: String,
      default: 'table',
    },
    option2Icon: {
      type: String,
      default: 'fr-icon-table-2', // Icône par défaut pour l'option 2
    },
    defaultChart: {
      type: String,
      default: 'graphique', // Définit le type de graphique par défaut
    },
  },
  emits: ['chart-selected'],
  data() {
    return {
      selectedChart: this.defaultChart,
    };
  },
  computed: {
    isOption1Checked() {
      return this.selectedChart === this.option1Value;
    },
    isOption2Checked() {
      return this.selectedChart === this.option2Value;
    },
  },
  mounted() {
    // Émet le type de graphique par défaut lors du montage du composant
    this.emitChartSelected(this.defaultChart);
  },
  methods: {
    emitChartSelected(type) {
      this.selectedChart = type;
      this.$emit('chart-selected', type);
    },
  },
};
</script>
