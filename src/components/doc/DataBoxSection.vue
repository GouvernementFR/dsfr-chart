<template>
  <div class="part_container">
    <h2 id="IX.-Databox">
      IX. Databox
    </h2>
    <p>
      Le composant DataBox est un composant polyvalent qui permet d'afficher des données sous différentes formes, notamment des indicateurs, des graphiques, des tableaux, etc. Il intègre également des fonctionnalités interactives telles que des sélecteurs de sources, des modales, et des menus déroulants pour des actions supplémentaires.
    </p>
    <div class="chart_container fr-mb-6w">
      <h3 id="IX.-Databox-simple">
        1. Databox simple
      </h3>
      <hr>
      <data-box
        v-bind="chartData.dataBox.simple"
      />
      <pie-chart
        databox-id="simple"
        databox-type="chart"
        v-bind="chartData.pieChart.doughnut"
      />
      <table-chart
        databox-id="simple"
        databox-type="table"
        :x="JSON.stringify(JSON.parse(chartData.pieChart.doughnut.x)[0])"
        :y="chartData.pieChart.doughnut.y"
        name="[&quot;Pourcentage&quot;]"
        table-name="Catégories"
      />
      <CodeBlock
        :component="[{name: 'data-box'}, {name: 'pie-chart'}, {name: 'table-chart'}]"
        :attributes="[
          chartData.dataBox.simple,
          {dataBoxId: 'simple', dataBoxType: 'chart', ...chartData.pieChart.doughnut},
          {dataBoxId: 'simple', dataBoxType: 'table', x: JSON.stringify(JSON.parse(chartData.pieChart.doughnut.x)[0]), y: chartData.pieChart.doughnut.y, name: '[&quot;Pourcentage&quot;]', tableName: 'Catégories'}
        ]"
      />
    </div>

    <div class="chart_container fr-mb-6w">
      <h3 id="IX.-Databox-complète-multi-source">
        2. Databox complète multi source
      </h3>
      <hr>
      <data-box
        v-bind="chartData.dataBox.complete"
      />
      <scatter-chart
        databox-id="complete"
        databox-type="chart"
        databox-source="insee"
        v-bind="chartData.scatterChart.linked"
        :y="defaultScatterData"
      />
      <scatter-chart
        databox-id="complete"
        databox-type="chart"
        databox-source="pole-emploi"
        v-bind="chartData.scatterChart.linked"
        :y="sortedScatterData"
      />
      <scatter-chart
        databox-id="complete"
        databox-type="chart"
        databox-source="autre"
        v-bind="chartData.scatterChart.linked"
        :y="reversedScatterData"
      />
      <table-chart
        databox-id="complete"
        databox-type="table"
        databox-source="insee"
        :x="JSON.stringify(JSON.parse(chartData.scatterChart.linked.x)[0])"
        :y="defaultScatterData"
        :name="chartData.scatterChart.linked.name"
        table-name="Années INSEE"
      />
      <table-chart
        databox-id="complete"
        databox-type="table"
        :x="JSON.stringify(JSON.parse(chartData.scatterChart.linked.x)[0])"
        :y="reversedScatterData"
        :name="chartData.scatterChart.linked.name"
        table-name="Années"
      />
      <CodeBlock
        :component="[{name: 'data-box'}, {name: 'scatter-chart'}, {name: 'scatter-chart'}, {name: 'scatter-chart'}, {name: 'table-chart'}, {name: 'table-chart'}]"
        :attributes="[
          chartData.dataBox.complete,
          {dataBoxId: 'complete', dataBoxType: 'chart', dataBoxSource: 'insee', ...chartData.scatterChart.linked, y: defaultScatterData },
          {dataBoxId: 'complete', dataBoxType: 'chart', dataBoxSource: 'pole-emploi', ...chartData.scatterChart.linked, y: sortedScatterData },
          {dataBoxId: 'complete', dataBoxType: 'chart', dataBoxSource: 'autre', ...chartData.scatterChart.linked, y: reversedScatterData },
          {dataBoxId: 'complete', dataBoxType: 'table', x: JSON.stringify(JSON.parse(chartData.scatterChart.linked.x)[0]), y: defaultScatterData, name: chartData.scatterChart.linked.name, tableName: 'Années INSEE'},
          {dataBoxId: 'complete', dataBoxType: 'table', x: JSON.stringify(JSON.parse(chartData.scatterChart.linked.x)[0]), y: reversedScatterData, name: chartData.scatterChart.linked.name, tableName: 'Années'}]"
      />
    </div>
  </div>
</template>

<script setup>
import { chartData } from '@/assets/data';
import CodeBlock from './CodeBlock.vue';

const scatterData = JSON.parse(chartData.scatterChart.linked.y);

const defaultScatterData = JSON.stringify(scatterData);
const sortedScatterData = JSON.stringify(scatterData.map((arr) => arr.sort((a, b) => a - b)));
const reversedScatterData = JSON.stringify(scatterData.map((arr) => arr.reverse()));
</script>
