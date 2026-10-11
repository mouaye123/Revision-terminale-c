/* ===== PRÉSENTATION ANIMÉE =====
   S'ouvre à la première visite, et à tout moment via le menu « Comment ça marche ».
   Navigation : bouton Suivant, glissement du doigt, flèches du clavier. Echap ou « Passer » pour fermer. */
(function(){
"use strict";
var K="rv-intro-vu",ov=null,piste=null,idx=0,avant=null,x0=null;
function vu(){try{return localStorage.getItem(K)==="1"}catch(e){return false}}
function marquer(){try{localStorage.setItem(K,"1")}catch(e){}try{sessionStorage.setItem(K,"1")}catch(e){}}
function vuSession(){try{return sessionStorage.getItem(K)==="1"}catch(e){return false}}

var SL=[
  {c:"var(--bleu)",k:"Bienvenue",
   t:"Révise ce que tu as <span class=\"stab\">vu en classe</span>",
   p:"Le programme officiel de la DPFC pour la Terminale C, leçon par leçon : Philosophie, Histoire et Sciences physiques.",
   v:"<div class=\"v1\"><span class=\"note\">Terminale C</span><b class=\"p philo\">Philosophie</b><b class=\"p histoire\">Histoire</b><b class=\"p sciences\">Sciences physiques</b></div>"},
  {c:"var(--sciences)",k:"Étape 1",
   t:"Choisis une leçon",
   p:"Chaque matière suit l'ordre du programme. Tu peux verrouiller une leçon que tu n'as pas encore étudiée en classe.",
   v:"<ul class=\"v2 sciences\"><li><span class=\"pastille\">1</span>Cinématique du point</li><li><span class=\"pastille\">2</span>Mouvement du centre d'inertie d'un solide</li><li><span class=\"pastille\">3</span>Interaction gravitationnelle</li></ul>"},
  {c:"var(--philo)",k:"Étape 2",
   t:"Retiens, puis teste-toi",
   p:"Retourne les flashcards pour retenir. Le quiz corrige et explique chaque réponse. Le quiz aléatoire pioche dans toutes tes leçons.",
   v:"<div class=\"v3 philo\"><div class=\"fc\"><div class=\"in\"><div class=\"f\"><span class=\"note\">Question</span><b>Quelle est la période propre d'un circuit LC ?</b></div><div class=\"f d\"><span class=\"note\">Réponse</span><b>T0 = 2π·√(L·C)</b></div></div></div><div class=\"puces\"><span class=\"chip\">Flashcards</span><span class=\"chip\">Quiz</span><span class=\"chip\">Quiz aléatoire</span></div></div>"},
  {c:"var(--histoire)",k:"Étape 3",
   t:"Garde tes devoirs",
   p:"Scanne un devoir avec la caméra ou importe une photo, puis classe-le par matière, chapitre et année dans la banque des anciens sujets. Le partage avec les autres élèves arrive bientôt.",
   v:"<div class=\"v4 histoire\"><div class=\"feuille\"><i></i><i></i><i></i><i></i><i></i><span class=\"scan\"></span><span class=\"coin a\"></span><span class=\"coin b\"></span><span class=\"coin c\"></span><span class=\"coin d\"></span></div><span class=\"note\">Banque des anciens sujets</span></div>"}
];

function construire(){
  var s="",p="",i;
  for(i=0;i<SL.length;i++){
    s+="<section class=\"slide\" aria-hidden=\"true\"><div class=\"visuel\" aria-hidden=\"true\">"+SL[i].v+"</div><div class=\"texte\"><span class=\"note\">"+SL[i].k+"</span><h2>"+SL[i].t+"</h2><p>"+SL[i].p+"</p></div></section>";
    p+="<span></span>";
  }
  ov=document.createElement("div");
  ov.id="intro";ov.setAttribute("role","dialog");ov.setAttribute("aria-modal","true");ov.setAttribute("aria-label","Présentation du site");ov.hidden=true;
  ov.innerHTML="<button type=\"button\" class=\"passer\" data-i=\"fin\">Passer</button><div class=\"piste\">"+s+"</div><div class=\"pied\"><div class=\"points\" aria-hidden=\"true\">"+p+"</div><button type=\"button\" class=\"btn\" data-i=\"suite\">Suivant</button></div>";
  document.body.appendChild(ov);
  piste=ov.querySelector(".piste");
  ov.addEventListener("click",function(e){var b=e.target.closest("[data-i]");if(!b)return;if(b.getAttribute("data-i")==="fin")fermer();else aller(idx+1)});
  ov.addEventListener("touchstart",function(e){x0=e.touches[0].clientX},{passive:true});
  ov.addEventListener("touchend",function(e){if(x0===null)return;var dx=e.changedTouches[0].clientX-x0;x0=null;if(dx<-50)aller(idx+1);else if(dx>50)aller(idx-1)},{passive:true});
}
function aller(n){
  if(n>=SL.length){fermer();return}
  if(n<0)n=0;
  idx=n;
  piste.style.transform="translateX(-"+(n*100)+"%)";
  ov.style.setProperty("--c",SL[n].c);
  Array.prototype.forEach.call(ov.querySelectorAll(".slide"),function(el,i){
    el.classList.toggle("actif",i===n);el.setAttribute("aria-hidden",i===n?"false":"true")});
  Array.prototype.forEach.call(ov.querySelectorAll(".points span"),function(el,i){el.className=i===n?"on":""});
  ov.querySelector(".pied .btn").textContent=n===SL.length-1?"Commencer":"Suivant";
}
function ouvrir(){
  if(!ov)construire();
  avant=document.activeElement;
  ov.hidden=false;document.body.style.overflow="hidden";
  aller(0);ov.querySelector(".pied .btn").focus();
}
function fermer(){
  if(!ov||ov.hidden)return;
  ov.hidden=true;document.body.style.overflow="";marquer();
  if(avant&&avant.focus)avant.focus();
}
document.addEventListener("keydown",function(e){
  if(!ov||ov.hidden)return;
  if(e.key==="Escape")fermer();
  else if(e.key==="ArrowRight")aller(idx+1);
  else if(e.key==="ArrowLeft")aller(idx-1);
});
Array.prototype.forEach.call(document.querySelectorAll("[data-intro-open]"),function(a){
  a.addEventListener("click",function(e){e.preventDefault();ouvrir()});
});
window.RV_INTRO={ouvrir:ouvrir};
/* Quand s'ouvre-t-elle ? Réglage « intro » dans js/config.js :
   "premiere-visite" (défaut) : une seule fois sur l'appareil
   "session"  : à chaque nouvelle ouverture du site (nouvel onglet ou navigateur relancé)
   "toujours" : à chaque chargement de la page
   "jamais"   : seulement via le menu « Comment ça marche »
   Pour tester : ajouter ?intro à l'adresse (index.html?intro) la force à s'ouvrir. */
var mode=(window.RV_CONFIG&&window.RV_CONFIG.intro)||"premiere-visite";
var forcer=/[?&]intro(=1|&|$)/.test(location.search);
if(forcer||mode==="toujours"||(mode==="session"&&!vuSession())||(mode==="premiere-visite"&&!vu()))ouvrir();
})();
