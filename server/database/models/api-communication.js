let mongoose = require('mongoose');

module.exports = mongoose.model('ApiCom', {
    name : String,
    method : String,
    route : String,
    payloadParams : String,
    samplePayload : String,
    note : String,
    response : String
});
