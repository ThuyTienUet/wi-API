let WIPM = require('../database/models/WIPM');

module.exports.getApi = function (req, res) {
    WIPM.find(function (err, wipm) {
        if (err) {
            res.send(err);
        };
        res.json(wipm);
    });
}

module.exports.apiReadOne = function (req, res) {  
    WIPM
        .findById(req.params.WIPM_id)
        .exec(function (err, wipm) {
            if (!wipm) {
                console.log("Not found api")
                return;
            }else{
                if (err){
                    console.log(err);
                    return;
                }
            }
            res.json(wipm);         
        })
}
module.exports.addApi = function (req, res) {
    WIPM.create({
        name: req.body.name,
        method: req.body.method,
        route: req.body.route,
        payloadParams: JSON.stringify(req.body.payloadParams),
        samplePayload: JSON.stringify(req.body.samplePayload),
        note: req.body.note,
        response: JSON.stringify(req.body.response)
    }, function (err, wipm) {
        if (err) {
            res.send({content: err});
        }
        else res.send({content: "ok"});
    });
}

module.exports.editApi = function (req, res) {
    WIPM
        .findById(req.params.WIPM_id)
        .exec(function (err, wipm) {
            if (err) {
                console.log(err);
            }
            wipm.name = req.body.name;
            wipm.method = req.body.method;
            wipm.route = req.body.route;
            wipm.payloadParams = JSON.stringify(req.body.payloadParams),
            wipm.samplePayload = JSON.stringify(req.body.samplePayload),
            wipm.note = req.body.note;
            wipm.response = JSON.stringify(req.body.response);
            wipm.save(function (err, wipm) {
                if (err) {
                    console.log(err);
                }
            })
        })
}

module.exports.deleteApi = function (req, res) {
    if (req.params.WIPM_id){
        WIPM
        .findByIdAndRemove(req.params.WIPM_id)
        .exec(function(err, wipm) {
            if(err) {
                console.log(err);
            }
        })
    } else {
        console.log("Not found")
    }   
}
