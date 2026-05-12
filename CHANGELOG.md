# Changelog de DSFR Chart

Toutes les modifications notables apportées à ce projet sont documentées dans ce fichier.

Pour plus d’informations : [Voir la documentation](./README.md)

> ## DSFR-Chart v2

## v2.0.5

### [v2.0.5](https://github.com/GouvernementFR/dsfr-chart/compare/v2.0.4...v2.0.5) - 22 Avril 2026

#### 🔖 chore(*): DSFR-chart v2.0.5 [(#55)](https://github.com/GouvernementFR/dsfr-chart/pull/55)
- patch de la version 2.0.4 pour remettre à disposition les composants unitairement

## v2.0.4

### [v2.0.4](https://github.com/GouvernementFR/dsfr-chart/compare/v2.0.3...v2.0.4) - 19 Mai 2025

#### 🔖 chore(*): DSFR-chart v2.0.4 [(#49)](https://github.com/GouvernementFR/dsfr-chart/pull/49)
- mise à jour du path des fichiers storybook dans src
- ajout du watch de toutes les props pour rerender les graphiques / tableaux
- correction du shadow root sur les composants unitaires
- ajout d'options d'exports dans le package.json pour permettre plus de possibilités
- mise à disposition des composants unitaires
- mise à jour des dépendances NPM

## v2.0.3

### [v2.0.3](https://github.com/GouvernementFR/dsfr-chart/compare/v2.0.2...v2.0.3) - 18 Fevrier 2025

#### 🔖 chore(*): DSFR-chart v2.0.3 [(#35)](https://github.com/GouvernementFR/dsfr-chart/pull/35)
- modifie le nom du script du composant d'export.

## v2.0.2

### [v2.0.2](https://github.com/GouvernementFR/dsfr-chart/compare/v2.0.1...v2.0.2) - 18 Fevrier 2025

#### 🔖 chore(*): DSFR-chart v2.0.2 [(#34)](https://github.com/GouvernementFR/dsfr-chart/pull/34)
- exporte le module principal et modifie le nom du script du composant.

## v2.0.1

### [v2.0.1](https://github.com/GouvernementFR/dsfr-chart/compare/v2.0.0...v2.0.1) - 17 Fevrier 2025

#### 🔖 chore(*): DSFR-chart v2.0.1 [(#32)](https://github.com/GouvernementFR/dsfr-chart/pull/32)
- mise à jour du README.md

## v2.0

### [v2.0.0](https://github.com/GouvernementFR/dsfr-chart/tree/v2.0.0) - 17 Février 2025

#### 🔖 chore(*): DSFR-chart v2.0.0 [(#20)](https://github.com/GouvernementFR/dsfr-chart/pull/20)
- mise en place d'un tooling Vite.js
- montée de version Chart.js v4.4.7
- montée de version Vue.js v3.5.13
- ajout d'environnement de test Storybook v8.5.2
- ajout de test de non regression visuel Playwright dans un environnement Docker
- ajout du composant `<data-box>`
- mise à jour du système de colorisation des charts
- mise à jour de l'affichage du tooltip
- refonte de la page de démo des graphs

> ## DSFR-Chart v1

## v1.0

### [v1.0.0](https://github.com/GouvernementFR/dsfr-chart/tree/v1.0.0) - 29 Novembre 2023

#### 🔖 chore(*): DSFR-chart v1.0.0 [v1.0.0](https://github.com/GouvernementFR/dsfr-chart/tree/v1.0.0)
Version Ɑ de la librairie de visualisation de données portée par le Système de Design de l’État.

##### Composants

- Nuage de points (ou ScatterChart)
- Graphique en ligne (ou LineChart)
- Diagramme en barres (ou BarChart)
- Graphique en barres combinés avec une ligne (ou BarLineChart)
- Options de lignes verticales et horizontales
- Diagramme circulaire (ou PieChart)
- Diagramme en étoile (ou RadarChart)
- Jauges (ou GaugeChart)
- Cartes (ou MapChart)

##### Fondamentaux

- Couleurs
- Accessibilité
