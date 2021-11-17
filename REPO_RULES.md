## Architecture Repo GitHub:

[https://whimsical.com/git-architecture-JZS4TKT8crouANv8mn3Bzg](https://whimsical.com/git-architecture-JZS4TKT8crouANv8mn3Bzg)

## Convention pour un repo propre et sécu

### 1- Règles à respecter pour un maintenir un Repo BG:

- Faire attention à ne pas travailler sur les branches MASTER ou DEVELOPPEMENT
- Chaque début de session: Faire un Git Branch pour savoir où on se situe !
- Créer une nouvelle branche à chaque nouvelle Feature
- Merge sur DEV à chaque fin de journée seulement si l'ensemble de nos features sont valides et fonctionnent. Si bug/ feature non finie ou autre ⇒ commit sur la branche Feature. Vous pouvez toujours signifier via les icônes ci-dessous si vous avez besoin d'aide.
- Hydratez-vous TOUS les jours****
- En cas d'erreur et que vous voulez effacer un commit obsolète, utilisez la commande Git REVERT et NON Git RESET pour que l'on garde un historique fiable. Le Git REVERT va créer un nouveau commit annulant vos changements obsolète du commit que vous venez de faire.

### 2- Convention pour le nom du commit

Modèle:  EMOJI - FONCTIONNALITE - DESCRIPTION (type de bug, avancement, infos, ...)

EMOJI

✅: Tout fonctionne, il ne reste plus qu'à merger sur la branch Dev

🚧: Fonctionnalité toujours en cours de réalisation

🚑️: En attente d'aide d'un collègue

♻️: Refactorisation de code

💄: Ajout de styles CSS/ Améliioration de l'exp UI

💩: Code dégueu/ vite fait/ fonctionne mais à reprendre

💥: BUUUUUUG !!!!

🚚: Renommage de fichier/ dossier ⇒ Indiquer les changements dans la description

Dites moi si vous pensez à d'autres icônes/situations

💬: Update du Readme/ ajout commentaires

📱: Travail sur la partie responsive

### 3- Commandes courantes

- git branch ⇒ Affiche la liste des branches du repo en *surlignant celle où vous trouvez
- git branch feature ⇒ Vous créez une nouvelle branche Feature mais vous ne vous y trouvez pas encore
- git checkout feature ⇒ Vous passez sur la branche Feature
- git checkout -b Feature
- git clone 'SSH' ⇒ Clone le repo dans votre dossier local
- git add . ⇒ Ajouter tous les changements dans vos fichiers
- Ex ⇒  git commit -m **"✅ - NavBar - Robin - "Ajout des Boutons et du logo"**
- 

### 4- Procédures détaillées

[Procedure git pull merge](https://www.notion.so/Procedure-git-pull-merge-26448aac92364359b2684a3ef1d56b1c)

### 5- Petit descriptif du projet
As a frontend developer, i currently participate to a web application project called Let's Be friends with 4 other developer.
Following the report that there some application to make friends and other to learn a language, we decided to build a new application that combine both. With Let's be Friends, we can participate to events close to our house while learning a new language.
With a team of 3 backend and 2 frontend developpers, we realized the MVP of our project and i will be glad to show it to you !

Also, you can check my interactive resume by clicking on the following link:
https://www.robinmarien.com/


