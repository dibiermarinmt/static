var idCarga; // Guarda el Id del elemento cuando se da click en el botón cargar
var idCargaScore;

function editarReservation(){

    var elemento={
        idReservation: idCarga,
        startDate:$("#year").val()+"-"+$("#month").val()+"-"+$("#day").val(),
        devolutionDate:$("#yearD").val()+"-"+$("#monthD").val()+"-"+$("#dayD").val(),

        doctor:{"id":window.doctor},
        client:{"idClient":window.client}    };
   
   
    var dataToSend=JSON.stringify(elemento);
    $.ajax({    

        dataType : 'JSON',
       
        data: dataToSend,
        
        url: 'http://localhost:1010/api/Reservation/update',
        
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
        
        url: 'http://localhost:1010/api/Score/update',
        
        type: 'PUT',
        contentType:'application/json',
        
        
        success : function(json, textStatus, xhr) {
         
                console.log(json+"cambio score");
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
        url : "http://localhost:1010/api/Reservation/"+idElemento,
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

        var elemento={
            "id":idElemento
          };
          console.log("mirar id de elemento"+ idElemento);
          
          var dataToSend=JSON.stringify(elemento);
        

        $.ajax({    
        
        dataType : 'JSON',
       
        data : dataToSend,
        
        
        url : "http://localhost:1010/api/Reservation/"+idElemento,
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
        
        url : "http://localhost:1010/api/Score/"+window.idScoreE,
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

function cargarReservation(idItem){
    $.ajax({    
        url : "http://localhost:1010/api/Reservation/"+idItem,
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

          
            $("#year").val(year);
            $("#month").val(month);
            $("#day").val(day);

            $("#yearD").val(yearD);
            $("#monthD").val(monthD);
            $("#dayD").val(dayD);
          
          $("#status").val(json.status);
          $("#doctor").val(json.doctor.id);
          $("#client").val(json.client.idClient);
          
  
        }
    });
}

function cargarScore(idItem){
    $.ajax({    
        url : "http://localhost:1010/api/Reservation/"+idItem,
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
        url:"http://localhost:1010/api/Reservation/all",
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

    let myTable="<table border=1>";

    myTable+="<thead>";
    myTable+="<TR>";
    myTable+="<th>"+"Id Reserva"+"</th>";
    myTable+="<th>"+"Nombre Doctor"+"</th>";
    myTable+="<th>"+"Id Cliente"+"</th>";
    myTable+="<th>"+"Nombre Cliente"+"</th>";
    myTable+="<th>"+"Email Cliente"+"</th>";
    myTable+="<th>"+"Score"+"</th>";
    myTable+="<th>"+"Borrar Mensaje"+"</th>";
    myTable+="<th>"+"Calificar"+"</th>";
    myTable+="<th>"+"Editar Mensaje"+"</th>";
    myTable+="<th>"+"Eliminar Score"+"</th>";
    myTable+="<th>"+"Editar Score"+"</th>";
    myTable+="</TR>";
    myTable+="</thead>";

    
    for(i=0; i<respuesta.length; i++) {
        myTable+="<tr>";

        myTable+="<td>"+respuesta[i].idReservation+"</td>";
        myTable+="<td>"+respuesta[i].doctor.name+"</td>";
        myTable+="<td>"+respuesta[i].client.idClient+"</td>";
        myTable+="<td>"+respuesta[i].client.name+"</td>";
        myTable+="<td>"+respuesta[i].client.email+"</td>";
       

       try{
            myTable+="<td>"+respuesta[i].score.score+"</td>";
       }
       catch(error){
            myTable+="<td>"+"Sin calificacion"+"</td>";
       }
       
        myTable+="<td><button onclick='eliminar("+respuesta[i].idReservation+")'>Borrar Mensaje</button></td>";

        myTable+="<td><button onclick='Calificar("+respuesta[i].idReservation+")'>Calificar</button></td>";
        
        myTable+="<td><button onclick='cargar("+respuesta[i].idReservation+")'>Cargar Mensaje</button></td>";
        
        myTable+="<td><button onclick='conseguirScore("+respuesta[i].idReservation+")'>Borrar Calificacion</button></td>";

        myTable+="<td><button onclick='cargarScore("+respuesta[i].idReservation+")'>cargar Calificacion</button></td>";

        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#resultados").html(myTable);
}

function guardarReservation(){
    let var2 = {
        startDate:$("#year").val()+"-"+$("#month").val()+"-"+$("#day").val(),
        devolutionDate:$("#yearD").val()+"-"+$("#monthD").val()+"-"+$("#dayD").val(),

        doctor:{"id":window.doctor},
        client:{"idClient":window.client}        
    };
    console.log(var2);
    $.ajax({
        type:'POST',
        contentType:"application/json; charset=utf-8",
        dataType: 'JSON',
        data: JSON.stringify(var2),
        url:"http://localhost:1010/api/Reservation/save",
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
    $("#year").val("");
    $("#month").val("");
    $("#day").val("");
    $("#yearD").val("");
    $("#monthD").val("");
    $("#dayD").val("");
    $("#status").val("created");
    $("#doctor").val("");
    $("#client").val("");

    $("#score").val("");
}

function consultarDatosReservation(){

    consultarDoctorR();
    consultarClienteR();

}

// funciones combo box Doctor 1(consulta) 2(llenado Option) 3(declaracion variable global Doctor)

 function consultarDoctorR(){
    $.ajax({
        url:"http://localhost:1010/api/Doctor/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            comboBoxDoctorR(respuesta);
        }
    });
}
    function comboBoxDoctorR(respuesta){
        let myOption="<select name= Doctores id=DoctoresReservation>";
                myOption+="<option value="+0+">"+"Seleccione Doctor"+"</option>";
            for(i=0; i<respuesta.length; i++) {
                myOption+="<option value="+respuesta[i].id+">"+respuesta[i].name+"</option>";
             }
        myOption+="</select>";
        $("#comboDoctor").html(myOption);
        
        
    }

    function fillBookDoctorR(document){    
        var first_select = document.getElementById('DoctoresReservation').value;
        
        console.log('Doctor select -> '+first_select);
        window.doctor=first_select; 
     }

//// funciones combo box Client 1(consulta) 2(llenado Option) 3(declaracion variable global Doctor id)

function consultarClienteR(){
    $.ajax({
        url:"http://localhost:1010/api/Client/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            comboBoxClienteR(respuesta);

        }
    });
}
    function comboBoxClienteR(respuesta){
        let myOption="<select name=Clientes id=ClientesReservation>";
                myOption+="<option value="+0+">"+"Seleccione Cliente"+"</option>";
            for(i=0; i<respuesta.length; i++) {
                myOption+="<option value="+respuesta[i].idClient+">"+respuesta[i].name+"</option>";

}
        myOption+="</select>";
        $("#comboClient").html(myOption);
        
    }

    function fillBookClienteR(document){    
        var first_select = document.getElementById('ClientesReservation').value;
        
        console.log('Client select -> '+first_select);
        window.client=first_select; 
     }

//toma de datos para calificar, se habilita los campos de texto

     function Calificar(idItem){
        $.ajax({    
            url : "http://localhost:1010/api/Reservation/"+idItem,
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
            url:"http://localhost:1010/api/Score/save",
            success:function(respose) {
                console.log("Se guardó correctamente");
                var scoreInput = document.getElementById('score');
              var messageInput = document.getElementById('message');
                scoreInput.readOnly=true;
                messageInput.readOnly=true;
                $("#score").val(""),
                $("#message").val(""),           
                consultarReservation();
            },
            error:function(jqXHR, textStatus, errorTrown){
                
                console.log("No se guardó");
                alert("No se guardó correctamente");
            }
        });
    }
