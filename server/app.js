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

mongoURI = 'mongodb://localhost:27017/api-well-insight';

mongoose.connect(mongoURI);
// mongoose.connect(
    
//     // 'mongodb://apiWI:a123456@ds215961.mlab.com:15961/api-well-insight'
// );

app.use(routesApi);

// app.use(function (req, res) {
//     res.sendfile(path.join(__dirname, '../client', 'index.html'));
// });

app.listen(3000);
console.log("app listening on port 3000");

module.exports = app;
