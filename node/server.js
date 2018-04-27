var express = require('express');
var bodyParser = require('body-parser');
//var database = require("./database");
var logger = require('morgan')
var firebase = require("firebase-admin");
//Instanciantion de l'acces à la base
var serviceAccount = require("firebase-admin/serviceAccountKey.json");
var firebase = firebase.initializeApp({
    credential: firebase.credential.cert(serviceAccount),
    databaseURL: "https://sourcing-stratups.firebaseio.com"
});


var app = express();

app.set('view engine', 'ejs');

//to storage file if needed.
app.use(express.static('views'));
app.set('/views', __dirname +'/views');

//Give the server access to the user input
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// for the logs
app.use(logger('dev'));    

app.get('/startup/:id', function (req, res) {
    var startupDetail = firebase.database().ref("/" + req.params.id);
    startupDetail.on('value', function (snapshot) {
        var startupProfile = snapshot.val();
        //console.log(startupProfile.contact);
        res.render('home.ejs', {
            id: req.params.id, startupProfile: startupProfile}); 
    })
})/*
.post('/startup/add/', function(req, res) {
    //var entreprise = req.body.entreprise;
    //res.render('startup.ejs', {data: entreprise});
    var entreprise = req.body.entreprise;
    var startup = database.addStartup(001, entreprise);
    //res.render('home.ejs', {data : });
    
})
    addStartup: function addStartup(id, object) {
        var startupNew = firebase.database().ref("/" + id);
        startupNew.set({ object });
    },

    //update startup details by id
var updateDetails = firebase.database().ref()
        .child('/'+ startupId + '/').set({object});

//update contactname by id
var updateContact = firebase.database().ref()
    .child('/' + startupId + '/').update({
        "/contact": "bioman",
    });
*/
   .use(function (req, res, next) {
    res.setHeader('Content-Type', 'text/plain');
    res.status(404).send('startup introuvable !');
});

app.listen(8080);