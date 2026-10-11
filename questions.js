/* ===== QUESTIONS DE QUIZ PAR LEÇON (programme DPFC 2018-2019) =====
   Une ligne = une question :  "Question|Bonne réponse|Mauvaise 1|Mauvaise 2|Mauvaise 3|Explication"
   - la PREMIÈRE réponse est la bonne (l'ordre est mélangé automatiquement dans l'application) ;
   - on peut mettre 2 ou 3 mauvaises réponses ;
   - ne jamais écrire le caractère | dans un texte.
   Clé : "matière:numéro de la leçon" (voir js/data.js). Les flashcards sont créées à partir de ces questions. */
window.RV_Q={};
var Q=window.RV_Q;

/* ---------- PHILOSOPHIE ---------- */
Q["philo:1"]=[
"Dans une dissertation philosophique, quelle partie présente le sujet, formule le problème et annonce la démarche ?|L'introduction|La conclusion|Le développement|La bibliographie|L'introduction contextualise le sujet, pose le problème et annonce les axes d'analyse.",
"Que doit faire la conclusion d'une dissertation ?|Faire le bilan de l'analyse et répondre au problème posé|Introduire un autre sujet|Recopier l'introduction|Citer seulement des auteurs|Elle répond clairement au problème posé par le sujet.",
"Dans le développement, que sont les axes d'analyse ?|Les grandes directions de réflexion qui traitent le problème|Les titres des livres cités|Les notes de bas de page|Les définitions du dictionnaire|Chaque axe est argumenté avec des arguments et des références.",
"Que faut-il assurer à l'intérieur de chaque axe et entre les axes ?|Un enchaînement logique et progressif|Un ordre aléatoire|Une répétition de la même idée|Une liste de citations sans lien|Le programme demande d'ordonner et d'argumenter les axes d'analyse.",
"À quoi sert une « ouverture » en fin de conclusion ?|À élargir éventuellement le débat|À changer complètement de sujet|À supprimer le problème|À recopier le sujet|L'ouverture élargit le débat après avoir répondu au problème.",
"Quelle qualité est attendue de l'analyse dans une dissertation ?|Elle doit être cohérente et critique|Elle doit être courte et sans argument|Elle doit seulement raconter|Elle doit éviter tout concept|Le programme parle d'une analyse cohérente et critique."
];
Q["philo:2"]=[
"Quelles sont les parties d'un commentaire de texte philosophique ?|Introduction, étude ordonnée, intérêt philosophique, conclusion|Résumé, opinion, citation|Thèse, exemple, plan|Définition, date, auteur|Ce sont les quatre éléments du programme.",
"Que fait-on dans l'étude ordonnée ?|On explique chaque mouvement du texte en suivant sa structure logique|On donne seulement son opinion|On recopie le texte|On raconte la vie de l'auteur|On explicite idées, arguments, concepts, exemples et figures de style.",
"Que comprend l'intérêt philosophique ?|Une critique interne puis une critique externe|Un résumé du texte|Une biographie de l'auteur|Une liste de mots difficiles|Critique interne : cohérence du texte ; critique externe : confrontation à d'autres positions.",
"Que repère-t-on dans l'introduction d'un commentaire ?|Le thème, le problème, la thèse et éventuellement la structure logique|Le nombre de lignes du texte|Le nom de l'éditeur|Le style de l'imprimeur|Ces éléments sont ordonnés avant la rédaction.",
"Qu'est-ce que la critique interne ?|Juger la cohérence et la validité du texte à partir de sa démarche argumentative|Comparer le texte à d'autres auteurs|Corriger l'orthographe|Dire si le texte est agréable|On examine l'adéquation entre démarche et intention, les forces et faiblesses des arguments.",
"Que fait la critique externe ?|Elle justifie la thèse à la lumière d'autres positions ou la dépasse en montrant ses limites|Elle vérifie seulement la cohérence|Elle résume le texte|Elle donne la date du texte|Elle relie la thèse de l'auteur à d'autres pensées."
];
Q["philo:3"]=[
"Quelle notion, avec la liberté, caractérise l'homme dans cette leçon ?|La conscience|Le hasard|La force physique|L'instinct seul|La conscience est présentée comme caractéristique de l'homme.",
"L'inconscient désigne…|Une dimension psychique qui échappe à la conscience claire|Le sommeil profond uniquement|L'absence de pensée|Une maladie du corps|Il est une autre dimension de l'homme.",
"Quelle limite la leçon étudie-t-elle ?|Les limites de la conscience dans la connaissance de l'homme|L'absence de liberté dans les machines|Les limites du langage|Les limites de la technique|La conscience ne suffit pas à connaître l'homme entièrement.",
"Quelle relation la leçon établit-elle ?|Entre le déterminisme psychologique et la responsabilité de l'homme|Entre le prix et la valeur|Entre l'État et la religion|Entre le langage et la vérité|Si nos actes sont déterminés, que devient la responsabilité ?",
"Comment la nature humaine est-elle appréciée ?|Comme complexe, pluridimensionnelle|Comme simple et unique|Comme purement animale|Comme purement rationnelle|Le programme demande d'apprécier la complexité de la nature humaine.",
"Quelle notion figure aussi parmi les contenus ?|La violence|La fission|Le pH|Le flux magnétique|La conscience, l'inconscient, la liberté et la violence sont au programme."
];
Q["philo:4"]=[
"Dire que l'homme est un être social signifie…|Qu'il se réalise et se définit en relation avec les autres|Qu'il vit toujours seul|Qu'il refuse toute règle|Qu'il est toujours violent|La leçon étudie la nature sociale de l'homme.",
"Quelle distinction la leçon établit-elle ?|L'État et la Nation|Le travail et la technique|Le mythe et la raison|La foi et la science|Le programme demande de distinguer l'État de la Nation.",
"Que désigne l'État ?|L'organisation politique qui exerce l'autorité sur un territoire|Une communauté de personnes sans institutions|Un simple groupe d'amis|Une religion|La Nation est plutôt la communauté humaine unie par histoire et culture.",
"Quel rôle joue autrui dans la liberté ?|Il peut la limiter, mais aussi lui permettre de se manifester|Il n'a aucun rôle|Il la supprime toujours|Il la crée sans l'homme|La leçon montre le rôle d'autrui dans la manifestation de la liberté.",
"Que montre la leçon sur la violence ?|Son omniprésence dans l'espace social|Qu'elle n'existe pas en société|Qu'elle est toujours utile|Qu'elle concerne seulement les animaux|Elle fait partie des conditions de la liberté en société.",
"La leçon étudie la vie en société à partir de…|Ses conditions de liberté|Ses recettes de cuisine|Ses lois physiques|Ses formules chimiques|Le programme invite à apprécier les conditions de la liberté en société."
];
Q["philo:5"]=[
"Quelle notion est au cœur de cette leçon avec la religion ?|L'idée de Dieu|La technique|La connaissance scientifique|La dissertation|Le programme : connaître l'idée de Dieu et la religion.",
"Quel est un rôle social de la religion ?|Donner des repères moraux et créer du lien entre les croyants|Fabriquer des machines|Mesurer le temps|Remplacer toujours l'État|Le programme demande de montrer le rôle social de la religion.",
"Quel danger la situation d'apprentissage évoque-t-elle ?|Le fanatisme religieux et ses violences|La pollution des villes|L'inflation|La sécheresse|Elle part d'actes terroristes commis par des fanatiques.",
"Quelle relation est examinée ?|Entre Dieu, la pratique religieuse et la liberté|Entre la science et le langage|Entre le travail et le salaire|Entre l'État et l'impôt|La leçon apprécie la relation entre liberté et pratique religieuse.",
"Que signifie parler de la nature religieuse de l'homme ?|Que l'homme éprouve un besoin de croire et de se rapporter au sacré|Que tous les hommes ont la même religion|Que la religion est imposée par la loi|Que l'homme naît athée|La leçon demande d'expliquer la nature religieuse de l'homme.",
"Quel élément du programme concerne aussi la religion ?|L'obligation morale|La loi de Laplace|Le pH|La bipolarisation|L'obligation morale fait partie des contenus à connaître."
];
Q["philo:6"]=[
"Étymologiquement, « philosophie » signifie…|Amour de la sagesse|Science des étoiles|Art de bien parler|Étude des animaux|Du grec philein (aimer) et sophia (sagesse).",
"Quelle notion est étudiée avec celle de philosophie ?|La notion d'histoire|La notion de pH|La notion de flux|La notion de fission|Le programme : connaître la notion de philosophie et celle d'histoire.",
"Qui joue un rôle dans l'histoire selon la leçon ?|L'homme|Seulement le hasard|Seulement les animaux|Seulement les machines|Le programme demande de montrer le rôle de l'homme dans l'histoire.",
"Quelle question la leçon pose-t-elle ?|Quel est le rôle de la philosophie dans l'histoire ?|Comment fabriquer du savon ?|Comment calculer une période ?|Qui a signé la Charte de l'ONU ?|La leçon apprécie le rôle de la philosophie dans l'histoire.",
"Apprécier la valeur de la philosophie, c'est…|Juger son utilité et son rôle (réflexion critique sur l'humanité)|Dire qu'elle ne sert à rien|La confondre avec la religion|La réduire aux mathématiques|La philosophie est une réflexion critique sur l'humanité et son évolution."
];
Q["philo:7"]=[
"Quels sont les deux types de progrès cités ?|Le progrès matériel et le progrès spirituel|Le progrès local et national|Le progrès lent et rapide|Le progrès naturel et artificiel|La leçon montre leur rapport dans la quête du bonheur.",
"Quel rapport existe entre travail et technique ?|La technique fournit des moyens pour transformer la nature par le travail|Ils s'excluent toujours|Ils n'ont aucun lien|La technique supprime le travail dans tous les cas|Le programme demande d'expliquer les rapports entre travail et technique.",
"Que montre la leçon sur progrès matériel et spirituel ?|Leur complémentarité dans l'épanouissement de l'homme|Que seul le matériel compte|Qu'ils s'opposent toujours|Que le spirituel est inutile|C'est la complémentarité du progrès matériel et spirituel.",
"Face à l'affirmation « Le progrès conduit au bonheur », que fait-on ?|On examine les conditions du bonheur et on la discute|On l'accepte sans examen|On la refuse sans raison|On l'ignore|La classe cherche à connaître les caractéristiques du bonheur et les types de progrès.",
"Quel terme est associé aux conditions du bonheur dans le programme ?|Le développement|La soustraction|L'isolement|La pollution|Programme : Les conditions du bonheur (le développement)."
];
Q["philo:8"]=[
"Le langage est…|Un moyen d'expression et de communication de la pensée|Une preuve absolue de vérité|Un instinct sans règles|Réservé aux animaux|La leçon étudie les formes de communication et le langage.",
"Le langage articulé est…|Une forme de communication parmi d'autres|La seule forme de communication|Inutile à la vérité|Un simple bruit|La leçon distingue différentes formes de communication.",
"La vérité peut avoir plusieurs sens. Lequel est classique ?|L'accord de la pensée avec la réalité|L'opinion de la majorité seulement|Le mensonge utile|L'émotion du moment|La leçon distingue les différentes acceptions de la vérité.",
"Quelle limite du langage la leçon étudie-t-elle ?|Il ne dit pas toujours exactement le réel (mots ambigus, imprécis)|Il est parfait|Il est inutile|Il garantit toujours la vérité|Elle analyse les limites du langage dans l'expression de la vérité.",
"Que montre-t-on à propos du pouvoir du langage ?|Qu'il peut éclairer la vérité comme la déformer|Qu'il n'a aucun pouvoir|Qu'il remplace l'expérience|Qu'il est silencieux|Le programme demande d'apprécier le pouvoir du langage."
];
Q["philo:9"]=[
"Quelles formes de connaissance la leçon distingue-t-elle ?|Vulgaire, philosophique, scientifique|Chimique, physique, biologique|Orale, écrite, gestuelle|Ancienne, moderne, future|Le guide cite les connaissances vulgaire, philosophique et scientifique.",
"Comment élabore-t-on la connaissance scientifique ?|Par le raisonnement et l'expérimentation|Par la croyance seule|Par le hasard|Par l'autorité d'un chef|Le guide décrit le mode d'élaboration : raisonnement, expérimentation.",
"Quelles sciences sont dites formelles ?|Les mathématiques et la logique|La biologie et la médecine|L'histoire et la géographie|La sociologie|La leçon étudie les limites de la démarche dans les sciences formelles.",
"Quelle difficulté la démarche scientifique rencontre-t-elle avec le vivant ?|Le vivant est complexe et singulier : on ne peut tout reproduire sans le dénaturer|Il n'y a aucune difficulté|Le vivant est toujours simple|Il se mesure toujours exactement|Le programme étudie les limites de la démarche dans l'approche du vivant.",
"Pourquoi parle-t-on de limites dans les sciences humaines ?|L'homme est conscient et libre, difficile à traiter comme un simple objet d'expérience|Parce que l'homme n'existe pas|Parce que les chiffres y sont interdits|Parce que ces sciences n'existent pas|La leçon montre les limites de la démarche dans les sciences humaines."
];

/* ---------- HISTOIRE ---------- */
Q["histoire:1"]=[
"En quelle année l'ONU est-elle créée ?|1945|1919|1960|1991|La Charte de San Francisco est signée en 1945.",
"Quel est l'objectif principal de l'ONU ?|Maintenir la paix et la sécurité internationales|Imposer une religion|Créer un empire|Fixer les prix agricoles|Elle vise aussi la coopération entre les nations.",
"Quel organe compte cinq membres permanents disposant du droit de veto ?|Le Conseil de sécurité|L'Assemblée générale|Le Secrétariat|La Cour internationale de justice|Ce sont les États-Unis, la Russie, la Chine, la France et le Royaume-Uni.",
"Quand la Déclaration universelle des droits de l'homme a-t-elle été adoptée ?|1948|1945|1960|1991|Elle date du 10 décembre 1948.",
"Quelle organisation l'ONU a-t-elle remplacée ?|La Société des Nations (SDN)|L'OUA|L'OTAN|La CEDEAO|La SDN avait été créée en 1919.",
"Que signifie ONUCI ?|Opération des Nations Unies en Côte d'Ivoire|Organisation nationale unie de la Côte d'Ivoire|Office national des urgences civiles|Opération navale unie|Elle a servi de situation d'apprentissage à cette leçon."
];
Q["histoire:2"]=[
"Quels sont les deux blocs de la guerre froide ?|Le bloc de l'Ouest (capitaliste) et le bloc de l'Est (communiste)|Europe et Afrique|Nord et Sud|Allemagne et Japon|Ils sont dirigés par les États-Unis et l'URSS.",
"Quelle organisation militaire regroupe le bloc de l'Ouest ?|L'OTAN|Le Pacte de Varsovie|Le CAEM|L'OUA|L'OTAN est créée en 1949.",
"Quelle organisation militaire regroupe le bloc de l'Est ?|Le Pacte de Varsovie|L'OTAN|L'OCDE|L'UA|Le Pacte de Varsovie date de 1955.",
"La crise de Cuba a eu lieu en…|1962|1948|1975|1991|Elle est l'une des grandes crises de la guerre froide.",
"Quelle crise est liée au blocus de 1948-1949 ?|La première crise de Berlin|La crise de Cuba|La guerre du Vietnam|La crise de Suez|Le programme cite deux crises de Berlin.",
"Quel dirigeant soviétique est lié à la désagrégation du bloc de l'Est ?|Mikhaïl Gorbatchev|Joseph Staline|Fidel Castro|Charles de Gaulle|Le programme demande de faire ressortir son rôle.",
"Quelle conférence illustre la détente ?|La conférence d'Helsinki|La conférence de Berlin|La conférence de Brazzaville|La conférence de Bandung|La question du désarmement et Helsinki illustrent la coexistence pacifique."
];
Q["histoire:3"]=[
"Un monde multipolaire est…|Un monde où plusieurs pôles d'influence se partagent la puissance|Un monde dominé par une seule puissance|Un monde divisé en deux blocs|Un monde sans États|Le programme demande de définir le monde multipolaire.",
"Quelle puissance est qualifiée d'hyperpuissance entre 1991 et 2001 ?|Les États-Unis|La Chine|L'URSS|La France|Le programme parle du leadership étasunien de 1991 à 2001.",
"Quel événement de 2001 affaiblit le leadership américain selon le programme ?|Les attentats du 11 septembre 2001|La chute du mur de Berlin|La création de l'ONU|La conférence de Brazzaville|Le programme cite aussi la guerre d'Irak.",
"Que sont les BRICS ?|Un groupe de puissances émergentes (Brésil, Russie, Inde, Chine…)|Un pacte militaire de l'Est|Une monnaie africaine|Une agence de l'ONU|Le programme les cite comme forces émergentes.",
"Quel est un pôle d'influence cité par le programme ?|L'Union européenne|Le Pacte de Varsovie|La SDN|L'OUA|Le programme cite États-Unis, UE, Chine, Russie, Corée et d'autres.",
"Quels accords ont mis fin à la guerre de Yougoslavie en 1995 ?|Les accords de Dayton|Les accords d'Évian|Les accords de Cotonou|Les accords de Yalta|Le programme évoque le rôle décisif des États-Unis."
];
Q["histoire:4"]=[
"Qu'est-ce que la décolonisation ?|Le processus par lequel les colonies accèdent à l'indépendance|La conquête de colonies|Le partage de l'Afrique|La création de l'UA|C'est la notion à définir dans la leçon.",
"Quel congrès a organisé le partage de l'Afrique entre Européens ?|Le congrès de Berlin|La conférence de Brazzaville|La conférence d'Évian|Le congrès de Vienne|Il a eu lieu en 1884-1885.",
"Quel est un facteur externe de la montée des nationalismes ?|La Seconde Guerre mondiale et l'affirmation du droit des peuples (ONU)|La création de l'UA|La fin de la guerre froide|La chute du mur de Berlin|Le programme distingue facteurs internes et externes.",
"Quel est un facteur interne ?|Les abus du système colonial (travail forcé, indigénat)|La Charte de l'ONU|L'Union européenne|L'OTAN|L'injustice coloniale nourrit les revendications.",
"Quel rôle ont joué les mouvements nationalistes ?|Ils ont organisé la lutte politique pour l'indépendance|Ils ont renforcé la colonisation|Ils ont créé l'ONU|Ils ont fermé les écoles|La leçon analyse leur rôle dans le processus de décolonisation."
];
Q["histoire:5"]=[
"En quelle année la Côte d'Ivoire devient-elle indépendante ?|1960|1944|1946|1958|Elle accède à l'indépendance le 7 août 1960.",
"Quelle conférence de 1944 a annoncé des réformes dans l'empire colonial ?|La conférence de Brazzaville|La conférence de Berlin|La conférence d'Évian|La conférence de Yalta|Le programme demande d'en caractériser les résolutions.",
"Quel parti a mené la lutte politique à partir de 1946 ?|Le PDCI-RDA|Le RPR|Le FPI|Le Pacte de Varsovie|Le PDCI-RDA est fondé en 1946.",
"Qui est le premier président de la Côte d'Ivoire indépendante ?|Félix Houphouët-Boigny|Henri Konan Bédié|Laurent Gbagbo|Alassane Ouattara|Il dirige le pays dès 1960.",
"Quelle loi de 1956 élargit l'autonomie des territoires ?|La loi-cadre|La loi Veil|La loi Gayssot|La loi de Laplace|Le programme cite la loi-cadre de 1956.",
"Quel cadre proposé par la France en 1958 précède l'indépendance ?|La communauté franco-africaine|L'OUA|Le Commonwealth|La CEDEAO|Le programme demande d'apprécier la communauté franco-africaine de 1958."
];
Q["histoire:6"]=[
"En quelle année l'Algérie devient-elle indépendante ?|1962|1954|1958|1945|Elle est proclamée en juillet 1962.",
"En quelle année commence l'insurrection armée ?|1954|1962|1945|1960|Elle débute en novembre 1954.",
"Quels accords mènent au cessez-le-feu et à l'indépendance ?|Les accords d'Évian|Les accords de Dayton|Les accords de Yalta|Les accords de Cotonou|Le programme demande de les analyser.",
"Quel mouvement lance la lutte armée ?|Le FLN (Front de libération nationale)|Le RDA|L'OTAN|L'UA|Le FLN mène la guerre d'indépendance.",
"Quel dirigeant français intervient dans la sortie du conflit ?|Charles de Gaulle|Napoléon III|Jules Ferry|Louis XIV|Le programme demande d'apprécier les actions de De Gaulle.",
"Pourquoi dit-on que l'indépendance a été « conquise » ?|Parce qu'elle résulte d'une longue guerre de libération|Parce qu'elle a été offerte sans lutte|Parce qu'elle a été votée par l'ONU seule|Parce qu'elle date de 1884|C'est la remarque des journalistes dans la situation."
];
Q["histoire:7"]=[
"L'Union africaine a remplacé…|L'OUA (Organisation de l'unité africaine)|La CEDEAO|L'ONU|La SDN|La leçon étudie le passage de l'OUA à l'UA.",
"En quelle année l'UA est-elle lancée ?|2002|1963|1960|2015|Elle est lancée en 2002.",
"En quelle année l'OUA a-t-elle été créée ?|1963|1945|1960|2002|Elle est créée à Addis-Abeba.",
"Où se trouve le siège de l'UA ?|Addis-Abeba (Éthiopie)|Abidjan|Dakar|Nairobi|C'est aussi le siège historique de l'OUA.",
"Quel est un objectif de l'UA ?|Promouvoir l'unité, la paix et le développement du continent|Imposer une monnaie coloniale|Remplacer l'ONU|Organiser des guerres|Le programme demande d'expliquer ses objectifs et principes.",
"Quel organe réunit les chefs d'État et de gouvernement ?|La Conférence de l'Union|La Commission|Le Parlement panafricain|La Cour|Elle est le plus haut organe de décision."
];
Q["histoire:8"]=[
"Quel régime politique domine dans le monde occidental ?|La démocratie libérale|La monarchie absolue|Le parti unique|Le califat|Le programme demande d'analyser les grands traits de la démocratie libérale.",
"Quel système économique le caractérise ?|Le libéralisme (capitalisme)|Le communisme|Le troc|Le féodalisme|Le programme cite les fondamentaux du libéralisme économique.",
"Quelle religion domine historiquement le monde occidental ?|Le christianisme|Le bouddhisme|L'hindouisme|Le shintoïsme|La leçon évoque la domination du christianisme.",
"Que sont les syndicats et les groupes de pression ?|Des organisations qui défendent des intérêts et influencent le pouvoir|Des armées|Des partis uniques|Des tribunaux|Le programme montre leur prépondérance.",
"Quel rôle jouent les médias ?|Ils informent et diffusent des valeurs politiques, sociales et culturelles|Ils votent les lois|Ils fabriquent la monnaie|Ils n'ont aucun rôle|Le programme apprécie leur rôle dans la diffusion des valeurs."
];
Q["histoire:9"]=[
"Comment la société négro-africaine traditionnelle était-elle organisée ?|Autour de structures politiques et sociales propres et d'une économie surtout agricole|Autour de l'usine|Autour de la banque|Autour d'un parlement moderne|La leçon décrit l'organisation politique, sociale et économique.",
"Quelle cause a fortement provoqué des mutations ?|La colonisation et le contact avec l'Occident|L'isolement total|L'absence d'échanges|Le seul climat|Le programme demande d'identifier les causes des mutations.",
"Quels domaines ont été transformés ?|Politique, culturel, social et économique|Seulement le climat|Seulement la géologie|Aucun|Le programme parle des conséquences économiques, politiques, sociales et religieuses.",
"Quelle question de départ la leçon pose-t-elle ?|Les traditions africaines sont-elles encore authentiques aujourd'hui ?|Qui a gagné la guerre froide ?|Comment fonctionne l'ONU ?|Quel est le rôle des BRICS ?|Les élèves cherchent si les sociétés négro-africaines ont changé.",
"Quelle civilisation est étudiée ?|La civilisation négro-africaine|La civilisation occidentale uniquement|La civilisation romaine|La civilisation maya|C'est le thème 3, leçon 2 du programme."
];

/* ---------- SCIENCES PHYSIQUES : Thème 1 Mécanique (1-5) ---------- */
Q["sciences:1"]=[
"Quelle est l'expression du vecteur-vitesse ?|v = dOM/dt (dérivée du vecteur-position)|v = d²OM/dt²|v = OM × t|v = OM/t²|La vitesse est la dérivée du vecteur-position par rapport au temps.",
"Que caractérise un mouvement rectiligne uniforme ?|Une vitesse constante et une accélération nulle|Une accélération constante non nulle|Une vitesse nulle|Une trajectoire circulaire|Son équation horaire est x(t) = v·t + x0.",
"Pour un MRUV sans vitesse initiale (x0 = 0), x(t) = ?|(1/2)·a·t²|a·t|v·t|2·a·t²|Les équations horaires sont au programme.",
"Quelle relation lie v, a et x dans un MRUV sans vitesse initiale ?|v² = 2·a·x|v = a·x|v² = a/x|x = v²·a|C'est la relation vx² = 2ax du programme.",
"Un mobile démarre sans vitesse initiale avec a = 2 m/s². Sa vitesse après 5 s est…|10 m/s|2,5 m/s|7 m/s|25 m/s|v = a·t = 2 × 5 = 10 m/s.",
"Dans un mouvement circulaire uniforme (rayon R, vitesse angulaire ω), v = ?|R·ω|ω/R|R/ω|R·ω²|Relation v = Rω du programme.",
"L'accélération normale d'un mouvement circulaire uniforme vaut…|v²/R|v·R|R/v²|0|Elle est dirigée vers le centre de la trajectoire."
];
Q["sciences:2"]=[
"Que dit le théorème du centre d'inertie ?|La somme des forces extérieures est égale à m fois l'accélération du centre d'inertie|La somme des forces est toujours nulle|F = m/a|Le travail est toujours nul|Σ F = m·aG.",
"Quel référentiel est considéré galiléen dans ce programme ?|Le référentiel terrestre|Un manège qui accélère|Une voiture qui freine|Un train en virage|Le programme cite aussi les référentiels géocentrique et héliocentrique.",
"Un référentiel galiléen est un référentiel où…|Le principe d'inertie est vérifié|Tout corps est toujours immobile|Le temps s'arrête|La gravité est nulle|C'est la définition à connaître.",
"Le théorème de l'énergie cinétique s'écrit…|ΔEc = somme des travaux des forces extérieures|ΔEc = 0 toujours|ΔEc = m·g|Ec = F·t|Il est démontré en lien avec le théorème du centre d'inertie.",
"Dans le car qui accélère, la poupée s'incline vers l'arrière car…|Elle tend à conserver son état de mouvement par inertie|Le car l'attire par magnétisme|Son poids disparaît|Elle devient plus légère|C'est la situation d'apprentissage de la leçon.",
"Si la somme des forces extérieures est nulle (référentiel galiléen), le centre d'inertie est…|Au repos ou en mouvement rectiligne uniforme|En accélération|En rotation forcée|Toujours à l'arrêt|C'est le principe d'inertie."
];
Q["sciences:3"]=[
"Loi d'attraction universelle : F = ?|G·m·m'/d²|G·m·m'·d²|m·m'/(G·d)|G·d/(m·m')|G est la constante de gravitation.",
"Le champ de gravitation à la distance r du centre d'un astre de masse M est…|G·M/r²|G·M·r²|G·M/r|M/(G·r²)|Il décroît avec le carré de la distance.",
"Troisième loi de Kepler (orbite circulaire de rayon r) : T²/r³ = ?|4π²/(G·M)|G·M|2π/(G·M)|0|Elle permet de déterminer la masse d'une planète.",
"Un satellite géostationnaire…|Reste au-dessus d'un même point de l'équateur (période d'un jour)|Tourne en 90 minutes|Est immobile dans le référentiel héliocentrique|Se trouve au pôle Nord|Sa période est égale à celle de la Terre.",
"Quel est l'intérêt d'un satellite géostationnaire ?|Télécommunications, télévision et météo|Chauffer la Terre|Produire de l'électricité pour les maisons|Fabriquer du pétrole|La situation d'apprentissage évoque la transmission d'images.",
"L'impesanteur est…|Une situation où l'on ne ressent plus son poids (chute libre, orbite)|La disparition de la masse|L'absence de gravitation|Un champ magnétique|Le programme demande de connaître cette notion."
];
Q["sciences:4"]=[
"Un champ uniforme est un champ…|Dont le vecteur est identique en tout point (direction, sens, valeur)|Dont la valeur est nulle|Qui varie avec la position|Dont le sens s'inverse sans cesse|Le champ de pesanteur est uniforme près du sol.",
"Dans le champ de pesanteur uniforme (sans frottement), l'accélération d'un projectile est…|Égale au vecteur g|Nulle|Égale à 2g|Variable|Le mouvement est étudié par la dynamique puis la cinématique.",
"La trajectoire d'un projectile lancé avec un angle dans le champ g est…|Une parabole|Un cercle|Une droite|Une spirale|On l'obtient en éliminant le temps entre x(t) et y(t).",
"Dans un champ électrostatique uniforme E, la force sur une charge q est…|F = q·E|F = q/E|F = E/q²|F = q·E²|La force a le sens de E si q est positive.",
"Que montre un tube à déflexion ?|La déviation d'un faisceau d'électrons entre deux plaques|La chute d'une pomme|La résonance d'un circuit|La fission nucléaire|C'est la déflexion électrostatique du programme.",
"La portée d'un tir est…|La distance horizontale parcourue jusqu'au retour à la hauteur de départ|La hauteur maximale|La vitesse finale|La durée du vol|La hauteur maximale s'appelle la flèche."
];
Q["sciences:5"]=[
"Équation différentielle de l'oscillateur harmonique (pendule élastique horizontal) :|x'' + (k/m)·x = 0|x'' = k·m|x' + m·x = 0|x'' − (k/m)·x = 0|Sa solution est x = Xm·cos(ω0·t + φ).",
"Pulsation propre ω0 = ?|√(k/m)|k/m|√(m/k)|m/k|Elle découle de l'équation différentielle.",
"Période propre T0 = ?|2π·√(m/k)|2π·√(k/m)|2π·m/k|√(m/k)|T0 = 2π/ω0.",
"Que devient l'énergie mécanique d'un oscillateur harmonique non amorti ?|Elle reste constante|Elle diminue|Elle augmente|Elle est toujours nulle|Il y a échange entre énergie cinétique et potentielle élastique.",
"De quoi dépend la période propre ?|De la masse m et de la raideur k|De l'amplitude seulement|De la date de départ|De la couleur du ressort|Elle est indépendante de l'amplitude.",
"Ressort k = 100 N/m, masse m = 1 kg : T0 ≈ ?|0,63 s|6,3 s|0,1 s|1 s|T0 = 2π·√(1/100) ≈ 0,63 s."
];

/* ---------- Thème 2 Électromagnétisme (6-10) ---------- */
Q["sciences:6"]=[
"Quelle est l'unité du champ magnétique ?|Le tesla (T)|Le weber|Le henry|Le volt|Elle est à connaître.",
"Champ au centre d'un solénoïde parcouru par I : B = ?|μ0·n·I|μ0·I/n|n·I/μ0|μ0·n/I|n = N/L est le nombre de spires par mètre.",
"Que représente une ligne de champ ?|Une courbe tangente en chaque point au vecteur champ|Une courbe d'égale température|Un chemin aléatoire|Une ligne de courant seulement|L'ensemble forme le spectre magnétique.",
"À l'intérieur d'un solénoïde long, le champ magnétique est…|Uniforme|Nul|Variable aléatoirement|Perpendiculaire à l'axe|Son sens dépend du sens du courant.",
"Solénoïde de 500 spires, 0,50 m de long, I = 2 A (μ0 = 4π×10⁻⁷) : B ≈ ?|2,5×10⁻³ T|2,5×10⁻⁶ T|1,3×10⁻³ T|5×10⁻³ T|n = 1000 spires/m, donc B = 4π×10⁻⁷ × 1000 × 2.",
"Quelles composantes du champ magnétique terrestre détermine-t-on ?|Horizontale et verticale|Électrique et thermique|Nord et sud seulement|Aucune|Le programme demande de les déterminer."
];
Q["sciences:7"]=[
"Expression de la force de Lorentz :|F = q·v ∧ B (produit vectoriel)|F = q·v·B/2|F = q/(v·B)|F = m·g|Son orientation suit les règles de la main droite.",
"Si v est perpendiculaire à B (B uniforme), la trajectoire est…|Un cercle|Une droite|Une parabole|Une hélice|Le mouvement est circulaire uniforme.",
"Rayon de la trajectoire circulaire : R = ?|m·v/(q·B) (q en valeur absolue)|q·B/(m·v)|m·B/(q·v)|m·v·B/q|Il est proportionnel à la vitesse.",
"Dans ce cas, le travail de la force de Lorentz est…|Nul|Positif|Négatif|Égal à q·v·B|La force est perpendiculaire à la vitesse : la valeur de v est constante.",
"Quel appareil sépare des ions selon leur masse ?|Le spectromètre de masse|Le haut-parleur|Le transformateur|Le thermomètre|Il figure au programme.",
"À quoi sert un cyclotron ?|À accélérer des particules chargées|À mesurer la température|À fabriquer du savon|À filtrer l'eau|Il combine champ électrique et champ magnétique.",
"Le filtre de Wien (filtre de vitesses) sélectionne…|Les particules de vitesse v = E/B|Les particules de masse donnée seulement|Toutes les particules|Aucune particule|Les forces électrique et magnétique s'équilibrent."
];
Q["sciences:8"]=[
"Force de Laplace sur un conducteur de longueur L parcouru par I dans B :|F = I·L ∧ B|F = I·B/L|F = L/(I·B)|F = m·g|Sa valeur est I·L·B·sin α.",
"Valeur maximale de F pour un conducteur perpendiculaire à B :|I·L·B|0|I·L/B|I·B/L|Quand sin α = 1.",
"Quel appareil mesure B grâce à la force de Laplace ?|La balance de Cotton|Le thermomètre|Le voltmètre|Le chronomètre|Il figure au programme.",
"Le haut-parleur fonctionne grâce à…|La force de Laplace sur une bobine placée dans un champ magnétique|L'effet photoélectrique|La radioactivité|L'estérification|Le programme demande d'expliquer son fonctionnement.",
"L = 0,10 m, I = 5 A, B = 0,20 T, conducteur perpendiculaire à B : F = ?|0,10 N|1,0 N|0,010 N|10 N|F = 5 × 0,10 × 0,20.",
"La roue de Barlow est…|Mise en rotation par la force de Laplace (moteur simple)|Un instrument de mesure de la masse|Une source lumineuse|Un détecteur de radioactivité|Elle est traitée en exercice."
];
Q["sciences:9"]=[
"Flux magnétique d'un champ uniforme à travers une surface plane S :|Φ = B·S·cos α|Φ = B/S|Φ = B + S|Φ = B·S²|α est l'angle entre B et la normale à la surface.",
"Quelle est l'unité de flux magnétique ?|Le weber (Wb)|Le tesla|Le henry|Le farad|Elle est à connaître.",
"Loi de Faraday-Lenz : la f.é.m. induite est…|e = −dΦ/dt|e = Φ·t|e = −Φ/t²|e = dB|Le signe traduit la loi de Lenz.",
"Que dit la loi de Lenz ?|Le courant induit s'oppose par ses effets à la cause qui lui donne naissance|Le courant induit amplifie la cause|Le courant induit est toujours nul|Le courant induit est toujours continu|Elle donne le sens du courant induit.",
"Quel appareil fonctionne grâce à l'induction ?|Le transformateur|Le thermomètre à mercure|Le baromètre|Le cadran solaire|Le programme cite aussi courants de Foucault et microphone électrodynamique.",
"Pour un transformateur idéal, Us/Up = ?|Ns/Np|Np/Ns|Ns·Np|Ns − Np|Elle est établie expérimentalement.",
"Comment les alternateurs produisent-ils l'électricité ?|Par variation de flux : rotation d'un aimant ou d'une bobine|Par fission d'un aimant|Par réaction chimique|Par combustion directe|C'est le principe de la production dans les centrales."
];
Q["sciences:10"]=[
"Flux propre d'une bobine d'inductance L parcourue par i :|Φp = L·i|Φp = i/L|Φp = L/i|Φp = L·i²|C'est l'expression Φp = L·i du programme.",
"Tension aux bornes d'une bobine (résistance négligeable) :|u = L·di/dt|u = L·i|u = i/L|u = L/i|La f.é.m. d'auto-induction est e = −L·di/dt.",
"Énergie magnétique emmagasinée dans une bobine :|(1/2)·L·i²|L·i|(1/2)·L·i|2·L·i²|Elle est à connaître.",
"Quelle est l'unité d'inductance ?|Le henry (H)|Le farad|Le tesla|Le weber|Le programme demande de la connaître.",
"Pourquoi une lampe fluorescente peut-elle s'allumer avec retard ?|L'auto-induction de la bobine s'oppose à l'établissement du courant|La lampe est froide|La gravitation la ralentit|La radioactivité la retarde|C'est la situation d'apprentissage.",
"Énergie d'une bobine L = 0,2 H parcourue par i = 3 A :|0,9 J|0,6 J|1,8 J|0,3 J|E = 0,5 × 0,2 × 3² = 0,9 J."
];

/* ---------- Thème 3 Électricité (11-15) ---------- */
Q["sciences:11"]=[
"Pour un amplificateur opérationnel idéal en régime linéaire, la tension différentielle est…|Nulle|Infinie|Égale à la tension d'alimentation|Toujours positive|C'est l'une de ses caractéristiques.",
"Les courants d'entrée d'un AO idéal sont…|Nuls|Infinis|Égaux entre eux et non nuls|Variables|Son impédance d'entrée est infinie.",
"Un montage dérivateur délivre us(t) =|−R·C·due/dt|−(1/RC)·∫ue dt|R·C·ue|ue/(R·C)|Il dérive la tension d'entrée.",
"Un montage intégrateur délivre us(t) =|−(1/RC)·∫ue dt|−R·C·due/dt|R·C·ue|ue·R/C|Il intègre la tension d'entrée.",
"Un signal triangulaire envoyé sur un dérivateur donne…|Un signal rectangulaire (créneaux)|Un signal triangulaire|Une tension nulle|Une sinusoïde amplifiée|La dérivée d'une droite est une constante.",
"Un signal en créneaux envoyé sur un intégrateur donne…|Un signal triangulaire|Un signal en créneaux|Une sinusoïde|Une tension nulle|L'intégrale d'une constante est une droite."
];
Q["sciences:12"]=[
"Équation différentielle d'un circuit LC idéal (charge q) :|q'' + q/(L·C) = 0|q'' = L·C·q|q' + L·C = 0|q'' − q/(L·C) = 0|C'est celle d'un oscillateur harmonique.",
"Période propre d'un circuit LC :|T0 = 2π·√(L·C)|T0 = 2π/√(L·C)|T0 = √(L·C)|T0 = 2π·L·C|La pulsation propre est ω0 = 1/√(LC).",
"Énergie totale d'un circuit LC idéal :|Constante|Nulle|Décroissante|Croissante|Elle passe de la bobine au condensateur et inversement.",
"Quelle analogie avec l'oscillateur mécanique ?|L ↔ m, 1/C ↔ k, q ↔ x|L ↔ k, C ↔ m|R ↔ k|q ↔ m|Le programme demande d'établir cette analogie.",
"L = 0,1 H et C = 10 µF : T0 ≈ ?|6,3 ms|63 ms|0,63 s|0,63 ms|√(0,1 × 10⁻⁵) = 10⁻³, donc T0 = 2π × 10⁻³ s.",
"Que provoque la résistance interne de la bobine ?|Un amortissement des oscillations (effet Joule)|Un entretien des oscillations|Un doublement de la fréquence|La disparition de la charge|Il faut compenser les pertes pour entretenir.",
"À quoi sert le montage à « résistance négative » avec AO ?|À entretenir les oscillations|À éteindre le circuit|À charger une pile|À mesurer la température|Le générateur auxiliaire compense la résistance."
];
Q["sciences:13"]=[
"Impédance d'un dipôle RLC série :|Z = √(R² + (Lω − 1/(Cω))²)|Z = R + L + C|Z = R·L·C|Z = √(R² + L² + C²)|La loi d'Ohm en efficace s'écrit U = Z·I.",
"Relation entre tension maximale et efficace (sinusoïdal) :|Umax = U·√2|Umax = U/√2|Umax = 2U|Umax = U²|Même relation pour les intensités.",
"Déphasage de u par rapport à i : tan φ = ?|(Lω − 1/(Cω))/R|R/(Lω − 1/(Cω))|Lω·Cω|R·Lω|Il est déduit de la construction de Fresnel.",
"Que représente la construction de Fresnel ?|Une représentation vectorielle des tensions du circuit RLC série|Un graphe de température|Un schéma d'amplificateur|Une carte géographique|Elle permet d'obtenir Z et φ.",
"Une tension efficace de 220 V correspond à une valeur maximale d'environ…|311 V|220 V|155 V|440 V|220 × √2 ≈ 311 V.",
"Quelle est la période d'un courant de fréquence 50 Hz ?|0,02 s|0,05 s|0,5 s|50 s|T = 1/N = 1/50."
];
Q["sciences:14"]=[
"Fréquence de résonance d'un circuit RLC série :|N0 = 1/(2π·√(L·C))|N0 = 2π·√(L·C)|N0 = √(L·C)|N0 = 1/(L·C)|C'est la fréquence propre du circuit.",
"À la résonance d'intensité, l'impédance Z vaut…|R (valeur minimale)|Une valeur infinie|Lω|0|L'intensité est alors maximale.",
"À la résonance d'intensité, le déphasage entre u et i est…|Nul|π/2|π|−π/2|Le circuit se comporte comme une résistance.",
"Le facteur de qualité est…|Q = L·ω0/R, et à la résonance UC = Q·U|Q = R/(L·ω0)|Q = R·C|Q = U/UC|Il mesure la sélectivité.",
"Une bande passante étroite signifie…|Un circuit sélectif (facteur de qualité élevé)|Un circuit peu sélectif|Une tension nulle|Un court-circuit|Q = N0/ΔN.",
"Que signifie le phénomène de surtension ?|UC et UL peuvent dépasser la tension du générateur|Le générateur double sa tension|Il n'y a aucun effet|L'intensité devient nulle|À la résonance, UC = UL = Q·U.",
"Quelle application de la résonance en électronique ?|Le choix d'une station radio par un circuit accordé|Le thermomètre|La pile|L'ampoule|La situation d'apprentissage évoque la radio FM."
];
Q["sciences:15"]=[
"Puissance moyenne d'un dipôle RLC série :|P = U·I·cos φ|P = U·I·sin φ|P = U/I|P = U·I·tan φ|U et I sont des valeurs efficaces.",
"Le facteur de puissance est…|cos φ|sin φ|tan φ|φ|Il est compris entre 0 et 1.",
"Puissance moyenne consommée par une bobine idéale ou un condensateur idéal :|Nulle|Maximale|Égale à U·I|Égale à R·I|Le déphasage vaut ±π/2 donc cos φ = 0.",
"Pourquoi transporter l'électricité sous haute tension ?|Pour réduire les pertes par effet Joule dans les lignes|Pour augmenter l'intensité|Pour consommer plus|Pour chauffer les fils|À puissance égale, une tension plus élevée donne une intensité plus faible.",
"Une installation absorbe I = 10 A sous U = 220 V avec cos φ = 0,8. P = ?|1760 W|2200 W|1100 W|2750 W|P = 220 × 10 × 0,8.",
"Un faible facteur de puissance entraîne…|Un courant plus fort pour la même puissance utile, donc plus de pertes|Moins de pertes|Aucun effet|Une tension nulle|D'où l'intérêt d'un bon facteur de puissance."
];

/* ---------- Thème 4 La lumière : onde ou particule (16-17) ---------- */
Q["sciences:16"]=[
"La diffraction de la lumière se produit lorsque…|L'ouverture ou l'obstacle a une taille comparable à la longueur d'onde|La lumière est absente|Le vide est parfait|La source est sonore|On l'observe avec un trou, une fente ou un réseau.",
"Quelle expérience met en évidence les interférences lumineuses ?|Les fentes d'Young|L'expérience de Rutherford|Le tube de Crookes|La balance de Cotton|Les trous d'Young conduisent aussi aux interférences.",
"Relation entre longueur d'onde λ, célérité c et fréquence ν :|λ = c/ν|λ = c·ν|λ = ν/c|λ = c + ν|Elle est valable pour toute onde électromagnétique.",
"Quelle est environ la vitesse de la lumière dans le vide ?|3×10⁸ m/s|3×10⁵ m/s|3×10³ m/s|3×10¹² m/s|Elle est notée c.",
"Quel rayonnement a la plus petite longueur d'onde ?|Les rayons gamma|Les ondes hertziennes|L'infrarouge|La lumière visible|Les ondes hertziennes ont les plus grandes longueurs d'onde.",
"Interférence constructive : la différence de marche δ vaut…|k·λ (k entier)|(k + 1/2)·λ|0 seulement|λ/4|Pour une interférence destructive : (k + 1/2)·λ.",
"Fréquence ν = 5×10¹⁴ Hz (lumière visible) : λ ≈ ?|600 nm|60 nm|6 µm|0,6 m|λ = 3×10⁸ / 5×10¹⁴ = 6×10⁻⁷ m."
];
Q["sciences:17"]=[
"Énergie d'un photon de fréquence ν :|E = h·ν|E = h/ν|E = ν/h|E = h·ν²|C'est la relation de Planck-Einstein.",
"Que montre l'effet photoélectrique ?|La lumière arrache des électrons à un métal : aspect corpusculaire|La lumière est seulement une onde|Le métal fond|L'eau se décompose|Il est expliqué par la théorie des quanta.",
"Niveaux d'énergie de l'atome d'hydrogène :|En = −13,6/n² (en eV)|En = 13,6·n² eV|En = −13,6·n eV|En = n/13,6 eV|Le niveau fondamental correspond à n = 1.",
"Énergie d'ionisation de l'hydrogène (état fondamental) :|13,6 eV|1,36 eV|136 eV|0 eV|C'est l'énergie pour arracher l'électron.",
"Un atome émet un photon lorsque…|Il passe d'un niveau d'énergie supérieur à un niveau inférieur|Il passe à un niveau supérieur|Il perd son noyau|Il est au repos|Le photon a l'énergie E = Ep − En = h·ν.",
"Un spectre d'émission est constitué de…|Raies lumineuses sur fond noir|Raies noires sur fond coloré|Une bande continue seulement|Une couleur unique toujours|Le spectre d'absorption présente des raies noires."
];

/* ---------- Thème 5 Réactions nucléaires (18-19) ---------- */
Q["sciences:18"]=[
"Le nombre de masse A d'un noyau est égal à…|Z + N (protons + neutrons)|Z − N|N seul|Z seul|Z est le nombre de charge.",
"Que sont des isotopes ?|Des noyaux de même Z et de nombre de masse A différent|Des noyaux de même A et de Z différent|Des noyaux de même nombre de neutrons|Des atomes sans électrons|Ils appartiennent au même élément chimique.",
"Loi de décroissance radioactive :|N(t) = N0·e^(−λt)|N = N0 + λt|N = N0/t|N = λ·t|λ est la constante radioactive.",
"Relation entre période T et constante radioactive λ :|T = ln 2/λ|T = λ/ln 2|T = λ·ln 2|T = 1/λ²|La période est la durée au bout de laquelle la moitié des noyaux a disparu.",
"Le rayonnement α est constitué de…|Noyaux d'hélium|Électrons|Photons|Neutrons|Les particules β sont des électrons ou positons.",
"Une substance a une période de 8 jours. Quelle fraction reste après 24 jours ?|1/8|1/4|1/2|1/16|24 jours = 3 périodes, donc (1/2)³.",
"À quoi sert la datation au carbone 14 ?|À déterminer l'âge de vestiges organiques|À mesurer la température|À produire de l'électricité|À fabriquer du savon|C'est l'application citée au programme."
];
Q["sciences:19"]=[
"Le défaut de masse est…|La différence entre la masse des nucléons séparés et celle du noyau|La masse du noyau seule|Une perte d'électrons|La masse d'un neutron|Δm = Σ masses des nucléons − m(noyau).",
"Énergie de liaison :|Eℓ = Δm·c²|Eℓ = Δm/c²|Eℓ = Δm·c|Eℓ = m·c|Elle est exprimée en MeV.",
"La fission nucléaire consiste à…|Casser un noyau lourd en noyaux plus légers|Réunir des noyaux légers|Émettre un électron|Chauffer l'eau|Exemple : fission de l'uranium 235.",
"La fusion nucléaire consiste à…|Réunir deux noyaux légers en un noyau plus lourd|Casser un noyau lourd|Disperser des électrons|Refroidir un noyau|Elle a lieu au cœur du Soleil.",
"Où la fusion a-t-elle lieu naturellement ?|Au cœur du Soleil|Dans une centrale à fission|Dans une pile électrique|Dans l'eau de mer|Des températures très élevées sont nécessaires.",
"Quel danger de la radioactivité figure au programme ?|Les irradiations et les déchets radioactifs|La surpêche|Le bruit|La déforestation|La situation évoque les fuites de la centrale de Fukushima.",
"Quelle est une application de la radioactivité ?|La médecine (traitement, imagerie), l'industrie, la datation|La fabrication du savon|L'éclairage fluorescent|Le dosage acido-basique|Le programme demande de les connaître."
];

/* ---------- Thème 6 Chimie organique (20-23) ---------- */
Q["sciences:20"]=[
"Quel est le groupe fonctionnel d'un alcool ?|Le groupe hydroxyle −OH sur un carbone saturé|Le groupe carboxyle −COOH|Le groupe carbonyle C=O|Le groupe amino −NH2|Le carbone qui porte −OH est le carbone fonctionnel.",
"Formule générale d'un alcool saturé :|CnH2n+1OH|CnH2nO2|CnH2n+2|CnH2n−1OH|Exemple : l'éthanol C2H5OH.",
"Dans un alcool primaire, le carbone fonctionnel est lié à…|Au plus un atome de carbone|Deux atomes de carbone|Trois atomes de carbone|Aucun hydrogène|Secondaire : deux carbones ; tertiaire : trois carbones.",
"L'oxydation ménagée d'un alcool primaire (oxydant en défaut) donne…|Un aldéhyde|Une cétone|Un alcène|Un éther|Avec un excès d'oxydant, on peut aller jusqu'à l'acide carboxylique.",
"L'oxydation ménagée d'un alcool secondaire donne…|Une cétone|Un aldéhyde|Un acide carboxylique|Aucune réaction|Le programme demande d'écrire ces équations.",
"Un alcool tertiaire subit-il l'oxydation ménagée ?|Non|Oui, en aldéhyde|Oui, en cétone|Oui, en acide|Son carbone fonctionnel ne porte pas d'hydrogène.",
"La déshydratation intramoléculaire d'un alcool donne…|Un alcène|Un éther|Une cétone|Un acide|La déshydratation intermoléculaire donne un éther.",
"Quel est le nom de CH3−CH2−OH ?|Éthanol|Méthanol|Propan-1-ol|Éthanal|Le programme demande de nommer quelques alcools."
];
Q["sciences:21"]=[
"Quel est le groupe carbonyle ?|C=O|−OH|−COOH|−NH2|Il caractérise aldéhydes et cétones.",
"Dans un aldéhyde, le groupe carbonyle est…|En bout de chaîne (carbone lié à au moins un H)|Au milieu de la chaîne entre deux carbones|Lié à un OH|Sans oxygène|Dans une cétone, il est lié à deux carbones.",
"Quel test est commun aux aldéhydes et aux cétones ?|La DNPH (précipité jaune-orangé)|La liqueur de Fehling|Le réactif de Tollens|Le papier pH|Les tests spécifiques des aldéhydes sont Tollens, Fehling et Schiff.",
"Quel réactif distingue un aldéhyde d'une cétone ?|La liqueur de Fehling (précipité rouge brique)|La DNPH|L'eau de chaux|Le papier pH|Seuls les aldéhydes réagissent : ils sont réducteurs.",
"Quel est le nom de CH3−CO−CH3 ?|Propanone|Propanal|Propan-2-ol|Acide propanoïque|C'est la cétone la plus simple.",
"Le caractère réducteur des aldéhydes se traduit par…|Leur oxydation en acide carboxylique|Leur réduction en cétone|Leur déshydratation|Leur combustion|Les ions Ag⁺ ou Cu²⁺ sont réduits."
];
Q["sciences:22"]=[
"Quel est le groupe carboxyle ?|−COOH|−CHO|−OH|−CO−|Il caractérise les acides carboxyliques.",
"Alcool + acide carboxylique donnent…|Un ester et de l'eau|Un aldéhyde|Un sel et un gaz|Un alcène|C'est l'estérification.",
"Caractéristiques de l'estérification :|Lente et limitée (équilibre avec l'hydrolyse)|Rapide et totale|Impossible|Explosive|La composition à l'équilibre se détermine à partir des courbes.",
"Quel dérivé permet d'obtenir un ester par une réaction rapide et totale ?|Le chlorure d'acyle|L'eau|L'éthanol|Le sodium|Un anhydride d'acide convient aussi.",
"Quel est le groupe fonctionnel d'un amide ?|−CO−NH2 (ou −CO−N<)|−COOH|−CHO|−OH|Le programme demande de les nommer.",
"Quel est le nom de CH3−COOH ?|Acide éthanoïque|Acide méthanoïque|Éthanal|Éthanol|C'est l'acide du vinaigre.",
"Comment appelle-t-on la réaction inverse de l'estérification ?|L'hydrolyse|La saponification|La combustion|La neutralisation|Elle est aussi lente et limitée."
];
Q["sciences:23"]=[
"Qu'est-ce que la saponification ?|L'action d'une base forte sur un corps gras (triester) pour former un savon et du glycérol|L'action d'un acide sur un alcool|La combustion d'une huile|L'oxydation de l'éthanol|C'est la réaction de fabrication du savon.",
"Quels produits obtient-on ?|Un savon (carboxylate de sodium ou potassium) et du glycérol|Un ester et de l'eau|Un aldéhyde et de l'eau|Un alcool et du CO2|Le savon est un sel d'acide gras.",
"Caractéristiques de la saponification :|Lente et totale|Rapide et limitée|Impossible|Réversible|Elle se fait en chauffant avec la soude ou la potasse.",
"À quoi sert le relargage ?|À précipiter le savon avec une solution saturée de chlorure de sodium|À dissoudre le savon|À brûler le savon|À ajouter un acide|Le savon est peu soluble dans l'eau salée.",
"Formule générale d'un savon :|R−COO⁻ Na⁺ (ou K⁺)|R−COOH|R−CO−R'|R−OH|La chaîne carbonée est celle d'un acide gras.",
"Quel savon est dur ?|Le savon sodique (obtenu avec la soude)|Le savon potassique|Le savon sans base|Aucun|Le savon potassique est plutôt mou.",
"La palmitine ou la butyrine sont des…|Triesters du glycérol (triglycérides)|Acides|Alcools simples|Sels minéraux|Elles figurent au programme."
];

/* ---------- Thème 7 Chimie générale (24-29) ---------- */
Q["sciences:24"]=[
"Produit ionique de l'eau à 25 °C :|Ke = [H3O+]·[OH−] = 10⁻¹⁴|Ke = 10⁻⁷|Ke = 14|Ke = [H3O+]/[OH−]|Il découle de l'autoprotolyse de l'eau.",
"Définition du pH :|pH = −log [H3O+]|pH = log [H3O+]|pH = [H3O+]|pH = 14·[H3O+]|Elle est valable pour des solutions diluées.",
"Une solution neutre à 25 °C a un pH égal à…|7|0|14|1|Alors [H3O+] = [OH−] = 10⁻⁷ mol/L.",
"Si [H3O+] = 10⁻³ mol/L, le pH vaut…|3|−3|11|0,003|pH = −log(10⁻³) = 3.",
"Une solution de pH = 9 est…|Basique|Acide|Neutre|Impossible|Le pH est supérieur à 7 à 25 °C.",
"Que traduit l'électroneutralité d'une solution ?|La somme des charges positives est égale à celle des charges négatives|La masse est nulle|Le volume est constant|[H3O+] vaut zéro|Elle sert à calculer des concentrations.",
"Quelle est l'équation de l'autoprotolyse de l'eau ?|2 H2O ⇌ H3O⁺ + OH⁻|H2O → H2 + O2|H2O + Na → NaOH|H2O → H⁺ seulement|Le programme demande de l'écrire."
];
Q["sciences:25"]=[
"Un acide fort dans l'eau…|Réagit totalement avec l'eau (ionisation totale)|Réagit partiellement|Ne réagit pas|Produit seulement des ions OH⁻|C'est le cas du chlorure d'hydrogène.",
"pH d'une solution de HCl de concentration 10⁻² mol/L :|2|12|−2|0,01|pH = −log C = 2.",
"pH d'une solution de NaOH à 10⁻² mol/L (25 °C) :|12|2|7|14|pH = 14 + log C = 14 − 2.",
"Relation pour un monoacide fort :|pH = −log C|pH = 14 + log C|pH = C|pH = log C|Elle a des limites de validité (solutions diluées).",
"Relation pour une monobase forte :|pH = 14 + log C|pH = −log C|pH = 7 − C|pH = C|À 25 °C et pour une solution diluée.",
"On mélange des volumes égaux de HCl 0,1 mol/L et NaOH 0,1 mol/L. Le mélange est…|Neutre (pH = 7)|Acide|Basique|Impossible|Les quantités sont dans les proportions stœchiométriques.",
"Lequel est un monoacide fort ?|HCl|CH3COOH|NH3|CO2|HCl est cité comme exemple."
];
Q["sciences:26"]=[
"Un acide faible dans l'eau…|Réagit partiellement avec l'eau (équilibre)|Réagit totalement|Ne contient aucun proton|Est un acide fort dilué|Sa réaction avec l'eau est limitée.",
"Quel est un exemple d'acide faible ?|L'acide éthanoïque CH3COOH|HCl|HNO3|NaOH|Il figure dans la situation d'apprentissage.",
"Quel est un exemple de base faible ?|L'ammoniac NH3|NaOH|KOH|HCl|La soude est une base forte.",
"Quand on dilue un acide faible, son coefficient d'ionisation…|Augmente|Diminue|Reste nul|Devient infini|Le programme demande d'expliquer l'effet de la dilution.",
"À concentration égale, le pH d'un acide faible est, par rapport à un acide fort…|Plus grand|Plus petit|Identique|Négatif|Un acide faible libère moins d'ions H3O⁺.",
"Équation de l'acide éthanoïque avec l'eau :|CH3COOH + H2O ⇌ CH3COO⁻ + H3O⁺|CH3COOH + H2O → CH3COO⁻ + H3O⁺ (totale)|CH3COOH → CH4 + CO2|CH3COOH + H2O → CH3OH + HCOOH|La double flèche traduit l'équilibre."
];
Q["sciences:27"]=[
"Selon Brönsted, un acide est une espèce capable de…|Céder un proton H⁺|Capturer un proton|Céder un électron seulement|Absorber de l'eau|Une base capture un proton.",
"Comment écrit-on un couple acide/base ?|AH/A⁻|A/B|H⁺/OH⁻|acide/sel|Exemple : CH3COOH/CH3COO⁻.",
"Constante d'acidité du couple AH/A⁻ :|KA = [A⁻]·[H3O⁺]/[AH]|KA = [AH]/([A⁻]·[H3O⁺])|KA = [A⁻]/[AH]|KA = [H3O⁺]/[A⁻]|Elle ne dépend que de la température.",
"Relation entre pKA et KA :|pKA = −log KA|pKA = log KA|pKA = 1/KA|pKA = KA/10|Plus KA est grand, plus pKA est petit.",
"Si pH < pKA, l'espèce prédominante est…|L'acide AH|La base A⁻|Aucune|Les deux à parts égales|Le programme demande les domaines de prédominance.",
"Plus le KA d'un couple est grand,…|Plus l'acide est fort|Plus l'acide est faible|Plus le pKA est grand|Aucun effet|Le classement des couples repose sur les pKA.",
"Que délimite la zone de virage d'un indicateur coloré ?|Le domaine de pH où l'indicateur change de teinte|Le pH du vinaigre|Une zone de température|La concentration du titrant|Elle encadre en général le pKA de l'indicateur."
];
Q["sciences:28"]=[
"Que signifie l'équivalence acido-basique ?|Acide et base sont mélangés dans les proportions stœchiométriques|Le pH vaut toujours 7|Il n'y a plus d'eau|La base est en excès|Elle se repère par un saut de pH.",
"pH à l'équivalence (acide fort + base forte, 25 °C) :|7|Supérieur à 7|Inférieur à 7|0|Le mélange est neutre.",
"pH à l'équivalence (acide faible + base forte) :|Supérieur à 7|7|Inférieur à 7|0|La base conjuguée de l'acide faible est présente.",
"pH à l'équivalence (acide fort + base faible) :|Inférieur à 7|Supérieur à 7|7|14|L'acide conjugué de la base faible est présent.",
"Qu'est-ce qu'une solution tampon ?|Une solution dont le pH varie peu par ajout modéré d'acide ou de base ou par dilution|Une solution de pH nul|Une solution d'acide fort concentré|De l'eau pure|Elle protège contre les variations de pH.",
"Un mélange équimolaire d'un acide faible et de sa base conjuguée a un pH égal à…|pKA|7|0|14|C'est une méthode de préparation d'une solution tampon.",
"Pour un dosage pH-métrique, on trace…|La courbe pH = f(volume versé)|La courbe T = f(temps)|La courbe I = f(U)|La courbe N = f(t)|On l'exploite pour trouver l'équivalence."
];
Q["sciences:29"]=[
"À l'équivalence d'un dosage monoacide/monobase, CA·VA = ?|CB·VB,E|CB/VB|VA/CB|0|Les quantités de matière sont égales.",
"Qu'est-ce qu'un dosage ?|Déterminer la concentration d'une espèce grâce à une réaction totale avec un réactif de concentration connue|Mesurer une température|Filtrer un mélange|Évaporer un solvant|Le programme demande de connaître le principe.",
"20 mL de vinaigre dilué dosés par NaOH 0,1 mol/L : équivalence à 15 mL. CA = ?|0,075 mol/L|0,13 mol/L|1,5 mol/L|0,015 mol/L|CA = 0,1 × 15 / 20.",
"Pourquoi choisit-on bien l'indicateur coloré ?|Sa zone de virage doit contenir le pH à l'équivalence|Il doit être incolore|Il doit être toxique|Le choix n'a pas d'importance|Il permet de repérer l'équivalence.",
"Le vinaigre contient essentiellement…|De l'acide éthanoïque|De l'acide sulfurique|De l'ammoniac|De la soude|Le dosage colorimétrique du vinaigre est au programme.",
"Quel indicateur convient pour doser le vinaigre par la soude ?|La phénolphtaléine (virage vers 8,2 à 10)|L'hélianthine (virage vers 3,1 à 4,4)|Aucun indicateur|Le papier pH seulement|Le pH à l'équivalence est supérieur à 7."
];

/* ---------- Construction du contenu (flashcards + quiz) ---------- */
(function(){
"use strict";
var D=window.RV_DATA;
function melange(a){for(var i=a.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1)),t=a[i];a[i]=a[j];a[j]=t}return a}
Object.keys(Q).forEach(function(k){
  var items=Q[k].map(function(s){
    var p=s.split("|"),bonne=p[1],opts=melange(p.slice(1,p.length-1));
    return{q:p[0],o:opts,a:opts.indexOf(bonne),e:p[p.length-1]};
  });
  D.CONTENU[k]={
    resume:"Révise avec les "+items.length+" flashcards, puis teste-toi avec le quiz de la leçon. Les questions suivent le programme éducatif de la DPFC (2018-2019).",
    cartes:items.map(function(x){return{q:x.q,r:x.o[x.a]+". "+x.e}}),
    quiz:items
  };
});
})();
