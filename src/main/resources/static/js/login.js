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
      //"http://localhost:8080/api/user/" +
      "http://150.230.86.64:81/api/user/" +
      $("#email-login").val() +
      "/" +
      $("#password-login").val(),
    type: "GET",
    dataType: "json",
    success: function (answer) {
      if (answer.name != "NO DEFINIDO") {
        $("#estadoUsuario").text("Sesión Iniciada correctamente");
        if (answer.type == "ADM") {
          $(location).attr("href", "admin.html");
        }
        if (answer.type == "COORD") {
          $(location).attr("href", "coord.html");
        }
        if (answer.type == "ASE") {
          $(location).attr("href", "ase.html");
        }
      } else {
        $("#estadoUsuario").text("Su correo o contraseña es incorrecto");
      }
    },
  });
}
