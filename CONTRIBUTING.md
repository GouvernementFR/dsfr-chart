# Contribuer au DSFR Chart

## Installation

Le **DSFR Chart** est basé sur une architecture [NodeJS](https://nodejs.org/), il est donc nécessaire d’installer une version récente de nodeJs. Dans le terminal nous utiliserons les commandes de **npm**.

Le dépôt est disponible à cette adresse: https://github.com/GouvernementFR/dsfr-chart

Afin de pouvoir commencer à développer et contribuer au DSFR, assurez-vous tout d'abord de faire un fork du projet depuis votre compte GitHub (https://help.github.com/articles/fork-a-repo/)

Il suffit ensuite de cloner votre fork, en téléchargeant les sources depuis le bouton “clone” de github, ou via un terminal avec commande :

```
git clone https://github.com/VOTRE_NOM_UTILISATEUR_GITHUB/dsfr-chart
```

Une fois le projet récupéré, il est nécessaire d'installer les dépendances (node_modules) avec :

`npm install`

Enfin, il est nécessaire de lancez un serveur local pour visualiser la page d'exemple index.html :

`npm run serve`

Un serveur local sera alors lancé sur l'adresse localhost:8080. Accéder à http://localhost:8080 pour visualiser la liste des exemples.

## GitFlow

Se referer au fichier [CONTRIBUTING-gitflow.md](./CONTRIBUTING-gitflow.md) qui décrit le modèle de branches à suivre pour contribuer au DSFR Chart.

## Ajouter un type de graphique

Cette partie décrit les étapes à suivre pour l'ajout d'une nouvelle représentation graphique au sein du DSFR Chart.

### Création du composant vue

La première étape consiste à créer le composant _vue_ de cette nouvelle visualisation. Ce fichier doit se trouver dans `src/components` et reprendre la même structure que les autres composants. Par exemple : **NewChart.vue**

### Création du script de compilation

Ensuite, il faut créer le fichier js qui permettra de créer le web-component à partir de la vue. Ce fichier doit se trouver dans `src/` et avoir la structure suivante :

_NewChart.js_

```javascript
import Vue from 'vue';
import NewChart from './components/NewChart';
import vueCustomElement from 'vue-custom-element';
Vue.config.productionTip = false;
Vue.use(vueCustomElement);
Vue.customElement('new-chart', NewChart);
```

Il est également important de rajouter cela dans le fichier `main.js` et `mainDev.js` qui permettent la compilation de tous les web-components, respectivement pour la production et le développement.

### Ajout de la commande de build

Finalement il faut créer la commande "build" du composants dans le fichier `package.json`. Dans la partie "scripts", ajouter:

`"build-new": "vue-cli-service build --target lib --dest ./NewChart --inline-vue --name new-chart src/NewChart.js"`

-   **--dest** permet de choisir le dossier de destination des fichiers compilés
-   **--name** permet de choisir le nom du web-component
-   **src/NewChart.js** correspond au fichier js à exécuter

Il est également nécessaire de rajouter la commande nouvellement créée dans la commande `build-all` de la manière suivante :

`"build all": npm run build-bar & ... & npm run build-new`

## Compilation

Compiler le fichier permettant d'obtenir le distribuable comportant tous les graphiques :

`npm run build`

Compiler les fichiers permettant d'obtenir un distribuable par graphique soit en exécutant les commandes une par une :

`npm run build-line`

`npm run build-map`

etc...

soit en utilisant la commande :

`npm run build-all`

## Publication NPM

La publication du package sur npm nécessite les actions suivantes au niveau du fichier `package.json` :

-   renseigner le nom dans la partie **name** et la **version**. La combinaison de ces deux paramètres doit être inédite pour être publiée (On ne peut pas publier une version existante)
-   choisir l'ensemble des dossiers/fichiers à intégrer au package et qui seront disponibles lors de l'installation par un utilisateur. Cette liste doit être renseignée au niveau de la partie **files** du `package.json`. Elle doit contenir, a minima, le dossier comprenant le distribuable de tous les graphiques (`/Charts`), les dossiers de distribuables unitaires de chaque graphiques (ex : `/BarChart`) et la documentation (`README.md` et `CONTRIBUTING.md`).

Le fichier `package.json` permet aussi de définir une description (**description**), un auteur (**author**) et de lier le package au repo github du projet (**repository**).

Vous pouvez ensuite lancer la publication :

`npm publish`

Une connexion au compte npm sur lequel doit être publié le package sera demandée.

## Déploiement d'une page de démonstration

Github permet le déploiement de pages web statiques via la fonctionnalité **Github Pages**.

1. Compléter le fichier `src/mainDev.js` si nécessaire. Ce fichier doit contenir la compilation de toutes les représentations graphiques que l'on souhaite afficher sur la page de démonstration. Il doit aussi contenir les dépendances au dsfr nécessaires au bon fonctionnement du projet.
2. Compléter la page d'exemple (`public/index.html`) en utilisant les représentations à afficher.
3. Visualiser la page en local : `npm run serve`.
4. Lancer le build de la page : `npm run build-rec`. Les fichiers nécessaires au déploiement de la page seront créés dans le dossier `docs`.
5. Pusher le dossier `docs`sur le repository github.
6. Sur le repository github, se rendre dans **Settings** --> **Pages**. Dans la section **Build and deployment**, choisir **Deploy from a branch** pour la source. Choisir ensuite la branche qui sera associée à la page et le dossier `docs` dans _branch_
