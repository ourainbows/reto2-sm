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
          createTool();
        }
        form.classList.add("was-validated");
      },
      false
    );
  });
})();

function getTools() {
  $.ajax({
    url:"http://150.230.86.64:81/api/cookware/all",
    //url: "http://localhost:8080/api/cookware/all",
    type: "GET",
    contentType: "JSON",
    success: function (answer) {
      drawTools(answer);
    },
  });
}

function drawTools(tools) {
  let toolsTabel = "<table>";
  for (i = 0; i < tools.length; i++) {
    toolsTabel += "<tr>";

    toolsTabel += "<th>" + tools[i].reference + "</th>";
    toolsTabel += "<td>" + tools[i].brand + "</td>";
    toolsTabel += "<td>" + tools[i].category + "</td>";
    toolsTabel += "<td>" + tools[i].materiales + "</td>";
    toolsTabel += "<td>" + tools[i].dimensiones + "</td>";
    toolsTabel += "<td>" + tools[i].description + "</td>";
    toolsTabel += "<td>" + tools[i].availability + "</td>";
    toolsTabel += "<td>" + tools[i].price + "</td>";
    toolsTabel += "<td>" + tools[i].quantity + "</td>";
    /* toolsTabel += "<td>" + tools[i].photography + "</td>"; */
    toolsTabel +=
      "<td><button class='btn btn-outline-secondary' onclick='getTool(" +
      JSON.stringify(tools[i].reference) +
      ")'>Editar</button></td>";
    toolsTabel +=
      "<td><button class='btn btn-outline-danger' onclick='deleteTool(" +
      JSON.stringify(tools[i].reference) +
      ")'>Borrar</button></td>";

    toolsTabel += "</tr>";
    $("#cookware-table").html(toolsTabel);
  }
}

function createTool() {
  let tool = {
    reference: $("#CReference").val(),
    brand: $("#CBrand").val(),
    category: $("#CCategory").val(),
    materiales: $("#CMateriales").val(),
    dimensiones: $("#CDimensiones").val(),
    description: $("#CDescription").val(),
    availability: $("#CAvaliability").val(),
    price: $("#CPrice").val(),
    quantity: $("#CQuantity").val(),
    photography: $("#CPhotography").val(),
  };
  $.ajax({
    url: "http://150.230.86.64:81/api/cookware/new",
    //url: "http://localhost:8080/api/cookware/new",
    type: "POST",
    data: JSON.stringify(tool),
    contentType: "application/JSON",
    complete: function () {
      getTools();
      clearInputs();
    },
  });
}

function updateTool() {
  let tool = {
    reference: $("#CReference").val(),
    brand: $("#CBrand").val(),
    category: $("#CCategory").val(),
    materiales: $("#CMateriales").val(),
    dimensiones: $("#CDimensiones").val(),
    description: $("#CDescription").val(),
    availability: $("#CAvaliability").val(),
    price: $("#CPrice").val(),
    quantity: $("#CQuantity").val(),
    photography: $("#CPhotography").val(),
  };
  $.ajax({
    url: "http://150.230.86.64:81/api/cookware/update",
    //url: "http://localhost:8080/api/cookware/update",
    type: "PUT",
    data: JSON.stringify(tool),
    contentType: "application/JSON",
    dataType: "JSON",
    complete: function () {
      getTools();
      clearInputs();
    },
  });
}

function deleteTool(reference) {
  let toolReference = {
    reference: reference,
  };
  $.ajax({
    url: "http://150.230.86.64:81/api/cookware/" + reference,
    //url: "http://localhost:8080/api/cookware/" + reference,
    type: "DELETE",
    data: JSON.stringify(toolReference),
    contentType: "application/JSON",
    dataType: "JSON",
    success: function () {
      getTools();
    },
  });
}

function getTool(reference) {
  let toolReference = {
    reference: reference,
  };
  $.ajax({
    url: "http://150.230.86.64:81/api/cookware/" + reference,
    //url: "http://localhost:8080/api/cookware/" + reference,
    type: "GET",
    dataType: "JSON",
    success: function (answer) {
      $("#CReference").val(answer.reference),
        $("#CBrand").val(answer.brand),
        $("#CCategory").val(answer.category),
        $("#CMateriales").val(answer.materiales),
        $("#CDimensiones").val(answer.dimensiones),
        $("#CDescription").val(answer.description),
        $("#CAvaliability").val(answer.availability),
        $("#CPrice").val(answer.price),
        $("#CQuantity").val(answer.quantity),
        $("#CPhotography").val(answer.photography);
    },
  });
}

function clearInputs() {
  $("#CReference").val(""),
    $("#CBrand").val(""),
    $("#CCategory").val(""),
    $("#CMateriales").val(""),
    $("#CDimensiones").val(""),
    $("#CDescription").val(""),
    $("#CAvaliability").val(""),
    $("#CPrice").val(""),
    $("#CQuantity").val(""),
    $("#CPhotography").val("");
}

getTools();
