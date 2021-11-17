# Projet Let's Be Friends

Ce projet est une API REST dont le but est de créer des évenements afin que des sutilisateurs puissent se réunir afin d'apprendre une nouvelle langue d'une manière amusante et originale.

## Stack technique Backend

-   [NodeJS](https://nodejs.org/en/download/) (v12 ou supérieure)
-   [PostgreSQL](https://www.postgresql.org/download/) (v12 ou supérieure)
-   [Sqitch](https://sqitch.org/download/) (v1 ou supérieure)
-   [Git] (https://git-scm.com/downloadss)
-   [Heroku] (https://www.heroku.com)

### Modules utilisés

-   ExpressJS
-   Dotenv
-   pg
-   Eslint
-   JOI
-   Swagger
-   JWT
-   cors
-   SocketIO(V2)
-   bcrypt
-   axios

### Outils utilisés:

-   [Pgadmin] (https://www.pgadmin.org)
-   [Insomnia] (https://www.insomnia.rest)
-   [Notion] (https://www.notion.so)
-   [Heroku] (https://www.heroku.com)

## Stack technique FrontEnd

-   [React](https://fr.reactjs.org)
-   [Redux](https://redux.js.org)
-   [SASS] (https://sass-lang.com)
-   [Jest] (https://www.jestjs.io)

### Librairies:

-   Framer Motion library
-   React Spring library
-   React leaflet
-   React Date picker
-   React Calendar
-   Slick React Caroussel

### Mudules React:

-   React Router Dom
-   React-Redux
-   Redux devtools Extension
-   Axios
-   React-leaflet
-   React reveal

Ces outils son nécéssaires à l'installation et au fonctionnement de l'API

A installer avant de continuer

## Installation coté backend

Cloner le dépot en local

```bash
git clone <url de ce dépot>
```

Puis dans le dossier local, installer les dépendances NPM

```bash
npm install
```

Enfin, créer une base de données PostgreSQL et déployer le projet sqitch dessus

```bash
createdb lbf
sqitch deploy psql -U postgres -d lbf -f data/dummyData/importFakeData.sql
```

Configurer PostgreSQL (ou fournir les variables d'environnement nécéssaires à la connexion) pour que les commandes `createdb` et `sqitch` puissent s'éxécuter correctement.

## Données de démonstration

```
sqitch deploy psql -U postgres -d lbf -f data/dummyData/importFakeData.sql
```

## Lnacement

```bash
npm start

```
