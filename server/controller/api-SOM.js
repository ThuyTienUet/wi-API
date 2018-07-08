let ApiSOM = require('../database/models/api-SOM');

module.exports.getApi = function (req, res) {
    ApiSOM.find(function (err, apiSOM) {
        if (err) {
            res.send(err);
        };
        res.json(apiSOM);
    });
}

module.exports.apiReadOne = function (req, res) {  
    ApiSOM
        .findById(req.params.apiSOM_id)
        .exec(function (err, apiSOM) {
            if (!apiSOM) {
                console.log("Not found api")
                return;
            }else{
                if (err){
                    console.log(err);
                    return;
                }
            }
            res.json(apiSOM);         
        })
}
module.exports.addApi = function (req, res) {
    ApiSOM.create({
        name: req.body.name,
        method: req.body.method,
        route: req.body.route,
        payloadParams: JSON.stringify(req.body.payloadParams),
        samplePayload: JSON.stringify(req.body.samplePayload),
        note: req.body.note,
        response: JSON.stringify(req.body.response)
    }, function (err, apiSOM) {
        if (err) {
            res.send({content: err});
        }
        else res.send({content: "ok"});
    });
}

module.exports.editApi = function (req, res) {
    ApiSOM
        .findById(req.params.apiSOM_id)
        .exec(function (err, apiSOM) {
            if (err) {
                console.log(err);
            }
            apiSOM.name = req.body.name;
            apiSOM.method = req.body.method;
            apiSOM.route = req.body.route;
            apiSOM.payloadParams = JSON.stringify(req.body.payloadParams),
            apiSOM.samplePayload = JSON.stringify(req.body.samplePayload),
            apiSOM.note = req.body.note;
            apiSOM.response = JSON.stringify(req.body.response);
            apiSOM.save(function (err, apiSOM) {
                if (err) {
                    console.log(err);
                }
            })
        })
}

module.exports.deleteApi = function (req, res) {
    if (req.params.apiSOM_id){
        ApiSOM
        .findByIdAndRemove(req.params.apiSOM_id)
        .exec(function(err, apiSOM) {
            if(err) {
                console.log(err);
            }
        })
    } else {
        console.log("Not found")
    }   
}
