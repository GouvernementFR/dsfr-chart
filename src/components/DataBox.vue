<template>
    <div class="box">
        <div :class="[
            'fr-container--fluid fr-card--no-icon subContainer databox-card',
            { 'databox__group--height': localSerieObj.indicator },
        ]">
            <div :class="{ 'databox__group--height': localSerieObj.indicator }" class="databox__group">
                <div class="databox__header">
                    <div class="fr-col-12 subContainer__title">
                        <div class="subContainer__icon">
                            <transition name="fade">
                                <h4 v-if="shortTitle" class="serie__title fr-h6 fr-mb-0">
                                    <span id="tooltip-target">{{ serieObj.title }}</span>
                                </h4>
                                <h4 v-else class="serie__title fr-h6 fr-mb-0">
                                    <span id="tooltip-target">{{ serieObj.long_title }}</span>
                                </h4>
                            </transition>
                            <button class="fr-btn--tooltip fr-btn" type="button" id="button-2996"
                                aria-describedby="tooltip-2996"></button>
                            <span class="fr-tooltip fr-placement" id="tooltip-2996" role="tooltip" aria-hidden="true">
                                <p v-if="shortTitle" class="tooltip__title">
                                    <span id="tooltip-target">{{ serieObj.title }}</span>
                                </p>
                                <p v-else class="tooltip__title">
                                    <span id="tooltip-target">{{ serieObj.long_title }}</span>
                                </p>
                                <p class="tooltip__description">{{ serieObj.description }}</p>
                            </span>
                        </div>
                        <div class="fr-col-3 subContainer__fullScreenIcon">
                            <button v-if="openDsfrModal" type="button" class="fr-btn fr-btn--tertiary-no-outline fr-p-0"
                                data-fr-opened="false" aria-controls="fr-modal-1">
                                <span class="fr-icon-modal-fill" aria-label="Afficher la modale"
                                    aria-hidden="true"></span>
                            </button>
                            <button title="dropdow" type="button"
                                class="dropdown-toggle fr-btn fr-btn--tertiary-no-outline fr-p-0"
                                @click="toggleDropdown">
                                <span class="fr-icon-more-line" aria-hidden="true"></span>
                            </button>
                            <div class="dropdown-menu" :class="{ show: isDropdownOpen }">
                                <button class="dropdown-item">Action databox</button>
                                <button class="dropdown-item">Action databox</button>
                                <button class="dropdown-item">Action databox</button>
                            </div>
                        </div>
                    </div>
                    <!-- Description et indicateur de tendance -->
                    <div v-if="localSerieObj.indicator" class="fr-col-12 subContainer__subSection">
                        <div class="up-down__container">
                            <p class="fr-text--xs fr-m-0" v-if="serieObj.trendValue.includes('-')">
                                En baisse de
                                <span class="fr-badge fr-badge--brown-caramel fr-badge--sm fr-ml-1v"
                                    :aria-label="'Baisse de ' + serieObj.trendValue.replace('-', '').trim()">
                                    <span aria-hidden="true">↘ </span>
                                    {{ serieObj.trendValue.replace('-', '').trim() }} %
                                </span>
                            </p>
                            <p class="fr-text--xs fr-m-0" v-else>
                                En hausse de
                                <span class="fr-badge fr-badge--green-emeraude fr-badge--sm fr-ml-1v"
                                    :aria-label="'Hausse de ' + serieObj.trendValue.trim()">
                                    <span aria-hidden="true">↗ </span>
                                    {{ serieObj.trendValue.trim() }} %
                                </span>
                            </p>
                        </div>
                    </div>
                </div>

                <!-- Contenu principal -->
                <div class="databox__content">
                    <!-- Valeur de l'indicateur -->
                    <div class="fr-col-12 subContainer__contentIndicator" v-if="localSerieObj.indicator">
                        <p class="fr-display--xs fr-mb-0">{{ serieObj.value }}</p>
                    </div>

                    <!-- Sélecteur de source -->
                    <div v-if="serieObj.add_sources && serieObj.select_options.length > 0"
                        class="fr-col-12 subContainer__selectSection">
                        <select-source :id_select="widgetId" :optiondefault="serieObj.option_default"
                            :lsOptions="serieObj.select_options" @select-source="transfertSourceOption"></select-source>
                    </div>

                    <!-- Graphique -->
                    <div class="fr-col-12 subContainer__chart" v-if="showChart">
                        <div class="subContainer__chart--section">
                            <p class="text subContainer__chart--section--unit">{{ serieObj.unitValue }}</p>
                        </div>
                        <div class="subContainer__chart--canvas">
                            <component :is="serieObj.component" v-bind="stringifiedSerieValues"></component>
                        </div>
                    </div>

                    <!-- Tableau -->
                    <div v-if="showTable" class="table-responsive">
                        <table-vue :captionTitle="serieObj.title" :tablevue_data="serieObj.table"></table-vue>
                    </div>

                    <!-- Légende du graphique -->
                    <div class="subContainer__legendContainer" v-if="isShowChartLegend">
                        <div class="subContainer__legend" v-for="(name, index) in serieObj.serie_values.name"
                            :key="index">
                            <div class="subContainer__legend--icon" :style="{
                                'background-color': getHexaFromName(serieObj.serie_values.color[index]),
                            }"></div>
                            <div>
                                <p class="fr-m-0 fr-text--xs">{{ name }}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Pied de page -->
                <div class="databox__footer">
                    <div class="fr-col-12 subContainer__footer-container">
                        <div class="subContainer__footer-text">
                            <p class="fr-text--xs fr-mb-0">
                                <strong>Source : </strong>{{ serieObj.source }},
                                <strong>Mis à jour :</strong> {{ serieObj.update_date }}
                            </p>
                        </div>
                        <div v-if="!localSerieObj.indicator" class="fr-ml-md-6w subContainer__footer-icon">
                            <div class="fr-col-12 subContainer__segmented-controls" v-if="serieObj.component">
                                <segmented-controls :showIcons="true" @chart-selected="handleChartSelected"
                                    :idcontrol="serieObj.id_accordion + '1'"></segmented-controls>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <dialog aria-labelledby="fr-modal-title-modal-1" role="dialog" id="fr-modal-1" class="fr-modal">
            <div class="fr-container fr-container--fluid fr-container-md">
                <div class="fr-grid-row fr-grid-row--center">
                    <div class="fr-col-12 fr-col-md-8 fr-col-lg-6">
                        <div class="fr-modal__body">
                            <div class="fr-modal__header">
                                <button class="fr-btn--close fr-btn" title="Fermer la fenêtre modale"
                                    aria-controls="fr-modal-1">Fermer</button>
                            </div>
                            <div class="fr-modal__content">
                                <h1 id="fr-modal-title-modal-1" class="fr-modal__title">Titre de la modale</h1>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas varius tortor nibh,
                                    sit amet tempor nibh finibus et. Aenean eu enim justo. Vestibulum aliquam hendrerit
                                    molestie. Mauris malesuada nisi sit amet augue accumsan tincidunt. Maecenas
                                    tincidunt, velit ac porttitor pulvinar, tortor eros facilisis libero, vitae commodo
                                    nunc quam et ligula. Ut nec ipsum sapien. Interdum et malesuada fames ac ante ipsum
                                    primis in faucibus. Integer id nisi nec nulla luctus lacinia non eu turpis. Etiam in
                                    ex imperdiet justo tincidunt egestas. Ut porttitor urna ac augue cursus tincidunt
                                    sit amet sed orci.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </dialog>

        <!-- Switch -->
        <div class="flex">
            <div class="fr-toggle fr-mt-6v">
                <input type="checkbox" class="fr-toggle__input" aria-describedby="indicator-messages" id="indicator"
                    v-model="localSerieObj.indicator" />
                <label class="fr-toggle__label" for="indicator">Afficher l'indicateur</label>
                <div class="fr-messages-group" id="indicator-messages" aria-live="polite"></div>
            </div>
            <div class="fr-toggle fr-mt-6v">
                <input type="checkbox" class="fr-toggle__input" aria-describedby="short-title" id="short-title"
                    v-model="shortTitle" />
                <label class="fr-toggle__label" for="short-title">Afficher le titre court</label>
                <div class="fr-messages-group" id="short-title" aria-live="polite"></div>
            </div>
            <div class="fr-toggle fr-mt-6v">
                <input type="checkbox" class="fr-toggle__input" aria-describedby="openDsfrModal" id="openDsfrModal"
                    v-model="openDsfrModal" />
                <label class="fr-toggle__label" for="openDsfrModal">Afficher le bouton modale</label>
                <div class="fr-messages-group" id="openDsfrModal" aria-live="polite"></div>
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
import { mapActions } from "vuex";

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
            shortTitle: false,
            openDsfrModal: false,
            localSerieObj: {},
        };
    },
    props: {
        selectOptions: {
            type: Array,
            default: () => [],
        },
        serieObj: {
            type: Object,
            required: false,
            default: () => ({
                long_title:
                    "Ceci est un texte long qui me permet de mettre à partir de 2 lignes les éléments dans une tooltip, avec un affichage spécial",
                title: "Ceci est un texte court",
                description:
                    "Ceci est un texte descriptif, il est visible uniquement au clic sur le button icône",
                showGraph: false,
                indicator: false,
                trendValue: "10",
                value: "100",
                component: "PieChart",
                add_sources: false,
                option_default: "ubm",
                select_options: [
                    { value: "ubm", label: "Exposition médiatique" },
                    { value: "reach", label: "Reach RS" },
                    { value: "nb_post", label: "Volume de posts RS" },
                    { value: "engagement", label: "Engagement des posts RS" },
                    { value: "aday", label: "Volume d'articles de presse" },
                ],
                update_date: "22/04/2024",
                source: "Sig",
                serie_values: {
                    x: [10, 20, 30],
                    y: [10, 20, 30],
                    name: ["Series 1", "Series 2", "Series 3"],
                    color: [],
                },
                table: [
                    ["Header 1", "Header 2"],
                    ["Row 1 Col 1", "Row 1 Col 2"],
                    ["Row 2 Col 1", "Row 2 Col 2"],
                ],
            }),
            validator(value) {
                if (typeof value !== "object" || value === null) {
                    console.error("serieObj must be a non-null object.");
                    return false;
                }

                const requiredFields = {
                    title: "string",
                    description: "string",
                    indicator: "boolean",
                    trendValue: "string",
                    value: ["string", "number"],
                    component: "string",
                    add_sources: "boolean",
                    update_date: "string",
                };

                for (const [field, type] of Object.entries(requiredFields)) {
                    if (!(field in value)) {
                        console.error(`serieObj is missing the required field '${field}'.`);
                        return false;
                    }
                    const fieldType = Array.isArray(type) ? type : [type];
                    if (!fieldType.includes(typeof value[field])) {
                        console.error(
                            `Field '${field}' should be of type '${type}', but got '${typeof value[field]}'.`
                        );
                        return false;
                    }
                }

                if ("serie_values" in value) {
                    if (typeof value.serie_values !== "object" || value.serie_values === null) {
                        console.error("serie_values must be an object.");
                        return false;
                    }
                    const serieValuesFields = {
                        y: "array",
                        color: "array",
                        name: "array",
                    };
                    for (const [field, expectedType] of Object.entries(serieValuesFields)) {
                        if (!(field in value.serie_values)) {
                            console.error(`serie_values is missing the field '${field}'.`);
                            return false;
                        }
                        if (!Array.isArray(value.serie_values[field])) {
                            console.error(`Field '${field}' in serie_values should be an array.`);
                            return false;
                        }
                    }
                }

                if ("table" in value) {
                    if (!Array.isArray(value.table)) {
                        console.error("table must be an array.");
                        return false;
                    }
                }

                return true;
            },
        },
    },
    methods: {
        toggleDropdown() {
            this.isDropdownOpen = !this.isDropdownOpen;
        },
        transfertSourceOption(selectedOption) {
            this.$emit("select-source-api", selectedOption);
        },
        handleChartSelected(type) {
            this.serieObj.showGraph = type === "graphique";
        },
        ...mapActions(["setIsSticky"]),
        changeDateFormat,
    },
    computed: {
        stringifiedSerieValues() {
            const result = {};
            for (const key in this.serieObj.serie_values) {
                result[key] = JSON.stringify(this.serieObj.serie_values[key]);
            }
            return result;
        },
        isShowChartLegend() {
            return (
                this.serieObj.display_legend &&
                !this.localSerieObj.indicator &&
                this.serieObj.showGraph &&
                this.serieObj.component
            );
        },
        showChart() {
            return (
                !this.localSerieObj.indicator && this.serieObj.showGraph && this.serieObj.component
            );
        },
        showTable() {
            return !this.serieObj.showGraph || this.serieObj.istable;
        },
    },
    created() {
        this.localSerieObj = { ...this.serieObj };
    },
    watch: {
        serieObj: {
            handler(newVal) {
                this.localSerieObj = { ...newVal };
            },
            immediate: true,
            deep: true,
        },
    },
};
</script>

<style scoped lang="scss">
@import "../styles/components/boxes/chartBox.scss";
</style>