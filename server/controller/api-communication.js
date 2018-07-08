let ApiCom = require('../database/models/api-communication');

module.exports.getApi = function (req, res) {
    ApiCom.find(function (err, apiCom) {
        if (err) {
            res.send(err);
        };
        res.json(apiCom);
    });
}

module.exports.apiReadOne = function (req, res) {  
    ApiCom
        .findById(req.params.apiCom_id)
        .exec(function (err, apiCom) {
            if (!apiCom) {
                console.log("Not found api")
                return;
            }else{
                if (err){
                    console.log(err);
                    return;
                }
            }
            res.json(apiCom);         
        })
}
module.exports.addApi = function (req, res) {
    ApiCom.create({
        name: req.body.name,
        method: req.body.method,
        route: req.body.route,
        payloadParams: JSON.stringify(req.body.payloadParams),
        samplePayload: JSON.stringify(req.body.samplePayload),
        note: req.body.note,
        response: JSON.stringify(req.body.response)
    }, function (err, apiCom) {
        if (err) {
            res.send({content: err});
        }
        else res.send({content: "ok"});
    });
}

module.exports.editApi = function (req, res) {
    ApiCom
        .findById(req.params.apiCom_id)
        .exec(function (err, apiCom) {
            if (err) {
                console.log(err);
            }
            apiCom.name = req.body.name;
            apiCom.method = req.body.method;
            apiCom.route = req.body.route;
            apiCom.payloadParams = JSON.stringify(req.body.payloadParams),
            apiCom.samplePayload = JSON.stringify(req.body.samplePayload),
            apiCom.note = req.body.note;
            apiCom.response = JSON.stringify(req.body.response);
            apiCom.save(function (err, apiCom) {
                if (err) {
                    console.log(err);
                }
            })
        })
}

module.exports.deleteApi = function (req, res) {
    if (req.params.apiCom_id){
        ApiCom
        .findByIdAndRemove(req.params.apiCom_id)
        .exec(function(err, apiCom) {
            if(err) {
                console.log(err);
            }
        })
    } else {
        console.log("Not found")
    }   
}
