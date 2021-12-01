// Example starter JavaScript for disabling form submissions if there are invalid fields
(function () {
  "use strict";

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  var forms = document.querySelectorAll(".needs-validation");

  // Loop over them and prevent submission
  Array.prototype.slice.call(forms).forEach(function (form) {
    form.addEventListener(
      "submit",
      function (event) {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        } else {
          event.preventDefault();
          logIn();
        }
        form.classList.add("was-validated");
      },
      false
    );
  });
})();

function logIn() {
  $.ajax({
    url:
      "http://150.230.86.64:81/api/user/" +
      $("#email-login").val() +
      "/" +
      $("#password-login").val(),
    type: "GET",
    dataType: "json",
    success: function (answer) {
      if (answer.name != "NO DEFINIDO") {
        $("#estadoUsuario").text("Sesión Iniciada correctamente");
      } else {
        $("#estadoUsuario").text("Su correo o contraseña es incorrecto");
      }
    },
  });
}
