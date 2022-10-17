# Contribuer au DSFR Chart

## Installation 

Le **DSFR** est basé sur une architecture [NodeJS](https://nodejs.org/), il est donc nécessaire d’installer une version récente de nodeJs. Dans le terminal nous utiliserons les commandes de **npm**.

Le dépôt est disponible à cette adresse: https://github.com/GouvernementFR/dsfr-chart

Afin de pouvoir commencer à développer et contribuer au DSFR, assurez-vous tout d'abord de faire un fork du projet depuis votre compte GitHub (https://help.github.com/articles/fork-a-repo/)

Il suffit ensuite de cloner votre fork, en téléchargeant les sources depuis le bouton “clone” de github, ou via un terminal avec commande :
```
git clone https://github.com/VOTRE_NOM_UTILISATEUR_GITHUB/dsfr-chart
```



Une fois le projet récupéré, il est nécessaire d'installer les dépendances (node_modules) avec :

```npm install```

Enfin, il est nécessaire de lancez un serveur local pour visualiser la page d'exemple index.html :

``npm run serve``

Un serveur local sera alors lancé sur l'adresse localhost:8080. Accéder à http://localhost:8080 pour visualiser les exemples.  



## Ajouter un type de graphique

Cette partie décrit les étapes à suivre pour l'ajout d'une nouvelle représentation graphique au sein du DSFR Chart.

### Création du composant vue

La première étape consiste à créer le composant *vue* de cette nouvelle visualisation. Ce fichier doit se trouver dans ``src/components`` et reprendre la même structure que les autres composants.  Par exemple : **NewChart.vue**



### Création du script de compilation

Ensuite, il faut créer le fichier js qui permettra de créer le web-component à partir de la vue. Ce fichier doit se trouver dans ``src/`` et avoir la structure suivante : 

*NewChart.js*

```javascript
import Vue from 'vue'
import NewChart from './components/NewChart'
import vueCustomElement from 'vue-custom-element'
Vue.config.productionTip = false
Vue.use(vueCustomElement)
Vue.customElement('new-chart', NewChart)
```

Il est également important de rajouter cela dans le fichier ``main.js`` qui permet la compilation de tous les web-components.



### Ajout de la commande de build

Finalement il faut créer la commande "build" du composants dans le fichier ``package.json``. Dans la partie "scripts", ajouter: 

``"build-new": "vue-cli-service build --target lib --dest ./NewChart --inline-vue --name new-chart src/NewChart.js"``

* **--dest** permet de choisir le dossier de destination des fichiers compilés
* **name** permet de choisir le nom du web-component
* **src/NewChart.js** correspond au fichier js à exécuter

Il est également nécessaire de rajouter la commande nouvellement créée dans la commande `build-all` de la manière suivante :

`"build all": npm run build-bar & ... & npm run build-new`

## Compilation

Compiler le fichier permettant d'obtenir le distribuable comportant tous les graphiques :

``npm run build``

Compiler les fichiers permettant d'obtenir un distribuable par graphique soit en exécutant les commandes une par une :

``npm run build-line``

``npm run build-map``

etc...

soit en utilisant la commande :

`npm run build-all`



## Publication NPM

Tout d'abord veillez à ce que tous les dossiers/fichiers que vous souhaitez publier soient présents dans la partie *files* de `package.json`.

Puis lancez la publication : 

``npm publish``

