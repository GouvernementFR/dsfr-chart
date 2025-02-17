import BarChart from '@/components/BarChart.vue';
import BarLineChart from '@/components/BarLineChart.vue';
import GaugeChart from '@/components/GaugeChart.vue';
import LineChart from '@/components/LineChart.vue';
import MapChart from '@/components/MapChart.vue';
import MapChartReg from '@/components/MapChartReg.vue';
import PieChart from '@/components/PieChart.vue';
import RadarChart from '@/components/RadarChart.vue';
import ScatterChart from '@/components/ScatterChart.vue';
import { chartData } from '@/assets/data.js';

export const chartExamples = [
  // Graphique en ligne
  {
    title: 'Graphique en ligne',
    desc: 'Un graphique en ligne est un type de visualisation de données qui affiche les valeurs sous forme de points sur une ligne. Elle permet d’affiche une seule ligne ou en présenter plusieurs pour permettre la comparaison.',
    graphs: [
      { component: LineChart, heading: 'Graphique en ligne simple', title: 'Évolution du prix des logements anciens entre 2001 et 2020', desc: 'Indices des prix des logements neufs et anciens, France métropolitaine. Base 100 en moyenne en 2015. Insee, 04/11/2024', props: chartData.lineChart.default },
      { component: LineChart, heading: 'Graphique en lignes multiples', title: 'Taux d’activité selon le sexe depuis 1975', desc: 'France hors Mayotte, personnes de 15 à 64 ans vivant en logement ordinaire. Insee, 04/11/2024', props: chartData.lineChart.multiple },
    ],
  },
  // Diagramme en barres
  {
    title: 'Diagramme en barres',
    desc: 'Un diagramme en barres montre les dénombrements de valeurs pour les niveaux d’une variable catégorielle, séquentielle ou neutre. Les barres peuvent être présentées de manière horizontale, verticale ou être empilées.',
    graphs: [
      { component: BarChart, heading: 'Barres verticales', title: 'Projection de la population française', desc: 'Population au 1er janvier - Données issues du scénario central des projections de population 2013-2070. Insee, 04/11/2024', props: chartData.barChart.vertical },
      { component: BarChart, heading: '', title: 'Pratique de l’internet des plus de 60 ans en 2018', desc: 'France hors Mayotte, individus de 15 ans ou plus vivant dans un ménage ordinaire. Insee, enquête Technologies de l’information et de la communication auprès des ménages, 04/11/2024', props: chartData.barChart.unicolor },
      { component: BarChart, heading: '', title: 'Les régions les plus pluvieuses de France en 2023', desc: 'France métropolitaine uniquement. Météo France, 04/11/2024', props: chartData.barChart.sequential },
      { component: BarChart, heading: 'Barres horizontales', title: 'Émissions de gaz à effet de serre par habitant en France', desc: 'En tonnes équivalent CO₂ par habitant. France métropolitaine. Insee, 12/02/2024', props: chartData.barChart.horizontal },
      { component: BarChart, heading: 'Barres empilées', title: 'Satisfaction des français à l’égard des services publics', desc: 'Étude IFOP pour TF1, janvier 2024 - Le regard des Français sur les services publics : satisfaction, jugement sur leur financement par les impôts et attentes. Ifop, enquête Emploi, 04/01/2024', props: chartData.barChart.stacked },
    ],
  },
  // Graphique en ligne / Diagramme en barres
  {
    title: 'Graphique en ligne / Diagramme en barres',
    desc: 'Il est également possible de combiner un graphique en ligne et un diagramme en barres, pour permettre la comparaison entre des données présentées différemment.',
    graphs: [{ component: BarLineChart, title: 'Évolution du nombre de naissances et du taux de natalité', desc: 'France hors Mayotte, naissances en milliers et taux de natalité pour mille femmes. Insee, 16/01/2024', props: chartData.barLineChart.default }],
  },
  // Diagramme circulaire
  {
    title: 'Diagramme circulaire',
    desc: 'Un diagramme circulaire permet de représenter un petit nombre de valeurs par des angles proportionnels à la fréquence de ces valeurs. Chacune des « parts » représente une catégorie de données qui forment un ensemble, et la taille de chaque « part » est proportionnelle à son poids dans l’ensemble. Le diagramme circulaire peut être plein ou creux.',
    graphs: [
      { component: PieChart, heading: 'Diagramme circulaire creux (donut)', title: 'Statut des emplois en France', desc: 'Pour l’année 2018. France hors Mayotte, population des ménages, personnes en emploi. Insee, enquête Emploi, 04/11/2024', props: chartData.pieChart.doughnut },
      { component: PieChart, heading: 'Diagramme circulaire plein', title: 'Structure des dépenses publiques en France en 2022', desc: 'France métropolitaine. Insee, 30/11/2023', props: chartData.pieChart.pie },
    ],
  },
  // Cartes
  {
    title: 'Cartes',
    desc: 'Les cartes permettent d’afficher une série de données réparties par département ou région. Les cartes sont actuellement disponibles aux niveaux départemental et régional, et il est également possible d’isoler une région pour en afficher les départements.',
    graphs: [
      { component: MapChart, noPalette: true, heading: 'Découpage départemental', props: chartData.mapChart.departments },
      { component: MapChart, noPalette: true, heading: 'Découpage régional', props: chartData.mapChart.regions },
      { component: MapChartReg, noPalette: true, heading: 'Région', props: chartData.mapChartReg.region },
    ],
  },
  // Nuage de points
  {
    title: 'Nuage de points',
    desc: 'Le nuage de points est largement utilisée pour présenter plusieurs séries de données. C’est une représentation graphique qui est particulièrement utile lorsque les valeurs des données sur l’axe Y dépendent des valeurs d’un autre axe X.',
    graphs: [
      { component: ScatterChart, heading: 'Nuage de points simple', title: 'Évolution du taux moyen d’émissions de CO₂ en France', desc: 'Véhicules particuliers neufs vendus en France. Ademe, 04/11/2024', props: chartData.scatterChart.default },
      { component: ScatterChart, heading: 'Nuage de points reliés', title: 'Carrières complètes selon le sexe et la génération en 2016', desc: 'Retraités ayant perçu un droit direct au cours de l’année, résidant en France, vivants au 31 décembre 2016 ; tous régimes confondus. Insee, 09/09/2011', props: chartData.scatterChart.linked },
    ],
  },
  // Diagramme en étoile
  {
    title: 'Diagramme en étoile',
    desc: 'Le diagramme en étoile ou radar chart a été conçu pour représenter une ou plusieurs séries de valeurs sur plusieurs variables quantitatives.',
    graphs: [{ component: RadarChart, title: 'Statut des emplois par tranche d’âge', desc: 'Pour l’année 2018. France hors Mayotte, population des ménages, personnes en emploi. Insee, enquête Emploi, 04/11/2024', props: chartData.radarChart.default }],
  },
  // Jauge
  {
    title: 'Jauge',
    desc: 'La jauge permet d’afficher des valeurs numériques ou des mesures dans une plage, pour visualiser l’avancement d’un objectif par exemple.',
    graphs: [{ component: GaugeChart, noPalette: true, props: chartData.gaugeChart.default }],
  },
];
