# DSFR Chart

DSFR Chart est un module complémentaire au Système de design de l’État (DSFR) pour la visualisation de données. Il s'agit d'une bibliothèque de composants [Vue.js](https://vuejs.org/), sous la forme de web-components, à destination des développeurs ayant besoin de graphiques pour représenter des données.

## Demo

L'ensemble des graphiques disponibles sont mis en situation sur la page de [demo](https://gouvernementfr.github.io/dsfr-chart/).

## Installation

L'installation de **DSFR Chart** peut se faire de manières différentes. En téléchargeant l'ensemble des fichiers nécessaires à son utilisation ou en utilisant le gestionnaire de paquets **NPM**.

### Fichiers statiques

Il est possible de télécharger l'ensemble du DSFR au format zip ci-dessous. Le zip contient un ensemble de fichiers CSS et Javascript permettant l'utilisation des différents graphiques.

Vous trouverez sur la page [Release de Github](https://github.com/GouvernementFR/dsfr-chart/releases), toutes les sources des versions précédentes et la dernière en date.

### NPM

**DSFR Chart** est disponible sur NPM via un ensemble de packages qu'il est possible d'ajouter directement à votre projet. Il est de ce fait nécessaire d'installer [NodeJS](https://nodejs.org), et d'avoir un fichier **package.json** à la racine de votre projet. (Il est possible d'en créer un directement via la commande `npm init`).

Une fois en place, il suffit d'installer le package **dsfr-chart** contenant l’ensemble des composants:

```
npm install @gouvfr/dsfr-chart
```

Une fois terminé dsfr-chart sera alors installé dans le dossier `node_modules/dsfr-chart/`

### Structure de DSFR-Chart

La structure mise à disposition, sur le zip ou npm est la suivante :

- **Charts** : contient les fichiers js et css à importer pour utiliser toutes les représentations disponibles.

- **Un dossier par type de représentation** (ex : LineChart) contenant les fichiers js et css à importer pour l'utilisation d'un seul type de graphique.

### Configuration de votre projet

#### Prérequis

**DSFR Chart** doit être utilisé dans un projet utilisant le [DSFR](https://www.systeme-de-design.gouv.fr/comment-utiliser-le-dsfr/developpeurs/prise-en-main-du-dsfr/). Le projet doit à minima importer les feuilles css :

- dsfr.min.css
- icons-system.min.css (dans _utility/icons/icons-system_)

Il est également nécessaire de charger [l'API Javascript](https://www.systeme-de-design.gouv.fr/comment-utiliser-le-dsfr/developpeurs/api-javascript/) : dsfr.module.min.js

#### Importation des web-components

Pour pouvoir utiliser une représentation graphique dans votre projet, il est nécessaire de charger le fichier javascript correspondant ainsi que sa feuille css associée.

Il existe deux possibilités :

- Charger tous les composants :

```html
<script src="./DSFRChart.js"></script>
<link rel="stylesheet" href="./DSFRChart.css">
```

- Charger uniquement un ou plusieurs composants nécessaires (ex : ScatterChart) :

```html
<script src="./ScatterChart.js"></script>
<link rel="stylesheet" href="./ScatterChart.css">
```

### Les différentes représentations graphiques

Ce catalogue présente l'ensemble des graphiques disponibles dans le module complémentaire au Système de design de l'État (DSFR) pour la visualisation de données. Les différents types de graphiques sont disponibles en thème clair et thème sombre. Par ailleurs, les options de chacun des graphiques sont également présentés dans ce document.

# I. Graphique en ligne (LineChart)

Les graphiques en ligne sont accessibles à travers la balise : `<line-chart>`.

## Paramètres

### Obligatoires :

- **x** : _(String)_ Les valeurs sur l'axe des abscisses sous forme d'une liste entre crochets.
- **y** : _(String)_ Les valeurs sur l'axe des ordonnées sous forme d'une liste entre crochets.

### Optionnels :

- **selectedPalette** : _(String)_ Permet de choisir la palette de couleurs utilisée pour le graphique. Les valeurs possibles sont :

  - `'categorical'` : Palette catégorielle par défaut.
  - `'sequentialAscending'` : Palette séquentielle ascendante.
  - `'sequentialDescending'` : Palette séquentielle descendante.
  - `'divergentAscending'` : Palette divergente ascendante.
  - `'divergentDescending'` : Palette divergente descendante.
  - `'neutral'` : Palette neutre.
  - `'defaultColor'` : Couleur par défaut.
  - _(laisser vide pour utiliser la palette par défaut)_

- **highlightIndex** : _(Number | Array)_ Index ou liste d'index des points à mettre en avant (utilisé principalement avec la palette `'neutral'`).
- **unitTooltip** : _(String)_ Permet de spécifier l'unité à afficher dans l'infobulle (tooltip) du graphique. Par exemple, `%`, `€`, `$`, etc.

---

### 1. Graphique en ligne simple

**Exemple**:

```html
<line-chart x="[1, 2, 3, 4]" y="[10, 20, 30, 40]" unit-tooltip="%"></line-chart>
```

---

### 2. Graphique en ligne avec palette divergente ascendante

**Exemple**:

```html
<line-chart
  x="[1, 2, 3, 4]"
  y="[10, 20, 30, 40]"
  selectedPalette="divergentAscending"
></line-chart>
```

---

### 3. Graphique en ligne avec mise en avant de points spécifiques

**Exemple**:

```html
<line-chart
  x="[1, 2, 3, 4]"
  y="[10, 20, 30, 40]"
  selectedPalette="neutral"
  highlightIndex="[2]"
></line-chart>
```

---

### 4. Graphique en ligne avec unité personnalisée dans l'infobulle

**Exemple**:

```html
<line-chart
  x="[1, 2, 3, 4]"
  y="[1000, 2000, 3000, 4000]"
  unit-tooltip="€"
></line-chart>
```

---

## Notes supplémentaires

- **selectedPalette** : Ce paramètre vous permet de personnaliser les couleurs utilisées dans le graphique. Choisissez parmi les options disponibles pour représenter vos données de manière appropriée.
- **highlightIndex** : Utilisé en combinaison avec la palette `'neutral'`, ce paramètre vous permet de mettre en avant des points spécifiques du graphique. Les index commencent à **0**.
- **unitTooltip** : Ce paramètre vous permet de spécifier l'unité qui sera affichée dans l'infobulle (tooltip) lorsque l'utilisateur survole un point du graphique. Cela rend la lecture des valeurs plus intuitive en indiquant l'unité de mesure.

---

## Conseils d'utilisation

- **Format des données** : Assurez-vous que les valeurs de `x` et `y` sont des chaînes représentant des listes, par exemple `x="[1, 2, 3]"`.
- **Combinaison des options** : Vous pouvez combiner plusieurs options pour personnaliser davantage votre graphique, par exemple en utilisant `selectedPalette` avec `highlightIndex` et `unitTooltip`.
- **Indexation** : Les index utilisés dans `highlightIndex` correspondent aux positions des points dans vos données `y`. Par exemple, `highlightIndex="[0]"` mettra en avant le premier point.

---

## Exemple combinant plusieurs options

**Exemple**:

```html
<line-chart
  x="[1, 2, 3, 4, 5]"
  y="[15, 25, 35, 45, 55]"
  selectedPalette="neutral"
  highlightIndex="[2, 4]"
  unit-tooltip="kWh"
></line-chart>
```

---

# Graphique en multilignes (LineChart multiples)

Les graphiques en multilignes (ou LineChart multiples) sont accessibles à travers la balise : `<multi-line-chart>`.

## Paramètres

### Obligatoires :

- **x** : _(String)_ Les valeurs sur l'axe des abscisses sous forme d'une liste de listes entre crochets.
- **y** : _(String)_ Les valeurs sur l'axe des ordonnées sous forme d'une liste de listes entre crochets.

### Optionnels :

- **selectedPalette** : _(String)_ Permet de choisir la palette de couleurs utilisée pour le graphique. Les valeurs possibles sont :

  - `'categorical'` : Palette catégorielle par défaut.
  - `'sequentialAscending'` : Palette séquentielle ascendante.
  - `'sequentialDescending'` : Palette séquentielle descendante.
  - `'divergentAscending'` : Palette divergente ascendante.
  - `'divergentDescending'` : Palette divergente descendante.
  - `'neutral'` : Palette neutre.
  - `'defaultColor'` : Couleur par défaut.
  - _(laisser vide pour utiliser la palette par défaut)_

- **unitTooltip** : _(String)_ Permet de spécifier l'unité à afficher dans l'infobulle (tooltip) du graphique. Par exemple, `%`, `€`, `$`, etc.

---

**Exemple**:

```html
<multiline-chart
  x="[[1, 2, 3], [1, 2, 3]]"
  y="[[30, 10, 20], [10, 20, 30]]"
  selectedPalette="divergentAscending"
  unit-tooltip="%"
></multiline-chart>
```
---

## Notes supplémentaires

- **selectedPalette** : Ce paramètre vous permet de personnaliser les couleurs utilisées pour chaque ligne du graphique. Les différentes options vous offrent une flexibilité pour représenter vos données selon vos besoins esthétiques ou sémantiques.
- **unitTooltip** : Ce paramètre vous permet de spécifier l'unité qui sera affichée dans l'infobulle (tooltip) lorsque l'utilisateur survole un point du graphique. Cela rend la lecture des valeurs plus intuitive en indiquant l'unité de mesure.

---

## Autres exemples

### 1. Multilignes avec palette séquentielle ascendante et unité personnalisée

**Exemple**:

```html
<multiline-chart
  x="[[1, 2, 3], [1, 2, 3]]"
  y="[[100, 200, 300], [150, 250, 350]]"
  selectedPalette="sequentialAscending"
  unit-tooltip="€"
></multiline-chart>
```

---

### 2. Multilignes avec palette neutre

**Exemple**:

```html
<multiline-chart
  x="[[1, 2, 3], [1, 2, 3]]"
  y="[[5, 15, 25], [10, 20, 30]]"
  selectedPalette="neutral"
></multiline-chart>
```

---

## Conseils d'utilisation

- **Format des données** : Assurez-vous que les valeurs de `x` et `y` sont des chaînes représentant des listes de listes, par exemple `x="[[1, 2, 3], [1, 2, 3]]"`.
- **Combinaison des options** : Vous pouvez combiner les options `selectedPalette` et `unitTooltip` pour personnaliser davantage votre graphique.
- **Personnalisation des séries** : Chaque série de données sera représentée par une ligne distincte. Les couleurs des lignes seront attribuées en fonction de la palette sélectionnée.

---

# II. Graphique en barre (BarChart)

Les graphiques en barre sont accessibles à travers la balise : `<bar-chart>`.

## Paramètres

### Obligatoires :

- **x** : _(String)_ Les valeurs sur l’axe des abscisses sous forme d’une liste de listes entre crochets.
- **y** : _(String)_ Les valeurs sur l’axe des ordonnées sous forme d’une liste de listes entre crochets.

### Optionnels :

- **name** : _(String)_ Les noms des séries de données sous forme d'une liste entre crochets.
- **selectedPalette** : _(String)_ Permet de choisir la palette de couleurs utilisée pour le graphique. Les valeurs possibles sont :

  - `'categorical'` : Palette catégorielle par défaut.
  - `'sequentialAscending'` : Palette séquentielle ascendante.
  - `'sequentialDescending'` : Palette séquentielle descendante.
  - `'divergentAscending'` : Palette divergente ascendante.
  - `'divergentDescending'` : Palette divergente descendante.
  - `'neutral'` : Palette neutre.
  - `'defaultColor'` : Couleur par défaut.
  - _(laisser vide pour utiliser la palette par défaut)_

- **highlightIndex** : _(Array)_ Liste d'index des barres à mettre en avant (utilisé principalement avec la palette `'neutral'`).
- **unitTooltip** : _(String)_ Permet de spécifier l'unité à afficher dans l'infobulle (tooltip) du graphique. Par exemple, `%`, `€`, `$`, etc.
- **horizontal** : _(Boolean)_ Permet d'afficher le graphique en barre horizontales. Mettre à `true` pour activer.
- **stacked** : _(Boolean)_ Permet d'empiler les barres pour afficher des données empilées. Mettre à `true` pour activer.

---

### 1. Barres verticales simples

**Exemple**:

```html
<bar-chart
  x='[["2025", "2030", "2035", "2040", "2050", "2060", "2070"]]'
  y="[[69.1, 70.3, 71.4, 72.5, 74, 75.2, 76.4]]"
  name='["Population en millions"]'
  selected-palette="defaultColor"
  unit-tooltip="millions"
></bar-chart>
```
---

### 2. Barres horizontales

Pour tracer un **BarChart horizontal**, il faut renseigner l’option **horizontal="true"**.

**Exemple**:

```html
<bar-chart
  x='[["2025", "2030", "2035", "2040"]]'
  y="[[10, 20, 30, 40]]"
  horizontal="true"
  selected-palette="categorical"
></bar-chart>
```

---

### 3. Barres empilées

Pour tracer un **BarChart empilé**, il faut renseigner l’option **stacked="true"**.

**Exemple**:

```html
<bar-chart
  x='[["Catégorie A", "Catégorie B", "Catégorie C", "Catégorie D"]]'
  y="[[15, 19, 15, 13], [45, 40, 47, 41], [36, 32, 34, 44], [4, 9, 4, 2]]"
  name='["Série 1", "Série 2", "Série 3", "Série 4"]'
  stacked="true"
  selected-palette="divergentDescending"
  unit-tooltip="%"
></bar-chart>
```

---

### 4. Barres avec mise en avant de certaines catégories

Utilisez **highlightIndex** pour mettre en avant certaines barres, en combinaison avec **selectedPalette="neutral"**.

**Exemple**:

```html
<bar-chart
  x='[["Jan", "Feb", "Mar", "Apr", "May", "Jun"]]'
  y="[[5, 10, 15, 20, 25, 30]]"
  selected-palette="neutral"
  highlightIndex="[2, 4]"
  unit-tooltip="k€"
></bar-chart>
```

---

### 5. Barres avec palette séquentielle ascendante

**Exemple**:

```html
<bar-chart
  x='[["Q1", "Q2", "Q3", "Q4"]]'
  y="[[200, 400, 600, 800]]"
  selected-palette="sequentialAscending"
  unit-tooltip="units"
></bar-chart>
```

---

## Notes supplémentaires

- **selectedPalette** : Ce paramètre vous permet de personnaliser les couleurs utilisées dans le graphique. Choisissez parmi les options disponibles pour représenter vos données de manière appropriée.
- **highlightIndex** : Utilisé en combinaison avec la palette `'neutral'`, ce paramètre vous permet de mettre en avant des barres spécifiques du graphique. Les index commencent à **0**.
- **unitTooltip** : Ce paramètre vous permet de spécifier l'unité qui sera affichée dans l'infobulle (tooltip) lorsque l'utilisateur survole une barre du graphique. Cela rend la lecture des valeurs plus intuitive en indiquant l'unité de mesure.
- **horizontal** : Définit l'orientation du graphique. Par défaut, les barres sont verticales.
- **stacked** : Permet d'empiler les séries de données, utile pour visualiser la contribution de chaque série au total.

---

## Conseils d'utilisation

- **Format des données** : Assurez-vous que les valeurs de `x` et `y` sont des chaînes représentant des listes de listes, par exemple `x='[["Label1", "Label2"]]'` et `y='[[10, 20], [30, 40]]'`.
- **Combinaison des options** : Vous pouvez combiner plusieurs options pour personnaliser davantage votre graphique, comme utiliser `horizontal="true"` avec `stacked="true"`.
- **Indexation** : Les index utilisés dans `highlightIndex` correspondent aux positions des barres dans vos données `x`. Par exemple, `highlightIndex="[0, 2]"` mettra en avant la première et la troisième barre.

---

## Exemple combinant plusieurs options

**Exemple**:

```html
<bar-chart
  x='[["Produit A", "Produit B", "Produit C", "Produit D"]]'
  y="[[50, 70, 30, 90]]"
  name='["Ventes"]'
  selected-palette="neutral"
  highlightIndex="[3]"
  horizontal="true"
  unit-tooltip="k€"
></bar-chart>
```

### Options de lignes verticales et horizontales

Sur tous les graphiques présentés ci-dessus, il est possible d'ajouter des lignes verticales et horizontales pour mettre en évidence des seuils ou des valeurs spécifiques.

## Paramètres

### Optionnels :

- **vline** : _(String)_ Les positions des lignes verticales sur l’axe des abscisses sous forme d’une liste entre crochets.
- **vlinename** : _(String)_ Les noms des lignes verticales sous forme d’une liste entre crochets.
- **vlinecolor** : _(String)_ Les couleurs des lignes verticales sous forme d’une liste entre crochets. Vous pouvez utiliser les noms de couleurs prédéfinies ou des codes hexadécimaux.
- **hline** : _(String)_ Les positions des lignes horizontales sur l’axe des ordonnées sous forme d’une liste entre crochets.
- **hlinename** : _(String)_ Les noms des lignes horizontales sous forme d’une liste entre crochets.
- **hlinecolor** : _(String)_ Les couleurs des lignes horizontales sous forme d’une liste entre crochets. Vous pouvez utiliser les noms de couleurs prédéfinies ou des codes hexadécimaux.
- **selectedPalette** : _(String)_ Permet de choisir la palette de couleurs utilisée pour le graphique principal (barres et lignes). Les valeurs possibles sont les mêmes que précédemment.
- **unitTooltip** : _(String)_ Permet de spécifier l'unité à afficher dans l'infobulle (tooltip) du graphique.

---

## Exemple :

```html
<line-chart
  x="[1, 2, 3]"
  y="[10, 20, 30]"
  hline="[15, 25]"
  hlinename='["hmin", "hmax"]'
  vline="[1.6, 2.3]"
  vlinename='["vmin","vmax"]'
  vlinecolor='["green-archipel", "orange-terre-battue"]'
  hlinecolor='["blue-ecume", "red-marianne"]'
  selectedPalette="categorical"
  unit-tooltip="units"
></line-chart>
```

---

## Notes supplémentaires

- **vline** et **hline** : Ces paramètres permettent d'ajouter des lignes de référence verticales et horizontales sur le graphique. Les valeurs doivent être des nombres correspondant aux positions sur les axes.
- **vlinename** et **hlinename** : Vous pouvez fournir des noms pour ces lignes qui seront affichés sur le graphique.
- **vlinecolor** et **hlinecolor** : Spécifiez les couleurs des lignes de référence. Vous pouvez utiliser les noms de couleurs prédéfinies du thème ou des codes hexadécimaux (par exemple, `"#FF5733"`).
- **selectedPalette** : Comme précédemment, ce paramètre vous permet de personnaliser les couleurs du graphique principal.
- **unitTooltip** : Spécifiez l'unité à afficher dans l'infobulle du graphique principal. Les infobulles des lignes de référence ne sont généralement pas affectées par ce paramètre.

---

## Conseils d'utilisation

- **Correspondance des listes** : Assurez-vous que les listes pour les positions, les noms et les couleurs des lignes ont le même nombre d'éléments.

  - Par exemple, si vous avez deux valeurs dans `hline`, vous devez avoir deux valeurs dans `hlinename` et `hlinecolor`.

- **Personnalisation des couleurs** : Si vous n'indiquez pas de couleurs spécifiques pour les lignes, des couleurs par défaut seront utilisées.
- **Visualisation des seuils** : L'ajout de lignes de référence est utile pour visualiser des seuils, des moyennes ou d'autres valeurs importantes sur le graphique.

---

# III. Graphique en ligne / Diagramme en barres (BarLineChart)

Les graphiques en ligne et barres sont accessibles à travers la balise : `<bar-line-chart>`.

## Paramètres

### Obligatoires :

- **x** : _(String)_ Les valeurs sur l'axe des abscisses sous forme d'une liste entre crochets.
- **y** : _(String)_ Les valeurs sur l'axe des ordonnées sous forme d'une liste entre crochets.
- **y-bar** : _(String)_ Les valeurs pour les barres sous forme d'une liste entre crochets.

### Optionnels :

- **hline** : _(String)_ Les positions des lignes horizontales sur l’axe des ordonnées sous forme d’une liste entre crochets.
- **hlinename** : _(String)_ Les noms des lignes horizontales sous forme d’une liste entre crochets.
- **hlinecolor** : _(String)_ Les couleurs des lignes horizontales sous forme d’une liste entre crochets. Vous pouvez utiliser les noms de couleurs prédéfinies ou des codes hexadécimaux.
- **vline** : _(String)_ Les positions des lignes verticales sur l’axe des abscisses sous forme d’une liste entre crochets.
- **vlinename** : _(String)_ Les noms des lignes verticales sous forme d’une liste entre crochets.
- **vlinecolor** : _(String)_ Les couleurs des lignes verticales sous forme d’une liste entre crochets. Vous pouvez utiliser les noms de couleurs prédéfinies ou des codes hexadécimaux.
- **selectedPalette** : _(String)_ Permet de choisir la palette de couleurs utilisée pour le graphique principal (barres et lignes). Les valeurs possibles sont les mêmes que précédemment.
- **unitTooltip** : _(String)_ Permet de spécifier l'unité à afficher dans l'infobulle (tooltip) du graphique.
- **unitTooltipBar** : _(String)_ Permet de spécifier l'unité à afficher dans l'infobulle (tooltip) des barres.

---

## Exemple :

```html
<bar-line-chart
  x="[1, 2, 3, 4, 5]"
  y="[20, 25, 30, 35, 40]"
  y-bar="[15, 18, 22, 28, 33]"
  hline="[25]"
  hlinename='["Moyenne"]'
  hlinecolor='["#FF0000"]'
  vline="[3]"
  vlinename='["Point Milieu"]'
  vlinecolor='["#0000FF"]'
  selectedPalette="sequentialAscending"
  unit-tooltip="kW"
  unit-tooltip-bar="kWh"
></bar-line-chart>
```

---

# IV. Diagramme circulaire (PieChart)

Les diagrammes circulaires (ou PieChart) sont accessibles à travers la balise : `<pie-chart>`.

## Paramètres

### Obligatoires :

- **x** : _(String)_ Les noms de chaque groupe sous la forme d’une liste entre crochets.
- **y** : _(String)_ Les valeurs de chaque groupe sous la forme d’une liste entre crochets.

### Optionnels :

- **name** : _(String)_ Les noms des séries de données sous forme d'une liste entre crochets.
- **selectedPalette** : _(String)_ Permet de choisir la palette de couleurs utilisée pour le graphique. Les valeurs possibles sont :

  - `'categorical'` : Palette catégorielle par défaut.
  - `'sequentialAscending'` : Palette séquentielle ascendante.
  - `'sequentialDescending'` : Palette séquentielle descendante.
  - `'divergentAscending'` : Palette divergente ascendante.
  - `'divergentDescending'` : Palette divergente descendante.
  - `'neutral'` : Palette neutre.
  - `'defaultColor'` : Couleur par défaut.
  - _(laisser vide pour utiliser la palette par défaut)_

- **unitTooltip** : _(String)_ Permet de spécifier l'unité à afficher dans l'infobulle (tooltip) du graphique. Par exemple, `%`, `€`, `$`, etc.
- **fill** : _(Boolean)_ Permet de remplir l’intérieur du graphique. Mettre à `true` pour un diagramme circulaire plein.

---

### 1. Diagramme circulaire creux (donut)

## Exemple :

```html
<pie-chart
  x='[["Non-salariés", "Emplois à durée indéterminée", "Contrats à durée déterminée", "Apprentis", "Intérimaires"]]'
  y="[[11.7, 74.8, 9.3, 1.6, 2.6]]"
  name='["Non-salariés", "Emplois à durée indéterminée", "Contrats à durée déterminée", "Apprentis", "Intérimaires"]'
  unit-tooltip="%"
  selectedPalette="categorical"
></pie-chart>
```

---

### 2. Diagramme circulaire plein

L’option **fill="true"** permet de remplir l’intérieur du graphique pour obtenir un diagramme circulaire plein.

## Exemple :

```html
<pie-chart
  x='[["Groupe A", "Groupe B", "Groupe C"]]'
  y="[[10, 20, 30]]"
  fill="true"
  unit-tooltip="%"
  selectedPalette="divergentAscending"
></pie-chart>
```

---

## Notes supplémentaires

- **selectedPalette** : Ce paramètre vous permet de personnaliser les couleurs utilisées dans le graphique. Choisissez parmi les options disponibles pour représenter vos données de manière appropriée.
- **unitTooltip** : Ce paramètre vous permet de spécifier l'unité qui sera affichée dans l'infobulle (tooltip) lorsque l'utilisateur survole une portion du diagramme. Cela rend la lecture des valeurs plus intuitive en indiquant l'unité de mesure.
- **fill** : Par défaut, le PieChart est affiché sous forme de donut (creux au centre). En définissant **fill="true"**, vous obtiendrez un diagramme circulaire plein.

---

## Conseils d'utilisation

- **Format des données** : Assurez-vous que les valeurs de `x` et `y` sont des chaînes représentant des listes, par exemple `x='["Groupe A", "Groupe B"]'`.
- **Combinaison des options** : Vous pouvez combiner plusieurs options pour personnaliser davantage votre graphique, comme utiliser `fill="true"` avec `selectedPalette`.
- **Personnalisation des séries** : Le paramètre `name` peut être utilisé pour spécifier des noms de séries personnalisés.

---

## Exemple combinant plusieurs options

```html
<pie-chart
  x='["Catégorie 1", "Catégorie 2", "Catégorie 3"]'
  y="[40, 35, 25]"
  fill="true"
  unit-tooltip="€"
  selectedPalette="sequentialDescending"
></pie-chart>
```

---

# V. Nuage de points (ScatterChart)

Les nuages de points sont accessibles à travers la balise : `<scatter-chart>`.

## Paramètres

### Obligatoires :

- **x** : _(String)_ Les valeurs sur l'axe des abscisses sous forme d'une liste de listes entre crochets.
- **y** : _(String)_ Les valeurs sur l'axe des ordonnées sous forme d'une liste de listes entre crochets.

### Optionnels :

- **selectedPalette** : _(String)_ Permet de choisir la palette de couleurs utilisée pour le graphique. Les valeurs possibles sont :

  - `'categorical'` : Palette catégorielle par défaut.
  - `'sequentialAscending'` : Palette séquentielle ascendante.
  - `'sequentialDescending'` : Palette séquentielle descendante.
  - `'divergentAscending'` : Palette divergente ascendante.
  - `'divergentDescending'` : Palette divergente descendante.
  - `'neutral'` : Palette neutre.
  - `'defaultColor'` : Couleur par défaut.
  - _(laisser vide pour utiliser la palette par défaut)_

- **highlightIndex** : _(Number | Array)_ Index ou liste d'index des points à mettre en avant (utilisé principalement avec la palette `'neutral'`).
- **show-line** : _(Boolean)_ Permet de relier les points du nuage. Mettre à `true` pour afficher les lignes entre les points.

---

## Exemples

### 1. Nuage de points simple

**Exemple**:

```html
<scatter-chart x="[[1, 5, 8]]" y="[[30, 10, 20]]"></scatter-chart>
```

---

### 2. Nuage de points reliés

On peut choisir de relier les points d'un `ScatterChart` avec l'option **show-line**. On lui affecte la valeur `true` dans le cas où l’on veut relier les points.

**Exemple**:

```html
<scatter-chart
  x="[[1, 5, 8]]"
  y="[[30, 10, 20]]"
  show-line="true"
></scatter-chart>
```

---

### 3. Nuage de points avec palette divergente ascendante

Vous pouvez spécifier une palette de couleurs pour le graphique en utilisant le paramètre **selectedPalette**.

**Exemple**:

```html
<scatter-chart
  x="[[1, 5, 8], [2, 6, 9]]"
  y="[[30, 10, 20], [15, 25, 35]]"
  selectedPalette="divergentAscending"
></scatter-chart>
```

---

### 4. Nuage de points avec mise en avant de points spécifiques

Pour mettre en avant des points spécifiques, utilisez la palette `'neutral'` et spécifiez les index des points à mettre en avant avec **highlightIndex**.

**Exemple**:

```html
<scatter-chart
  x="[[1, 5, 8]]"
  y="[[30, 10, 20]]"
  selectedPalette="neutral"
  highlightIndex="[1, 2]"
></scatter-chart>
```

---

### 5. Nuage de points avec lignes et mise en avant

Il est possible de combiner plusieurs options pour personnaliser davantage votre graphique.

**Exemple**:

```html
<scatter-chart
  x="[[1, 3, 5, 7]]"
  y="[[10, 20, 15, 25]]"
  show-line="true"
  selectedPalette="neutral"
  highlightIndex="[2]"
></scatter-chart>
```

---

## Notes supplémentaires

- **selectedPalette** : Ce paramètre vous permet de personnaliser les couleurs utilisées dans le graphique. Les différentes options vous offrent une flexibilité pour représenter vos données selon vos besoins esthétiques ou sémantiques.
- **highlightIndex** : En combinaison avec la palette `'neutral'`, ce paramètre vous permet de mettre en avant des points spécifiques du graphique. Les index commencent à **0**.
- **show-line** : Utile pour visualiser les tendances ou les relations entre les points en les reliant par des lignes.

# VI. Diagramme en étoile (RadarChart)

Les diagrammes en étoile (ou RadarChart) sont accessibles à travers la balise : `<radar-chart>`.

## Paramètres

### Obligatoires :

- **x** : _(String)_ Les noms de chaque groupe sous la forme d’une liste de listes entre crochets.

- **y** : _(String)_ Les valeurs de chaque groupe sous la forme d’une liste de listes entre crochets.


### Optionnels :

- **name** : _(String)_ Les noms des séries de données sous forme d'une liste entre crochets.

- **selectedPalette** : _(String)_ Permet de choisir la palette de couleurs utilisée pour le graphique. Les valeurs possibles sont :

    - `'categorical'` : Palette catégorielle par défaut.
    - `'sequentialAscending'` : Palette séquentielle ascendante.
    - `'sequentialDescending'` : Palette séquentielle descendante.
    - `'divergentAscending'` : Palette divergente ascendante.
    - `'divergentDescending'` : Palette divergente descendante.
    - `'neutral'` : Palette neutre.
    - `'defaultColor'` : Couleur par défaut.
    - _(laisser vide pour utiliser la palette par défaut)_

- **unitTooltip** : _(String)_ Permet de spécifier l'unité à afficher dans l'infobulle (tooltip) du graphique. Par exemple, `%`, `€`, `$`, etc.


----------

## Exemple :

```html
<radar-chart
  x='[["Non-salariés", "Emplois à durée indéterminée", "Contrats à durée déterminée", "Apprentis", "Intérimaires"]]'
  y="[[2.4, 43.9, 28.5, 17.2, 8.0],
      [10.6, 77.8, 8.8, 0.2, 2.6],
      [16.5, 77.3, 4.9, 0.0, 1.3]]"
  name='["15-24 ans", "25-49 ans", "50-64 ans"]'
  selectedPalette="categorical"
  unit-tooltip="%"
>
</radar-chart>
```

----------

## Notes supplémentaires

- **selectedPalette** : Ce paramètre vous permet de personnaliser les couleurs utilisées dans le graphique. Choisissez parmi les options disponibles pour représenter vos données de manière appropriée.

- **unitTooltip** : Ce paramètre vous permet de spécifier l'unité qui sera affichée dans l'infobulle (tooltip) lorsque l'utilisateur survole une valeur du graphique. Cela rend la lecture des valeurs plus intuitive en indiquant l'unité de mesure.


----------

## Conseils d'utilisation

- **Format des données** : Assurez-vous que les valeurs de `x` et `y` sont des chaînes représentant des listes de listes. Par exemple :

    - Pour `x` : `x='[["Label1", "Label2", "Label3"]]'`
    - Pour `y` : `y='[[10, 20, 30], [15, 25, 35]]'`
- **Combinaison des options** : Vous pouvez combiner plusieurs options pour personnaliser davantage votre graphique, comme utiliser `selectedPalette` avec `unitTooltip`.

- **Personnalisation des séries** : Le paramètre `name` est utilisé pour spécifier les noms des séries de données. Si vous avez plusieurs séries (plusieurs listes dans `y`), vous devez fournir une liste de noms correspondante dans `name`.


----------

## Autres exemples

### 1. Diagramme en étoile avec palette divergente ascendante

## Exemple :

```html
<radar-chart
  x='[["Critère 1", "Critère 2", "Critère 3", "Critère 4", "Critère 5"]]'
  y="[[80, 90, 70, 60, 50], [60, 70, 80, 90, 100]]"
  name='["Série A", "Série B"]'
  selectedPalette="divergentAscending"
  unit-tooltip="%"
>
</radar-chart>
```

----------

### 2. Diagramme en étoile avec unité personnalisée

## Exemple :

```html
<radar-chart
  x='[["Vitesse", "Puissance", "Agilité", "Endurance", "Précision"]]'
  y="[[85, 90, 75, 80, 70]]"
  name='["Athlète 1"]'
  unit-tooltip="points"
>
</radar-chart>
```

# VII. Jauge (GaugeChart)

Ce graphique est généré avec la balise `<gauge-chart> `

Les paramètres obligatoires sont :

· **value** : la valeur actuelle de la jauge sous la forme d’une un nombre

· **init** : la valeur de départ de la jauge

· **target** : la valeur cible de la jauge

## Exemple :

```html
<gauge-chart value="16" init="10" target="20" color="blue-france"></gauge-chart>
```

---

# VIII. Cartes (MapChart)

Les cartes sont accessibles à travers la balise : `<map-chart>`.

## Paramètres

### Obligatoires :

- **data** : _(String)_ Un dictionnaire qui, pour chaque numéro de département ou de région, associe la valeur de l’indicateur dans cette zone géographique.

- **value-nat** : _(String | Number)_ La valeur de l'indicateur à l'échelle nationale. Cette valeur sera affichée dans la barre latérale.

- **name** : _(String)_ Nom de l'indicateur.


### Optionnels :

- **level** : _(String)_ Choix du niveau de zoom. Les valeurs possibles sont :

    - `'dep'` : Carte avec découpage par départements (par défaut).
    - `'reg'` : Carte avec découpage par régions.

- **selectedPalette** : _(String)_ Permet de choisir la palette de couleurs utilisée pour la carte. Les valeurs possibles sont :

    - `'categorical'`
    - `'sequentialAscending'` (par défaut)
    - `'sequentialDescending'`
    - `'divergentAscending'`
    - `'divergentDescending'`
    - `'neutral'`
    - _(laisser vide pour utiliser la palette par défaut)_

- **highlightIndex** : _(Number | String | Array)_ Code ou liste des codes géographiques à mettre en avant sur la carte. Si aucune donnée n'est mise en avant, toutes les zones sont affichées avec la couleur neutre. Par défaut, `-1` signifie aucune mise en avant.

----------

## Exemples

### 1. Carte avec découpage par départements

## Exemple :

```html
<map-chart
  data='{
    "01": 72, "02": 83, "03": 67, "04": 36, "05": 47, "06": 96, "07": 77, "08": 75, "09": 57, "10": 58,
    "11": 38, "12": 33, "13": 89, "14": 24, "15": 52, "16": 41, "17": 79, "18": 38, "19": 42, "21": 25,
    "22": 26, "23": 37, "24": 65, "25": 88, "26": 48, "27": 61, "28": 80, "29": 12, "30": 6, "31": 5,
    "32": 22, "33": 40, "34": 19, "35": 13, "36": 32, "37": 0, "38": 82, "39": 13, "40": 78, "41": 92,
    "42": 10, "43": 22, "44": 70, "45": 85, "46": 58, "47": 72, "48": 61, "49": 27, "50": 47, "51": 41,
    "52": 44, "53": 29, "54": 22, "55": 4, "56": 57, "57": 94, "58": 46, "59": 33, "60": 0, "61": 15,
    "62": 60, "63": 71, "64": 0, "65": 91, "66": 51, "67": 56, "68": 19, "69": 44, "70": 92, "71": 96,
    "72": 51, "73": 32, "74": 19, "75": 96, "76": 91, "77": 21, "78": 48, "79": 72, "80": 52, "81": 48,
    "82": 57, "83": 38, "84": 23, "85": 46, "86": 37, "87": 64, "88": 78, "89": 100, "90": 85, "91": 87,
    "92": 46, "93": 89, "94": 18, "95": 72, "971": 48, "972": 28, "973": 35, "974": 70, "976": 38, "2A": 63,
    "2B": 16
  }'
  value-nat="10"
  name="Nom de l'indicateur"
  selected-palette="sequentialAscending"
  highlightIndex='["75", "13"]'
></map-chart>
```

----------

### 2. Carte avec découpage par régions

## Exemple :

```html
<map-chart
  data='{
    "84": 1, "32": 10, "93": 20, "44": 30, "76": 40, "28": 50, "75": 60, "24": 70, "53": 80, "94": 90,
    "52": 100, "01": 95, "02": 85, "03": 75, "04": 65, "06": 55, "27": 100, "11": 35
  }'
  value-nat="10"
  name="Nom de l'indicateur"
  level="reg"
  selected-palette="divergentDescending"
  highlightIndex='["84", "93"]'
></map-chart>
```

----------

### 3. Carte régionale détaillée (MapChart-reg)

Les cartes par région sont accessibles à travers la balise : `<map-chart-reg>`.

#### Paramètres spécifiques :

- **data** : _(String)_ Un dictionnaire qui, pour chaque numéro de département, associe la valeur de l’indicateur dans ce département.

- **value-reg** : _(String | Number)_ La valeur de l'indicateur à l'échelle régionale. Cette valeur sera affichée dans la barre latérale.

- **name** : _(String)_ Nom de l'indicateur.

- **region** : _(String)_ Code de la région à afficher.

- **selectedPalette** : _(String)_ Palette de couleurs utilisée pour la carte (identique à MapChart).

- **highlightIndex** : _(Number | String | Array)_ Code ou liste des codes des départements à mettre en avant.


## Exemple :

```html
<map-chart-reg
  data='{
    "01": 72, "02": 83, "03": 67, "04": 36, "05": 47, "06": 96, "07": 77, "08": 75, "09": 57, "10": 58,
    "11": 38, "12": 33, "13": 89, "14": 24, "15": 52, "16": 41, "17": 79, "18": 38, "19": 42, "21": 25,
    "22": 26, "23": 37, "24": 65, "25": 88, "26": 48, "27": 61, "28": 80, "29": 12, "30": 6, "31": 5,
    "32": 22, "33": 40, "34": 19, "35": 13, "36": 32, "37": 0, "38": 82, "39": 13, "40": 78, "41": 92,
    "42": 10, "43": 22, "44": 70, "45": 85, "46": 58, "47": 72, "48": 61, "49": 27, "50": 47, "51": 41,
    "52": 44, "53": 29, "54": 22, "55": 4, "56": 57, "57": 94, "58": 46, "59": 33, "60": 0, "61": 15,
    "62": 60, "63": 71, "64": 0, "65": 91, "66": 51, "67": 56, "68": 19, "69": 44, "70": 92, "71": 96,
    "72": 51, "73": 32, "74": 19, "75": 96, "76": 91, "77": 21, "78": 48, "79": 72, "80": 52, "81": 48,
    "82": 57, "83": 38, "84": 23, "85": 46, "86": 37, "87": 64, "88": 78, "89": 100, "90": 85, "91": 87,
    "92": 46, "93": 89, "94": 18, "95": 72, "971": 48, "972": 28, "973": 35, "974": 70, "976": 38, "2A": 63,
    "2B": 16
  }'
  value-reg="10"
  name="Nom de l'indicateur"
  region="93"
  selected-palette="categorical"
  highlightIndex='["93", "84"]'
></map-chart-reg>
```

----------

## Notes supplémentaires

- **selectedPalette** : Ce paramètre vous permet de personnaliser les couleurs utilisées sur la carte. Les palettes disponibles permettent de représenter les données selon différentes échelles de couleurs.

- **highlightIndex** : Vous pouvez mettre en avant certaines zones géographiques en spécifiant leurs codes dans une liste. Les zones mises en avant seront affichées avec une couleur différente pour attirer l'attention.

- **level** : Par défaut, la carte affiche le découpage par départements (`'dep'`). En spécifiant `level="reg"`, vous pouvez afficher la carte avec le découpage par régions.


----------

## Conseils d'utilisation

- **Format des données** : Les clés du dictionnaire `data` doivent correspondre aux codes des départements ou régions (par exemple, `"75"` pour Paris, `"84"` pour la région Auvergne-Rhône-Alpes).

- **Combinaison des options** : Vous pouvez combiner plusieurs options pour personnaliser votre carte, comme utiliser `selectedPalette` avec `highlightIndex`.

- **Personnalisation des couleurs** : Si vous souhaitez mettre en avant certaines zones, utilisez le paramètre `highlightIndex` en combinaison avec une palette appropriée.


----------

## Exemple combinant plusieurs options

## Exemple :

```html
<map-chart
  data='{"01": 72, "02": 83, "03": 67, "04": 36, "05": 47}'
  value-nat="65"
  name="Taux de réussite"
  selected-palette="neutral"
  highlightIndex='["01", "02"]'
  level="dep"
></map-chart>
```

----------

## Résumé des paramètres de MapChart

| **paramètre**   | **type**                | **obligatoire** | **description**                                                               |
|-----------------|-------------------------|-----------------|-------------------------------------------------------------------------------|
| data            | String                  | oui             | dictionnaire associant les codes des départements aux valeurs de l'indicateur |
| value-reg       | String ou Number        | oui             | Valeur de l'indicateur à l'échelle nationale                                  |
| name            | String                  | oui             | nom de l'indicateur                                                           |
| level           | String ('dep' ou 'reg') | non             | Niveau de zoom de la carte ('dep' pour départements, 'reg' pour régions)      |
| selectedPalette | String                  | non             | palette de couleurs utilisée pour la carte                                    |
| highlightIndex  | Number, String ou Array | non             | Code ou liste des codes géographiques à mettre en avant                       |


## Résumé des paramètres de MapChartReg

| **paramètre**   | **type**         | **obligatoire** | **description**                                                               |
|-----------------|------------------|-----------------|-------------------------------------------------------------------------------|
| data            | String           | oui             | dictionnaire associant les codes des départements aux valeurs de l'indicateur |
| value-reg       | String ou Number | oui             | valeur de l'indicateur à l'échelle régionale                                  |
| name            | String           | oui             | nom de l'indicateur                                                           |
| region          | String           | oui             | code de la région à afficher                                                  |
| selectedPalette | String           | non             | palette de couleurs utilisée pour la carte                                    |

---

# IX. DataBox

Le composant `DataBox` est un composant polyvalent qui permet d'afficher des données sous différentes formes, notamment des indicateurs, des graphiques, des tableaux, etc. Il intègre également des fonctionnalités interactives telles que des sélecteurs de sources, des modales, et des menus déroulants pour des actions supplémentaires.

## Utilisation de base

```html
<data-box
    id="abc"
    title="Emplois en France de 1926 à 1950"
    tooltip-title="Emplois en France"
    tooltip-content="Nombre d'emplois en France de 1926 à 1950, par genre. Se base sur les données de l'INSEE et de Pôle Emploi et d'une autre source."
    source="INSEE, Pôle Emploi, Autre source"
    date="2021-01-01"
    default-source="pole-emploi"
    trend="5%"
    segmented-control="true"
    screenshot="true"
    download="true"
    fullscreen="true"
    modal-title="Titre de la modale"
    modal-content="Contenu de la modale">
</data-box>
```

## Props

Voici la liste des props disponibles pour le composant `DataBox` :

### Obligatoires
- **id** `(String)` : identifiant unique de la DataBox
- **title** `(String)` : titre de la DataBox 
- **source** `(String)` : source des données affichées
- **date** `(String)` : date des données affichées

### Optionnelles
- **tooltipTitle** `(String)` (défaut : '') : titre de la tooltip
- **tooltipContent** `(String)` (défaut : '') : contenu de la tooltip
- **defaultSource** `(String)` (défaut : null) : source à afficher par défaut
- **trend** `(String)` (défaut : null) : tendance de l'évolution des données
- **segmentedControl** `(Boolean)` (défaut : true) : afficher le système de vue graphique/tableau
- **fullscreen** `(Boolean)` (défaut : false) : donner la possibilité d'ouvrir le graphique dans une modale
- **screenshot** `(Boolean)` (défaut : false) : permettre une capture d'écran de la DataBox
- **download** `(Boolean)` (défaut : false) : télécharger les données du graphique au format CSV
- **modalTitle** `(String)` (défaut : '') : titre de la modale
- **modalContent** `(String)` (défaut : '') : contenu de la modale

### Mise en place du graphique

L'ensemble de ces informations permettront d'afficher une databox sans graphique.

Pour y intégrer un graphique, il faut juxtaposer la balise d'un graphique en spécifiant les attributs suivants qui permettront de faire le lien entre la Databox et le graphique :

- databox-id : identifiant de la DataBox
- databox-type : valeurs possibles : "chart" pour la vue du graphique et "table" pour la vue du tableau d'alternative textuelle
- databox-source : correspond au paramètre defaultSource de la DataBox

```html
<data-box
  id="abc"
  title="Emplois en France de 1926 à 1950"
  tooltip-title="Emplois en France"
  tooltip-content="Nombre d'emplois en France de 1926 à 1950, par genre. Se base sur les données de l'INSEE et de Pôle Emploi et d'une autre source."
  source="INSEE, Pôle Emploi, Autre source"
  date="2021-01-01"
  default-source="pole-emploi"
  trend="5%"
  segmented-control="true"
  screenshot="true"
  download="true"
  fullscreen="true"
  modal-title="Titre de la modale"
  modal-content="Contenu de la modale">
</data-box>

<scatter-chart
  databox-id="abc"
  databox-type="chart"
  databox-source="pole-emploi"
  x="[[1926, 1928, 1930, 1932, 1934, 1936, 1938, 1940, 1942, 1944, 1946, 1948, 1950], [1926, 1928, 1930, 1932, 1934, 1936, 1938, 1940, 1942, 1944, 1946, 1948, 1950], [1926, 1928, 1930, 1932, 1934, 1936, 1938, 1940, 1942, 1944, 1946, 1948, 1950]]"
  y="[[48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60], [61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73], [55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67]]"
  name='["Femmes", "Hommes", "Ensemble"]'
  unit-tooltip="%"
  show-line="true">
</scatter-chart>

<table-chart
  databox-id="abc"
  databox-type="table"
  databox-source="pole-emploi"
  x="[1926, 1928, 1930, 1932, 1934, 1936, 1938, 1940, 1942, 1944, 1946, 1948, 1950]"
  y="[[48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60], [61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73], [55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67]]"
  name='["Femmes", "Hommes", "Ensemble"]'
  table-name="Années">
</table-chart>
```

---

# X. Couleurs

---

# XI. Accessibilité

### Tableaux

Les résultats peuvent également être présenté sous la forme d'un tableau. Ceci permet dans certaines situations d'offrir une alternative à la visualisation des données et ainsi s'adapter au public concerné.

Les paramètres obligatoires sont :

- **x** : les noms de chaque groupe sous la forme d’une liste entre crochets

- **y** : les valeurs de chaque groupe sous la forme d’une liste entre crochets

---

# XII. Options

### Barre verticale

Il est possible d’ajouter une ou plusieurs barres verticales par l’intermédiaire du paramètre :

- **vline** : La ou les valeur(s) sur l’axe des abscisses sous la forme d’une liste entre crochets

Par défaut la couleur de la ligne sera #161616 et son nom V1, V2, … Cela peut être modifié en renseignant les paramètres :

- **vlinecolor** : La ou les couleur(s) sous forme d’une liste entre crochets

- **vlinename** : Le ou les nom(s) sous la forme d’une liste entre crochets

**Exemple :**

```html
<line-chart
  x="[1, 2, 3]"
  y="[10, 20, 30]"
  vline="[1.5, 2.5]"
  vlinename='["min", "max"]'
  vlinecolor='["green-archipel", "blue-ecume"]'
></line-chart>
```
### Barre horizontale

Il est possible d’ajouter une ou plusieurs barres verticales par l’intermédiaire du paramètre :

- **hline** : La ou les valeur(s) sur l’axe des ordonnées sous la forme d’une liste entre crochets

Par défaut la couleur de la ligne sera #009081 et son nom H1, H2, … Cela peut être modifié en renseignant les paramètres :

- **hlinecolor** : La ou les couleur(s) sous forme d’une liste entre crochets

- **hlinename** : Le ou les nom(s) sous la forme d’une liste entre crochets

**Exemple :**

```html
<line-chart
  x="[1, 2, 3]"
  y="[10, 20, 30]"
  hline="[15, 25]"
  hlinename='["min", "max"]'
  hlinecolor='["green-archipel", "blue-ecume"]'
></line-chart>
```

## Contribution

Le processus de contribution est détaillé sur la page [CONTRIBUTING.md](CONTRIBUTING.md).
