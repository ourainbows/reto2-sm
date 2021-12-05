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
        url: "http://localhost:8080/api/cookware/all",
        type: "GET",
        contentType: "JSON",
        success: function (answer) {
            drawTools(answer)
        }
    })
}

function drawTools(tools) {
    let toolsTabel = "<table"
    for (i = 0; i < tools.length; i++){
        toolsTabel = "<tr>"

        toolsTabel += "<th>" + tools[i].reference + "</th>"
        toolsTabel += "<td>" + tools[i].brand + "</td>"
        toolsTabel += "<td>" + tools[i].category + "</td>";
        toolsTabel += "<td>" + tools[i].materiales + "</td>";
        toolsTabel += "<td>" + tools[i].dimensiones + "</td>";
        toolsTabel += "<td>" + tools[i].description + "</td>";
        toolsTabel += "<td>" + tools[i].avalibility + "</td>";
        toolsTabel += "<td>" + tools[i].price + "</td>";
        toolsTabel += "<td>" + tools[i].quantity + "</td>";
        toolsTabel += "<td>" + tools[i].photography + "</td>";
        toolsTabel += "<td><button class='btn btn-outline-secondary' onclick='selectTool'>" + JSON.stringify(tools[i].reference)
        toolsTabel +=
          "<td><button class='btn btn-outline-danger' onclick='deleteTool'>" +
            JSON.stringify(tools[i].reference);
        toolsTabel += "</tr>"
        $("#cookware-table").html(toolsTabel);
    }
}


function createTool() {
    $.ajax({

    })
}