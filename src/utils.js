/* eslint-disable */
import chroma from 'chroma-js';  // Import de chroma-js
import colors from '../src/styles/assets/colors.json';  // Import du fichier colors.json

export const capitalize = function (string) {
  if (string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }
}
export const convertStringToLocaleNumber = function (string) {
  return parseInt(string).toLocaleString('fr-FR')
}

export const convertFloatToHuman = function (float) {
  if (Number.isInteger(parseFloat(float))) {
    return parseInt(float).toLocaleString('fr-FR')
  } else {
    return parseFloat(float).toFixed(2).toLocaleString('fr-FR')
  }
}

export function changeDateFormat (date) {
  if (date !== undefined && /^\d{4}-\d{2}-\d{2}$/.test(date)) {
    const dateArray = date.split('-')
    return `${dateArray[2]}/${dateArray[1]}/${dateArray[0]}`
  } else {
    return ''
  }
}

export const convertIntToHuman = function (int) {
  let res = parseFloat(int)
  if (Math.floor(res / 1000000000) >= 10) {
    res = (res / 1000000000).toFixed(0).replace('.', ',') + ' milliards'
  } else if (Math.floor(res / 1000000000) >= 2) {
    res = (res / 1000000000).toFixed(1).replace('.', ',') + ' milliards'
  } else if (Math.floor(res / 1000000000) >= 1) {
    res = (res / 1000000000).toFixed(1).replace('.', ',') + ' milliard'
  } else if (Math.floor(res / 1000000) >= 10) {
    res = (res / 1000000).toFixed(0).replace('.', ',') + ' millions'
  } else if (Math.floor(res / 1000000) >= 2) {
    res = (res / 1000000).toFixed(1).replace('.', ',') + ' millions'
  } else if (Math.floor(res / 1000000) >= 1) {
    res = (res / 1000000).toFixed(1).replace('.', ',') + ' million'
  } else if (Number.isInteger(parseFloat(res))) {
    return parseInt(res).toLocaleString('fr-FR').replace('.', ',')
  } else {
    return parseFloat(res).toFixed(2).toLocaleString('fr-FR').replace('.', ',')
  }
  return res
}

export const convertIntToHumanTable = function (int) {
  const res = parseFloat(int)
  if (isNaN(res)) {
    return int
  } else if (Number.isInteger(parseFloat(res))) {
    return parseInt(res).toLocaleString('fr-FR')
  } else {
    return parseFloat(res).toFixed(2).toLocaleString('fr-FR')
  }
}

export const convertDateToHuman = function (string) {
  const date = new Date(string)
  return date.toLocaleDateString('fr-FR')
}

export const testIfNaN = function (float) {
  return isNaN(parseFloat(float))
}

// Fonction pour obtenir les couleurs du thème actuel
export function getThemeColors() {
  const currentTheme = document.documentElement.getAttribute('data-fr-theme') || 'light';
  console.log('Thème actuel :', currentTheme);
  console.log('Couleurs disponibles :', colors);
  console.log('Couleurs du thème actuel :', colors[currentTheme]);
  return colors[currentTheme] || colors['light'];
}

// Fonction pour obtenir la palette catégorique
export function getCategoricalPalette() {
  const themeColors = getThemeColors();
  return [
    themeColors['dsfr-chart-colors-01'],
    themeColors['dsfr-chart-colors-02'],
    themeColors['dsfr-chart-colors-03'],
    themeColors['dsfr-chart-colors-04'],
    themeColors['dsfr-chart-colors-05'],
    themeColors['dsfr-chart-colors-06'],
    themeColors['dsfr-chart-colors-07'],
    themeColors['dsfr-chart-colors-08']
  ];
}

// Log de vérification final
console.log("Palette catégorique après chargement :", getCategoricalPalette());

// Palettes séquentielles
export function getSequentialAscending() {
  const themeColors = getThemeColors();
  return chroma.scale([
    themeColors['dsfr-chart-colors-09'],
    themeColors['dsfr-chart-colors-10']
  ]).colors(10);
}

export function getSequentialDescending() {
  const themeColors = getThemeColors();
  return chroma.scale([
    themeColors['dsfr-chart-colors-10'],
    themeColors['dsfr-chart-colors-09']
  ]).colors(10);
}

// Palettes divergentes
export function getDivergentAscending() {
  const themeColors = getThemeColors();
  return chroma.scale([
    themeColors['dsfr-chart-colors-11'],
    themeColors['dsfr-chart-colors-13'],
    themeColors['dsfr-chart-colors-15']
  ]).colors(4);
}

export function getDivergentDescending() {
  const themeColors = getThemeColors();
  return chroma.scale([
    themeColors['dsfr-chart-colors-15'],
    themeColors['dsfr-chart-colors-13'],
    themeColors['dsfr-chart-colors-11']
  ]).colors(4);
}

// Fonction pour limiter les catégories (si plus de 8 catégories)
export function limitCategories(labels, data, maxCategories = 8) {
  if (labels.length > maxCategories) {
    const limitedLabels = labels.slice(0, maxCategories - 1);
    const otherLabel = 'Autres'; // Catégorie "Autres" pour les labels restants
    const limitedData = data.slice(0, maxCategories - 1);
    const otherData = data.slice(maxCategories - 1).reduce((a, b) => a + b, 0); // Somme des données restantes
    limitedLabels.push(otherLabel);
    limitedData.push(otherData);
    return { labels: limitedLabels, data: limitedData };
  }
  return { labels, data };
}

// Fonction pour obtenir des couleurs dynamiques selon un index et une palette
export function getColorsByIndex(index, palette = getCategoricalPalette()) {
  return palette[index % palette.length];
}

// Fonction pour obtenir la couleur par défaut pour un graphique unicolore
export function getDefaultColor() {
  const themeColors = getThemeColors();
  return themeColors['dsfr-chart-colors-default'];
}

// Fonction pour obtenir la couleur neutre (pour les données "minimales")
export function getNeutralColor() {
  const themeColors = getThemeColors();
  return themeColors['dsfr-chart-colors-neutral'];
}

// Exemple d'export de toutes les fonctions et palettes pour les utiliser dans vos composants
export const colorUtils = {
  getCategoricalPalette,
  getDefaultColor,
  getNeutralColor,
  getSequentialAscending,
  getSequentialDescending,
  getDivergentAscending,
  getDivergentDescending,
  limitCategories,
  getColorsByIndex,
};

// Fonction principale `choosePalette`
export function choosePalette(selectedPalette) {
  switch (selectedPalette) {
    case 'categorical':
      return getCategoricalPalette();
    case 'sequentialAscending':
      return getSequentialAscending();
    case 'sequentialDescending':
      return getSequentialDescending();
    case 'divergentAscending':
      return getDivergentAscending();
    case 'divergentDescending':
      return getDivergentDescending();
    case 'neutral':
      return [getNeutralColor()];
    case 'defaultColor':
      return [getDefaultColor()];
    default:
      return getCategoricalPalette(); // Fallback
  }
}

// Core `loadColors` function
export function loadColors({
  yparse,
  selectedPalette = '',
  tmpColorParse = [],
  highlightIndex = [],
  reverseOrder = false
}) {
  const colorParse = [];
  const colorHover = [];
  const palette = choosePalette(selectedPalette);

  // If we need to reverse the order for divergentDescending
  const adjustedYparse = reverseOrder ? [...yparse].reverse() : yparse;

  for (let i = 0; i < adjustedYparse.length; i++) {
    const dataSet = adjustedYparse[i];
    let colors = [];
    let hoverColors = [];

    if (tmpColorParse[i] !== undefined) {
      const color = tmpColorParse[i];
      colors = Array(dataSet.length).fill(color);
      hoverColors = colors.map(c => chroma(c).darken(0.8).hex());
    } else if (selectedPalette === 'neutral' && highlightIndex.length > 0 && Array.isArray(dataSet)) {
      for (let j = 0; j < dataSet.length; j++) {
        const color = highlightIndex.includes(j) ? defaultColor : neutralColor;
        colors.push(color);
        hoverColors.push(chroma(color).darken(0.8).hex());
      }
    } else {
      if (selectedPalette.startsWith('divergent')) {
        colors = Array(dataSet.length).fill(palette[i % palette.length]);
        hoverColors = colors.map(c => chroma(c).darken(0.8).hex());
      } else {
        const color = getColorsByIndex(i, palette);
        colors = Array(dataSet.length).fill(color);
        hoverColors = colors.map(c => chroma(c).darken(0.8).hex());
      }
    }
    colorParse.push(colors);
    colorHover.push(hoverColors);
  }

  return { colorParse, colorHover, legendColors: reverseOrder ? colorParse.map(c => c[0]).reverse() : colorParse.map(c => c[0]) };
}

const colorsDSFR = [
  'green-bourgeon',
  'blue-ecume',
  'purple-glycine',
  'pink-macaron',
  'yellow-tournesol',
  'orange-terre-battue',
  'brown-cafe-creme',
  'beige-gris-galet',
  'green-emeraude',
  'blue-cumulus',
  'pink-tuile',
  'yellow-moutarde',
  'brown-caramel',
  'green-menthe',
  'brown-opera',
  'green-archipel',
  'green-tilleul-verveine'
]

const dep = [
  {
    value: '01',
    label: 'Ain',
    region: 'Auvergne-Rhône-Alpes',
    region_value: '84',
    classMap: 'FR-dep-01'
  },
  {
    value: '02',
    label: 'Aisne',
    region: 'Hauts-de-France',
    region_value: '32',
    classMap: 'FR-dep-02'
  },
  {
    value: '03',
    label: 'Allier',
    region: 'Auvergne-Rhône-Alpes',
    region_value: '84',
    classMap: 'FR-dep-03'
  },
  {
    value: '04',
    label: 'Alpes de Haute-Provence',
    region: "Provence-Alpes-Côte d'Azur",
    region_value: '93',
    classMap: 'FR-dep-04'
  },
  {
    value: '05',
    label: 'Hautes-Alpes',
    region: "Provence-Alpes-Côte d'Azur",
    region_value: '93',
    classMap: 'FR-dep-05'
  },
  {
    value: '06',
    label: 'Alpes-Maritimes',
    region: "Provence-Alpes-Côte d'Azur",
    region_value: '93',
    classMap: 'FR-dep-06'
  },
  {
    value: '07',
    label: 'Ardèche',
    region: 'Auvergne-Rhône-Alpes',
    region_value: '84',
    classMap: 'FR-dep-07'
  },
  {
    value: '08',
    label: 'Ardennes',
    region: 'Grand Est',
    region_value: '44',
    classMap: 'FR-dep-08'
  },
  {
    value: '09',
    label: 'Ariège',
    region: 'Occitanie',
    region_value: '76',
    classMap: 'FR-dep-09'
  },
  {
    value: '10',
    label: 'Aube',
    region: 'Grand Est',
    region_value: '44',
    classMap: 'FR-dep-10'
  },
  {
    value: '11',
    label: 'Aude',
    region: 'Occitanie',
    region_value: '76',
    classMap: 'FR-dep-11'
  },
  {
    value: '12',
    label: 'Aveyron',
    region: 'Occitanie',
    region_value: '76',
    classMap: 'FR-dep-12'
  },
  {
    value: '13',
    label: 'Bouches-du-Rhône',
    region: "Provence-Alpes-Côte d'Azur",
    region_value: '93',
    classMap: 'FR-dep-13'
  },
  {
    value: '14',
    label: 'Calvados',
    region: 'Normandie',
    region_value: '28',
    classMap: 'FR-dep-14'
  },
  {
    value: '15',
    label: 'Cantal',
    region: 'Auvergne-Rhône-Alpes',
    region_value: '84',
    classMap: 'FR-dep-15'
  },
  {
    value: '16',
    label: 'Charente',
    region: 'Nouvelle-Aquitaine',
    region_value: '75',
    classMap: 'FR-dep-16'
  },
  {
    value: '17',
    label: 'Charente-Maritime',
    region: 'Nouvelle-Aquitaine',
    region_value: '75',
    classMap: 'FR-dep-17'
  },
  {
    value: '18',
    label: 'Cher',
    region: 'Centre-Val de Loire',
    region_value: '24',
    classMap: 'FR-dep-18'
  },
  {
    value: '19',
    label: 'Corrèze',
    region: 'Nouvelle-Aquitaine',
    region_value: '75',
    classMap: 'FR-dep-19'
  },
  {
    value: '2A',
    label: 'Corse-du-Sud',
    region: 'Corse',
    region_value: '94',
    classMap: 'FR-dep-2A'
  },
  {
    value: '2B',
    label: 'Haute-Corse',
    region: 'Corse',
    region_value: '94',
    classMap: 'FR-dep-2B'
  },
  {
    value: '21',
    label: "Côte-d'Or",
    region: 'Bourgogne-Franche-Comté',
    region_value: '27',
    classMap: 'FR-dep-21'
  },
  {
    value: '22',
    label: "Côtes d'Armor",
    region: 'Bretagne',
    region_value: '53',
    classMap: 'FR-dep-22'
  },
  {
    value: '23',
    label: 'Creuse',
    region: 'Nouvelle-Aquitaine',
    region_value: '75',
    classMap: 'FR-dep-23'
  },
  {
    value: '24',
    label: 'Dordogne',
    region: 'Nouvelle-Aquitaine',
    region_value: '75',
    classMap: 'FR-dep-24'
  },
  {
    value: '25',
    label: 'Doubs',
    region: 'Bourgogne-Franche-Comté',
    region_value: '27',
    classMap: 'FR-dep-25'
  },
  {
    value: '26',
    label: 'Drôme',
    region: 'Auvergne-Rhône-Alpes',
    region_value: '84',
    classMap: 'FR-dep-26'
  },
  {
    value: '27',
    label: 'Eure',
    region: 'Normandie',
    region_value: '28',
    classMap: 'FR-dep-27'
  },
  {
    value: '28',
    label: 'Eure-et-Loir',
    region: 'Centre-Val de Loire',
    region_value: '24',
    classMap: 'FR-dep-28'
  },
  {
    value: '29',
    label: 'Finistère',
    region: 'Bretagne',
    region_value: '53',
    classMap: 'FR-dep-29'
  },
  {
    value: '30',
    label: 'Gard',
    region: 'Occitanie',
    region_value: '76',
    classMap: 'FR-dep-30'
  },
  {
    value: '31',
    label: 'Haute-Garonne',
    region: 'Occitanie',
    region_value: '76',
    classMap: 'FR-dep-31'
  },
  {
    value: '32',
    label: 'Gers',
    region: 'Occitanie',
    region_value: '76',
    classMap: 'FR-dep-32'
  },
  {
    value: '33',
    label: 'Gironde',
    region: 'Nouvelle-Aquitaine',
    region_value: '75',
    classMap: 'FR-dep-33'
  },
  {
    value: '34',
    label: 'Hérault',
    region: 'Occitanie',
    region_value: '76',
    classMap: 'FR-dep-34'
  },
  {
    value: '35',
    label: 'Ille-et-Vilaine',
    region: 'Bretagne',
    region_value: '53',
    classMap: 'FR-dep-35'
  },
  {
    value: '36',
    label: 'Indre',
    region: 'Centre-Val de Loire',
    region_value: '24',
    classMap: 'FR-dep-36'
  },
  {
    value: '37',
    label: 'Indre-et-Loire',
    region: 'Centre-Val de Loire',
    region_value: '24',
    classMap: 'FR-dep-37'
  },
  {
    value: '38',
    label: 'Isère',
    region: 'Auvergne-Rhône-Alpes',
    region_value: '84',
    classMap: 'FR-dep-38'
  },
  {
    value: '39',
    label: 'Jura',
    region: 'Bourgogne-Franche-Comté',
    region_value: '27',
    classMap: 'FR-dep-39'
  },
  {
    value: '40',
    label: 'Landes',
    region: 'Nouvelle-Aquitaine',
    region_value: '75',
    classMap: 'FR-dep-40'
  },
  {
    value: '41',
    label: 'Loir-et-Cher',
    region: 'Centre-Val de Loire',
    region_value: '24',
    classMap: 'FR-dep-41'
  },
  {
    value: '42',
    label: 'Loire',
    region: 'Auvergne-Rhône-Alpes',
    region_value: '84',
    classMap: 'FR-dep-42'
  },
  {
    value: '43',
    label: 'Haute-Loire',
    region: 'Auvergne-Rhône-Alpes',
    region_value: '84',
    classMap: 'FR-dep-43'
  },
  {
    value: '44',
    label: 'Loire-Atlantique',
    region: 'Pays de la Loire',
    region_value: '52',
    classMap: 'FR-dep-44'
  },
  {
    value: '45',
    label: 'Loiret',
    region: 'Centre-Val de Loire',
    region_value: '24',
    classMap: 'FR-dep-45'
  },
  {
    value: '46',
    label: 'Lot',
    region: 'Occitanie',
    region_value: '76',
    classMap: 'FR-dep-46'
  },
  {
    value: '47',
    label: 'Lot-et-Garonne',
    region: 'Nouvelle-Aquitaine',
    region_value: '75',
    classMap: 'FR-dep-47'
  },
  {
    value: '48',
    label: 'Lozère',
    region: 'Occitanie',
    region_value: '76',
    classMap: 'FR-dep-48'
  },
  {
    value: '49',
    label: 'Maine-et-Loire',
    region: 'Pays de la Loire',
    region_value: '52',
    classMap: 'FR-dep-49'
  },
  {
    value: '50',
    label: 'Manche',
    region: 'Normandie',
    region_value: '28',
    classMap: 'FR-dep-50'
  },
  {
    value: '51',
    label: 'Marne',
    region: 'Grand Est',
    region_value: '44',
    classMap: 'FR-dep-51'
  },
  {
    value: '52',
    label: 'Haute-Marne',
    region: 'Grand Est',
    region_value: '44',
    classMap: 'FR-dep-52'
  },
  {
    value: '53',
    label: 'Mayenne',
    region: 'Pays de la Loire',
    region_value: '52',
    classMap: 'FR-dep-53'
  },
  {
    value: '54',
    label: 'Meurthe-et-Moselle',
    region: 'Grand Est',
    region_value: '44',
    classMap: 'FR-dep-54'
  },
  {
    value: '55',
    label: 'Meuse',
    region: 'Grand Est',
    region_value: '44',
    classMap: 'FR-dep-55'
  },
  {
    value: '56',
    label: 'Morbihan',
    region: 'Bretagne',
    region_value: '53',
    classMap: 'FR-dep-56'
  },
  {
    value: '57',
    label: 'Moselle',
    region: 'Grand Est',
    region_value: '44',
    classMap: 'FR-dep-57'
  },
  {
    value: '58',
    label: 'Nièvre',
    region: 'Bourgogne-Franche-Comté',
    region_value: '27',
    classMap: 'FR-dep-58'
  },
  {
    value: '59',
    label: 'Nord',
    region: 'Hauts-de-France',
    region_value: '32',
    classMap: 'FR-dep-59'
  },
  {
    value: '60',
    label: 'Oise',
    region: 'Hauts-de-France',
    region_value: '32',
    classMap: 'FR-dep-60'
  },
  {
    value: '61',
    label: 'Orne',
    region: 'Normandie',
    region_value: '28',
    classMap: 'FR-dep-61'
  },
  {
    value: '62',
    label: 'Pas-de-Calais',
    region: 'Hauts-de-France',
    region_value: '32',
    classMap: 'FR-dep-62'
  },
  {
    value: '63',
    label: 'Puy-de-Dôme',
    region: 'Auvergne-Rhône-Alpes',
    region_value: '84',
    classMap: 'FR-dep-63'
  },
  {
    value: '64',
    label: 'Pyrénées-Atlantiques',
    region: 'Nouvelle-Aquitaine',
    region_value: '75',
    classMap: 'FR-dep-64'
  },
  {
    value: '65',
    label: 'Hautes-Pyrénées',
    region: 'Occitanie',
    region_value: '76',
    classMap: 'FR-dep-65'
  },
  {
    value: '66',
    label: 'Pyrénées-Orientales',
    region: 'Occitanie',
    region_value: '76',
    classMap: 'FR-dep-66'
  },
  {
    value: '67',
    label: 'Bas-Rhin',
    region: 'Grand Est',
    region_value: '44',
    classMap: 'FR-dep-67'
  },
  {
    value: '68',
    label: 'Haut-Rhin',
    region: 'Grand Est',
    region_value: '44',
    classMap: 'FR-dep-68'
  },
  {
    value: '69',
    label: 'Rhône',
    region: 'Auvergne-Rhône-Alpes',
    region_value: '84',
    classMap: 'FR-dep-69'
  },
  {
    value: '70',
    label: 'Haute-Saône',
    region: 'Bourgogne-Franche-Comté',
    region_value: '27',
    classMap: 'FR-dep-70'
  },
  {
    value: '71',
    label: 'Saône-et-Loire',
    region: 'Bourgogne-Franche-Comté',
    region_value: '27',
    classMap: 'FR-dep-71'
  },
  {
    value: '72',
    label: 'Sarthe',
    region: 'Pays de la Loire',
    region_value: '52',
    classMap: 'FR-dep-72'
  },
  {
    value: '73',
    label: 'Savoie',
    region: 'Auvergne-Rhône-Alpes',
    region_value: '84',
    classMap: 'FR-dep-73'
  },
  {
    value: '74',
    label: 'Haute-Savoie',
    region: 'Auvergne-Rhône-Alpes',
    region_value: '84',
    classMap: 'FR-dep-74'
  },
  {
    value: '75',
    label: 'Paris',
    region: 'Île-de-France',
    region_value: '11',
    classMap: 'FR-dep-75'
  },
  {
    value: '76',
    label: 'Seine-Maritime',
    region: 'Normandie',
    region_value: '28',
    classMap: 'FR-dep-76'
  },
  {
    value: '77',
    label: 'Seine-et-Marne',
    region: 'Île-de-France',
    region_value: '11',
    classMap: 'FR-dep-77'
  },
  {
    value: '78',
    label: 'Yvelines',
    region: 'Île-de-France',
    region_value: '11',
    classMap: 'FR-dep-78'
  },
  {
    value: '79',
    label: 'Deux-Sèvres',
    region: 'Nouvelle-Aquitaine',
    region_value: '75',
    classMap: 'FR-dep-79'
  },
  {
    value: '80',
    label: 'Somme',
    region: 'Hauts-de-France',
    region_value: '32',
    classMap: 'FR-dep-80'
  },
  {
    value: '81',
    label: 'Tarn',
    region: 'Occitanie',
    region_value: '76',
    classMap: 'FR-dep-81'
  },
  {
    value: '82',
    label: 'Tarn-et-Garonne',
    region: 'Occitanie',
    region_value: '76',
    classMap: 'FR-dep-82'
  },
  {
    value: '83',
    label: 'Var',
    region: "Provence-Alpes-Côte d'Azur",
    region_value: '93',
    classMap: 'FR-dep-83'
  },
  {
    value: '84',
    label: 'Vaucluse',
    region: "Provence-Alpes-Côte d'Azur",
    region_value: '93',
    classMap: 'FR-dep-84'
  },
  {
    value: '85',
    label: 'Vendée',
    region: 'Pays de la Loire',
    region_value: '52',
    classMap: 'FR-dep-85'
  },
  {
    value: '86',
    label: 'Vienne',
    region: 'Nouvelle-Aquitaine',
    region_value: '75',
    classMap: 'FR-dep-86'
  },
  {
    value: '87',
    label: 'Haute-Vienne',
    region: 'Nouvelle-Aquitaine',
    region_value: '75',
    classMap: 'FR-dep-87'
  },
  {
    value: '88',
    label: 'Vosges',
    region: 'Grand Est',
    region_value: '44',
    classMap: 'FR-dep-88'
  },
  {
    value: '89',
    label: 'Yonne',
    region: 'Bourgogne-Franche-Comté',
    region_value: '27',
    classMap: 'FR-dep-89'
  },
  {
    value: '90',
    label: 'Territoire-de-Belfort',
    region: 'Bourgogne-Franche-Comté',
    region_value: '27',
    classMap: 'FR-dep-90'
  },
  {
    value: '91',
    label: 'Essonne',
    region: 'Île-de-France',
    region_value: '11',
    classMap: 'FR-dep-91'
  },
  {
    value: '92',
    label: 'Hauts-de-Seine',
    region: 'Île-de-France',
    region_value: '11',
    classMap: 'FR-dep-92'
  },
  {
    value: '93',
    label: 'Seine-Saint-Denis',
    region: 'Île-de-France',
    region_value: '11',
    classMap: 'FR-dep-93'
  },
  {
    value: '94',
    label: 'Val-de-Marne',
    region: 'Île-de-France',
    region_value: '11',
    classMap: 'FR-dep-94'
  },
  {
    value: '95',
    label: "Val-d'Oise",
    region: 'Île-de-France',
    region_value: '11',
    classMap: 'FR-dep-95'
  },
  {
    value: '971',
    label: 'Guadeloupe',
    region: 'Guadeloupe',
    region_value: '01',
    classMap: 'FR-DOM-971'
  },
  {
    value: '972',
    label: 'Martinique',
    region: 'Martinique',
    region_value: '02',
    classMap: 'FR-DOM-972'
  },
  {
    value: '973',
    label: 'Guyane française',
    region: 'Guyane',
    region_value: '03',
    classMap: 'FR-DOM-973'
  },
  {
    value: '974',
    label: 'Réunion',
    region: 'La Réunion',
    region_value: '04',
    classMap: 'FR-DOM-974'
  },
  {
    value: '976',
    label: 'Mayotte',
    region: 'Mayotte',
    region_value: '06',
    classMap: 'FR-DOM-976'
  }
]

const reg = [
  {
    value: '84',
    label: 'Auvergne-Rhône-Alpes',
    classMap: 'FR-reg-84'
  },
  {
    value: '32',
    label: 'Hauts-de-France',
    classMap: 'FR-reg-32'
  },
  {
    value: '93',
    label: "Provence-Alpes-Côte d'Azur",
    classMap: 'FR-reg-93'
  },
  {
    value: '44',
    label: 'Grand Est',
    classMap: 'FR-reg-44'
  },
  {
    value: '76',
    label: 'Occitanie',
    classMap: 'FR-reg-76'
  },
  {
    value: '28',
    label: 'Normandie',
    classMap: 'FR-reg-28'
  },
  {
    value: '75',
    label: 'Nouvelle-Aquitaine',
    classMap: 'FR-reg-75'
  },
  {
    value: '24',
    label: 'Centre-Val de Loire',
    classMap: 'FR-reg-24'
  },
  {
    value: '27',
    label: 'Bourgogne-Franche-Comté',
    classMap: 'FR-reg-27'
  },
  {
    value: '53',
    label: 'Bretagne',
    classMap: 'FR-reg-53'
  },
  {
    value: '94',
    label: 'Corse',
    classMap: 'FR-reg-94'
  },
  {
    value: '52',
    label: 'Pays de la Loire',
    classMap: 'FR-reg-52'
  },
  {
    value: '11',
    label: 'Île-de-France',
    classMap: 'FR-reg-11'
  },
  {
    value: '01',
    label: 'Guadeloupe',
    classMap: 'FR-DOM-971'
  },
  {
    value: '02',
    label: 'Martinique',
    classMap: 'FR-DOM-972'
  },
  {
    value: '03',
    label: 'Guyane',
    classMap: 'FR-DOM-973'
  },
  {
    value: '04',
    label: 'La Réunion',
    classMap: 'FR-DOM-974'
  },
  {
    value: '06',
    label: 'Mayotte',
    classMap: 'FR-DOM-976'
  }
]

export const getHexaFromName = function (colorName, options = undefined) {
  return window.dsfr.colors.getColor('artwork', 'major', colorName, options)
}

const patternDraw = [
  'plus',
  'cross',
  'dash',
  'cross-dash',
  'dot',
  'dot-dash',
  'disc',
  'ring',
  'line',
  'line-vertical',
  'weave',
  'zigzag',
  'zigzag-vertical',
  'diagonal',
  'diagonal-right-left',
  'square',
  'box',
  'triangle',
  'triangle-inverted',
  'diamond',
  'diamond-box'
]

export const getAllColors = function () {
  return colorsDSFR
}

export const getAllPattern = function () {
  return patternDraw
}

const acad = [
  {
    value: '01',
    label: 'Académie de Clermont-Ferrand'
  },
  {
    value: '02',
    label: 'Académie de Grenoble'
  },
  {
    value: '03',
    label: 'Académie de Lyon'
  },
  {
    value: '04',
    label: 'Académie de Besançon'
  },
  {
    value: '05',
    label: 'Académie de Dijon'
  },
  {
    value: '06',
    label: 'Académie de Rennes'
  },
  {
    value: '07',
    label: "Académie d'Orléans-Tours"
  },
  {
    value: '08',
    label: 'Académie de Corse'
  },
  {
    value: '09',
    label: 'Académie de Nancy-Metz'
  },
  {
    value: '10',
    label: 'Académie de Reims'
  },
  {
    value: '11',
    label: 'Académie de Strasbourg'
  },
  {
    value: '14',
    label: "Académie d'Amiens"
  },
  {
    value: '15',
    label: 'Académie de Lille'
  },
  {
    value: '16',
    label: 'Académie de Créteil'
  },
  {
    value: '17',
    label: 'Académie de Paris'
  },
  {
    value: '18',
    label: 'Académie de Versailles'
  },
  {
    value: '20',
    label: 'Académie de Normandie'
  },
  {
    value: '21',
    label: 'Académie de Bordeaux'
  },
  {
    value: '22',
    label: 'Académie de Limoges'
  },
  {
    value: '23',
    label: 'Académie de Poitiers'
  },
  {
    value: '24',
    label: 'Académie de Montpellier'
  },
  {
    value: '25',
    label: 'Académie de Toulouse'
  },
  {
    value: '26',
    label: 'Académie de Nantes'
  },
  {
    value: '27',
    label: "Académie d'Aix-Marseille"
  },
  {
    value: '28',
    label: 'Académie de Nice'
  },
  {
    value: '971',
    label: 'Académie de Guadeloupe'
  },
  {
    value: '972',
    label: 'Académie de Martinique'
  },
  {
    value: '973',
    label: 'Académie de Guyane'
  },
  {
    value: '974',
    label: 'Académie de La Réunion'
  },
  {
    value: '976',
    label: 'Académie de Mayotte'
  }
]

export const getDep = function (code) {
  const depObj = dep.find(obj => {
    return obj.value === code
  })

  return depObj
}

export const getReg = function (code) {
  const regObj = reg.find(obj => {
    return obj.value === code
  })

  return regObj
}

export const getAllReg = function (code) {
  const allReg = []
  reg.forEach(element => allReg.push(element.value))
  return allReg
}

export const getAcad = function (code) {
  const acadObj = acad.find(obj => {
    return obj.value === code
  })

  return acadObj
}

export const getClassMap = function (code, level) {
  if (!level) {
    console.warn(`Level is undefined for code: ${code}`);
    return null; // Ou vous pouvez définir un niveau par défaut ici si nécessaire
  }

  let obj;
  if (level === 'reg') {
    obj = getReg(code);
  } else if (level === 'dep') {
    obj = getDep(code);
  }

  if (obj && obj.classMap) {
    return obj.classMap;
  } else {
    console.warn(`No classMap found for code: ${code}, level: ${level}`);
    return null;
  }
};


export const getDepsFromReg = function (code) {
  const depObj = dep.filter(obj => {
    return obj.region_value === code
  })

  const res = []
  depObj.forEach(function (dep, j) {
    res.push(dep.value)
  })
  return res
}

const allToken = {
  'background-contrats-grey': {
    light: '#EEEEEE',
    dark: '#242424'
  },
  'text-mention-grey': {
    light: '#666666',
    dark: '#929292'
  },
  'border-default-grey': {
    light: '#DDDDDD',
    dark: '#353535'
  }
}

export const getHexaFromToken = function (token, theme) {
  return allToken[token][theme]
}

export const mixin = {
  methods: {
    capitalize,
    convertStringToLocaleNumber,
    convertFloatToHuman,
    convertIntToHuman,
    convertIntToHumanTable,
    convertDateToHuman,
    testIfNaN,
    getDep,
    getReg,
    getAcad,
    getDepsFromReg,
    getAllColors,
    getHexaFromName,
    getAllPattern,
    getClassMap,
    getAllReg,
    getHexaFromToken
  }
}
