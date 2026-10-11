# Révision Terminale C

Application web de révision pour les élèves de Terminale C en Côte d'Ivoire.
Programme officiel de la DPFC : Philosophie, Histoire, Sciences physiques (47 leçons, 292 questions).

## Fonctionnalités

- Leçons, flashcards, quiz par leçon et quiz aléatoire.
- Progression enregistrée dans le navigateur ; **copiée sur le compte** quand l'élève est connecté
  (elle suit l'élève d'un appareil à l'autre).
- Comptes (email et mot de passe) avec Supabase.
- Banque des anciens sujets : scan ou import d'une photo, compression, miniature, détection approximative
  des doublons, classement par matière / chapitre / année / type, 10 matières (EPS exclue).
- Validation par des modérateurs avant publication, signalement par les élèves (2 signalements retirent le document).
- Mode nuit bleu, présentation animée, bandeau défilant, bouton WhatsApp, interface responsive.

## Fonctionnement

- Sans compte : tout marche (cours, quiz), les données restent dans le navigateur.
- Avec Supabase configuré (`js/config.js`) : la banque de devoirs exige un compte ; les documents sont
  stockés dans Supabase (base + stockage privé des images, 1 Mo maximum, JPEG).
- Si `js/config.js` n'a pas d'adresse Supabase, le site retombe en mode local (documents sur l'appareil).

## Mise en place de Supabase

Tout est dans `supabase/` :
- `GUIDE.md` : les étapes pour mettre le site en ligne officiellement ;
- `migration.sql` : à exécuter dans le SQL Editor de Supabase.

La clé `sb_publishable_` du navigateur est publique. Ne place jamais de clé `sb_secret_`,
de clé `service_role` ni de mot de passe dans ce dépôt.

## Structure

```
index.html
css/   tokens, base, layout, components, archive, motion, intro, contact, banner, defil, responsive
js/    config, supabase, data, questions, store, app, quiz, archive, contact, banner, defil, compte, intro, theme
supabase/  migration.sql, GUIDE.md
```

## Lancer en local

Sers le dossier avec un petit serveur (extension Live Server de VS Code, ou `python3 -m http.server`),
puis ouvre `http://localhost:8000`. La caméra exige `localhost` ou une adresse HTTPS.

## Publier avec GitHub Pages

Settings > Pages > Deploy from a branch > `main` / `(root)`. `index.html` doit rester à la racine.

## Confidentialité

Le numéro WhatsApp de contact est public dans `js/config.js`. Les élèves sont souvent mineurs : n'affiche
jamais leur email et rappelle de ne pas publier de document avec des informations personnelles.
