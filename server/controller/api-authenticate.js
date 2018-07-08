let ApiAuth = require('../database/models/api-authenticate');

module.exports.getApi = function (req, res) {
    ApiAuth.find(function (err, apiAuth) {
        if (err) {
            res.send(err);
        };
        res.json(apiAuth);
    });
}

module.exports.apiReadOne = function (req, res) {  
    ApiAuth
        .findById(req.params.apiAuth_id)
        .exec(function (err, apiAuth) {
            if (!apiAuth) {
                console.log("Not found api")
                return;
            }else{
                if (err){
                    console.log(err);
                    return;
                }
            }
            res.json(apiAuth);         
        })
}
module.exports.addApi = function (req, res) {
 
    ApiAuth.create({
        name: req.body.name,
        method: req.body.method,
        route: req.body.route,
        payloadParams: JSON.stringify(req.body.payloadParams),
        note: req.body.note,
        response: JSON.stringify(req.body.response),
        errResponse: JSON.stringify(req.body.errResponse)
    }, function (err, apiAuth) {
        if (err) {
            res.send({content: err});
        }
        else res.send(apiAuth);
    });
}

module.exports.editApi = function (req, res) {
    ApiAuth
        .findById(req.params.apiAuth_id)
        .exec(function (err, apiAuth) {
            if (err) {
                console.log(err);
            }
            apiAuth.name = req.body.name;
            apiAuth.method = req.body.method;
            apiAuth.route = req.body.route;
            apiAuth.payloadParams = JSON.stringify(req.body.payloadParams),
            apiAuth.note = req.body.note;
            apiAuth.response = JSON.stringify(req.body.response);
            apiAuth.errResponse = JSON.stringify(req.body.errResponse);
            apiAuth.save(function (err, apiAuth) {
                if (err) {
                    console.log(err);
                }
            })
        })
}

module.exports.deleteApi = function (req, res) {
    if (req.params.apiAuth_id){
        ApiAuth
        .findByIdAndRemove(req.params.apiAuth_id)
        .exec(function(err, apiAuth) {
            if(err) {
                console.log(err);
            }
        })
    } else {
        console.log("Not found")
    }   
}
