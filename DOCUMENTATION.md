# Documentation des composants DSFR Chart

Cette documentation présente les propriétés (props) disponibles pour chaque composant de visualisation de données de la bibliothèque DSFR Chart.

## Utilisation de base

```vue
<template>
  <div>
    <!-- Conteneur DataBox pour le graphique -->
    <DataBox
      id="exemple-chart"
      title="Mon graphique"
      tooltip-title="Titre du tooltip"
      tooltip-content="Description du graphique"
      source="Insee"
      date="15/10/2024"
    />
    
    <!-- Graphique en barres -->
    <BarChart
      databox-id="exemple-chart"
      :x="[['2020', '2021', '2022', '2023']]"
      :y="[[10, 15, 12, 18]]"
      :name="['Évolution']"
      unit-tooltip="millions"
    />
  </div>
</template>
```

## Composants disponibles

### LineChart

**Props :**
- `x` (Array, requis) : Données de l'axe X
- `y` (Array, requis) : Données de l'axe Y  
- `name` (Array) : Noms des séries de données
- `colors` (Array) : Couleurs personnalisées
- `showLabels` (String/Array) : Affichage des étiquettes ('minmax' ou indices)
- `unitTooltip` (String) : Unité affichée dans le tooltip
- `vline` (Array) : Lignes verticales
- `vlinecolor` (Array) : Couleurs des lignes verticales
- `vlinename` (Array) : Noms des lignes verticales
- `hline` (Array) : Lignes horizontales
- `hlinecolor` (Array) : Couleurs des lignes horizontales
- `hlinename` (Array) : Noms des lignes horizontales
- `selectedPalette` (String) : Palette de couleurs prédéfinie
- `xMin/xMax/yMin/yMax` (Number/String) : Limites des axes
- `aspectRatio` (Number) : Ratio d'aspect
- `date` (String) : Date de mise à jour

**Exemple :**
```vue
<LineChart
  databox-id="line-example"
  :x="[[2001, 2002, 2003, 2004, 2005]]"
  :y="[[51.50, 55.30, 61.50, 70.20, 81.10]]"
  :name="['Indices des prix']"
  unit-tooltip="points d'indice"
  :show-labels="[0, 2, 4]"
/>
```

### BarChart

**Props :**
- `x` (Array, requis) : Données de l'axe X
- `y` (Array, requis) : Données de l'axe Y
- `name` (Array) : Noms des séries
- `stacked` (Boolean) : Empilement des barres
- `horizontal` (Boolean) : Orientation horizontale
- `barSize` (Number/String) : Taille des barres (défaut: 'flex')
- `maxBarSize` (Number) : Taille maximale des barres (défaut: 32)
- `colors` (Array) : Couleurs personnalisées
- `selectedPalette` (String) : Palette de couleurs
- `highlightIndex` (Array) : Indices à mettre en évidence
- `unitTooltip` (String) : Unité dans le tooltip
- `xMin/xMax/yMin/yMax` (Number/String) : Limites des axes
- `aspectRatio` (Number) : Ratio d'aspect
- `date` (String) : Date de mise à jour

**Exemple :**
```vue
<BarChart
  databox-id="bar-example"
  :x="[['Groupe A', 'Groupe B', 'Groupe C']]"
  :y="[[15, 19, 15], [45, 40, 47]]"
  :name="['Satisfait', 'Plutôt satisfait']"
  :stacked="true"
  selected-palette="divergentDescending"
  unit-tooltip="%"
/>
```

### PieChart

**Props :**
- `x` (Array, requis) : Libellés
- `y` (Array, requis) : Valeurs
- `name` (Array) : Noms des segments
- `fill` (Boolean) : True pour camembert plein, false pour anneau
- `colors` (Array) : Couleurs personnalisées
- `selectedPalette` (String) : Palette de couleurs
- `unitTooltip` (String) : Unité dans le tooltip
- `aspectRatio` (Number) : Ratio d'aspect
- `date` (String) : Date de mise à jour

**Exemple :**
```vue
<PieChart
  databox-id="pie-example"
  :x="[['CDI', 'Non-salariés', 'CDD', 'Apprentis']]"
  :y="[[74.8, 11.7, 9.3, 1.6]]"
  :name="['CDI', 'Non-salariés', 'CDD', 'Apprentis']"
  :fill="true"
  unit-tooltip="%"
/>
```

### ScatterChart

**Props :**
- `x` (Array, requis) : Données de l'axe X
- `y` (Array, requis) : Données de l'axe Y
- `name` (Array) : Noms des séries
- `showLine` (Boolean) : Relier les points par des lignes
- `pointRadius` (Number) : Taille des points
- `colors` (Array) : Couleurs personnalisées
- `selectedPalette` (String) : Palette de couleurs
- `unitTooltip` (String) : Unité dans le tooltip
- `xMin/xMax/yMin/yMax` (Number/String) : Limites des axes
- `aspectRatio` (Number) : Ratio d'aspect
- `date` (String) : Date de mise à jour

**Exemple :**
```vue
<ScatterChart
  databox-id="scatter-example"
  :x="[[1995, 2000, 2005, 2010, 2015, 2020]]"
  :y="[[175, 155, 149, 130, 111, 107]]"
  :name="['Émissions CO₂']"
  :show-line="true"
  unit-tooltip="g de CO₂ / km"
/>
```

### RadarChart

**Props :**
- `x` (Array, requis) : Dimensions du radar
- `y` (Array, requis) : Valeurs pour chaque dimension
- `name` (Array) : Noms des séries
- `colors` (Array) : Couleurs personnalisées
- `selectedPalette` (String) : Palette de couleurs
- `unitTooltip` (String) : Unité dans le tooltip
- `aspectRatio` (Number) : Ratio d'aspect
- `date` (String) : Date de mise à jour

**Exemple :**
```vue
<RadarChart
  databox-id="radar-example"
  :x="[['Logement', 'Alimentation', 'Transport']]"
  :y="[[22.6, 28.9, 10.7], [31.3, 15.9, 12.9]]"
  :name="['1963', '2023']"
  unit-tooltip="%"
/>
```

### GaugeChart

**Props :**
- `value` (Number, requis) : Valeur actuelle
- `init` (Number) : Valeur initiale
- `target` (Number) : Valeur cible
- `initDate` (String) : Date de la valeur initiale
- `targetDate` (String) : Date de la valeur cible
- `date` (String) : Date de mise à jour

**Exemple :**
```vue
<GaugeChart
  databox-id="gauge-example"
  :value="360000"
  :init="100000"
  :target="2000000"
  init-date="(en 2022)"
  target-date="(en 2026)"
/>
```

### BarLineChart

**Props :**
- `x` (Array, requis) : Données de l'axe X
- `yBars` (Array, requis) : Données pour les barres
- `yLines` (Array, requis) : Données pour les lignes
- `nameBars` (Array) : Noms des séries de barres
- `nameLines` (Array) : Noms des séries de lignes
- `unitTooltipBar` (String) : Unité pour les barres
- `unitTooltipLine` (String) : Unité pour les lignes
- `barsColors` (Array) : Couleurs des barres
- `linesColors` (Array) : Couleurs des lignes
- `stacked` (Boolean) : Empilement des barres
- `xMin/xMax/yMin/yMax` (Number/String) : Limites des axes
- `aspectRatio` (Number) : Ratio d'aspect
- `date` (String) : Date de mise à jour

**Exemple :**
```vue
<BarLineChart
  databox-id="barline-example"
  :x="[[1980, 1990, 2000, 2010]]"
  :y-bars="[[826, 793, 807, 832], [926, 493, 307, 732]]"
  :y-lines="[[14.9, 13.4, 24, 13.1]]"
  :name-bars="['Taux natalité', 'Taux mortalité']"
  :name-lines="['Naissances']"
  unit-tooltip-bar="milliers"
  unit-tooltip-line="%"
/>
```

### AreaLineChart

**Props similaires à BarLineChart :**
- `x` (Array, requis) : Données de l'axe X
- `yAreas` (Array, requis) : Données pour les zones
- `yLines` (Array, requis) : Données pour les lignes
- `nameAreas` (Array) : Noms des séries de zones
- `nameLines` (Array) : Noms des séries de lignes
- `unitTooltipArea` (String) : Unité pour les zones
- `unitTooltipLine` (String) : Unité pour les lignes
- `areasColors` (Array) : Couleurs des zones
- `linesColors` (Array) : Couleurs des lignes
- `stacked` (Boolean) : Empilement des zones

### MapChart

**Props :**
- `data` (Object, requis) : Données avec codes géographiques
- `level` (String, requis) : 'dep' pour départements, 'reg' pour régions
- `value` (String) : Valeur affichée
- `name` (String) : Nom de l'indicateur
- `date` (String) : Date des données
- `colors` (Array) : Couleurs personnalisées
- `selectedPalette` (String) : Palette de couleurs

**Exemple :**
```vue
<MapChart
  databox-id="map-example"
  :data="{'01': 10, '02': 83, '13': 89}"
  level="dep"
  value="10"
  name="Indicateur départemental"
  date="15/10/2024"
/>
```

### MapChartReg

**Props supplémentaires à MapChart :**
- `region` (String, requis) : Code de la région à afficher

### TableChart

**Props :**
- `x` (Array, requis) : En-têtes de colonnes
- `y` (Array, requis) : Données du tableau
- `tableName` (String) : Nom du tableau
- `date` (String) : Date de mise à jour

**Exemple :**
```vue
<TableChart
  databox-id="table-example"
  :x="['A','B','C','D']"
  :y="[[40, 50, 40, 39], [30, 150, 340, 379]]"
  table-name="Données statistiques"
/>
```

### DataBox

**Props :**
- `id` (String, requis) : Identifiant unique
- `title` (String, requis) : Titre principal
- `tooltipTitle` (String) : Titre du tooltip
- `tooltipContent` (String) : Contenu du tooltip
- `modalTitle` (String) : Titre de la modale
- `modalContent` (String) : Contenu HTML de la modale
- `source` (String) : Source des données
- `date` (String) : Date de mise à jour
- `trend` (String) : Évolution en pourcentage (ex: '+2.1%', '-1.5%')
- `defaultSource` (String) : Source par défaut si plusieurs
- `screenshot` (Boolean) : Activer la capture d'écran
- `download` (Boolean) : Activer le téléchargement
- `fullscreen` (Boolean) : Activer le mode plein écran
- `segmentedControl` (Boolean) : Activer le basculement graphique/tableau
- `actions` (Array) : Actions personnalisées dans le menu

## Propriétés communes à tous les graphiques

### Intégration DataBox
- `databoxId` (String) : ID de la DataBox conteneur
- `databoxType` (String) : Type de contenu
- `databoxSource` (String) : Source spécifique (défaut: 'default')

### Palettes de couleurs prédéfinies
- `'default'` : Couleurs standard DSFR
- `'neutral'` : Tons neutres
- `'sequential'` : Dégradé croissant
- `'sequentialDescending'` : Dégradé décroissant
- `'divergent'` : Couleurs divergentes
- `'divergentDescending'` : Divergentes inversées

## Exemple complet

```vue
<template>
  <div class="fr-container">
    <DataBox
      id="evolution-population"
      title="Évolution de la population française"
      tooltip-title="Population française"
      tooltip-content="Données de population de 2020 à 2024"
      source="INSEE"
      date="15/10/2024"
      trend="+2.1%"
      :screenshot="true"
      :download="true"
      :fullscreen="true"
    />
    
    <LineChart
      databox-id="evolution-population"
      :x="[[2020, 2021, 2022, 2023, 2024]]"
      :y="[[67.4, 67.6, 67.8, 68.0, 68.2]]"
      :name="['Population totale']"
      :colors="['#000091']"
      unit-tooltip="millions"
      show-labels="minmax"
    />
  </div>
</template>
```