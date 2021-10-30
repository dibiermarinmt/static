
//Funciones Cargar pagina Specialidad

function cargarPag() {
    $("#contSpecialty").load("http://localhost:8080/specialtyInterface.html", function (data) {

        $(this).html(data);
        $("#contSpecialty").width= 100;
    })
}

function mostrarPagSpec(){
    cargarPag()
    console.log("se esta ejecutando mostrar pag")
    var cardSpecialty = document.getElementById("cardSpecialty");
    var tama = false
    if (cardSpecialty.style.width=="25rem"){
        
        tama = true;
        
    }
    
    if (tama==true){
        
        cardSpecialty.style.width="110rem";
        
    }
    if(tama==false){
        
        cardSpecialty.style.width="25rem";
    }
    
}



//Funciones Cargar pagina Administradores

function cargarPagAdmin() {
    $("#contAdmin").load("http://localhost:8080/adminInterface.html", function (data) {
    console.log("se esta ejecutando cargarPagAdmin")
        $(this).html(data);
        $("#contAdmin").width= 100;
    })
}

function mostrarPagAdmin(){
    cargarPagAdmin()
    console.log("se esta ejecutando mostrar pag")
    var cardAdmin = document.getElementById("cardAdmin");
    var tamaAdmin = false;
    if (cardAdmin.style.width=="25rem"){
        
        tamaAdmin = true;
        
    }
    
    if (tamaAdmin==true){
        
        cardAdmin.style.width="110rem";
        
    }
    if(tamaAdmin==false){
        
        cardAdmin.style.width="25rem";
    }
    
}



//Funciones Cargar pagina Clientes

function cargarPagClient() {
    $("#contClient").load("http://localhost:8080/clientInterface.html", function (data) {
    console.log("se esta ejecutando cargarPagClient")
        $(this).html(data);
        $("#contClient").width= 100;
    })
}

function mostrarPagClient(){
    cargarPagClient()
    console.log("se esta ejecutando mostrar pag")
    var cardClient = document.getElementById("cardClient");
    var tamaClient = false
    if (cardClient.style.width=="25rem"){
        
        tamaClient = true;
        
    }
    
    if (tamaClient==true){
        
        cardClient.style.width="110rem";
        
    }
    if(tamaClient==false){
        
        cardClient.style.width="25rem";
    }
    
}


//Funciones Cargar pagina Doctor

function cargarPagDoctor() {
    $("#contDoctor").load("http://localhost:8080/doctorInterface.html", function (data) {
    console.log("se esta ejecutando cargarPagDoctor")
        $(this).html(data);
        $("#contDoctor").width= 100;
    })
}

function mostrarPagDoctor(){
    cargarPagDoctor()
    console.log("se esta ejecutando mostrar pag")
    var cardDoctor = document.getElementById("cardDoctor");
    var tamaDoctor = false
    if (cardDoctor.style.width=="25rem"){
        
        tamaDoctor = true;
        
    }
    
    if (tamaDoctor==true){
        
        cardDoctor.style.width="110rem";
        
    }
    if(tamaDoctor==false){
        
        cardDoctor.style.width="25rem";
    }
    
}


//Funciones Cargar pagina Mensaje

function cargarPagMessage() {
    $("#contMessage").load("http://localhost:8080/messageInterface.html", function (data) {
    console.log("se esta ejecutando cargarPagMessage")
        $(this).html(data);
        $("#contMessage").width= 100;
    })
}

function mostrarPagMessage(){
    cargarPagMessage()
    console.log("se esta ejecutando mostrar pag")
    var cardMessage = document.getElementById("cardMessage");
    var tamaMessage = false
    if (cardMessage.style.width=="25rem"){
        
        tamaMessage = true;
        
    }
    
    if (tamaMessage==true){
        
        cardMessage.style.width="110rem";
        
    }
    if(tamaMessage==false){
        
        cardMessage.style.width="25rem";
    }
    
}

function cargarPagReservation() {
    $("#contReservation").load("http://localhost:8080/reservationInterface.html", function (data) {
    console.log("se esta ejecutando cargarPagMessage")
        $(this).html(data);
        $("#contReservation").width= 100;
    })
}

function mostrarPagReservation(){
    cargarPagReservation()
    console.log("se esta ejecutando mostrar pag")
    var cardReservation = document.getElementById("cardReservation");
    var tamaReservation = false
    if (cardReservation.style.width=="25rem"){
        
        tamaReservation = true;
        
    }
    
    if (tamaReservation==true){
        
        cardReservation.style.width="110rem";
        
    }
    if(tamaReservation==false){
        
        cardReservation.style.width="25rem";
    }
    
}