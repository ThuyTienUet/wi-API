// xlsxj = require("xlsx-to-json");
// xlsxj({
//   input: "API.xlsx",
//   output: "output.json"
// }, function (err, result) {
//   if (err) {
//     console.error(err);
//   } else {
//     // console.log(result);
//   }
// });

let fs = require('fs');
var request = require('request');

fs.readFile('output.json', 'utf8', function (err, data) {
  let obj = JSON.parse(data);
  for (let x = 0; x < obj.length; x++) {
    console.log(obj[x]);
    doPost('http://localhost:3000/api/apiInsight', obj[x], function (res) {
      // console.log(res);
    });

  }
});

function doPost(url, payload, callback) {
  request({
    method: 'POST',
    url: url,
    json: true,
    body: payload
  }, function (error, response, body) {
    var res = null;
    if (error) {
      res = {
        status: 400,
        content: 'Call api wipm error!'
      };
    } else if (body.status != 200) {
      res = body;
    } else {
      res = body;
    }
    callback(res);
  });
}
