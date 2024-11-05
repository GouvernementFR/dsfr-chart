# GitFlow du DSFR Chart

## Installation

Le dépôt est disponible à cette adresse : https://github.com/GouvernementFR/dsfr-chart

Afin de pouvoir commencer à développer et contribuer au DSFR-chart, assurez-vous tout d'abord de faire un fork du projet depuis votre compte GitHub (https://help.github.com/articles/fork-a-repo/)

Il suffit ensuite de cloner votre fork, en téléchargeant les sources depuis le bouton “clone” de github, ou via un terminal avec commande :
```shell
git clone https://github.com/VOTRE_NOM_UTILISATEUR_GITHUB/dsfr-chart
```

La branche **dev** est la principale branche de travail - la branche **main** correspondant aux versions de productions livrées aux utilisateurs. Il est donc nécessaire de créer de nouvelles branches de travail pour l'ajout et la modification de packages depuis la branche **dev**. (Voir la section [Utilisation > Git](#git), pour le fonctionnement détaillé).

## Git

### Branches
Afin de travailler sur un nouveau package, ou un correctif d'un package existant, il est nécessaire de créer une nouvelle branche à partir de la branche `dev`.
```shell
git checkout -b prefixe/ma-branche dev
```

#### Nommage des branches <!-- omit in toc -->
Afin d'organiser et d'identifier rapidement la nature du contenu des branches, il est nécessaire de préfixer les branches :
feature/nom-de-la-branche pour les nouvelles fonctionnalités ou nouveaux composants.
fix/nom-de-la-branche pour les correctifs apportés sur des fonctionnalités ou composants existants.


### Commits
Nous utilisons des [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/) qui doivent donc s'écrire sous la forme suivante :

```
<type>[optional scope]: <description en français>

[optional body]

[optional footer(s)]
```

Les valeurs possibles pour le `type` de commit sont :
* **fix**: Un commit de type `fix` permet de patcher un bug ([[PATCH]](https://semver.org/#summary))
* **feat**: Un commit de type `feat` permet d'introduire une nouvelle fonctionnalité ([[MINOR]](https://semver.org/#summary))
* D'autres types que `feat` et `fix` peuvent être utilisés, nous utilisons [@commitlint/config-conventional](https://github.com/conventional-changelog/commitlint/tree/master/%40commitlint/config-conventional), qui recommande l'utilisation des principaux types suivants : `build`, `chore`, `ci`, `docs`, `style`, `refactor`, `perf`, `test`

* **BREAKING CHANGE**: Un commit avec un footer `BREAKING CHANGE:` introduit un changement important dans le code ([[MAJOR]](https://semver.org/#summary))

Les messages de commits sont écrits en français (exception faite des mots réservés par conventional commit, ainsi que les termes techniques).

Exemple de commit simple :

```
feat: ajout du composant BarChart
```

Exemple de commit avec `scope`  le nom du composant ou de la fonction, description et `BREAKING CHANGE` footer
```
fix(core): maj fonction: ancien-nom devient nouveau-nom

BREAKING CHANGE: nouveau nom pour la fonction ....
```

### Signature des commits

Afin de garantir l'originalité des contributions, nous demandons aux contributeurs de signer leurs commits et/ou de nous faire parvenir le [certificat de garantie de l'origine du développeur](doc/legal/cgod.md) signé.

Pour signer un commit :

```
git commit --signoff (ou git commit -s)
```

### Proposer une pull request

Important

**Avant de proposer une pull request**, assurez vous que vous respectez la [garantie d’origine de vos développements](https://github.com/GouvernementFR/dsfr/blob/main/doc/legal/cgod.md), et pour les personnes **n'étant pas des agents de l’État,** que vous avez pris connaissance des documents relatifs à la [cession des droits d’auteur](doc/legal/cession.md), **document à nous transmettre signé**.

**Toute ‘pull request’ ne respectant pas ces pré-requis sera systématiquement rejetée.**

Pour contribuer sur le git DSFR, il convient d’utiliser une “pull-request” (PR).
Lorsque vous estimez que votre développement est terminé et qu'il peut-être révisé par l'équipe DSFR, vos devez créer une pull request depuis github (https://github.com/GouvernementFR/dsfr/pulls ) ou github cli (gh).
La pull-request suit les même règles de nommage décrites précédemment (branches, commits), à savoir le [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/).
Une description détaillant le problème à résoudre, la façon dont la contribution résout le problème et toute autre information utile à la revue de code est fortement conseillée !

La pull request doit être faite depuis la branche de votre fork vers la branche **dev** du dépôt officiel.

### Recette

L'ouverture de chaque nouvelle pull request sur le Github du DSFR-chart génère un environnement de recette sur une URL Netlify de type :
```
https://deploy-preview-[NUMERO DE LA PULL REQUEST]--dsfr-chart.netlify.app/
```

Cet environnement de recette expose le contenu du repertoire `/docs` basé sur la page (`public/index.html`) présentant l'ensemble des graphiques mis à disposition des utilisateurs du DSFR-chart. Voir la section [Déploiement d'une page de démonstration](./CONTRIBUTING.md#déploiement-dune-page-de-démonstration)
