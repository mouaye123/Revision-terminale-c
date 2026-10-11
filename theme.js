/* ===== MODE JOUR / NUIT BLEU =====
   Chargé dans le <head> pour appliquer le thème avant l'affichage (pas de flash blanc).
   Le choix est mémorisé sur l'appareil. Les couleurs de nuit sont dans css/tokens.css. */
(function(){
"use strict";
var K="rv-theme",racine=document.documentElement,nuit=false;
var LUNE="<path d=\"M20 14.5A8 8 0 0 1 9.5 4 8 8 0 1 0 20 14.5z\"/>",
    SOLEIL="<circle cx=\"12\" cy=\"12\" r=\"4\"/><path d=\"M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4\"/>";
function lire(){try{return localStorage.getItem(K)}catch(e){return null}}
function ecrire(v){try{localStorage.setItem(K,v)}catch(e){}}
function appliquer(n){
  nuit=!!n;
  if(nuit)racine.setAttribute("data-theme","nuit");else racine.removeAttribute("data-theme");
  var m=document.querySelector("meta[name=\"theme-color\"]");
  if(m)m.setAttribute("content",nuit?"#0A1128":"#2438A8");
  var b=document.getElementById("theme");
  if(b){b.setAttribute("aria-pressed",nuit?"true":"false");b.setAttribute("aria-label",nuit?"Désactiver le mode nuit":"Activer le mode nuit")}
  Array.prototype.forEach.call(document.querySelectorAll("[data-theme-toggle]"),function(a){a.setAttribute("aria-checked",nuit?"true":"false")});
}
function basculer(){appliquer(!nuit);ecrire(nuit?"nuit":"jour")}
appliquer(lire()==="nuit");

document.addEventListener("DOMContentLoaded",function(){
  var bur=document.getElementById("burger");
  if(bur&&!document.getElementById("theme")){
    var b=document.createElement("button");
    b.id="theme";b.type="button";b.setAttribute("aria-pressed","false");
    b.innerHTML="<svg class=\"lune\" viewBox=\"0 0 24 24\" aria-hidden=\"true\">"+LUNE+"</svg><svg class=\"soleil\" viewBox=\"0 0 24 24\" aria-hidden=\"true\">"+SOLEIL+"</svg>";
    b.addEventListener("click",basculer);
    bur.parentNode.insertBefore(b,bur);
  }
  var ul=document.querySelector("#menu ul");
  if(ul){
    var li=document.createElement("li");
    li.innerHTML="<a href=\"#/\" role=\"switch\" aria-checked=\"false\" data-theme-toggle><svg class=\"ico\" viewBox=\"0 0 24 24\" aria-hidden=\"true\">"+LUNE+"</svg>Mode nuit<span class=\"interrupteur\" aria-hidden=\"true\"></span></a>";
    li.firstChild.addEventListener("click",function(e){e.preventDefault();basculer()});
    var ref=ul.querySelector("[data-intro-open]");
    if(ref&&ref.parentNode)ul.insertBefore(li,ref.parentNode);else ul.appendChild(li);
  }
  appliquer(nuit);
});
window.RV_THEME={basculer:basculer};
})();
