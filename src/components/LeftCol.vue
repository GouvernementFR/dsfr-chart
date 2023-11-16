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
import { mixin } from '@/utils.js'
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
  .l_col{
    display: flex;
    flex-direction: column;
    .sep, .sep-viz {
      border-bottom:1px solid #E5E5E5;
    }

    @media (min-width: 62em) {
      .sep-viz {
        display: none;
      }
    }

    .l_box_title{
      color: border-default-blue-france;
    }
    .flex{
      display: inline-flex;
      .legende_dot{
        min-width: 0.7rem;
        width: 0.7rem;
        height: 0.7rem;
        display: inline-block;
        margin-top: 0.4rem;
        align-items: left;
        margin-right: 0.1rem;
      }
    }
    .l_box_number_container {
      display: flex;
      justify-content: space-between;
      .l_box_trend {
        &.down {
          .trend_ico {
            transform: rotate(90deg);
          }
        }
        &.horizontal {
          .trend_ico {
            transform: rotate(45deg);
          }
        }
        &.green {
          color: #357941;
          background-color: #d9ffeb;
          .trend_ico {
            path {
              fill: #357941;
            }
          }
        }
        &.red {
          color: #d80600;
          background-color: #fff4f3;
          .trend_ico {
            path {
              fill: #d80600;
            }
          }
        }
        &.blue {
          color: #0768d5;
          background-color: #f0f7ff;
          .trend_ico {
            path {
              fill: #0768d5;
            }
          }
        }
      }
    }
    .scale{
      margin-top: auto;
      .scale_container{
        height: 1.5rem;
      }
      div:last-child {
        display:flex;
        justify-content: space-between;
      }
    }

    @media (min-width: 36em) {
      .l_box_number_container {
        display: block;
        justify-content: unset;
      }
    }
  }

</style>
