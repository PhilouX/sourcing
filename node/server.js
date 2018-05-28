var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan')
var firebase = require("firebase-admin");
//Instanciantion de l'acces à la base
var serviceAccount = require("firebase-admin/serviceAccountKey.json");
var firebase = firebase.initializeApp({
    credential: firebase.credential.cert(serviceAccount),
    databaseURL: "https://sourcing-stratups.firebaseio.com"
});

//create an instance of express
var app = express();

//we use ejs
app.set('view engine', 'ejs');

//to storage file if needed.
app.use(express.static('views'));
app.set('/views', __dirname +'/views');

//Give the server access to the user input
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// for the logs
app.use(logger('dev'));    

//ne fonctionne pas, besoin de connaitre le path avec le bon id
app.get('/startup/:entreprise', function (req, res) {
    var startupDetail = firebase.database().ref("/entreprises" + req.params.entreprise);
    startupDetail.once('value', function (snapshot) {
        var startupProfile = snapshot.val();
        //console.log(startupProfile.contact);
        res.render('home.ejs', {
            entreprise: req.params.entreprise, startupProfile: startupProfile}); 
    })
})
//access to the form to add an entreprise
app.get('/add/', function (req, res){
    res.render('startupForm.ejs')
})
//adding the entreprise to db and return a page
app.post('/add/', function (req, resp) {
    var entreprise = req.body.entreprise;
    var url = req.body.url;
    var keywords = req.body.keywords;
    var descriptif = req.body.descriptif;

    var startupRef = firebase.database().ref("/entreprises");
    startupRef.push({ entreprise: entreprise, url: url, keywords: keywords, descriptif: descriptif });

    resp.render('results.ejs', { entreprise: entreprise, url: url, keywords: keywords, descriptif: descriptif });
});

//query form linked with lunr client side
app.get('/query/', function (req, res) {
    res.render('queryResult.ejs')
})

//display the list of entreprise in the db
app.get('/list/', function (req, res){
        var startupsRef = firebase.database().ref("/entreprises");
        startupsRef.once('value', (function (snapshot) {
            var data = snapshot.val();
            if (!data) {
                data = {}
            }
            console.log(data);
            res.render('startuplist.ejs', { startups: snapshot.val() })
    }))})

//l'erreur 404
app.use(function (req, res, next) {
    res.setHeader('Content-Type', 'text/plain');
    res.status(404).send('page introuvable !');
});

app.listen(8080);