export const chartData = {
  lineChart: {
    default: {
      x: '[[2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020]]',
      y: '[[51.50, 55.30, 61.50, 70.20, 81.10, 92.60, 100.20, 104.60, 96.90, 98.00, 104.90, 106.80, 104.70, 102.70, 100.20, 100.40, 102.90, 106.00, 109.10, 114.60]]',
      name: '["Indices des prix des logements anciens"]',
      selectedPalette: 'default',
      unitTooltip: 'points d’indice',
    },
    multiple: {
      x: '[[1975, 1980, 1985, 1990, 1995, 2000, 2005, 2010, 2015, 2020], [1975, 1980, 1985, 1990, 1995, 2000, 2005, 2010, 2015, 2020]]',
      y: '[[54.5, 58.2, 58.1, 59.6, 62.1, 64, 65.9, 67.1, 69, 69.2], [83.9, 83.2, 78.4, 75.9, 74.7, 75.3, 75.2, 75, 75.6, 74.8]]',
      name: '["Femmes", "Hommes"]',
      unitTooltip: '%',
    },
  },
  barChart: {
    vertical: {
      x: '[[2025, 2030, 2035, 2040, 2050, 2060, 2070]]',
      y: '[[69.1, 70.3, 71.4, 72.5, 74, 75.2, 76.4]]',
      name: '["Population en millions"]',
      selectedPalette: 'default',
      unitTooltip: 'millions',
    },
    unicolor: {
      x: '[["15 à 29 ans", "30 à 44 ans", "45 à 59 ans", "60 à 74 ans", "75 ans ou plus"]]',
      y: '[[75.4, 80.5, 66.8, 43.4, 12.1]]',
      name: '["Achat sur internet au cours des 12 derniers mois (%)"]',
      selectedPalette: 'neutral',
      unitTooltip: '%',
    },
    sequential: {
      x: '[["Nouvelle-Aquitaine", "Hauts-de-France", "Bourgogne-Franche-Comté", "Auvergne-Rhône-Alpes", "Normandie", "Bretagne", "Pays de la Loire", "Occitanie", "Grand Est", "Centre-Val de Loire", "Île-de-France", "Provence-Alpes-Côte d’Azur", "Corse"]]',
      y: '[[1071, 927, 921, 850, 845, 838, 821, 793, 789, 771, 734, 485, 482]]',
      name: '["Hauteur des précipitations (en mm)"]',
      selectedPalette: 'sequentialDescending',
      unitTooltip: 'mm',
    },
    horizontal: {
      x: '[[2000, 2010, 2020], [2000, 2010, 2020]]',
      y: '[[11.1, 10.5, 8.4], [8.8, 7.5, 5.6]]',
      name: '["Empreinte carbone", "Émission sur le territoire national"]',
      horizontal: true,
      barSize: 20,
      unitTooltip: 'tonnes',
    },
    stacked: {
      x: '[["Ensemble des Français", "Agglomération parisienne", "Communauté urbaine de province", "Commune rurale"]]',
      y: '[[15, 19, 15, 13], [45, 40, 47, 41], [36, 32, 34, 44], [4, 9, 4, 2]]',
      name: '["Tout à fait satisfait", "Plutôt satisfait", "Plutôt pas satisfait", "Pas du tout satisfait"]',
      stacked: true,
      selectedPalette: 'divergentDescending',
      unitTooltip: '%',
    },
  },
  barLineChart: {
    default: {
      x: '[1980, 1990, 2000, 2010]',
      yBar: '[826, 793, 807, 832]',
      yLine: '[14.9, 13.4, 13.1, 12.9]',
      nameBar: 'Taux de natalité',
      nameLine: 'Naissances',
      unitTooltipBar: 'milliers',
      unitTooltipLine: '%',
    },
  },
  scatterChart: {
    default: {
      x: '[[1995, 2000, 2005, 2010, 2015, 2020, 2022], [1995, 2000, 2005, 2010, 2015, 2020, 2022], [1995, 2000, 2005, 2010, 2015, 2020, 2022]]',
      y: '[[175, 155, 149, 130, 111, 107, 130], [177, 168, 159, 130, 116, 109, 131], [176, 162, 152, 130, 111, 97, 103]]',
      name: '["Diesel", "Essence", "Total"]',
      unitTooltip: 'g de CO₂ / km',
    },
    linked: {
      x: '[[1926, 1928, 1930, 1932, 1934, 1936, 1938, 1940, 1942, 1944, 1946, 1948, 1950], [1926, 1928, 1930, 1932, 1934, 1936, 1938, 1940, 1942, 1944, 1946, 1948, 1950], [1926, 1928, 1930, 1932, 1934, 1936, 1938, 1940, 1942, 1944, 1946, 1948, 1950]]',
      y: '[[35, 35, 37, 37, 39, 41, 43, 48, 51, 52, 54, 55, 56], [76, 83, 82, 80, 81, 80, 81, 80, 81, 80, 79, 75, 72], [54, 56, 58, 57, 59, 60, 62, 64, 66, 66, 66, 65, 64]]',
      name: '["Femmes", "Hommes", "Ensemble"]',
      showLine: true,
      unitTooltip: '%',
    },
  },
  pieChart: {
    doughnut: {
      x: '[["Emplois à durée indéterminée", "Non-salariés", "Contrats à durée déterminée", "Apprentis", "Intérimaires"]]',
      y: '[[74.8, 11.7, 9.3, 1.6, 2.6]]',
      name: '["Emplois à durée indéterminée", "Non-salariés", "Contrats à durée déterminée", "Apprentis", "Intérimaires"]',
      unitTooltip: '%',
    },
    pie: {
      x: '[["Protection sociale", "Santé", "Affaires économiques", "Services publics généraux", "Autres", "Enseignement", "Défense"]]',
      y: '[[40.8, 15.6, 11.5, 10.6, 9.4, 9, 3.1]]',
      name: '["Protection sociale", "Santé", "Affaires économiques", "Services publics généraux", "Autres", "Enseignement", "Défense"]',
      fill: true,
      unitTooltip: '%',
    },
  },
  radarChart: {
    default: {
      x: '[["Logement, chauffage, éclairage", "Alimentation, boissons, tabac", "Autres biens et services", "Transports", "Communications, loisirs, culture", "Hôtels, cafés, restaurants", "Habillement et chaussures"], ["Logement, chauffage, éclairage", "Alimentation, boissons, tabac", "Autres biens et services", "Transports", "Communications, loisirs, culture", "Hôtels, cafés, restaurants", "Habillement et chaussures"]]',
      y: '[[22.6, 28.9, 8.4, 10.7, 8.5, 5.3, 12.8], [31.3, 15.9, 13.4, 12.9, 10.5, 8.5, 3.0]]',
      name: '["1963", "2023"]',
      unitTooltip: '%',
    },
  },
  gaugeChart: {
    default: {
      value: 360000,
      init: 100000,
      target: 2000000,
      initDate: '(en 2022)',
      targetDate: '(en 2026)',
    },
  },
  mapChart: {
    departments: {
      data: `{"01": 10, "02": 83, "03": 67, "04": 6, "05": 47, "06": 96, "07": 77, "08": 75,
              "09": 57, "10": 58, "11": 28, "12": 33, "13": 89, "14": 24, "15": 5, "16": 41,
              "17": 79, "18": 8, "19": 42, "2A": 63, "2B": 16, "21": 25, "22": 26, "23": 37,
              "24": 65, "25": 88, "26": 48, "27": 61, "28": 80, "29": 99, "30": 71, "31": 5,
              "32": 0, "33": 86, "34": 19, "35": 13, "36": 32, "37": 59, "38": 82, "39": 13,
              "40": 78, "41": 92, "42": 9, "43": 22, "44": 70, "45": 85, "46": 58, "47": 72,
              "48": 61, "49": 27, "50": 47, "51": 41, "52": 44, "53": 29, "54": 22, "55": 4,
              "56": 57, "57": 94, "58": 46, "59": 33, "60": 0, "61": 15, "62": 60, "63": 100,
              "64": 98, "65": 77, "66": 51, "67": 56, "68": 19, "69": 44, "70": 92, "71": 96,
              "72": 51, "73": 32, "74": 19, "75": 96, "76": 91, "77": 21, "78": 48, "79": 72,
              "80": 52, "81": 48, "82": 57, "83": 38, "84": 23, "85": 46, "86": 37, "87": 64,
              "88": 78, "89": 72, "90": 85, "91": 87, "92": 46, "93": 89, "94": 18, "95": 56,
              "971": 48, "972": 64, "973": 6, "974": 70, "976": 38}`,
      value: '10',
      name: 'Nom de l’indicateur',
      level: 'dep',
      date: '11/02/2025',
    },
    regions: {
      data: `{"ARA": 32, "BFC": 8, "BRE": 38, "CVL": 12, "GES": 67, "HDF": 89, "IDF": 0,
              "NOR": 23, "NAQ": 56, "OCC": 78, "PDL": 95, "PAC": 100, "20R": 14,
              "971": 21, "972": 32, "973": 45, "974": 78, "976": 98}`,
      value: '10',
      name: 'Nom de l’indicateur',
      level: 'reg',
      date: '11/02/2025',
    },
  },
  mapChartReg: {
    region: {
      data: `{"01": 10, "02": 83, "03": 67, "04": 6, "05": 47, "06": 96, "07": 77, "08": 75,
              "09": 57, "10": 58, "11": 28, "12": 33, "13": 89, "14": 24, "15": 5, "16": 41,
              "17": 79, "18": 8, "19": 42, "2A": 63, "2B": 16, "21": 25, "22": 26, "23": 37,
              "24": 65, "25": 88, "26": 48, "27": 61, "28": 80, "29": 99, "30": 71, "31": 5,
              "32": 0, "33": 86, "34": 19, "35": 13, "36": 32, "37": 59, "38": 82, "39": 13,
              "40": 78, "41": 92, "42": 9, "43": 22, "44": 70, "45": 85, "46": 58, "47": 72,
              "48": 61, "49": 27, "50": 47, "51": 41, "52": 44, "53": 29, "54": 22, "55": 4,
              "56": 57, "57": 94, "58": 46, "59": 33, "60": 0, "61": 15, "62": 60, "63": 100,
              "64": 98, "65": 77, "66": 51, "67": 56, "68": 19, "69": 44, "70": 92, "71": 96,
              "72": 51, "73": 32, "74": 19, "75": 96, "76": 91, "77": 21, "78": 48, "79": 72,
              "80": 52, "81": 48, "82": 57, "83": 38, "84": 23, "85": 46, "86": 37, "87": 64,
              "88": 78, "89": 72, "90": 85, "91": 87, "92": 46, "93": 89, "94": 18, "95": 56,
              "971": 48, "972": 64, "973": 6, "974": 70, "976": 38}`,
      value: '10',
      name: 'Nom de l’indicateur',
      region: 'GES',
      date: '11/02/2025',
    },
  },
  tableChart: {
    default: {
      x: '["A","B","C","D","E","F","G","H","I","J"]',
      y: '[[40, 50, 40, 39, 49, 40, 50, 40, 39, 49], [30, 150, 340, 379, 439, 40, 50, 40, 39, 49], [30, 150, 340, 379, 439, 40, 50, 40, 39, 49], [30, 150, 340, 379, 439, 40, 50, 40, 39, 49], [30, 150, 340, 379, 439, 40, 50, 40, 39, 49], [30, 150, 340, 379, 439, 40, 50, 40, 39, 49], [30, 150, 340, 379, 439, 40, 50, 40, 39, 49], [30, 150, 340, 379, 439, 40, 50, 40, 39, 49]]',
      tableName: 'Indicateur',
    },
  },
  dataBox: {
    simple: {
      id: 'simple',
      title: 'Statut des emplois en France en 2018',
      tooltipTitle: 'Statut des emplois en France',
      tooltipContent: 'Pour l’année 2018. France hors Mayotte, population des ménages, personnes en emploi.',
      source: 'Insee, enquête Emploi',
      date: '12/01/2025',
      trend: '-15%',
    },
    complete: {
      id: 'complete',
      title: 'Emplois en France de 1926 à 1950',
      tooltipTitle: 'Emplois en France',
      tooltipContent: 'Nombre d’emplois en France de 1926 à 1950, par genre. Se base sur les données de l’INSEE et de Pôle Emploi et d’une autre source.',
      modalTitle: 'Titre de la modale',
      modalContent: 'Contenu de la modale',
      source: 'INSEE, Pôle Emploi, Autre source',
      date: '2001-11-12',
      defaultSource: 'pole-emploi',
      trend: '5%',
      segmentedControl: true,
      screenshot: true,
      download: true,
      fullscreen: true,
      actions: ['Source officielle', 'Pôle emploi'],
    },
  },
};
