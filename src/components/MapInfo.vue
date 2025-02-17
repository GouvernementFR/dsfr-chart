<template>
  <div class="map_info fr-col-12 fr-col-lg-3">
    <div v-if="data['valueNat'] || data['valueReg']">
      <p
        class="fr-text--xs fr-mb-1v"
        :style="{ color: data['textMention'] }"
      >
        Mise à jour : {{ data['date'] }}
      </p>
      <p
        class="fr-text--xs fr-text--bold fr-mb-1v"
        :style="{ color: data['textMention'] }"
      >
        {{ data['names'] }}, en France
      </p>
      <div class="sep fr-mb-2w" />
      <p
        class="fr-text--xs fr-text--bold fr-mb-2w"
        :style="{ color: data['textMention'] }"
      >
        {{ formatNumber(data['value']) }}
      </p>
    </div>
    <div>
      <p
        class="fr-text--xs fr-mb-1v"
        :style="{ color: data['textMention'] }"
      >
        Localisation
      </p>
      <p class="flex fr-text--sm fr-text--bold fr-mb-2w">
        <span>{{ data['localisation'] }}</span>
      </p>
      <p
        class="fr-text--xs fr-mb-1v"
        :style="{ color: data['textMention'] }"
      >
        Mise à jour : {{ data['date'] }}
      </p>
      <p class="fr-text--sm fr-text--bold fr-mb-1v">
        {{ data['names'] }}
      </p>
      <p class="fr-text--md fr-text--bold fr-my-0">
        {{ formatNumber(data['valueNat'] || data['valueReg'] || data['value']) }}
      </p>
    </div>
    <div class="scale fr-mt-auto">
      <div class="sep fr-my-2w" />
      <p
        class="fr-text--xs fr-mb-1w"
        :style="{ color: data['textMention'] }"
      >
        Légende
      </p>
      <div
        class="scale_container"
        :style="{ background: gradient }"
      />
      <div class="scale_values">
        <span class="min fr-text--sm fr-text--bold fr-mb-0">{{ formatNumber(data['min']) }}</span>
        <span class="max fr-text--sm fr-text--bold fr-mb-0">{{ formatNumber(data['max']) }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { formatNumber } from '@/utils/global.js';

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
});

const gradient = computed(() => {
  return 'linear-gradient(90deg,' + props.data['colorMin'] + ' 0%,' + props.data['colorMax'] + ' 100%)';
});
</script>

<style scoped lang="scss">
@import '@/styles/MapInfo.scss';
</style>
