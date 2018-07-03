let express = require('express');
let path = require('path');
let mongoose = require('mongoose');
let app = express()
let bodyParser = require('body-parser'); 

let routesApi = require('./router/router');

app.use(express.static(path.join(__dirname, '../client')));
app.use(express.static(path.join(__dirname, '../server')));

app.use(bodyParser.urlencoded({'extended':'true'})); 			
app.use(bodyParser.json()); 					
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); 

mongoose.connect(
    'mongodb://a:a12345@ds215961.mlab.com:15961/api-well-insight'
);

app.use('/api', routesApi);

// app.use(function (req, res) {
//     res.sendfile(path.join(__dirname, '../client', 'index.html'));
// });

app.listen(3000);
console.log("app listening on port 3000");

module.exports = app;