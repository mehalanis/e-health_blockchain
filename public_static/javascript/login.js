$(document).ready(function () {
    $(document).on("click", "#login", function (e) {
        $(".alert-info").css("display","");
        $(".alert-success").css("display","none");
        $(".alert-danger").css("display","none");
        var url = ($("#type_user").val()=="1") ? "/loginPatient" :"/loginMedecin" ;
        $.ajax({
            type: "POST",
            url: url,
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