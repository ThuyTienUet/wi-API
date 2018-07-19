let mongoose = require('mongoose');

module.exports = mongoose.model('ApiSOM', {
    name : String,
    method : String,
    route : String,
    payloadParams : String,
    samplePayload : String,
    note : String,
    response : String
});
