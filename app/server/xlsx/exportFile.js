var mongoXlsx = require('mongo-xlsx');
let path = require('path');

module.exports.apiAuth = function (req, res) {
    let data = [];
    for (let i = 0; i < req.body.length; i++) {
        let ob = {
            STT: i + 1,
            Name: req.body[i].name,
            Method: req.body[i].method,
            Route: req.body[i].route,
            Payload_Params: req.body[i].payloadParams,
            Sample_Payload: req.body[i].samplePayload,
            Response: req.body[i].response,
            Note: req.body[i].note
        }
        data.push(ob);
    }
    exportApi('apiAuth', data, function(result){
        if (result == 1) {
            res.send('1');
        } else {
            res.send('-1');
        }
    });
}

module.exports.apiCom = function (req, res) {
    let data = [];
    for (let i = 0; i < req.body.length; i++) {
        let ob = {
            STT: i + 1,
            Name: req.body[i].name,
            Method: req.body[i].method,
            Route: req.body[i].route,
            Payload_Params: req.body[i].payloadParams,
            Sample_Payload: req.body[i].samplePayload,
            Response: req.body[i].response,
            Note: req.body[i].note
        }
        data.push(ob);
    }
    exportApi('apiCom', data, function(result){
        if (result == 1) {
            res.send('1');
        } else {
            res.send('-1');
        }
    });
}

module.exports.apiSOM = function (req, res) {
    let data = [];
    for (let i = 0; i < req.body.length; i++) {
        let ob = {
            STT: i + 1,
            Name: req.body[i].name,
            Method: req.body[i].method,
            Route: req.body[i].route,
            Payload_Params: req.body[i].payloadParams,
            Sample_Payload: req.body[i].samplePayload,
            Response: req.body[i].response,
            Note: req.body[i].note
        }
        data.push(ob);
    }
    exportApi('apiSOM', data, function(result){
        if (result == 1) {
            res.send('1');
        } else {
            res.send('-1');
        }
    });
}

module.exports.apiWI = function (req, res) {
    let data = [];
    for (let i = 0; i < req.body.length; i++) {
        let ob = {
            STT: i + 1,
            Name: req.body[i].name,
            Method: req.body[i].method,
            Route: req.body[i].route,
            Payload_Params: req.body[i].payloadParams,
            Sample_Payload: req.body[i].samplePayload,
            Response: req.body[i].response,
            Note: req.body[i].note
        }
        data.push(ob);
    }
    exportApi('apiWI', data, function(result){
        if (result == 1) {
            res.send('1');
        } else {
            res.send('-1');
        }
    });
}

module.exports.wiOnl = function (req, res) {
    let data = [];
    for (let i = 0; i < req.body.length; i++) {
        let ob = {
            STT: i + 1,
            Name: req.body[i].name,
            Method: req.body[i].method,
            Route: req.body[i].route,
            Payload_Params: req.body[i].payloadParams,
            Sample_Payload: req.body[i].samplePayload,
            Response: req.body[i].response,
            Note: req.body[i].note
        }
        data.push(ob);
    }
    exportApi('apiOnl', data, function(result){
        if (result == 1) {
            res.send('1');
        } else {
            res.send('-1');
        }
    });
}

module.exports.WIPM = function (req, res) {
    let data = [];
    for (let i = 0; i < req.body.length; i++) {
        let ob = {
            STT: i + 1,
            Name: req.body[i].name,
            Method: req.body[i].method,
            Route: req.body[i].route,
            Payload_Params: req.body[i].payloadParams,
            Sample_Payload: req.body[i].samplePayload,
            Response: req.body[i].response,
            Note: req.body[i].note
        }
        data.push(ob);
    }
    exportApi('WIPM', data, function(result){
        if (result == 1) {
            res.send('1');
        } else {
            res.send('-1');
        }
    });
}

function exportApi(name, data, callback) {
    /* Generate automatic model for processing (A static model should be used) */
    var model = mongoXlsx.buildDynamicModel(data);
    var options = {
        save: true,
        sheetName: [],
        fileName: name + ".xlsx",
        path: "./xlsx/",
        defaultSheetName: "worksheet"
    }
    /* Generate Excel */
    mongoXlsx.mongoData2Xlsx(data, model, options, function (err, data) {
        if (err) {
            callback(-1);
        } else {
            callback(1);            
        }
    });
}

