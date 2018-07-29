let Classi = require('../database/models/classi');

module.exports.getModel = function (req, res) {
    Classi.find(function (err, classi) {
        if (err) {
            res.send(err);
        };
        res.json(classi);
    });
}

module.exports.modelReadOne = function (req, res) {  
    Classi
        .findById(req.params.model_id)
        .exec(function (err, classi) {
            if (!classi) {
                console.log("Not found model")
                return;
            }else{
                if (err){
                    console.log(err);
                    return;
                }
            }
            res.json(classi);         
        })
}
module.exports.addModel = function (req, res) {
    Classi.create({
        name: req.body.name,
        parameter: JSON.stringify(req.body.parameter),
    }, function (err, classi) {
        if (err) {
            res.send({content: err});
        }
        else res.send({content: "ok"});
    });
}

module.exports.editModel = function (req, res) {
    Classi
        .findById(req.params.model_id)
        .exec(function (err, classi) {
            if (err) {
                console.log(err);
            }
            classi.name = req.body.name;
            classi.parameter = JSON.stringify(req.body.parameter);
            classi.save(function (err, classi) {
                if (err) {
                    console.log(err);
                }
            })
        })
}

module.exports.deleteModel = function (req, res) {
    if (req.params.model_id){
        Classi
        .findByIdAndRemove(req.params.model_id)
        .exec(function(err, classi) {
            if(err) {
                console.log(err);
            }
        })
    } else {
        console.log("Not found model")
    }   
}
