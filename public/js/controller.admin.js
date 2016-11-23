
$(document).ready(function() {


    initpageadmin();
   
    
    $('#summernote').summernote({
        height: 300, // set editor height
        minHeight: null, // set minimum height of editor
        maxHeight: null, // set maximum height of editor
        focus: true // set focus to editable area after initializing summernote

    });

    

    $('#summernote').summernote({
    fontNames: ['Arial', 'Arial Black', 'Comic Sans MS', 'Courier New']
    

    });

    
    var markupStr = '';
    $('#summernote').summernote('code', markupStr);
    $('#summernoteedit').summernote('code', markupStr);
    // $('#summernotename').summernote('code', markupStr);
    //clear data after submit
    // showdata();

   
   

});

var Per_Page = 3;


function initpageadmin(){
    
    async.parallel({
       coutdatasave: function(callback) { //This is the first task, and `callback` is its callback task
            var result = 3;
            paginaion(result,function(){

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
             paginaion2(page)

             callback(null,result);           
        }
    }, function(err,result) { //This is the final callback
        console.log("Count : " , result.coutdatasave);
        console.log("Count : " , result.getdata);
    });

}

 
function paginaion(callback) {
    $.get('users/coutdatasave', function(result) {
        document.getElementById("list_pagi").innerHTML = '';
        document.getElementById("back_pagi").innerHTML = '';
        document.getElementById("pagination").innerHTML = '';
        document.getElementById("next_pagi").innerHTML = '';
        document.getElementById("toppic").innerHTML = '';
        document.getElementById("footer").innerHTML = '';
        console.log("ข้อมูลทั้งหมด", result.length)
        var num_row = result.length;
        var Per_Page = 3;
        var query = window.location.search.substring(1);
        var page = query.split("?");
        // console.log(window.location.search)
        if (page == "") {
            page = 1;
        }
        var prev_page = page - 1;
        var next_page = parseInt(page) + 1;
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
        
        
    });
}


function paginaion2(current_page) {
    $("#showdata").html('');
    var Obj = {}
    Obj.send_end   = Per_Page;
    Obj.send_start = (Per_Page * (current_page - 1));
    console.log(Obj)
    $.post("users/getdatablogadmin", Obj)
    .done(function(result) {

        $("#showdata").append(result);
        // console.log(length)
        // callback()
    });
   
}


function reorderup(orderid,id){

    var Obj = {}
    Obj.send_id = id;
    Obj.send_orderid = orderid;
    console.log(Obj)
    $.post("/users/selectorderidup", Obj)
    .done(function(data){

        if (data == "Success") {
                console.log("update Success")
                swal("Editor", "แก้ไขเรียบร้อย", "success");
                $('#editshow').modal('hide');
                initpageadmin();
            } else {
                console.log("error")
                swal({
                    title: "Error SubmitError",
                    type: "error",
                    timer: 2000,
                    showConfirmButton: false
                });
                $('#myModaledit').modal('hide');
                //  showdata();
        
       
    
        }
    });
    

}


function reorderdown(orderid,id){
    
    var Obj = {}
    Obj.send_id = id;
    Obj.send_orderid = orderid;
    console.log(Obj)
    $.post("/users/selectorderiddown", Obj)
    .done(function(data){
        if (data == "Success") {
                console.log("update Success")
                swal("Editor", "แก้ไขเรียบร้อย", "success");
                $('#editshow').modal('hide');
                initpageadmin();
            } else {
                console.log("error")
                swal({
                    title: "Error SubmitError",
                    type: "error",
                    timer: 2000,
                    showConfirmButton: false
                });
                $('#myModaledit').modal('hide');
                //  showdata();
        
       
    
        }
    });

}



function logout() {
    window.location = "/";
    initpageadmin();
}





function show(id) {
    console.log("show", id)
    var Obj = {}
    Obj.send_id = id;
    $.post("/users/exam", Obj)
    .done(function(data) {
        data.forEach(function(test) {
            console.log(test.text)
            $('#summernoteedit').summernote('code',test.text);
        });
    });
    $("#idforupdate").val(id);
    $('#editshow').modal('show');
}
// function show data befor edit


function edit_submit() {
    // var clear = '';
    //  $('#summernoteedit').summernote('code', clear);
    var idforupdate = $("#idforupdate").val();
    var markupStredit = $('#summernoteedit').summernote('code');
    if (markupStredit == "") {
        swal("error", "", "error");
    } else {
        var Obj = {}
        Obj.send_text = markupStredit;
        Obj.send_id = idforupdate;
        console.log(Obj)
        $.post("/users/update", Obj)
        .done(function(data) {
            if (data == "Success") {
                console.log("update Success")
                swal("Editor", "แก้ไขเรียบร้อย", "success");
                $('#editshow').modal('hide');
                initpageadmin();
            } else {
                console.log("error")
                swal({
                    title: "Error SubmitError",
                    type: "error",
                    timer: 2000,
                    showConfirmButton: false
                });
                $('#myModaledit').modal('hide');
                //  showdata();
            }
        });
    }
}

function upload_img_add(){
        var i = 0;
        var UploadBanner = $('#fileuploadimages_add').fileupload({
            timeout: 10000,
            //medthod:'POST',
            dataType: 'json',
            //sequentialUploads: true,
            autoUpload: false,
            add: function (e, data) {
                $('#fileuploadimages_add .progress-bar').css('width', 0 + '%');
                i++;
                console.log(data);
                data.submit();
            },
            done: function (e, data) {
                var get_img_full = data.result.name;
                console.log(data.result.name)
                var path = './image/';
                console.log(get_img_full)

                $("#myImg_add").attr("src", path +get_img_full);
                $("#id_images_add").val(get_img_full);

                $('#fileuploadimages_add .progress-bar').css('width', 0 + '%');
            },
            progressall: function (e, data) {
                var progress = parseInt(data.loaded / data.total * 100, 10);
                $('#fileuploadimages_add .progress-bar').css('width', progress + '%');
            },
            error: function (e,data){
                console.log(data);
                $('#fileuploadimages_add .progress-bar').css('width', 0 + '%');
            }
        });

        $('#basicModal').modal('hide');
    }


function getname(){

    // // console.log("show", id)
    // // var Obj = {}
    // // Obj.send_id = id;
    $.post("/users/name")
    .done(function(data) {
        
            data.forEach(function(test) {
            console.log("nameemail =" ,test.email)
            var email = test.email;
            button_Submit(email);
        });
    });
    

}

function button_Submit(email) {
    
    var markupStr = $('#summernote').summernote('code');
    var toppic = $("#toppic").val();
    var footer = email;
    
    var id_images_add = $("#id_images_add").val();
    
    console.log("id_images_add = ", id_images_add)
    console.log("toppic = ", toppic)
    console.log("footer = ", footer)
    
    if ( id_images_add, markupStr, toppic, footer == "") {
        swal("error", "กรุณากรอกข้อมูลให้ครบ", "error");
    } else {
        var Obj = {}
        Obj.send_text = markupStr;
        Obj.send_toppic = toppic;
        Obj.send_footer = footer;
        Obj.send_images = id_images_add;
        console.log(Obj)
        $.post("/users/add", Obj)
        .done(function(data) {
            if (data == "Success") {
                console.log("addSuccess")
                swal("Success", "โพสสำเร็จ", "success");
                $('#myModalsubmit').modal('hide');
                var markupStr = '';
                var toppic = '';
                var footer = '';
                var id_images_add = '';
                $('#summernote').summernote('code', markupStr);
                $('#toppic').val('', toppic);
                $('#footer').val('', footer);
                $('#id_images_add').val('', id_images_add);
                initpageadmin();
            } else {
                console.log("error")
                swal({
                    title: "Error SubmitError",
                    type: "error",
                    timer: 2000,
                    showConfirmButton: false
                });
                $('#myModalsubmit').modal('hide');
                // showdata()
            }
        });
    }
}

function button_deleteorder(id,orderid) {
    console.log("button_delete", id)
    console.log("button_delete", orderid)
    var Obj = {}
    Obj.send_id = id;
    Obj.send_orderid = orderid;
    console.log(Obj)
    $.post("/users/delorder", Obj)
    .done(function(data) {
        if (data == "Success") {
            console.log("delSuccess")
           
            button_delete(id,orderid);
        } else {
            // console.log("delerror")
            // swal({
            //     title: "Error delete",
            //     type: "error",
            //     timer: 2000,
            //     showConfirmButton: false
            // });
            // $('#myModaldelete').modal('hide');
            console.log("error")
            initpageadmin();
        }
    });
}

function button_delete(id,orderid) {
    // console.log(result)
    console.log("button_delete", id)
    console.log("button_delete", orderid)
    var Obj = {}
    Obj.send_id = id;
    Obj.send_orderid = orderid;
    console.log(Obj)
    $.post("/users/del", Obj)
    .done(function(data) {
        if (data == "Success") {
            console.log("delSuccess")
            swal("Deletesuccess", "ลบข้อมูลเรียบร้อย", "success");
            $('#myModaldelete').modal('hide');
            initpageadmin();
        } else {
            swal({
                title: "Error delete",
                type: "error",
                timer: 2000,
                showConfirmButton: false
            });
            $('#myModaldelete').modal('hide');
            console.log("error")
            initpageadmin();
        }
    });
}

function search(){
    
    $("#showdata").html('');
    var datasearch = $("#datasearch").val();
    console.log("datasearch = ", datasearch)
    var Obj ={}
    Obj.send_datasearch = datasearch;
    $.post("/users/searchdatablogadmin", Obj)
    .done(function(result) {

        $("#showdata").append(result);
        console.log(result)
        
        // callback()
    });


}