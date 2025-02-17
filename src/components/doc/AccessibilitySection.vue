<template>
  <div class="part_container fr-mb-10w">
    <h2 id="Accessibilité">
      Accessibilité
    </h2>
    <div class="fr-alert fr-alert--error fr-mb-5v">
      <p>
        Utilisés seuls, les graphiques du DSFR Charts sont inaccessibles aux personnes aveugles, déficientes visuelles et aux personnes handicapées motrices. Il conviendra donc d’apporter une alternative textuelle pertinente à chaque fois qu’un graphique est affiché.
      </p>
    </div>

    <h3>Non-conformités</h3>
    <p>Les principales problématiques posées par les graphiques sont les suivantes :</p>
    <ul class="fr-mb-6v">
      <li>Accès aux données des graphiques et aux cartes impossibles (critères 1.1, 1.6, 4.8, 4.9 du RGAA)</li>
      <li>Accès et contrôle au clavier impossible (critères 4.12, 10.13, 10.14 du RGAA)</li>
      <li>Information donnée uniquement par la couleur (critère 3.1 du RGAA)</li>
      <li>Contrastes de couleurs non textuels (critère 3.3 du RGAA)</li>
    </ul>

    <h3>Alternatives accessibles</h3>
    <p>La solution la plus simple et la plus efficace pour rendre les composants complexes tels que les graphiques ou les cartes est de proposer les mêmes contenus ou informations dans une alternative accessible plutôt que de chercher à travailler sur ces composants dynamiques directement.</p>
    <p>Dans certains cas comme la carte où il faudrait naviguer sur tous les départements par exemple, cela serait même contre-productif et moins utilisable de chercher à la rendre accessible au clavier.</p>
    <p><strong>On systématisera donc plutôt une approche par alternative</strong>, en privilégiant celle qui apportera le plus de confort de lecture.</p>

    <h4>Alternative 1 : utiliser un tableau</h4>
    <p>Présenter les résultats sous forme de tableau est sans doute l’option la plus simple, surtout s’il y a beaucoup de données à présenter. On privilégiera dans le cas des contenus les plus complexes la création de plusieurs tableaux simples et non de tableaux avec des cellules fusionnées pour faciliter la lecture.</p>
    <div class="fr-alert fr-alert--info fr-mb-6v">
      <p>
        Le composant databox embarque par défaut une alternative sous forme de tableau.
      </p>
    </div>

    <h4>Alternative 2 : utiliser un liste simple ou liste titrée</h4>
    <p>Lorsqu’il n’y a que quelques données à présenter, une simple liste peut suffire.</p>
    <div class="fr-mb-4v">
      <component
        :is="BarChart"
        v-bind="chartData.barChart.unicolor"
      />
    </div>
    <p>Par exemple, pour le diagramme en barre simple ci-dessus, l’alternative pourrait être :</p>
    <p>Pourcentage de français ayant réalisé un achat sur Internet au cours des 12 derniers mois :</p>
    <ul class="fr-mb-6v">
      <li>15 à 29 ans : 75,4%</li>
      <li>30 à 44 ans : 80,5%</li>
      <li>45 à 59 ans : 66,8%</li>
      <li>60 à 74 ans : 43,5%</li>
      <li>75 ans ou plus : 12,1%</li>
    </ul>

    <h4>Alternative 3 : utiliser du texte structuré</h4>
    <p>Dans d’autres cas, l’information pourrait déjà être présente dans le corps de texte adjacent ou l’alternative peut être un simple texte structuré.</p>
    <div class="fr-mb-4v">
      <component
        :is="GaugeChart"
        v-bind="chartData.gaugeChart.default"
      />
    </div>
    <p>Ainsi, sur la jauge ci-dessus, l’alternative pourrait être :</p>
    <p>En 2022, nous avons atteint les 100 000 utilisateurs. Cela correspond à 14 % de l’objectif 2026, fixé à 2 millions d’utilisateurs.</p>

    <h3>Affichage de l’alternative</h3>
    <p>L’alternative ou un moyen d’accéder à l’alternative (lien/bouton) doit être adjacente au graphique. La databox présente ainsi systématiquement l’alternative textuelle dans le contrôle segmenté en bas à droite du composant.</p>
    <p>
      Lorsqu’un graphique est utilisé seul, sans la databox, l’alternative textuelle peut être affichée dans un
      <a
        href="https://www.systeme-de-design.gouv.fr/composants-et-modeles/composants/accordeon/"
        target="_blank"
      >
        accordéon
      </a>
      présenté sous le graphique.
    </p>
    <div class="fr-alert fr-alert--info fr-mb-6v">
      <h4 class="fr-alert__title">
        Important
      </h4>
      <p>
        Il conviendra de documenter cette approche dans la déclaration d’accessibilité pour que les personnes handicapées concernées sachent qu’une alternative accessible est systématiquement fournie.
      </p>
    </div>

    <div>
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
import BarChart from '../BarChart.vue';
import GaugeChart from '../GaugeChart.vue';
import TableChart from '../TableChart.vue';
import CodeBlock from './CodeBlock.vue';
</script>
