//initialize firebase and get a firebase reference = database
var firebase = require("firebase-admin");
var serviceAccount = require("firebase-admin/serviceAccountKey.json");
firebase.initializeApp({
    credential: firebase.credential.cert(serviceAccount),
    databaseURL: "https://sourcing-stratups.firebaseio.com"
});
var database = firebase.database();

//fetch the object startup and prepare instanciation
var Startup = require("./startup.js");
/*
const test = new Startup("Paul", 
                        "France", 
                        "2009", 
                        "blablabla", 
                        "Company", 
                        5, 
                        9, 
                        ["AI"], 
                        "p.ef@d.com", 
                        false, 
                        "www.google.com");

console.log(test)
*/

//add a startup

var id = 32003
var object = new Startup("Fabio Kuhn", "United Kingdom", 2016, "Provider of an analytics platform designed to focus on the oil markets. The company uses artificial intelligence to analyse and interpret data on a massive scale and absorbs billions of data points from hundreds of sources to show past present and future flows of oil worldwide enabling traders to outperform the competition with actionable real-time market intelligence.",
    "Vortexa", "", 1985, ["Business/Productivity Software", "Media and Information Services (B2B)", "Other EnergyArtificial Intelligence & Machine Learning"],
    "fabio.kuhn@vortexa.com", "?", "vortexa.com");

var startupDetail = firebase.database().ref("/" + id );

startupDetail.set({object});

//const essai = new startup.constructor('jean', 'USA', '2009', 'blablabla', 'company', 2, 32090, 'AI', 'mail@mail.com', true, 'www.google.com');
//console.log(essai)
/*
function addStartup(contact, country, creation_date, descriptif, entreprise, funds, id, keywords, mail, target, url) {
    var newStartup = essai;

}*/

/*
//get a startup descriptif by id
var startupId = 32000;
var descriptifRef = firebase.database().ref('/' + startupId + '/');
descriptifRef.on('value', function (snapshot) {
    console.log(snapshot.val());
});

//update startup details by id
var updateDetails = firebase.database().ref()
        .child('/'+ startupId + '/').set({contact : "Fabio Kuhn",
            country : "United Kingdom",
            creation_date : 2016,
            descriptif : "Provider of an analytics platform designed to focus on the oil markets. The company uses artificial intelligence to analyse and interpret data on a massive scale and absorbs billions of data points from hundreds of sources to show past present and future flows of oil worldwide enabling traders to outperform the competition with actionable real-time market intelligence.",
            entreprise : "Vortexa",
            funds : "",
            id : 1985,
            keywords : ["Business/Productivity Software", "Media and Information Services (B2B)", "Other EnergyArtificial Intelligence & Machine Learning"],
            mail : "fabio.kuhn@vortexa.com",
            target : "?",
            url : "vortexa.com"});

//update contactname by id
var updateContact = firebase.database().ref()
    .child('/' + startupId + '/').update({
        "/contact": "bioman",
    });
*/
//add a new startup





