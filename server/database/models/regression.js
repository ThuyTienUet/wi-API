let mongoose = require('mongoose');

module.exports = mongoose.model('regression', {
    name: String,
    parameter: String
});
