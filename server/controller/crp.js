let Crp = require('../database/models/crp');

module.exports.getModel = function (req, res) {
    Crp.find(function (err, crp) {
        if (err) {
            res.send(err);
        };
        res.json(crp);
    });
}

module.exports.modelReadOne = function (req, res) {  
    Crp
        .findById(req.params.model_id)
        .exec(function (err, crp) {
            if (!crp) {
                console.log("Not found model")
                return;
            }else{
                if (err){
                    console.log(err);
                    return;
                }
            }
            res.json(crp);         
        })
}
module.exports.addModel = function (req, res) {
    Crp.create({
        name: req.body.name,
        parameter: JSON.stringify(req.body.parameter),
    }, function (err, crp) {
        if (err) {
            res.send({content: err});
        }
        else res.send({content: "ok"});
    });
}

module.exports.editModel = function (req, res) {
    Crp
        .findById(req.params.model_id)
        .exec(function (err, crp) {
            if (err) {
                console.log(err);
            }
            crp.name = req.body.name;
            crp.parameter = JSON.stringify(req.body.parameter);
            crp.save(function (err, crp) {
                if (err) {
                    console.log(err);
                }
            })
        })
}

module.exports.deleteModel = function (req, res) {
    if (req.params.model_id){
        Crp
        .findByIdAndRemove(req.params.model_id)
        .exec(function(err, crp) {
            if(err) {
                console.log(err);
            }
        })
    } else {
        console.log("Not found model")
    }   
}
