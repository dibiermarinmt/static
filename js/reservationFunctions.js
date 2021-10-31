var idCarga; // Guarda el Id del elemento cuando se da click en el botón cargar
var idCargaScore;

function editarReservation(){
    var Start = dateStart.value;
    var Devolution = dateDevolution.value;
   
    var elemento={
        idReservation: idCarga,
        startDate: Start,
        devolutionDate:Devolution,

        doctor:{"id":window.doctorR},
        client:{"idClient":window.clientR}    };
   
   
    var dataToSend=JSON.stringify(elemento);
    console.log(dataToSend)
    console.log(window.doctorR)
    console.log(window.clientR)
    $.ajax({    

        dataType : 'JSON',
       
        data: dataToSend,
        
        url: 'http://localhost:8080/api/Reservation/update',
        
        type: 'PUT',
        contentType:'application/json',
        
        
        success : function(json, textStatus, xhr) {
         
                console.log(json);
        },
        
        
        complete : function(xhr, status) {
            //alert('Petición realizada '+xhr.status);
            limpiarFormularioReservation();
            consultarReservation();
            
        }
    });
}

function editarScore(){

    //Calificar(idCargaScore)

    var elemento={
        idScore: idCargaScore,
        score:$("#scoreReservation").val(),
            message:$("#messageReservation").val(),
            reservation:{"idReservation":idCarga}
    };
   
   
    var dataToSend=JSON.stringify(elemento);
    $.ajax({    

        dataType : 'JSON',
       
        data: dataToSend,
        
        url: 'http://localhost:8080/api/Score/update',
        
        type: 'PUT',
        contentType:'application/json',
        
        
        success : function(json, textStatus, xhr) {
         
                console.log(json+"cambio score");
                var scoreInput = document.getElementById('scoreReservation');
              var messageInput = document.getElementById('messageReservation');
                scoreInput.readOnly=true;
                messageInput.readOnly=true;
        },
        
        
        complete : function(xhr, status) {
            //alert('Petición realizada '+xhr.status);
            limpiarFormularioReservation();
            consultarReservation();
            idCarga=null;
        }
    });
}


function conseguirScore(idElemento){
    
      
      $.ajax({    
        url : "http://localhost:8080/api/Reservation/"+idElemento,
        type : 'GET',
        dataType : 'JSON',        

        success : function(json) {               
                console.log(json.score.idScore);
                window.idScoreE = json.score.idScore;
                eliminarScore(window.idScoreE);
            }
    });}
    function eliminarReservation(idElemento){
        //conseguirScore(window.idScoreE);
        console.log("ejecuta eliminarR")
        var elemento={
            "id":idElemento
          };
          console.log("mirar id de elemento"+ idElemento);
          
          var dataToSend=JSON.stringify(elemento);
        

        $.ajax({    
        
        dataType : 'JSON',
       
        data : dataToSend,
        
        
        url : "http://localhost:8080/api/Reservation/"+idElemento,
        type: 'DELETE',
        contentType:'application/json',
        success : function(json, textStatus, xhr) {
          
                console.log(idElemento);
                
        },
        
        complete : function(xhr, status) {
           //lert('Petición realizada '+xhr.status);
            //limpiarFormulario();
            consultarReservation();
        }
    });
}

function eliminarScore(){
    
    
    var elemento={
        "id":window.idScoreE
      };
      console.log("mirar id de elemento Score"+ window.idScoreE);
      
      var dataToSend=JSON.stringify(elemento);
    $.ajax({    
        
        dataType : 'JSON',
       
        data : dataToSend,
        
        url : "http://localhost:8080/api/Score/"+window.idScoreE,
        type: 'DELETE',
        contentType:'application/json',
        success : function(json, textStatus, xhr) {
          
                console.log(window.idScoreE+" a eliminar score");
                
        },
        
        complete : function(xhr, status) {
           //lert('Petición realizada '+xhr.status);
            //limpiarFormulario();
            consultarReservation();
        }
    });
}

function CargarReservation(idItem){
    $.ajax({    
        url : "http://localhost:8080/api/Reservation/"+idItem,
        type : 'GET',
        dataType : 'JSON',        

        success : function(json) {               
                console.log(json.startDate);
  
                idCarga = idItem;
                console.log("idCarga es " +idCarga);
          
          

                let str = json.startDate;
                
                year = str.substring(0, 4);
                month = str.substring(5, 7);
                day = str.substring(8, 10);
                console.log(year);
                console.log(month);
                console.log(day);
                
                let strD = json.devolutionDate;
                
                yearD = strD.substring(0, 4);
                monthD = strD.substring(5, 7);
                dayD = strD.substring(8, 10);

                dateStart.value=year+"-"+month+"-"+day
                dateDevolution.value=yearD+"-"+monthD+"-"+dayD
            
  
        }
    });
}

function cargarScore(idItem){
    $.ajax({    
        url : "http://localhost:8080/api/Reservation/"+idItem,
        type : 'GET',
        dataType : 'JSON',        

        success : function(json) {               
                console.log(json);
  
          $("#scoreReservation").val(json.score.score);
          $("#messageReservation").val(json.score.message);
          idCarga = idItem;
          idCargaScore = json.score.idScore;
          console.log("idCarga es " +idCargaScore);
          var scoreInput = document.getElementById('scoreReservation');
          var messageInput = document.getElementById('messageReservation');
            scoreInput.readOnly=false;
            messageInput.readOnly=false;
  
        }
    });
}

//////------------------

function consultarReservation(){
    $.ajax({
        url:"http://localhost:8080/api/Reservation/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            window.respuesta=respuesta;
            pintarRespuestaReservation(respuesta);
        }
    });
}

function pintarRespuestaReservation(respuesta){
    let myTable=`<div class="container" style="width: 100%;"><div class="row">`;
    for(i=0; i<respuesta.length; i++) {
        myTable+=`
            <div class="card m-2" style="width: 30rem;">
                <div class="card-body">
                    <h5 class="card-title">${respuesta[i].idReservation}</h5>
                    <p class="card-text"><b>${respuesta[i].doctor.name}</b></p>
                    <p class="card-text">${respuesta[i].client.idClient}</p>
                    <p class="card-text">${respuesta[i].client.name}</p>
                    <p class="card-text">${respuesta[i].client.email}</p>`
                    

       try{
        myTable+=`<p>${respuesta[i].score.score}</td>`
   }
   catch(error){
        myTable+=`<td>${"Sin calificacion"}</td>`
   }
 myTable+=`
 
                    <div align="centre">
                        <button class="btn btn-danger" onclick="eliminarReservation(${respuesta[i].idReservation})">Borrar Reservacion</button>
                        <button class="btn btn-danger" onclick="conseguirScore(${respuesta[i].idReservation})">Borrar Score</button>
                        <button class="btn btn-info" onclick="CargarReservation(${respuesta[i].idReservation})">Cargar Reservacion</button>
                        <button class="btn btn-info" onclick="cargarScore(${respuesta[i].idReservation})">Cargar Score</button>
                        <button class="btn btn-info" onclick="Calificar(${respuesta[i].idReservation})">Calificar</button>
                    </div>
                </div>
            </div>`;   
    
        }
    myTable+=`</div></div>`;


    $("#resultadosReservation").html(myTable);
}

function guardarReservation(){
    var Start = dateStart.value;
    var Devolution = dateDevolution.value;
   
    let var2 = {
        startDate: Start,
        devolutionDate: Devolution,
        client:{"idClient":window.clientR},
        doctor:{"id":window.doctorR}
                
    };
    console.log(Start);
    console.log(Devolution);
    console.log(var2)
    $.ajax({
        type:'POST',
        contentType:"application/json; charset=utf-8",
        dataType: 'JSON',
        data: JSON.stringify(var2), 
        url:"http://localhost:8080/api/Reservation/save",
        success:function(respose) {
            console.log("Se guardó correctamente");
            //alert("Se guardó correctametne..");
            //window.location.reload();
            limpiarFormularioReservation();
            consultarReservation();
        },
        error:function(jqXHR, textStatus, errorTrown){
            
            console.log("No se guardó");
            alert("No se guardó correctamente");
        }
    });
}

function limpiarFormularioReservation(){
    dateStart.value="dd/mm/aaaa"
    dateDevolution.value="dd/mm/aaaa"
    $("#doctor").val("");
    $("#client").val("");

}

$(document).ready(function(){
    consultarDoctorR();
    consultarClienteR();
    consultarReservation();
});


// funciones combo box Doctor 1(consulta) 2(llenado Option) 3(declaracion variable global Doctor)

 function consultarDoctorR(){
     console.log("consulta doctorR")
    $.ajax({
        url:"http://localhost:8080/api/Doctor/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            comboBoxDoctorR(respuesta);
        }
    });
}
    function comboBoxDoctorR(respuesta){
        console.log("se esta ejecutadno combo doctor R")

        let myOption='<select name= DoctoresR id=DoctoresReservation class="form-control m-3">'
        myOption+="<option value="+0+">"+"Seleccione Doctor"+"</option>";
    for(i=0; i<respuesta.length; i++) {
        myOption+="<option value="+respuesta[i].id+">"+respuesta[i].name+"</option>";
     }
myOption+="</select>";

        $("#comboDoctorR").html(myOption);
        
        
    }

    function fillBookDoctorR(document){    
        var first_select = document.getElementById('DoctoresReservation').value;
        
        console.log('Doctor select -> '+first_select);
        window.doctorR=first_select; 
     }

//// funciones combo box Client 1(consulta) 2(llenado Option) 3(declaracion variable global Doctor id)

function consultarClienteR(){

    console.log("1")
    $.ajax({
        url:"http://localhost:8080/api/Client/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            comboBoxClienteR(respuesta);

        }
    });
}
    function comboBoxClienteR(respuesta){
        console.log("2")
        let myOption='<select name= ClientR id=ClientesReservation class="form-control m-3">'
        myOption+="<option value="+0+">"+"Seleccione Cliente"+"</option>";
    for(i=0; i<respuesta.length; i++) {
        myOption+="<option value="+respuesta[i].idClient+">"+respuesta[i].name+"</option>";
     }
myOption+="</select>";
        $("#comboClienteR").html(myOption);
        
    }

    function fillBookClienteR(document){    
        var first_select = document.getElementById('ClientesReservation').value;
        
        console.log('Client select -> '+first_select);
        window.clientR=first_select; 
     }

//toma de datos para calificar, se habilita los campos de texto

     function Calificar(idItem){
        $.ajax({    
            url : "http://localhost:8080/api/Reservation/"+idItem,
            type : 'GET',
            dataType : 'JSON',        
    
            success : function(json) {               
                    console.log(json);
      
                      idCarga = idItem;
              console.log("idCarga es " +idCarga);
             
              window.reservation=idCarga;
              var scoreInput = document.getElementById('scoreReservation');
              var messageInput = document.getElementById('messageReservation');

                scoreInput.readOnly=false;
                messageInput.readOnly=false;
                
                
            }
        });
    }
    

//se toman los datos y se envian en el post

    function calificacion(){
        console.log("se ejecuta calificacion")
        let var2 = {
            score:$("#scoreReservation").val(),
            message:$("#messageReservation").val(),
            reservation:{"idReservation":window.reservation}        
        };
        console.log(var2);
        $.ajax({
            type:'POST',
            contentType:"application/json; charset=utf-8",
            dataType: 'JSON',
            data: JSON.stringify(var2),
            url:"http://localhost:8080/api/Score/save",
            success:function(respose) {
                console.log("Se guardó correctamente");
                var scoreInput = document.getElementById('scoreReservation');
              var messageInput = document.getElementById('messageReservation');
                scoreInput.readOnly=true;
                messageInput.readOnly=true;
                $("#scoreReservation").val(""),
                $("#messageReservation").val(""),           
                consultarReservation();
            },
            error:function(jqXHR, textStatus, errorTrown){
                
                console.log("No se guardó");
                alert("No se guardó correctamente");
            }
        });
    }

    //ActionCombo

    
    function ActionCombo(document){    
        console.log("Action Combo"+reserID)
        var ActionSelect = document.getElementById('Actionbox'+reserID).value;
        
        console.log('Action select -> '+ActionSelect);
        window.Action=ActionSelect; 
     }