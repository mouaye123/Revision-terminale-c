/* ===== QUIZ ALÉATOIRE INTELLIGENT =====
   Règles :
   1. Les questions viennent uniquement des leçons déclarées étudiées.
   2. « On n'a pas encore vu ça » demande quoi faire : verrouiller la leçon
      OU ignorer seulement cette question (si elle est mal classée).
   3. Une leçon verrouillée est retirée du quiz tout de suite, et reste réversible.
   4. Une question ignorée n'est plus proposée, mais peut être réactivée. */
(function(){
"use strict";
var RV=window.RV,M=RV.M,C=RV.CONTENU,A=RV.actions,filtre="all",sess=null,NB=10;

function pool(f){var out=[],ign=RV.ign();
  RV.KEYS.forEach(function(m){if(f!=="all"&&f!==m)return;
    for(var n=1;n<=M[m].n;n++){var c=C[m+":"+n];if(!c||!RV.etu(m,n))continue;
      c.quiz.forEach(function(q,i){var id=m+":"+n+":"+i;if(ign.indexOf(id)<0)out.push({id:id,m:m,n:n,q:q})})}});
  return out}
function melange(a){a=a.slice();for(var i=a.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1)),t=a[i];a[i]=a[j];a[j]=t}return a}
function nouvelle(f){var p=melange(pool(f)).slice(0,NB);
  sess=p.length?{f:f,qs:p,i:0,s:0,ans:0,r:null,ordre:null,sig:false,msg:""}:null;if(sess)ordre()}
function ordre(){var x=sess.qs[sess.i];if(!x)return;var o=[];for(var k=0;k<x.q.o.length;k++)o.push(k);sess.ordre=melange(o);sess.r=null;sess.sig=false}
function retirer(fn){sess.qs=sess.qs.filter(function(y,k){return k<sess.i||!fn(y)})}

function vAcc(){var n=pool(filtre).length,ig=RV.ign().length,
  chips="<button class=\"chip\" data-a=\"qfiltre\" data-f=\"all\" aria-pressed=\""+(filtre==="all")+"\">Toutes</button>";
  RV.KEYS.forEach(function(m){chips+="<button class=\"chip "+m+"\" data-a=\"qfiltre\" data-f=\""+m+"\" aria-pressed=\""+(filtre===m)+"\">"+M[m].nom+"</button>"});
  var h="<h1>Quiz aléatoire</h1><p class=\"douce\">Des questions tirées au hasard, seulement dans les leçons que tu as déclarées étudiées.</p>"+
    "<div class=\"chips\" role=\"group\" aria-label=\"Matière\">"+chips+"</div>"+
    (n?"<div class=\"plein\"><span class=\"note\">Prêt</span><p>"+n+" question"+(n>1?"s":"")+" disponible"+(n>1?"s":"")+". Une série compte "+Math.min(NB,n)+" question"+(Math.min(NB,n)>1?"s":"")+".</p></div><button class=\"btn\" data-a=\"qstart\">Commencer</button>"
      :"<div class=\"boite\"><h2>Aucune question disponible</h2><p class=\"douce\">Les questions seront ajoutées leçon par leçon, après vérification avec le programme officiel de la DPFC. Pour l'instant, aucune leçon ne contient de question.</p></div>")+
    "<a class=\"btn sec\" href=\"#/quiz/nonvus\">Chapitres pas encore vus</a>"+
    (ig?"<div class=\"avis\">"+ig+" question"+(ig>1?"s ignorées":" ignorée")+" (mal classée"+(ig>1?"s":"")+"). <button class=\"btn discret\" data-a=\"qreact\">Les réactiver</button></div>":"");
  return{t:"Quiz aléatoire",b:"#/",nav:"quiz",h:h}}

function vNonVus(){var h="<h1>Chapitres pas encore vus</h1><p class=\"douce\">Ces leçons sont verrouillées : elles ne sont pas utilisées dans le quiz tant que tu ne les rouvres pas. Touche une leçon pour la consulter ou la déclarer.</p>",tot=0;
  RV.KEYS.forEach(function(m){var l="";
    for(var n=1;n<=M[m].n;n++)if(!RV.etu(m,n)){tot++;l+="<li><a href=\"#/l/"+m+"/"+n+"\" class=\"bloquee\"><span class=\"pastille\">"+RV.lecon(m,n).loc+"</span><span class=\"t\">"+RV.esc(RV.lecon(m,n).titre)+"<small>"+M[m].label+" "+(RV.lecon(m,n).g+1)+" · Verrouillée</small></span><span class=\"etiq\" aria-hidden=\"true\">"+RV.ico("lock")+"</span></a></li>"}
    if(l)h+="<section class=\""+m+"\"><h2 style=\"color:var(--ct);margin-bottom:8px\">"+M[m].nom+"</h2><ul class=\"lecons\">"+l+"</ul></section>"});
  if(!tot)h+="<div class=\"plein\"><p>Toutes les leçons sont ouvertes.</p></div>";
  return{t:"Pas encore vus",b:"#/quiz",nav:"quiz",h:h}}

function vJeu(){if(!sess)return vAcc();var q=sess.qs,h;
  if(sess.i>=q.length){
    h=(sess.msg?"<div class=\"avis\" role=\"status\">"+sess.msg+"</div>":"")+"<div class=\"plein\"><span class=\"note\">Série terminée</span>"+(sess.ans?"<div class=\"score\">"+sess.s+" sur "+sess.ans+"</div><p>"+RV.mot(sess.s,sess.ans)+"</p>":"<p>Aucune question n'a reçu de réponse.</p>")+"</div><div class=\"rangee\"><button class=\"btn\" data-a=\"qrejouer\">Nouvelle série</button><a class=\"btn sec\" href=\"#/quiz\">Retour</a></div>";
  }else{
    var x=q[sess.i],qq=x.q,o="";
    sess.ordre.forEach(function(k,j){var cl="",ic="";
      if(sess.r!==null){if(k===qq.a){cl="ok";ic="<span class=\"etiq\">✓ Correct</span>"}else if(j===sess.r){cl="ko";ic="<span class=\"etiq\">✗ Faux</span>"}}
      o+="<li><button class=\""+cl+"\" data-a=\"qrep\" data-j=\""+j+"\""+(sess.r!==null||sess.sig?" disabled":"")+"><span>"+qq.o[k]+"</span>"+ic+"</button></li>"});
    h=(sess.msg?"<div class=\"avis\" role=\"status\">"+sess.msg+"</div>":"")+
      "<div class=\""+x.m+"\"><div class=\"tete\"><span class=\"note\">"+M[x.m].nom+" · "+RV.esc(RV.lecon(x.m,x.n).titre)+"</span><span class=\"compte\">Question "+(sess.i+1)+" sur "+q.length+"</span></div></div>"+
      "<p class=\"q\">"+qq.q+"</p><ul class=\"choix\">"+o+"</ul>"+
      (sess.r!==null?"<div class=\"plein\" aria-live=\"polite\"><p>"+qq.e+"</p></div><button class=\"btn\" data-a=\"qsuiv\">"+(sess.i===q.length-1?"Voir le score":"Question suivante")+"</button>":"")+
      (sess.sig?"<div class=\"boite "+x.m+"\"><h2>On n'a pas encore vu ça ?</h2><p class=\"douce\">Cette question est rattachée à : <b>"+M[x.m].nom+" : "+RV.esc(RV.lecon(x.m,x.n).titre)+"</b>. Que veux-tu faire ?</p><div class=\"rangee\" style=\"flex-direction:column\"><button class=\"btn\" data-a=\"qlock\">Verrouiller cette leçon : pas encore étudiée</button><button class=\"btn sec\" data-a=\"qign\">La question est mal classée : l'ignorer</button><button class=\"btn discret\" data-a=\"qannule\">Annuler</button></div></div>"
        :"<button class=\"btn discret\" data-a=\"qsig\">On n'a pas encore vu ça</button>");
  }
  return{t:"Quiz aléatoire",b:"#/quiz",nav:"quiz",h:h}}

RV.vues.quiz=function(p){return p[1]==="jouer"?vJeu():p[1]==="nonvus"?vNonVus():vAcc()};
RV.routes.push(function(h){if(h!=="#/quiz/jouer")sess=null});

A.qfiltre=function(b){filtre=b.getAttribute("data-f");return true};
A.qreact=function(){RV.reactiver();return true};
A.qstart=function(){nouvelle(filtre);if(!sess)return true;location.hash="#/quiz/jouer";return false};
A.qrejouer=function(){nouvelle(sess.f);return "top"};
A.qrep=function(b){if(sess.r!==null)return false;var j=parseInt(b.getAttribute("data-j"),10);
  sess.r=j;sess.ans++;sess.msg="";if(sess.ordre[j]===sess.qs[sess.i].q.a)sess.s++;return true};
A.qsuiv=function(){sess.i++;sess.msg="";ordre();return "top"};
A.qsig=function(){sess.sig=true;sess.msg="";return true};
A.qannule=function(){sess.sig=false;return true};
A.qlock=function(){var x=sess.qs[sess.i];RV.verrouiller(x.m,x.n);
  retirer(function(y){return y.m===x.m&&y.n===x.n});
  sess.msg="La leçon « "+RV.esc(RV.lecon(x.m,x.n).titre)+" » ("+M[x.m].nom+") est verrouillée. Tu pourras la rouvrir dans « Chapitres pas encore vus ».";ordre();return "top"};
A.qign=function(){var x=sess.qs[sess.i];RV.ignorer(x.id);
  retirer(function(y){return y.id===x.id});
  sess.msg="Question ignorée. Elle ne sera plus proposée (tu peux la réactiver depuis l'accueil du quiz).";ordre();return "top"};
})();
