// Test Lunr avec indexetion d un fichier csv

var lunr = require('lunr');
var fs = require('fs');

var data = fs.readFileSync('./data/aichallenge.json', 'utf8');
var entreprise = JSON.parse(data);
    
    var idx = lunr(function () {
        this.ref('entreprise')
        this.field('descriptif')

        entreprise.forEach(function (doc) {
            this.add(doc)
        }, this);
    });
    
    console.log(idx.search("health mobility"));

