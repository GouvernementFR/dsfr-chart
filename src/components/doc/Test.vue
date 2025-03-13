<template>
  <h1>Test</h1>
  <!-- <bar-chart
    id="bar-chart"
    x="[[2025, 2030, 2035, 2040, 2050, 2060, 2070]]"
    y="[[69.1, 70.3, 71.4, 72.5, 74, 75.2, 76.4]]"
    name="[&quot;Population en millions&quot;]"
    selected-palette="default"
    unit-tooltip="millions"
    y-min="10"
    y-max="100"
  /> -->
  <!-- <bar-line-chart
    id="bar-line-chart"
    x="[1980, 1990, 2000, 2010]"
    y-bar="[826, 793, 807, 832]"
    y-line="[14.9, 13.4, 13.1, 12.9]"
    name-bar="Taux de natalité"
    name-line="Naissances"
    unit-tooltip-bar="milliers"
    unit-tooltip-line="%"
  /> -->
  <!-- <gauge-chart
    id="gauge-chart"
    value="360000"
    init="100000"
    target="2000000"
    init-date="(en 2022)"
    target-date="(en 2026)"
  /> -->
  <!-- <line-chart
    id="line-chart"
    x="[[2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020]]"
    y="[[51.50, 55.30, 61.50, 70.20, 81.10, 92.60, 100.20, 104.60, 96.90, 98.00, 104.90, 106.80, 104.70, 102.70, 100.20, 100.40, 102.90, 106.00, 109.10, 114.60]]"
    name="[&quot;Indices des prix des logements anciens&quot;]"
    selected-palette="default"
    unit-tooltip="points d’indice"
    y-min="10"
    y-max="200"
  /> -->
  <!-- <map-chart
    id="map-chart"
    data='{"01": 10, "02": 83, "03": 67, "04": 6, "05": 47, "06": 96, "07": 77, "08": 75, "09": 57, "10": 58, "11": 28, "12": 33, "13": 89, "14": 24, "15": 5, "16": 41, "17": 79, "18": 8, "19": 42, "2A": 63, "2B": 16, "21": 25, "22": 26, "23": 37, "24": 65, "25": 88, "26": 48, "27": 61, "28": 80, "29": 99, "30": 71, "31": 5, "32": 0, "33": 86, "34": 19, "35": 13, "36": 32, "37": 59, "38": 82, "39": 13, "40": 78, "41": 92, "42": 9, "43": 22, "44": 70, "45": 85, "46": 58, "47": 72, "48": 61, "49": 27, "50": 47, "51": 41, "52": 44, "53": 29, "54": 22, "55": 4, "56": 57, "57": 94, "58": 46, "59": 33, "60": 0, "61": 15, "62": 60, "63": 100, "64": 98, "65": 77, "66": 51, "67": 56, "68": 19, "69": 44, "70": 92, "71": 96, "72": 51, "73": 32, "74": 19, "75": 96, "76": 91, "77": 21, "78": 48, "79": 72, "80": 52, "81": 48, "82": 57, "83": 38, "84": 23, "85": 46, "86": 37, "87": 64, "88": 78, "89": 72, "90": 85, "91": 87, "92": 46, "93": 89, "94": 18, "95": 56, "971": 48, "972": 64, "973": 6, "974": 70, "976": 38}'
    value="10"
    name="Nom de l’indicateur"
    level="dep"
    date="11/02/2025"
  /> -->
  <!-- <map-chart-reg
    id="map-chart-reg"
    data='{"01": 10, "02": 83, "03": 67, "04": 6, "05": 47, "06": 96, "07": 77, "08": 75, "09": 57, "10": 58, "11": 28, "12": 33, "13": 89, "14": 24, "15": 5, "16": 41, "17": 79, "18": 8, "19": 42, "2A": 63, "2B": 16, "21": 25, "22": 26, "23": 37, "24": 65, "25": 88, "26": 48, "27": 61, "28": 80, "29": 99, "30": 71, "31": 5, "32": 0, "33": 86, "34": 19, "35": 13, "36": 32, "37": 59, "38": 82, "39": 13, "40": 78, "41": 92, "42": 9, "43": 22, "44": 70, "45": 85, "46": 58, "47": 72, "48": 61, "49": 27, "50": 47, "51": 41, "52": 44, "53": 29, "54": 22, "55": 4, "56": 57, "57": 94, "58": 46, "59": 33, "60": 0, "61": 15, "62": 60, "63": 100, "64": 98, "65": 77, "66": 51, "67": 56, "68": 19, "69": 44, "70": 92, "71": 96, "72": 51, "73": 32, "74": 19, "75": 96, "76": 91, "77": 21, "78": 48, "79": 72, "80": 52, "81": 48, "82": 57, "83": 38, "84": 23, "85": 46, "86": 37, "87": 64, "88": 78, "89": 72, "90": 85, "91": 87, "92": 46, "93": 89, "94": 18, "95": 56, "971": 48, "972": 64, "973": 6, "974": 70, "976": 38}'
    value="10"
    name="Nom de l’indicateur"
    region="GES"
    date="11/02/2025"
  /> -->
  <!-- <pie-chart
    id="pie-chart"
    x="[[&quot;Emplois à durée indéterminée&quot;, &quot;Non-salariés&quot;, &quot;Contrats à durée déterminée&quot;, &quot;Apprentis&quot;, &quot;Intérimaires&quot;]]"
    y="[[74.8, 11.7, 9.3, 1.6, 2.6]]"
    name="[&quot;Emplois à durée indéterminée&quot;, &quot;Non-salariés&quot;, &quot;Contrats à durée déterminée&quot;, &quot;Apprentis&quot;, &quot;Intérimaires&quot;]"
    unit-tooltip="%"
  /> -->
  <radar-chart
    id="radar-chart"
    x="[[&quot;Logement, chauffage, éclairage&quot;, &quot;Alimentation, boissons, tabac&quot;, &quot;Autres biens et services&quot;, &quot;Transports&quot;, &quot;Communications, loisirs, culture&quot;, &quot;Hôtels, cafés, restaurants&quot;, &quot;Habillement et chaussures&quot;], [&quot;Logement, chauffage, éclairage&quot;, &quot;Alimentation, boissons, tabac&quot;, &quot;Autres biens et services&quot;, &quot;Transports&quot;, &quot;Communications, loisirs, culture&quot;, &quot;Hôtels, cafés, restaurants&quot;, &quot;Habillement et chaussures&quot;]]"
    y="[[22.6, 28.9, 8.4, 10.7, 8.5, 5.3, 12.8], [31.3, 15.9, 13.4, 12.9, 10.5, 8.5, 3.0]]"
    name="[&quot;1963&quot;, &quot;2023&quot;]"
    unit-tooltip="%"
  />
  <!-- <scatter-chart
    id="radar-chart"
    x="[[1995, 2000, 2005, 2010, 2015, 2020, 2022], [1995, 2000, 2005, 2010, 2015, 2020, 2022], [1995, 2000, 2005, 2010, 2015, 2020, 2022]]"
    y="[[175, 155, 149, 130, 111, 107, 130], [177, 168, 159, 130, 116, 109, 131], [176, 162, 152, 130, 111, 97, 103]]"
    name="[&quot;Diesel&quot;, &quot;Essence&quot;, &quot;Total&quot;]"
    unit-tooltip="g de CO₂ / km"
  /> -->
  <!-- <table-chart
    id="table-chart"
    x="[&quot;A&quot;, &quot;B&quot;, &quot;C&quot;, &quot;D&quot;, &quot;E&quot;, &quot;F&quot;, &quot;G&quot;, &quot;H&quot;, &quot;I&quot;, &quot;J&quot;]"
    y="[[40, 50, 40, 39, 49, 40, 50, 40, 39, 49], [30, 150, 340, 379, 439, 40, 50, 40, 39, 49], [30, 150, 340, 379, 439, 40, 50, 40, 39, 49], [30, 150, 340, 379, 439, 40, 50, 40, 39, 49], [30, 150, 340, 379, 439, 40, 50, 40, 39, 49], [30, 150, 340, 379, 439, 40, 50, 40, 39, 49], [30, 150, 340, 379, 439, 40, 50, 40, 39, 49], [30, 150, 340, 379, 439, 40, 50, 40, 39, 49]]"
    table-name="Indicateur"
  /> -->
</template>
