/* eslint-disable */
<template>
  <div class="fr-select-group select-widget">
    <select v-if="lsOptions.length > 0" class="fr-select" :id="id_select" v-model="selectedOption" @change="emitSelectedValue">
      <option v-for="option in lsOptions" :key="option.value" :value="option.value">
        {{ option.label }}
      </option>
    </select>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  name: "SelectSource",
  props: {
    id_select: {
      type: String,
      default: "select-source"
    },
    optiondefault: {
      type: String,
      required: true,
    },
    lsOptions: {
      type: Array,
      required: true,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      selectedOption: this.optiondefault, // Initialise la sélection par défaut
    };
  },
  watch: {
    // Si `optiondefault` change après l'initialisation
    optiondefault(newValue) {
      if (newValue !== this.selectedOption) {
        this.selectedOption = newValue;
      }
    }
  },
  methods: {
    emitSelectedValue() {
      this.$emit("select-source", this.selectedOption);
    },
  },
  mounted() {
    // Assurez-vous que `selectedOption` est bien initialisé avec `optiondefault`
    if (!this.selectedOption && this.optiondefault) {
      this.selectedOption = this.optiondefault;
    }
  }
};
</script>

<style scoped>
@import "../styles/components/boxes/selectSource.scss";
</style>
