var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
    res.render('pageadmin',  { title: 'HTML Blog Editor',layout:'master-admin' });
});


module.exports = router;
