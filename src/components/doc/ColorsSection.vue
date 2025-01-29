<template>
  <div class="part_container fr-mb-6w">
    <h2 id="X.-Couleurs">
      X. Les couleurs
    </h2>
    <h3 class="fr-mt-5w">
      Graphiques unicolores
    </h3>
    <p>Une représentation graphique n’a pas toujours besoin d’être colorée. Lorsqu’il n’est pas nécessaire de différencier les formes par des couleurs, on affichera les graphes avec la couleur par défaut du DSFR pour les graphes unicolores :</p>
    <div class="flex fr-mt-3v">
      <span
        class="color_dot"
        style="background-color: #5c68e5"
      /> <span
        class="color_dot"
        style="background-color: #5c68e5"
      />
    </div>
    <h3 class="fr-mt-5w">
      Graphiques catégoriels
    </h3>
    <p>Lorsque les formes du graphique doivent être différenciées par des couleurs mais que celles-ci ne sont pas porteuses de sens supplémentaire que la catégorisation, la palette catégorielle doit être utilisée :</p>
    <div class="flex fr-mt-3v">
      <span
        class="color_dot"
        style="background-color: #5c68e5"
      /> <span
        class="color_dot"
        style="background-color: #5c68e5"
      />
    </div>
    <div class="flex fr-mt-3v">
      <span
        class="color_dot"
        style="background-color: #82b5f2"
      /> <span
        class="color_dot"
        style="background-color: #699bd6"
      />
    </div>
    <div class="flex fr-mt-3v">
      <span
        class="color_dot"
        style="background-color: #29598f"
      /> <span
        class="color_dot"
        style="background-color: #4878b1"
      />
    </div>
    <div class="flex fr-mt-3v">
      <span
        class="color_dot"
        style="background-color: #31a7ae"
      /> <span
        class="color_dot"
        style="background-color: #00828a"
      />
    </div>
    <div class="flex fr-mt-3v">
      <span
        class="color_dot"
        style="background-color: #81eef5"
      /> <span
        class="color_dot"
        style="background-color: #51c1c8"
      />
    </div>
    <div class="flex fr-mt-3v">
      <span
        class="color_dot"
        style="background-color: #b478f1"
      /> <span
        class="color_dot"
        style="background-color: #bc8af2"
      />
    </div>
    <div class="flex fr-mt-3v">
      <span
        class="color_dot"
        style="background-color: #cfb1f5"
      /> <span
        class="color_dot"
        style="background-color: #cfb1f5"
      />
    </div>
    <div class="flex fr-mt-3v">
      <span
        class="color_dot"
        style="background-color: #cecece"
      /> <span
        class="color_dot"
        style="background-color: #a4a4a4"
      />
    </div>
    <h3 class="fr-mt-5w">
      Graphiques séquentiels
    </h3>
    <h4>
      Palette séquentielle unicolore
    </h4>
    <p>Lorsque les formes du graphique doivent être différenciées par des couleurs et que ces couleurs matérialisent une gradation, une palette séquentielle doit être utilisée. Il en existe deux versions à utiliser en fonction du besoin, En fonction du nombre de catégories, on appliquera autant de valeurs de couleurs qu’il en existe dans un dégradé allant de la première couleur de cette échelle</p>
    <div class="flex fr-mt-3v">
      <span
        class="color_dot"
        style="background-color: #dbdaff"
      /> <span
        class="color_dot"
        style="background-color: #b8b9ff"
      />
    </div>
    <div class="flex fr-mt-3v">
      <span
        class="color_dot"
        style="background-color: #00005f"
      /> <span
        class="color_dot"
        style="background-color: #3647ca"
      />
    </div>
    <h4 class="fr-mt-5w">
      Palette séquentielle divergente
    </h4>
    <p>
      Cette palette convient également pour matérialiser des échelles numériques mais qui intègrent des valeurs négatives, ou des plages comportant deux extrêmes avec une ligne de base au milieu.<br>
      Dans la mesure du possible, le nombre de catégories doit refléter cette divergence, à travers 3 ou 5 catégories distinctes. <br>
      Dans le cas où le nombre de catégories devrait être supérieur à 5, on appliquera autant de valeurs de couleurs qu’il en existe dans un dégradé allant du vert vers le rouge en passant par le jaune. Un nombre impair doit toutefois être conservé pour marquer la valeur médiane.
    </p>
    <div class="flex fr-mt-3v">
      <span
        class="color_dot"
        style="background-color: #298641"
      /> <span
        class="color_dot"
        style="background-color: #298641"
      />
    </div>
    <div class="flex fr-mt-3v">
      <span
        class="color_dot"
        style="background-color: #79d289"
      /> <span
        class="color_dot"
        style="background-color: #449d57"
      />
    </div>
    <div class="flex fr-mt-3v">
      <span
        class="color_dot"
        style="background-color: #efb900"
      /> <span
        class="color_dot"
        style="background-color: #af8800"
      />
    </div>
    <div class="flex fr-mt-3v">
      <span
        class="color_dot"
        style="background-color: #ffa373"
      /> <span
        class="color_dot"
        style="background-color: #ffa373"
      />
    </div>
    <div class="flex fr-mt-3v">
      <span
        class="color_dot"
        style="background-color: #e91719"
      /> <span
        class="color_dot"
        style="background-color: #e16834"
      />
    </div>
    <div class="flex fr-mt-3v">
      <span
        class="color_dot"
        style="background-color: #b1b1b1"
      /> <span
        class="color_dot"
        style="background-color: #808080"
      />
    </div>
  </div>
</template>

<style scoped>
.color_dot {
  min-width: 1.5rem;
  width: 1.5rem;
  height: 1.5rem;
  min-width: 1.5rem;
  display: inline-block;
  margin-top: 0rem;
  margin-left: 1rem;
}
</style>
