var firebase = require("firebase-admin");
var fs = require('fs');
//Instanciantion de l'acces à la base
var serviceAccount = require("firebase-admin/serviceAccountKey.json");
var firebase = firebase.initializeApp({
    credential: firebase.credential.cert(serviceAccount),
    databaseURL: "https://sourcing-stratups.firebaseio.com"
});

var data = fs.readFileSync('../data/aichallenge.json', 'utf8');
var entreprise = JSON.parse(data);
var entrepriseRef = firebase.database().ref("/entreprises");

var i;
for (i=0; i<entreprise.length; i++) {
    //keywords=[]
    //keywords.append(words[i].contact)
    entrepriseRef.push({ entreprise: entreprise[i].entreprise, url: entreprise[i].url, keywords: [entreprise[i].keywords], descriptif: entreprise[i].descriptif});
}


//var entrepriseRef = firebase.database().ref("/entreprises");




//entrepriseRef.push('zzzrrrTTT');