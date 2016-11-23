

$(document).ready(function() {
    initpageadmin();
    var markupStr = '';
    $('#summernote').summernote('code', markupStr);
    $('#summernoteedit').summernote('code', markupStr);
    //clear data after submit
    // showdata();
});


$('#summernote').summernote({
    fontNames: ['Arial', 'Arial Black', 'Comic Sans MS', 'Courier New']
});


var Per_Page = 2;


function initpageadmin(){
    
    async.parallel({
       coutdatasave: function(callback) { //This is the first task, and `callback` is its callback task
            var result = 3;
            paginaionindex(result,function(){

                callback(null,result);

            })
            
        },
       getdata: function(callback) { //This is the second task, and `callback` is its callback task
            var result = "result";
            var query = window.location.search.substring(1);
            var page = query.split("?");
             if (page == "") {
                    page = 1;
                }
             paginaionindex2(page)

             callback(null,result);           
        }
    
    }, function(err,result) { //This is the final callback
        console.log("Count : " , result.coutdatasave);
        console.log("Count : " , result.getdata);
    });

}


function paginaionindex(callback) {
   $.get('users/coutdatasave', function(result) {
        
        document.getElementById("list_pagi").innerHTML = '';
        document.getElementById("back_pagi").innerHTML = '';
        document.getElementById("pagination").innerHTML = '';
        document.getElementById("next_pagi").innerHTML = '';
        console.log("ข้อมูลทั้งหมด", result.length)
            //                $("#pagination").html("");
        var num_row = result.length;
        var Per_Page = 2;
        var query = window.location.search.substring(1);
        var page = query.split("?");
        if (page == "") {
            page = 1;
        }
        var prev_page = page - 1;
        var next_page = parseInt(page) + 1;
        //            console.log("page",page)
        //            console.log("next_page",next_page)
        var page_start = ((Per_Page * page) - Per_Page);
        if (num_row <= Per_Page) {
            var num_page = 1;
        } else if ((num_page % Per_Page) == 0) {
            var num_page = (num_row / Per_Page);
        } else {
            var num_page = (num_row / Per_Page) + 1;
            var num_page = Math.ceil(num_page);
            //                var num_page = Math.ceil(num_page);
            //                 num_page =  parseInt(num_page);
        }
        var num_page_max = (Math.ceil(num_row / Per_Page));
        console.log("จำนวนข้อมูล/หน้า = ", Per_Page)
        $("#list_pagi").append('ข้อมูลทั้งหมด: ' + num_row + '  จำนวนหน้า: ' + num_page_max + '');
        if (prev_page) {
            $("#back_pagi").append('<li><a href="?' + prev_page + '">' + '<span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>Black</a></li>');
        }
        for (i = 1; i <= num_page_max; i++) {
            if (i != page) {
                $("#pagination").append('<li><a href="?' + i + '">' + i + '</a></li>');
            } else {
                $("#pagination").append('<li><a class="patgi">' + i + '</a></li>');
            }
        }
        if (page != num_page_max) {
            $("#next_pagi").append('<li><a href="?' + next_page + '">Next' + '<span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span></a></li>');
        }
        // paginaion2(page_start, Per_Page);
    });
}

function paginaionindex2(current_page) {
    $("#showdata").html('');
    var Obj = {}
    Obj.send_end   = Per_Page;
    Obj.send_start = (Per_Page * (current_page - 1));
    console.log(Obj)
    $.post("users/getdatablog", Obj)
    .done(function(result) {

        $("#showdata").append(result);
        // console.log(length)
        // callback()
    });
   
}

function searchindex(){
    $("#showdata").html('');
    var datasearch = $("#datasearch").val();
    console.log("datasearch = ", datasearch)
    var Obj ={}
    Obj.send_datasearch = datasearch;
    $.post("/users/searchdatablog", Obj)
    .done(function(result) {

        $("#showdata").append(result);
        console.log(result)
        
        // callback()
    });


}


function login() {
    // var testsend = "name";
    // test(testsend);


    var email = $("#input_email").val();
    var pass = $("#input_pass").val();
    console.log(email, pass);
    if (email == "") {
        swal({
            title: "กรุณากรอก Email",
            type: "warning",
            timer: 1000,
            showConfirmButton: false
        });
    } else if (pass == "") {
        swal({
            title: "กรุณาใส่ Password",
            type: "warning",
            timer: 1000,
            showConfirmButton: false
        });
    } else {
        var Obj = {}
        Obj.email = email
        Obj.pass = pass
        $.post("/users/CheckLogin", Obj)
        .done(function(data) {
            if (data == "SuccessAdmin") {
                window.location = "/pageadmin";
            } else {
                swal({
                    title: "Email หรือ Password ผิดพลาด กรุณาตรวจสอบอีกครั้ง",
                    type: "error",
                    timer: 2000,
                    showConfirmButton: false
                });
            }
        });
    }
}



