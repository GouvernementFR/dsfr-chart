/* eslint-disable */
<template>
    <div class="box">
        <div :class="[
            'databox-card',
            'databox__group',
            { 'databox__group--height': serieObj.indicator },
        ]">
            <div class="databox__header fr-p-2w">
                <div class="databox__header-title">
                    <div class="fr-col databox__header-icon">
                        <h4 class="databox__header-serietitle fr-h6 fr-mb-0">
                            <span id="tooltip-target">{{ serieObj.title }}</span>
                        </h4>
                    </div>
                    <div class="fr-col-3 databox__header-fullScreenIcon">
                        <button class="infobulle-btn fr-btn fr-btn--tertiary-no-outline fr-p-0" type="button"
                            id="button-tooltip" aria-describedby="tooltip-btn"
                            aria-label="Afficher plus d'informations">
                            <span class="fr-icon-question-line fr-icon--sm" aria-hidden="true"></span>
                        </button>
                        <span class="fr-tooltip fr-placement" id="tooltip-btn" role="tooltip" aria-hidden="true">
                            <p class="tooltip__title">
                                <span id="tooltip-target">{{ serieObj.title }}</span>
                            </p>
                            <p class="tooltip__description">{{ serieObj.description }}</p>
                        </span>
                        <!-- Bouton pour ouvrir la modale -->
                        <button v-if="modalSettings.hasModal" type="button"
                            class="fr-btn fr-btn--tertiary-no-outline fr-p-0" :aria-controls="modalSettings.modalId"
                            aria-label="Afficher la modale" @click="$emit('open-modal')">
                            <span class="fr-icon-modal-fill fr-icon--sm" aria-label="Afficher la modale"
                                aria-hidden="true"></span>
                        </button>
                        <div ref="dropdownContainer" class="dropdown-wrapper">
                            <button ref="dropdown" title="dropdown" type="button"
                                class="dropdown-toggle fr-btn fr-btn--tertiary-no-outline fr-p-0"
                                @click="toggleDropdown">
                                <span class="fr-icon-more-line fr-icon--sm" aria-hidden="true"
                                    aria-label="Afficher le menu déroulant"></span>
                            </button>
                            <div class="dropdown-menu" :class="{ show: isDropdownOpen }">
                                <div class="dropdown-menu" :class="{ show: isDropdownOpen }">
                                    <button class="dropdown-item" v-for="action in dropdownActions" :key="action.id"
                                        :aria-label="action.label" :title="action.label" type="submit"
                                        @click="performAction(action)">
                                        {{ action.label }}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- Description et indicateur de tendance -->
                <div v-if="serieObj.indicator" class="databox__header-subSection">
                    <div class="up-down__container">
                        <p class="fr-text--xs fr-m-0" v-if="serieObj.trendValue.includes('-')">
                            En baisse de
                            <span class="fr-badge fr-badge--brown-caramel fr-badge--sm fr-ml-1v" :aria-label="'Baisse de ' + serieObj.trendValue.replace('-', '').trim()
                                ">
                                <span class="fr-pr-1v" aria-hidden="true">↘ </span>
                                {{ serieObj.trendValue.replace("-", "").trim() }} %
                            </span>
                        </p>
                        <p class="fr-text--xs fr-m-0" v-else>
                            En hausse de
                            <span class="fr-badge fr-badge--green-emeraude fr-badge--sm fr-ml-1v"
                                :aria-label="'Hausse de ' + serieObj.trendValue.trim()">
                                <span class="fr-pr-1v" aria-hidden="true">↗ </span>
                                {{ serieObj.trendValue.trim() }} %
                            </span>
                        </p>
                    </div>
                </div>

                <!-- Sélecteur de source -->
                <div v-if="serieObj.add_sources && serieObj.select_options.length > 0"
                    class="databox__content-selectSection fr-pt-2w">
                    <select-source :id_select="widgetId" :optiondefault="serieObj.option_default"
                        :lsOptions="serieObj.select_options" @select-source="transfertSourceOption"></select-source>
                </div>
            </div>

            <!-- Contenu de la DataBox -->
            <transition name="fade-slide" mode="out-in">
                <div class="databox__content fr-p-2w" ref="chartContainer">
                    <!-- Affichage de la valeur de l'indicateur -->
                    <div class="databox__content-indicator" v-if="serieObj.indicator">
                        <p class="fr-display--xs fr-mb-0 databox__content-indicator-text">
                            {{ serieObj.value }}
                        </p>
                    </div>

                    <!-- Graphique -->
                    <div :id="`chart-section-${widgetId}`" class="databox__content-chart" v-if="shouldDisplayChart">
                        <div class="databox__content-chart-section">
                            <p class="databox__content-chart-section-unit text">
                                {{ serieObj.unitValue }}
                            </p>
                        </div>
                        <div class="databox__content-chart-section-canvas">
                            <component :is="serieObj.component" v-bind="chartProps"></component>
                        </div>
                    </div>

                    <!-- Légende du graphique -->
                    <div class="databox__content-legendContainer" v-if="shouldDisplayLegend">
                        <div class="databox__content-legend" v-for="(name, index) in serieObj.serie_values.name"
                            :key="index">
                            <div class="databox__content-legend-icon fr-mr-1w" :style="{
                                'background-color': getHexaFromName(
                                    serieObj.serie_values.color[index]
                                ),
                            }"></div>
                            <div>
                                <p class="fr-m-0 fr-text--xs">{{ name }}</p>
                            </div>
                        </div>
                    </div>
                    <!-- Tableau -->
                    <div :id="`table-section-${widgetId}`" v-if="shouldDisplayTable" class="databox__content-table-responsive">
                        <table-vue :captionTitle="serieObj.title" :tablevue_data="serieObj.table"
                            :isMultilineTableHeader="isMultilineTableHeader">
                        </table-vue>
                    </div>
                </div>
            </transition>

            <!-- Pied de page : Source, mise à jour et icônes -->
            <div class="databox__footer">
                <div class="databox__footer-content fr-p-2w">
                    <div class="databox__footer-content-text">
                        <p class="fr-text--xs fr-mb-0">
                            {{ serieObj.source }}, {{ changeDateFormat(serieObj.update_date) }}
                        </p>
                    </div>
                    <div v-if="!this.serieObj.indicator" class="fr-ml-md-6w databox__footer-content-icon">
                        <div class="databox__footer-content-segmented-controls" v-if="serieObj.component">
                            <div class="databox__footer-content-calltoaction fr-pr-1w"></div>
                            <segmented-controls :showIcons="true" @chart-selected="handleChartSelected"
                                :idcontrol="serieObj.id_accordion + '1'"></segmented-controls>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
/* eslint-disable */
import PieChart from "./PieChart.vue";
import BarChart from "./BarChart.vue";
import MapChart from "./MapChart.vue";
import MultiLineChart from "./MultiLineChart.vue";
import SelectSource from "./SelectSource.vue";
import SegmentedControls from "./SegmentedControls.vue";
import TableVue from "./TableVue.vue";
import { mixin, changeDateFormat } from "../utils.js";

export default {
    name: "DataBox",
    mixins: [mixin],
    components: {
        PieChart,
        BarChart,
        MultiLineChart,
        SelectSource,
        SegmentedControls,
        TableVue,
        MapChart,
    },
    data() {
        return {
            widgetId: "",
            isDropdownOpen: false,
        };
    },
    props: {
        dropdownActions: {
            type: Array,
            default: () => [],
        },
        selectOptions: {
            type: Array,
            default: () => [],
        },
        isMultilineTableHeader: {
            type: Boolean,
            default: true, // Défini par défaut
        },
        modalSettings: {
            type: Object,
            default: () => ({
                hasModal: false,
                modalId: "fr-modal-1",
            }),
            validator(value) {
                if (
                    typeof value.hasModal !== "boolean" ||
                    typeof value.modalId !== "string"
                ) {
                    return false;
                }
                return true;
            },
        },
        serieObj: {
            type: Object,
            required: false,
            default: () => ({}),
            validator(value) {
                return true;
            },
        },
    },
    methods: {
        changeDateFormat,
        emitOpenModal() {
            this.$emit("open-modal");
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
                    this.$el.style.setProperty("--chart-height", `${newHeight}px`);
                });
            }
        },
        toggleView(viewType) {
            this.serieObj.showGraph = viewType === "graphique";
            this.serieObj.istable = viewType === "tableau";
            this.updateHeight();
        },
        toggleDropdown() {
            this.isDropdownOpen = !this.isDropdownOpen;
        },
        handleClickOutside(event) {
            if (
                this.$refs.dropdownContainer &&
                !this.$refs.dropdownContainer.contains(event.target)
            ) {
                this.isDropdownOpen = false;
            }
        },
        transfertSourceOption(selectedOption) {
            this.$emit("select-source-api", selectedOption);
        },
        handleChartSelected(type) {
            this.serieObj.showGraph = type === "graphique";
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
            alert("Action 1 effectuée !");
        },
        actionBtn2() {
            // Ici, logique pour la deuxième action (par exemple, télécharger CSV)
            alert("Action 2 effectuée !");
        },
    },
    computed: {
        chartProps() {
            const result = {};
            const keysToStringify = [
                "x",
                "y",
                "name",
                "color",
                "vline",
                "vlinecolor",
                "vlinename",
                "hline",
                "hlinecolor",
                "hlinename",
            ];

            keysToStringify.forEach((key) => {
                if (this.serieObj.serie_values && this.serieObj.serie_values[key]) {
                    result[key] = JSON.stringify(this.serieObj.serie_values[key]);
                }
            });

            return result;
        },
        shouldDisplayLegend() {
            return (
                this.serieObj.display_legend &&
                this.serieObj.showGraph &&
                this.serieObj.component &&
                !this.serieObj.indicator
            );
        },
        shouldDisplayChart() {
            return (
                this.serieObj.showGraph &&
                this.serieObj.component &&
                !this.serieObj.indicator
            );
        },
        shouldDisplayTable() {
            return !this.serieObj.showGraph || this.serieObj.istable;
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
        document.addEventListener("click", this.handleClickOutside);
    },
    beforeDestroy() {
        // Retirer l'écouteur de l'événement de clic
        document.removeEventListener("click", this.handleClickOutside);

        // Nettoyage du ResizeObserver
        if (this.resizeObserver) {
            this.resizeObserver.disconnect(); // Arrête l'observation
        }
    },
};
</script>

<style scoped lang="scss">
@import "../styles/components/boxes/dataBox.scss";
</style>
