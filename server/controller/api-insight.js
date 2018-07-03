let Api = require('../database/models/api-well-insight');

module.exports.getApi = function (req, res) {
    Api.find(function (err, api) {
        if (err) {
            res.send(err);
        };
        res.json(api);
    });
}

module.exports.apiReadOne = function (req, res) {  
    Api
        .findById(req.params.api_id)
        .exec(function (err, api) {
            if (!api) {
                console.log("Not found api")
                return;
            }else{
                if (err){
                    console.log(err);
                    return;
                }
            }
            res.json(api);         
        })
}

module.exports.addApi = function (req, res) {
    //console.log(req.body.samplePayload);
    Api.create({
        name: req.body.name,
        method: req.body.method,
        route: req.body.route,
        payloadParams: JSON.stringify(req.body.payloadParams),
        samplePayload: JSON.stringify(req.body.samplePayload),
        note: req.body.note,
        response: JSON.stringify(req.body.response)
    }, function (err, api) {
        if (err) {
            res.send(err);
        };
        Api.find(function (err, apis) {
            if (err) {
                res.send(err);
            };           
             //res.json(apis);
        });     
    });
}

module.exports.editApi = function (req, res) {
    Api
        .findById(req.params.api_id)
        .exec(function (err, api) {
            if (err) {
                console.log(err);
            }
            api.name = req.body.name;
            api.method = req.body.method;
            api.route = req.body.route;
            api.payloadParams = JSON.stringify(req.body.payloadParams),
            api.samplePayload = JSON.stringify(req.body.samplePayload),
            api.note = req.body.note;
            response: JSON.stringify(req.body.response);
            api.save(function (err, api) {
                if (err) {
                    console.log(err);
                }
            })
        })
}

module.exports.deleteApi = function (req, res) {
    if (req.params.api_id){
        Api
        .findByIdAndRemove(req.params.api_id)
        .exec(function(err, api) {
            if(err) {
                console.log(err);
            }
        })
    } else {
        console.log("Not found")
    }   
}
