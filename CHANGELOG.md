# Changelog de DSFR Chart

Toutes les modifications notables apportées à ce projet sont documentées dans ce fichier.

Pour plus d’informations : [Voir la documentation](./README.md)

> ## DSFR-Chart v2

## v2.1.0

### [v2.1.0](https://github.com/GouvernementFR/dsfr-chart/compare/v2.0.5...v2.1.0) - 01 Juin 2026

#### 🔖 chore(\*): DSFR-chart v2.1.0 [(#67)](https://github.com/GouvernementFR/dsfr-chart/pull/67)

- core (package) : package-lock
- nombreuses corrections de bugs + nouvelles cartes + numérotation des databoxes + exploration détaillée + nettoyage
- correction des problèmes de fusion
- mise à jour des dépendances npm
- augmentation des dépendances npm
- mise à jour des dépendances et migration vers la dernière version de Sass
- mise à jour des dépendances et amélioration de la configuration ESLint
- mise à jour des actions du workflow GitHub et de Node LTS
- configuration de Vue pour éviter les problèmes avec le rechargement à chaud (HMR) ? (vuejs/core#13202, commentaire)
- correction de la compatibilité avec les futures versions de VueJS #65
- suppression de la dépendance à l'échelle d3
- configuration globale de Prettier, formatage et améliorations
- correction de la revue de code
- clarification de la documentation avec Vue
- modification de la documentation et des données simples des databoxes
- ajout de la documentation sur le graphique DSFR
- ajout de documentation sur la publication
- meilleure formulation et suppression de l'index de surbrillance par défaut
- script pour migrer les pays anglais vers le français
- ajout d'une exception
- correction des pays manquants (guillemets de l'analyseur CSV et pays non reconnus)
- correction des noms français et du code pays du Groenland
- correction de la faute de frappe GB
- modification du contour des pays au clic
- correction du zoom sur DROM
- nettoyage des éléments inutilisés Références
- correction de l'affichage systématique de la légende en HTML brut
- correction du nom de fichier et utilisation pour la capture d'écran
- régénération des captures d'écran visuelles
- correction si subY est indéfini
- ajout d'échelles minimale et maximale pour le graphique radar
- correction de l'incohérence des valeurs du graphique et suppression de l'ordre inverse
- modification de nameParse pour la légende au clic dans le graphique circulaire
- utilisation du bleu par défaut pour le graphique de type jauge
- uniformisation des couleurs des jeux de données
- ajout de l'attribut max-overflow pour la classe de cellule
- utilisation de innerText pour l'en-tête de l'infobulle

## v2.0.5

### [v2.0.5](https://github.com/GouvernementFR/dsfr-chart/compare/v2.0.4...v2.0.5) - 22 Avril 2026

#### 🔖 chore(\*): DSFR-chart v2.0.5 [(#55)](https://github.com/GouvernementFR/dsfr-chart/pull/55)

- patch de la version 2.0.4 pour remettre à disposition les composants unitairement

## v2.0.4

### [v2.0.4](https://github.com/GouvernementFR/dsfr-chart/compare/v2.0.3...v2.0.4) - 19 Mai 2025

#### 🔖 chore(\*): DSFR-chart v2.0.4 [(#49)](https://github.com/GouvernementFR/dsfr-chart/pull/49)

- mise à jour du path des fichiers storybook dans src
- ajout du watch de toutes les props pour rerender les graphiques / tableaux
- correction du shadow root sur les composants unitaires
- ajout d'options d'exports dans le package.json pour permettre plus de possibilités
- mise à disposition des composants unitaires
- mise à jour des dépendances NPM

## v2.0.3

### [v2.0.3](https://github.com/GouvernementFR/dsfr-chart/compare/v2.0.2...v2.0.3) - 18 Fevrier 2025

#### 🔖 chore(\*): DSFR-chart v2.0.3 [(#35)](https://github.com/GouvernementFR/dsfr-chart/pull/35)

- modifie le nom du script du composant d'export.

## v2.0.2

### [v2.0.2](https://github.com/GouvernementFR/dsfr-chart/compare/v2.0.1...v2.0.2) - 18 Fevrier 2025

#### 🔖 chore(\*): DSFR-chart v2.0.2 [(#34)](https://github.com/GouvernementFR/dsfr-chart/pull/34)

- exporte le module principal et modifie le nom du script du composant.

## v2.0.1

### [v2.0.1](https://github.com/GouvernementFR/dsfr-chart/compare/v2.0.0...v2.0.1) - 17 Fevrier 2025

#### 🔖 chore(\*): DSFR-chart v2.0.1 [(#32)](https://github.com/GouvernementFR/dsfr-chart/pull/32)

- mise à jour du README.md

## v2.0

### [v2.0.0](https://github.com/GouvernementFR/dsfr-chart/tree/v2.0.0) - 17 Février 2025

#### 🔖 chore(\*): DSFR-chart v2.0.0 [(#20)](https://github.com/GouvernementFR/dsfr-chart/pull/20)

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

#### 🔖 chore(\*): DSFR-chart v1.0.0 [v1.0.0](https://github.com/GouvernementFR/dsfr-chart/tree/v1.0.0)

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
