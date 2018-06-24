var firebase = require("firebase-admin");
var fs = require('fs');
//Instanciantion de l'acces à la base
var serviceAccount = require("firebase-admin/serviceAccountKey.json");
var firebase = firebase.initializeApp({
    credential: firebase.credential.cert(serviceAccount),
    databaseURL: "https://sourcing-stratups.firebaseio.com"
});

var data = fs.readFileSync('../data/dataInput.json', 'utf8');
var entreprise = JSON.parse(data);
var entrepriseRef = firebase.database().ref("/entreprises");


var i;
for (i=0; i<entreprise.length; i++) {
        entrepriseRef.child(i).set({ 
        entreprise: entreprise[i].entreprise, 
        url: entreprise[i].url, 
        keywords: entreprise[i].keywords, 
        descriptif: entreprise[i].descriptif,
        context: entreprise[i].context
    });
}



//var entrepriseRef = firebase.database().ref("/entreprises");




//firebase-import --database_url https://sourcing-stratups.firebaseio.com --path /entreprises --json ./views/data/sourcing-entreprise_vivatech.json --merge