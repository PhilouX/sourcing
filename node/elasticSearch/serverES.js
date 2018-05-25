var express = require('express');
var app = express();

//Instanciantion de l'acces à la base
var firebase = require("firebase-admin");
var serviceAccount = require("firebase-admin/serviceAccountKey.json");
var firebase = firebase.initializeApp({
    credential: firebase.credential.cert(serviceAccount),
    databaseURL: "https://sourcing-stratups.firebaseio.com"
});
//file system for example
const fs = require('fs');

//esClient
const elasticsearch = require('elasticsearch');
const esClient = new elasticsearch.Client({
        host: '127.0.0.1:9200',
        log: 'error'
    });

//index creation
const bulkIndex = function bulkIndex(index, type, data) {
    let bulkBody = [];

    data.forEach(item => {
        bulkBody.push({
            index: {
            _index: index,
            _type: type,
            _id: item.id
            }
        });

        bulkBody.push(item);
    });

    esClient.bulk({ body: bulkBody })
        .then(response => {
            let errorCount = 0;
            response.items.forEach(item => {
                if (item.index && item.index.error) {
                    console.log(++errorCount, item.index.error);
                }
            });
            console.log(`Successfully indexed ${data.length - errorCount} out of ${data.length} items`);
        })
        .catch(console.err);
    };

    const test = function test() {

        // test avec file sys for now
        const startups = fs.readFileSync('test.json');
        // Fetch data from firebase
        //var startupsRef = firebase.database().ref("/1986");
        //startupsRef.once('value', (function (snapshot) {
        //    var documents = snapshot.val();
        //    console.log(documents)
            //var essai = ['{"contact": "Maximilian Lober", "country": "Germany"}'];
        var documents = JSON.parse(startups);
        //console.log(documents);
        console.log(`${documents.length} items parsed from data file`);
        bulkIndex('test', 'abricot', documents);
        };

    test();

    module.exports = {
        bulkIndex
    };

/*
const elasticsearch = require('elasticsearch');
const fs = require('fs');
const serviceAccount = require('./serviceAccountKey.json');
var firebase = require("firebase-admin");
var firebase = firebase.initializeApp({
    credential: firebase.credential.cert(serviceAccount),
    databaseURL: "https://sourcing-stratups.firebaseio.com"
});

const esClient = new elasticsearch.Client({
    host: '127.0.0.1:9200',
    log: 'trace'
});

const bulkIndex = function bulkIndex(index, type, data) {
    let bulkBody = [];

    data.forEach(item => {
        bulkBody.push({
            index: {
                _index: index,
                _type: type,
                _id: item.id
            }
        });

        bulkBody.push(item);
    });

    esClient.bulk({ body: bulkBody })
        .then(response => {
            console.log('here');
            let errorCount = 0;
            response.items.forEach(item => {
                if (item.index && item.index.error) {
                    console.log(++errorCount, item.index.error);
                }
            });
            console.log(
                `Successfully indexed ${data.length - errorCount}
       out of ${data.length} items`
            );
        })
        .catch(console.err);
};

const test = function test() {
    const articlesRaw = fs.readFileSync('mock-data.json');
    const articles = JSON.parse(articlesRaw);
    console.log(`${articles.length} items parsed from data file`);
    bulkIndex('library', 'article', articles);
};

test()

module.exports = {
    bulkIndex
};
*/
/*
client.create({
    index: 'startuindex',
    type: '',
    id: '1',
    body: {
        entreprise: 'WorldCompany',
        tags: ['marteau', 'vitre'],
        descriptif: "Entreprise locale de production de légumes"
    }
}, function (error, response) {
    // ...
});
*/
/*
let questions = [];
admin.database().ref("/questions/published").orderByKey().once("value").then(qs => {
    //console.log("Questions Count: " + qs.length);
    qs.forEach(q => {
        //console.log(q.key);
        //console.log(q.val());
        let question: { "id": string, "type": string, "source": any } = { "id": q.key, "type": q.val().categoryIds["0"], "source": q.val() };
        questions.push(question);
    });

    ESUtils.rebuildIndex(ESUtils.QUESTIONS_INDEX, questions).then((response) => {
        res.send(`Questions indexed`);
    })
        .catch((error) => {
            res.send(error);
        })
});  
});
*/


