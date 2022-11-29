export const capitalize = function (string) {
  if (string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }
}
export const convertStringToLocaleNumber = function (string) {
  return parseInt(string).toLocaleString()
}

export const convertFloatToHuman = function (float) {
  if (Number.isInteger(parseFloat(float))) {
    return parseInt(float).toLocaleString()
  } else {
    return parseFloat(float).toFixed(2).toLocaleString()
  }
}

export const convertDateToHuman = function (string) {
  const date = new Date(string)
  return date.toLocaleDateString('fr-FR')
}

export const testIfNaN = function (float) {
  return isNaN(parseFloat(float))
}

const colorsDSFR = [
  'blue-france',
  'red-marianne',
  'green-tilleul-verveine',
  'green-bourgeon',
  'green-emeraude',
  'green-menthe',
  'green-archipel',
  'blue-ecume',
  'blue-cumulus',
  'purple-glycine',
  'pink-macaron',
  'pink-tuile',
  'yellow-tournesol',
  'yellow-moutarde',
  'orange-terre-battue',
  'brown-cafe-creme',
  'brown-caramel',
  'brown-opera',
  'beige-gris-galet'
]

const dep = [
  {
    value: '01',
    label: 'Ain',
    region: 'Auvergne-Rhône-Alpes',
    region_value: '84'
  },
  {
    value: '02',
    label: 'Aisne',
    region: 'Hauts-de-France',
    region_value: '32'
  },
  {
    value: '03',
    label: 'Allier',
    region: 'Auvergne-Rhône-Alpes',
    region_value: '84'
  },
  {
    value: '04',
    label: 'Alpes de Haute-Provence',
    region: "Provence-Alpes-Côte d'Azur",
    region_value: '93'
  },
  {
    value: '05',
    label: 'Hautes-Alpes',
    region: "Provence-Alpes-Côte d'Azur",
    region_value: '93'
  },
  {
    value: '06',
    label: 'Alpes-Maritimes',
    region: "Provence-Alpes-Côte d'Azur",
    region_value: '93'
  },
  {
    value: '07',
    label: 'Ardèche',
    region: 'Auvergne-Rhône-Alpes',
    region_value: '84'
  },
  {
    value: '08',
    label: 'Ardennes',
    region: 'Grand Est',
    region_value: '44'
  },
  {
    value: '09',
    label: 'Ariège',
    region: 'Occitanie',
    region_value: '76'
  },
  {
    value: '10',
    label: 'Aube',
    region: 'Grand Est',
    region_value: '44'
  },
  {
    value: '11',
    label: 'Aude',
    region: 'Occitanie',
    region_value: '76'
  },
  {
    value: '12',
    label: 'Aveyron',
    region: 'Occitanie',
    region_value: '76'
  },
  {
    value: '13',
    label: 'Bouches-du-Rhône',
    region: "Provence-Alpes-Côte d'Azur",
    region_value: '93'
  },
  {
    value: '14',
    label: 'Calvados',
    region: 'Normandie',
    region_value: '28'
  },
  {
    value: '15',
    label: 'Cantal',
    region: 'Auvergne-Rhône-Alpes',
    region_value: '84'
  },
  {
    value: '16',
    label: 'Charente',
    region: 'Nouvelle-Aquitaine',
    region_value: '75'
  },
  {
    value: '17',
    label: 'Charente-Maritime',
    region: 'Nouvelle-Aquitaine',
    region_value: '75'
  },
  {
    value: '18',
    label: 'Cher',
    region: 'Centre-Val de Loire',
    region_value: '24'
  },
  {
    value: '19',
    label: 'Corrèze',
    region: 'Nouvelle-Aquitaine',
    region_value: '75'
  },
  {
    value: '2A',
    label: 'Corse-du-Sud',
    region: 'Corse',
    region_value: '94'
  },
  {
    value: '2B',
    label: 'Haute-Corse',
    region: 'Corse',
    region_value: '94'
  },
  {
    value: '21',
    label: "Côte-d'Or",
    region: 'Bourgogne-Franche-Comté',
    region_value: '27'
  },
  {
    value: '22',
    label: "Côtes d'Armor",
    region: 'Bretagne',
    region_value: '53'
  },
  {
    value: '23',
    label: 'Creuse',
    region: 'Nouvelle-Aquitaine',
    region_value: '75'
  },
  {
    value: '24',
    label: 'Dordogne',
    region: 'Nouvelle-Aquitaine',
    region_value: '75'
  },
  {
    value: '25',
    label: 'Doubs',
    region: 'Bourgogne-Franche-Comté',
    region_value: '27'
  },
  {
    value: '26',
    label: 'Drôme',
    region: 'Auvergne-Rhône-Alpes',
    region_value: '84'
  },
  {
    value: '27',
    label: 'Eure',
    region: 'Normandie',
    region_value: '28'
  },
  {
    value: '28',
    label: 'Eure-et-Loir',
    region: 'Centre-Val de Loire',
    region_value: '24'
  },
  {
    value: '29',
    label: 'Finistère',
    region: 'Bretagne',
    region_value: '53'
  },
  {
    value: '30',
    label: 'Gard',
    region: 'Occitanie',
    region_value: '76'
  },
  {
    value: '31',
    label: 'Haute-Garonne',
    region: 'Occitanie',
    region_value: '76'
  },
  {
    value: '32',
    label: 'Gers',
    region: 'Occitanie',
    region_value: '76'
  },
  {
    value: '33',
    label: 'Gironde',
    region: 'Nouvelle-Aquitaine',
    region_value: '75'
  },
  {
    value: '34',
    label: 'Hérault',
    region: 'Occitanie',
    region_value: '76'
  },
  {
    value: '35',
    label: 'Ille-et-Vilaine',
    region: 'Bretagne',
    region_value: '53'
  },
  {
    value: '36',
    label: 'Indre',
    region: 'Centre-Val de Loire',
    region_value: '24'
  },
  {
    value: '37',
    label: 'Indre-et-Loire',
    region: 'Centre-Val de Loire',
    region_value: '24'
  },
  {
    value: '38',
    label: 'Isère',
    region: 'Auvergne-Rhône-Alpes',
    region_value: '84'
  },
  {
    value: '39',
    label: 'Jura',
    region: 'Bourgogne-Franche-Comté',
    region_value: '27'
  },
  {
    value: '40',
    label: 'Landes',
    region: 'Nouvelle-Aquitaine',
    region_value: '75'
  },
  {
    value: '41',
    label: 'Loir-et-Cher',
    region: 'Centre-Val de Loire',
    region_value: '24'
  },
  {
    value: '42',
    label: 'Loire',
    region: 'Auvergne-Rhône-Alpes',
    region_value: '84'
  },
  {
    value: '43',
    label: 'Haute-Loire',
    region: 'Auvergne-Rhône-Alpes',
    region_value: '84'
  },
  {
    value: '44',
    label: 'Loire-Atlantique',
    region: 'Pays de la Loire',
    region_value: '52'
  },
  {
    value: '45',
    label: 'Loiret',
    region: 'Centre-Val de Loire',
    region_value: '24'
  },
  {
    value: '46',
    label: 'Lot',
    region: 'Occitanie',
    region_value: '76'
  },
  {
    value: '47',
    label: 'Lot-et-Garonne',
    region: 'Nouvelle-Aquitaine',
    region_value: '75'
  },
  {
    value: '48',
    label: 'Lozère',
    region: 'Occitanie',
    region_value: '76'
  },
  {
    value: '49',
    label: 'Maine-et-Loire',
    region: 'Pays de la Loire',
    region_value: '52'
  },
  {
    value: '50',
    label: 'Manche',
    region: 'Normandie',
    region_value: '28'
  },
  {
    value: '51',
    label: 'Marne',
    region: 'Grand Est',
    region_value: '44'
  },
  {
    value: '52',
    label: 'Haute-Marne',
    region: 'Grand Est',
    region_value: '44'
  },
  {
    value: '53',
    label: 'Mayenne',
    region: 'Pays de la Loire',
    region_value: '52'
  },
  {
    value: '54',
    label: 'Meurthe-et-Moselle',
    region: 'Grand Est',
    region_value: '44'
  },
  {
    value: '55',
    label: 'Meuse',
    region: 'Grand Est',
    region_value: '44'
  },
  {
    value: '56',
    label: 'Morbihan',
    region: 'Bretagne',
    region_value: '53'
  },
  {
    value: '57',
    label: 'Moselle',
    region: 'Grand Est',
    region_value: '44'
  },
  {
    value: '58',
    label: 'Nièvre',
    region: 'Bourgogne-Franche-Comté',
    region_value: '27'
  },
  {
    value: '59',
    label: 'Nord',
    region: 'Hauts-de-France',
    region_value: '32'
  },
  {
    value: '60',
    label: 'Oise',
    region: 'Hauts-de-France',
    region_value: '32'
  },
  {
    value: '61',
    label: 'Orne',
    region: 'Normandie',
    region_value: '28'
  },
  {
    value: '62',
    label: 'Pas-de-Calais',
    region: 'Hauts-de-France',
    region_value: '32'
  },
  {
    value: '63',
    label: 'Puy-de-Dôme',
    region: 'Auvergne-Rhône-Alpes',
    region_value: '84'
  },
  {
    value: '64',
    label: 'Pyrénées-Atlantiques',
    region: 'Nouvelle-Aquitaine',
    region_value: '75'
  },
  {
    value: '65',
    label: 'Hautes-Pyrénées',
    region: 'Occitanie',
    region_value: '76'
  },
  {
    value: '66',
    label: 'Pyrénées-Orientales',
    region: 'Occitanie',
    region_value: '76'
  },
  {
    value: '67',
    label: 'Bas-Rhin',
    region: 'Grand Est',
    region_value: '44'
  },
  {
    value: '68',
    label: 'Haut-Rhin',
    region: 'Grand Est',
    region_value: '44'
  },
  {
    value: '69',
    label: 'Rhône',
    region: 'Auvergne-Rhône-Alpes',
    region_value: '84'
  },
  {
    value: '70',
    label: 'Haute-Saône',
    region: 'Bourgogne-Franche-Comté',
    region_value: '27'
  },
  {
    value: '71',
    label: 'Saône-et-Loire',
    region: 'Bourgogne-Franche-Comté',
    region_value: '27'
  },
  {
    value: '72',
    label: 'Sarthe',
    region: 'Pays de la Loire',
    region_value: '52'
  },
  {
    value: '73',
    label: 'Savoie',
    region: 'Auvergne-Rhône-Alpes',
    region_value: '84'
  },
  {
    value: '74',
    label: 'Haute-Savoie',
    region: 'Auvergne-Rhône-Alpes',
    region_value: '84'
  },
  {
    value: '75',
    label: 'Paris',
    region: 'Île-de-France',
    region_value: '11'
  },
  {
    value: '76',
    label: 'Seine-Maritime',
    region: 'Normandie',
    region_value: '28'
  },
  {
    value: '77',
    label: 'Seine-et-Marne',
    region: 'Île-de-France',
    region_value: '11'
  },
  {
    value: '78',
    label: 'Yvelines',
    region: 'Île-de-France',
    region_value: '11'
  },
  {
    value: '79',
    label: 'Deux-Sèvres',
    region: 'Nouvelle-Aquitaine',
    region_value: '75'
  },
  {
    value: '80',
    label: 'Somme',
    region: 'Hauts-de-France',
    region_value: '32'
  },
  {
    value: '81',
    label: 'Tarn',
    region: 'Occitanie',
    region_value: '76'
  },
  {
    value: '82',
    label: 'Tarn-et-Garonne',
    region: 'Occitanie',
    region_value: '76'
  },
  {
    value: '83',
    label: 'Var',
    region: "Provence-Alpes-Côte d'Azur",
    region_value: '93'
  },
  {
    value: '84',
    label: 'Vaucluse',
    region: "Provence-Alpes-Côte d'Azur",
    region_value: '93'
  },
  {
    value: '85',
    label: 'Vendée',
    region: 'Pays de la Loire',
    region_value: '52'
  },
  {
    value: '86',
    label: 'Vienne',
    region: 'Nouvelle-Aquitaine',
    region_value: '75'
  },
  {
    value: '87',
    label: 'Haute-Vienne',
    region: 'Nouvelle-Aquitaine',
    region_value: '75'
  },
  {
    value: '88',
    label: 'Vosges',
    region: 'Grand Est',
    region_value: '44'
  },
  {
    value: '89',
    label: 'Yonne',
    region: 'Bourgogne-Franche-Comté',
    region_value: '27'
  },
  {
    value: '90',
    label: 'Territoire-de-Belfort',
    region: 'Bourgogne-Franche-Comté',
    region_value: '27'
  },
  {
    value: '91',
    label: 'Essonne',
    region: 'Île-de-France',
    region_value: '11'
  },
  {
    value: '92',
    label: 'Hauts-de-Seine',
    region: 'Île-de-France',
    region_value: '11'
  },
  {
    value: '93',
    label: 'Seine-Saint-Denis',
    region: 'Île-de-France',
    region_value: '11'
  },
  {
    value: '94',
    label: 'Val-de-Marne',
    region: 'Île-de-France',
    region_value: '11'
  },
  {
    value: '95',
    label: "Val-d'Oise",
    region: 'Île-de-France',
    region_value: '11'
  },
  {
    value: '971',
    label: 'Guadeloupe',
    region: 'Guadeloupe',
    region_value: '01'
  },
  {
    value: '972',
    label: 'Martinique',
    region: 'Martinique',
    region_value: '02'
  },
  {
    value: '973',
    label: 'Guyane française',
    region: 'Guyane',
    region_value: '03'
  },
  {
    value: '974',
    label: 'Réunion',
    region: 'La Réunion',
    region_value: '04'
  },
  {
    value: '976',
    label: 'Mayotte',
    region: 'Mayotte',
    region_value: '06'
  }
]

// const reg = [
//   {
//     value: '84',
//     label: 'Auvergne-Rhône-Alpes',
//     viewBox: '120 100 100 80'
//   },
//   {
//     value: '32',
//     label: 'Hauts-de-France'
//   },
//   {
//     value: '93',
//     label: "Provence-Alpes-Côte d'Azur"
//   },
//   {
//     value: '44',
//     label: 'Grand Est'
//   },
//   {
//     value: '76',
//     label: 'Occitanie'
//   },
//   {
//     value: '28',
//     label: 'Normandie'
//   },
//   {
//     value: '75',
//     label: 'Nouvelle-Aquitaine'
//   },
//   {
//     value: '24',
//     label: 'Centre-Val de Loire'
//   },
//   {
//     value: '27',
//     label: 'Bourgogne-Franche-Comté'
//   },
//   {
//     value: '53',
//     label: 'Bretagne'
//   },
//   {
//     value: '94',
//     label: 'Corse'
//   },
//   {
//     value: '52',
//     label: 'Pays de la Loire'
//   },
//   {
//     value: '11',
//     label: 'Île-de-France'
//   },
//   {
//     value: '01',
//     label: 'Guadeloupe'
//   },
//   {
//     value: '02',
//     label: 'Martinique'
//   },
//   {
//     value: '03',
//     label: 'Guyane'
//   },
//   {
//     value: '04',
//     label: 'La Réunion'
//   },
//   {
//     value: '06',
//     label: 'Mayotte'
//   }
// ]

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

export const getDep = function (code) {
  const depObj = dep.find(obj => {
    return obj.value === code
  })

  return depObj
}

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

export const mixin = {
  methods: {
    capitalize,
    convertStringToLocaleNumber,
    convertFloatToHuman,
    convertDateToHuman,
    testIfNaN,
    getDep,
    getDepsFromReg,
    getAllColors,
    getHexaFromName,
    getAllPattern
  }
}
