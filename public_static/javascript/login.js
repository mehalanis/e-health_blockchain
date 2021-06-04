$(document).ready(function () {
    $(document).on("click", "#login", function (e) {
        $(".alert-info").css("display","");
        $(".alert-success").css("display","none");
        $(".alert-danger").css("display","none");
        $.ajax({
            type: "POST",
            url: "/get",
            data : {email:$("#email").val(),password:$("#password").val()},
            success: function (data) {
              console.log(data)
              $(".alert-info").css("display","none");
              if(data[0]==true){
                $(".alert-success").css("display","");
                window.location.replace("/");
              }else{
                $(".alert-danger").css("display","");
              }
            }
          });
    });
})