<template>
  <div class="l_col fr-col-12 fr-col-lg-3">
        <div v-if="props['levelNat']" data-box="number">
          <p class="fr-text--xs fr-mb-1v" :style="{color: props['textMention']}">Mise à jour : {{props['date']}}</p>
          <p class="fr-text--xs fr-text--bold fr-mb-1v" :style="{color: props['textMention']}">{{props['names']}}, {{props['locaParent']}}</p>
          <p class="fr-text--xs fr-text--bold fr-mb-2w" :style="{color: props['textMention']}">{{convertFloatToHuman(props['valueNat'])}}</p>
          <div class="sep fr-mb-2w" v-if="props['levelNat']"></div>
        </div>
        <div>
          <p class="fr-text--xs fr-mb-1v" :style="{color: props['textMention']}">Localisation</p>
          <p class="flex fr-text--sm fr-text--bold fr-mb-2w">
            <span>{{props['localisation']}}</span>
          </p>
            <p class="fr-text--xs fr-mb-1v" :style="{color: props['textMention']}">Mise à jour : {{props['date']}}</p>
            <p class="fr-text--sm fr-text--bold fr-mb-1v">{{props['names']}}</p>
            <p class="fr-text--md fr-text--bold fr-my-0">{{convertFloatToHuman(props['value'])}}</p>
        </div>
        <div class="scale">
          <div class="sep fr-my-2w"></div>
          <p class="fr-text--xs fr-mb-1w" :style="{color: props['textMention']}">Légende</p>
          <div class="scale_container" :style="{background:gradient}"></div>
          <div>
            <span class="min fr-text--sm fr-text--bold fr-mb-0">{{convertFloatToHuman(props['min'])}}</span>
            <span class="max fr-text--sm fr-text--bold fr-mb-0">{{convertFloatToHuman(props['max'])}}</span>
          </div>
        </div>
    </div>
</template>

<script>
import { mixin } from '@/utils/global.js'
export default {
  name: 'LeftCol',
  mixins: [mixin],
  data () {
    return {
    }
  },
  props: {
    props: Object
  },
  computed: {
    gradient () {
      return 'linear-gradient(90deg,' + this.props.colMin + ' 0%,' + this.props.colMax + ' 100%)'
    }
  },
  methods: {
  }
}
</script>

<style scoped lang="scss">
@import './Style/LeftCol.scss';
</style>
