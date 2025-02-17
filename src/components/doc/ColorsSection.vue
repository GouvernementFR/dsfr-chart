<template>
  <div class="part_container fr-mb-6w">
    <h2 id="Couleurs">
      Gestion des couleurs
    </h2>
    <p>Un graphique étant par définition une représentation visuelle d’un ensemble de données, la couleur est un paramètre avec lequel il est possible de jouer pour en améliorer la compréhension et la perception. Une utilisation appropriée des couleurs est par conséquent essentielle pour réussir vos graphiques.</p>
    <p>Dans DSFR Chart, le paramètre <strong>selectedPalette</strong> vous permet de personnaliser les couleurs utilisées dans le graphique. Choisissez parmi les options disponibles pour représenter vos données de manière appropriée :</p>
    <ul>
      <li><code>default</code> : Couleur par défaut.</li>
      <li><code>neutral</code> : Palette neutre.</li>
      <li><code>categorical</code> : Palette catégorielle par défaut.</li>
      <li><code>sequentialAscending</code> : Palette séquentielle ascendante.</li>
      <li><code>sequentialDescending</code> : Palette séquentielle descendante.</li>
      <li><code>divergentAscending</code> : Palette divergente ascendante.</li>
      <li><code>divergentDescending</code> : Palette divergente descendante.</li>
    </ul>

    <h3>Graphiques unicolores</h3>
    <p>Une représentation graphique n’a pas toujours besoin d’être colorée. Lorsqu’il n’est pas nécessaire de différencier les formes par des couleurs, on affichera les graphes avec la couleur par défaut pour les graphes unicolores, avec l’option <code>default</code>.</p>
    <div class="fr-grid-row fr-grid-row--gutters">
      <div class="fr-col fr-col-md-4">
        <ColorCard
          title="Catégorie 1"
          :color="colors['light']['dsfr-chart-colors-default']"
        />
      </div>
      <div class="fr-col fr-col-md-4">
        <ColorCard
          title="Catégorie 1"
          :is-light-theme="false"
          :color="colors['dark']['dsfr-chart-colors-default']"
        />
      </div>
    </div>
    <p class="fr-mt-6v">
      Pour mettre en évidence une donnée d’un ensemble de données, utilisez la couleur par défaut pour colorer cette donnée, et colorez les autres données en utilisant l’option <code>neutral</code>.
    </p>
    <div class="fr-grid-row fr-grid-row--gutters">
      <div class="fr-col fr-col-md-4">
        <ColorCard
          title="Catégorie 1"
          :color="colors['light']['dsfr-chart-colors-neutral']"
        />
      </div>
      <div class="fr-col fr-col-md-4">
        <ColorCard
          title="Catégorie 1"
          :is-light-theme="false"
          :color="colors['dark']['dsfr-chart-colors-neutral']"
        />
      </div>
    </div>

    <h3 class="fr-mt-6v">
      Graphiques catégoriels
    </h3>
    <p>Lorsque les formes du graphique doivent être différenciées par des couleurs mais que celles-ci ne sont pas porteuses de sens supplémentaire que la catégorisation, la palette catégorielle doit être utilisée : utilisez alors l’option <code>categorical</code>.</p>
    <p>La palette catégorielle ne comprend que 8 teintes de couleurs pour limiter le nombre de catégories affichées, car représenter plus de 8 catégories nuirait à la compréhension de l’utilisateur. Au-delà de ce nombre, il conviendra de rassembler les dernières catégories dans un ensemble “Autres”.</p>
    <div class="fr-grid-row fr-grid-row--gutters">
      <div class="fr-col-6 fr-col-md-4">
        <ColorCard
          title="Catégorie 1"
          :color="colors['light']['dsfr-chart-colors-01']"
        />
      </div>
      <div class="fr-col-6 fr-col-md-4">
        <ColorCard
          title="Catégorie 2"
          :color="colors['light']['dsfr-chart-colors-02']"
        />
      </div>
      <div class="fr-col-6 fr-col-md-4">
        <ColorCard
          title="Catégorie 3"
          :color="colors['light']['dsfr-chart-colors-03']"
        />
      </div>
      <div class="fr-col-6 fr-col-md-4">
        <ColorCard
          title="Catégorie 4"
          :color="colors['light']['dsfr-chart-colors-04']"
        />
      </div>
      <div class="fr-col-6 fr-col-md-4">
        <ColorCard
          title="Catégorie 5"
          :color="colors['light']['dsfr-chart-colors-05']"
        />
      </div>
      <div class="fr-col-6 fr-col-md-4">
        <ColorCard
          title="Catégorie 6"
          :color="colors['light']['dsfr-chart-colors-06']"
        />
      </div>
      <div class="fr-col-6 fr-col-md-4">
        <ColorCard
          title="Catégorie 7"
          :color="colors['light']['dsfr-chart-colors-07']"
        />
      </div>
      <div class="fr-col-6 fr-col-md-4">
        <ColorCard
          title="Catégorie 8"
          :color="colors['light']['dsfr-chart-colors-08']"
        />
      </div>
    </div>

    <hr class="fr-mt-6v">

    <div class="fr-grid-row fr-grid-row--gutters">
      <div class="fr-col-6 fr-col-md-4">
        <ColorCard
          title="Catégorie 1"
          :is-light-theme="false"
          :color="colors['dark']['dsfr-chart-colors-01']"
        />
      </div>
      <div class="fr-col-6 fr-col-md-4">
        <ColorCard
          title="Catégorie 2"
          :is-light-theme="false"
          :color="colors['dark']['dsfr-chart-colors-02']"
        />
      </div>
      <div class="fr-col-6 fr-col-md-4">
        <ColorCard
          title="Catégorie 3"
          :is-light-theme="false"
          :color="colors['dark']['dsfr-chart-colors-03']"
        />
      </div>
      <div class="fr-col-6 fr-col-md-4">
        <ColorCard
          title="Catégorie 4"
          :is-light-theme="false"
          :color="colors['dark']['dsfr-chart-colors-04']"
        />
      </div>
      <div class="fr-col-6 fr-col-md-4">
        <ColorCard
          title="Catégorie 5"
          :is-light-theme="false"
          :color="colors['dark']['dsfr-chart-colors-05']"
        />
      </div>
      <div class="fr-col-6 fr-col-md-4">
        <ColorCard
          title="Catégorie 6"
          :is-light-theme="false"
          :color="colors['dark']['dsfr-chart-colors-06']"
        />
      </div>
      <div class="fr-col-6 fr-col-md-4">
        <ColorCard
          title="Catégorie 7"
          :is-light-theme="false"
          :color="colors['dark']['dsfr-chart-colors-07']"
        />
      </div>
      <div class="fr-col-6 fr-col-md-4">
        <ColorCard
          title="Catégorie 8"
          :is-light-theme="false"
          :color="colors['dark']['dsfr-chart-colors-08']"
        />
      </div>
    </div>

    <h3 class="fr-mt-6v">
      Graphiques séquentiels
    </h3>
    <p>Lorsque les formes du graphique doivent être différenciées par des couleurs et que ces couleurs matérialisent une gradation, une palette séquentielle doit être utilisée. Il en existe deux versions à utiliser en fonction du besoin :</p>
    <h4>Palette séquentielle unicolore</h4>
    <p>Lorsque les formes du graphique doivent être différenciées par des couleurs et que ces couleurs matérialisent une gradation, une palette séquentielle doit être utilisée. Sélectionnez l’option <code>sequentialAscending</code> ou <code>sequentialDescending</code> en fonction du sens que vous souhaitez donner à cette gradation.</p>
    <p>En fonction du nombre de catégories, on appliquera autant de valeurs de couleurs qu’il en existe dans un dégradé allant de la couleur de départ à la couleur d’arrivée.</p>
    <div class="fr-grid-row fr-grid-row--gutters">
      <div class="fr-col-6 fr-col-md-4">
        <ColorCard
          title="Catégorie 1"
          :color="colors['light']['dsfr-chart-colors-09']"
        />
      </div>
      <div class="fr-col fr-col-md-4">
        <ColorCard
          title="Catégorie 2"
          :color="colors['light']['dsfr-chart-colors-10']"
        />
      </div>
    </div>

    <hr class="fr-mt-6v">

    <div class="fr-grid-row fr-grid-row--gutters">
      <div class="fr-col fr-col-md-4">
        <ColorCard
          title="Catégorie 1"
          :is-light-theme="false"
          :color="colors['dark']['dsfr-chart-colors-09']"
        />
      </div>
      <div class="fr-col fr-col-md-4">
        <ColorCard
          title="Catégorie 2"
          :is-light-theme="false"
          :color="colors['dark']['dsfr-chart-colors-10']"
        />
      </div>
    </div>

    <h4 class="fr-mt-6v">
      Palette séquentielle divergente
    </h4>
    <p>Cette palette convient pour matérialiser des échelles numériques mais qui intègrent des valeurs négatives, ou des plages comportant <strong>deux extrêmes avec une ligne de base au milieu</strong>.</p>
    <p>Sélectionnez l’option <code>divergentAscending</code> ou <code>divergentDescending</code> en fonction du sens que vous souhaitez donner à cette gradation. Dans la mesure du possible, le nombre de catégories doit refléter cette divergence, à travers un nombre impair de catégories distinctes (3, 5, 7, etc.) qui permettra de <strong>marquer la médiane</strong>.</p>
    <p>Dans le cas où le nombre de catégories devrait être supérieur à 5, on appliquera autant de valeurs de couleurs qu’il en existe dans un dégradé allant du vert vers le rouge en passant par le jaune.</p>
    <div class="fr-grid-row fr-grid-row--gutters">
      <div class="fr-col fr-col-md-4">
        <ColorCard
          title="Catégorie 1"
          :color="colors['light']['dsfr-chart-colors-11']"
        />
      </div>
      <div class="fr-col fr-col-md-4">
        <ColorCard
          title="Catégorie 2"
          :color="colors['light']['dsfr-chart-colors-13']"
        />
      </div>
      <div class="fr-col fr-col-md-4">
        <ColorCard
          title="Catégorie 3"
          :color="colors['light']['dsfr-chart-colors-15']"
        />
      </div>
    </div>

    <hr class="fr-mt-6v">

    <div class="fr-grid-row fr-grid-row--gutters">
      <div class="fr-col fr-col-md-4">
        <ColorCard
          title="Catégorie 1"
          :is-light-theme="false"
          :color="colors['dark']['dsfr-chart-colors-11']"
        />
      </div>
      <div class="fr-col fr-col-md-4">
        <ColorCard
          title="Catégorie 2"
          :is-light-theme="false"
          :color="colors['dark']['dsfr-chart-colors-13']"
        />
      </div>
      <div class="fr-col fr-col-md-4">
        <ColorCard
          title="Catégorie 3"
          :is-light-theme="false"
          :color="colors['dark']['dsfr-chart-colors-15']"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import ColorCard from './ColorCard.vue';
import colors from '@/assets/colors.json';
</script>

<style scoped>
code {
  color: var(--text-default-warning);
  background-color: var(--background-alt-grey);
  border: var(--border-default-grey) solid 1px;
  border-radius: 0.25rem;
  padding: 0 0.25rem;
  font-size: 0.9rem;
  font-family: 'Courier New';
}
</style>
