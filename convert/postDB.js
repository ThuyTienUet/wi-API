let fs = require('fs');
let request = require('request');
let async = require("async");

fs.readFile('output.json', 'utf8', function (err, data) {
  let obj = JSON.parse(data);
  async.forEachOfSeries(obj, (value, key, callback) => {
    console.log(value, key);
    doPost('http://localhost:3000/api/apiInsight', value, function (res) {
      console.log(res);
      callback();
    });   
  }, err => {
    if (err) console.error(err.message);
  });

  // for (let x = 0; x < obj.length; x++) {
  //   doPost('http://localhost:3000/api/apiInsight', obj[x], function (res) {
  //     // console.log(res);
  //   });
  // }
});

function doPost(url, payload, callback) {
  request({
    method: 'POST',
    url: url,
    json: true,
    body: payload,
    gzip:true
  }, function (error, response, body) {
    var res = null;
    if (error) {
      callback(error);
    } else  callback(body);
  });
}
