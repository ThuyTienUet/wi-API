let mongoose = require('mongoose');

module.exports = mongoose.model('Api', {
    name : String,
    method : String,
    route : String,
    payloadParams : String,
    samplePayload : String,
    note : String,
    response : String
});

// var param = new mongoose.Schema({
//     key: 
// });