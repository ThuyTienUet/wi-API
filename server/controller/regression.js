let Regression = require('../database/models/regression');

module.exports.getModel = function (req, res) {
    Regression.find(function (err, regression) {
        if (err) {
            res.send(err);
        };
        res.json(regression);
    });
}

module.exports.modelReadOne = function (req, res) {  
    Regression
        .findById(req.params.model_id)
        .exec(function (err, regression) {
            if (!Regression) {
                console.log("Not found model")
                return;
            }else{
                if (err){
                    console.log(err);
                    return;
                }
            }
            res.json(regression);         
        })
}
module.exports.addModel = function (req, res) {
    Regression.create({
        name: req.body.name,
        parameter: JSON.stringify(req.body.parameter),
    }, function (err, regression) {
        if (err) {
            res.send({content: err});
        }
        else res.send({content: "ok"});
    });
}

module.exports.editModel = function (req, res) {
    Regression
        .findById(req.params.model_id)
        .exec(function (err, regression) {
            if (err) {
                console.log(err);
            }
            regression.name = req.body.name;
            regression.parameter = JSON.stringify(req.body.parameter);
            regression.save(function (err, regression) {
                if (err) {
                    console.log(err);
                }
            })
        })
}

module.exports.deleteModel = function (req, res) {
    if (req.params.model_id){
        Regression
        .findByIdAndRemove(req.params.model_id)
        .exec(function(err, regression) {
            if(err) {
                console.log(err);
            }
        })
    } else {
        console.log("Not found model")
    }   
}
