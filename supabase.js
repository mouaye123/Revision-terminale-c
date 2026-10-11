/* ===== CLIENT SUPABASE LÉGER (sans bibliothèque) =====
   Comptes (connexion / inscription), base de données (REST) et stockage des images.
   Réglage : js/config.js, rubrique « supabase » (url + anonKey).
   Si ces deux valeurs sont vides, le site reste en MODE LOCAL (tout sur le téléphone).
   Sécurité : seule la clé « anon » (publique) est utilisée ; les règles du schéma SQL protègent les données. */
(function(){
"use strict";
var C=(window.RV_CONFIG&&window.RV_CONFIG.supabase)||{};
var URL_=String(C.url||"").replace(/\/+$/,""),KEY=String(C.anonKey||"");
var actif=/^https?:\/\/\S+$/.test(URL_)&&KEY.length>20;
var SK="rv-sb-session",BUCKET="devoirs",session=null,profil=null,ecouteurs=[],enCours=null;

function lire(){try{return JSON.parse(localStorage.getItem(SK))}catch(e){return null}}
function ecrire(s){try{if(s)localStorage.setItem(SK,JSON.stringify(s));else localStorage.removeItem(SK)}catch(e){}}
function prevenir(ev){ecouteurs.forEach(function(f){try{f(ev)}catch(e){}})}
function normaliser(r){
  var u=r.user||{};
  return{access_token:r.access_token,refresh_token:r.refresh_token,
    expires_at:r.expires_at||Math.floor(Date.now()/1000)+(r.expires_in||3600),
    user:{id:u.id,email:u.email,nom:(u.user_metadata&&u.user_metadata.nom)||""}};
}

/* ----- Messages d'erreur en français ----- */
function brutMsg(statut,txt){var j={};try{j=JSON.parse(txt)}catch(e){}return j.msg||j.message||j.error_description||j.error||txt||("Erreur "+statut)}
function traduire(m){
  var t=String(m);
  if(/Invalid login credentials/i.test(t))return "Email ou mot de passe incorrect.";
  if(/already registered|already exists/i.test(t))return "Un compte existe déjà avec cet email.";
  if(/at least \d+ characters/i.test(t))return "Mot de passe trop court (6 caractères minimum).";
  if(/valid email|invalid email|Unable to validate email/i.test(t))return "Adresse email invalide.";
  if(/rate limit|too many|over_email_send_rate/i.test(t))return "Trop de tentatives. Réessaie dans quelques minutes.";
  if(/Email not confirmed/i.test(t))return "Confirme d'abord ton email (regarde ta boîte de réception).";
  if(/row-level security|violates row/i.test(t))return "Action non autorisée.";
  if(/duplicate key|23505/i.test(t))return "Déjà fait.";
  if(/Payload too large|exceeded the maximum allowed size/i.test(t))return "Image trop lourde.";
  return t;
}

/* ----- Appels HTTP ----- */
function brut(chemin,opt){return fetch(URL_+chemin,opt).catch(function(){throw new Error("Impossible de joindre le serveur. Vérifie ta connexion Internet.")})}
function entetes(anonyme,extra){
  var h={apikey:KEY,Authorization:"Bearer "+((!anonyme&&session)?session.access_token:KEY)};
  for(var k in extra)h[k]=extra[k];return h;
}
function authPost(chemin,corps){
  return brut(chemin,{method:"POST",headers:entetes(true,{"Content-Type":"application/json"}),body:JSON.stringify(corps)})
    .then(function(r){return r.text().then(function(t){
      if(!r.ok)throw new Error(traduire(brutMsg(r.status,t)));
      return t?JSON.parse(t):{}})});
}
function rafraichir(){
  if(!session||!session.refresh_token)return Promise.reject(new Error("Session expirée, reconnecte-toi."));
  return authPost("/auth/v1/token?grant_type=refresh_token",{refresh_token:session.refresh_token}).then(function(j){
    var s=normaliser(j);if(!s.user.id)s.user=session.user;session=s;ecrire(s);return s;
  },function(){session=null;profil=null;ecrire(null);prevenir("sortie");throw new Error("Session expirée, reconnecte-toi.")});
}
function valide(){
  if(!session||session.expires_at-30>Date.now()/1000)return Promise.resolve();
  if(!enCours)enCours=rafraichir().then(function(){enCours=null},function(e){enCours=null;throw e});
  return enCours;
}
function appel(chemin,opt){
  return valide().then(function(){opt.headers=entetes(false,opt.headers||{});return brut(chemin,opt)}).then(function(r){
    if(r.status===204)return null;
    return r.text().then(function(t){
      if(!r.ok)throw new Error(traduire(brutMsg(r.status,t)));
      if(!t)return null;try{return JSON.parse(t)}catch(e){return t}});
  });
}

/* ----- Base de données (PostgREST) ----- */
function rest(methode,chemin,corps,prefer){
  var h={"Content-Type":"application/json"};if(prefer)h.Prefer=prefer;
  var o={method:methode,headers:h};if(corps!==undefined)o.body=JSON.stringify(corps);
  return appel("/rest/v1/"+chemin,o);
}

/* ----- Stockage des images ----- */
var stockage={
  envoyer:function(chemin,blob){return appel("/storage/v1/object/"+BUCKET+"/"+chemin,{method:"POST",headers:{"Content-Type":blob.type||"image/jpeg","x-upsert":"false"},body:blob})},
  signer:function(chemins){
    if(!chemins.length)return Promise.resolve({});
    return appel("/storage/v1/object/sign/"+BUCKET,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({expiresIn:3600,paths:chemins})}).then(function(l){
      var m={};(l||[]).forEach(function(x){if(x&&x.signedURL&&!x.error)m[x.path]=URL_+"/storage/v1"+x.signedURL});return m});
  },
  retirer:function(chemins){return appel("/storage/v1/object/"+BUCKET,{method:"DELETE",headers:{"Content-Type":"application/json"},body:JSON.stringify({prefixes:chemins})})}
};

/* ----- Comptes ----- */
function chargerProfil(){
  if(!session)return Promise.resolve(null);
  return rest("GET","profils?select=nom_affiche,role&id=eq."+session.user.id).then(function(l){
    profil=(l&&l[0])||{nom_affiche:"",role:"eleve"};return profil;
  },function(){profil={nom_affiche:"",role:"eleve"};return profil});
}
function inscrire(email,mdp,nom){
  return authPost("/auth/v1/signup",{email:email,password:mdp,data:{nom:nom,nom_affiche:nom}}).then(function(j){
    if(!j.access_token)return{connecte:false};
    session=normaliser(j);ecrire(session);
    return chargerProfil().then(function(){prevenir("entree");return{connecte:true}});
  });
}
function connecter(email,mdp){
  return authPost("/auth/v1/token?grant_type=password",{email:email,password:mdp}).then(function(j){
    session=normaliser(j);ecrire(session);return chargerProfil();
  }).then(function(){prevenir("entree")});
}
function deconnecter(){
  var p=session?brut("/auth/v1/logout",{method:"POST",headers:entetes(false,{})}).catch(function(){}):Promise.resolve();
  session=null;profil=null;ecrire(null);prevenir("sortie");return p;
}
function changerNom(nom){
  return rest("PATCH","profils?id=eq."+session.user.id,{nom_affiche:nom},"return=minimal").then(function(){
    if(profil)profil.nom_affiche=nom;prevenir("profil");
  });
}

window.RV_SB={
  actif:actif,
  utilisateur:function(){return actif&&session?session.user:null},
  profil:function(){return profil},
  estModerateur:function(){return !!(profil&&(profil.role==="moderateur"||profil.role==="admin"))},
  inscrire:inscrire,connecter:connecter,deconnecter:deconnecter,changerNom:changerNom,
  rest:rest,stockage:stockage,
  ecouter:function(f){ecouteurs.push(f)}
};

/* Au démarrage : si une session existe, on récupère le profil puis on prévient le site */
if(actif){
  session=lire();
  if(session&&session.user&&session.user.id){
    valide().then(chargerProfil).then(function(){prevenir("entree")},function(){});
  }else session=null;
}
})();
