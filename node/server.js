//initialize firebase and get a firebase reference = database
var firebase = require("firebase-admin");
var serviceAccount = require("firebase-admin/serviceAccountKey.json");
firebase.initializeApp({
    credential: firebase.credential.cert(serviceAccount),
    databaseURL: "https://sourcing-stratups.firebaseio.com"
});
//var database = firebase.database();

//fetch the object startup and prepare instanciation
var Startup = require("./startup.js");

//add a startup document
function addStartup(id, object) {
    var startupDetail = firebase.database().ref("/" + id);
    startupDetail.set({ object });
}

//simulate adding a mock document
var id = 32005
var object = new Startup("Superman", "United Kingdom", 2016, "Provider of an analytics platform designed to focus on the oil markets. The company uses artificial intelligence to analyse and interpret data on a massive scale and absorbs billions of data points from hundreds of sources to show past present and future flows of oil worldwide enabling traders to outperform the competition with actionable real-time market intelligence.",
    "International one", "", 1985, ["Business/Productivity Software", "Media and Information Services (B2B)", "Other EnergyArtificial Intelligence & Machine Learning"],
    "p@v.com", "?", "google.com");

addStartup(id, object);





/*
//get a startup descriptif by id
var startupId = 32000;
var descriptifRef = firebase.database().ref('/' + startupId + '/');
descriptifRef.on('value', function (snapshot) {
    console.log(snapshot.val());
});

//update startup details by id
var updateDetails = firebase.database().ref()
        .child('/'+ startupId + '/').set({contact : "blabl",
            country : "United Kingdom",
            creation_date : 2016,
            descriptif : "Provider of an analytics platform designed to focus on the oil markets. The company uses artificial intelligence to analyse and interpret data on a massive scale and absorbs billions of data points from hundreds of sources to show past present and future flows of oil worldwide enabling traders to outperform the competition with actionable real-time market intelligence.",
            entreprise : "company",
            funds : "",
            id : 1985,
            keywords : ["Business/Productivity Software", "Media and Information Services (B2B)", "Other EnergyArtificial Intelligence & Machine Learning"],
            mail : "mail",
            target : "?",
            url : "url"});

//update contactname by id
var updateContact = firebase.database().ref()
    .child('/' + startupId + '/').update({
        "/contact": "bioman",
    });
*/
//add a new startup





