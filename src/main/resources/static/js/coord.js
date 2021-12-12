function getOrdenes(zona) {
    $.ajax({
        url: "http://150.230.86.64:81/api/order/zona"+ zona,
        //url: "http://localhost:8080/api/order/zona/" + zona,
        type: "GET",
        dataType: "json",
        success: function (answer) {
            drawOrders(answer);
        },
    });
}
function drawOrders(orders) {
    console.log("hi")
    for (i = 0; i < orders.length; i++) {
        let pedidos = "<div class='card pedido' style='width: 18rem;'>"
        pedidos += "<div class='card-body'>"
        pedidos += "<h5 class='card-title'>" + orders[i].salesMan.name+"</h5>"
        pedidos += "<h5 class='card-subtitle mb-2 text-muted'>" + orders[i].registerDay + "</h5>"
        console.log(orders[i].quantities)
        /* for (j = 0; j < orders[i].quantities.length; j++){
            pedidos += "<h1 class='card-text'>" + orders[i].quantities[j] + "</h1>"
        } */
        pedidos += "<p class='card-text'>" + JSON.stringify(orders[i].quantities)  + "</p>"
        pedidos += "<button class='btn btn-primary' onclick='updateOrder(" + orders[i].id + ")'>Aprobar</button>"
        /*  pedidos += "<select class='form-control' id='select-" + orders.id + "'>"
            pedidos += "<option selected='selected'>Pendiente</option>"
            pedidos += "<option selected='selected'>Aprobada</option>"
            pedidos += "<option selected='selected'>PENDIENTE</option>"
            pedidos += "</select>" */
        pedidos += "</div>"
        pedidos += "</div>"
        $("#ordenes").html(pedidos);
    }
}
function updateOrder(idOrden) {
    let orden = {
        id: idOrden,
        status: "Aprobada"
    }
    $.ajax({
        url: "http://150.230.86.64:81/api/user/update",
        //url: "http://localhost:8080/api/order/update",
        type: "PUT",
        data: JSON.stringify(orden),
        contentType: "application/JSON",
        dataType: "json",
        complete: function () {
            console.log("Orden Actualizada");
        },
    });
}

getOrdenes(localStorage.getItem("zona"))