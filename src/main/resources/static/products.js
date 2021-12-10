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
    for (l = 0; l < tools.length; l++){
        cards += "<div class='card tools-cards'>"
        cards +=    "<img class='card-img - top' src='https://image.shutterstock.com/image-vector/modern-creative-stylish-unique-connected-260nw-650009959.jpg' alt=''>"
        cards +=    "<div class='card-body'>"
        cards += "<h5 class='card-title'>" + tools[l].category + "</h5>"
        cards += "<div class='card-text'>"
        cards += "<p >Referencia: " + tools[l].reference + "</p>"
        cards += "<p >Marca: " + tools[l].brand + "</p>"
        cards += "<p >Marca: " + tools[l].materiales + "</p>"
        cards += "<p >Marca: " + tools[l].dimensiones + "</p>"
        cards += "<p >Marca: " + tools[l].description + "</p>"
        cards += "<p >Marca: " + tools[l].availability + "</p>"
        cards += "<p >Marca: " + tools[l].price + "</p>"
        cards += "<p >Marca: " + tools[l].quantity + "</p>"
        cards += "<button class='btn btn-primary'>Añadir</button>"
        cards += "</div>"
        cards += "</div>"
        cards += "</div>"


        console.log("Dibujados")
        $("#cards").html(cards);
    }
}
getCards()
getTools()
//https://image.shutterstock.com/image-vector/modern-creative-stylish-unique-connected-260nw-650009959.jpg