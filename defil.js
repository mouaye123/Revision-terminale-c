/* ===== BANDEAU DÉFILANT (comme le bandeau d'info d'une chaîne de télévision) =====
   Messages et vitesse : voir js/config.js, rubrique « defilement ».
   - Pause / reprise avec le bouton, masquage avec la croix (jusqu'à la prochaine visite).
   - Caché pendant les flashcards et les quiz, pour ne pas distraire.
   - Si le téléphone demande moins d'animations : un seul message fixe, qui change toutes les 9 s. */
(function(){
"use strict";
var C=window.RV_CONFIG||{},D=C.defilement||{};
var MSG=(D.messages&&D.messages.length)?D.messages:["Bienvenue sur Révision Terminale C"];
var VIT=D.vitesse>0?D.vitesse:55,ETIQ=D.etiquette||"INFOS",K="rv-defil";
var calme=!!(window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches);
var bar,piste,vue,fixe,idx=0,minuteur=null,mesure=null;

function esc(s){return String(s).replace(/[&<>"]/g,function(c){return{"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;"}[c]})}
function masque(){try{return sessionStorage.getItem(K)==="0"}catch(e){return false}}
function concentre(){var h=location.hash;return /^#\/(f|q)\//.test(h)||h==="#/quiz/jouer"}
function suite(n){var h="";for(var k=0;k<n;k++)MSG.forEach(function(t){h+="<span class=\"defil-i\">"+esc(t)+"</span>"});return h}

/* Remplit le bandeau assez pour qu'il n'y ait jamais de trou, et règle la vitesse */
function calculer(){
  if(calme||bar.hidden)return;
  var a=piste.children[0],b=piste.children[1],n=1;
  a.innerHTML=suite(n);
  while(a.getBoundingClientRect().width<vue.clientWidth*1.2&&n<8){n++;a.innerHTML=suite(n)}
  b.innerHTML=a.innerHTML;
  piste.style.setProperty("--duree",Math.max(12,Math.round(a.getBoundingClientRect().width/VIT))+"s");
}
function changer(){idx=(idx+1)%MSG.length;fixe.textContent=MSG[idx]}
function afficher(){
  var voir=!masque()&&!concentre();
  bar.hidden=!voir;
  document.body.classList.toggle("a-defilement",voir);
  if(minuteur){clearInterval(minuteur);minuteur=null}
  if(!voir)return;
  if(calme){fixe.textContent=MSG[idx];minuteur=setInterval(changer,9000)}
  else calculer();
}

var PAUSE="<svg class=\"i-pause\" viewBox=\"0 0 24 24\" aria-hidden=\"true\"><path d=\"M8 5v14M16 5v14\"/></svg><svg class=\"i-lecture\" viewBox=\"0 0 24 24\" aria-hidden=\"true\"><path d=\"M7 5l12 7-12 7z\"/></svg>",
    CROIX="<svg viewBox=\"0 0 24 24\" aria-hidden=\"true\"><path d=\"M6 6l12 12M18 6L6 18\"/></svg>";
bar=document.createElement("div");
bar.className="defil"+(calme?" calme":"");
bar.setAttribute("role","marquee");bar.setAttribute("aria-label","Messages et informations");bar.hidden=true;
bar.innerHTML="<span class=\"defil-e\">"+esc(ETIQ)+"</span><div class=\"defil-v\"><div class=\"defil-p\">"+
  (calme?"<span class=\"defil-fixe\"></span>":"<span class=\"defil-s\"></span><span class=\"defil-s\" aria-hidden=\"true\"></span>")+"</div></div>"+
  (calme?"":"<button type=\"button\" class=\"defil-b\" data-d=\"pause\" aria-pressed=\"false\" aria-label=\"Mettre en pause le défilement\">"+PAUSE+"</button>")+
  "<button type=\"button\" class=\"defil-b\" data-d=\"fermer\" aria-label=\"Masquer le bandeau\">"+CROIX+"</button>";
document.body.appendChild(bar);
piste=bar.querySelector(".defil-p");vue=bar.querySelector(".defil-v");fixe=bar.querySelector(".defil-fixe");

bar.addEventListener("click",function(e){
  var b=e.target.closest("[data-d]");if(!b)return;
  if(b.getAttribute("data-d")==="pause"){
    var p=bar.classList.toggle("pause");
    b.setAttribute("aria-pressed",p?"true":"false");
    b.setAttribute("aria-label",p?"Reprendre le défilement":"Mettre en pause le défilement");
  }else{
    try{sessionStorage.setItem(K,"0")}catch(x){}
    afficher();
  }
});
window.addEventListener("hashchange",afficher);
window.addEventListener("resize",function(){clearTimeout(mesure);mesure=setTimeout(calculer,250)});
afficher();
})();
