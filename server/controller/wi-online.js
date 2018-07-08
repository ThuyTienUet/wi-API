let WiOnl = require('../database/models/wi-online');

module.exports.getApi = function (req, res) {
    WiOnl.find(function (err, wiOnl) {
        if (err) {
            res.send(err);
        };
        res.json(wiOnl);
    });
}

module.exports.apiReadOne = function (req, res) {  
    WiOnl
        .findById(req.params.wiOnl_id)
        .exec(function (err, wiOnl) {
            if (!wiOnl) {
                console.log("Not found api")
                return;
            }else{
                if (err){
                    console.log(err);
                    return;
                }
            }
            res.json(wiOnl);         
        })
}
module.exports.addApi = function (req, res) {
    WiOnl.create({
        name: req.body.name,
        method: req.body.method,
        route: req.body.route,
        payloadParams: JSON.stringify(req.body.payloadParams),
        samplePayload: JSON.stringify(req.body.samplePayload),
        note: req.body.note,
        response: JSON.stringify(req.body.response)
    }, function (err, wiOnl) {
        if (err) {
            res.send({content: err});
        }
        else res.send({content: "ok"});
    });
}

module.exports.editApi = function (req, res) {
    WiOnl
        .findById(req.params.wiOnl_id)
        .exec(function (err, wiOnl) {
            if (err) {
                console.log(err);
            }
            wiOnl.name = req.body.name;
            wiOnl.method = req.body.method;
            wiOnl.route = req.body.route;
            wiOnl.payloadParams = JSON.stringify(req.body.payloadParams),
            wiOnl.samplePayload = JSON.stringify(req.body.samplePayload),
            wiOnl.note = req.body.note;
            wiOnl.response = JSON.stringify(req.body.response);
            wiOnl.save(function (err, wiOnl) {
                if (err) {
                    console.log(err);
                }
            })
        })
}

module.exports.deleteApi = function (req, res) {
    if (req.params.wiOnl_id){
        WiOnl
        .findByIdAndRemove(req.params.wiOnl_id)
        .exec(function(err, wiOnl) {
            if(err) {
                console.log(err);
            }
        })
    } else {
        console.log("Not found")
    }   
}
