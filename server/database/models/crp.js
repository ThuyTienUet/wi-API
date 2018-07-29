let mongoose = require('mongoose');

module.exports = mongoose.model('crp', {
    name: String,
    parameter: String
});
