var express = require('express');

var app = express();

app.get('/startup/:id', function (req, res) {
    res.render('home.ejs', {startup: req.params.id});
})
   .use(function (req, res, next) {
    res.setHeader('Content-Type', 'text/plain');
    res.status(404).send('startup introuvable !');
});

app.listen(8080);