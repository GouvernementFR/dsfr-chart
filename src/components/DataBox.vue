/* eslint-disable */
<template>
    <div class="box">
        <div
            :class="['fr-container--fluid fr-card--no-icon subContainer databox-card', { 'databox__group--height': localSerieObj.indicator }]">
            <div :class="{ 'databox__group--height': localSerieObj.indicator }" class="databox__group">
                <div class="databox__header">
                    <div class="fr-col-12 subContainer__title">
                        <div class="subContainer__icon">
                            <transition name="fade">
                                <h4 v-if="shortTitle" class="serie__title fr-h6 fr-mb-0">
                                    <span id="tooltip-target">{{ serieObj.title }}</span> <!-- Short title -->
                                </h4>
                                <h4 v-else class="serie__title fr-h6 fr-mb-0">
                                    <span id="tooltip-target">{{ serieObj.long_title }}</span> <!-- Long title -->
                                </h4>
                            </transition>
                            <button class="fr-btn--tooltip fr-btn" type="button" id="button-2996"
                                aria-describedby="tooltip-2996">
                            </button>
                            <span class="fr-tooltip fr-placement" id="tooltip-2996" role="tooltip" aria-hidden="true">
                                <p v-if="shortTitle" class="tooltip__title">
                                    <span id="tooltip-target">{{ serieObj.title }}</span>
                                </p>
                                <p v-else class="tooltip__title">
                                    <span id="tooltip-target">{{ serieObj.long_title }}</span> <!-- Long title -->
                                </p>
                                <p class="tooltip__description">{{ serieObj.description }}</p>
                            </span>
                        </div>
                        <div class="fr-col-3 subContainer__fullScreenIcon">
                            <button title="Plein écran" type="button" class="fr-btn fr-btn--tertiary-no-outline fr-p-0"
                                @click="openModal">
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
                    <!-- Description and up/down tags -->
                    <div v-if="localSerieObj.indicator" class="fr-col-12 subContainer__subSection">
                        <!-- <p class="fr-text--sm fr-m-0 fr-p-0">{{ serieObj.description }}</p> -->
                        <div class="up-down__container">
                            <p class="fr-text--xs fr-m-0" v-if="serieObj.trendValue.includes('-')">
                                En baisse de
                                <span class="fr-badge fr-badge--brown-caramel fr-badge--sm fr-ml-1v"
                                    :aria-label="'Baisse de ' + serieObj.trendValue.replace('-', '').trim()">
                                    <span aria-hidden="true">↘ </span>
                                    {{ serieObj.trendValue.replace("-", "").trim() }} %
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

                <!-- TO IMPROVE  DROP DoWN SELECT-->
                <div class="databox__content">
                    <!-- Display indicator value -->
                    <div class="fr-col-12 subContainer__contentIndicator" v-if="localSerieObj.indicator">
                        <p class="fr-display--xs">{{ serieObj.value }}</p>
                    </div>
                    <div v-if="serieObj.add_sources && serieObj.select_options.length > 0"
                        class="fr-col-12 subContainer__selectSection">
                        <select-source :id_select="widgetId" :optiondefault="serieObj.option_default"
                            :lsOptions="serieObj.select_options" @select-source="transfertSourceOption">
                        </select-source>
                    </div>
                    <div class="fr-col-12 subContainer__chart"
                        v-if="!localSerieObj.indicator && serieObj.showGraph && serieObj.component">
                        <div class="subContainer__chart--section">
                            <p class="text subContainer__chart--section--unit">
                                {{ serieObj.unitValue }}
                            </p>
                        </div>
                        <div class="subContainer__chart--canvas">
                            <div :is="serieObj.component" v-bind="stringifiedSerieValues"></div>
                        </div>
                    </div>

                    <div v-if="!serieObj.showGraph || serieObj.istable" class="table-responsive">
                        <div>
                            <table-vue :captionTitle="serieObj.title" :tablevue_data="serieObj.table"></table-vue>
                        </div>
                    </div>

                    <!-- Chart legend -->
                    <div class="subContainer__legendContainer" v-if="serieObj.display_legend && !localSerieObj.indicator && serieObj.showGraph && serieObj.component
                    ">
                        <div class="subContainer__legend" v-for="index in serieObj.serie_values.y.length" :key="index">
                            <div class="subContainer__legend--icon" :style="{
                                'background-color': getHexaFromName(
                                    serieObj.serie_values.color[index - 1]
                                ),
                            }"></div>
                            <div>
                                <p class="fr-m-0 fr-text--xs">
                                    {{ serieObj.serie_values.name[index - 1] }}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Source, update and icons -->
                <div class="databox__footer">
                    <div class="fr-col-12 subContainer__footer-container">
                        <div class="subContainer__footer-text">
                            <p class="fr-text--xs fr-mb-0">
                                <strong>Source : </strong>{{ serieObj.source }} ,
                                <strong>Mis à jour :</strong>
                                {{ serieObj.update_date }}
                            </p>
                        </div>
                        <div v-if="!localSerieObj.indicator" class="fr-ml-md-6w subContainer__footer-icon">
                            <!-- Chart and table button -->
                            <div class="fr-col-12 subContainer__segmented-controls" v-if="serieObj.component">
                                <div class="subContainer__calltoaction fr-pr-1w">
                                </div>
                                <segmented-controls :showIcons="true" @chart-selected="handleChartSelected"
                                    :idcontrol="serieObj.id_accordion + '1'">
                                </segmented-controls>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- Modale LG -->
        <div v-if="isModalOpen" class="fr-modal-overlay" @click="closeModal">
            <div class="fr-modal-content" @click.stop>
                <div class="fr-modal__body">
                    <div class="fr-modal__header">
                        <button class="fr-btn--close fr-btn" @click="closeModal" title="Fermer la fenêtre modale">
                            Fermer
                        </button>
                    </div>
                    <div class="fr-modal__content">
                        <div class="fr-grid-row fr-grid-row--gutters">
                            <div class="fr-col-12 subContainer__title">
                                <div class="subContainer__icon">
                                    <transition name="fade">
                                        <h4 v-if="shortTitle" class="serie__title fr-h6 fr-mb-0">
                                            <span id="tooltip-target">{{ serieObj.title }}</span>
                                            <!-- Short title -->
                                        </h4>
                                        <h4 v-else class="serie__title fr-h6 fr-mb-0">
                                            <span id="tooltip-target">{{ serieObj.long_title }}</span>
                                            <!-- Long title -->
                                        </h4>
                                    </transition>
                                    <button class="fr-btn--tooltip fr-btn" type="button" id="button-2997"
                                        aria-describedby="tooltip-2997">
                                    </button>
                                    <span class="fr-tooltip fr-placement" id="tooltip-2997" role="tooltip"
                                        aria-hidden="true">
                                        <p v-if="shortTitle" class="tooltip__title">
                                            <span id="tooltip-target">{{ serieObj.title }}</span>
                                        </p>
                                        <p v-else class="tooltip__title">
                                            <span id="tooltip-target">{{ serieObj.long_title }}</span>
                                            <!-- Long title -->
                                        </p>
                                        <p class="tooltip__description">{{ serieObj.description }}</p>
                                    </span>
                                </div>
                                <div class="fr-col-3 subContainer__fullScreenIcon">
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
                            <!-- Description and up/down tags -->
                            <div v-if="localSerieObj.indicator" class="fr-col-12 subContainer__subSection">
                                <!-- <p class="fr-text--sm fr-m-0 fr-p-0">{{ serieObj.description }}</p> -->
                                <div class="up-down__container">
                                    <p class="fr-text--xs fr-m-0" v-if="localSerieObj.trendValue.includes('-')">
                                        En baisse de
                                        <span class="fr-badge fr-badge--brown-caramel fr-badge--sm fr-ml-1v"
                                            :aria-label="'Baisse de ' + localSerieObj.trendValue.replace('-', '').trim()">
                                            <span aria-hidden="true">↘ </span>
                                            {{ localSerieObj.trendValue.replace("-", "").trim() }} %
                                        </span>
                                    </p>
                                    <p class="fr-text--xs fr-m-0" v-else>
                                        En hausse de
                                        <span class="fr-badge fr-badge--green-emeraude fr-badge--sm fr-ml-1v"
                                            :aria-label="'Hausse de ' + localSerieObj.trendValue.trim()">
                                            <span aria-hidden="true">↗ </span>
                                            {{ localSerieObj.trendValue.trim() }} %
                                        </span>
                                    </p>
                                </div>
                            </div>
                            <!-- Display indicator value -->
                            <div class="fr-col-12 subContainer__contentIndicator" v-if="localSerieObj.indicator">
                                <p class="fr-display--xs">{{ localSerieObj.value }}</p>
                            </div>

                            <!-- TO IMPROVE  DROP DoWN SELECT-->
                            <div v-if="serieObj.add_sources && serieObj.select_options.length > 0"
                                class="fr-col-12 subContainer__selectSection">
                                <select-source :id_select="widgetId" :optiondefault="serieObj.option_default"
                                    :lsOptions="serieObj.select_options" @select-source="transfertSourceOption">
                                </select-source>
                            </div>
                            <div class="fr-col-12 subContainer__chart"></div>
                            <div class="fr-col-2"></div>
                            <div class="fr-col-8 subContainer__chart"
                                v-if="!localSerieObj.indicator && serieObj.showGraph && serieObj.component">
                                <div class="subContainer__chart--section">
                                    <p class="text subContainer__chart--section--unit">
                                        {{ serieObj.unitValue }}
                                    </p>
                                </div>
                                <div class="subContainer__chart--canvas">
                                    <div :is="serieObj.component" v-bind="stringifiedSerieValues"></div>
                                </div>
                            </div>
                            <div class="fr-col-2"></div>

                            <div v-if="!serieObj.showGraph || serieObj.istable" class="table-responsive">
                                <div>
                                    <table-vue :captionTitle="serieObj.title"
                                        :tablevue_data="serieObj.table"></table-vue>
                                </div>
                            </div>

                            <!-- Chart legend -->
                            <div class="subContainer__legendContainer" v-if="serieObj.display_legend && !localSerieObj.indicator && serieObj.showGraph && serieObj.component
                            ">
                                <div class="subContainer__legend" v-for="index in serieObj.serie_values.y.length"
                                    :key="index">
                                    <div class="subContainer__legend--icon" :style="{
                                        'background-color': getHexaFromName(
                                            serieObj.serie_values.color[index - 1]
                                        ),
                                    }"></div>
                                    <div>
                                        <p class="fr-m-0 fr-text--xs">
                                            {{ serieObj.serie_values.name[index - 1] }}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <!-- Source, update and icons -->
                            <div class="fr-col-12 subContainer__footer-container fr-mt-4v">
                                <div class="fr-pt-1w subContainer__footer-text">
                                    <p class="fr-text--xs fr-mb-0">
                                        <strong>Source : </strong>{{ serieObj.source }} ,
                                        <strong>Mis à jour :</strong>
                                        {{ serieObj.update_date }}
                                    </p>
                                </div>
                                <div v-if="!localSerieObj.indicator"
                                    class="fr-ml-md-6w fr-pt-1w subContainer__footer-icon">
                                    <!-- Chart and table button -->
                                    <div class="fr-col-12 subContainer__segmented-controls" v-if="serieObj.component">
                                        <div class="subContainer__calltoaction fr-pr-1w">
                                        </div>
                                        <segmented-controls :showIcons="true" @chart-selected="handleChartSelected"
                                            :idcontrol="serieObj.id_accordion + '1'">
                                        </segmented-controls>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- Ajout des switches en dessous -->
        <div class="fr-toggle fr-mt-6v">
            <!-- Le v-model est lié à localSerieObj.indicator -->
            <input type="checkbox" class="fr-toggle__input" aria-describedby="toggle-4633-messages" id="toggle-4633"
                v-model="localSerieObj.indicator">
            <label class="fr-toggle__label" for="toggle-4633">Afficher l'indicateur</label>
            <div class="fr-messages-group" id="toggle-4633-messages" aria-live="polite"></div>
        </div>
        <div class="fr-toggle fr-mt-6v">
            <!-- The v-model is bound to the 'shortTitle' property -->
            <input type="checkbox" class="fr-toggle__input" aria-describedby="toggle-title-messages" id="toggle-title"
                v-model="shortTitle" />
            <label class="fr-toggle__label" for="toggle-title">
                Afficher le titre court
            </label>
            <div class="fr-messages-group" id="toggle-title-messages" aria-live="polite"></div>
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
//   import { captureCanvas } from "../../services/screenshot.js";
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
            isFullScreen: false,
            isDropdownOpen: false,
            isModalOpen: false,  // Add this to track modal state
            localSerieObj: { ...this.serieObj },
            shortTitle: true,
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
                long_title: 'Ceci est un texte long qui me permet de mettre à partir de 2 lignes les éléments dans une tooltip, avec un affichage spécial',
                title: 'Ceci est un texte court',
                description: 'Ceci est un texte descriptif, il est visible uniquement au clic sur le button icône',
                showGraph: false,
                indicator: false,
                trendValue: '10',
                value: '100',
                component: 'PieChart',
                add_sources: false,
                option_default: 'ubm',
                select_options: [
                    { value: "ubm", label: 'Exposition médiatique' },
                    { value: "reach", label: 'Reach RS' },
                    { value: "nb_post", label: 'Volume de posts RS' },
                    { value: "engagement", label: 'Engagement des posts RS' },
                    { value: "aday", label: "Volume d'articles de presse" }
                ],
                update_date: '22/04/2024',
                source: "Sig",
                serie_values: {
                    x: [10, 20, 30],
                    y: [10, 20, 30],
                    name: ['Series 1', 'Series 2', 'Series 3'],
                    color: []
                },
                table: [
                    ['Header 1', 'Header 2'],
                    ['Row 1 Col 1', 'Row 1 Col 2'],
                    ['Row 2 Col 1', 'Row 2 Col 2'],
                ],
            }),
            validator(value) {
                // Check that value is an object
                if (typeof value !== 'object' || value === null) {
                    console.error('serieObj must be a non-null object.');
                    return false;
                }

                // List of required fields and their expected types
                const requiredFields = {
                    title: 'string',
                    description: 'string',
                    indicator: 'boolean',
                    trendValue: 'string',
                    value: ['string', 'number'],
                    component: 'string',
                    add_sources: 'boolean',
                    update_date: 'string',
                };

                // Check required fields
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

                // Optional fields with their expected structures
                if ('serie_values' in value) {
                    if (typeof value.serie_values !== 'object' || value.serie_values === null) {
                        console.error('serie_values must be an object.');
                        return false;
                    }
                    const serieValuesFields = {
                        y: 'array',
                        color: 'array',
                        name: 'array',
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

                if ('table' in value) {
                    if (!Array.isArray(value.table)) {
                        console.error('table must be an array.');
                        return false;
                    }
                }

                // All validations passed
                return true;
            },
        },
    },
    methods: {
        toggleDropdown() {
            this.isDropdownOpen = !this.isDropdownOpen;
        },
        // Method to open the modal
        openModal() {
            this.isModalOpen = true;
        },
        // Method to close the modal
        closeModal() {
            this.isModalOpen = false;
        },
        ...mapActions([
            'setIsSticky'
        ]),
        changeDateFormat,

        downloadCSV() {
            const name = this.serieObj.title || 'data';
            let csvContent = '';
            const csvData = this.serieObj.table || [];

            if (csvData.length > 0) {
                csvContent = csvData
                    .map(row => row.map(cell => `"${cell}"`).join(';'))
                    .join('\n');
            } else if (this.serieObj.indicator && this.serieObj.value) {
                csvContent = `"${this.serieObj.value}"`;
            } else {
                console.warn('Aucune donnée disponible pour le téléchargement.');
                return;
            }

            const BOM = '\uFEFF';
            csvContent = BOM + csvContent;

            const link = document.createElement('a');
            link.setAttribute('href', 'data:text/csv;charset=utf-8,' + encodeURIComponent(csvContent));
            link.setAttribute('download', `${name}.csv`);
            link.click();
        },

        // Parcourt un tableau d'objets qui on chacun un atribut name et les concatène
        concatName(table) {
            return table.map(obj => obj.name).join(', ');
        },
        replaceObjectsByNames(tableA, tableB) {
            return tableB.map((table, index) => {
                return table.map(item => typeof item === 'object' ? tableA[index] : item)
            })
        },
        captureCanvasBox() {
            captureCanvas(
                this.$el,
                this.serieObj.title.trim().toLowerCase().replace(/ /g, "-"),
                this.serieObj.source,
                "fr-text--s",
                "legende_dot"
            );
        },

        transfertSourceOption(selectedOption) {
            this.$emit("select-source-api", selectedOption);
        },
        handleChartSelected(type) {
            this.serieObj.showGraph = type === "graphique";
        },
        isOpen() {
            this.setIsSticky(false);
            this.$emit("opened-modal", true);
        },
    },
    mounted() {
        console.log('serieObj:', this.serieObj);
        document.addEventListener('click', this.handleClickOutside);

    },
    beforeDestroy() {
        document.removeEventListener('click', this.handleClickOutside);
    },
    computed: {
        stringifiedSerieValues() {
            const result = {};
            for (const key in this.serieObj.serie_values) {
                result[key] = JSON.stringify(this.serieObj.serie_values[key]);
            }
            return result;
        },
    },
    serieObj: {
        handler(newValue) {
            const currentIndicator = this.localSerieObj.indicator;
            this.localSerieObj = { ...newValue };
            this.localSerieObj.indicator = currentIndicator;
        },
        deep: true,
    },
};

</script>

<style scoped lang="scss">
@import "../styles/components/boxes/chartBox.scss";

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s ease;
    /* Adjust the duration and easing */
}

.fade-enter,
.fade-leave-to

/* .fade-leave-active in Vue 2.x */
    {
    opacity: 0;
}
</style>