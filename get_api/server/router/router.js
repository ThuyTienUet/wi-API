let express = require('express');
let router = express.Router();

let ctrlApi = require('../controller/api-insight');

router.get('/apiInsight', ctrlApi.getApi);
router.get('/apiInsight/:api_id', ctrlApi.apiReadOne);
router.post('/apiInsight', ctrlApi.addApi);
router.put('/apiInsight/:api_id', ctrlApi.editApi);
router.delete('/apiInsight/:api_id', function(req,res) {
     ctrlApi.deleteApi(req, res);
});

module.exports = router;