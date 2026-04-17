<template>
  <div
    :id="'container-' + id"
    class="fr-card fr-card--shadow databox"
  >
    <!-- Header -->
    <div class="fr-p-2w databox_header">
      <component
        :is="headingLevel"
        :id="'title-' + id"
        class="fr-h6 fr-mb-0"
      >
        {{ name }}
      </component>

      <div :class="'flex screenshot-hide-' + id">
        <!-- Tooltip -->
        <button
          v-if="tooltipTitle || tooltipContent"
          class="fr-btn--tooltip fr-btn"
          type="button"
          :aria-describedby="'tooltip-' + id"
          :title="'Informations complémentaires sur le graphique ' + tooltipTitle"
        >
          Informations complémentaires sur le graphique
        </button>

        <div
          v-if="tooltipTitle || tooltipContent"
          :id="'tooltip-' + id"
          class="fr-tooltip fr-placement"
          role="tooltip"
          aria-hidden="true"
        >
          <p
            v-if="tooltipTitle"
            class="fr-text--xs fr-mb-0 fr-text--bold"
          >
            {{ tooltipTitle }}
          </p>
          <p
            v-if="tooltipContent"
            class="fr-text--xs fr-mb-0"
          >
            {{ tooltipContent }}
          </p>
        </div>

        <!-- Modal -->
        <div v-if="fullscreen && modalTitle">
          <button
            type="button"
            class="fr-btn fr-btn--sm fr-icon-fullscreen-line fr-btn--tertiary-no-outline fr-ratio-1x1"
            data-fr-opened="false"
            :aria-controls="'modal-' + id"
            :title="'Afficher la modale ' + modalTitle"
          />

          <Teleport to="body">
            <DialogModal
              :id="id"
              :modal-title="modalTitle"
              :modal-content="modalContent"
            />
          </Teleport>
        </div>

        <!-- More actions -->
        <div
          v-if="screenshot || download || actions.length > 0"
          class="fr-translate fr-nav more-actions-menu"
        >
          <div class="fr-nav__item fr-nav__item--align-right">
            <button
              type="button"
              class="fr-btn fr-btn--sm fr-icon-more-line fr-btn--tertiary-no-outline fr-ratio-1x1"
              :aria-controls="'translate-' + id"
              aria-expanded="false"
              title="Plus d'actions"
            />
            <div
              :id="'translate-' + id"
              class="fr-collapse fr-translate__menu fr-menu"
            >
              <ul class="fr-menu__list">
                <li v-if="screenshot">
                  <button
                    type="button"
                    class="fr-translate__language fr-nav__link"
                    title="Prendre une capture d'écran"
                    @click="screenshotChart()"
                  >
                    Capture d'écran
                  </button>
                </li>
                <li v-if="download">
                  <button
                    type="button"
                    class="fr-translate__language fr-nav__link"
                    title="Télécharger les données en CSV"
                    @click="downloadCSV()"
                  >
                    Télécharger en CSV
                  </button>
                </li>
                <li
                  v-for="(action, i) in actions"
                  :key="i"
                >
                  <button
                    :id="id + '_' + slugify(action)"
                    :data-action="slugify(action)"
                    :data-id="id"
                    class="fr-translate__language fr-nav__link"
                    :title="action"
                  >
                    {{ action }}
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- eslint-disable vue/no-v-html vue/no-v-text-v-html-on-component -->
    <component
      :is="/<\w+>/.test(description) ? 'span' : 'p'"
      v-if="description"
      :class="/<\w+>/.test(description) ? '' : 'fr-text--xs fr-mb-0'"
      class="fr-px-2w"
      v-html="description"
    />
    <!-- eslint-enable vue/no-v-html vue/no-v-text-v-html-on-component -->

    <div class="fr-px-2w databox_data">
      <!-- Source -->
      <div
        v-if="chartSources.length > 1"
        class="databox_source"
      >
        <div class="fr-select-group">
          <label
            class="fr-label fr-text--xs fr-mb-0"
            :for="'select-' + id"
          >
            Choisir une source de données
          </label>

          <select
            :id="'select-' + id"
            v-model="currentSource"
            name="select"
            class="fr-select fr-mt-0"
          >
            <option
              v-for="option in generateOptions(chartSources)"
              :key="option.value"
              :value="option.value"
            >
              {{ option.label }}
            </option>
          </select>
        </div>
      </div>

      <!-- Tendency -->
      <div
        v-if="trend"
        class="databox_tendency"
      >
        <p
          v-if="trend.includes('-')"
          class="fr-text--xs fr-m-0"
        >
          En baisse
          <span
            class="fr-badge fr-badge--error fr-badge--no-icon fr-badge--sm fr-ml-1v"
            :aria-label="'Baisse de ' + trend.replace('-', '').trim()"
          >
            <span
              :class="'fr-pr-1v screenshot-hide-' + id"
              aria-hidden="true"
            >↘ </span>
            {{ trend.replace('-', '').trim() }}
          </span>
        </p>
        <p
          v-else-if="trend === '0'"
          class="fr-text--xs fr-m-0"
        >
          Stable
          <span
            class="fr-badge fr-badge--info fr-badge--no-icon fr-badge--sm fr-ml-1v"
            aria-label="Valeur stable"
          >
            <span
              :class="'fr-pr-1v screenshot-hide-' + id"
              aria-hidden="true"
            >↔ </span>
            {{ trend.trim() }}
          </span>
        </p>
        <p
          v-else
          class="fr-text--xs fr-m-0"
        >
          En hausse
          <span
            class="fr-badge fr-badge--success fr-badge--no-icon fr-badge--sm fr-ml-1v"
            :aria-label="'Hausse de ' + trend.trim()"
          >
            <span
              :class="'fr-pr-1v screenshot-hide-' + id"
              aria-hidden="true"
            >↗ </span>
            {{ trend.trim() }}
          </span>
        </p>
      </div>
    </div>

    <!-- Footer -->
    <div class="fr-p-2w databox_footer">
      <div>
        <p class="fr-text--xs fr-mb-0">
          {{ source }}, {{ date }}
        </p>

        <p
          v-if="textIa"
          class="fr-text--xs fr-mb-0"
        >
          <span
            class="fr-icon-sparkling-2-line fr-icon--sm"
            aria-disabled="true"
          />
          <a
            v-if="linkIa"
            :href="linkIa"
            target="_blank"
            rel="noopener noreferrer"
          >
            {{ textIa }}
          </a>
          <span v-else>
            {{ textIa }}
          </span>
        </p>
      </div>

      <fieldset
        v-if="segmentedControl && chartSources.length > 0"
        :class="'fr-segmented fr-segmented--no-legend fr-segmented--sm screenshot-hide-' + id"
      >
        <legend class="fr-segmented__legend">
          Choisir votre vue
        </legend>
        <div class="fr-segmented__elements">
          <div class="fr-segmented__element">
            <input
              :id="'segmented-chart-' + id"
              value="1"
              type="radio"
              checked
              :name="'segmented-' + id"
              @change="selectedView = 'chart'"
            >
            <label
              class="fr-label"
              :for="'segmented-chart-' + id"
            >
              <span
                class="fr-icon-pie-chart-2-fill fr-icon--sm"
                aria-hidden="true"
              />
              <span class="fr-sr-only">Vue graphique</span>
            </label>
          </div>
          <div class="fr-segmented__element">
            <input
              :id="'segmented-table-' + id"
              value="2"
              type="radio"
              :name="'segmented-' + id"
              @change="selectedView = 'table'"
            >
            <label
              class="fr-label"
              :for="'segmented-table-' + id"
            >
              <span
                class="fr-icon-table-2 fr-icon fr-icon--sm"
                aria-hidden="true"
              />
              <span class="fr-sr-only">Vue tableau</span>
            </label>
          </div>
        </div>
      </fieldset>
    </div>

    <!-- Content -->
    <div class="fr-p-2w databox_content">
      <p class="fr-mb-0 text-center">
        <strong
          v-if="value"
          class="fr-display--xs fr-mb-0 databox_value"
        >
          {{ value }}
        </strong>
      </p>

      <div
        v-if="!value"
        :class="selectedView === 'table' ? 'fr-hidden' : 'w-full'"
        :aria-hidden="selectedView === 'table'"
      >
        <!-- Bulk create all charts source divs for teleport -->
        <div
          v-for="(chartSource, i) in chartSources"
          :id="id + '-chart-' + chartSource"
          :key="i"
          :class="currentSource !== chartSource ? 'fr-hidden' : ''"
        />
      </div>
      <div
        v-if="!value"
        :class="selectedView === 'chart' ? 'fr-hidden' : 'w-full'"
        :aria-hidden="selectedView === 'chart'"
      >
        <!-- Bulk create all table source divs for teleport -->
        <div
          v-for="(tableSource, i) in tableSources.filter((s) => s !== 'global')"
          :id="id + '-table-' + tableSource"
          :key="i"
          :class="currentSource !== tableSource ? 'fr-hidden' : ''"
        />
        <!-- Also create a global chart in case only one table is provided -->
        <div
          v-if="tableSources.includes('global')"
          :id="id + '-table-global'"
          :class="tableSources.includes(currentSource) && tableSources.length > 1 ? 'fr-hidden' : ''"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, nextTick, onMounted, ref } from 'vue';
import { toPng } from '@jpinsonneau/html-to-image';
import { slugify } from '@/utils/global.js';
import DialogModal from '@/components/DialogModal.vue';

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  headingLevel: {
    type: String,
    default: 'h3',
    validator: (value) => ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(value),
  },
  description: {
    type: String,
    default: '',
  },
  tooltipTitle: {
    type: String,
    default: '',
  },
  tooltipContent: {
    type: String,
    default: '',
  },
  modalTitle: {
    type: String,
    default: '',
  },
  modalContent: {
    type: String,
    default: '',
  },
  value: {
    type: [Number, String],
    default: '',
  },
  source: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  linkIa: {
    type: String,
    default: '',
    validator: (value) => value === '' || /^https?:\/\//.test(value),
  },
  textIa: {
    type: String,
    default: '',
  },
  defaultSource: {
    type: String,
    default: null,
  },
  trend: {
    type: [Number, String],
    default: null,
  },
  segmentedControl: {
    type: [Boolean, String],
    default: true,
  },
  fullscreen: {
    type: [Boolean, String],
    default: false,
  },
  screenshot: {
    type: [Boolean, String],
    default: false,
  },
  download: {
    type: [Boolean, String],
    default: false,
  },
  actions: {
    type: [Array, String],
    default: () => [],
  },
});

const chartSources = ref([]);
const tableSources = ref([]);
const currentSource = ref(null);
const selectedView = ref('chart');

onMounted(async () => {
  await nextTick();
  chartSources.value = [...document.querySelectorAll(`[databox-id="${props.id}"][databox-type="chart"]`)].map((el) => el.getAttribute('databox-source') || 'default');

  tableSources.value = [...document.querySelectorAll(`[databox-id="${props.id}"][databox-type="table"]`)].map((el) => el.getAttribute('databox-source') || 'global');

  currentSource.value = chartSources.value.includes(props.defaultSource) ? props.defaultSource : chartSources.value[0] || tableSources.value[0];

  selectedView.value = chartSources.value.length > 0 ? 'chart' : 'table';
});

const generateOptions = (source) =>
  source.map((option) => ({
    label: option.charAt(0).toUpperCase() + option.slice(1).replace(/-/g, ' '),
    value: option,
  }));

// Cast props to correct type
const value = computed(() => (typeof props.value === 'number' ? props.value.toString() : props.value));
const trend = computed(() => (typeof props.trend === 'number' ? props.trend.toString() : props.trend));
const segmentedControl = computed(() => [true, 'true', ''].includes(props.segmentedControl));
const fullscreen = computed(() => [true, 'true', ''].includes(props.fullscreen));
const screenshot = computed(() => [true, 'true', ''].includes(props.screenshot));
const download = computed(() => [true, 'true', ''].includes(props.download));
const actions = computed(() => (typeof props.actions === 'string' ? JSON.parse(props.actions) : props.actions));

const downloadCSV = () => {
  let type;
  let dom;
  const csv = [];

  // By default, always download the table version of the data
  if (document.querySelector(`[databox-id="${props.id}"][databox-type="table"]`)) {
    type = 'table';
    // Check if source exists to have exact data selected, this is fine if databox source is correctly set or 'default'
    dom = document.querySelector(`[databox-id="${props.id}"][databox-type="table"][databox-source="${currentSource.value}"]`);
    if (!dom) {
      // If not found, try to find the first one
      dom = document.querySelector(`[databox-id="${props.id}"][databox-type="table"]`);
    }
  } else {
    type = 'chart';
    // Check if source exists to have exact data selected, this is fine if databox source is correctly set or 'default'
    dom = document.querySelector(`[databox-id="${props.id}"][databox-type="chart"][databox-source="${currentSource.value}"]`);
    if (!dom) {
      // If not found, try to find the first one
      dom = document.querySelector(`[databox-id="${props.id}"][databox-type="chart"]`);
    }
  }
  if (type === 'chart' && chartSources.value.length > 0) {
    const x = JSON.parse(dom.getAttribute('x'));
    const y = JSON.parse(dom.getAttribute('y'));
    const name = JSON.parse(dom.getAttribute('name'));

    csv.push(`Indicateur,${name.join(',')}\n`);

    x[0].forEach((x, i) => {
      csv.push(`${x},${y.map((y) => y[i]).join(',')}\n`);
    });
  } else if (type === 'table' && tableSources.value.length > 0) {
    // Try x and y attributes for tables first, else fallback to name and line attribute
    if (dom.getAttribute('x') && dom.getAttribute('y')) {
      const x = JSON.parse(dom.getAttribute('x'));
      const y = JSON.parse(dom.getAttribute('y'));
      const name = JSON.parse(dom.getAttribute('name'));
      const tableName = dom.getAttribute('table-name') ?? '';

      csv.push(`${tableName},${name.join(',')}\n`);

      x.forEach((x, i) => {
        csv.push(`${x},${y.map((y) => y[i]).join(',')}\n`);
      });
    } else if (dom.getAttribute('line')) {
      const name = JSON.parse(dom.getAttribute('name'));
      const line = JSON.parse(dom.getAttribute('line'));

      csv.push(`${name.join(',')}\n`);

      line.forEach((row) => {
        csv.push(`${row.join(',')}\n`);
      });
    }
  } else {
    console.warn('No data available to download.');
    return;
  }

  const filename = props.name.replace(/[/|\\:*?"<>]/g, ' ').trim();
  const blob = new Blob(csv, { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = (filename ?? `data-${props.id}-${currentSource.value}`) + '.csv';
  a.style.display = 'none';
  a.click();
  window.URL.revokeObjectURL(url);
};

const screenshotChart = () => {
  const databox = document.getElementById(`container-${props.id}`);

  const dom = databox.querySelectorAll(`.screenshot-hide-${props.id}`);
  dom.forEach((item) => (item.style.display = 'none'));

  const data = databox.querySelector('.databox_data');
  const select = databox.querySelector(`#select-${props.id}`);
  const tendency = databox.querySelector('.databox_tendency');

  // Do not remove above lines. Needed for image custom CSS
  data.style.display = 'block';
  if (select) {
    select.style.boxShadow = 'none';
    select.style.appearance = 'none';
  }
  if (tendency) {
    tendency.style.marginTop = '20px';
  }

  // Transform databox to canvas to screenshot it
  toPng(databox)
    .then((dataUrl) => {
      const filename = props.name.replace(/[/|\\:*?"<>]/g, ' ').trim();
      const a = document.createElement('a');
      a.href = dataUrl;
      a.download = (filename ?? `chart-${props.id}-${currentSource.value}`) + '.png';
      a.style.display = 'none';
      a.click();
    })
    .catch((error) => {
      console.error("Erreur lors de la capture d'écran", error);
    })
    .finally(() => {
      dom.forEach((item) => item.style.removeProperty('display'));

      // Do not remove above lines. Needed for resetting image custom CSS
      data.style.removeProperty('display');
      if (select) {
        select.style.removeProperty('box-shadow');
        select.style.removeProperty('appearance');
      }
      if (tendency) {
        tendency.style.removeProperty('margin-top');
      }
    });
};
</script>

<style scoped lang="scss">
@use '@/styles/DataBox.scss';
</style>
