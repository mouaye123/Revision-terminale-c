/* ===== CONFIGURATION : contact WhatsApp et bandeau défilant =====
   Seul fichier à modifier pour changer le numéro et les messages.

   whatsapp   : numéro au format international, SANS le + ni espaces ni tirets.
                Exemple Côte d'Ivoire : "2250102030405" (225 = indicatif, puis le numéro).
   message    : texte pré-rempli dans WhatsApp (le nom de la page est ajouté automatiquement).
   intro      : quand la présentation « Comment ça marche » s'ouvre à l'entrée :
                "premiere-visite" = une seule fois par appareil (défaut)
                "session"  = à chaque nouvelle ouverture du site
                "toujours" = à chaque chargement de la page
                "jamais"   = seulement depuis le menu
   bandeauHaut: true = affiche aussi l'ancienne bannière fixe en haut de l'accueil.
                false = seulement le bandeau défilant en bas (recommandé : mêmes messages).

   defilement : le bandeau qui défile en bas de l'écran, comme à la télévision.
     etiquette : petit mot jaune à gauche.
     vitesse   : vitesse en pixels par seconde (40 = lent, 55 = normal, 80 = rapide).
     messages  : les phrases qui défilent, l'une après l'autre, en boucle.

   supabase   : la base de données (comptes, devoirs partagés). Voir supabase/GUIDE.md.
     url     : l'adresse de ton projet, du type "https://xxxx.supabase.co"
     anonKey : la clé « anon / public » (JAMAIS la clé service_role)
     Laisse les deux vides pour rester en mode local (tout sur le téléphone).

   Attention : le numéro est visible par toute personne qui consulte le site. */
window.RV_CONFIG={
  whatsapp:"2250594402524",
  message:"Bonjour, je vous contacte depuis l'application Révision Terminale C.",
  intro:"premiere-visite",
  supabase:{
    url:"https://yhxxismzdcrlyresytvq.supabase.co",
    anonKey:"sb_publishable_2RlXX8xTx4uPBuGRECepKQ_yc3ApT4z"
  },
  bandeauHaut:false,
  defilement:{
    etiquette:"INFOS",
    vitesse:55,
    messages:[
      "Merci à la TC promotion 2025/2026 pour vos retours, vos idées et votre soutien. Ce site existe grâce à vous.",
      "Cadets, chaque leçon révisée aujourd'hui est une victoire de demain.",
      "Le bac se prépare un peu chaque jour, pas la veille.",
      "Une erreur au quiz n'est pas un échec : c'est une leçon qui se grave.",
      "Les grands de la TC ont commencé comme vous. Votre tour arrive, préparez-le.",
      "Dix minutes par jour valent mieux qu'une nuit blanche avant l'examen.",
      "Astuce : pendant un quiz, touche « On n'a pas encore vu ça » pour écarter un chapitre que ta classe n'a pas étudié.",
      "Astuce : scanne tes devoirs avec la caméra et classe-les par matière dans la banque des anciens sujets.",
      "Astuce : la lune en haut de l'écran active le mode nuit bleu."
    ]
  }
};
