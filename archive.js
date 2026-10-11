/* ===== ARCHIVE DES DEVOIRS : ajout / scan, banque des anciens sujets, validation =====
   Deux modes (voir js/store.js) : LOCAL (documents sur ce téléphone) tant que Supabase n'est pas configuré,
   SUPABASE (comptes, partage entre élèves, vraie modération) une fois js/config.js rempli.
   Ce qui exige un serveur (comptes, vraie modération, partage entre élèves) n'est pas faisable ici :
   en mode local, la validation et les boutons de modération sont une SIMULATION de test. */
(function(){
"use strict";
var RV=window.RV,M=RV.M,A=RV.actions,RS=window.RV_STORE,
    MAT=[["philo","Philosophie"],["histoire","Histoire"],["geographie","Géographie"],["francais","Français"],["maths","Mathématiques"],["sciences","Sciences physiques"],["svt","SVT"],["anglais","Anglais"],["espagnol","Espagnol"],["allemand","Allemand"]],NOM={},
    MAXIN=15*1024*1024,MAXOUT=1024*1024,MAXPX=1600,
    TYPES={devoir:"Devoir",composition:"Composition",corrige:"Corrigé"},
    STAT={publie:"Publié",attente:"En attente de validation",signale:"Signalé : en attente d'examen"},
    RAISONS={classement:"Mauvaise matière ou mauvais chapitre",illisible:"Illisible",doublon:"Doublon",inapproprie:"Contenu inapproprié"},
    urls=[],fil={tab:"pub",m:"",n:"",type:"",annee:"",q:""},cam={on:false,stream:null},nv=nouveau();

MAT.forEach(function(x){NOM[x[0]]=x[1]});
function annees(){var d=new Date(),y=d.getMonth()>=8?d.getFullYear():d.getFullYear()-1,a=[];for(var k=0;k<6;k++)a.push((y-k)+"-"+(y-k+1));return a}
function nouveau(){return{blob:null,mini:null,url:null,t0:0,hash:"",dup:null,dupOk:false,busy:false,err:"",ok:false,f:{m:"",n:"",chap:"",annee:annees()[0],type:"",titre:""}}}
function taille(n){return n>=1048576?(n/1048576).toFixed(1).replace(".",",")+" Mo":Math.max(1,Math.round(n/1024))+" Ko"}
function liberer(){urls.forEach(function(u){URL.revokeObjectURL(u)});urls=[]}
function url(b){var u=URL.createObjectURL(b);urls.push(u);return u}
var info="";
function SB(){return window.RV_SB&&window.RV_SB.actif?window.RV_SB:null}
function distant(){return !!(SB()&&SB().utilisateur())}
function estMod(){return distant()?SB().estModerateur():true}
function porte(){return !!(SB()&&!SB().utilisateur())}
function vPorte(){return{t:"Devoirs",b:"#/",nav:"archive",h:"<h1>Connecte-toi</h1><p class=\"douce\">Pour consulter la banque des anciens sujets et partager un devoir, crée un compte gratuit ou connecte-toi.</p><a class=\"btn\" href=\"#/compte\">Se connecter ou créer un compte</a>"}}
function libAtt(){return distant()?(estMod()?"À valider":"Mes envois"):"En attente"}
function avisAtt(){
  if(!distant())return "<div class=\"avis\"><b>Mode test local.</b> Sur la version finale, seuls les modérateurs verront les documents en attente et pourront les publier. Ici, ouvre un document pour le publier ou le refuser.</div>";
  return "<div class=\"avis\">"+(estMod()?"Documents envoyés par les élèves, à vérifier avant publication.":"Tes envois en attente de validation par un modérateur.")+"</div>";
}
function imgListe(d){return d.blob?url(d.blob):RV.esc(d.urlMini||"")}
function imgDetail(d){return d.blob?url(d.blob):RV.esc(d.url||d.urlMini||"")}
function sel(g,k,opts,val,ph,id){var h="<select id=\""+id+"\" data-g=\""+g+"\" data-k=\""+k+"\">"+(ph?"<option value=\"\">"+ph+"</option>":"");
  opts.forEach(function(o){h+="<option value=\""+o[0]+"\""+(String(o[0])===String(val)?" selected":"")+">"+o[1]+"</option>"});return h+"</select>"}
function champ(id,lib,inner){return"<div class=\"champ\"><label for=\""+id+"\">"+lib+"</label>"+inner+"</div>"}
var optM=MAT,
    optT=Object.keys(TYPES).map(function(k){return[k,TYPES[k]]});
function chapitreChamp(f){
  if(f.m&&!M[f.m])return champ("g-chap","Chapitre ou thème (facultatif)","<input id=\"g-chap\" type=\"text\" maxlength=\"60\" data-g=\"nv\" data-k=\"chap\" value=\""+RV.esc(f.chap)+"\">");
  return champ("g-n","Chapitre",sel("nv","n",optL(f.m),f.n,"Non précisé","g-n"))}
function optA(){return annees().map(function(a){return[a,a]})}
function optL(m){var o=[];if(M[m])for(var n=1;n<=M[m].n;n++)o.push([n,RV.lecon(m,n).titre]);return o}

/* ----- Compression et empreinte ----- */
function charger(f){
  function viaImg(){return new Promise(function(ok,ko){var u=URL.createObjectURL(f),i=new Image();
    i.onload=function(){URL.revokeObjectURL(u);ok(i)};i.onerror=function(){URL.revokeObjectURL(u);ko(new Error("Image illisible"))};i.src=u})}
  return window.createImageBitmap?createImageBitmap(f).catch(viaImg):viaImg()}
function encoder(src,w,h,q,essai){var c=document.createElement("canvas");c.width=w;c.height=h;
  var x=c.getContext("2d");x.fillStyle="#fff";x.fillRect(0,0,w,h);x.drawImage(src,0,0,w,h);
  return new Promise(function(ok){c.toBlob(ok,"image/jpeg",q)}).then(function(b){
    if(!b)throw new Error("Compression impossible");
    if(b.size>MAXOUT){if(essai<5)return encoder(src,Math.round(w*.8),Math.round(h*.8),q,essai+1);throw new Error("Image encore trop lourde après compression")}
    return b})}
function dhash(src){var c=document.createElement("canvas");c.width=9;c.height=8;var x=c.getContext("2d");
  x.fillStyle="#fff";x.fillRect(0,0,9,8);x.drawImage(src,0,0,9,8);
  var d=x.getImageData(0,0,9,8).data,g=[],b="";
  for(var i=0;i<72;i++)g.push(d[i*4]*.299+d[i*4+1]*.587+d[i*4+2]*.114);
  for(var r=0;r<8;r++)for(var k=0;k<8;k++)b+=g[r*9+k]>g[r*9+k+1]?"1":"0";return b}
function dist(a,b){var n=0;for(var i=0;i<64;i++)if(a[i]!==b[i])n++;return n}
function compresser(f){return charger(f).then(function(src){
  var w0=src.width||src.naturalWidth,h0=src.height||src.naturalHeight;if(!w0||!h0)throw new Error("Image illisible");
  var k=Math.min(1,MAXPX/Math.max(w0,h0)),hash=dhash(src);
  return encoder(src,Math.round(w0*k),Math.round(h0*k),.72,0).then(function(b){var km=Math.min(1,360/Math.max(w0,h0));return encoder(src,Math.round(w0*km),Math.round(h0*km),.6,0).then(function(m){if(src.close)src.close();return{blob:b,mini:m,hash:hash}})})})}

/* ----- Ajout d'un devoir ----- */
function traiter(f){nv.err="";nv.dup=null;nv.dupOk=false;
  if(!/^image\/(jpeg|png|webp)$/.test(f.type)){nv.err="Format non pris en charge. Utilise une photo JPEG, PNG ou WebP.";RV.draw(false);return}
  if(f.size>MAXIN){nv.err="Fichier trop volumineux (maximum 15 Mo).";RV.draw(false);return}
  nv.busy=true;RV.draw(false);
  compresser(f).then(function(r){
    if(nv.url)URL.revokeObjectURL(nv.url);
    nv.blob=r.blob;nv.mini=r.mini;nv.url=URL.createObjectURL(r.blob);nv.t0=f.size;nv.hash=r.hash;return RS.docs.tous()
  }).then(function(l){
    nv.dup=l.filter(function(d){return d.dhash&&dist(d.dhash,nv.hash)<=4})[0]||null;nv.busy=false;RV.draw(false)
  }).catch(function(e){nv.busy=false;nv.err=e&&e.message?e.message:"Image illisible";RV.draw(false)})}

function vAjout(){var f=nv.f,h;
  if(nv.ok){return{t:"Ajouter un devoir",b:"#/archive",nav:"ajout",h:"<div class=\"plein\"><span class=\"note\">Merci !</span><h2>Document reçu</h2><p>Ton document est en attente de validation. Il ne sera visible dans la banque qu'après vérification.</p></div><div class=\"rangee\"><button class=\"btn\" data-a=\"autre\">Ajouter un autre devoir</button><a class=\"btn sec\" href=\"#/archive\">Voir la banque</a></div>"}}
  if(cam.on){return{t:"Scanner un devoir",b:"#/archive",nav:"ajout",h:"<video id=\"cv\" class=\"video\" autoplay playsinline muted></video><p class=\"douce\">Place le document bien à plat, cadre-le entièrement, puis touche « Prendre la photo ».</p><div class=\"rangee\"><button class=\"btn\" data-a=\"snap\">Prendre la photo</button><button class=\"btn sec\" data-a=\"camoff\">Annuler</button></div>",then:function(){var v=document.getElementById("cv");if(v&&cam.stream){v.srcObject=cam.stream;var p=v.play();if(p&&p.catch)p.catch(function(){})}}}}
  h="<h1>Ajouter un devoir</h1><div class=\"avis\">Ne partage pas de document contenant des informations personnelles (nom complet, numéro de téléphone, adresse). Chaque document est vérifié avant d'être publié.</div>"+
    "<div class=\"rangee\"><button class=\"btn\" data-a=\"camera\">Scanner avec la caméra</button><label class=\"btn sec\" for=\"gal\">Importer une image</label></div><div class=\"rangee\"><label class=\"btn discret\" for=\"cam\">Utiliser l'appareil photo du téléphone</label></div>"+
    "<input class=\"cache\" id=\"cam\" type=\"file\" accept=\"image/*\" capture=\"environment\" data-g=\"fichier\"><input class=\"cache\" id=\"gal\" type=\"file\" accept=\"image/*\" data-g=\"fichier\">"+
    "<p class=\"douce\">Formats : JPEG, PNG, WebP. Maximum 15 Mo. L'image est réduite automatiquement avant l'enregistrement. Si le téléphone n'ouvre que tes fichiers, choisis « Appareil photo » ou « Caméra » dans la fenêtre qui s'ouvre, ou ouvre cette page dans Chrome.</p>";
  if(nv.busy)h+="<p role=\"status\"><b>Traitement en cours…</b></p>";
  if(nv.err)h+="<div class=\"erreur\" role=\"alert\">"+RV.esc(nv.err)+"</div>";
  if(nv.blob&&!nv.busy){
    h+="<div class=\"apercu\"><img src=\""+nv.url+"\" alt=\"Aperçu du document\"><p class=\"douce\">"+taille(nv.t0)+" → "+taille(nv.blob.size)+" après compression</p></div>";
    if(nv.dup)h+="<div class=\"avis\"><b>Ce document ressemble à un document déjà enregistré</b> ("+RV.esc(nv.dup.titre||TYPES[nv.dup.type]||"sans titre")+"). La détection est approximative. <a href=\"#/archive/doc/"+RV.esc(nv.dup.id)+"\">Voir le document existant</a>."+(nv.dupOk?"":" <button class=\"btn sec\" data-a=\"dupok\">C'est un document différent</button>")+"</div>";
    h+="<div class=\"grille2\">"+champ("g-m","Matière *",sel("nv","m",optM,f.m,"Choisir…","g-m"))+chapitreChamp(f)+
      champ("g-annee","Année scolaire *",sel("nv","annee",optA(),f.annee,"","g-annee"))+champ("g-type","Type *",sel("nv","type",optT,f.type,"Choisir…","g-type"))+"</div>"+
      champ("g-titre","Titre (facultatif)","<input id=\"g-titre\" type=\"text\" maxlength=\"60\" data-g=\"nv\" data-k=\"titre\" value=\""+RV.esc(f.titre)+"\">")+
      "<button class=\"btn\" data-a=\"envoyer\""+(nv.dup&&!nv.dupOk?" disabled":"")+">Envoyer pour validation</button>";
  }
  return{t:"Ajouter un devoir",b:"#/archive",nav:"ajout",h:h}}

function arreter(){if(cam.stream){cam.stream.getTracks().forEach(function(t){t.stop()})}cam.stream=null;cam.on=false}
A.camera=function(){nv.err="";
  if(!navigator.mediaDevices||!navigator.mediaDevices.getUserMedia){nv.err="La caméra intégrée n'est pas disponible ici (navigateur ou page non sécurisée). Utilise « Utiliser l'appareil photo du téléphone » ou « Importer une image ».";return true}
  navigator.mediaDevices.getUserMedia({video:{facingMode:{ideal:"environment"},width:{ideal:2048},height:{ideal:1536}},audio:false}).then(function(s){
      try{var t=s.getVideoTracks()[0],cp=t.getCapabilities?t.getCapabilities():null;
        if(cp&&cp.zoom&&t.applyConstraints)t.applyConstraints({advanced:[{zoom:cp.zoom.min}]}).catch(function(){})}catch(e){}
      cam.stream=s;cam.on=true;RV.draw(false)})
    .catch(function(e){nv.err=e&&e.name==="NotAllowedError"?"Accès à la caméra refusé. Autorise la caméra pour ce site dans le navigateur, ou utilise « Utiliser l'appareil photo du téléphone »."
      :"Caméra introuvable ou bloquée ici. Utilise « Utiliser l'appareil photo du téléphone » ou « Importer une image ».";RV.draw(false)});
  return false};
A.camoff=function(){arreter();return true};
A.snap=function(){var v=document.getElementById("cv");if(!v||!v.videoWidth)return false;
  var c=document.createElement("canvas");c.width=v.videoWidth;c.height=v.videoHeight;c.getContext("2d").drawImage(v,0,0);
  c.toBlob(function(b){arreter();if(b)traiter(b);else{nv.err="Capture impossible. Réessaie.";RV.draw(false)}},"image/jpeg",0.92);return false};
A.fichier=function(t){var f=t.files&&t.files[0];t.value="";if(f)traiter(f);return false};
A.nv=function(t){var k=t.getAttribute("data-k");nv.f[k]=t.value;if(k==="m"){nv.f.n="";nv.f.chap="";return true}return false};
A.dupok=function(){nv.dupOk=true;return true};
A.autre=function(){nv=nouveau();return "top"};
A.envoyer=function(){var t=document.getElementById("g-titre"),f=nv.f;if(t)f.titre=t.value;var tc=document.getElementById("g-chap");if(tc)f.chap=tc.value;
  if(!nv.blob)return false;
  if(!f.m||!f.annee||!f.type){nv.err="Choisis la matière, l'année scolaire et le type de document.";return true}
  var d={id:"d"+Date.now().toString(36)+Math.random().toString(36).slice(2,6),titre:f.titre.trim().slice(0,60),matiere:f.m,lecon:M[f.m]&&f.n?parseInt(f.n,10):null,chapitre:M[f.m]?"":(f.chap||"").trim().slice(0,60),annee:f.annee,type:f.type,statut:"attente",dhash:nv.hash,taille:nv.blob.size,date:Date.now(),blob:nv.blob,mini:nv.mini};
  nv.busy=true;nv.err="";RV.draw(false);
  RS.docs.ajouter(d).then(function(){if(nv.url)URL.revokeObjectURL(nv.url);nv=nouveau();nv.ok=true;RV.draw(true)})
    .catch(function(e){nv.busy=false;nv.err=(distant()&&e&&e.message)?e.message:"Enregistrement impossible sur cet appareil (stockage plein ou indisponible).";RV.draw(false)});
  return false};

/* ----- Banque des anciens sujets ----- */
function vBanque(){
  var h="<h1>Banque des anciens sujets</h1><a class=\"btn\" href=\"#/archive/ajout\">Ajouter un devoir</a>"+
    "<div class=\"onglets\" role=\"group\" aria-label=\"Affichage\"><button data-a=\"onglet\" data-t=\"pub\" aria-pressed=\""+(fil.tab==="pub")+"\">Publiés</button><button data-a=\"onglet\" data-t=\"att\" aria-pressed=\""+(fil.tab==="att")+"\">"+libAtt()+"</button></div>"+
    champ("fq","Rechercher par titre","<input id=\"fq\" type=\"search\" data-g=\"fil\" data-k=\"q\" value=\""+RV.esc(fil.q)+"\">")+
    "<div class=\"grille2\">"+champ("fm","Matière",sel("fil","m",optM,fil.m,"Toutes","fm"))+
    (M[fil.m]?champ("fn","Chapitre",sel("fil","n",optL(fil.m),fil.n,"Tous","fn")):"")+
    champ("ft","Type",sel("fil","type",optT,fil.type,"Tous","ft"))+champ("fa","Année",sel("fil","annee",optA(),fil.annee,"Toutes","fa"))+"</div>"+
    (fil.tab==="att"?avisAtt():"")+
    "<div id=\"zone\"><p class=\"douce\">Chargement…</p></div>";
  return{t:"Banque des sujets",b:"#/",nav:"archive",h:h,then:function(el,live){
    RS.docs.tous().then(function(l){if(!live())return;
      var q=fil.q.trim().toLowerCase();
      l=l.filter(function(d){return NOM[d.matiere]&&(fil.tab==="pub"?d.statut==="publie":d.statut!=="publie")&&(!fil.m||d.matiere===fil.m)&&(!fil.n||String(d.lecon||"")===fil.n)&&(!fil.type||d.type===fil.type)&&(!fil.annee||d.annee===fil.annee)&&(!q||(d.titre||"").toLowerCase().indexOf(q)>-1)})
        .sort(function(a,b){return b.date-a.date});
      liberer();var z=document.getElementById("zone");
      if(!l.length){z.innerHTML="<div class=\"boite\"><h2>Aucun document</h2><p class=\"douce\">"+(fil.tab==="pub"?"Aucun document publié ne correspond. Les nouveaux devoirs apparaissent ici après validation.":(distant()?(estMod()?"Aucun document à valider.":"Tu n'as aucun envoi en attente."):"Aucun document en attente."))+"</p></div>";return}
      z.innerHTML="<ul class=\"docs\">"+l.map(function(d){return"<li><a class=\"doc "+d.matiere+"\" href=\"#/archive/doc/"+RV.esc(d.id)+"\"><img src=\""+imgListe(d)+"\" alt=\"\" loading=\"lazy\"><div><b>"+NOM[d.matiere]+"</b>"+RV.esc(d.titre||TYPES[d.type]||"Document")+"<br>"+RV.esc(TYPES[d.type]||"")+" · "+RV.esc(d.annee)+(d.statut==="signale"?" · Signalé":"")+"</div></a></li>"}).join("")+"</ul>";
    }).catch(function(){if(live())document.getElementById("zone").innerHTML="<div class=\"erreur\" role=\"alert\">"+(distant()?"Impossible de charger les documents (connexion ou serveur).":"Impossible de lire les documents sur cet appareil.")+"</div>"})}}}

A.onglet=function(b){fil.tab=b.getAttribute("data-t");return true};
A.fil=function(t){var k=t.getAttribute("data-k");fil[k]=t.value;if(k==="m")fil.n="";return true};

/* ----- Détail d'un document ----- */
function vDoc(id){return{t:"Document",b:"#/archive",nav:"archive",h:"<p class=\"douce\">Chargement…</p>",then:function(el,live){
  RS.docs.un(id).then(function(d){if(!live())return;
    if(!d||!NOM[d.matiere]){el.innerHTML="<div class=\"erreur\" role=\"alert\">Document introuvable.</div>";return}
    RV.theme(d.matiere);liberer();
    var pub=d.statut==="publie",h="<div class=\"apercu\"><img src=\""+imgDetail(d)+"\" alt=\"Image du document\"></div>"+
      "<h1>"+RV.esc(d.titre||TYPES[d.type]||"Document")+"</h1>"+
      "<dl class=\"meta\"><dt>Matière</dt><dd style=\"color:var(--ct)\">"+NOM[d.matiere]+"</dd><dt>Chapitre</dt><dd>"+(M[d.matiere]&&d.lecon&&RV.lecon(d.matiere,d.lecon)?RV.esc(RV.lecon(d.matiere,d.lecon).titre):(d.chapitre?RV.esc(d.chapitre):"Non précisé"))+"</dd><dt>Type</dt><dd>"+RV.esc(TYPES[d.type]||"")+"</dd><dt>Année</dt><dd>"+RV.esc(d.annee)+"</dd><dt>Statut</dt><dd>"+(STAT[d.statut]||"")+"</dd>"+(d.raison?"<dt>Motif</dt><dd>"+RV.esc(RAISONS[d.raison]||"")+"</dd>":"")+"<dt>Taille</dt><dd>"+taille(d.taille||(d.blob&&d.blob.size)||0)+"</dd></dl>";
    if(RV.pend==="sig:"+id){
      h+="<div class=\"boite\"><h2>Pourquoi signaler ce document ?</h2><div class=\"rangee\" style=\"flex-direction:column\">"+Object.keys(RAISONS).map(function(r){return"<button class=\"btn sec\" data-a=\"asig\" data-id=\""+RV.esc(id)+"\" data-r=\""+r+"\">"+RAISONS[r]+"</button>"}).join("")+"<button class=\"btn discret\" data-a=\"annule\">Annuler</button></div></div>";
    }else if(RV.pend==="del:"+id){
      h+="<div class=\"boite\"><h2>Supprimer ce document ?</h2><p class=\"douce\">Cette action est définitive.</p><div class=\"rangee\"><button class=\"btn\" style=\"--c:var(--rouge)\" data-a=\"delok\" data-id=\""+RV.esc(id)+"\">Oui, supprimer</button><button class=\"btn sec\" data-a=\"annule\">Annuler</button></div></div>";
    }else if(pub){
      h+=(d.moi?"":"<button class=\"btn sec\" data-a=\"sig\" data-id=\""+RV.esc(id)+"\">Signaler ce document</button>")+
        (distant()&&estMod()?"<button class=\"btn discret\" data-a=\"del\" data-id=\""+RV.esc(id)+"\">Supprimer ce document</button>":"");
    }else if(estMod()){
      h+=(distant()?"":"<div class=\"avis\"><b>Mode test local.</b> Sur la version finale, seuls les modérateurs pourront publier ou refuser.</div>")+
        "<div class=\"rangee\"><button class=\"btn\" data-a=\"pub\" data-id=\""+RV.esc(id)+"\">"+(distant()?"Publier":"Publier (test)")+"</button><button class=\"btn sec\" data-a=\"del\" data-id=\""+RV.esc(id)+"\">Refuser et supprimer</button></div>";
    }else{
      h+="<div class=\"avis\">Ton document est en attente de validation par un modérateur.</div><button class=\"btn sec\" data-a=\"del\" data-id=\""+RV.esc(id)+"\">Retirer mon envoi</button>";
    }
    if(info)h+="<div class=\"avis\" role=\"status\">"+RV.esc(info)+"</div>";
    el.innerHTML=h;
  }).catch(function(){if(live())el.innerHTML="<div class=\"erreur\" role=\"alert\">Impossible de lire ce document.</div>"})}}}

function fini(){RV.pend=null;RV.draw(false);return false}
function echecDoc(e){info=(e&&e.message)||"Action impossible";fini()}
A.pub=function(b){RS.docs.publier(b.getAttribute("data-id")).then(function(){info="";fini()}).catch(echecDoc);return false};
A.sig=function(b){RV.pend="sig:"+b.getAttribute("data-id");return true};
A.asig=function(b){RS.docs.signaler(b.getAttribute("data-id"),b.getAttribute("data-r")).then(function(){info=distant()?"Merci : ton signalement a été transmis aux modérateurs.":"Document signalé.";fini()}).catch(function(e){info=/Déjà fait/.test((e&&e.message)||"")?"Tu as déjà signalé ce document.":((e&&e.message)||"Action impossible");fini()});return false};
A.del=function(b){RV.pend="del:"+b.getAttribute("data-id");return true};
A.delok=function(b){RS.docs.supprimer(b.getAttribute("data-id")).then(function(){RV.pend=null;location.hash="#/archive"}).catch(echecDoc);return false};

RV.vues.archive=function(p){if(porte())return vPorte();return p[1]==="ajout"?vAjout():p[1]==="doc"&&p[2]?vDoc(p[2]):vBanque()};
RV.routes.push(function(h){info="";arreter();if(nv.ok)nv=nouveau();if(h.indexOf("#/archive")!==0)liberer()});
})();
