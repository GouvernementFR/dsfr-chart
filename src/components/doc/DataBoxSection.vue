<template>
  <div class="part_container">
    <h2 id="Databox">
      Databox
    </h2>
    <h3>Présentation</h3>
    <p>Le composant <strong>DataBox</strong> est un composant permettant d’afficher dans un cadre normé des données sous différentes formes (graphiques, chiffres clés, tableaux, etc). Il est à utiliser pour composer un tableau de bord, ou toute page nécessitant de structurer la visualisation de données.</p>
    <p>Polyvalente, la databox intègre également des fonctionnalités interactives telles que des sélecteurs de sources, des modales, et des menus déroulants permettant la mise à disposition d’actions supplémentaires.</p>

    <div class="fr-my-6w">
      <h3 id="Databox-simple">
        Exemple de databox simple
      </h3>
      <data-box v-bind="chartData.dataBox.simple" />
      <pie-chart
        v-bind="chartData.pieChart.doughnut"
        databox-id="simple"
        databox-type="chart"
      />
      <table-chart
        databox-id="simple"
        databox-type="table"
        :x="tableParse(chartData.pieChart.doughnut.x)"
        :y="chartData.pieChart.doughnut.y"
        name="[&quot;Pourcentage&quot;]"
        table-name="Catégories"
      />
      <CodeBlock
        :component="[{name: 'data-box'}, {name: 'pie-chart'}, {name: 'table-chart'}]"
        :attributes="[
          chartData.dataBox.simple,
          {dataBoxId: 'simple', dataBoxType: 'chart', ...chartData.pieChart.doughnut},
          {dataBoxId: 'simple', dataBoxType: 'table', x: tableParse(chartData.pieChart.doughnut.x), y: chartData.pieChart.doughnut.y, name: '[&quot;Pourcentage&quot;]', tableName: 'Catégories'},
        ]"
      />
    </div>

    <div class="fr-my-6w">
      <h3 id="Databox-complète-multi-source">
        Exemple de databox complète et multi-source
      </h3>
      <data-box v-bind="chartData.dataBox.complete" />
      <scatter-chart
        v-bind="chartData.scatterChart.linked"
        databox-id="complete"
        databox-type="chart"
        databox-source="insee"
        :y="defaultScatterData"
      />
      <scatter-chart
        v-bind="chartData.scatterChart.linked"
        databox-id="complete"
        databox-type="chart"
        databox-source="pole-emploi"
        :y="sortedScatterData"
      />
      <scatter-chart
        v-bind="chartData.scatterChart.linked"
        databox-id="complete"
        databox-type="chart"
        databox-source="autre"
        :y="reversedScatterData"
      />
      <table-chart
        databox-id="complete"
        databox-type="table"
        databox-source="insee"
        :x="tableParse(chartData.scatterChart.linked.x)"
        :y="defaultScatterData"
        :name="chartData.scatterChart.linked.name"
        table-name="Années INSEE"
      />
      <table-chart
        databox-id="complete"
        databox-type="table"
        :x="tableParse(chartData.scatterChart.linked.x)"
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
          {dataBoxId: 'complete', dataBoxType: 'table', x: tableParse(chartData.scatterChart.linked.x), y: defaultScatterData, name: chartData.scatterChart.linked.name, tableName: 'Années INSEE'},
          {dataBoxId: 'complete', dataBoxType: 'table', x: tableParse(chartData.scatterChart.linked.x), y: reversedScatterData, name: chartData.scatterChart.linked.name, tableName: 'Années'},
        ]"
      />
    </div>

    <h3>Un composant flexible pour construire vos tableaux de bord</h3>
    <p>
      La databox s’appuie sur
      <a
        href="https://www.systeme-de-design.gouv.fr/fondamentaux/grille-et-points-de-rupture/"
        target="_blank"
      >
        la grille proposée par le DSFR
      </a>
      , et peut s’afficher selon vos besoins, sur une ou plusieurs colonnes de la grille, grâce à la classe <strong>fr-col</strong>. Pensez toutefois à utiliser un <strong>fr-grid-row</strong> par ligne pour permettre le bon fonctionnement des infobulles du composant.
    </p>
    <p>Vous pourrez ainsi construire des dashboard en donnant aux databox la taille nécessaire, en fonction de vos besoins métiers et de l’aspect souhaité pour vos graphiques :</p>

    <div class="fr-mb-6w">
      <div class="fr-grid-row fr-grid-row--gutters">
        <div class="fr-col">
          <data-box
            v-bind="chartData.dataBox.simple"
            id="grid-left"
          />
          <pie-chart
            v-bind="chartData.pieChart.doughnut"
            databox-id="grid-left"
            databox-type="chart"
          />
          <table-chart
            databox-id="grid-left"
            databox-type="table"
            :x="tableParse(chartData.pieChart.doughnut.x)"
            :y="chartData.pieChart.doughnut.y"
            name="[&quot;Pourcentage&quot;]"
            table-name="Catégories"
          />
        </div>
        <div class="fr-col">
          <data-box
            v-bind="chartData.dataBox.simple"
            id="grid-right"
          />
          <pie-chart
            v-bind="chartData.pieChart.doughnut"
            databox-id="grid-right"
            databox-type="chart"
          />
          <table-chart
            databox-id="grid-right"
            databox-type="table"
            :x="tableParse(chartData.pieChart.doughnut.x)"
            :y="chartData.pieChart.doughnut.y"
            name="[&quot;Pourcentage&quot;]"
            table-name="Catégories"
          />
        </div>
      </div>
      <div class="fr-grid-row fr-grid-row--gutters">
        <div class="fr-col">
          <data-box
            v-bind="chartData.dataBox.simple"
            id="grid-full"
          />
          <pie-chart
            v-bind="chartData.pieChart.doughnut"
            databox-id="grid-full"
            databox-type="chart"
          />
          <table-chart
            databox-id="grid-full"
            databox-type="table"
            :x="tableParse(chartData.pieChart.doughnut.x)"
            :y="chartData.pieChart.doughnut.y"
            name="[&quot;Pourcentage&quot;]"
            table-name="Catégories"
          />
        </div>
      </div>
    </div>

    <h3>Structure</h3>
    <p>La databox est composée des éléments suivants :</p>
    <ul>
      <li><strong>un titre</strong> (obligatoire)</li>
      <li>une infobulle permettant de préciser la donnée affichée (optionnelle)</li>
      <li>un bouton permettant l’affichage d’une modale en plein écran (optionnel)</li>
      <li>un menu à points permettant l’affichage d’actions supplémentaires (optionnel et personnalisable voir plus bas)</li>
      <li>un indicateur de tendance (optionnel)</li>
      <li><strong>la donnée principale : chiffre, graphique ou tableau</strong> (obligatoire)</li>
      <li><strong>une source</strong> (obligatoire)</li>
      <li><strong>une date de mise à jour de la donnée</strong> (obligatoire)</li>
      <li><strong>un contrôle segmenté pour afficher la donnée en vue tableau</strong> (obligatoire lorsque c’est un graphique qui est affiché)</li>
    </ul>

    <h3>Personnalisation du menu à points</h3>
    <p>Par défaut, la librairie DSFR Chart propose dans le menu à points deux fonctionnalités :</p>
    <ul>
      <li>une fonctionnalité d’export CSV des données</li>
      <li>une fonctionnalité de téléchargement de capture d’écran</li>
    </ul>
    <p>Toutefois, ces fonctionnalités sont optionnelles, et ne doivent pas apparaître obligatoirement si vous n’en avez pas le besoin. Par ailleurs, le menu à points peut contenir tous les liens ou actions utilisateurs dont vous avez besoin pour votre projet.</p>
  </div>
</template>

<script setup>
import { chartData } from '@/assets/data';
import CodeBlock from './CodeBlock.vue';

const scatterData = JSON.parse(chartData.scatterChart.linked.y);

const defaultScatterData = JSON.stringify(scatterData);
const sortedScatterData = JSON.stringify(scatterData.map((arr) => arr.sort((a, b) => a - b)));
const reversedScatterData = JSON.stringify(scatterData.map((arr) => arr.reverse()));

const tableParse = (data) => JSON.stringify(JSON.parse(data)[0]);
</script>
