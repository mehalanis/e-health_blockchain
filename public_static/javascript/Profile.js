$(document).ready(function () {
    $.ajax({
        type: "get",
        url: "/ProfileJson",
        success: function (data) {
          $("#nom").val(data[0])
         $("#prenom").val(data[1])
         $("#adresse").val(data[2])
         $("#telephone").val(data[3])
         $("#email").val(data[4])
         $("#password").val(data[5])
        }
      });
})