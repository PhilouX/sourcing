var express = require('express');
var database = require("./database");
var app = express();

app.get('/startup/:id', function (req, res) {
    var startup = database.getStartup(req.params.id);
    res.render('home.ejs', {id: req.params.id, startup: startup});
})
   .use(function (req, res, next) {
    res.setHeader('Content-Type', 'text/plain');
    res.status(404).send('startup introuvable !');
});

app.listen(8080);