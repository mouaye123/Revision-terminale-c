/* ===== NOYAU : état des leçons, menu, routage, leçons, flashcards, progression =====
   Les données pédagogiques sont dans js/data.js, la sauvegarde dans js/store.js.
   Le quiz aléatoire est dans js/quiz.js, les devoirs dans js/archive.js. */
(function(){
"use strict";
var D=window.RV_DATA,M=D.M,KEYS=D.KEYS,CONTENU=D.CONTENU,ST=window.RV_STORE,S=ST.charger();
var RV=window.RV={M:M,KEYS:KEYS,CONTENU:CONTENU,vues:{},actions:{},routes:[],pend:null,tok:0};
var A=RV.actions,V=RV.vues;
function $(id){return document.getElementById(id)}
var app=$("app"),top=$("top"),back=$("back"),ttl=$("ttl");
var F=null,Q=null;

/* ----- État partagé ----- */
RV.esc=function(s){return String(s).replace(/[&<>"']/g,function(c){return{"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;"}[c]})};
RV.save=function(){ST.sauver(S)};
RV.etu=function(m,n){return S.etu[m].indexOf(n)>-1};
RV.nbOuv=function(m){return S.etu[m].length};
RV.declarer=function(m,n){if(!RV.etu(m,n)){S.etu[m].push(n);S.etu[m].sort(function(a,b){return a-b});RV.save()}};
RV.verrouiller=function(m,n){S.etu[m]=S.etu[m].filter(function(z){return z!==n});RV.save()};
RV.ign=function(){return S.ign};
RV.ignorer=function(id){if(S.ign.indexOf(id)<0){S.ign.push(id);RV.save()}};
RV.reactiver=function(){S.ign=[];RV.save()};
RV.reset=function(){S=ST.defaut();RV.save()};
/* Comptes : à la connexion on récupère la progression du compte ; à la déconnexion on repart de zéro sur ce téléphone */
RV.synchro=function(){return ST.synchroniser(S).then(function(e){if(e){S=e;ST.sauverLocal(S);draw(false)}}).catch(function(){})};
RV.sortie=function(){S=ST.defaut();ST.sauverLocal(S);draw(false)};
if(window.RV_SB&&window.RV_SB.actif){window.RV_SB.ecouter(function(ev){if(ev==="entree")RV.synchro();else if(ev==="sortie")RV.sortie()})}
RV.theme=function(m){top.className=m||"";app.className=m||""};
var ICO={quiz:"<circle cx=\"12\" cy=\"12\" r=\"9\"/><path d=\"M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.7.4-1 1-1 1.7M12 17h.01\"/>",camera:"<path d=\"M4 8h3l1.5-2h7L17 8h3v11H4z\"/><circle cx=\"12\" cy=\"13\" r=\"3.5\"/>",lock:"<rect x=\"5\" y=\"11\" width=\"14\" height=\"9\" rx=\"2\"/><path d=\"M8 11V8a4 4 0 0 1 8 0v3\"/>",arrow:"<path d=\"M5 12h14M13 6l6 6-6 6\"/>"};
RV.ico=function(n){return "<svg class=\"ico\" viewBox=\"0 0 24 24\" aria-hidden=\"true\">"+ICO[n]+"</svg>"};
RV.lecon=function(m,n){return M[m].flat[n-1]};
RV.nbQ=function(){var k=0;Object.keys(CONTENU).forEach(function(x){k+=CONTENU[x].quiz.length});return k};
RV.nbL=function(){var k=0;KEYS.forEach(function(m){k+=M[m].n});return k};
RV.mot=function(s,t){var r=t?s/t:0;return r>=.8?"Excellent travail !":r>=.5?"Bien ! Encore un effort pour tout maîtriser.":"Relis les flashcards puis recommence : tu vas progresser."};
RV.entete=function(m,n){var L=RV.lecon(m,n);return "<p class=\"douce\">"+M[m].label+" "+(L.g+1)+" · "+RV.esc(L.gtitre)+"</p><h1>"+RV.esc(L.titre)+"</h1>"};

RV.seg=function(m){var h="";
  for(var i=1;i<=M[m].n;i++)h+="<i style=\"--i:"+i+"\""+(RV.etu(m,i)?"":" class=\"verrou\"")+"></i>";
  return "<div class=\"segments\" role=\"img\" aria-label=\""+RV.nbOuv(m)+" leçons ouvertes sur "+M[m].n+"\">"+h+"</div>"};
RV.carte=function(m){return "<a class=\"matiere "+m+"\" href=\"#/m/"+m+"\"><span class=\"gros\" aria-hidden=\"true\">"+M[m].n+"</span><header><h3>"+M[m].nom+"</h3></header><p>"+M[m].info+" · "+RV.nbOuv(m)+" sur "+M[m].n+" leçons ouvertes</p>"+RV.seg(m)+"</a>"};

/* ----- Vues ----- */
function vHome(){return{t:"Révision Terminale C",b:null,nav:"home",h:
  "<section class=\"hero\"><span class=\"note tilt\">Terminale C · Côte d'Ivoire</span><h1>Révise ce que tu as <span class=\"stab\">vu en classe</span></h1><p class=\"douce\">Le programme officiel de la DPFC, leçon par leçon.</p></section>"+
  "<div class=\"chiffres\"><p><b>"+RV.nbL()+"</b><span>leçons</span></p><p><b>"+RV.nbQ()+"</b><span>questions</span></p><p><b>"+KEYS.length+"</b><span>matières</span></p></div>"+
  "<div class=\"actions\"><a class=\"action prim\" href=\"#/quiz\">"+RV.ico("quiz")+"<span><b>Quiz aléatoire</b><small>Des questions tirées au hasard</small></span>"+RV.ico("arrow")+"</a><a class=\"action\" href=\"#/archive/ajout\">"+RV.ico("camera")+"<span><b>Ajouter un devoir</b><small>Scanne ou importe une photo</small></span>"+RV.ico("arrow")+"</a></div>"+KEYS.map(RV.carte).join("")}}

function vMat(m){var l="",D=M[m];
  D.groupes.forEach(function(g,gi){
    l+="<li class=\"grp\">"+D.label+" "+(gi+1)+" · "+RV.esc(g.titre)+"</li>";
    g.lecons.forEach(function(t,k){var n=g.debut+k,o=RV.etu(m,n);
      l+="<li><a href=\"#/l/"+m+"/"+n+"\" class=\""+(o?"":"bloquee")+"\"><span class=\"pastille\">"+(k+1)+"</span><span class=\"t\">"+RV.esc(t)+"<small>"+(o?"Ouverte":"Verrouillée : pas encore étudiée")+"</small></span>"+(o?"<span class=\"etiq surligne\">Ouvrir</span>":"<span class=\"etiq\" aria-hidden=\"true\">"+RV.ico("lock")+"</span>")+"</a></li>"})});
  return{t:D.nom,b:"#/",m:m,nav:"home",h:"<div class=\"tete\"><p class=\"douce\">"+D.info+" · "+D.n+" leçons</p><span class=\"compte\">"+RV.nbOuv(m)+" ouvertes</span></div>"+RV.seg(m)+"<ul class=\"lecons\">"+l+"</ul><p class=\"douce\">Source : "+D.src+".</p>"}}

function vLecon(m,n){var k=m+":"+n,c=CONTENU[k],h,tete=RV.entete(m,n);
  if(!RV.etu(m,n)){
    h=tete+"<div class=\"boite\"><h2>"+RV.ico("lock")+" Cette leçon n'est pas encore disponible</h2><p class=\"douce\">Elle s'ouvrira quand tu l'auras déclarée comme étudiée en classe.</p>"+
      (RV.pend===k?"<p><b>Tu confirmes que cette leçon a été traitée en classe ?</b></p><div class=\"rangee\"><button class=\"btn\" data-a=\"decl-ok\" data-k=\""+k+"\">Oui, on l'a étudiée</button><button class=\"btn sec\" data-a=\"annule\">Annuler</button></div>"
      :"<div class=\"rangee\"><button class=\"btn sec\" data-a=\"decl\" data-k=\""+k+"\">On l'a étudiée en classe</button></div>")+"</div>";
  }else if(!c){
    h=tete+"<div class=\"plein\"><h2>Le contenu arrive bientôt</h2><p class=\"douce\">Le cours et les questions de cette leçon ne sont pas encore ajoutés. Rien n'est inventé : le contenu sera publié après vérification avec le programme officiel.</p></div>"+
      (RV.pend==="u:"+k?"<div class=\"rangee\"><button class=\"btn\" data-a=\"undecl-ok\" data-k=\""+k+"\">Oui, la verrouiller</button><button class=\"btn sec\" data-a=\"annule\">Annuler</button></div>"
      :"<button class=\"btn discret\" data-a=\"undecl\" data-k=\""+k+"\">Verrouiller cette leçon</button>");
  }else{
    h=tete+"<div class=\"plein\"><span class=\"note\">"+(c.demo?"Démonstration":"Résumé")+"</span><p>"+c.resume+"</p></div><div class=\"rangee\"><a class=\"btn\" href=\"#/f/"+m+"/"+n+"\">Flashcards</a><a class=\"btn sec\" href=\"#/q/"+m+"/"+n+"\">Quiz de la leçon</a></div>"+
      (RV.pend==="u:"+k?"<div class=\"rangee\"><button class=\"btn\" data-a=\"undecl-ok\" data-k=\""+k+"\">Oui, la verrouiller</button><button class=\"btn sec\" data-a=\"annule\">Annuler</button></div>"
      :"<button class=\"btn discret\" data-a=\"undecl\" data-k=\""+k+"\">Verrouiller cette leçon</button>");
  }
  return{t:M[m].nom,b:"#/m/"+m,m:m,nav:"home",h:h}}

function vFlash(m,n){var c=CONTENU[m+":"+n];if(!c||!RV.etu(m,n))return vLecon(m,n);
  if(!F)F={i:0};var t=c.cartes.length,x=c.cartes[F.i];
  return{t:"Flashcards",b:"#/l/"+m+"/"+n,m:m,nav:"home",h:"<div class=\"tete\"><h2>Flashcards</h2><span class=\"compte\">Carte "+(F.i+1)+" sur "+t+"</span></div>"+
    "<button class=\"flip\" data-a=\"flip\" aria-pressed=\"false\" aria-label=\"Retourner la carte\"><span class=\"in\"><span class=\"face recto\"><span class=\"note\">Question</span><b>"+x.q+"</b></span><span class=\"face verso\"><span class=\"note\">Réponse</span><b>"+x.r+"</b></span></span></button>"+
    "<div class=\"rangee\"><button class=\"btn sec\" data-a=\"fgo\" data-d=\"-1\""+(F.i===0?" disabled":"")+">Précédente</button><button class=\"btn\" data-a=\"fgo\" data-d=\"1\""+(F.i===t-1?" disabled":"")+">Suivante</button></div>"}}

function vQuizLecon(m,n){var c=CONTENU[m+":"+n];if(!c||!RV.etu(m,n))return vLecon(m,n);
  if(!Q)Q={i:0,s:0,r:null};var t=c.quiz.length,h;
  if(Q.i>=t){
    h="<div class=\"plein\"><span class=\"note\">Quiz terminé</span><div class=\"score\">"+Q.s+" sur "+t+"</div><p>"+RV.mot(Q.s,t)+"</p></div><div class=\"rangee\"><button class=\"btn\" data-a=\"rejouer\">Recommencer</button><a class=\"btn sec\" href=\"#/l/"+m+"/"+n+"\">Retour à la leçon</a></div>";
  }else{
    var x=c.quiz[Q.i],o="";
    x.o.forEach(function(tx,j){var cl="",ic="";
      if(Q.r!==null){if(j===x.a){cl="ok";ic="<span class=\"etiq\">✓ Correct</span>"}else if(j===Q.r){cl="ko";ic="<span class=\"etiq\">✗ Faux</span>"}}
      o+="<li><button class=\""+cl+"\" data-a=\"rep\" data-j=\""+j+"\" data-m=\""+m+"\" data-n=\""+n+"\""+(Q.r!==null?" disabled":"")+"><span>"+tx+"</span>"+ic+"</button></li>"});
    h="<div class=\"tete\"><span class=\"compte\">Question "+(Q.i+1)+" sur "+t+"</span></div><p class=\"q\">"+x.q+"</p><ul class=\"choix\">"+o+"</ul>"+
      (Q.r!==null?"<div class=\"plein\" aria-live=\"polite\"><p>"+x.e+"</p></div><button class=\"btn\" data-a=\"suiv\">"+(Q.i===t-1?"Voir le score":"Question suivante")+"</button>":"");
  }
  return{t:"Quiz de la leçon",b:"#/l/"+m+"/"+n,m:m,nav:"home",h:h}}

function vProg(){var h="<h1>Ta progression</h1><p class=\"douce\">Elle est enregistrée sur ce téléphone.</p>"+KEYS.map(RV.carte).join("");
  h+=RV.pend==="reset"?"<div class=\"boite\"><h2>Effacer ta progression ?</h2><p class=\"douce\">Toutes les leçons seront de nouveau ouvertes et les questions ignorées seront réactivées. Les devoirs enregistrés ne sont pas effacés.</p><div class=\"rangee\"><button class=\"btn\" style=\"--c:var(--rouge)\" data-a=\"reset-ok\">Oui, tout effacer</button><button class=\"btn sec\" data-a=\"annule\">Annuler</button></div></div>"
    :"<button class=\"btn discret\" data-a=\"reset\">Réinitialiser ma progression</button>";
  return{t:"Progression",b:"#/",nav:"p",h:h}}

function ctx(p,fn){var m=p[1],n=parseInt(p[2],10);return(M[m]&&n>=1&&n<=M[m].n)?fn(m,n):vHome()}
V[""]=vHome;
V.m=function(p){return M[p[1]]?vMat(p[1]):vHome()};
V.l=function(p){return ctx(p,vLecon)};
V.f=function(p){return ctx(p,vFlash)};
V.q=function(p){return ctx(p,vQuizLecon)};
V.p=vProg;

/* ----- Actions ----- */
A.flip=function(b){b.setAttribute("aria-pressed",b.getAttribute("aria-pressed")==="true"?"false":"true");return false};
A.fgo=function(b){F.i+=parseInt(b.getAttribute("data-d"),10);return true};
A.rep=function(b){var m=b.getAttribute("data-m"),n=b.getAttribute("data-n");
  Q.r=parseInt(b.getAttribute("data-j"),10);if(Q.r===CONTENU[m+":"+n].quiz[Q.i].a)Q.s++;return true};
A.suiv=function(){Q.i++;Q.r=null;return "top"};
A.rejouer=function(){Q=null;return "top"};
A.decl=function(b){RV.pend=b.getAttribute("data-k");return true};
A.undecl=function(b){RV.pend="u:"+b.getAttribute("data-k");return true};
A.annule=function(){RV.pend=null;return true};
A["decl-ok"]=function(b){var s=b.getAttribute("data-k").split(":");RV.declarer(s[0],parseInt(s[1],10));RV.pend=null;return true};
A["undecl-ok"]=function(b){var s=b.getAttribute("data-k").split(":");RV.verrouiller(s[0],parseInt(s[1],10));RV.pend=null;return true};
A.reset=function(){RV.pend="reset";return true};
A["reset-ok"]=function(){RV.reset();RV.pend=null;return true};

/* ----- Menu burger ----- */
var menu=$("menu"),voile=$("voile"),bur=$("burger");
function menuToggle(o,foc){menu.hidden=!o;voile.hidden=!o;bur.setAttribute("aria-expanded",o?"true":"false");
  if(o)menu.querySelector("a").focus();else if(foc)bur.focus()}
bur.addEventListener("click",function(){menuToggle(menu.hidden,true)});
$("fermer").addEventListener("click",function(){menuToggle(false,true)});
voile.addEventListener("click",function(){menuToggle(false,true)});
document.addEventListener("keydown",function(e){if(e.key==="Escape"&&!menu.hidden)menuToggle(false,true)});
menu.addEventListener("click",function(e){if(e.target.closest("a"))menuToggle(false,false)});

/* ----- Affichage et routage ----- */
function draw(sc){
  var p=(location.hash||"#/").slice(2).split("/"),
      f=Object.prototype.hasOwnProperty.call(V,p[0])?V[p[0]]:V[""],r=f(p),t=++RV.tok;
  RV.theme(r.m);if(sc)app.classList.add("anime");ttl.textContent=r.t;
  if(r.b){back.hidden=false;back.setAttribute("href",r.b)}else back.hidden=true;
  app.innerHTML=r.h;
  var act=r.nav||"home";
  Array.prototype.forEach.call(document.querySelectorAll("[data-nav]"),function(a){
    if(a.getAttribute("data-nav")===act)a.setAttribute("aria-current","page");else a.removeAttribute("aria-current")});
  if(sc){window.scrollTo(0,0);app.focus({preventScroll:true})}
  if(r.then)r.then(app,function(){return t===RV.tok});
}
RV.draw=draw;
RV.start=function(){draw(true)};
function agir(el,e){
  var nom=el.getAttribute("data-a")||el.getAttribute("data-g");
  if(!Object.prototype.hasOwnProperty.call(A,nom))return;
  var r=A[nom](el,e);if(r!==false)draw(r==="top");
}
app.addEventListener("click",function(e){var b=e.target.closest("[data-a]");if(b)agir(b,e)});
app.addEventListener("change",function(e){var b=e.target.closest("[data-g]");if(b)agir(b,e)});
window.addEventListener("hashchange",function(){F=null;Q=null;RV.pend=null;RV.routes.forEach(function(f){f(location.hash)});draw(true)});
})();
