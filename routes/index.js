var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index',  { title: 'Express',layout:'master-index' });
});

// router.get('/getdata',function (req,res) {
//   var email = req.query.email;
//   var password = req.query.pass;
//   res.send("Your Email : " + email + " Your Password : " + password);
// })

module.exports = router;
