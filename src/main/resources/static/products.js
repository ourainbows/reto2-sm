let onCar = []
let saleMan = {}
let cantidades = {}



function getCards() {
    $.ajax({
        //url: "http://150.230.86.64:81/api/cookware/all",
        url: "http://localhost:8080/api/cookware/all",
        type: "GET",
        contentType: "JSON",
        success: function (answer) {
            drawCards(answer)
        },
    });
}


function drawCards(tools) {
    let cards = "<div class='tools'>"
    for (l = 0; l < tools.length; l++) {
        cards += "<div class='card tools-cards'>"
        cards += "<img class='card-img-top' src='" + tools[l].photography + "' alt=''>"
        cards += "<div class='card-body'>"
        cards += "<h3 class='card-title'>$ " + tools[l].price + "</h5>"
        cards += "<p ><b>Cantidad:</b> " + tools[l].quantity + "</p>"
        cards += "<div class='card-text'>"
        cards += "<p ><b>Referencia:</b> " + tools[l].reference + "</p>"
        cards += "<p ><b>Marca:</b> " + tools[l].brand + "</p>"
        cards += "<p ><b>Materiales:</b> " + tools[l].materiales + "</p>"
        cards += "<p ><b>Dimensiones:</b> " + tools[l].dimensiones + "</p>"
        cards += "<p ><b>Disponiblidad:</b> " + tools[l].availability + "</p>"
        cards += "<p ><b>Categoria:</b> " + tools[l].category + "</p>"
        cards += "<button class='btn btn-primary' style='width:100%' onclick='addCar( \"" + tools[l].reference + "\")'>Añadir</button>"
        cards += "</div>"
        cards += "</div>"
        cards += "</div>"
        $("#cards").html(cards);
    }
}


function addCar(reference) {
    if (!onCar.includes(reference)) {
        let toolReference = {
            reference: reference,
        };
        $.ajax({
            //url: "http://150.230.86.64:81/api/cookware/" + reference,
            url: "http://localhost:8080/api/cookware/" + reference,
            type: "GET",
            dataType: "JSON",
            success: function (answer) {
                let product = "<div class='card mb-3 carCard' id='" + answer.reference + "'>"
                product += "<div class='row no-gutters'>"
                product += "<div class='col-md-4'>"
                product += "<img src='" + answer.photography + "' class='card-img'>"
                product += "</div>"
                product += "<div class='col-md-8'>"
                product += "<div class='card-body'>"
                product += "<h5 class='card-title' >$ " + answer.price + "</h5>"
                product += "<p class='card-title'><small class='text-muted'>" + answer.reference + "</small></p>"
                /* product += "<p class='card-title'><small class='text-muted'>" + answer.brand + "</small></p>" */
                product += "<p class='card-text'>" + answer.description + "</p>"
                product += "<input id='input-" + answer.reference + "' class='form-control' value='1'  placeholder='Cantidad' type='number' min='0' max='" + answer.quantity + "'>"
                product += "<button class='btn btn-danger' onclick='deleteCar( \"" + answer.reference + "\")' style='margin-top:5px; width:100%'>Eliminar</button"
                product += "</div>"
                product += "</div>"
                product += "</div>"
                product += "</div>"
                $(".productos-Car").append(product)
                onCar.push(reference)
            },
        });
    }
}


function deleteCar(reference) {
    $("#" + reference).remove()
    let indexReference = onCar.indexOf(reference)
    if (indexReference != 1) {
        onCar.splice(indexReference, 1)
        $("#" + reference).remove()
    }
}


function salesMan() {
    let email = localStorage.getItem("correo")
    let password = localStorage.getItem("contraseña")
    $.ajax({
        //url: "http://150.230.86.64:81/api/user/" + email + "/" + password,
        url: "http://localhost:8080/api/user/" + email + "/" + password,
        type: "GET",
        dataType: "json",
        success: function (answer) {
            saleMan = {
                id: answer.id,
                identification: answer.identification,
                name: answer.name,
                address: answer.address,
                cellPhone: answer.address,
                email: answer.email,
                password: answer.password,
                zone: answer.zone,
                type: answer.type,
                birthDay: answer.birthDay,
                monthDay: answer.monthDay,
            }
        },
    });
}


function allProductsToBuy() {
    let allProducts = new Object
    for (i = 0; i < onCar.length; i++) {
        let pdt = { [onCar[i]]: getProduct(onCar[i]) }
        Object.assign(allProducts, pdt)
    }
    return allProducts
}


function getProduct(reference) {
    var data = null
    let toolReference = {
        reference: reference,
    };
    $.ajax({
        //url: "http://150.230.86.64:81/api/cookware/" + reference,
        url: "http://localhost:8080/api/cookware/" + reference,
        type: "GET",
        dataType: "JSON",
        async: false,
        success: function (answer) {
            data = answer
        },
    });
    return data 
}


function cantidadProductos() {
    let cantidad = new Object
    for (i = 0; i < onCar.length; i++){
        let rfce = { [onCar[i]]: parseInt($("#input-" + onCar[i]).val()) }
        Object.assign(cantidad, rfce)
    }
    return cantidad
}


function solicitar() {
    let pedido = {
        registerDay: new Date().toISOString().slice(0, 10),
        status: "Pendiente",
        salesMan: saleMan,
        products: allProductsToBuy(),
        quantities: cantidadProductos(),
    }
    $.ajax({
        //url: "http://150.230.86.64:81/api/user/new",
        url: "http://localhost:8080/api/order/new",
        type: "POST",
        data: JSON.stringify(pedido),
        contentType: "application/JSON",
        dataType: "json",
        complete: function () {
        },
    });
}

getCards()
salesMan()
