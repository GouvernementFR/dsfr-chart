<template>

  <div class="l_col fr-col-12 fr-col-lg-3">
        <div v-if="props['levelNat']" data-box="number">
          <div class="indicateur_info">
            <div class="flex" >
              <p class="l_box_title fr-text--xs fr-text--bold fr-mb-1w">{{props['names']}}, En France</p>
            </div>
            <div class="l_box_number_container">
              <p class="l_box_title fr-text--xs fr-text--bold fr-mb-1w">{{convertFloatToHuman(props['valueNat'])}}</p>
            </div>
          </div>
        </div>
        <div class="sep fr-my-2w fr-my-md-2w"></div>
        <div data-box="loc">
          <p class="l_box_title fr-text--xs fr-mb-1w">Localisation</p>
          <p class="flex fr-text--sm fr-text--bold fr-my-0">
            <svg width="16" height="16" viewBox="0 0 16 16"><path d="M12.243 2.424c2.343 2.343 2.343 6.142 0 8.485L8 15.152l-4.243-4.243c-2.343-2.343-2.343-6.142 0-8.485C6.101.081 9.9.081 12.243 2.424zM4.7 3.367c-1.822 1.822-1.822 4.777 0 6.6l3.3 3.3 3.3-3.3c1.822-1.823 1.822-4.778 0-6.6-1.823-1.822-4.777-1.822-6.6 0zM8 5.333c.736 0 1.333.597 1.333 1.334C9.333 7.403 8.736 8 8 8s-1.333-.597-1.333-1.333c0-.737.597-1.334 1.333-1.334z" transform="translate(-550 -5417) translate(527 5237) translate(0 124) translate(23 56)"/></svg>
            <span class="fr-ml-1v">{{props['localisation']}}</span>
          </p>
        </div>
        <div data-box="number">
          <div class="indicateur_info">
            <div class="flex" >
              <p class="fr-text--sm fr-text--bold fr-mt-2w fr-mb-1w">{{props['names']}}</p>
            </div>
            <div class="l_box_number_container">
              <p class="fr-text--lg fr-text--bold fr-mb-1v">{{convertFloatToHuman(props['value'])}}</p>
            </div>
          </div>
        </div>

        <div class="sep fr-my-4w fr-my-md-3w"></div>
        <!-- <div v-else class="sep-viz fr-my-4w fr-my-md-3w"></div> -->
        <div class="scale">
          <p class="l_box_title fr-text--xs fr-mb-1w">Légende</p>
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

    .sep, .sep-viz {
      border-bottom:1px solid #E5E5E5;
    }

    @media (min-width: 62em) {
      .sep-viz {
        display: none;
      }
    }

    .l_box_title{
      color: #6b6b6b;
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
      .scale_container{
        height: 1.5rem;
        background-color: red;
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
