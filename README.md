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

```bash
npm install @gouvfr/dsfr-chart
```

Une fois terminé dsfr-chart sera alors installé dans le dossier `node_modules/@gouvfr/dsfr-chart/`

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

#### Importation des web-components dans un fichier HTML

Pour pouvoir utiliser une représentation graphique dans votre projet, il est nécessaire de charger le fichier javascript correspondant ainsi que sa feuille css associée.

Il existe deux possibilités :

- Charger tous les composants :

```html
<!-- Avec le build ESM -->
<script type="module" src="./DSFRChart.js"></script>
<link rel="stylesheet" href="./DSFRChart.css" />
```

```html
<!-- Avec le build CJS -->
<script src="./DSFRChart.umd.cjs"></script>
<link rel="stylesheet" href="./DSFRChart.css" />
```

- Charger uniquement un ou plusieurs composants nécessaires à votre projet :

```html
<!-- Avec le build ESM -->
<script type="module" src="./ScatterChart.js"></script>
<link rel="stylesheet" href="./ScatterChart.css" />
```

```html
<!-- Avec le build CJS -->
<script src="./ScatterChart.umd.cjs"></script>
<link rel="stylesheet" href="./ScatterChart.css" />
```

#### Importation des web-components avec un bundler

Pour importer la librairie dans un projet utilisant un bundler comme Vite, il est nécessaire d'importer les fichiers JavaScript et CSS dans votre fichier principal.

```javascript
import '@gouvfr/dsfr-chart';
import '@gouvfr/dsfr-chart/css';
```

Il est également possible d'importer uniquement un ou plusieurs composants :

```javascript
import '@gouvfr/dsfr-chart/LineChart';
import '@gouvfr/dsfr-chart/LineChart.css'; // Ou '@gouvfr/dsfr-chart/LineChart/css'
import '@gouvfr/dsfr-chart/BarChart';
import '@gouvfr/dsfr-chart/BarChart.css'; // Ou '@gouvfr/dsfr-chart/BarChart/css'
```

#### ⚠️ Important : Si vous importez plus que deux composants, il est préférable d'importer toute la librairie pour éviter de charger plusieurs fois le runtime de Vue.js.

# Graphiques disponibles

Ce catalogue présente l'ensemble des graphiques disponibles dans le module complémentaire au Système de design de l'État (DSFR) pour la visualisation de données. Les différents types de graphiques sont disponibles en thème clair et thème sombre. Par ailleurs, les options de chacun des graphiques sont également présentés dans ce document.

# Graphique en ligne (LineChart)

Les graphiques en ligne sont accessibles à travers la balise : `<line-chart>`.

## Paramètres

### Obligatoires :

- **x** : _(String)_ Les valeurs sur l'axe des abscisses sous forme d'une liste entre crochets.
- **y** : _(String)_ Les valeurs sur l'axe des ordonnées sous forme d'une liste entre crochets.

### Optionnels :

- **selected-palette** : _(String)_ Permet de choisir la palette de couleurs utilisée pour le graphique. Les valeurs possibles sont :

  - `'default'` : Couleur par défaut.
  - _(laisser vide pour utiliser la palette par défaut)_
  - `'neutral'` : Palette neutre.
  - `'categorical'` : Palette catégorielle par défaut.
  - `'sequentialAscending'` : Palette séquentielle ascendante.
  - `'sequentialDescending'` : Palette séquentielle descendante.
  - `'divergentAscending'` : Palette divergente ascendante.
  - `'divergentDescending'` : Palette divergente descendante.

- **unit-tooltip** : _(String)_ Permet de spécifier l'unité à afficher dans l'infobulle (tooltip) du graphique. Par exemple, `%`, `€`, `$`, etc.
- **x-min** : Permet de définir le minimum sur l'axe des abscisses
- **x-max** : Permet de définir le maximum sur l'axe des abscisses
- **y-min** : Permet de définir le minimum sur l'axe des ordonnées
- **y-max** : Permet de définir le maximum sur l'axe des ordonnées

---

### 1. Graphique en ligne simple

**Exemple**:

```html
<line-chart x="[[1, 2, 3, 4]]" y="[[10, 20, 30, 40]]"></line-chart>
```

---

### 2. Graphique en ligne avec palette divergente ascendante

**Exemple**:

```html
<line-chart
  x="[[1, 2, 3, 4]]"
  y="[[10, 20, 30, 40]]"
  selected-palette="divergentAscending"
></line-chart>
```

---

### 3. Graphique en ligne avec unité personnalisée dans l'infobulle

**Exemple**:

```html
<line-chart
  x="[[1, 2, 3, 4]]"
  y="[[1000, 2000, 3000, 4000]]"
  unit-tooltip="€"
></line-chart>
```

---

### 4. Graphique en ligne avec deux courbes

**Exemple**:

```html
<line-chart
  x="[[1, 2, 3], [1, 2, 3]]"
  y="[[30, 10, 20], [10, 20, 30]]"
  unit-tooltip="%"
></line-chart>
```

---

## Notes supplémentaires

- **selected-palette** : Ce paramètre vous permet de personnaliser les couleurs utilisées dans le graphique. Choisissez parmi les options disponibles pour représenter vos données de manière appropriée.
- **unit-tooltip** : Ce paramètre vous permet de spécifier l'unité qui sera affichée dans l'infobulle (tooltip) lorsque l'utilisateur survole un point du graphique. Cela rend la lecture des valeurs plus intuitive en indiquant l'unité de mesure.

---

## Conseils d'utilisation

- **Format des données** : Assurez-vous que les valeurs de `x` et `y` sont des chaînes représentant des listes, par exemple `x="[1, 2, 3]"`.
- **Combinaison des options** : Vous pouvez combiner plusieurs options pour personnaliser davantage votre graphique, par exemple en utilisant `selected-palette` avec `unit-tooltip`.
- **Personnalisation des séries** : Chaque série de données sera représentée par une ligne distincte. Les couleurs des lignes seront attribuées en fonction de la palette sélectionnée.

---

## Exemple combinant plusieurs options

**Exemple**:

```html
<line-chart
  x="[[1, 2, 3, 4, 5]]"
  y="[[15, 25, 35, 45, 55]]"
  selected-palette="categorical"
  unit-tooltip="kWh"
></line-chart>
```

# Graphique en barre (BarChart)

Les graphiques en barre sont accessibles à travers la balise : `<bar-chart>`.

## Paramètres

### Obligatoires :

- **x** : _(String)_ Les valeurs sur l’axe des abscisses sous forme d’une liste de listes entre crochets.
- **y** : _(String)_ Les valeurs sur l’axe des ordonnées sous forme d’une liste de listes entre crochets.

### Optionnels :

- **name** : _(String)_ Les noms des séries de données sous forme d'une liste entre crochets.
- **selected-palette** : _(String)_ Permet de choisir la palette de couleurs utilisée pour le graphique. Les valeurs possibles sont :

  - `'default'` : Couleur par défaut.
  - _(laisser vide pour utiliser la palette par défaut)_
  - `'neutral'` : Palette neutre.
  - `'categorical'` : Palette catégorielle par défaut.
  - `'sequentialAscending'` : Palette séquentielle ascendante.
  - `'sequentialDescending'` : Palette séquentielle descendante.
  - `'divergentAscending'` : Palette divergente ascendante.
  - `'divergentDescending'` : Palette divergente descendante.

- **highlight-index** : _(Array)_ Liste d'index des barres à mettre en avant (utilisé principalement avec la palette `'neutral'`).
- **unit-tooltip** : _(String)_ Permet de spécifier l'unité à afficher dans l'infobulle (tooltip) du graphique. Par exemple, `%`, `€`, `$`, etc.
- **horizontal** : _(Boolean)_ Permet d'afficher le graphique en barre horizontales. Mettre à `true` pour activer.
- **stacked** : _(Boolean)_ Permet d'empiler les barres pour afficher des données empilées. Mettre à `true` pour activer.
- **x-min** : Permet de définir le minimum sur l'axe des abscisses
- **x-max** : Permet de définir le maximum sur l'axe des abscisses
- **y-min** : Permet de définir le minimum sur l'axe des ordonnées
- **y-max** : Permet de définir le maximum sur l'axe des ordonnées

---

### 1. Barres verticales simples

**Exemple**:

```html
<bar-chart
  x='[["2025", "2030", "2035", "2040", "2050", "2060", "2070"]]'
  y="[[69.1, 70.3, 71.4, 72.5, 74, 75.2, 76.4]]"
  name='["Population en millions"]'
  selected-palette="default"
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

Utilisez **highlight-index** pour mettre en avant certaines barres, en combinaison avec **selected-palette="neutral"**.

**Exemple**:

```html
<bar-chart
  x='[["Jan", "Feb", "Mar", "Apr", "May", "Jun"]]'
  y="[[5, 10, 15, 20, 25, 30]]"
  selected-palette="neutral"
  highlight-index="[2, 4]"
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

- **selected-palette** : Ce paramètre vous permet de personnaliser les couleurs utilisées dans le graphique. Choisissez parmi les options disponibles pour représenter vos données de manière appropriée.
- **highlight-index** : Utilisé en combinaison avec la palette `'neutral'`, ce paramètre vous permet de mettre en avant des barres spécifiques du graphique. Les index commencent à **0**.
- **unit-tooltip** : Ce paramètre vous permet de spécifier l'unité qui sera affichée dans l'infobulle (tooltip) lorsque l'utilisateur survole une barre du graphique. Cela rend la lecture des valeurs plus intuitive en indiquant l'unité de mesure.
- **horizontal** : Définit l'orientation du graphique. Par défaut, les barres sont verticales.
- **stacked** : Permet d'empiler les séries de données, utile pour visualiser la contribution de chaque série au total.

---

## Conseils d'utilisation

- **Format des données** : Assurez-vous que les valeurs de `x` et `y` sont des chaînes représentant des listes de listes, par exemple `x='[["Label1", "Label2"]]'` et `y='[[10, 20], [30, 40]]'`.
- **Combinaison des options** : Vous pouvez combiner plusieurs options pour personnaliser davantage votre graphique, comme utiliser `horizontal="true"` avec `stacked="true"`.
- **Indexation** : Les index utilisés dans `highlight-index` correspondent aux positions des barres dans vos données `x`. Par exemple, `highlight-index="[0, 2]"` mettra en avant la première et la troisième barre.

---

## Exemple combinant plusieurs options

**Exemple**:

```html
<bar-chart
  x='[["Produit A", "Produit B", "Produit C", "Produit D"]]'
  y="[[50, 70, 30, 90]]"
  name='["Ventes"]'
  selected-palette="neutral"
  highlight-index="[3]"
  horizontal="true"
  unit-tooltip="k€"
></bar-chart>
```

### Options de lignes verticales et horizontales

Sur tous les graphiques présentés ci-dessus, il est possible d'ajouter des lignes verticales et horizontales pour mettre en évidence des seuils ou des valeurs spécifiques.

## Paramètres

### Optionnels :

- **selected-palette** : _(String)_ Permet de choisir la palette de couleurs utilisée pour le graphique principal (barres et lignes). Les valeurs possibles sont les mêmes que précédemment.
- **unit-tooltip** : _(String)_ Permet de spécifier l'unité à afficher dans l'infobulle (tooltip) du graphique.

---

## Exemple :

```html
<line-chart
  x="[1, 2, 3]"
  y="[10, 20, 30]"
  selected-palette="categorical"
  unit-tooltip="units"
></line-chart>
```

---

## Notes supplémentaires

- **selected-palette** : Comme précédemment, ce paramètre vous permet de personnaliser les couleurs du graphique principal.
- **unit-tooltip** : Spécifiez l'unité à afficher dans l'infobulle du graphique principal. Les infobulles des lignes de référence ne sont généralement pas affectées par ce paramètre.

---

## Conseils d'utilisation

- **Personnalisation des couleurs** : Si vous n'indiquez pas de couleurs spécifiques pour les lignes, des couleurs par défaut seront utilisées.
- **Visualisation des seuils** : L'ajout de lignes de référence est utile pour visualiser des seuils, des moyennes ou d'autres valeurs importantes sur le graphique.

---

# Graphique en ligne / Diagramme en barres (BarLineChart)

Les graphiques en ligne et barres sont accessibles à travers la balise : `<bar-line-chart>`.

## Paramètres

### Obligatoires :

- **x** : _(String)_ Les valeurs sur l'axe des abscisses sous forme d'une liste entre crochets.
- **y-bar** : _(String)_ Les valeurs pour les barres sous forme d'une liste entre crochets.
- **y-line** : _(String)_ Les valeurs pour la ligne sous forme d'une liste entre crochets.

### Optionnels :

- **selected-palette** : _(String)_ Permet de choisir la palette de couleurs utilisée pour le graphique principal (barres et lignes). Les valeurs possibles sont les mêmes que précédemment.
- **unit-tooltip-bar** : _(String)_ Permet de spécifier l'unité à afficher dans l'infobulle (tooltip) des barres.
- **unit-tooltip-line** : _(String)_ Permet de spécifier l'unité à afficher dans l'infobulle (tooltip) de la ligne.
- **x-min** : Permet de définir le minimum sur l'axe des abscisses
- **x-max** : Permet de définir le maximum sur l'axe des abscisses
- **y-bar-min** : Permet de définir le minimum sur l'axe des ordonnées pour les barres
- **y-bar-max** : Permet de définir le maximum sur l'axe des ordonnées pour les barres
- **y-line-min** : Permet de définir le minimum sur l'axe des ordonnées pour la ligne
- **y-line-max** : Permet de définir le maximum sur l'axe des ordonnées pour la ligne

---

## Exemple :

```html
<bar-line-chart
  x="[1, 2, 3, 4, 5]"
  y="[20, 25, 30, 35, 40]"
  y-bar="[15, 18, 22, 28, 33]"
  selected-palette="sequentialAscending"
  unit-tooltip="kW"
  unit-tooltip-bar="kWh"
></bar-line-chart>
```

---

# Diagramme circulaire (PieChart)

Les diagrammes circulaires (ou PieChart) sont accessibles à travers la balise : `<pie-chart>`.

## Paramètres

### Obligatoires :

- **x** : _(String)_ Les noms de chaque groupe sous la forme d’une liste entre crochets.
- **y** : _(String)_ Les valeurs de chaque groupe sous la forme d’une liste entre crochets.

### Optionnels :

- **name** : _(String)_ Les noms des séries de données sous forme d'une liste entre crochets.
- **selected-palette** : _(String)_ Permet de choisir la palette de couleurs utilisée pour le graphique. Les valeurs possibles sont :

  - `'categorical'` : Palette catégorielle par défaut.
  - `'sequentialAscending'` : Palette séquentielle ascendante.
  - `'sequentialDescending'` : Palette séquentielle descendante.
  - `'divergentAscending'` : Palette divergente ascendante.
  - `'divergentDescending'` : Palette divergente descendante.
  - `'neutral'` : Palette neutre.
  - `'default'` : Couleur par défaut.
  - _(laisser vide pour utiliser la palette par défaut)_

- **unit-tooltip** : _(String)_ Permet de spécifier l'unité à afficher dans l'infobulle (tooltip) du graphique. Par exemple, `%`, `€`, `$`, etc.
- **fill** : _(Boolean)_ Permet de remplir l’intérieur du graphique. Mettre à `true` pour un diagramme circulaire plein.

---

### 1. Diagramme circulaire creux (donut)

## Exemple :

```html
<pie-chart
  x='[["Emplois à durée indéterminée", "Non-salariés", "Contrats à durée déterminée", "Apprentis", "Intérimaires"]]'
  y="[[74.8, 11.7, 9.3, 1.6, 2.6]]"
  name='["Emplois à durée indéterminée", "Non-salariés", "Contrats à durée déterminée", "Apprentis", "Intérimaires"]'
  unit-tooltip="%"
  selected-palette="categorical"
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
  selected-palette="divergentAscending"
></pie-chart>
```

---

## Notes supplémentaires

- **selected-palette** : Ce paramètre vous permet de personnaliser les couleurs utilisées dans le graphique. Choisissez parmi les options disponibles pour représenter vos données de manière appropriée.
- **unit-tooltip** : Ce paramètre vous permet de spécifier l'unité qui sera affichée dans l'infobulle (tooltip) lorsque l'utilisateur survole une portion du diagramme. Cela rend la lecture des valeurs plus intuitive en indiquant l'unité de mesure.
- **fill** : Par défaut, le PieChart est affiché sous forme de donut (creux au centre). En définissant **fill="true"**, vous obtiendrez un diagramme circulaire plein.

---

## Conseils d'utilisation

- **Format des données** : Assurez-vous que les valeurs de `x` et `y` sont des chaînes représentant des listes, par exemple `x='["Groupe A", "Groupe B"]'`.
- **Combinaison des options** : Vous pouvez combiner plusieurs options pour personnaliser davantage votre graphique, comme utiliser `fill="true"` avec `selected-palette`.
- **Personnalisation des séries** : Le paramètre `name` peut être utilisé pour spécifier des noms de séries personnalisés.

---

## Exemple combinant plusieurs options

```html
<pie-chart
  x='["Catégorie 1", "Catégorie 2", "Catégorie 3"]'
  y="[40, 35, 25]"
  fill="true"
  unit-tooltip="€"
  selected-palette="sequentialDescending"
></pie-chart>
```

---

# Cartes (MapChart)

Les cartes sont accessibles à travers la balise : `<map-chart>`.

## Paramètres

### Obligatoires :

- **data** : _(String)_ Un dictionnaire qui, pour chaque numéro de département ou de région, associe la valeur de l’indicateur dans cette zone géographique.

- **value** : _(String | Number)_ La valeur de l'indicateur à l'échelle nationale. Cette valeur sera affichée dans la barre latérale.

- **name** : _(String)_ Nom de l'indicateur.

### Optionnels :

- **level** : _(String)_ Choix du niveau de zoom. Les valeurs possibles sont :

    - `'dep'` : Carte avec découpage par départements (par défaut).
    - `'reg'` : Carte avec découpage par régions.

- **selected-palette** : _(String)_ Permet de choisir la palette de couleurs utilisée pour la carte. Les valeurs possibles sont :

    - `'categorical'`
    - `'sequentialAscending'` (par défaut)
    - `'sequentialDescending'`
    - `'divergentAscending'`
    - `'divergentDescending'`
    - `'neutral'`
    - _(laisser vide pour utiliser la palette par défaut)_

---

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
  value="10"
  name="Nom de l'indicateur"
  selected-palette="sequentialAscending"
></map-chart>
```

---

### 2. Carte avec découpage par régions

## Exemple :

```html
<map-chart
  data='{
    "84": 1, "32": 10, "93": 20, "44": 30, "76": 40, "28": 50, "75": 60, "24": 70, "53": 80, "94": 90,
    "52": 100, "01": 95, "02": 85, "03": 75, "04": 65, "06": 55, "27": 100, "11": 35
  }'
  value="10"
  name="Nom de l'indicateur"
  level="reg"
  selected-palette="divergentDescending"
></map-chart>
```

---

### 3. Carte régionale détaillée (MapChartReg)

Les cartes par région sont accessibles à travers la balise : `<map-chart-reg>`.

#### Paramètres spécifiques :

- **data** : _(String)_ Un dictionnaire qui, pour chaque numéro de département, associe la valeur de l’indicateur dans ce département.

- **value** : _(String | Number)_ La valeur de l'indicateur à l'échelle régionale. Cette valeur sera affichée dans la barre latérale.

- **name** : _(String)_ Nom de l'indicateur.

- **region** : _(String)_ Code de la région à afficher.

- **selected-palette** : _(String)_ Palette de couleurs utilisée pour la carte (identique à MapChart).

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
  value="10"
  name="Nom de l'indicateur"
  region="93"
  selected-palette="categorical"
></map-chart-reg>
```

---

## Notes supplémentaires

- **selected-palette** : Ce paramètre vous permet de personnaliser les couleurs utilisées sur la carte. Les palettes disponibles permettent de représenter les données selon différentes échelles de couleurs.

- **level** : Par défaut, la carte affiche le découpage par départements (`'dep'`). En spécifiant `level="reg"`, vous pouvez afficher la carte avec le découpage par régions.

---

## Conseils d'utilisation

- **Format des données** : Les clés du dictionnaire `data` doivent correspondre aux codes des départements ou régions (par exemple, `"75"` pour Paris, `"84"` pour la région Auvergne-Rhône-Alpes).

- **Combinaison des options** : Vous pouvez combiner plusieurs options pour personnaliser votre carte.

---

## Exemple combinant plusieurs options

## Exemple :

```html
<map-chart
  data='{"01": 72, "02": 83, "03": 67, "04": 36, "05": 47}'
  value="65"
  name="Taux de réussite"
  selected-palette="neutral"
  level="dep"
></map-chart>
```

---

## Résumé des paramètres de MapChart

| **paramètre**    | **type**                | **obligatoire** | **description**                                                               |
|------------------|-------------------------|-----------------|-------------------------------------------------------------------------------|
| data             | String                  | oui             | dictionnaire associant les codes des départements aux valeurs de l'indicateur |
| value            | String ou Number        | oui             | Valeur de l'indicateur à l'échelle nationale                                  |
| name             | String                  | oui             | nom de l'indicateur                                                           |
| level            | String ('dep' ou 'reg') | non             | Niveau de zoom de la carte ('dep' pour départements, 'reg' pour régions)      |
| selected-palette | String                  | non             | palette de couleurs utilisée pour la carte                                    |

## Résumé des paramètres de MapChartReg

| **paramètre**    | **type**         | **obligatoire** | **description**                                                               |
|------------------|------------------|-----------------|-------------------------------------------------------------------------------|
| data             | String           | oui             | dictionnaire associant les codes des départements aux valeurs de l'indicateur |
| value            | String ou Number | oui             | valeur de l'indicateur à l'échelle régionale                                  |
| name             | String           | oui             | nom de l'indicateur                                                           |
| region           | String           | oui             | code de la région à afficher                                                  |
| selected-palette | String           | non             | palette de couleurs utilisée pour la carte                                    |

---

# Nuage de points (ScatterChart)

Les nuages de points sont accessibles à travers la balise : `<scatter-chart>`.

## Paramètres

### Obligatoires :

- **x** : _(String)_ Les valeurs sur l'axe des abscisses sous forme d'une liste de listes entre crochets.
- **y** : _(String)_ Les valeurs sur l'axe des ordonnées sous forme d'une liste de listes entre crochets.

### Optionnels :

- **selected-palette** : _(String)_ Permet de choisir la palette de couleurs utilisée pour le graphique. Les valeurs possibles sont :

  - `'categorical'` : Palette catégorielle par défaut.
  - `'sequentialAscending'` : Palette séquentielle ascendante.
  - `'sequentialDescending'` : Palette séquentielle descendante.
  - `'divergentAscending'` : Palette divergente ascendante.
  - `'divergentDescending'` : Palette divergente descendante.
  - `'neutral'` : Palette neutre.
  - `'default'` : Couleur par défaut.
  - _(laisser vide pour utiliser la palette par défaut)_

- **show-line** : _(Boolean)_ Permet de relier les points du nuage. Mettre à `true` pour afficher les lignes entre les points.
- **x-min** : Permet de définir le minimum sur l'axe des abscisses
- **x-max** : Permet de définir le maximum sur l'axe des abscisses
- **y-min** : Permet de définir le minimum sur l'axe des ordonnées
- **y-max** : Permet de définir le maximum sur l'axe des ordonnées

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

Vous pouvez spécifier une palette de couleurs pour le graphique en utilisant le paramètre **selected-palette**.

**Exemple**:

```html
<scatter-chart
  x="[[1, 5, 8], [2, 6, 9]]"
  y="[[30, 10, 20], [15, 25, 35]]"
  selected-palette="divergentAscending"
></scatter-chart>
```

---

## Notes supplémentaires

- **selected-palette** : Ce paramètre vous permet de personnaliser les couleurs utilisées dans le graphique. Les différentes options vous offrent une flexibilité pour représenter vos données selon vos besoins esthétiques ou sémantiques.
- **show-line** : Utile pour visualiser les tendances ou les relations entre les points en les reliant par des lignes.

# Diagramme en étoile (RadarChart)

Les diagrammes en étoile (ou RadarChart) sont accessibles à travers la balise : `<radar-chart>`.

## Paramètres

### Obligatoires :

- **x** : _(String)_ Les noms de chaque groupe sous la forme d’une liste de listes entre crochets.

- **y** : _(String)_ Les valeurs de chaque groupe sous la forme d’une liste de listes entre crochets.

### Optionnels :

- **name** : _(String)_ Les noms des séries de données sous forme d'une liste entre crochets.

- **selected-palette** : _(String)_ Permet de choisir la palette de couleurs utilisée pour le graphique. Les valeurs possibles sont :

    - `'categorical'` : Palette catégorielle par défaut.
    - `'sequentialAscending'` : Palette séquentielle ascendante.
    - `'sequentialDescending'` : Palette séquentielle descendante.
    - `'divergentAscending'` : Palette divergente ascendante.
    - `'divergentDescending'` : Palette divergente descendante.
    - `'neutral'` : Palette neutre.
    - `'default'` : Couleur par défaut.
    - _(laisser vide pour utiliser la palette par défaut)_

- **unit-tooltip** : _(String)_ Permet de spécifier l'unité à afficher dans l'infobulle (tooltip) du graphique. Par exemple, `%`, `€`, `$`, etc.

---

## Exemple :

```html
<radar-chart
  x='[["Non-salariés", "Emplois à durée indéterminée", "Contrats à durée déterminée", "Apprentis", "Intérimaires"]]'
  y="[[2.4, 43.9, 28.5, 17.2, 8.0],
      [10.6, 77.8, 8.8, 0.2, 2.6],
      [16.5, 77.3, 4.9, 0.0, 1.3]]"
  name='["15-24 ans", "25-49 ans", "50-64 ans"]'
  selected-palette="categorical"
  unit-tooltip="%"
>
</radar-chart>
```

---

## Notes supplémentaires

- **selected-palette** : Ce paramètre vous permet de personnaliser les couleurs utilisées dans le graphique. Choisissez parmi les options disponibles pour représenter vos données de manière appropriée.

- **unit-tooltip** : Ce paramètre vous permet de spécifier l'unité qui sera affichée dans l'infobulle (tooltip) lorsque l'utilisateur survole une valeur du graphique. Cela rend la lecture des valeurs plus intuitive en indiquant l'unité de mesure.

---

## Conseils d'utilisation

- **Format des données** : Assurez-vous que les valeurs de `x` et `y` sont des chaînes représentant des listes de listes. Par exemple :

    - Pour `x` : `x='[["Label1", "Label2", "Label3"]]'`
    - Pour `y` : `y='[[10, 20, 30], [15, 25, 35]]'`

- **Combinaison des options** : Vous pouvez combiner plusieurs options pour personnaliser davantage votre graphique, comme utiliser `selected-palette` avec `unit-tooltip`.

- **Personnalisation des séries** : Le paramètre `name` est utilisé pour spécifier les noms des séries de données. Si vous avez plusieurs séries (plusieurs listes dans `y`), vous devez fournir une liste de noms correspondante dans `name`.

---

## Autres exemples

### 1. Diagramme en étoile avec palette divergente ascendante

## Exemple :

```html
<radar-chart
  x='[["Critère 1", "Critère 2", "Critère 3", "Critère 4", "Critère 5"]]'
  y="[[80, 90, 70, 60, 50], [60, 70, 80, 90, 100]]"
  name='["Série A", "Série B"]'
  selected-palette="divergentAscending"
  unit-tooltip="%"
>
</radar-chart>
```

---

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

# Jauge (GaugeChart)

Ce graphique est généré avec la balise `<gauge-chart> `

Les paramètres obligatoires sont :

· **value** : la valeur actuelle de la jauge sous la forme d’une un nombre

· **init** : la valeur de départ de la jauge

· **target** : la valeur cible de la jauge

## Exemple :

```html
<gauge-chart value="16" init="10" target="20"></gauge-chart>
```

---

# DataBox

Le composant `DataBox` est un composant permettant d’afficher dans un cadre normé des données sous différentes formes (graphiques, chiffres clés, tableaux, etc). Il est à utiliser pour composer un tableau de bord, ou toute page nécessitant de structurer la visualisation de données.

Polyvalente, la databox intègre également des fonctionnalités interactives telles que des sélecteurs de sources, des modales, et des menus déroulants permettant la mise à disposition d’actions supplémentaires.

## Utilisation de base

```html
<data-box
    id="abc"
    title="Emplois en France de 1926 à 1950"
    tooltip-title="Emplois en France"
    tooltip-content="Nombre d'emplois en France de 1926 à 1950, par genre. Se base sur les données de l'INSEE et de Pôle Emploi et d'une autre source."
    modal-title="Titre de la modale"
    modal-content="Contenu de la modale"
    source="INSEE, Pôle Emploi, Autre source"
    date="2021-01-01"
    default-source="pole-emploi"
    trend="5%"
    segmented-control="true"
    screenshot="true"
    download="true"
    fullscreen="true"
    actions='["Source officielle", "Pôle emploi"]'>
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

- **tooltip-title** `(String)` (défaut : '') : titre de la tooltip
- **tooltip-content** `(String)` (défaut : '') : contenu de la tooltip
- **modal-title** `(String)` (défaut : '') : titre de la modale
- **modal-content** `(String)` (défaut : '') : contenu de la modale
- **default-source** `(String)` (défaut : null) : source à afficher par défaut
- **trend** `(String)` (défaut : null) : tendance de l'évolution des données
- **segmented-control** `(Boolean)` (défaut : true) : afficher le système de vue graphique/tableau
- **fullscreen** `(Boolean)` (défaut : false) : donner la possibilité d'ouvrir le graphique dans une modale
- **screenshot** `(Boolean)` (défaut : false) : permettre une capture d'écran de la DataBox
- **download** `(Boolean)` (défaut : false) : télécharger les données du graphique au format CSV
- **actions** `(Array)` (défaut : []) : liste des actions supplémentaires à afficher dans le menu (pour se greffer par la suite avec l'id)

### Mise en place du graphique et de son alternative

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
  modal-title="Titre de la modale"
  modal-content="Contenu de la modale"
  source="INSEE, Pôle Emploi, Autre source"
  date="2021-01-01"
  default-source="pole-emploi"
  trend="5%"
  segmented-control="true"
  screenshot="true"
  download="true"
  fullscreen="true"
  actions='["Source officielle", "Pôle emploi"]'>
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

### Un composant flexible pour construire vos tableaux de bord

La databox s’appuie sur [la grille proposée par le DSFR](https://www.systeme-de-design.gouv.fr/fondamentaux/grille-et-points-de-rupture/), et peut s’afficher selon vos besoins, sur une ou plusieurs colonnes de la grille, grâce à la classe `fr-col`. Pensez toutefois à utiliser un `fr-grid-row` par ligne pour permettre le bon fonctionnement des infobulles du composant.

Vous pourrez ainsi construire des dashboard en donnant aux databox la taille nécessaire, en fonction de vos besoins métiers et de l’aspect souhaité pour vos graphiques.

### Structure

La databox est composée des éléments suivants :

- **un titre** (obligatoire)
- une infobulle permettant de préciser la donnée affichée (optionnelle)
- un bouton permettant l’affichage d’une modale en plein écran (optionnel)
- un menu à points permettant l’affichage d’actions supplémentaires (optionnel et personnalisable voir plus bas)
- un indicateur de tendance (optionnel)
- **la donnée principale : chiffre, graphique ou tableau** (obligatoire)
- **une source** (obligatoire)
- **une date de mise à jour de la donnée** (obligatoire)
- **un contrôle segmenté pour afficher la donnée en vue tableau** (obligatoire lorsque c’est un graphique qui est affiché)

### Personnalisation du menu à points

Par défaut, la librairie DSFR Chart propose dans le menu à points deux fonctionnalités :

- une fonctionnalité d’export CSV des données
- une fonctionnalité de téléchargement de capture d’écran

Toutefois, ces fonctionnalités sont optionnelles, et ne doivent pas apparaître obligatoirement si vous n’en avez pas le besoin. Par ailleurs, le menu à points peut contenir tous les liens ou actions utilisateurs dont vous avez besoin pour votre projet.

---

## Gestion des couleurs

Un graphique étant par définition une représentation visuelle d’un ensemble de données, la couleur est un paramètre avec lequel il est possible de jouer pour en améliorer la compréhension et la perception. Une utilisation appropriée des couleurs est par conséquent essentielle pour réussir vos graphiques.

Dans DSFR Chart, le paramètre `selectedPalette` vous permet de personnaliser les couleurs utilisées dans le graphique. Choisissez parmi les options disponibles pour représenter vos données de manière appropriée :

- `'default'` : Couleur par défaut.
- `'neutral'` : Palette neutre.
- `'categorical'` : Palette catégorielle par défaut.
- `'sequentialAscending'` : Palette séquentielle ascendante.
- `'sequentialDescending'` : Palette séquentielle descendante.
- `'divergentAscending'` : Palette divergente ascendante.
- `'divergentDescending'` : Palette divergente descendante.

### Graphiques unicolores

`default Catégorie 1`

Une représentation graphique n’a pas toujours besoin d’être colorée. Lorsqu’il n’est pas nécessaire de différencier les formes par des couleurs, on affichera les graphes avec la couleur par défaut pour les graphes unicolores, avec l’option `'default'`.

|                | Thème clair | Thème sombre |
|----------------|-------------|--------------|
| État initial   | #5C68E5     | #5C68E5      |
| État de survol | #2846bc     | #2846bc      |

`neutral Catégorie 1`

Pour mettre en évidence une donnée d'un ensemble de données, utilisez la couleur par défaut pour colorer cette donnée, et colorez les autres données en utilisant l’option `'neutral'`.

|                | Thème clair | Thème sombre |
|----------------|-------------|--------------|
| État initial   | #B1B1B1     | #808080      |
| État de survol | #8b8b8b     | #5c5c5c      |

### Graphiques catégoriels

Lorsque les formes du graphique doivent être différenciées par des couleurs mais que celles-ci ne sont pas porteuses de sens supplémentaire que la catégorisation, la palette catégorielle doit être utilisée : utilisez alors l’option `'categorical'`.

La palette catégorielle ne comprend que 8 teintes de couleurs pour limiter le nombre de catégories affichées, car représenter plus de 8 catégories nuirait à la compréhension de l’utilisateur. Au-delà de ce nombre, il conviendra de rassembler les dernières catégories dans un ensemble “Autres”.

`Catégorie 1`

|                | Thème clair | Thème sombre |
|----------------|-------------|--------------|
| État initial   | #5C68E5     | #5C68E5      |
| État de survol | #2846bc     | #2846bc      |

`Catégorie 2`

|                | Thème clair | Thème sombre |
|----------------|-------------|--------------|
| État initial   | #82B5F2     | #699BD6      |
| État de survol | #598fc9     | #3f76ae      |

`Catégorie 3`

|                | Thème clair | Thème sombre |
|----------------|-------------|--------------|
| État initial   | #29598F     | #4878B1      |
| État de survol | #00386a     | #18558b      |

`Catégorie 4`

|                | Thème clair | Thème sombre |
|----------------|-------------|--------------|
| État initial   | #31A7AE     | #00828A      |
| État de survol | #008188     | #005e66      |

`Catégorie 5`

|                | Thème clair | Thème sombre |
|----------------|-------------|--------------|
| État initial   | #81EEF5     | #51C1C8      |
| État de survol | #55c5cc     | #199aa1      |

`Catégorie 6`

|                | Thème clair | Thème sombre |
|----------------|-------------|--------------|
| État initial   | #B478F1     | #BC8AF2      |
| État de survol | #8b53c8     | #9465c9      |

`Catégorie 7`

|                | Thème clair | Thème sombre |
|----------------|-------------|--------------|
| État initial   | #CFB1F5     | #CFB1F5      |
| État de survol | #a78bcc     | #a78bcc      |

`Catégorie 8`

|                | Thème clair | Thème sombre |
|----------------|-------------|--------------|
| État initial   | #CECECE     | #A4A4A4      |
| État de survol | #a7a7a7     | #7e7e7e      |

### Graphiques séquentiels

Lorsque les formes du graphique doivent être différenciées par des couleurs et que ces couleurs matérialisent une gradation, une palette séquentielle doit être utilisée. Il en existe deux versions à utiliser en fonction du besoin :

#### Palette séquentielle unicolore

Lorsque les formes du graphique doivent être différenciées par des couleurs et que ces couleurs matérialisent une gradation, une palette séquentielle doit être utilisée. Sélectionnez l’option `'sequentialAscending'` ou `'sequentialDescending'` en fonction du sens que vous souhaitez donner à cette gradation.

En fonction du nombre de catégories, on appliquera autant de valeurs de couleurs qu’il en existe dans un dégradé allant de la couleur de départ à la couleur d’arrivée.

`Catégorie 1`

|                | Thème clair | Thème sombre |
|----------------|-------------|--------------|
| État initial   | #DBDAFF     | #B8B9FF      |
| État de survol | #b3b2d6     | #9093d6      |

`Catégorie 2`

|                | Thème clair | Thème sombre |
|----------------|-------------|--------------|
| État initial   | #00005F     | #3647CA      |
| État de survol | #00003d     | #0027a2      |

### Palette séquentielle divergente

Cette palette convient pour matérialiser des échelles numériques mais qui intègrent des valeurs négatives, ou des plages comportant **deux extrêmes avec une ligne de base au milieu**.

Sélectionnez l’option `'divergentAscending'` ou `'divergentDescending'` en fonction du sens que vous souhaitez donner à cette gradation. Dans la mesure du possible, le nombre de catégories doit refléter cette divergence, à travers un nombre impair de catégories distinctes (3, 5, 7, etc.) qui permettra de **marquer la médiane**.

Dans le cas où le nombre de catégories devrait être supérieur à 5, on appliquera autant de valeurs de couleurs qu’il en existe dans un dégradé allant du vert vers le rouge en passant par le jaune.

`Catégorie 1`

|                | Thème clair | Thème sombre |
|----------------|-------------|--------------|
| État initial   | #298641     | #298641      |
| État de survol | #00611f     | #00611f      |

`Catégorie 2`

|                | Thème clair | Thème sombre |
|----------------|-------------|--------------|
| État initial   | #EFB900     | #AF8800      |
| État de survol | #c39300     | #856400      |

`Catégorie 3`

|                | Thème clair | Thème sombre |
|----------------|-------------|--------------|
| État initial   | #E91719     | #E16834      |
| État de survol | #b90000     | #b4420f      |

---

## Accessibilité

> Utilisés seuls, les graphiques du DSFR Charts sont inaccessibles aux personnes aveugles, déficientes visuelles et aux personnes handicapées motrices. Il conviendra donc d’apporter une alternative textuelle pertinente à chaque fois qu’un graphique est affiché.

### Non-conformités

Les principales problématiques posées par les graphiques sont les suivantes :

- Accès aux données des graphiques et aux cartes impossibles (critères 1.1, 1.6, 4.8, 4.9 du RGAA)
- Accès et contrôle au clavier impossible (critères 4.12, 10.13, 10.14 du RGAA)
- Information donnée uniquement par la couleur (critère 3.1 du RGAA)
- Contrastes de couleurs non textuels (critère 3.3 du RGAA)

### Alternatives accessibles

La solution la plus simple et la plus efficace pour rendre les composants complexes tels que les graphiques ou les cartes est de proposer les mêmes contenus ou informations dans une alternative accessible plutôt que de chercher à travailler sur ces composants dynamiques directement.

Dans certains cas comme la carte où il faudrait naviguer sur tous les départements par exemple, cela serait même contre-productif et moins utilisable de chercher à la rendre accessible au clavier.

**On systématisera donc plutôt une approche par alternative**, en privilégiant celle qui apportera le plus de confort de lecture.

#### Alternative 1 : utiliser un tableau

Présenter les résultats sous forme de tableau est sans doute l’option la plus simple, surtout s’il y a beaucoup de données à présenter. On privilégiera dans le cas des contenus les plus complexes la création de plusieurs tableaux simples et non de tableaux avec des cellules fusionnées pour faciliter la lecture.

> Le composant databox embarque par défaut une alternative sous forme de tableau.

#### Alternative 2 : utiliser un liste simple ou liste titrée

Lorsqu’il n’y a que quelques données à présenter, une simple liste peut suffire. Par exemple :

Pourcentage de français ayant réalisé un achat sur Internet au cours des 12 derniers mois :

- 15 à 29 ans : 75,4%
- 30 à 44 ans : 80,5%
- 45 à 59 ans : 66,8%
- 60 à 74 ans : 43,5%
- 75 ans ou plus : 12,1%

#### Alternative 3 : utiliser du texte structuré

Dans d’autres cas, l’information pourrait déjà être présente dans le corps de texte adjacent ou l’alternative peut être un simple texte structuré.

Ainsi, sur la jauge ci-dessus, l’alternative pourrait être : "En 2022, nous avons atteint les 100 000 utilisateurs. Cela correspond à 14 % de l’objectif 2026, fixé à 2 millions d’utilisateurs."

### Affichage de l’alternative

L’alternative ou un moyen d’accéder à l’alternative (lien/bouton) doit être adjacente au graphique. La #databox présente ainsi systématiquement l’alternative textuelle dans le contrôle segmenté en bas à droite du composant.

Lorsqu’un graphique est utilisé seul, sans la databox, l’alternative textuelle peut être affichée dans un [accordéon](https://www.systeme-de-design.gouv.fr/composants-et-modeles/composants/accordeon/) présenté sous le graphique.

> **Important**
>
> Il conviendra de documenter cette approche dans la déclaration d’accessibilité pour que les personnes handicapées concernées sachent qu’une alternative accessible est systématiquement fournie.

```html
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

## Contribution

Le processus de contribution est détaillé sur la page [CONTRIBUTING.md](CONTRIBUTING.md).
