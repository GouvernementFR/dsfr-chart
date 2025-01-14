<template>
  <div class="l_col fr-col-12 fr-col-lg-3">
    <div v-if="props['valueNat'] || props['valueReg']">
      <p
        class="fr-text--xs fr-mb-1v"
        :style="{ color: props['textMention'] }"
      >
        Mise à jour : {{ props['date'] }}
      </p>
      <p
        class="fr-text--xs fr-text--bold fr-mb-1v"
        :style="{ color: props['textMention'] }"
      >
        {{ props['names'] }}, en France
      </p>
      <p
        class="fr-text--xs fr-text--bold fr-mb-2w"
        :style="{ color: props['textMention'] }"
      >
        {{ convertFloatToHuman(props['value']) }}
      </p>
      <div class="sep fr-mb-2w" />
    </div>
    <div>
      <p
        class="fr-text--xs fr-mb-1v"
        :style="{ color: props['textMention'] }"
      >
        Localisation
      </p>
      <p class="flex fr-text--sm fr-text--bold fr-mb-2w">
        <span>{{ props['localisation'] }}</span>
      </p>
      <p
        class="fr-text--xs fr-mb-1v"
        :style="{ color: props['textMention'] }"
      >
        Mise à jour : {{ props['date'] }}
      </p>
      <p class="fr-text--sm fr-text--bold fr-mb-1v">
        {{ props['names'] }}
      </p>
      <p class="fr-text--md fr-text--bold fr-my-0">
        {{ convertFloatToHuman(props['valueNat'] || props['valueReg'] || props['value']) }}
      </p>
    </div>
    <div class="scale">
      <div class="sep fr-my-2w" />
      <p
        class="fr-text--xs fr-mb-1w"
        :style="{ color: props['textMention'] }"
      >
        Légende
      </p>
      <div
        class="scale_container"
        :style="{ background: gradient }"
      />
      <div>
        <span class="min fr-text--sm fr-text--bold fr-mb-0">{{ convertFloatToHuman(props['min']) }}</span>
        <span class="max fr-text--sm fr-text--bold fr-mb-0">{{ convertFloatToHuman(props['max']) }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mixin } from '@/utils/global.js';

export default {
  name: 'LeftCol',
  mixins: [mixin],
  props: {
    props: {
      type: Object,
      required: true,
    },
  },
  computed: {
    gradient() {
      return 'linear-gradient(90deg,' + this.props.colMin + ' 0%,' + this.props.colMax + ' 100%)';
    },
  },
};
</script>

<style scoped lang="scss">
@import '@/styles/LeftCol.scss';
</style>
