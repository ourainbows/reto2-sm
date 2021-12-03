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
          console.log("Hello world");
        } else {
          event.preventDefault();
          signIn();
          console.log("Register new User");
          $(location).attr("href","index.html")
        }
        form.classList.add("was-validated");
      },
      false
    );
  });
})();

function signIn() {
  let user = {
    name: $("#username").val(),
    email: $("#email").val(),
    password: $("#password").val()
  }
  $.ajax({
    url: "http://localhost:8080/api/user/new",
    //url: "http://150.230.86.64:81/api/user/new",
    type: "POST",
    data: JSON.stringify(user),
    contentType: "application/JSON",
    dataType: "json",
    complete: function () {
      //Code later
    },
  });
}
