var idCarga; // Guarda el Id del elemento cuando se da click en el botón cargar



function editar(){

    var elemento={
        idMessage:idCarga,
        messageText:$("#messageText").val(),
        doctor:{"id":$("#doctor").val()},
        client:{"idClient":$("#client").val()}
    };
    
    var dataToSend=JSON.stringify(elemento);
    $.ajax({    

        dataType : 'JSON',
       
        data: dataToSend,
        
        url: 'http://129.151.116.109:8080/api/Message/update',
        
        type: 'PUT',
        contentType:'application/json',
        
        
        success : function(json, textStatus, xhr) {
         
                console.log(json);
        },
        
        
        complete : function(xhr, status) {
            //alert('Petición realizada '+xhr.status);
            limpiarFormulario();
            consultar();
            idCarga=null;
        }
    });
}

function eliminar(idElemento){
    var elemento={
        "id":idElemento
      };
      console.log("mirar id de elemento"+ idElemento);
      
      var dataToSend=JSON.stringify(elemento);
    $.ajax({    
        
        dataType : 'JSON',
       
        data : dataToSend,
        
       
        url : "http://129.151.116.109:8080/api/Message/"+idElemento,
        type: 'DELETE',
        contentType:'application/json',
        success : function(json, textStatus, xhr) {
          
                console.log(idElemento);
                
        },
        
        complete : function(xhr, status) {
           //lert('Petición realizada '+xhr.status);
            //limpiarFormulario();
            consultar();
        }
    });
}


function cargar(idItem){
    $.ajax({    
        url : "http://129.151.116.109:8080/api/Message/"+idItem,
        type : 'GET',
        dataType : 'JSON',        

        success : function(json) {               
                console.log(json);
  
          $("#messageText").val(json.messageText);
          $("#doctor").val(json.doctor.id);
          $("#client").val(json.client.idClient);
          idCarga = idItem;
          console.log("idCarga es " +idCarga);
          
  
  
        }
    });
}

//////------------------


function consultar(){
    $.ajax({
        url:"http://129.151.116.109:8080/api/Message/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            pintarRespuesta(respuesta);
        }
    });
}

function pintarRespuesta(respuesta){

    let myTable="<table border='1'>";

    myTable+="<thead>";
    myTable+="<TR>";
    myTable+="<th>"+"Doctor"+"</th>";
    myTable+="<th>"+"Cliente"+"</th>";
    myTable+="<th>"+"Mensaje"+"</th>";

    myTable+="</TR>";
    myTable+="</thead>";

    for(i=0; i<respuesta.length; i++) {
        myTable+="<tr>";
        myTable+="<td>"+respuesta[i].doctor.name+"</td>";
        myTable+="<td>"+respuesta[i].client.name+"</td>";
        myTable+="<td>"+respuesta[i].messageText+"</td>";
        myTable+="<td><button onclick='eliminar("+respuesta[i].idMessage+")'>Borrar</button></td>";
        myTable+="<td><button onclick='cargar("+respuesta[i].idMessage+")'>Cargar</button></td>";
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#resultados").html(myTable);
}

function guardar(){
    let var2 = {
        messageText:$("#messageText").val(),
        doctor:{"id":window.doctor},
        client:{"idClient":window.client}
    };
    $.ajax({
        type:'POST',
        contentType:"application/json; charset=utf-8",
        dataType: 'JSON',
        data: JSON.stringify(var2),
        url:"http://129.151.116.109:8080/api/Message/save",
        success:function(respose) {
            console.log("Se guardó correctamente");
            //alert("Se guardó correctametne..");
            //window.location.reload();
            limpiarFormulario();
            consultar();
        },
        error:function(jqXHR, textStatus, errorTrown){
            
            console.log("No se guardó");
            alert("No se guardó correctamente");
        }
    });
}

function limpiarFormulario(){
    $("#messageText").val("");
    $("#doctor").val("");
    $("#client").val("");
}

//funcion llenado combo box
function consultarDatos(){

    consultarDoctor();
    consultarCliente();

}

//funcion obtener datos doctor

function consultarDoctor(){
    $.ajax({
        url:"http://129.151.116.109:8080/api/Doctor/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            comboBoxDoctor(respuesta);
        }
    });
}

//se llena el combo box de Doctor

    function comboBoxDoctor(respuesta){
        let myOption="<select name= Doctores id=Doctores>";
                myOption+="<option value="+0+">"+"Seleccione Doctor"+"</option>"
            for(i=0; i<respuesta.length; i++) {
                myOption+="<option value="+respuesta[i].id+">"+respuesta[i].name+"</option>"

}
        myOption+="</select>";
        $("#comboDoctor").html(myOption);
        
        
    }

//se obtiene el id del cliente seleccionado del combo box

    function fillBookDoctor(document){    
        var first_select = document.getElementById('Doctores').value;
        
        console.log('Doctor select -> '+first_select);
        window.doctor=first_select; 
     }


//funcion consulta datos Clientes


function consultarCliente(){
    $.ajax({
        url:"http://129.151.116.109:8080/api/Client/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            comboBoxCliente(respuesta);

        }
    });
}
//llenar combo box clientes
    function comboBoxCliente(respuesta){
        let myOption="<select name=Clientes id=Clientes>";
                myOption+="<option value="+0+">"+"Seleccione Cliente"+"</option>"
            for(i=0; i<respuesta.length; i++) {
                myOption+="<option value="+respuesta[i].idClient+">"+respuesta[i].name+"</option>"

}
        myOption+="</select>";
        $("#comboClient").html(myOption);
        
    }
//se obtiene el id del cliente seleccionado del combo box
    function fillBookCliente(document){    
        var first_select = document.getElementById('Clientes').value;
        
        console.log('Client select -> '+first_select);
        window.client=first_select; 
     }
