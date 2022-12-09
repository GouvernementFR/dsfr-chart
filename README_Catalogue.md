# Introduction DSFR Chart

Ce catalogue présente l'ensemble des graphiques disponibles dans le module complémentaire au Système de design de l'État (DSFR) pour la visualisation de données. Les différents types de graphiques sont regroupés par thème clair et thème sombre afin de donner un aperçu du résultat auquel aura accès un utilisateur. Par ailleurs, les options de chacun des graphiques sera également présenté.


# I. Nuage de points / ScatterChart

Les nuages de points sont accessibles à travers la balise : ```<scatter-chart>```.

Les paramètres obligatoires sont :

* **x** : les valeurs sur l'axe des abscisses sous forme d'une liste de listes entre crochets 

* **y** : les valeurs sur l'axe des ordonnées sous forme d'une liste de listes entre crochets

**Exemple :** 

```html
<scatter-chart x='[[1, 5, 8], [1, 2, 15]]', y='[[30, 10, 20], [10, 20, 30]]'></scatter-chart>
```

#### Options ScatterChart

On peut choisir de relier les points d'un ScatterChart avec l'option **showline**. On lui affecte la valeur **true** dans le cas ou l’on veut relier les points.

**Exemple** : 

```html
<scatter-chart x='[[1, 5, 8], [1, 2, 15]]', y='[[30, 10, 20], [10, 20, 30]]' showline = true></scatter-chart>
```

### 1.Thème Clair

<img src="./Pictures/ScatterChart.png" alt="ScatterChart" width="500";" />

### 2.Thème Sombre

<img src="1-Graphs/dark/ScatterChart.png" alt="ColorName" width="500";" />

-----------------------------------------------------------------------------------------------
# II. LineChart

Les LineChart sont accessibles à travers la balise : ```<line-chart> ```

Les paramètres obligatoires sont :

* **x** : les valeurs sur l'axe des abscisses sous la forme d'une liste entre crochets 

* **y** : les valeurs sur l'axe des ordonnées sous la forme d'une liste entre crochets

**Exemple**:

```html
<line-chart x = '[1, 2, 3]' y = '[10, 20, 30]'></line-chart>
```


### 1.Thème Clair
<img src="1-Graphs/light/LineChart1.png" alt="ColorName" width="500";" />

### 2.Thème Sombre

<img src="1-Graphs/dark/LineChart1.png" alt="ColorName" width="500";" />


-----------------------------------------------------------------------------------------------
# III. LineChart Multiple

Les LineChart multiples sont accessibles à travers la balise : ``<multi-line-chart>``.

Les paramètres obligatoires sont :

* **x** : les valeurs sur l'axe des abscisses sous forme d'une liste de listes entre crochets
* **y** : les valeurs sur l'axe des ordonnées sous forme d'une liste de listes entre crochets

**Exemple :** 

```html
<multiline-chart x='[[1, 2, 3], [1, 2, 3]]' y='[[30, 10, 20], [10, 20, 30]]'></multiline-chart>
```

### 1.Thème Clair

<img src="1-Graphs/light/MultiLineChart1.png" alt="ColorName" width="500";" />
<img src="1-Graphs/light/MultiLineChart2.png" alt="ColorName" width="500";" />

### 2.Thème Sombre

<img src="1-Graphs/dark/LineChart2.png" alt="ColorName" width="500";" />
<img src="1-Graphs/dark/LineChart3.png" alt="ColorName" width="500";" />


-----------------------------------------------------------------------------------------------
# IV. MapChart

Les MapChart sont accessibles à travers la balise : ``<map-chart>``.

Les paramètres obligatoires sont :

* **data :** Un dictionnaire qui pour chaque numéro de département associe la valeur de l’indicateur dans le département
* **valuenat** : La valeur de l'indicateur à l'échelle natonale. Cette valeur sera affichée dans la sidebar.

**Exemple :** 

```html
<map-chart data = '{"01": 72, "02": 83, "03": 67, "04": 36, "05": 47, "06": 96, "07": 77, "08": 75, "09": 57, "10": 58, "11": 38,"12": 33, "13": 89, "14": 24, "15": 52, "16": 41, "17": 79, "18": 38, "19": 42, "21": 25, "22": 26,"23": 37, "24": 65, "25": 88, "26": 48, "27": 61, "28": 80, "29": 12, "30": 6, "31": 5, "32": 22, "33": 40,"34": 19, "35": 13, "36": 32, "37": 0, "38": 82, "39": 13, "40": 78, "41": 92, "42": 10, "43": 22, "44": 70,"45": 85, "46": 58, "47": 72, "48": 61, "49": 27, "50": 47, "51": 41, "52": 44, "53": 29, "54": 22, "55": 4,"56": 57, "57": 94, "58": 46, "59": 33, "60": 0, "61": 15, "62": 60, "63": 71, "64": 0, "65": 91, "66": 51,"67": 56, "68": 19, "69": 44, "70": 92, "71": 96, "72": 51, "73": 32, "74": 19, "75": 96, "76": 91, "77": 21,"78": 48, "79": 72, "80": 52, "81": 48, "82": 57, "83": 38, "84": 23, "85": 46, "86": 37, "87": 64, "88": 78,"89": 100, "90": 85, "91": 87, "92": 46, 93": 89, "94": 18, "95": 72, "971": 48, "972": 28, "973": 35,"974": 70, "976": 38, "2A": 63, "2B": "16"}' valuenat = 3 name = 'Test'></map-chart>
```

### 1.Thème Clair

<img src="1-Graphs/light/MapChart.png" alt="ColorName" width="500";" />

### 2.Thème Sombre

<img src="1-Graphs/dark/MapChart_incoming.png" alt="ColorName" width="500";" />


-----------------------------------------------------------------------------------------------

# V. BarChart

Les BarChart sont accessibles à travers la balise : ```<bar-chart>```.

Les paramètres obligatoires sont :

* **x** : les valeurs sur l’axe des abscisses sous forme d’une liste de listes entre crochets 

* **y** : les valeurs sur l’axe des ordonnées sous forme d’une liste de listes entre crochets

**Exemple :** 

```html
<bar-chart x='[["4", "2", "3", "5"], ["4", "2", "3", "5"], ["4", "2", "3", "5"]]' y='[[40, 50, 10, 5], [10, 20, 30, 12], [12, 12, 20, 23]]'></bar-chart>
```

#### Options BarChart

* Pour tracer un **barchart empilé**, il faut renseigner l’option **stacked = true**

**Exemple** :

```html
<bar-chart x='[["4", "2", "3", "5"], ["4", "2", "3", "5"], ["4", "2", "3", "5"]]' y='[[40, 50, 10, 5], [10, 20, 30, 12], [12, 12, 20, 23]]' stacked = true></bar-chart>
```

### 1.Thème Clair

<img src="1-Graphs/light/BarChart1.png" alt="ColorName" width="500";" />
<img src="1-Graphs/light/BarChart2.png" alt="ColorName" width="500";" />

### 2.Thème Sombre

<img src="1-Graphs/dark/BarChart1.png" alt="ColorName" width="500";" />
<img src="1-Graphs/dark/BarChart2.png" alt="ColorName" width="500";" />

-----------------------------------------------------------------------------------------------

# VI. BarLineChart

Les BarChart sont accessibles à travers la balise : ```<bar-line-chart>```.

Les paramètres obligatoires sont :

* **x** : les valeurs sur l’axe des abscisses sous forme d’une liste entre crochets

* **y** : les valeurs sur l’axe des ordonnées de la ligne sous forme d’une liste entre crochets

* **ybar** : les valeurs sur l’axe des ordonnées des barres sous forme d’une liste entre crochets

**Exemple :** 

```html
<bar-line-chart x='[1, 2, 3]' y='[30, 10, 20]' ybar = '[20, 15, 12]'></bar-line-chart>
```

### 1.Thème Clair
<img src="1-Graphs/light/BarChart3_+_LineChart.png" alt="ColorName" width="500";" />

### 2.Thème Sombre

<img src="1-Graphs/dark/BarChart_+_LineChart.png" alt="ColorName" width="500";" />


-----------------------------------------------------------------------------------------------


# VII. PieChart

Les BarChart sont accessibles à travers la balise : ```<line-chart>```.

Les paramètres obligatoires sont :

* **x** : les noms de chaque groupe sous la forme d’une liste entre crochets

* **y** : les valeurs de chaque groupe sous la forme d’une liste entre crochets

**Exemple :** 

```html
<pie-chart x = '[1, 2, 3]', y = '[10, 20, 30]'></pie-chart>
```

#### Options PieChart

L’option **fill = True**, permet de remplir l’intérieur du graphique.

**Exemple** : 

```html
<pie-chart x = '[1, 2, 3]', y = '[10, 20, 30]' fill = true></pie-chart>
```

### 1.Thème Clair

<img src="1-Graphs/light/Piechart1.png" alt="ColorName" width="500";" />
<img src="1-Graphs/light/Piechart2_donut.png" alt="ColorName" width="500";" />

### 2.Thème Sombre

<img src="1-Graphs/dark/Piechart1.png" alt="ColorName" width="500";" />
<img src="1-Graphs/dark/Piechart2_donut.png" alt="ColorName" width="500";" />


-----------------------------------------------------------------------------------------------

# VIII. Couleurs et noms

Par défaut les noms des indicateurs sont : Série1, Série2, … et les couleurs associés sont #000091, #007c3a, #A558A0. Ils peuvent être modifiés à la convenance de l’utilisateur par les paramètres color et name.

Les couleurs choisis doivent impérativement choisis parmi les [couleurs du dsfr](https://www.systeme-de-design.gouv.fr/elements-d-interface/fondamentaux-identite-de-l-etat/couleurs-palette) de la liste suivante :


* blue-france

* red-marianne

* artwork-major-green-tilleul-verveine

* green-bourgeon

* green-emeraude

* green-menthe

* green-archipel

* blue-ecume

* blue-cumulus

* purple-glycine

* pink-macaron

* pink-tuile

* yellow-tournesol

* yellow-moutarde

* orange-terre-battue

* brown-cafe-creme

* brown-caramel

* brown-opera

* beige-gris-galet

Les couleurs apparaîtront dans leur variante **sun** en thème claire et dans leur variante **moon** en thème sombre.

```html
<line-chart x = '[1, 2, 3]' y = '[10, 20, 30]' color = 'red' name = 'Custom'></line-chart>
```

Pour les graphiques avec plusieurs séries (barchart, piechart, multilinechart, scatterchart), **color** et **name** doivent être fournis sous la forme d'une liste entre crochets et non d'une simple chaîne de caractère 

```html
 <multiline-chart x='[[1, 2, 3], [1, 2, 3]]', y='[[30, 10, 20], [10, 20, 30]]' color = '["blue-france", "red-marianne"]' name = '["A", "B"]'></multiline-chart>
```

Pour le cas du **BarLineChart,** les paramètres **color** et **name** sont associés à la ligne. Pour changer la couleur et le nom des barres, il faut utiliser les paramètre **colorbar** et **namebar**

```html
<bar-line-chart x='[1, 2, 3]', y='[30, 10, 20]' ybar = '[20, 15, 12]' colorbar = 'red-marianne' namebar = 'Custom'></bar-line-chart>
```

Enfin dans le cas de **MapChart**, la modification du nom se fait également par l’intermédiaire de la variable **name**. En revanche pour gérer la couleur de la légende, il faut renseigner les paramètres **colmin** ('#ffc700' par défaut) et **colmax** ('#ffc700' par défaut)**.** Ils correspondent respectivement à la couleur des valeurs minimale et maximale de la légende. Un gradient de couleur sera fait entre les deux couleurs choisies. 

**Exemple :**

```html
 <map-chart data = '{...}' name = 'Test' colmin = 'yellow', colmax = 'red'></map-chart>
```

# IX. Jauges


Ce graphique est généré avec la balise ```<gauge-chart> ```

Les paramètres obligatoires sont :

·    **value** : la valeur actuelle de la jauge sous la forme d’une un nombre 

·    **init** : la valeur de départ de la jauge

·    **target** : la valeur cible de la jauge

**Exemple**:

```html
<gauge-chart value=16 init=10 target=20 color="blue-france"></gauge-chart>
```

<img src="./Pictures/GaugeChart.png" alt="GaugeChart" style="width:400px;" />


# X. Options

### Barre verticale

Il est possible d’ajouter une ou plusieurs barres verticales par l’intermédiaire du paramètre :

* **vline** : La ou les valeur(s) sur l’axe des abscisses sous la forme d’une liste entre crochets

Par défaut la couleur de la ligne sera #161616 et son nom V1, V2, … Cela peut être modifié en renseignant les paramètres : 

*  **vlinecolor** : La ou les couleur(s) sous forme d’une liste entre crochets

* **vlinename** : Le ou les nom(s) sous la forme d’une liste entre crochets 

**Exemple :**

```html
<line-chart x = '[1, 2, 3]' y = '[10, 20, 30]' vline = '[1.5, 2.5]' vlinename = '["min", "max"]' vlinecolor = '["green-archipel", "orange-terre-battue"]'></line-chart>
```

### Barre horizontale

Il est possible d’ajouter une ou plusieurs barre(s) verticale(s) par l’intermédiaire du paramètre :

* **hline** : La ou les valeur(s) sur l’axe des ordonnées sous la forme d’une liste entre crochets

Par défaut la couleur de la ligne sera #009081 et son nom H1, H2, … Cela peut être modifié en renseignant les paramètres : 

* **hlinecolor** : La ou les couleur(s) sous forme d’une liste entre crochets

* **hlinename** : Le ou les nom(s) sous la forme d’une liste entre crochets 

**Exemple :**

```html
<line-chart x = '[1, 2, 3]' y = '[10, 20, 30]' hline = '[15, 25]' hlinename = '["min", "max"]' hlinecolor = '["green-archipel", "orange-terre-battue"]'></line-chart>
```






