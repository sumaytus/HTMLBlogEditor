var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var moment = require('moment');
var async = require("async");
var fs = require('fs');

var pool = mysql.createPool({
    connectionLimit: 100,
    connectTimeout: 50000,
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'database'
});


/* GET users listing. */
router.get('/', function(req, res) {
    res.send('respond with a resource');
});


router.post('/CheckLogin', function(req, res) {
    var email = req.body.email;
    var pass = req.body.pass;
    var SQL = 'SELECT * FROM datalogin  WHERE email = ? ';
    pool.getConnection(function(err) {
        if (err) {
            console.error('error connecting: ' + err.stack);
        } else {
            pool.query(SQL, [email, pass], function(err, rows, fields) {
                if (rows.length > 0) {
                    res.send("SuccessAdmin");
                } else {
                    res.send("Error");
                }
            });
        }
    });
});


router.get('/coutdatasave', function(req, res) {
        pool.getConnection(function(err) {
            if (err) {
                console.error('error connecting: ' + err.stack);
            }
            pool.query('SELECT * FROM bloghtml ', function(err, rows, fields) {
                if (err) throw err;
                res.send(rows);
            });
        });
    })
    // send

router.post('/searchdatablog', function(req, res) {
    var datasearch = req.body.send_datasearch;
    var test = '%'+ datasearch +'%';
    var HTML = ''
    var SQL = 'SELECT * FROM bloghtml WHERE toppic LIKE ?';
    console.log(datasearch)
    pool.getConnection(function(err) {
        if (err) {
            console.error('error connecting: ' + err.stack);
        } else {
            pool.query(SQL,[test], function(err, rows, fields) {
                rows.forEach(function(test, index) {
                    var createdatetime = moment(test.createdatetime).format('ll');
                   HTML +='<p>'+
                        '<div id= "borderdata" >'+
              
                        '<img id="dataimg"  class="profile-img" src="./image/' + test.nameimage + '">'+
                        '<div id= "datatoppic"> '+test.toppic+'</div>'+
                        '<div id= "datatext"  >'+test.text+'</div>'+
                        '<div id= "dataname" >'+test.name+'&nbsp;'+createdatetime+'</div>'+

                        '</div>'+
                        '</p>'
                    
                    if (index == rows.length - 1) {
                        res.send(HTML);

                    }
                });
            });
        }
    });
});

router.post('/searchdatablogadmin', function(req, res) {
    // console.log(req.body)
    var datasearch = req.body.send_datasearch;
    var test = '%'+ datasearch +'%';
    var HTML = ''
    var SQL = 'SELECT * FROM bloghtml WHERE toppic LIKE ? ';
    console.log(datasearch)
    pool.getConnection(function(err) {
        if (err) {
            console.error('error connecting: ' + err.stack);
        } else {
            pool.query(SQL,[test], function(err, rows, fields) {
                rows.forEach(function(test, index) {
                    var createdatetime = moment(test.createdatetime).format('ll');
                    HTML += '<p>'+
                        '<div id= "borderdata">'+
                        '<img id="dataimg"  class="profile-img" src="./image/' + test.nameimage + '">'+
                        '<div id= "datatoppic" >'+ test.toppic + '</div>'+
                        '<div id= "datatext" >'+ test.text + '</div>'+ 
                        '<div id= "dataname" >'+ test.name + '&nbsp;'+ createdatetime + '</div>'+
                        '</div>'+
                        

                        '<div align="right">'+

                        // '<button onclick="reorderup('+test.orderid+','+ test.id +' )" type="button" class="btn-reorderup">'+
                        // '<span class="glyphicon glyphicon-chevron-up" aria-hidden="true"></span>Up</button>'+

                        // '<button onclick="reorderdown" type="button" class="btn-reorderdown">'+
                        // '<span class="glyphicon glyphicon-chevron-down" aria-hidden="true"></span>Down</button>'+

                        '<button onclick="show(' + test.id + ')" type="button" class="btn btn-warning btn-sm">'+
                        '<span class="glyphicon glyphicon-edit" aria-hidden="true"></span>edit</button>'+

                        '<button onclick="button_delete(' + test.id + ')" type="button" class="btn btn-danger btn-sm">'+ 
                        '<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>delete</button>'+
                        '</div>'+ 
                        '<p>'
                    if (index == rows.length - 1) {
                        res.send(HTML);

                    }
                });
            });
        }
    });
});


router.post('/getdatablog', function(req, res) {
    console.log(req.body)
    var thestart = parseInt(req.body.send_start);
    var theend = parseInt(req.body.send_end);
    var HTML = ''
    var SQL = 'SELECT * FROM bloghtml ORDER BY orderid DESC  LIMIT ?,?';
    pool.getConnection(function(err) {
        if (err) {
            console.error('error connecting: ' + err.stack);
        } else {
            pool.query(SQL, [thestart, theend], function(err, rows, fields) {
                rows.forEach(function(test, index) {
                    var createdatetime = moment(test.createdatetime).format('ll');
                   HTML +='<p>'+
                        '<div id= "borderdata" >'+
              
                        '<img id="dataimg"  class="profile-img" src="./image/' + test.nameimage + '">'+
                        '<div id= "datatoppic"> '+test.toppic+'</div>'+
                        '<div id= "datatext"  >'+test.text+'</div>'+
                        '<div id= "dataname" >'+test.name+'&nbsp;'+createdatetime+'</div>'+

                        '</div>'+
                        '</p>'
                    
                    if (index == rows.length - 1) {
                        res.send(HTML);
                    }
                });
            });
        }
    });
});


router.post('/getdatablogadmin', function(req, res) {
    console.log(req.body)
    var thestart = parseInt(req.body.send_start);
    var theend = parseInt(req.body.send_end);
    var HTML = ''
    var SQL = 'SELECT * FROM bloghtml ORDER BY orderid DESC  LIMIT ?,?';
    pool.getConnection(function(err) {
        if (err) {
            console.error('error connecting: ' + err.stack);
        } else {
            pool.query(SQL, [thestart, theend], function(err, rows, fields) {
                rows.forEach(function(test, index) {
                    var createdatetime = moment(test.createdatetime).format('ll');
                    HTML += '<p>'+
                        '<div id= "borderdata">'+
                        '<img id="dataimg"  class="profile-img" src="./image/' + test.nameimage + '">'+
                        '<div id= "datatoppic" >'+ test.toppic + '</div>'+
                        '<div id= "datatext" >'+ test.text + '</div>'+ 
                        '<div id= "dataname" >'+ test.name + '&nbsp;'+ createdatetime + '</div>'+
                        '</div>'+
                        

                        '<div align="right">'+

                        '<button onclick="reorderup('+test.orderid+','+ test.id +' )" type="button" class="btn-reorderdown">'+
                        '<span class="glyphicon glyphicon-chevron-down" aria-hidden="true"></span>Down</button>'+

                        '<button onclick="reorderdown('+test.orderid+','+ test.id +' )" type="button" class="btn-reorderup">'+
                        '<span class="glyphicon glyphicon-chevron-up" aria-hidden="true"></span>Up</button>'+
                        

                        '<button onclick="show(' + test.id + ')" type="button" class="btn btn-warning btn-sm">'+
                        '<span class="glyphicon glyphicon-edit" aria-hidden="true"></span>edit</button>'+

                        '<button onclick="button_deleteorder(' + test.id + ','+test.orderid+')" type="button" class="btn btn-danger btn-sm">'+ 
                        '<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>delete</button>'+
                        '</div>'+ 
                        '<p>'
                    if (index == rows.length - 1) {
                        res.send(HTML);
                    }
                });
            });
        }
    });
});


router.post('/update', function(req, res) {
    console.log(req.body)
    var text = req.body.send_text;
    var id = req.body.send_id;
    text = text.replace(/\"/g, "'");
    console.log(id, text)
    var SQL = 'UPDATE `database`.`bloghtml` SET text = ? WHERE `id` = ?'
    pool.getConnection(function(err) {
        if (err) {
            console.error('error connecting: ' + err.stack);
        } else {
            pool.query(SQL, [text, id], function(err, rows, fields) {
                if (!err) {
                    res.send("Success");
                } else {
                    console.log("Error");
                }
            });
        }
    });
});


router.post('/delorder', function(req, res) {
    console.log(req.body)
    var id = req.body.send_id;
    var orderid = req.body.send_orderid
    var SQL = 'UPDATE bloghtml SET orderid = (orderid - 1) WHERE  orderid > ? ';
    pool.getConnection(function(err) {
        if (err) {
            console.error('error connecting: ' + err.stack);
        } else {
            pool.query(SQL, [orderid,id], function(err, rows, fields) {
                if (!err) {
                    res.send("Success");
                } else {
                    console.log("Error ");
                }
            });
        }
    });
});

router.post('/del', function(req, res) {
    console.log(req.body)
    var id = req.body.send_id;
    var SQL = 'DELETE FROM `database`.`bloghtml` WHERE `id` = ?';
    pool.getConnection(function(err) {
        if (err) {
            console.error('error connecting: ' + err.stack);
        } else {
            pool.query(SQL, [id], function(err, rows, fields) {
                if (!err) {
                    res.send("Success");
                } else {
                    console.log("Error ");
                }
            });
        }
    });
});

router.post('/selectorderiddown', function(req, res,cb) {
    console.log(req.body)
    var id = req.body.send_id;
    var orderid = req.body.send_orderid; 
    var SQL = 'UPDATE bloghtml SET orderid = (orderid - 1) WHERE  orderid = ?';
    pool.getConnection(function(err) {
        if (err) {
            console.error('error connecting: ' + err.stack);
        } else {
            pool.query(SQL,[orderid+1,id], function(err, rows, fields) {
                if (err) throw err;
                // res.send(rows);
                console.log("OKORDERIDDOWN");
                orderiddown(id,orderid,function(){
                res.send("Success");

            });
        });

        }
    });
});


function orderiddown(id,orderid,cb){
    var id = id;
    var orderid = orderid;
    console.log(orderid,id)
    var SQL = 'UPDATE bloghtml SET orderid = (orderid + 1) WHERE  id = ?';
    pool.getConnection(function(err) {
        if (err) {
            console.error('error connecting: ' + err.stack);
        } else {
            pool.query(SQL, [id,orderid], function(err, rows, fields) {
                if (!err) {
                    // res.send("Success");
                    console.log("CHACKORDERID")
                    cb();
                } else {
                    console.log("Error");
                }
            });
        }
    });
}

router.post('/selectorderidup', function(req, res,cb) {
    console.log(req.body)
    var id = req.body.send_id;
    var orderid = req.body.send_orderid; 
    var SQL = 'UPDATE bloghtml SET orderid = (orderid + 1) WHERE  orderid = ? ';
    pool.getConnection(function(err) {
        if (err) {
            console.error('error connecting: ' + err.stack);
        } else {
            pool.query(SQL, [orderid-1,id], function(err, rows, fields) {
                if (err) throw err;
                // res.send(rows);
                console.log("OKORDERIDUP");
                orderidup(id,orderid,function(){
                res.send("Success");

            });
        });

        }
    });
});


function orderidup(id,orderid,cb){
    var id = id;
    var orderid = orderid;
    console.log(orderid,id)
    var SQL = 'UPDATE bloghtml SET orderid = (orderid - 1) WHERE  id = ?';
    pool.getConnection(function(err) {
        if (err) {
            console.error('error connecting: ' + err.stack);
        } else {
            pool.query(SQL, [id,orderid], function(err, rows, fields) {
                if (!err) {
                    
                    console.log("CHACKORDERID")
                    cb();
                } else {
                    console.log("Error");
                }
            });
        }
    });
}

router.post('/name', function(req, res) {

    var SQL = 'SELECT email FROM datalogin WHERE id = 2';
    pool.getConnection(function(err) {
        if (err) {
            console.error('error connecting: ' + err.stack);
        } else {
            pool.query(SQL, function(err, rows, fields) {
                if (err) throw err;
                res.send(rows);
            });
        }
    });
});


router.post('/exam', function(req, res) {
    console.log(req.body)
    var id = req.body.send_id;
    var SQL = 'SELECT * FROM bloghtml  WHERE id = ?';
    pool.getConnection(function(err) {
        if (err) {
            console.error('error connecting: ' + err.stack);
        } else {
            pool.query(SQL, [id], function(err, rows, fields) {
                if (err) throw err;
                res.send(rows);
            });
        }
    });
});

function countorder(cb){
    var orderid;
    var SQL =  'SELECT COUNT(*) AS orderid FROM bloghtml;'
    pool.getConnection(function(err) {
        if (err) {
            console.error('error connecting: ' + err.stack);
        } else {
            pool.query(SQL, function(err, rows, fields) {
                if (err) throw err;
                console.log(rows[0].orderid);      
                cb(rows[0].orderid);
            });
        }
    });
}


router.post('/add', function(req, res) {
    var now = new Date();
    countorder(function(orderid){
        var Obj = {};
        Obj.toppic = req.body.send_toppic;
        Obj.name = req.body.send_footer;
        Obj.text = req.body.send_text.replace(/\"/g, "'");
        Obj.nameimage = req.body.send_images;
        Obj.createdatetime = now;
        Obj.lastupdated = now;
        Obj.orderid = orderid +1;
        var SQL = 'INSERT INTO `database`.`bloghtml` SET ?'
        pool.getConnection(function(err) {
            if (err) {
                console.error('error connecting: ' + err.stack);
            } else {
                pool.query(SQL, Obj, function(err, rows, fields) {
                    if (!err) {
                        res.send("Success");
                    } else {
                        console.log("Error user/Update");
                        console.log(err)
                    }
                });
            }
        });

    });
});

router.post('/upimg_add', function(req, res) {
      console.log(req.file)
      console.log(req.body)
      var date = new Date();
      var Datenum = Number(date);
      var pathdefault = req.file.path;
      var type = req.file.mimetype;
      var ex;
      var path_img = "./public/image/";
      if(type == "image/png"){
        ex = ".png";
      }else if(type == "image/jpeg"){
        ex = ".jpg";
      }else if(type == "image/pjpeg"){
        ex = ".jpg";
      }else if(type == "image/gif"){
        ex = ".gif";
      }else {
        console.log("นามสกุลรูปไม่ใช่ jpg png gif");
      }
      fs.createReadStream(pathdefault).pipe(fs.createWriteStream(path_img+Datenum+ex));
      var img = Datenum+ex;
      var obj = {
        name : img
      }
      res.send(obj);
});

module.exports = router;