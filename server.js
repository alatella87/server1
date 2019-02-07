const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient

let db;
let blabla;

const URL = 'mongodb://alatella:Aaa987987987***@ds119445.mlab.com:19445/star-wars-quotes';
const dbName = 'star-wars-quotes';

MongoClient.connect(URL, { useNewUrlParser: true }, (err, database) => {
    if (err) return console.log(err);
    app.listen(3000, () => {
        db = database.db(dbName);
        console.log('listening on port 3000')
    })
});

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static('public'));


// GET Request (path variable and callback)
app.get('/', (req, res) => {
    db.collection('quotes').find().toArray((err, result) => {
        if (err) return console.log(err)
        res.render('index.ejs', {quotes: result})
    })
});

// app.update (PUT)

app.post('/quotes', (req, res) => {
    db.collection('quotes').save(req.body, (err, result) => {
        if (err) return console.log(err)
        console.log('saved to database')
        res.redirect('/')
    })
})

