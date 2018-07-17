let express = require('express');
let path = require('path');
let mongoose = require('mongoose');
let app = express()
let bodyParser = require('body-parser');

let routesApi = require('./router/router');

app.use(express.static(path.join(__dirname, '../client')));
app.use(express.static(path.join(__dirname, '../server')));

app.use(bodyParser.urlencoded({ 'extended': 'true' }));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

mongoose.connection.on("open", function (ref) {
    console.log("Connected to mongo server.");
    
});

mongoose.connection.on("error", function (err) {
    console.log("Could not connect to mongo server!");
    return console.log(err);
});

<<<<<<< HEAD
mongoURI = 'mongodb://localhost:27017/api-well-insight';
=======
mongoURI = 'mongodb://localhost:27017/apiWI';
>>>>>>> b0115201448a748ec3c752972a21b9fdfe7082e9

mongoose.connect(mongoURI);

app.use(routesApi);

app.listen(3000);
console.log("app listening on port 3000");

module.exports = app;
