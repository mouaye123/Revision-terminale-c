/* ===== COMPTE : connexion, inscription, déconnexion =====
   Cette page n'existe que si Supabase est configuré (js/config.js). */
(function(){
"use strict";
var RV=window.RV,SB=window.RV_SB;
if(!RV||!SB||!SB.actif)return;
var mode="connexion",msg="",ok=false,occupe=false,esc=RV.esc,saisie={email:"",nom:""};

function vue(){
  var u=SB.utilisateur(),h;
  if(u){
    var p=SB.profil()||{},nom=p.nom_affiche||u.nom||"Élève";
    h="<h1>Mon compte</h1><div class=\"plein\"><span class=\"note\">Connecté</span><p><b>"+esc(nom)+"</b><br><span class=\"douce\">"+esc(u.email||"")+"</span></p>"+
      (SB.estModerateur()?"<p><b>Modérateur</b> : tu peux valider les devoirs dans la banque, onglet « À valider ».</p>":"")+"</div>"+
      "<p class=\"douce\">Ta progression est enregistrée sur ton compte : tu la retrouves sur tous tes appareils.</p>"+
      (msg?"<div class=\""+(ok?"avis":"erreur")+"\" role=\"status\">"+esc(msg)+"</div>":"")+
      "<div class=\"champ\"><label for=\"c-nom\">Nom affiché</label><input id=\"c-nom\" type=\"text\" maxlength=\"40\" value=\""+esc(nom)+"\"></div>"+
      "<div class=\"rangee\"><button class=\"btn sec\" data-a=\"cnom\"".concat(occupe?" disabled":"",">Enregistrer le nom</button><button class=\"btn\" data-a=\"cdeco\">Se déconnecter</button></div>");
  }else{
    var ins=mode==="inscription";
    h="<h1>"+(ins?"Créer un compte":"Se connecter")+"</h1>"+
      "<p class=\"douce\">Un compte gratuit permet de consulter la banque des anciens sujets, de partager des devoirs et de garder ta progression.</p>"+
      "<div class=\"onglets\" role=\"group\" aria-label=\"Connexion ou inscription\"><button data-a=\"cmode\" data-m=\"connexion\" aria-pressed=\""+!ins+"\">Connexion</button><button data-a=\"cmode\" data-m=\"inscription\" aria-pressed=\""+ins+"\">Créer un compte</button></div>"+
      (ins?"<div class=\"champ\"><label for=\"c-nom\">Nom affiché (un pseudo suffit)</label><input id=\"c-nom\" type=\"text\" maxlength=\"40\" autocomplete=\"nickname\" value=\""+esc(saisie.nom)+"\"></div>":"")+
      "<div class=\"champ\"><label for=\"c-email\">Email</label><input id=\"c-email\" type=\"email\" autocomplete=\"email\" inputmode=\"email\" value=\""+esc(saisie.email)+"\"></div>"+
      "<div class=\"champ\"><label for=\"c-mdp\">Mot de passe (6 caractères minimum)</label><input id=\"c-mdp\" type=\"password\" autocomplete=\""+(ins?"new-password":"current-password")+"\"></div>"+
      (msg?"<div class=\""+(ok?"avis":"erreur")+"\" role=\"alert\">"+esc(msg)+"</div>":"")+
      (occupe?"<p role=\"status\"><b>Un instant…</b></p>":"")+
      "<button class=\"btn\" data-a=\"cenvoyer\""+(occupe?" disabled":"")+">"+(ins?"Créer mon compte":"Me connecter")+"</button>"+
      "<p class=\"douce\">Ton email sert seulement à te connecter : il n'est jamais montré aux autres élèves.</p>";
  }
  return{t:"Mon compte",b:"#/",nav:"compte",h:h};
}
RV.vues.compte=vue;
RV.routes.push(function(){msg="";ok=false;occupe=false});

function valeur(id){var e=document.getElementById(id);return e?e.value.trim():""}
function echec(e){occupe=false;ok=false;msg=(e&&e.message)||"Une erreur est survenue.";RV.draw(false)}
var A=RV.actions;
A.cmode=function(b){saisie.email=valeur("c-email")||saisie.email;saisie.nom=valeur("c-nom")||saisie.nom;mode=b.getAttribute("data-m");msg="";return true};
A.cenvoyer=function(){
  var email=valeur("c-email"),mdp=document.getElementById("c-mdp")?document.getElementById("c-mdp").value:"",nom=valeur("c-nom");
  saisie.email=email;saisie.nom=nom;
  if(!/^\S+@\S+\.\S+$/.test(email)){ok=false;msg="Écris une adresse email valide.";return true}
  if(mdp.length<6){ok=false;msg="Le mot de passe doit avoir au moins 6 caractères.";return true}
  occupe=true;msg="";RV.draw(false);
  if(mode==="inscription"){
    SB.inscrire(email,mdp,nom).then(function(r){
      occupe=false;
      if(r.connecte){saisie={email:"",nom:""};location.hash="#/"}
      else{ok=true;mode="connexion";msg="Compte créé. Confirme ton email (regarde ta boîte de réception), puis connecte-toi.";RV.draw(false)}
    }).catch(echec);
  }else{
    SB.connecter(email,mdp).then(function(){occupe=false;saisie={email:"",nom:""};location.hash="#/"}).catch(echec);
  }
  return false;
};
A.cdeco=function(){SB.deconnecter().then(function(){msg="";RV.draw(true)});return false};
A.cnom=function(){
  var nom=valeur("c-nom");if(!nom){ok=false;msg="Écris un nom.";return true}
  occupe=true;RV.draw(false);
  SB.changerNom(nom).then(function(){occupe=false;ok=true;msg="Nom enregistré.";RV.draw(false)}).catch(echec);
  return false;
};

/* Entrée de menu « Mon compte » */
var ul=document.querySelector("#menu ul"),li=null,lien=null;
if(ul){
  li=document.createElement("li");
  li.innerHTML="<a href=\"#/compte\" data-nav=\"compte\"><svg class=\"ico\" viewBox=\"0 0 24 24\" aria-hidden=\"true\"><circle cx=\"12\" cy=\"8\" r=\"4\"/><path d=\"M4 21a8 8 0 0 1 16 0\"/></svg><span class=\"cn\">Se connecter</span></a>";
  lien=li.firstChild;
  var ref=ul.querySelector("[data-intro-open]");
  if(ref&&ref.parentNode)ul.insertBefore(li,ref.parentNode);else ul.appendChild(li);
}
function menu(){
  if(!lien)return;
  var u=SB.utilisateur(),p=SB.profil()||{};
  lien.querySelector(".cn").textContent=u?("Mon compte ("+(p.nom_affiche||u.nom||"Élève")+")"):"Se connecter";
}
SB.ecouter(function(){menu();if(location.hash==="#/compte"||location.hash.indexOf("#/archive")===0)RV.draw(false)});
menu();
})();
