/* eslint-disable */
<template>
    <div>
        <div :class="['fr-container fr-card--no-icon fr-card--shadow fr-p-2w subContainer databox-card']">
            <div class="fr-grid-row fr-grid-row--gutters">
                <div class="fr-col-12 subContainer__title">
                    <div class="subContainer__icon">
                        <h4 class="serie__title fr-h6 fr-mb-0">
                            <span id="tooltip-target">{{ serieObj.title }}</span>
                        </h4>
                        <span class="icon-container">
                            <span class="serie__icon fr-icon-question-line fr-icon--sm fr-pl-1w" aria-hidden="true"
                                @click="toggleTooltip"></span>
                            <div v-if="tooltipVisible" role="tooltip" id="tooltip" class="tooltip"
                                :aria-labelledby="'tooltip-target'">
                                <div class="tooltip__triangle"></div>
                                <strong class="tooltip__title">{{ serieObj.title }}</strong>
                                <p class="tooltip__description">{{ serieObj.description }}</p>
                            </div>
                        </span>
                    </div>
                    <div class="fr-col-3 subContainer__fullScreenIcon">
                        <button title="Plein écran" type="button"
                            class="fr-btn fr-btn--tertiary-no-outline fr-p-0" @click="openModal">
                            <span class="fr-icon-modal-fill" aria-label="Afficher la modale" aria-hidden="true"></span>
                        </button>
                        <button  title="dropdow" type="button" class="dropdown-toggle fr-btn fr-btn--tertiary-no-outline fr-p-0" @click="toggleDropdown">
                            <span class="fr-icon-more-line" aria-hidden="true"></span>
                        </button>
                        <div class="dropdown-menu" :class="{ show: isDropdownOpen }">
                            <a class="dropdown-item">Action databox</a>
                            <a class="dropdown-item">Action databox</a>
                            <a class="dropdown-item">Action databox</a>
                        </div>
                    </div>
                </div>
                <!-- Description and up/down tags -->
                <div v-if="serieObj.indicator" class="fr-col-12 subContainer__subSection">
                    <!-- <p class="fr-text--sm fr-m-0 fr-p-0">{{ serieObj.description }}</p> -->
                    <div class="up-down__container">
                        <p class="fr-text--xs fr-m-0" v-if="serieObj.trendValue.includes('-')">
                            En baisse de
                            <span class="fr-badge fr-badge--brown-caramel fr-badge--sm"
                                :aria-label="'Baisse de ' + serieObj.trendValue.replace('-', '').trim()">
                                <span aria-hidden="true">↘ </span>
                                {{ serieObj.trendValue.replace("-", "").trim() }} %
                            </span>
                        </p>
                        <p class="fr-text--xs fr-m-0" v-else>
                            En hausse de
                            <span class="fr-badge fr-badge--green-emeraude fr-badge--sm"
                                :aria-label="'Hausse de ' + serieObj.trendValue.trim()">
                                <span aria-hidden="true">↗ </span>
                                {{ serieObj.trendValue.trim() }} %
                            </span>
                        </p>
                    </div>
                </div>
                <!-- Display indicator value -->
                <div class="fr-col-12 subContainer__contentIndicator" v-if="serieObj.indicator">
                    <p class="fr-display--xs">{{ serieObj.value }}</p>
                </div>

                <!-- TO IMPROVE  DROP DoWN SELECT-->
                <div v-if="serieObj.add_sources && serieObj.select_options.length > 0"
                    class="fr-col-12 subContainer__selectSection">
                    <select-source :id_select="widgetId" :optiondefault="serieObj.option_default"
                        :lsOptions="serieObj.select_options" @select-source="transfertSourceOption">
                    </select-source>
                </div>
                <div class="fr-col-12 subContainer__chart" v-if="showGraph && serieObj.component">
                    <div class="subContainer__chart--section">
                        <p class="text subContainer__chart--section--unit">
                            {{ serieObj.unitValue }}
                        </p>
                    </div>
                    <div class="subContainer__chart--canvas">
                        <div :is="serieObj.component" v-bind="stringifiedSerieValues"></div>
                    </div>
                </div>

                <div class="table-responsive">
                    <div v-if="!showGraph || serieObj.istable">
                        <table-vue :captionTitle="serieObj.title" :tablevue_data="serieObj.table"></table-vue>
                    </div>
                </div>

                <!-- Chart legend -->
                <div class="subContainer__legendContainer"
                v-if="serieObj.display_legend && !serieObj.indicator && showGraph && serieObj.component
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

                <!-- Source, update and icons -->
                <div class="fr-col-12 subContainer__footer-container fr-mt-4v">
                    <div class="fr-pt-1w subContainer__footer-text">
                        <p class="fr-text--xs fr-mb-0">
                            <strong>Source : </strong>{{ serieObj.source }} ,
                            <strong>Mis à jour :</strong>
                            {{ serieObj.update_date }}
                        </p>
                    </div>
                    <div class="fr-ml-md-6w fr-pt-1w subContainer__footer-icon">
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
                                    <h4 class="serie__title fr-h6 fr-mb-0">
                                        <span id="tooltip-target">{{ serieObj.title }}</span>
                                    </h4>
                                    <span class="icon-container">
                                        <span class="serie__icon fr-icon-question-line fr-icon--sm fr-pl-1w"
                                            aria-hidden="true" @click="toggleTooltip"></span>
                                        <div v-if="tooltipVisible" role="tooltip" id="tooltip" class="tooltip"
                                            :aria-labelledby="'tooltip-target'">
                                            <div class="tooltip__triangle"></div>
                                            <strong class="tooltip__title">{{ serieObj.title }}</strong>
                                            <p class="tooltip__description">{{ serieObj.description }}</p>
                                        </div>
                                    </span>
                                </div>
                                <div class="fr-col-3 subContainer__fullScreenIcon">
                                    <button v-if="!isModalOpen" aria-label="Plein écran" title="Plein écran" type="button"
                                        class="fr-btn fr-btn--tertiary-no-outline" @click="openModal">
                                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none"
                                            xmlns="http://www.w3.org/2000/svg" aria-label="Afficher la modale"
                                            aria-hidden="true">
                                            <path
                                                d="M21.3333 9.99951H22.6666V13.9995H21.3333V11.3328H18.6666V9.99951H21.3333ZM10.6666 9.99951H13.3333V11.3328H10.6666V13.9995H9.33325V9.99951H10.6666ZM21.3333 20.6662V17.9995H22.6666V21.9995H18.6666V20.6662H21.3333ZM10.6666 20.6662H13.3333V21.9995H9.33325V17.9995H10.6666V20.6662Z"
                                                fill="#00008F" />
                                            <rect x="0.5" y="0.499512" width="31" height="31" stroke="#DDDDDD" />
                                        </svg>
                                    </button>
                                    <button class="dropdown-toggle" @click="toggleDropdown">
                                        <span class="fr-icon-more-line" aria-hidden="true"></span>
                                    </button>
                                    <div class="dropdown-menu" :class="{ show: isDropdownOpen }">
                                        <a class="dropdown-item">Action databox</a>
                                        <a class="dropdown-item">Action databox</a>
                                        <a class="dropdown-item">Action databox</a>
                                    </div>
                                </div>
                            </div>
                            <!-- Description and up/down tags -->
                            <div v-if="serieObj.indicator" class="fr-col-12 subContainer__subSection">
                                <!-- <p class="fr-text--sm fr-m-0 fr-p-0">{{ serieObj.description }}</p> -->
                                <div class="up-down__container">
                                    <p class="fr-text--xs fr-m-0" v-if="serieObj.trendValue.includes('-')">
                                        En baisse de
                                        <span class="fr-badge fr-badge--brown-caramel fr-badge--sm"
                                            :aria-label="'Baisse de ' + serieObj.trendValue.replace('-', '').trim()">
                                            <span aria-hidden="true">↘ </span>
                                            {{ serieObj.trendValue.replace("-", "").trim() }} %
                                        </span>
                                    </p>
                                    <p class="fr-text--xs fr-m-0" v-else>
                                        En hausse de
                                        <span class="fr-badge fr-badge--green-emeraude fr-badge--sm"
                                            :aria-label="'Hausse de ' + serieObj.trendValue.trim()">
                                            <span aria-hidden="true">↗ </span>
                                            {{ serieObj.trendValue.trim() }} %
                                        </span>
                                    </p>
                                </div>
                            </div>
                            <!-- Display indicator value -->
                            <div class="fr-col-12 subContainer__contentIndicator" v-if="serieObj.indicator">
                                <p class="fr-display--xs">{{ serieObj.value }}</p>
                            </div>

                            <!-- TO IMPROVE  DROP DoWN SELECT-->
                            <div v-if="serieObj.add_sources && serieObj.select_options.length > 0"
                                class="fr-col-12 subContainer__selectSection">
                                <select-source :id_select="widgetId" :optiondefault="serieObj.option_default"
                                    :lsOptions="serieObj.select_options" @select-source="transfertSourceOption">
                                </select-source>
                            </div>
                            <div class="fr-col-12 subContainer__chart" v-if="showGraph && serieObj.component">
                                <div class="subContainer__chart--section">
                                    <p class="text subContainer__chart--section--unit">
                                        {{ serieObj.unitValue }}
                                    </p>
                                </div>
                                <div class="subContainer__chart--canvas">
                                    <!-- <bar-chart x='[["4", "2", "3", "5"], ["4", "2", "3", "5"], ["4", "2", "3","5"]]'
                                y='[[40, 50, 10, 5], [10, 20, 30, 12], [12, 12, 20, 23]]'>
                    </bar-chart> -->
                                    <component :is="serieObj.component" v-bind="stringifiedSerieValues"></component>
                                </div>
                            </div>

                            <div class="table-responsive">
                                <div v-if="!showGraph || serieObj.istable">
                                    <table-vue :captionTitle="serieObj.title"
                                        :tablevue_data="serieObj.table"></table-vue>
                                </div>
                            </div>

                            <!-- Chart legend -->
                            <div class="subContainer__legendContainer" v-if="
                                serieObj.display_legend &&
                                !serieObj.indicator &&
                                showGraph &&
                                serieObj.component
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
                            <div class="fr-col-12 subContainer__footer-container">
                                <div class="fr-pt-1w subContainer__footer-text">
                                    <p class="fr-text--xs fr-mb-1w">
                                        <strong>Source : </strong>{{ serieObj.source }} ,
                                        <strong>Mis à jour :</strong>
                                        {{ serieObj.update_date }}
                                    </p>
                                </div>
                                <div class="fr-ml-md-6w fr-pt-1w subContainer__footer-icon">
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
            showGraph: true,
            isFullScreen: false,
            isDropdownOpen: false,
            tooltipVisible: false,
            isModalOpen: false,  // Add this to track modal state
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
                // title: 'Ceci est un texte long qui me permet de mettre à partir de 2 lignes les éléments dans une tooltip, avec un affichage spécial',
                title: 'Ceci est un texte court',
                description: 'Description de la dataBox',
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
        toggleTooltip() {
            // Bascule entre afficher/cacher le tooltip
            this.tooltipVisible = !this.tooltipVisible;
        },
        // Method to open the modal
        openModal() {
            this.isModalOpen = true;
        },
        // Method to close the modal
        closeModal() {
            this.isModalOpen = false;
        },
        handleClickOutside(event) {
            if (!this.$el.contains(event.target)) {
                this.tooltipVisible = false;
            }
        },
        ...mapActions([
            'setIsSticky'
        ]),
        changeDateFormat,

        toggleFullScreen() {
            this.isFullScreen = !this.isFullScreen
            const element = this.$el
            if (this.isFullScreen) {
                if (element.requestFullscreen) {
                    element.requestFullscreen().catch((err) => {
                        console.error('Erreur lors du passage en plein écran :', err)
                    })
                } else if (element.webkitRequestFullscreen) {
                    element.webkitRequestFullscreen()
                } else if (element.msRequestFullscreen) {
                    element.msRequestFullscreen()
                }
            } else {
                if (document.exitFullscreen) {
                    document.exitFullscreen()
                } else if (document.webkitExitFullscreen) {
                    document.webkitExitFullscreen()
                } else if (document.msExitFullscreen) {
                    document.msExitFullscreen()
                }
            }
        },

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
            this.showGraph = type === "graphique";
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
};

</script>

<style scoped lang="scss">
@import "../styles/components/boxes/chartBox.scss";
</style>