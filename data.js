/* ===== PROGRAMME OFFICIEL (DPFC) : thèmes et leçons =====
   Sources : programmes éducatifs de la DPFC (Côte d'Ivoire), version 2018-2019 :
   - Philosophie : Terminales C-D-E
   - Histoire : Terminales A-C-D (Histoire-Géographie)
   - Physique-Chimie : Terminale C
   Seuls les titres officiels sont enregistrés ici. AUCUN cours, AUCUNE question n'est inventé :
   le contenu (CONTENU) reste vide tant qu'il n'est pas vérifié, leçon par leçon.

   Pour ajouter le contenu d'une leçon, plus tard :
   CONTENU["philo:1"]={resume:"…",cartes:[{q:"…",r:"…"}],quiz:[{q:"…",o:["…","…"],a:0,e:"…"}]}
   (« philo:1 » = matière : numéro de la leçon, en comptant de 1 dans l'ordre du programme). */
window.RV_DATA=(function(){
"use strict";
function G(titre,lecons){return{titre:titre,lecons:lecons}}
var M={
  philo:{nom:"Philosophie",label:"Compétence",info:"4 compétences",
    src:"DPFC, programme éducatif de Philosophie, Terminales C-D-E (2018-2019)",
    groupes:[
      G("Les méthodologies",["La dissertation philosophique","Le commentaire de texte philosophique"]),
      G("Les conditions de la liberté",["La connaissance de l'homme","La vie en société","Dieu et la religion"]),
      G("Les conditions du progrès",["La valeur de la philosophie","Progrès et bonheur"]),
      G("Les conditions d'élaboration de la vérité",["Langage et vérité","La connaissance scientifique"])
    ]},
  histoire:{nom:"Histoire",label:"Thème",info:"3 thèmes",
    src:"DPFC, programme éducatif d'Histoire-Géographie, Terminales A-C-D (2018-2019)",
    groupes:[
      G("Les relations internationales de 1945 à nos jours",["L'ONU","L'ère de la bipolarisation de 1947 à 1991","De la fin de la guerre froide vers un monde multipolaire"]),
      G("De la décolonisation aux efforts d'organisation de l'Afrique",["La montée des nationalismes en Afrique","L'accession de la Côte d'Ivoire à l'indépendance","L'accession de l'Algérie à l'indépendance","L'Union Africaine"]),
      G("Croyances et valeurs dans le monde d'aujourd'hui",["Croyances et valeurs dominantes dans le monde occidental","Les mutations contemporaines de la civilisation négro-africaine"])
    ]},
  sciences:{nom:"Sciences physiques",label:"Thème",info:"7 thèmes",
    src:"DPFC, programme éducatif de Physique-Chimie, Terminale C (2018-2019)",
    groupes:[
      G("Mécanique",["Cinématique du point","Mouvement du centre d'inertie d'un solide","Interaction gravitationnelle","Mouvements dans les champs de pesanteur et électrostatique uniformes","Oscillations mécaniques libres"]),
      G("Électromagnétisme",["Champ magnétique","Mouvement d'une particule chargée dans un champ magnétique uniforme","Loi de Laplace","Induction électromagnétique","Auto-induction"]),
      G("Électricité",["Montages dérivateur et intégrateur","Oscillations électriques libres dans un circuit LC","Circuit RLC série en régime sinusoïdal forcé","Résonance d'intensité d'un circuit RLC série","Puissance en régime sinusoïdal"]),
      G("La lumière : onde ou particule",["Modèle ondulatoire de la lumière","Modèle corpusculaire de la lumière"]),
      G("Réactions nucléaires",["Réactions nucléaires spontanées","Réactions nucléaires provoquées"]),
      G("Chimie organique",["Les alcools","Composés carbonylés : aldéhydes et cétones","Acides carboxyliques et dérivés","Fabrication du savon"]),
      G("Chimie générale",["Solutions aqueuses – Notion de pH","Acide fort – Base forte","Acide faible – Base faible","Couples acide/base – Classification","Réactions acido-basiques – Solutions tampons","Dosage acido-basique"])
    ]}
};
var KEYS=["philo","histoire","sciences"];

/* Numérotation continue des leçons (1, 2, 3…) dans l'ordre du programme */
KEYS.forEach(function(m){
  var n=0,flat=[];
  M[m].groupes.forEach(function(g,gi){
    g.debut=n+1;
    g.lecons.forEach(function(t,k){flat.push({titre:t,g:gi,gtitre:g.titre,loc:k+1});n++});
  });
  M[m].n=n;M[m].flat=flat;
});

/* true = toutes les leçons sont ouvertes au départ (l'élève peut en verrouiller une).
   false = toutes les leçons sont verrouillées jusqu'à ce que l'élève les déclare étudiées. */
var TOUT_OUVERT=true;

/* Contenu pédagogique : vide pour l'instant (rien n'est inventé) */
var CONTENU={};
return {M:M,KEYS:KEYS,CONTENU:CONTENU,TOUT_OUVERT:TOUT_OUVERT};
})();
