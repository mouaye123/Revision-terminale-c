/* ===== BANNIÈRE : remerciements + messages pour les cadets =====
   Affichée sur l'accueil seulement. On peut la masquer (elle revient à la prochaine visite).
   Pour changer les textes, modifier les deux lignes ci-dessous. */
(function(){
"use strict";
if(!(window.RV_CONFIG&&window.RV_CONFIG.bandeauHaut===true))return;
var K="rv-bandeau",DELAI=8000;
var MERCI_TITRE="Merci à la TC promotion 2025/2026",
    MERCI_SUITE=" pour vos retours, vos idées et votre soutien. Ce site existe grâce à vous.";
var MOTS=[
  "Cadets, chaque leçon révisée aujourd'hui est une victoire de demain.",
  "Le bac se prépare un peu chaque jour, pas la veille.",
  "Une erreur au quiz n'est pas un échec : c'est une leçon qui se grave.",
  "Les grands de la TC ont commencé comme vous. Votre tour arrive, préparez-le.",
  "Dix minutes par jour valent mieux qu'une nuit blanche avant l'examen."
];
var idx=Math.floor(Math.random()*MOTS.length),timer=null,survol=false,el,txt;
var calme=window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function masque(){try{return sessionStorage.getItem(K)==="0"}catch(e){return false}}
function accueil(){var h=location.hash;return h===""||h==="#"||h==="#/"}
function suivant(){
  idx=(idx+1)%MOTS.length;
  txt.classList.add("sort");
  setTimeout(function(){txt.textContent=MOTS[idx];txt.classList.remove("sort")},350);
}
function arreter(){if(timer){clearInterval(timer);timer=null}}
function demarrer(){
  arreter();
  if(calme||el.hidden||survol||document.hidden)return;
  timer=setInterval(suivant,DELAI);
}
function afficher(){
  el.hidden=!(accueil()&&!masque());
  if(el.hidden)arreter();else demarrer();
}

el=document.createElement("div");
el.className="bandeau";el.setAttribute("role","note");el.setAttribute("aria-label","Remerciements et message pour les cadets");el.hidden=true;
el.innerHTML="<div class=\"in\"><svg class=\"ico coeur\" viewBox=\"0 0 24 24\" aria-hidden=\"true\"><path d=\"M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z\"/></svg>"+
  "<div class=\"corps\"><p class=\"merci\"><b>"+MERCI_TITRE+"</b>"+MERCI_SUITE+"</p>"+
  "<button type=\"button\" class=\"mot\"><span class=\"note\">Aux cadets</span><span class=\"txt\"></span></button></div>"+
  "<button type=\"button\" class=\"fermer-b\" aria-label=\"Masquer ce message\"><svg viewBox=\"0 0 24 24\" aria-hidden=\"true\"><path d=\"M6 6l12 12M18 6L6 18\"/></svg></button></div>";
var top=document.getElementById("top");
if(top&&top.parentNode)top.parentNode.insertBefore(el,top.nextSibling);else document.body.insertBefore(el,document.body.firstChild);
txt=el.querySelector(".txt");txt.textContent=MOTS[idx];

el.querySelector(".mot").addEventListener("click",function(){suivant();demarrer()});
el.querySelector(".fermer-b").addEventListener("click",function(){
  try{sessionStorage.setItem(K,"0")}catch(e){}
  afficher();
});
el.addEventListener("pointerenter",function(){survol=true;arreter()});
el.addEventListener("pointerleave",function(){survol=false;demarrer()});
el.addEventListener("focusin",function(){survol=true;arreter()});
el.addEventListener("focusout",function(){survol=false;demarrer()});
document.addEventListener("visibilitychange",demarrer);
window.addEventListener("hashchange",afficher);
afficher();
})();
