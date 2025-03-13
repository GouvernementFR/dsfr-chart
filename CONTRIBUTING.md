# Contribuer au DSFR Chart

## Installation

Le **DSFR Chart** est basé sur une architecture [NodeJS](https://nodejs.org/), il est donc nécessaire d’installer une version récente de NodeJS. Dans le terminal nous utiliserons les commandes de **npm**.

Le dépôt est disponible à cette adresse : https://github.com/GouvernementFR/dsfr-chart

Afin de pouvoir commencer à développer et contribuer au DSFR, il faut tout d'abord de faire un fork du projet depuis votre compte GitHub (https://help.github.com/articles/fork-a-repo/)

Il suffit ensuite de cloner votre fork, en téléchargeant les sources depuis le bouton “clone” de GitHub, ou via un terminal avec commande :

```bash
git clone https://github.com/<VOTRE_NOM_UTILISATEUR_GITHUB>/dsfr-chart
```

Une fois le projet récupéré, il est nécessaire d'installer les dépendances (node_modules) avec :

`npm install`

Enfin, il est nécessaire de lancer un serveur local pour visualiser la page d'exemple index.html :

`npm run dev`

Un serveur local sera alors lancé sur l'adresse [localhost:5173](http://localhost:5173) avec la documentation et des exemples.

## GitFlow

Se référer au fichier [CONTRIBUTING-gitflow.md](./CONTRIBUTING-gitflow.md) qui décrit le modèle de branches à suivre pour contribuer au DSFR Chart.

## Ajouter un type de graphique

Cette partie décrit les étapes à suivre pour l'ajout d'une nouvelle représentation graphique au sein du DSFR Chart.

### Création du composant vue

La première étape consiste à créer le composant Vue de cette nouvelle visualisation. Ce fichier doit se trouver dans `src/components/` et reprendre la même structure que les autres composants. Par exemple : **NewChart.vue**

### Création du script de compilation

Ensuite, il faut créer le fichier js qui permettra de créer le web-component à partir de la vue. Ce fichier doit se trouver dans `src/charts/` et avoir la structure suivante :

_NewChart.js_

```javascript
import { defineCustomElement } from 'vue';

import NewChart from '@/components/NewChart.vue';

const NewChartElement = defineCustomElement(NewChart);

customElements.define('bar-line-chart', NewChartElement, { shadowRoot: false });
```

Il est également important de rajouter cela dans le fichier `src/charts/main.js` qui permet de l'inclure dans la compilation de tous les web-components ainsi que dans le fichier `src/main.js` pour l'utiliser dans la documentation du `index.html`.

### Ajout de la commande de build

Il faut créer la commande de build du composant dans le fichier `package.json`. Dans la partie "scripts", ajouter :

`"build-new": "LIBRARY=NewChart vite build --config=vite-components.config.js"`

/!\ Seule la variable **LIBRARY** est nécessaire définit le nom du web-component à traiter.

### Export du composant

Finalement déclarer le nouveau composant dans la section `exports` du `package.json` :

```json
{
  "exports": {
    "./NewChart": {
      "import": "./dist/bundler/NewChart.js",
      "require": "./dist/bundler/NewChart.cjs"
    }
  }
}
```

## Compilation

Compiler le fichier permettant d'obtenir le distribuable comportant tous les graphiques :

`npm run build`

Compiler les fichiers permettant d'obtenir un distribuable par graphique :

`npm run build-line` OU `npm run build-map` OU etc...

Compiler tous les fichiers permettant d'obtenir un distribuable par graphique séparément :

`npm run build:components`

## Test

### Test en local (dev only, plus rapide)

Les tests de régression visuelle sont exécutés sur les composants build à travers le StoryBook.

Pour les exécuter il faut dans un premier temps build le projet :

`npm run build`

Et si ce n'est pas déjà fait, installer le navigateur utilisé par playwright :

`npx playwright install --with-deps chromium`

Puis lancer les tests:

`npm run test`

_Note 1 : Pour accepter les régressions visuelles et les considérer comme la nouvelle norme, utiliser la commande `npm run test:update-snapshots`_

_Note 2 : Playwright échoue parfois à charger les stories de Storybook, ce qui fait échouer les tests. Pour palier à ce problème, augmenter le temps (en ms) attendu par la fonction `sleep` dans le fichier `visual-regression.test.js`._

### Test avec Docker (recommandé, plus stable)

Afin d'avoir un résultat conforme selon les différentes configurations, il est recommandé d'utiliser Docker pour les tests de régression visuelle.

Pour cela, il faut d'abord build l'image Docker :

`docker compose build`

Puis lancer les tests :

`docker compose up test`

Ou pour lancer les tests de régression visuelle :

`docker compose up snapshots`

_Note : il reste conseiller d'analyser les différences à la main pour vérifier que les changements sont bien ceux attendus. Il peut y avoir malgré tout des pixels qui diffèrent._

## Publication NPM

La publication du package sur npm nécessite les actions suivantes au niveau du fichier `package.json` :

-   renseigner le nom dans la partie **name** et la **version**. La combinaison de ces deux paramètres doit être inédite pour être publiée (On ne peut pas publier une version existante)
-   choisir l'ensemble des dossiers / fichiers à intégrer au package et qui seront disponibles lors de l'installation par un utilisateur. Cette liste doit être renseignée au niveau de la partie **files** du `package.json`. Elle doit contenir, a minima, le dossier comprenant le distribuable de tous les graphiques (`dist/DSFRChart`), les dossiers de distribuables unitaires de chaque graphiques (ex : `dist/BarChart`) et la documentation (`README.md` et `CONTRIBUTING.md`).

Le fichier `package.json` permet aussi de définir une description (**description**), un auteur (**author**) et de lier le package au repo GitHub du projet (**repository**).

On peut ensuite lancer la publication sur npmjs :

`npm publish`

Une connexion au compte npm sur lequel doit être publié le package sera demandée.

## Déploiement d'une page de démonstration

GitHub permet le déploiement de pages web statiques via la fonctionnalité **GitHub Pages**.

1. Compléter le fichier `src/charts/main.js` si nécessaire. Ce fichier doit contenir la configuration de tous les graphiques que l'on souhaite afficher sur la page de démonstration. Il doit aussi contenir les dépendances au dsfr nécessaires au bon fonctionnement du projet.

2. Ajouter si besoin les graphiques, titres et textes dans le fichier `src/components/doc/examples.js`. Ajuster aussi la page de documentation (`src/components/doc/Documentation.vue`) pour des changements globaux au projets.

3. Visualiser la page en local : `npm run dev`.

4. Lancer le build de la page avec `npm run build:docs`. Les fichiers nécessaires au déploiement de la page seront créés dans le dossier `docs/`.

5. Publier le code sur le repository GitHub si cela convient, un GitHub Action va générer la documentation dans une nouvelle branche `docs` avec la création d'un nouveau tag (ex: `v2.0.0`).

6. Sur le repository GitHub, se rendre dans **Settings** --> **Pages**. Dans la section **Build and deployment**, choisir **Deploy from a branch** pour la source. Choisir ensuite la branche `docs` qui sera associée à la documentation comme source.
