/* eslint-disable */
<template>
  <div>
    <!-- Utilisation du composant DataBox -->
    <DataBox :serieObj="serieObj" :modalSettings="modalSettings"
      @select-source-api="handleSelectSourceApi"></DataBox>
    <!-- Modale -->
  </div>
</template>

<script>
/* eslint-disable */
import DataBox from '../DataBox.vue'

export default {
  name: 'ParentComponent',
  components: { DataBox },
  data() {
    return {
      modalSettings: {
        hasModal: false,
        modalId: 'fr-theme-modal', // Assurez-vous que l'ID est unique
      },
      serieObj: {
        title: "Titre de la dataBox",
        description: "Description de la dataBox.",
        indicator: false,
        trendValue: "5",
        value: "1500",
        component: "PieChart",
        add_sources: false,
        option_default: "ubm",
        select_options: [
          { value: "ubm", label: "Exposition médiatique" },
          // Autres options
        ],
        update_date: "2024-04-22",
        source: "SIG",
        showGraph: true,
        serie_values: {
          x: ["Serie 1", "Serie 2", "Serie 3"],
          y: [100, 200, 300],
        },
        table: [
          ["Serie 1", "100"],
          ["Serie 2", "200"],
          ["Serie 3", "300"],
        ],
      },
    };
  },
  methods: {
    handleSelectSourceApi(selectedOption) {
      console.log('Option sélectionnée :', selectedOption);
    },
    openModal() {
      if (this.modalInstance) {
        this.modalInstance.show();
      }
    },
    closeModal() {
      if (this.modalInstance) {
        this.modalInstance.hide();
      }
    },
  },
  mounted() {
    if (this.$refs.modal) {
      // Initialize the modal instance
      this.modalInstance = new Modal(this.$refs.modal);
    }
  },
};
</script>
