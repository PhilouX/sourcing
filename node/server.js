var express = require('express');
var app = express();

var database = require("./database");

//Test sans vue
//var test = database.getStartup(10);
//console.log(test);

app.get('/startup/:id', function (req, res) {
    var startup = database.getStartup(req.params.id);
    res.render('home.ejs', {id: req.params.id, startup: startup});
})
   .use(function (req, res, next) {
    res.setHeader('Content-Type', 'text/plain');
    res.status(404).send('startup introuvable !');
});

app.listen(8080);