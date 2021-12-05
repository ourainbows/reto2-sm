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
          createUser();
        }
        form.classList.add("was-validated");
      },
      false
    );
  });
})();

function getUsers() {
  $.ajax({
    url: "http://150.230.86.64:81/api/user/all",
    //url: "http://localhost:8080/api/user/all",
    type: "GET",
    dataType: "json",
    success: function (answer) {
      drawUsers(answer);
    },
  });
}
function drawUsers(items) {
  let userTable = "<table>";
  for (i = 0; i < items.length; i++) {
    userTable += "<tr>";
    /* userTable += "<th scope='row'>" */
    userTable += "<th>" + items[i].id + "</td>";
    userTable += "<td>" + items[i].identification + "</td>";
    userTable += "<td>" + items[i].name + "</td>";
    userTable += "<td>" + items[i].address + "</td>";
    userTable += "<td>" + items[i].cellPhone + "</td>";
    userTable += "<td>" + items[i].email + "</td>";
    /* userTable += "<td>" + items[i].password + "</td>"; */
    userTable += "<td>" + items[i].zone + "</td>";
    userTable += "<td>" + items[i].type + "</td>";
    userTable +=
      "<td> <button class='btn btn-outline-secondary' onclick='selectUser(" +
      JSON.stringify(items[i].email) +
      "," +
      JSON.stringify(items[i].password) +
      ")'>Editar</button></td>";
    userTable +=
      '<td> <button class="btn btn-outline-danger" onclick="deleteUser(' +
      JSON.stringify(items[i].id) +
      ')">Borrar</button></td>';

    userTable += "<tr>";
    $("#user-table-result").html(userTable);
  }
}
function createUser() {
  let data = {
    id: $("#id-user").val(),
    identification: $("#identification-user").val(),
    name: $("#name-user").val(),
    address: $("#address-user").val(),
    cellPhone: $("#cellPhone-user").val(),
    email: $("#email-user").val(),
    password: $("#password-user").val(),
    zone: $("#zone-user").val(),
    type: $("#type-user").val(),
  };
  $.ajax({
    url: "http://150.230.86.64:81/api/user/new",
    //url: "http://localhost:8080/api/user/new",
    type: "POST",
    data: JSON.stringify(data),
    contentType: "application/JSON",
    complete: function () {
      clearInputs();
      getUsers();
    },
  });
}
function selectUser(email, password) {
  $.ajax({
    url: "http://150.230.86.64:81/api/user/" + email + "/" + password,
    //url: "http://localhost:8080/api/user/" + email + "/" + password,
    type: "GET",
    dataType: "json",
    success: function (answer) {
      $("#id-user").val(answer.id),
        $("#identification-user").val(answer.identification),
        $("#name-user").val(answer.name),
        $("#address-user").val(answer.address),
        $("#cellPhone-user").val(answer.cellPhone),
        $("#email-user").val(answer.email),
        $("#password-user").val(answer.password),
        $("#zone-user").val(answer.zone),
        $("#type-user").val(answer.type);
    },
  });
}
function updateUser() {
  let data = {
    id: $("#id-user").val(),
    identification: $("#identification-user").val(),
    name: $("#name-user").val(),
    address: $("#address-user").val(),
    cellPhone: $("#cellPhone-user").val(),
    email: $("#email-user").val(),
    password: $("#password-user").val(),
    zone: $("#zone-user").val(),
    type: $("#type-user").val(),
  };
  $.ajax({
    url: "http://150.230.86.64:81/api/user/update",
    //url: "http://localhost:8080/api/user/update",
    type: "PUT",
    data: JSON.stringify(data),
    contentType: "application/JSON",
    dataType: "json",
    complete: function () {
      console.log("Usuario Actualizado");
      clearInputs();
      getUsers();
    },
  });
}

function deleteUser(idUser) {
  let data = {
    id: idUser,
  };
  $.ajax({
    url: "http://150.230.86.64:81/api/user/" + idUser,
    //url: "http://localhost:8080/api/user/" + idUser,
    type: "DELETE",
    data: JSON.stringify(data),
    contentType: "application/JSON",
    dataType: "json",
    success: function () {
      console.log("Dato eliminado");
      clearInputs();
      getUsers();
    },
  });
}
function clearInputs() {
  $("#id-user").val(""),
    $("#identification-user").val(""),
    $("#name-user").val(""),
    $("#address-user").val(""),
    $("#cellPhone-user").val(""),
    $("#email-user").val(""),
    $("#password-user").val(""),
    $("#zone-user").val(""),
    $("#type-user").val("");
}

getUsers();
