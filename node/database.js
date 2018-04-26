
//initialize firebase and get a firebase reference = database
var firebase = require("firebase-admin");
var serviceAccount = require("firebase-admin/serviceAccountKey.json");
firebase.initializeApp({
    credential: firebase.credential.cert(serviceAccount),
    databaseURL: "https://sourcing-stratups.firebaseio.com"
});
var database = firebase.database();

//fetch the object startup and prepare instanciation
var Startup = require("./startup");

module.exports = {

        //add a startup document
        addStartup: function addStartup(id, object) {
            var startupNew = firebase.database().ref("/" + id);
            startupNew.set({ object });
        },

        //get a startup descriptif by id
        getStartup: function getStartup(id){
            var startupDetail = firebase.database().ref('/' + id);
            startupDetail.on('value', function (snapshot) {
            console.log(snapshot.val());
            });
        }
}




//getStartup(20);
//addStartup(id, object);

/*
//simulate adding a mock document
var id = 32006
var object = new Startup("Superman", "United Kingdom", 2016, "Provider of an analytics platform designed to focus on the oil markets. The company uses artificial intelligence to analyse and interpret data on a massive scale and absorbs billions of data points from hundreds of sources to show past present and future flows of oil worldwide enabling traders to outperform the competition with actionable real-time market intelligence.",
    "International one", "", 1985, ["Business/Productivity Software", "Media and Information Services (B2B)", "Other EnergyArtificial Intelligence & Machine Learning"],
    "p@v.com", "?", "google.com");

//update startup details by id
var updateDetails = firebase.database().ref()
        .child('/'+ startupId + '/').set({object});

//update contactname by id
var updateContact = firebase.database().ref()
    .child('/' + startupId + '/').update({
        "/contact": "bioman",
    });
    */
