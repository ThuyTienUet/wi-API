let mongoose = require('mongoose');

module.exports = mongoose.model('classi', {
    name: String,
    parameter: String
});
