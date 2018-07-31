var jwt = require('jsonwebtoken');

module.exports.login = function (req, res) {
    console.log(req.body);
    let token = req.body.token;
    jwt.verify(token, 'secretKey', function (err, decoded) { 
        if (err) {
            res.send(response(401, 'Login Failed' + err));
        } else {
            res.send({user: decoded, token: token})
        }
    })
}
