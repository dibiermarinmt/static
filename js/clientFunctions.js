var idCarga; // Guarda el Id del elemento cuando se da click en el botón cargar



function editarCliente(){

    var elemento={
        idClient:idCarga,
        name:$("#nameCliente").val(),
        email:$("#emailCliente").val(),
        age:$("#ageCliente").val(),
        password:$("#passwordCliente").val()
          
    };
    
    var dataToSend=JSON.stringify(elemento);
    console.log("datos para enviar:");
    console.log(dataToSend);
    $.ajax({    

        dataType : 'JSON',
       
        data: dataToSend,
        
        url: 'http://localhost:8080/api/Client/update',
        
        type: 'PUT',
        contentType:'application/json',
        
        
        success : function(json, textStatus, xhr) {
         
                console.log(json);
        },
        
        
        complete : function(xhr, status) {
            //alert('Petición realizada '+xhr.status);
            limpiarFormularioCliente();
            consultarCliente();
            idCarga=null;
        }
    });
}

function eliminarCliente(idElemento){
    var elemento={
        "idClient":idElemento
      };
      console.log("mirar id de elemento"+ idElemento);
      
      var dataToSend=JSON.stringify(elemento);
    $.ajax({    
        
        dataType : 'JSON',
       
        data : dataToSend,
        
       
        url : "http://localhost:8080/api/Client/"+idElemento,
        type: 'DELETE',
        contentType:'application/json',
        success : function(json, textStatus, xhr) {
          
                console.log(idElemento);
                
        },
        
        complete : function(xhr, status) {
           //lert('Petición realizada '+xhr.status);
            //limpiarFormularioCliente();
            consultarCliente();
        }
    });
}





function cargarCliente(idItem){
    $.ajax({    
        url : "http://localhost:8080/api/Client/"+idItem,
        type : 'GET',
        dataType : 'JSON',        

        success : function(json) {               
                console.log(json);

                var misItems=json.items;
  
          $("#nameCliente").val(json.name);
          $("#emailCliente").val(json.email);
          $("#ageCliente").val(json.age);
          $("#passwordCliente").val(json.password);
          idCarga = idItem;
          console.log("idCarga es " +idCarga);
  
  
        }
    });
}

//////------------------


function consultarCliente(){
    $.ajax({
        url:"http://localhost:8080/api/Client/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            pintarRespuestaCliente(respuesta);
        }
    });
}

function pintarRespuestaCliente(respuesta){
    let myTable=`<div class="container" style="width: 100%"><div class="row">`;
    for(i=0; i<respuesta.length; i++) {
        myTable+=`
            <div class="card m-2" style="width: 20rem;">
                <div class="card-body">
                    <h5 class="card-title">${respuesta[i].name}</h5>
                    <a href="mailto:${respuesta[i].email}" class="card-link">${respuesta[i].email}</a>
                    <p class="card-text">${respuesta[i].age} años</p>
                    <div align="centre">
                        <button class="btn btn-success" onclick="eliminarCliente(${respuesta[i].idClient})">Borrar</button>
                        <button class="btn btn-success" onclick="cargarCliente(${respuesta[i].idClient})">Cargar</button>
                    </div>
                </div>
            </div>`;   
         
    }
    myTable+=`</div></div>`;
    $("#resultadosCliente").html(myTable);
    
}

function guardarCliente(){
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
        url:"http://localhost:8080/api/Client/save",
        success:function(respose) {
            console.log("Se guardó correctamente");
            //alert("Se guardó correctametne..");
            //window.location.reload();
            //limpiarFormulario();
            consultarCliente();
        },
        error:function(jqXHR, textStatus, errorTrown){
            window.location.reload();
            console.log("No se guardó");
            alert("No se guardó correctamente");
        }
    });
}

function limpiarFormularioCliente(){
    $("#nameCliente").val("");
    $("#emailCliente").val("");
    $("#ageCliente").val("");
    $("#passwordCliente").val("");
}

$(document).ready(function(){
    consultarCliente();
});