<template>
  <div class="part_container fr-mb-10w">
    <h2 id="XI.-Accessibilité">
      XI. Accessibilité
    </h2>
    <p>Pour permettre d’offrir une alternative à la visualisation des données et ainsi s’adapter tous les publics, il est possible d’accompagner les graphiques d’une présentation des résultats sous la forme de tableaux.</p>

    <div class="chart_container">
      <component
        :is="TableChart"
        v-bind="chartData.tableChart.default"
      />
    </div>

    <CodeBlock
      :component="TableChart"
      :attributes="chartData.tableChart.default"
    />
  </div>
</template>

<script setup>
import { chartData } from '@/assets/data';
import TableChart from '../TableChart.vue';
import CodeBlock from './CodeBlock.vue';
</script>
