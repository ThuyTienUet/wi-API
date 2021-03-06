let path = require('path');

module.exports.apiWI = function (req, res) {
    var original_dir = path.join(__dirname, '../../xlsx/apiWI.xlsx');
    res.download(original_dir, 'apiWellInsight.xlsx');

}

module.exports.apiCom = function (req, res) {
    var original_dir = path.join(__dirname, '../../xlsx/apiCom.xlsx');
    res.download(original_dir, 'apiCommunication.xlsx');

}

module.exports.apiSOM = function (req, res) {
    var original_dir = path.join(__dirname, '../../xlsx/apiSOM.xlsx');
    res.download(original_dir, 'apiSOM.xlsx');

}

module.exports.apiAuth = function (req, res) {
    var original_dir = path.join(__dirname, '../../xlsx/apiAuth.xlsx');
    res.download(original_dir, 'apiAuthenticate.xlsx');

}

module.exports.apiOnl = function (req, res) {
    var original_dir = path.join(__dirname, '../../xlsx/apiOnl.xlsx');
    res.download(original_dir, 'wiOnlineInventory.xlsx');

}

module.exports.WIPM = function (req, res) {
    var original_dir = path.join(__dirname, '../../xlsx/WIPM.xlsx');
    res.download(original_dir, 'WIPM.xlsx');

}