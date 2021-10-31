var idCarga; // Guarda el Id del elemento cuando se da click en el botón cargar


function editarClient(){

    var elemento={
        idClient:idCarga,
        name:$("#nameClient").val(),
        email:$("#emailClient").val(),
        age:$("#ageClient").val(),
        password:$("#passwordClient").val()
    };
    
    var dataToSend=JSON.stringify(elemento);
    console.log("datos para enviar:");
    console.log(dataToSend);
    $.ajax({    

        dataType : 'JSON',
       
        data: dataToSend,
        
        url: 'http://localhost:1010/api/Client/update',
        
        type: 'PUT',
        contentType:'application/json',
        
        
        success : function(json, textStatus, xhr) {
         
                console.log(json);
        },
        
        
        complete : function(xhr, status) {
            //alert('Petición realizada '+xhr.status);
            limpiarFormularioClient();
            consultarClient();
            idCarga=null;
        }
    });
}

function eliminarClient(idElemento){
    var elemento={
        "idClient":idElemento
      };
      console.log("mirar id de elemento"+ idElemento);
      
      var dataToSend=JSON.stringify(elemento);
    $.ajax({    
        
        dataType : 'JSON',
       
        data : dataToSend,
        
       
        url : "http://localhost:1010/api/Client/"+idElemento,
        type: 'DELETE',
        contentType:'application/json',
        success : function(json, textStatus, xhr) {
          
                console.log(idElemento);
                
        },
        
        complete : function(xhr, status) {
           //lert('Petición realizada '+xhr.status);
            //limpiarFormulario();
            consultarClient();
        }
    });
}




function cargarClient(idItem){
    $.ajax({    
        url : "http://localhost:1010/api/Client/"+idItem,
        type : 'GET',
        dataType : 'JSON',        

        success : function(json) {               
                console.log(json);

                var misItems=json.items;
  
          $("#nameClient").val(json.name);
          $("#emailClient").val(json.email);
          $("#ageClient").val(json.age);
          $("#passwordClient").val(json.password);
          idCarga = idItem;
          console.log("idCarga es " +idCarga);
  
  
        }
    });
}

//////------------------

function consultarClient(){
    $.ajax({
        url:"http://localhost:1010/api/Client/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            pintarRespuestaClient(respuesta);
        }
    });
}

function pintarRespuestaClient(respuesta){
    let myTable=`<div class="container" style="width: 100%;"><div class="row">`;
    for(i=0; i<respuesta.length; i++) {
        myTable+=`
            <div class="card m-2" style="width: 20rem;">
                <div class="card-body">
                    <h5 class="card-title">${respuesta[i].name}</h5>
                    <a href="${respuesta[i].email}" class="card-link">${respuesta[i].email}</a>
                    <!-- p class="card-text">${respuesta[i].age}</p -->
                    <div align="centre">
                        <button class="btn btn-success" onclick="eliminar(${respuesta[i].idClient})">Borrar</button>
                        <button class="btn btn-success" onclick="cargar(${respuesta[i].idClient})">Cargar</button>
                    </div>
                </div>
            </div>`;   
         
    }
    myTable+=`</div></div>`;
    
    $("#resultadosClient").html(myTable);
}

function guardarClient(){
    let var2 = {
        name:$("#nameCliente").val(),
        email:$("#emailCliente").val(),
        age:$("#ageCliente").val(),
        password:$("#passwordCliente").val()
    };
    $.ajax({
        type:'POST',
        contentType:"application/json; charset=utf-8",
        dataType: 'JSON',
        data: JSON.stringify(var2),
        url:"http://localhost:1010/api/Client/save",
        success:function(respose) {
            console.log("Se guardó correctamente");
            //alert("Se guardó correctametne..");
            //window.location.reload();
            limpiarFormularioClient();
            consultarClient();
        },
        error:function(jqXHR, textStatus, errorTrown){
            window.location.reload();
            console.log("No se guardó");
            alert("No se guardó correctamente");
        }
    });
}
function limpiarFormularioClient(){
    $("#nameClient").val("");
    $("#emailClient").val("");
    $("#ageClient").val("");
    $("#passwordClient").val("");
}
$(document).ready(function(){
    consultarClient();
});