// Test Lunr avec Firebase mais je n'arrive pas à prendre les doc de firebase pour les mettre dans l'index 
// le doc attendu pour l'index : [{entreprise, description}, {entreprise, description}]

var lunr = require('lunr');

var firebase = require("firebase-admin");
//Instanciantion de l'acces à la base
var serviceAccount = require("firebase-admin/serviceAccountKey.json");
var firebase = firebase.initializeApp({
    credential: firebase.credential.cert(serviceAccount),
    databaseURL: "https://sourcing-stratups.firebaseio.com"
});

var startupRef = firebase.database().ref("/entreprises");

const index = lunr(function () {
    this.ref('entreprise')
    this.field('descriptif')
});

//la fonction add() ne marche pas, index n'est pas reconnu
startupRef.on("child_added", function(snapshot){
        index.add({
            entreprise: snapshot.val().entreprise,
            descriptif: snapshot.val().descriptif

        });
    });
    
    console.log(index);



/*
startupRef.on("child_added", function(snapshot){
    entreprise = {entreprise: snapshot.val().entreprise, descriptif: snapshot.val().descriptif};

    console.log(entreprise);
});
*/
/*
var documents = [{
    "name": "Lunr",
    "text": "Like Solr, but much smaller, and not as bright."
}, {
    "name": "React",
    "text": "A JavaScript library for building user interfaces."
}, {
    "name": "Lodash",
    "text": "A modern JavaScript utility library delivering modularity, performance & extras."
}]

var idx = lunr(function () {
    this.ref('name')
    this.field('text')

    documents.forEach(function (doc) {
        this.add(doc)
    }, this)
});

console.log(idx.search("bright"));
*/