let mongoose = require('mongoose');

module.exports = mongoose.model('ApiAuth', {
    name : String,
    method : String,
    route : String,
    payloadParams : String,
    note : String,
    response : String,
    errResponse : String
});
