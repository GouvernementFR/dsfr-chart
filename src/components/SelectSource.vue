<template>
  <div class="fr-select-group select-widget">
    <select
      v-if="lsOptions.length > 0"
      :ref="idSelect"
      v-model="selectedOption"
      class="fr-select"
      @change="emitSelectedValue"
    >
      <option
        v-for="option in lsOptions"
        :key="option.value"
        :value="option.value"
      >
        {{ option.label }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  name: 'SelectSource',
  props: {
    idSelect: {
      type: String,
      default: 'select-source',
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
      },
    },
  },
  emits: ['select-source'],
  data() {
    return {
      selectedOption: this.optiondefault,
    };
  },
  watch: {
    // Si `optiondefault` change après l'initialisation
    optiondefault(newValue) {
      if (newValue !== this.selectedOption) {
        this.selectedOption = newValue;
      }
    },
  },
  mounted() {
    // Assurez-vous que `selectedOption` est bien initialisé avec `optiondefault`
    if (!this.selectedOption && this.optiondefault) {
      this.selectedOption = this.optiondefault;
    }
  },
  methods: {
    emitSelectedValue() {
      this.$emit('select-source', this.selectedOption);
    },
  },
};
</script>

<style scoped lang="scss">
@import '@/styles/selectSource.scss';
</style>
