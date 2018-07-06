let request = require('request');
let fs = require ('fs');

request('http://localhost:3000/api/apiInsight', { json: true }, (err, res, body) => {
    if (err) { 
        return console.log(err); 
    }
    let api_arr = res.body;
    fs.writeFileSync('api.js', '');
    for (let i = 0 ; i < api_arr.length ; i++) {
        let str = '\n/**';
        str += '\n * Method: ' + api_arr[i].method + '__________';
        str += '\n * Route: ' + api_arr[i].route;
        str += '\n * @name Name: ' + api_arr[i].name;    
        str += '\n */\n';
        fs.appendFileSync('api.js', str);
    }
});