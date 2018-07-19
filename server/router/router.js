let express = require('express');
let router = express.Router();

let ctrlApi = require('../controller/api-insight');
let ctrlApiAuth = require('../controller/api-authenticate');
let ctrlApiCom = require('../controller/api-communication');
let ctrlApiSOM = require('../controller/api-SOM');
let ctrlWiOnl = require('../controller/wi-online');
let ctrlWIPM = require('../controller/WIPM');

let JsdocApi = require('../jsdoc/writeFileApi');
let xlsx = require('../xlsx/exportFile');
let dowload = require('../xlsx/dowloadFile');

router.get('/apiInsight', ctrlApi.getApi);
router.get('/apiInsight/:api_id', ctrlApi.apiReadOne);
router.post('/apiInsight', ctrlApi.addApi);
router.put('/apiInsight/:api_id', ctrlApi.editApi);
router.delete('/apiInsight/:api_id', function(req,res) {
     ctrlApi.deleteApi(req, res);
});

router.get('/apiAuth', ctrlApiAuth.getApi);
router.get('/apiAuth/:apiAuth_id', ctrlApiAuth.apiReadOne);
router.post('/apiAuth', ctrlApiAuth.addApi);
router.put('/apiAuth/:apiAuth_id', ctrlApiAuth.editApi);
router.delete('/apiAuth/:apiAuth_id', function(req,res) {
    ctrlApiAuth.deleteApi(req, res);
});

router.get('/apiCom', ctrlApiCom.getApi);
router.get('/apiCom/:apiCom_id', ctrlApiCom.apiReadOne);
router.post('/apiCom', ctrlApiCom.addApi);
router.put('/apiCom/:apiCom_id', ctrlApiCom.editApi);
router.delete('/apiCom/:apiCom_id', function(req,res) {
     ctrlApiCom.deleteApi(req, res);
});

router.get('/apiSOM', ctrlApiSOM.getApi);
router.get('/apiSOM/:apiSOM_id', ctrlApiSOM.apiReadOne);
router.post('/apiSOM', ctrlApiSOM.addApi);
router.put('/apiSOM/:apiSOM_id', ctrlApiSOM.editApi);
router.delete('/apiSOM/:apiSOM_id', function(req,res) {
     ctrlApiSOM.deleteApi(req, res);
});

router.get('/wiOnline', ctrlWiOnl.getApi);
router.get('/wiOnline/:wiOnl_id', ctrlWiOnl.apiReadOne);
router.post('/wiOnline', ctrlWiOnl.addApi);
router.put('/wiOnline/:wiOnl_id', ctrlWiOnl.editApi);
router.delete('/wiOnline/:wiOnl_id', function(req,res) {
    ctrlWiOnl.deleteApi(req, res);
});

router.get('/WIPM', ctrlWIPM.getApi);
router.get('/WIPM/:WIPM_id', ctrlWIPM.apiReadOne);
router.post('/WIPM', ctrlWIPM.addApi);
router.put('/WIPM/:WIPM_id', ctrlWIPM.editApi);
router.delete('/WIPM/:WIPM_id', function(req,res) {
    ctrlWIPM.deleteApi(req, res);
});

router.post('/fileApiWI',JsdocApi.fileApiWI);
router.post('/fileApiAuth',JsdocApi.fileApiAuth);
router.post('/fileApiCom',JsdocApi.fileApiCom);
router.post('/fileApiSOM',JsdocApi.fileApiSOM);
router.post('/fileApiOnl',JsdocApi.fileApiOnl);
router.post('/fileWIPM',JsdocApi.fileWIPM);

router.post('/exportApiWI', xlsx.apiWI);
router.post('/exportApiAuth', xlsx.apiAuth);
router.post('/exportApiCom', xlsx.apiCom);
router.post('/exportApiSOM', xlsx.apiSOM);
router.post('/exportApiOnl', xlsx.wiOnl);
router.post('/exportWIPM', xlsx.WIPM);

router.get('/dowloadApiWI', dowload.apiWI);
router.get('/dowloadApiAuth', dowload.apiAuth);
router.get('/dowloadApiCom', dowload.apiCom);
router.get('/dowloadApiSOM', dowload.apiSOM);
router.get('/dowloadApiOnl', dowload.apiOnl);
router.get('/dowloadWIPM', dowload.WIPM);

module.exports = router;