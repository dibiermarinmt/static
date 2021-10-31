var idCarga; // Guarda el Id del elemento cuando se da click en el botón cargar


function editar(){

    var elemento={
        "id": idCarga,
        "name":$("#nameSpecialty").val(),
        "description":$("#descriptionSpecialty").val()
    };
    
    var dataToSend=JSON.stringify(elemento);
    $.ajax({    

        dataType : 'JSON',
       
        data: dataToSend,
        
        url: 'http://localhost:1010/api/Specialty/update',
        
        type: 'PUT',
        contentType:'application/json',
        
        
        success : function(json, textStatus, xhr) {
         
                console.log(json);
        },
        
        
        complete : function(xhr, status) {
            //alert('Petición realizada '+xhr.status);
            limpiarFormularioSpecialty();
            consultarSpecialty();
            idCarga=null;
        }
    });
}

function eliminarSpecialty(idElemento){
    var elemento={
        "id":idElemento
      };
      console.log("mirar id de elemento"+ idElemento);
      
      var dataToSend=JSON.stringify(elemento);
    $.ajax({    
        
        dataType : 'JSON',
       
        data : dataToSend,
        
       
        url : "http://localhost:1010/api/Specialty/"+idElemento,
        type: 'DELETE',
        contentType:'application/json',
        success : function(json, textStatus, xhr) {
          
                console.log(idElemento);
                
        },
        
        complete : function(xhr, status) {
           //lert('Petición realizada '+xhr.status);
            //limpiarFormulario();
            consultarSpecialty();
        }
    });
}
function cargar(idItem){
    $.ajax({    
        url : "http://localhost:1010/api/Specialty/"+idItem,

        type : 'GET',
        dataType : 'json',        
        
        success : function(json) {               
                console.log(json);

  
          $("#nameSpecialty").val(json.name);
          $("#descriptionSpecialty").val(json.description);
          idCarga = idItem;
          console.log("idCarga es " +idCarga);

        }
    });
}

//////------------------

function consultar(){
    $.ajax({
        url:"http://localhost:1010/api/Specialty/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            pintarRespuestaSpecialty(respuesta);
        }
    });
}
//consultar();

function pintarRespuesta(respuesta){

    
    
    
    
    
    
    
    let myTable=`<div class="container" style="width: 100%;"><div class="row" >`;

    for(i=0; i<respuesta.length; i++) {
        myTable+=`
            <div class="card m-2" style="width: 20rem;">
                <div class="card-body">
                    <h5 class="card-title">${respuesta[i].name}</h5>
                    <p>${respuesta[i].description}</p>
                    <div align="centre">
                        <button class="btn btn-success" onclick="eliminar(${respuesta[i].id})">Borrar</button>
                        <button class="btn btn-success" onclick="cargar(${respuesta[i].id})">Cargar</button>
                    </div>
                </div>
            </div>`;   
         
    }
    myTable+=`</div></div>`;
    $("#resultados").html(myTable);
}

function guardarSpecialty(){
    let var2 = {
        name:$("#nameSpecialty").val(),
        description:$("#descriptionSpecialty").val()
    };
    $.ajax({
        type:'POST',
        contentType:"application/json; charset=utf-8",
        dataType: 'JSON',
        data: JSON.stringify(var2),
        success:function(respose) {
            console.log("Se guardó correctamente");
            //alert("Se guardó correctametne..");
            //window.location.reload();
            //limpiarFormularioSpecialty();
            consultarSpecialty();
        },
        error:function(jqXHR, textStatus, errorTrown){
            //window.location.reload();
            console.log("No se guardó");
            alert("No se guardó correctamente");
        }
    });
}

function limpiarFormulario(){
    $("#name").val("");
    $("#description").val("");
    
}

$(document).ready(function(){
    consultar();
});

