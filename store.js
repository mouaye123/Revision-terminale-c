/* ===== SAUVEGARDE : progression + archive des devoirs =====
   Tout ce qui est enregistré passe par ce fichier.
   - Progression : toujours dans le téléphone (localStorage) ; copiée dans Supabase si l'élève est connecté.
   - Devoirs : MODE LOCAL (IndexedDB, sur le téléphone) tant que Supabase n'est pas configuré ;
               sinon dans Supabase (base de données + stockage des images). */
window.RV_STORE=(function(){
"use strict";
var K="rv4-etat";
function sb(){var s=window.RV_SB;return s&&s.actif&&s.utilisateur()?s:null}

/* ----- Progression ----- */
function defaut(){
  var e={},D=window.RV_DATA;
  D.KEYS.forEach(function(m){e[m]=[]});
  Object.keys(D.CONTENU).forEach(function(k){var p=k.split(":");if(D.CONTENU[k].demo)e[p[0]].push(parseInt(p[1],10))});
  if(D.TOUT_OUVERT)D.KEYS.forEach(function(m){for(var n=1;n<=D.M[m].n;n++)if(e[m].indexOf(n)<0)e[m].push(n)});
  return{etu:e,ign:[]};
}
function valider(s){
  var d=defaut();
  if(!s||typeof s!=="object")return d;
  window.RV_DATA.KEYS.forEach(function(m){if(s.etu&&Array.isArray(s.etu[m]))d.etu[m]=s.etu[m].filter(Number.isInteger)});
  if(Array.isArray(s.ign))d.ign=s.ign.filter(function(x){return typeof x==="string"});
  return d;
}
function charger(){var s=null;try{s=JSON.parse(localStorage.getItem(K))}catch(e){}return valider(s)}
function sauverLocal(s){try{localStorage.setItem(K,JSON.stringify(s))}catch(e){}}
var minuteur=null;
function pousser(s){
  var S=sb();if(!S)return Promise.resolve();
  return S.rest("POST","progression?on_conflict=eleve_id",{eleve_id:S.utilisateur().id,donnees:{etu:s.etu,ign:s.ign},maj_le:new Date().toISOString()},"resolution=merge-duplicates,return=minimal").catch(function(){});
}
function sauver(s){sauverLocal(s);if(sb()){clearTimeout(minuteur);minuteur=setTimeout(function(){pousser(s)},1500)}}
/* À la connexion : la progression du compte remplace celle du téléphone ; s'il n'y en a pas, on envoie celle du téléphone */
function synchroniser(courant){
  var S=sb();if(!S)return Promise.resolve(null);
  return S.rest("GET","progression?select=donnees&eleve_id=eq."+S.utilisateur().id).then(function(l){
    if(l&&l[0])return valider(l[0].donnees);
    return pousser(courant).then(function(){return null});
  });
}

/* ----- Devoirs : mode local (IndexedDB) ----- */
var DB=null;
function ouvrir(){
  return new Promise(function(ok,ko){
    if(DB)return ok(DB);
    if(!window.indexedDB)return ko(new Error("Stockage indisponible sur ce navigateur"));
    var r=indexedDB.open("rv-archive",1);
    r.onupgradeneeded=function(){r.result.createObjectStore("docs",{keyPath:"id"})};
    r.onsuccess=function(){DB=r.result;ok(DB)};
    r.onerror=function(){ko(r.error||new Error("Stockage refusé"))};
  });
}
function tx(mode,fn){
  return ouvrir().then(function(db){
    return new Promise(function(ok,ko){
      var t=db.transaction("docs",mode),r=fn(t.objectStore("docs"));
      t.oncomplete=function(){ok(r.result)};
      t.onerror=t.onabort=function(){ko(t.error||new Error("Stockage refusé"))};
    });
  });
}
var local={
  tous:function(){return tx("readonly",function(s){return s.getAll()})},
  un:function(id){return tx("readonly",function(s){return s.get(id)})},
  ajouter:function(d){var c=Object.assign({},d);delete c.mini;return tx("readwrite",function(s){return s.put(c)})},
  maj:function(id,patch){return local.un(id).then(function(d){if(!d)throw new Error("Document introuvable");return tx("readwrite",function(s){return s.put(Object.assign(d,patch))})})},
  publier:function(id){return local.maj(id,{statut:"publie",raison:null})},
  signaler:function(id,raison){return local.maj(id,{statut:"signale",raison:raison})},
  supprimer:function(id){return tx("readwrite",function(s){return s.delete(id)})}
};

/* ----- Devoirs : Supabase ----- */
function uuid(){
  if(window.crypto&&crypto.randomUUID)return crypto.randomUUID();
  var b=new Uint8Array(16);crypto.getRandomValues(b);b[6]=(b[6]&15)|64;b[8]=(b[8]&63)|128;
  var h=Array.prototype.map.call(b,function(x){return("0"+x.toString(16)).slice(-2)}).join("");
  return h.slice(0,8)+"-"+h.slice(8,12)+"-"+h.slice(12,16)+"-"+h.slice(16,20)+"-"+h.slice(20);
}
/* Colonnes de la table « documents » (voir supabase/migration.sql) :
   auteur_id, titre, matiere (clé : philo, maths…), lecon, chapitre, annee_scolaire ("2025-2026"),
   type_document, dhash, taille_octets, chemin_fichier, chemin_mini, statut, raison */
function enDoc(r,urls,moi){
  return{id:r.id,titre:r.titre,matiere:r.matiere,lecon:r.lecon,chapitre:r.chapitre||"",
    annee:r.annee_scolaire||(r.annee?r.annee+"-"+(r.annee+1):""),type:r.type_document,
    statut:r.statut,raison:r.raison,dhash:r.dhash,taille:r.taille_octets,date:Date.parse(r.cree_le),auteur:r.auteur_id,moi:r.auteur_id===moi,
    chemin:r.chemin_fichier,url:urls[r.chemin_fichier]||"",urlMini:urls[r.chemin_mini||r.chemin_fichier]||""};
}
var distant={
  tous:function(){
    var S=sb(),moi=S.utilisateur().id;
    return S.rest("GET","documents?select=*&order=cree_le.desc&limit=200").then(function(l){
      l=l||[];
      return S.stockage.signer(l.map(function(r){return r.chemin_mini||r.chemin_fichier})).then(function(u){return l.map(function(r){return enDoc(r,u,moi)})});
    });
  },
  un:function(id){
    var S=sb(),moi=S.utilisateur().id;
    return S.rest("GET","documents?select=*&id=eq."+encodeURIComponent(id)).then(function(l){
      if(!l||!l[0])return null;
      return S.stockage.signer([l[0].chemin_fichier]).then(function(u){return enDoc(l[0],u,moi)});
    });
  },
  ajouter:function(d){
    var S=sb(),id=uuid(),base=S.utilisateur().id+"/"+id,c1=base+".jpg",c2=base+"-mini.jpg";
    return S.stockage.envoyer(c1,d.blob).then(function(){return d.mini?S.stockage.envoyer(c2,d.mini):null}).then(function(){
      return S.rest("POST","documents",{id:id,auteur_id:S.utilisateur().id,titre:d.titre||"",matiere:d.matiere,lecon:d.lecon,chapitre:d.chapitre||"",
        annee:parseInt(d.annee,10)||null,annee_scolaire:d.annee,type_document:d.type,dhash:d.dhash,taille_octets:d.taille,
        chemin_fichier:c1,chemin_mini:d.mini?c2:null},"return=minimal");
    }).catch(function(e){S.stockage.retirer([c1,c2]).catch(function(){});throw e});
  },
  publier:function(id){
    var S=sb();
    return S.rest("PATCH","documents?id=eq."+encodeURIComponent(id),{statut:"publie",raison:null},"return=minimal").then(function(){
      return S.rest("DELETE","signalements?document_id=eq."+encodeURIComponent(id),undefined,"return=minimal");
    });
  },
  signaler:function(id,raison){var S=sb();return S.rest("POST","signalements",{document_id:id,auteur_id:S.utilisateur().id,motif:raison},"return=minimal")},
  supprimer:function(id){
    var S=sb();
    return S.rest("GET","documents?select=chemin_fichier,chemin_mini&id=eq."+encodeURIComponent(id)).then(function(l){
      var r=l&&l[0],ch=r?[r.chemin_fichier,r.chemin_mini].filter(Boolean):[];
      return S.rest("DELETE","documents?id=eq."+encodeURIComponent(id),undefined,"return=minimal").then(function(){
        return ch.length?S.stockage.retirer(ch).catch(function(){}):null;
      });
    });
  }
};
function base(){return sb()?distant:local}
var docs={
  distant:function(){return !!sb()},
  tous:function(){return base().tous()},
  un:function(id){return base().un(id)},
  ajouter:function(d){return base().ajouter(d)},
  publier:function(id){return base().publier(id)},
  signaler:function(id,r){return base().signaler(id,r)},
  supprimer:function(id){return base().supprimer(id)}
};
return{charger:charger,sauver:sauver,sauverLocal:sauverLocal,defaut:defaut,synchroniser:synchroniser,docs:docs};
})();
